const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawHeroChip } = require('../ui/HeroChip');
const heroes = require('../data/heroes');
const PlayerData = require('../systems/PlayerData');

const COLS = 3;
const CHIP_GAP = 12;
const CHIP_H = 150;
const TOP_MARGIN = 110;

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
    maxScroll = Math.max(0, gridHeight - (Screen.height - gridTop - 20));
    buttons = [
      new Button({
        x: 16, y: Screen.height - 56, w: 80, h: 40,
        text: '返回', bg: '#555', fontSize: 18,
        onTap: () => sceneManager.pop(),
      }),
    ];
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

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffdca6';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('武将图鉴', Screen.width / 2, HeaderBar.HEIGHT + 40);
      const ownedCount = PlayerData.ownedList().length;
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#8f86c9';
      ctx.fillText(`已拥有 ${ownedCount}/${heroes.length}`, Screen.width / 2, HeaderBar.HEIGHT + 68);

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, gridTop, Screen.width, Screen.height - gridTop - 60);
      ctx.clip();

      heroes.forEach((hero, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = 16 + col * (chipW + CHIP_GAP);
        const y = gridTop + row * (CHIP_H + CHIP_GAP) - scrollY;
        if (y + CHIP_H < gridTop || y > Screen.height) return;
        const owned = PlayerData.state.ownedHeroes[hero.id];
        drawHeroChip(ctx, hero, x, y, chipW, CHIP_H, {
          star: owned ? owned.star : 0,
          locked: !owned,
        });
      });
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
      for (const b of buttons) if (b.handleTap(x, y)) return;
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
