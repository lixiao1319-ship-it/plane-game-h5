const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const HeaderBar = require('../ui/HeaderBar');
const Toast = require('../ui/Toast');
const ImageLoader = require('../core/ImageLoader');
const { fillRoundRect, strokeRoundRect, roundRect, wrapText } = require('../ui/draw');
const { drawStars, drawQualityFrame, drawQualityBadge, drawInkPanel, drawCloudDivider } = require('../ui/art');
const PlayerData = require('../systems/PlayerData');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');
const C = require('../data/constants');

const SKILL_THEME = {
  zhanji: { label: '战技', color: '#7ec8e3' },
  jueji: { label: '绝技', color: '#e08858' },
  tianfu: { label: '天赋', color: '#78d8a8' },
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
  let cachedContentHeight = -1;
  let cachedIsOwned = null;
  const theme = COLORS.rank[hero.rank];
  const rankInfo = C.RANK[hero.rank];

  function isOwned() {
    return !!PlayerData.state.ownedHeroes[hero.id];
  }

  function layout() {
    backButton = new Button({
      x: 16, y: HeaderBar.HEIGHT + 8, w: 64, h: 36,
      text: '‹ 返回', bg: 'rgba(255,255,255,0.12)', fontSize: 16,
      onTap: () => sceneManager.pop(),
    });

    if (isOwned()) {
      const cost = PlayerData.getStarUpCost(hero);
      buttons = [
        new Button({
          x: Screen.width - 16 - 200, y: Screen.height - 74, w: 200, h: 56,
          text: cost === null ? '已满星' : `升星 (${cost}碎片)`,
          gradient: ['#c88820', '#a06810'],
          disabled: cost === null || !PlayerData.canStarUp(hero),
          onTap: () => {
            if (PlayerData.starUp(hero)) {
              Toast.show('升星成功！');
              cachedContentHeight = -1;
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
    contentTop = HeaderBar.HEIGHT + 52;
    contentBottom = isOwned() ? Screen.height - 84 : Screen.height - 20;
    cachedIsOwned = isOwned();
  }

  function drawPill(ctx, text, x, y, color, filled) {
    ctx.font = 'bold 14px sans-serif';
    const w = ctx.measureText(text).width + 20;
    const h = 28;
    const r = h / 2;
    if (filled) fillRoundRect(ctx, x, y, w, h, r, color);
    else strokeRoundRect(ctx, x, y, w, h, r, color, 1.5);
    ctx.fillStyle = filled ? '#1a1a2e' : color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w / 2, y + h / 2 + 1);
    return w;
  }

  function drawStatRow(ctx, x, y, w, label, value, color) {
    fillRoundRect(ctx, x, y, 8, 8, 2, color);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '15px sans-serif';
    ctx.fillStyle = COLORS.textMuted;
    ctx.fillText(label, x + 16, y + 4);
    ctx.textAlign = 'right';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = COLORS.textPrimary;
    ctx.fillText(String(value), x + w, y + 4);
  }

  function drawContent(ctx, draw) {
    const cx = Screen.width / 2;
    let y = contentTop - scrollY;

    // Portrait
    const portraitW = 160;
    const portraitH = 200;
    const px = cx - portraitW / 2;
    if (draw) {
      drawQualityFrame(ctx, px - 4, y - 4, portraitW + 8, portraitH + 8, hero.rank, RADIUS.large);

      const portrait = ImageLoader.requestPortrait(hero.assetId);
      if (portrait.status === 'loaded') {
        ctx.save();
        roundRect(ctx, px, y, portraitW, portraitH, RADIUS.large);
        ctx.clip();
        const iw = portrait.image.width;
        const ih = portrait.image.height;
        const scale = Math.max(portraitW / iw, portraitH / ih);
        const sw = portraitW / scale;
        const sh = portraitH / scale;
        ctx.drawImage(portrait.image, (iw - sw) / 2, (ih - sh) / 2, sw, sh, px, y, portraitW, portraitH);
        ctx.restore();
      } else {
        const phGrad = ctx.createLinearGradient(px, y, px, y + portraitH);
        phGrad.addColorStop(0, theme.gradient[0]);
        phGrad.addColorStop(1, theme.gradient[1]);
        ctx.fillStyle = phGrad;
        fillRoundRect(ctx, px, y, portraitW, portraitH, RADIUS.large, phGrad);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = `bold ${Math.floor(portraitW * 0.35)}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(hero.name[0], px + portraitW / 2, y + portraitH / 2);
      }

      drawQualityBadge(ctx, rankInfo.label, px, y - 2, hero.rank, true);

      if (!isOwned()) {
        fillRoundRect(ctx, px, y, portraitW, portraitH, RADIUS.large, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = COLORS.textSecondary;
        ctx.font = 'bold 18px serif';
        ctx.textAlign = 'center';
        ctx.fillText('未拥有', px + portraitW / 2, y + portraitH / 2);
      }
    }
    y += portraitH + 20;

    // Name
    if (draw) {
      ctx.textAlign = 'center';
      ctx.font = 'bold 32px serif';
      ctx.fillStyle = COLORS.textGold;
      ctx.fillText(hero.name, cx, y);
    }
    y += 40;

    // Badges: camp / class
    const stats = PlayerData.computeStats(hero);
    if (draw) {
      const badges = [
        { text: hero.camp, color: COLORS.camp[hero.camp] || COLORS.textMuted },
        { text: hero.class, color: COLORS.class[hero.class] || COLORS.textMuted },
      ];
      const widths = badges.map((b) => {
        ctx.font = 'bold 14px sans-serif';
        return ctx.measureText(b.text).width + 20;
      });
      const gap = 10;
      const totalW = widths.reduce((a, b) => a + b, 0) + gap * (badges.length - 1);
      let bx = cx - totalW / 2;
      badges.forEach((b, i) => {
        drawPill(ctx, b.text, bx, y, b.color, false);
        bx += widths[i] + gap;
      });
    }
    y += 38;

    // Stars
    if (draw && isOwned()) {
      const starSize = 18;
      const starGap = 4;
      const totalW = C.MAX_STAR * (starSize + starGap) - starGap;
      drawStars(ctx, cx - totalW / 2, y, stats.star, C.MAX_STAR, starSize, starGap);
    } else if (draw) {
      ctx.textAlign = 'center';
      ctx.font = '14px serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.fillText('抽卡获取后可升星养成', cx, y);
    }
    y += 32;

    // Divider
    if (draw) {
      drawCloudDivider(ctx, cx - 60, y, 120);
    }
    y += 16;

    // Stats panel
    const panelX = 20;
    const panelW = Screen.width - 40;
    const panelPad = 16;
    const rowH = 32;
    const panelH = panelPad * 2 + rowH * 4 + 8;
    if (draw) {
      drawInkPanel(ctx, panelX, y, panelW, panelH, RADIUS.medium);
      let ry = y + panelPad + 4;
      ctx.font = '12px sans-serif';
      ctx.fillStyle = COLORS.textMuted;
      ctx.textAlign = 'left';
      ctx.fillText(`等级 ${stats.level}/${C.MAX_LEVEL}`, panelX + panelPad, y + 12);
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, '生命', stats.hp, '#78d8a8');
      ry += rowH;
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, '物攻', stats.atk, '#e08858');
      ry += rowH;
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, '法攻', stats.matk, '#7ec8e3');
      ry += rowH;
      drawStatRow(ctx, panelX + panelPad, ry, panelW - panelPad * 2, `攻速间隔（速度${stats.sudu}）`, `${stats.atkInterval}s`, '#e8c858');
    }
    y += panelH + 8;

    if (isOwned() && draw) {
      ctx.textAlign = 'center';
      ctx.font = '14px sans-serif';
      ctx.fillStyle = COLORS.textYellow;
      ctx.fillText(`${rankInfo.label}碎片：${PlayerData.state.shards[hero.rank]}`, cx, y);
    }
    y += isOwned() ? 28 : 8;

    // Skills header
    if (draw) {
      ctx.textAlign = 'left';
      ctx.font = 'bold 18px serif';
      ctx.fillStyle = COLORS.textGold;
      ctx.fillText('武将技能', 20, y);
    }
    y += 32;

    const skillCard = (key) => {
      const skill = hero.skills[key];
      if (!skill) return;
      const theme2 = SKILL_THEME[key];
      const cardX = 20;
      const cardW = Screen.width - 40;
      const textW = cardW - 48;

      const headerH = 28;
      const estLines = measureWrappedLines(ctx, skill.desc, textW);
      const cardH = headerH + estLines * 20 + 20;

      if (draw) {
        // Ink-style card
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        fillRoundRect(ctx, cardX, y, cardW, cardH, RADIUS.medium, 'rgba(0,0,0,0.25)');
        // Left accent bar in skill color
        fillRoundRect(ctx, cardX, y, 4, cardH, 2, theme2.color);
        // Subtle border
        ctx.strokeStyle = 'rgba(212,175,55,0.15)';
        ctx.lineWidth = 1;
        roundRect(ctx, cardX, y, cardW, cardH, RADIUS.medium);
        ctx.stroke();

        const innerX = cardX + 16;
        let iy = y + 12;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        const labelW = drawPill(ctx, theme2.label, innerX, iy - 14, theme2.color, true);
        ctx.font = 'bold 17px serif';
        ctx.fillStyle = COLORS.textPrimary;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(skill.name || '', innerX + labelW + 8, iy);
        if (skill.cd) {
          const cdText = `CD ${skill.cd}s`;
          ctx.font = '13px sans-serif';
          ctx.fillStyle = COLORS.textMuted;
          ctx.textAlign = 'right';
          ctx.fillText(cdText, cardX + cardW - 12, iy);
        }
        iy += 24;
        ctx.font = '14px sans-serif';
        ctx.fillStyle = COLORS.textSecondary;
        ctx.textAlign = 'left';
        wrapText(ctx, skill.desc, innerX, iy, textW, 20);
      }
      y += cardH + 12;
    };

    skillCard('zhanji');
    skillCard('jueji');
    skillCard('tianfu');

    return y + scrollY - contentTop;
  }

  function measureWrappedLines(ctx, text, maxWidth) {
    ctx.font = '14px sans-serif';
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
      ImageLoader.preloadPortraits([hero]);
    },
    onResume() {
      layout();
    },
    update(dt) {
      buttons.forEach((b) => b.update(dt));
      Toast.update(dt);
      if (cachedIsOwned !== isOwned()) {
        cachedContentHeight = -1;
        layout();
      }
    },
    render(ctx) {
      const bgColors = COLORS.bgDetail[hero.rank] || COLORS.bgDetail.blue;
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, bgColors[0]);
      grad.addColorStop(1, bgColors[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      if (cachedContentHeight < 0) {
        cachedContentHeight = drawContent(ctx, false);
      }
      maxScroll = Math.max(0, cachedContentHeight - (contentBottom - contentTop));
      scrollY = Math.max(0, Math.min(maxScroll, scrollY));

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, contentTop, Screen.width, contentBottom - contentTop);
      ctx.clip();
      drawContent(ctx, true);
      ctx.restore();

      const fadeH = 20;
      let fadeTop = ctx.createLinearGradient(0, contentTop, 0, contentTop + fadeH);
      fadeTop.addColorStop(0, bgColors[1]);
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
      backButton.handleTouchStart(x, y);
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchMove(x, y) {
      const dy = dragStartY - y;
      if (Math.abs(dy) > 6) dragging = true;
      scrollY = Math.max(0, Math.min(maxScroll, scrollStartY + dy));
    },
    onTouchEnd(x, y) {
      if (backButton.handleTouchEnd(x, y)) return;
      if (dragging) return;
      for (const b of buttons) if (b.handleTouchEnd(x, y)) return;
    },
  };
}

module.exports = createHeroDetailScene;
