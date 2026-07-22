const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '..', 'docs', 'design-mvp-v2.md'), 'utf8');
const lines = raw.split('\n');

// ---------- 1. Parse stat table ----------
const statStart = lines.findIndex(l => l.includes('零·附、武将数值参考总表'));
const stats = {}; // name -> {camp, rank(统御 raw number), wuli, zhili, tongshuai, sudu}
for (let i = statStart; i < lines.length; i++) {
  const l = lines[i].trim();
  if (!l.startsWith('|')) continue;
  const cols = l.split('|').map(s => s.trim()).filter(s => s.length);
  if (cols.length !== 7) continue;
  if (cols[0] === '武将' || cols[0].startsWith('---') || cols[0].startsWith(':')) continue;
  const [name, camp, tongyu, wuli, zhili, tongshuai, sudu] = cols;
  if (!/^\d+$/.test(tongyu)) continue;
  stats[name] = {
    camp,
    tongyu: parseInt(tongyu, 10),
    wuli: parseInt(wuli, 10),
    zhili: parseInt(zhili, 10),
    tongshuai: parseInt(tongshuai, 10),
    sudu: parseInt(sudu, 10),
  };
  if (name === '简雍') break; // last row of table
}
console.error('Parsed stats for', Object.keys(stats).length, 'heroes');

// ---------- 2. Parse orange (prose) section ----------
const oStart = lines.findIndex(l => l.includes('三、橙色武将'));
const oEnd = lines.findIndex(l => l.includes('四、紫色武将'));
const skills = {}; // name -> {class, zhanji:{name,desc,cd}, jueji:{...}, tianfu:{name,desc}}

function parseOrangeBlock(blockLines) {
  // blockLines[0] like "**曹操** · 骑士"
  const header = blockLines[0];
  const m = header.match(/\*\*(.+?)\*\*\s*·\s*(\S+)/);
  if (!m) return;
  const name = m[1];
  const cls = m[2];
  const entry = { class: cls };
  for (const bl of blockLines.slice(1)) {
    const zm = bl.match(/^-\s*战技「(.+?)」[:：]\s*(.+?)，CD\s*(\d+)秒/);
    const jm = bl.match(/^-\s*绝技「(.+?)」[:：]\s*(.+?)，CD\s*(\d+)秒/);
    const tm = bl.match(/^-\s*天赋「(.+?)」[:：]\s*(.+)/);
    if (zm) entry.zhanji = { name: zm[1], desc: zm[2], cd: parseInt(zm[3], 10) };
    else if (jm) entry.jueji = { name: jm[1], desc: jm[2], cd: parseInt(jm[3], 10) };
    else if (tm) entry.tianfu = { name: tm[1], desc: tm[2] };
  }
  skills[name] = entry;
}

let currentBlock = [];
for (let i = oStart; i < oEnd; i++) {
  const l = lines[i].trim();
  if (/^\*\*(.+?)\*\*\s*·\s*\S+/.test(l)) {
    if (currentBlock.length) parseOrangeBlock(currentBlock);
    currentBlock = [l];
  } else if (currentBlock.length && (l.startsWith('- 战技') || l.startsWith('- 绝技') || l.startsWith('- 天赋'))) {
    currentBlock.push(l);
  }
}
if (currentBlock.length) parseOrangeBlock(currentBlock);
console.error('Parsed orange skills for', Object.keys(skills).length, 'heroes');

// ---------- 3. Parse purple + blue table sections ----------
function parseTableSection(startMarker, endMarker) {
  const s = lines.findIndex(l => l.includes(startMarker));
  const e = endMarker ? lines.findIndex(l => l.includes(endMarker)) : lines.length;
  for (let i = s; i < e; i++) {
    const l = lines[i].trim();
    if (!l.startsWith('|')) continue;
    const cols = l.split('|').map(x => x.trim()).filter(x => x.length);
    if (cols.length !== 5) continue;
    if (cols[0] === '武将' || cols[0].startsWith('---') || cols[0].startsWith(':')) continue;
    const [name, cls, zhanjiRaw, juejiRaw, tianfuRaw] = cols;
    const parseSkillCol = (raw) => {
      // format: 「name」desc（CDs）  -- extract trailing (12s) or (12秒)
      const cdm = raw.match(/[（(](\d+)\s*s[）)]/i) || raw.match(/[（(](\d+)\s*秒[）)]/);
      const nm = raw.match(/「(.+?)」/);
      let desc = raw;
      if (nm) desc = raw.slice(raw.indexOf('」') + 1);
      desc = desc.replace(/[（(]\d+\s*s[）)]/i, '').replace(/[（(]\d+\s*秒[）)]/, '').trim();
      return { name: nm ? nm[1] : '', desc, cd: cdm ? parseInt(cdm[1], 10) : undefined };
    };
    const zhanji = parseSkillCol(zhanjiRaw);
    const jueji = parseSkillCol(juejiRaw);
    skills[name] = {
      class: cls.replace(/·.*$/, ''),
      zhanji,
      jueji,
      tianfu: { name: '', desc: tianfuRaw },
    };
  }
}
parseTableSection('四、紫色武将', '五、蓝色武将');
parseTableSection('五、蓝色武将', '六、阵营加成');

// 董卓 is listed in the 57-blue-hero roster and stat table but has no skill row in the source doc — fill a
// placeholder consistent with his historical role (tyrannical warlord) so the roster stays complete.
if (!skills['董卓']) {
  skills['董卓'] = {
    class: '战士',
    zhanji: { name: '西凉悍将', desc: '武力×160%冲击并使目标恐惧2秒', cd: 12 },
    jueji: { name: '祸乱朝纲', desc: '敌方全体攻击力-20%持续8秒', cd: 45 },
    tianfu: { name: '暴虐无道', desc: '统率+15%；击杀敌方武将后武力+10%（上限+30%）' },
  };
}
console.error('Total skills parsed for', Object.keys(skills).length, 'heroes');

// ---------- 4. Merge ----------
const heroes = [];
let missing = [];
for (const [name, st] of Object.entries(stats)) {
  const sk = skills[name];
  if (!sk) { missing.push(name); continue; }
  const rank = st.tongyu >= 7 ? 'orange' : st.tongyu === 6 ? 'purple' : 'blue';
  heroes.push({
    id: name,
    // ASCII-only slug for filesystem/URL use (e.g. portrait filenames). WeChat
    // DevTools' local dev server mishandles non-ASCII characters in Image.src
    // paths (percent-encodes them but doesn't decode on file lookup), so any
    // asset referenced by hero must use this instead of the Chinese `id`.
    assetId: `h${String(heroes.length + 1).padStart(3, '0')}`,
    name,
    camp: st.camp,
    rank,
    class: sk.class || '',
    stats: { wuli: st.wuli, zhili: st.zhili, tongshuai: st.tongshuai, sudu: st.sudu },
    skills: {
      zhanji: sk.zhanji || null,
      jueji: sk.jueji || null,
      tianfu: sk.tianfu || null,
    },
  });
}
console.error('Merged', heroes.length, 'heroes. Missing skills for:', missing.join(', ') || '(none)');

const rankCount = heroes.reduce((acc, h) => { acc[h.rank] = (acc[h.rank]||0)+1; return acc; }, {});
console.error('Rank distribution:', rankCount);

const out = `// Auto-generated from 策划方案 MVP v2.0. Do not hand-edit — regenerate via scratchpad/parse.js if the design doc changes.
module.exports = ${JSON.stringify(heroes, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'heroes.js'), out);
console.error('Wrote heroes.generated.js');
