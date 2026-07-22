const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const ImageLoader = require('../core/ImageLoader');
const { fillRoundRect, strokeRoundRect, roundRect, wrapText } = require('../ui/draw');
const PlayerData = require('../systems/PlayerData');
const C = require('../data/constants');

const RANK_THEME = {
  orange: { glow: '#ff8a2a', dim: 'rgba(255,138,42,0.18)', bg: ['#3a1f10', '#1a1030'] },
  purple: { glow: '#b06aff', dim: 'rgba(176,106,255,0.16)', bg: ['#2a1740', '#1a1030'] },
  blue: { glow: '#4aa3ff', dim: 'rgba(74,163,255,0.16)', bg: ['#122238', '#1a1030'] },
};

const SKILL_THEME = {
  zhanji: { label: '战技', color: '#7fd6ff' },
  jueji: { label: '绝技', color: '#ff9d5c' },
  tianfu: { label: '天赋', color: '#8bffb0' },
};

function createHeroDetailScene(sceneManager, hero) {
  let buttons = [];
  let backButton = null;
  let scrollY = 0;
  let dragStartY = 0;
  let scrollStartY = 0;
  let dragging = false;
  let maxScroll = 0;
  let contentTop = 0;
  let contentBottom = 0;
  const theme = RANK_THEME[hero.rank];
  const rankInfo = C.RANK[hero.rank];

  function isOwned() {
    return !!PlayerData.state.ownedHeroes[hero.id];
  }

  function layout() {
    backButton = new Button({
      x: 16, y: HeaderBar.HEIGHT + 12, w: 64, h: 40,
      text: '‹ 返回', bg: 'rgba(0,0,0,0.4)', fontSize: 18,
      onTap: () => sceneManager.pop(),
    });

    if (isOwned()) {
      const cost = PlayerData.getStarUpCost(hero);
      buttons = [
        new Button({
          x: Screen.width - 16 - 200, y: Screen.height - 74, w: 200, h: 58,
          text: cost === null ? '已满星' : `升星 (${cost}碎片)`,
          bg: '#c98b1a',
          disabled: cost === null || !PlayerData.canStarUp(hero),
          onTap: () => {
            if (PlayerData.starUp(hero)) {
              Toast.show('升星成功！');
              layout();
            } else {
              Toast.show('碎片不足');
            }
          },
        }),
      ];
    } else {
      buttons = [];
    }
    contentTop = HeaderBar.HEIGHT + 64;
    contentBottom = isOwned() ? Screen.height - 90 : Screen.height - 20;
  }

  function drawPill(ctx, text, x, y, color, filled) {
    ctx.font = 'bold 15px sans-serif';
    const w = ctx.measureText(text).width + 24;
    const h = 30;
    if (filled) fillRoundRect(ctx, x, y, w, h, h / 2, color);
    else strokeRoundRect(ctx, x, y, w, h, h / 2, color, 1.5);
    ctx.fillStyle = filled ? '#1a1030' : color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w / 2, y + h / 2 + 1);
    return w;
  }

  function drawStatRow(ctx, x, y, w, label, value, color) {
    fillRoundRect(ctx, x, y, 8, 8, 2, color);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#b8aee0';
    ctx.fillText(label, x + 16, y + 4);
    ctx.textAlign = 'right';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(String(value), x + w, y + 4);
  }

  // Draws all scrollable content. When draw=false, only measures total height
  // (canvas text metrics require a live ctx, so measuring re-runs the same
  // layout code with drawing side effects skipped).
  function drawContent(ctx, draw) {
    const cx = Screen.width / 2;
    let y = contentTop - scrollY;

    // Portrait
    const portraitW = 176;
    const portraitH = 220;
    const px = cx - portraitW / 2;
    if (draw) {
      fillRoundRect(ctx, px - 6, y - 6, portraitW + 12, portraitH + 12, 20, theme.dim);
      strokeRoundRect(ctx, px - 6, y - 6, portraitW + 12, portraitH + 12, 20, theme.glow, 2);
      const portrait = ImageLoader.requestPortrait(hero.assetId);
      if (portrait.status === 'loaded') {
        ctx.save();
        roundRect(ctx, px, y, portraitW, portraitH, 16);
        ctx.clip();
        const iw = portrait.image.width;
        const ih = portrait.image.height;
        const scale = Math.max(portraitW / iw, portraitH / ih);
        const sw = portraitW / scale;
        const sh = portraitH / scale;
        ctx.drawImage(portrait.image, (iw - sw) / 2, (ih - sh) / 2, sw, sh, px, y, portraitW, portraitH);
        ctx.restore();
      } else {
        fillRoundRect(ctx, px, y, portraitW, portraitH, 16, theme.glow);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        fillRoundRect(ctx, px, y, portraitW, portraitH, 16, 'rgba(0,0,0,0.15)');
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.floor(portraitW * 0.35)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(hero.name[0], px + portraitW / 2, y + portraitH / 2);
      }
      drawPill(ctx, rankInfo.label, px, y - 2, theme.glow, true);
      if (!isOwned()) {
        fillRoundRect(ctx, px, y, portraitW, portraitH, 16, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('未拥有', px + portraitW / 2, y + portraitH / 2);
      }
    }
    y += portraitH + 26;

    // Name
    if (draw) {
      ctx.textAlign = 'center';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(hero.name, cx, y);
    }
    y += 40;

    // Badges: camp / class / stars
    const stats = PlayerData.computeStats(hero);
    if (draw) {
      const badges = [
        { text: hero.camp, color: '#cfc3ff' },
        { text: hero.class, color: '#7fd6ff' },
      ];
      const widths = badges.map((b) => {
        ctx.font = 'bold 15px sans-serif';
        return ctx.measureText(b.text).width + 24;
      });
      const gap = 10;
      const totalW = widths.reduce((a, b) => a + b, 0) + gap * (badges.length - 1);
      let bx = cx - totalW / 2;
      badges.forEach((b, i) => {
        drawPill(ctx, b.text, bx, y, b.color, false);
        bx += widths[i] + gap;
      });
    }
    y += 40;

    if (draw && isOwned()) {
      ctx.textAlign = 'center';
      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#ffd24d';
      ctx.fillText('★'.repeat(stats.star) + '☆'.repeat(C.MAX_STAR - stats.star), cx, y);
    } else if (draw) {
      ctx.textAlign = 'center';
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#8f86c9';
      ctx.fillText('抽卡获取后可升星养成', cx, y);
    }
    y += 34;

    // Stats panel
    const panelX = 24;
    const panelW = Screen.width - 48;
    const panelPad = 20;
    const rowH = 34;
    const panelH = panelPad * 2 + rowH * 4 + 8;
    if (draw) {
      fillRoundRect(ctx, panelX, y, panelW, panelH, 16, 'rgba(255,255,255,0.06)');
      strokeRoundRect(ctx, panelX, y, panelW, panelH, 16, 'rgba(255,255,255,0.12)', 1);
      let ry = y + panelPad + 6;
      ctx.font = '13px sans-serif';
      ctx.fillStyle = '#8f86c9';
      ctx.textAlign = 'left';
      ctx.fillText(`等级 ${stats.level}/${C.MAX_LEVEL}`, panelX + panelPad, y + 14);
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, '生命', stats.hp, '#5fce6a');
      ry += rowH;
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, '物攻', stats.atk, '#ff7a5c');
      ry += rowH;
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, '法攻', stats.matk, '#5c9fff');
      ry += rowH;
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, `攻速间隔（速度${stats.sudu}）`, `${stats.atkInterval}s`, '#ffd24d');
    }
    y += panelH + 8;

    if (isOwned() && draw) {
      ctx.textAlign = 'center';
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#ffd24d';
      ctx.fillText(`${rankInfo.label}碎片：${PlayerData.state.shards[hero.rank]}`, cx, y);
    }
    y += isOwned() ? 30 : 8;

    // Skills header
    if (draw) {
      ctx.textAlign = 'left';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#ffdca6';
      ctx.fillText('武将技能', 24, y);
    }
    y += 34;

    const skillCard = (key) => {
      const skill = hero.skills[key];
      if (!skill) return;
      const theme2 = SKILL_THEME[key];
      const cardX = 24;
      const cardW = Screen.width - 48;
      const textW = cardW - 56;

      const headerH = 30;
      const estLines = measureWrappedLines(ctx, skill.desc, textW);
      const cardH = headerH + estLines * 21 + 22;

      if (draw) {
        fillRoundRect(ctx, cardX, y, cardW, cardH, 14, 'rgba(255,255,255,0.05)');
        fillRoundRect(ctx, cardX, y, 5, cardH, 3, theme2.color);
        strokeRoundRect(ctx, cardX, y, cardW, cardH, 14, 'rgba(255,255,255,0.08)', 1);

        const innerX = cardX + 20;
        let iy = y + 14;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        const labelW = drawPill(ctx, theme2.label, innerX, iy - 15, theme2.color, true);
        ctx.font = 'bold 18px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(skill.name || '', innerX + labelW + 10, iy);
        if (skill.cd) {
          const cdText = `CD ${skill.cd}s`;
          ctx.font = '14px sans-serif';
          ctx.fillStyle = '#8f86c9';
          ctx.textAlign = 'right';
          ctx.fillText(cdText, cardX + cardW - 16, iy);
        }
        iy += 26;
        ctx.font = '15px sans-serif';
        ctx.fillStyle = '#d8d0ff';
        ctx.textAlign = 'left';
        wrapText(ctx, skill.desc, innerX, iy, textW, 21);
      }
      y += cardH + 14;
    };

    skillCard('zhanji');
    skillCard('jueji');
    skillCard('tianfu');

    return y + scrollY - contentTop;
  }

  function measureWrappedLines(ctx, text, maxWidth) {
    ctx.font = '15px sans-serif';
    const chars = String(text).split('');
    let line = '';
    let lines = 1;
    for (let i = 0; i < chars.length; i++) {
      const test = line + chars[i];
      if (ctx.measureText(test).width > maxWidth && line.length > 0) {
        line = chars[i];
        lines++;
      } else {
        line = test;
      }
    }
    return lines;
  }

  return {
    onEnter() {
      layout();
    },
    onResume() {
      layout();
    },
    update() {},
    render(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, theme.bg[0]);
      grad.addColorStop(1, theme.bg[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      let contentHeight = 0;
      contentHeight = drawContent(ctx, false);
      maxScroll = Math.max(0, contentHeight - (contentBottom - contentTop));
      scrollY = Math.max(0, Math.min(maxScroll, scrollY));

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, contentTop, Screen.width, contentBottom - contentTop);
      ctx.clip();
      drawContent(ctx, true);
      ctx.restore();

      // fade masks at scroll edges
      const fadeH = 24;
      let fadeTop = ctx.createLinearGradient(0, contentTop, 0, contentTop + fadeH);
      fadeTop.addColorStop(0, theme.bg[1]);
      fadeTop.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fadeTop;
      ctx.fillRect(0, contentTop, Screen.width, fadeH);

      buttons.forEach((b) => b.render(ctx));
      backButton.render(ctx);
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart(x, y) {
      dragging = false;
      dragStartY = y;
      scrollStartY = scrollY;
    },
    onTouchMove(x, y) {
      const dy = dragStartY - y;
      if (Math.abs(dy) > 6) dragging = true;
      scrollY = Math.max(0, Math.min(maxScroll, scrollStartY + dy));
    },
    onTouchEnd(x, y) {
      if (backButton.handleTap(x, y)) return;
      if (dragging) return;
      for (const b of buttons) if (b.handleTap(x, y)) break;
    },
  };
}

module.exports = createHeroDetailScene;
