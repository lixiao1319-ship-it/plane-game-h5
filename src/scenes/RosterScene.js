const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawHeroChip } = require('../ui/HeroChip');
const { drawCloudDivider } = require('../ui/art');
const heroes = require('../data/heroes');
const PlayerData = require('../systems/PlayerData');
const ImageLoader = require('../core/ImageLoader');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');

const COLS = 3;
const CHIP_GAP = 12;
const CHIP_H = 155;
const TOP_MARGIN = 105;

function createRosterScene(sceneManager) {
  let buttons = [];
  let scrollY = 0;
  let dragStartY = 0;
  let scrollStartY = 0;
  let dragging = false;
  let maxScroll = 0;
  let chipW = 0;
  let gridTop = 0;

  function layout() {
    chipW = (Screen.width - 16 * 2 - (COLS - 1) * CHIP_GAP) / COLS;
    gridTop = HeaderBar.HEIGHT + TOP_MARGIN;
    const rows = Math.ceil(heroes.length / COLS);
    const gridHeight = rows * (CHIP_H + CHIP_GAP);
    maxScroll = Math.max(0, gridHeight - (Screen.height - gridTop - 60));
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
      const preloadCount = Math.min(heroes.length, (visibleRows + 1) * COLS);
      ImageLoader.preloadPortraits(heroes.slice(0, preloadCount));
    },
    onResume() {
      layout();
    },
    update(dt) {
      buttons.forEach((b) => b.update(dt));
      Toast.update(dt);
    },
    render(ctx) {
      // Background
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, COLORS.bgRoster[0]);
      grad.addColorStop(1, COLORS.bgRoster[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      // Title
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 26px serif';
      ctx.fillText('武将图鉴', Screen.width / 2, HeaderBar.HEIGHT + 32);

      const ownedCount = PlayerData.ownedList().length;
      ctx.font = '13px sans-serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText(`已拥有 ${ownedCount}/${heroes.length}`, Screen.width / 2, HeaderBar.HEIGHT + 56);

      drawCloudDivider(ctx, Screen.width / 2 - 40, HeaderBar.HEIGHT + 70, 80);

      // Clip to grid area
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, gridTop, Screen.width, Screen.height - gridTop - 60);
      ctx.clip();

      const firstRow = Math.max(0, Math.floor(scrollY / (CHIP_H + CHIP_GAP)) - 1);
      const lastRow = Math.min(
        Math.ceil(heroes.length / COLS) - 1,
        Math.ceil((scrollY + Screen.height - gridTop) / (CHIP_H + CHIP_GAP)) + 1
      );

      for (let row = firstRow; row <= lastRow; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = row * COLS + col;
          if (i >= heroes.length) break;
          const hero = heroes[i];
          const x = 16 + col * (chipW + CHIP_GAP);
          const y = gridTop + row * (CHIP_H + CHIP_GAP) - scrollY;
          if (y + CHIP_H < gridTop || y > Screen.height) continue;
          const owned = PlayerData.state.ownedHeroes[hero.id];
          drawHeroChip(ctx, hero, x, y, chipW, CHIP_H, {
            star: owned ? owned.star : 0,
            locked: !owned,
          });
        }
      }
      ctx.restore();

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart(x, y) {
      dragging = false;
      dragStartY = y;
      scrollStartY = scrollY;
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchMove(x, y) {
      const dy = dragStartY - y;
      if (Math.abs(dy) > 6) dragging = true;
      scrollY = Math.max(0, Math.min(maxScroll, scrollStartY + dy));
    },
    onTouchEnd(x, y) {
      for (const b of buttons) if (b.handleTouchEnd(x, y)) return;
      if (dragging) return;
      if (y < gridTop) return;
      const col = Math.floor((x - 16) / (chipW + CHIP_GAP));
      const row = Math.floor((y + scrollY - gridTop) / (CHIP_H + CHIP_GAP));
      if (col < 0 || col >= COLS) return;
      const index = row * COLS + col;
      const hero = heroes[index];
      if (!hero) return;
      if (!PlayerData.isOwned(hero.id)) {
        Toast.show('尚未拥有该武将');
        return;
      }
      const HeroDetailScene = require('./HeroDetailScene');
      sceneManager.push(HeroDetailScene(sceneManager, hero));
    },
  };
}

module.exports = createRosterScene;
