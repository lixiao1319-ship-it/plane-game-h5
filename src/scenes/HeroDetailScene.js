const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawHeroChip } = require('../ui/HeroChip');
const { wrapText } = require('../ui/draw');
const PlayerData = require('../systems/PlayerData');
const C = require('../data/constants');

function createHeroDetailScene(sceneManager, hero) {
  let buttons = [];
  let scrollY = 0;
  let dragStartY = 0;
  let scrollStartY = 0;
  let dragging = false;
  let maxScroll = 0;
  let contentTop = 0;
  let contentBottom = 0;
  let contentHeight = 0;

  function layout() {
    const cost = PlayerData.getStarUpCost(hero);
    buttons = [
      new Button({
        x: 16, y: Screen.height - 56, w: 80, h: 40,
        text: '返回', bg: '#555', fontSize: 18,
        onTap: () => sceneManager.pop(),
      }),
      new Button({
        x: Screen.width - 16 - 220, y: Screen.height - 66, w: 220, h: 56,
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
    contentTop = HeaderBar.HEIGHT + 20;
    contentBottom = Screen.height - 80;
  }

  // Measures the full content height once per render so scroll clamping stays
  // correct even though line counts (skill text wrap) depend on live canvas font metrics.
  function measureAndDraw(ctx, draw) {
    const chipW = 150;
    const chipH = 190;
    let y = contentTop + chipH + 30 - scrollY;
    const infoX = 24;

    if (draw) drawHeroChip(ctx, hero, Screen.width / 2 - chipW / 2, contentTop - scrollY, chipW, chipH, {
      star: PlayerData.state.ownedHeroes[hero.id] ? PlayerData.state.ownedHeroes[hero.id].star : 0,
    });

    ctx.textAlign = 'left';
    ctx.font = '18px sans-serif';
    if (draw) {
      ctx.fillStyle = '#cfc3ff';
      ctx.fillText(`阵营：${hero.camp}　职业：${hero.class}　品级：${C.RANK[hero.rank].label}`, infoX, y);
    }
    y += 30;

    const stats = PlayerData.computeStats(hero);
    if (draw) ctx.fillText(`等级 ${stats.level}　星级 ${stats.star}星`, infoX, y);
    y += 26;
    if (draw) ctx.fillText(`生命 ${stats.hp}　物攻 ${stats.atk}　法攻 ${stats.matk}`, infoX, y);
    y += 26;
    if (draw) ctx.fillText(`普攻间隔 ${stats.atkInterval}s（速度${stats.sudu}）`, infoX, y);
    y += 26;
    if (draw) {
      ctx.fillStyle = '#ffd24d';
      ctx.fillText(`${C.RANK[hero.rank].label}碎片：${PlayerData.state.shards[hero.rank]}`, infoX, y);
    }
    y += 36;

    const skillBlock = (label, skill, color) => {
      if (!skill) return;
      if (draw) {
        ctx.fillStyle = color;
        ctx.font = 'bold 20px sans-serif';
        const cdText = skill.cd ? `（CD ${skill.cd}s）` : '（被动）';
        ctx.fillText(`${label}「${skill.name || ''}」${cdText}`, infoX, y);
      }
      y += 26;
      if (draw) {
        ctx.fillStyle = '#e8e2ff';
        ctx.font = '16px sans-serif';
      } else {
        ctx.font = '16px sans-serif';
      }
      const lines = wrapText(ctx, skill.desc, infoX, draw ? y : -9999, Screen.width - infoX * 2, 22);
      y += lines * 22 + 14;
    };
    skillBlock('战技', hero.skills.zhanji, '#7fd6ff');
    skillBlock('绝技', hero.skills.jueji, '#ff9d5c');
    skillBlock('天赋', hero.skills.tianfu, '#8bffb0');

    return y + scrollY - contentTop; // total content height
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
      ctx.fillStyle = '#181028';
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      contentHeight = measureAndDraw(ctx, false);
      maxScroll = Math.max(0, contentHeight - (contentBottom - contentTop));
      scrollY = Math.max(0, Math.min(maxScroll, scrollY));

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, contentTop, Screen.width, contentBottom - contentTop);
      ctx.clip();
      measureAndDraw(ctx, true);
      ctx.restore();

      buttons.forEach((b) => b.render(ctx));
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
      if (dragging) return;
      for (const b of buttons) if (b.handleTap(x, y)) break;
    },
  };
}

module.exports = createHeroDetailScene;
