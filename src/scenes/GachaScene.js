const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const { drawCloudDivider } = require('../ui/art');
const { roundRect } = require('../ui/draw');
const GachaSystem = require('../systems/GachaSystem');
const PlayerData = require('../systems/PlayerData');
const ImageLoader = require('../core/ImageLoader');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');
const C = require('../data/constants');
const heroes = require('../data/heroes');

function createGachaScene(sceneManager) {
  let buttons = [];
  let mosaicHeroes = [];

  function layout() {
    const w = (Screen.width - 32 - 16) / 2;
    const y = Screen.height - 140;
    const h = 68;
    buttons = [
      new Button({
        x: 16, y, w, h,
        text: `单抽 (${C.GACHA.costPerDraw}金)`,
        gradient: ['#c88820', '#a06810'],
        onTap: () => doDraw(1),
      }),
      new Button({
        x: 16 + w + 16, y, w, h,
        text: `五连 (${C.GACHA.fiveDrawCost}金)`,
        gradient: ['#b03030', '#801818'],
        onTap: () => doDraw(5),
      }),
      new Button({
        x: 16, y: Screen.height - 48, w: 80, h: 32,
        text: '返回',
        bg: 'rgba(255,255,255,0.12)',
        fontSize: 16,
        onTap: () => sceneManager.pop(),
      }),
    ];

    // Pick 8 random heroes for the mosaic background
    const shuffled = [...heroes].sort(() => Math.random() - 0.5);
    mosaicHeroes = shuffled.slice(0, 8);
  }

  function doDraw(count) {
    const result = GachaSystem.draw(count);
    if (!result) {
      Toast.show('金币不足');
      return;
    }
    const GachaResultScene = require('./GachaResultScene');
    sceneManager.push(GachaResultScene(sceneManager, result.results));
  }

  // Draws the 8-hero portrait mosaic as a background panel
  function drawMosaic(ctx, x, y, w, h) {
    const cols = 4;
    const rows = 2;
    const cellW = w / cols;
    const cellH = h / rows;

    // Dark backdrop
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    roundRect(ctx, x, y, w, h, RADIUS.medium);
    ctx.fill();

    // Draw each hero portrait in grid
    for (let i = 0; i < mosaicHeroes.length; i++) {
      const hero = mosaicHeroes[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = x + col * cellW;
      const cy = y + row * cellH;

      const portrait = ImageLoader.requestPortrait(hero.assetId);
      if (portrait.status === 'loaded') {
        ctx.save();
        roundRect(ctx, cx + 2, cy + 2, cellW - 4, cellH - 4, RADIUS.small);
        ctx.clip();
        drawCoverImage(ctx, portrait.image, cx + 2, cy + 2, cellW - 4, cellH - 4);
        ctx.restore();
      } else {
        // Placeholder with rank color
        const rankInfo = COLORS.rank[hero.rank];
        const grad = ctx.createLinearGradient(cx, cy, cx, cy + cellH);
        grad.addColorStop(0, rankInfo.gradient[0]);
        grad.addColorStop(1, rankInfo.gradient[1]);
        ctx.fillStyle = grad;
        roundRect(ctx, cx + 2, cy + 2, cellW - 4, cellH - 4, RADIUS.small);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = `bold ${Math.floor(cellW * 0.35)}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(hero.name[0], cx + cellW / 2, cy + cellH / 2);
      }

      // Subtle gold border on each cell
      ctx.strokeStyle = 'rgba(212,175,55,0.25)';
      ctx.lineWidth = 1;
      roundRect(ctx, cx + 2, cy + 2, cellW - 4, cellH - 4, RADIUS.small);
      ctx.stroke();
    }

    // Outer gold frame
    ctx.strokeStyle = 'rgba(212,175,55,0.4)';
    ctx.lineWidth = 2;
    roundRect(ctx, x, y, w, h, RADIUS.medium);
    ctx.stroke();
  }

  function drawCoverImage(ctx, image, dx, dy, dw, dh) {
    const iw = image.width;
    const ih = image.height;
    const scale = Math.max(dw / iw, dh / ih);
    const sw = dw / scale;
    const sh = dh / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  return {
    onEnter() {
      layout();
      ImageLoader.preloadPortraits(mosaicHeroes);
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
      grad.addColorStop(0, COLORS.bgGacha[0]);
      grad.addColorStop(1, COLORS.bgGacha[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      // Title
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 28px serif';
      ctx.fillText('金币召唤', Screen.width / 2, 95);

      drawCloudDivider(ctx, Screen.width / 2 - 50, 115, 100);

      // Rate info panel
      const g = PlayerData.state.gacha;
      const panelX = 20;
      const panelW = Screen.width - 40;
      const panelY = 135;
      const panelH = 56;

      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      roundRect(ctx, panelX, panelY, panelW, panelH, RADIUS.small);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212,175,55,0.25)';
      ctx.lineWidth = 1.5;
      roundRect(ctx, panelX, panelY, panelW, panelH, RADIUS.small);
      ctx.stroke();

      ctx.font = '13px sans-serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText(
        `橙色概率 ${(g.orangeRate * 100).toFixed(1)}%（未出橙色每抽+0.4%，${C.GACHA.orangePity}抽保底）`,
        Screen.width / 2,
        panelY + 22
      );
      ctx.fillText(
        `距下次紫色保底 ${Math.max(0, C.GACHA.purplePity - g.sincePurpleOrAbove)} 抽`,
        Screen.width / 2,
        panelY + 40
      );

      // 8-hero mosaic background panel
      const mosaicX = 20;
      const mosaicY = 210;
      const mosaicW = Screen.width - 40;
      const mosaicH = 280;
      drawMosaic(ctx, mosaicX, mosaicY, mosaicW, mosaicH);

      // Hint text
      ctx.font = '13px serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.textAlign = 'center';
      ctx.fillText('— 消耗金币，召唤传说武将 —', Screen.width / 2, mosaicY + mosaicH + 25);

      buttons.forEach((b) => b.render(ctx));
      HeaderBar.render(ctx);
      Toast.render(ctx);
    },
    onTouchStart(x, y) {
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchEnd(x, y) {
      buttons.forEach((b) => b.handleTouchEnd(x, y));
    },
  };
}

module.exports = createGachaScene;
