const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const ScrollHelper = require('../core/ScrollHelper');
const { drawHeroChip } = require('../ui/HeroChip');
const { drawCloudDivider } = require('../ui/art');
const PlayerData = require('../systems/PlayerData');
const ImageLoader = require('../core/ImageLoader');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');

const COLS = 3;
const CHIP_GAP = 12;
const CHIP_H = 155;
const TOP_MARGIN = 105;

function createMyHeroesScene(sceneManager) {
  let buttons = [];
  const scroller = new ScrollHelper();
  let chipW = 0;
  let gridTop = 0;
  let myHeroes = [];

  function layout() {
    const rankOrder = { orange: 0, purple: 1, blue: 2 };
    myHeroes = PlayerData.ownedList()
      .map((e) => e.hero)
      .filter(Boolean)
      .sort((a, b) => {
        if (rankOrder[a.rank] !== rankOrder[b.rank]) return rankOrder[a.rank] - rankOrder[b.rank];
        return a.name.localeCompare(b.name, 'zh');
      });

    chipW = (Screen.width - 16 * 2 - (COLS - 1) * CHIP_GAP) / COLS;
    gridTop = HeaderBar.HEIGHT + TOP_MARGIN;
    const rows = Math.ceil(myHeroes.length / COLS);
    const gridHeight = rows * (CHIP_H + CHIP_GAP);
    scroller.setMaxScroll(gridHeight - (Screen.height - gridTop - 60));
    buttons = [
      new Button({
        x: 16, y: Screen.height - 48, w: 80, h: 32,
        text: '返回', bg: 'rgba(255,255,255,0.12)', fontSize: 16,
        onTap: () => sceneManager.pop(),
      }),
    ];
  }

  return {
    onEnter() {
      layout();
      const visibleRows = Math.ceil((Screen.height - gridTop) / (CHIP_H + CHIP_GAP));
      const preloadCount = Math.min(myHeroes.length, (visibleRows + 1) * COLS);
      ImageLoader.preloadPortraits(myHeroes.slice(0, preloadCount));
    },
    onResume() {
      layout();
    },
    update(dt) {
      scroller.update(dt);
      buttons.forEach((b) => b.update(dt));
      Toast.update(dt);
    },
    render(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, COLORS.bgRoster[0]);
      grad.addColorStop(1, COLORS.bgRoster[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 26px serif';
      ctx.fillText('我的武将', Screen.width / 2, HeaderBar.HEIGHT + 32);

      ctx.font = '13px sans-serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText(`共 ${myHeroes.length} 位`, Screen.width / 2, HeaderBar.HEIGHT + 56);

      drawCloudDivider(ctx, Screen.width / 2 - 40, HeaderBar.HEIGHT + 70, 80);

      if (myHeroes.length === 0) {
        ctx.font = '16px serif';
        ctx.fillStyle = COLORS.textMuted;
        ctx.fillText('尚未拥有任何武将', Screen.width / 2, Screen.height / 2);
        ctx.font = '14px sans-serif';
        ctx.fillText('快去金币召唤吧！', Screen.width / 2, Screen.height / 2 + 30);
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, gridTop, Screen.width, Screen.height - gridTop - 60);
      ctx.clip();

      const scrollY = scroller.scrollY;
      const firstRow = Math.max(0, Math.floor(scrollY / (CHIP_H + CHIP_GAP)) - 1);
      const lastRow = Math.min(
        Math.ceil(myHeroes.length / COLS) - 1,
        Math.ceil((scrollY + Screen.height - gridTop) / (CHIP_H + CHIP_GAP)) + 1
      );

      for (let row = firstRow; row <= lastRow; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = row * COLS + col;
          if (i >= myHeroes.length) break;
          const hero = myHeroes[i];
          const x = 16 + col * (chipW + CHIP_GAP);
          const y = gridTop + row * (CHIP_H + CHIP_GAP) - scrollY;
          if (y + CHIP_H < gridTop || y > Screen.height) continue;
          const owned = PlayerData.state.ownedHeroes[hero.id];
          drawHeroChip(ctx, hero, x, y, chipW, CHIP_H, {
            star: owned ? owned.star : 0,
            locked: false,
          });
        }
      }
      ctx.restore();

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart(x, y) {
      scroller.onTouchStart(y);
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchMove(x, y) {
      scroller.onTouchMove(y);
    },
    onTouchEnd(x, y) {
      scroller.onTouchEnd();
      for (const b of buttons) if (b.handleTouchEnd(x, y)) return;
      if (scroller.dragging) return;
      if (y < gridTop) return;
      const col = Math.floor((x - 16) / (chipW + CHIP_GAP));
      const row = Math.floor((y + scroller.scrollY - gridTop) / (CHIP_H + CHIP_GAP));
      if (col < 0 || col >= COLS) return;
      const index = row * COLS + col;
      const hero = myHeroes[index];
      if (!hero) return;
      const HeroDetailScene = require('./HeroDetailScene');
      sceneManager.push(HeroDetailScene(sceneManager, hero));
    },
  };
}

module.exports = createMyHeroesScene;
