const Screen = require('../core/Screen');
const Button = require('../ui/Button');
const { drawHeroChip } = require('../ui/HeroChip');
const { drawCloudDivider } = require('../ui/art');
const { roundRect } = require('../ui/draw');
const { COLORS, FONT, SPACING, RADIUS } = require('../ui/theme');
const C = require('../data/constants');

// Layout: top row 2 cards, middle 1 card, bottom row 2 cards
const LAYOUT = [
  { row: 0, col: 0 }, // top-left
  { row: 0, col: 1 }, // top-right
  { row: 1, col: 0 }, // middle-center
  { row: 2, col: 0 }, // bottom-left
  { row: 2, col: 1 }, // bottom-right
];

// Phase constants
const PHASE_GLOW = 0;   // golden glow burning bright
const PHASE_FADE = 1;   // glow fading, hero appearing
const PHASE_DONE = 2;   // fully revealed

function createGachaResultScene(sceneManager, results) {
  let buttons = [];
  let animTimer = 0;
  let currentIndex = 0;
  let phaseTimer = 0; // time within current phase
  let phase = PHASE_GLOW;
  let waitingForTap = false;
  let allRevealed = false;

  const chipW = 120;
  const chipH = 150;
  const gapX = 20;
  const gapY = 24;

  function getCardPos(i) {
    const layout = LAYOUT[i];
    if (!layout) return { x: 0, y: 0 };
    const gridW = 2 * chipW + gapX;
    const startX = (Screen.width - gridW) / 2;
    const startY = 100;

    if (layout.row === 0) return { x: startX + layout.col * (chipW + gapX), y: startY };
    if (layout.row === 1) return { x: (Screen.width - chipW) / 2, y: startY + chipH + gapY };
    return { x: startX + layout.col * (chipW + gapX), y: startY + 2 * (chipH + gapY) };
  }

  function isOrange(index) {
    return results[index] && results[index].hero.rank === 'orange';
  }

  function advanceReveal() {
    if (currentIndex < results.length - 1) {
      currentIndex++;
      phase = PHASE_GLOW;
      phaseTimer = 0;
      waitingForTap = false;
    } else {
      waitingForTap = false;
      allRevealed = true;
    }
  }

  // Draw the golden glow pillar effect (三国志战略版 style)
  function drawGlowPillar(ctx, x, y, w, h, intensity, phaseTime) {
    const cx = x + w / 2;
    const cy = y + h / 2;

    // Outer radiance
    const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 1.2);
    outerGrad.addColorStop(0, `rgba(255,220,100,${0.9 * intensity})`);
    outerGrad.addColorStop(0.3, `rgba(255,200,80,${0.6 * intensity})`);
    outerGrad.addColorStop(0.6, `rgba(255,180,60,${0.3 * intensity})`);
    outerGrad.addColorStop(1, 'rgba(255,160,40,0)');
    ctx.fillStyle = outerGrad;
    ctx.fillRect(x - w * 0.5, y - h * 0.5, w * 2, h * 2);

    // Vertical light pillar
    const pillarGrad = ctx.createLinearGradient(cx, y - h * 0.3, cx, y + h * 1.3);
    pillarGrad.addColorStop(0, 'rgba(255,240,180,0)');
    pillarGrad.addColorStop(0.5, `rgba(255,240,200,${0.95 * intensity})`);
    pillarGrad.addColorStop(1, 'rgba(255,220,150,0)');
    ctx.fillStyle = pillarGrad;
    ctx.fillRect(cx - w * 0.15, y - h * 0.3, w * 0.3, h * 1.6);

    // Sparkle particles
    for (let i = 0; i < 8; i++) {
      const angle = phaseTime * 3 + i * (Math.PI / 4);
      const dist = w * 0.4 + Math.sin(phaseTime * 5 + i) * w * 0.15;
      const sx = cx + Math.cos(angle) * dist;
      const sy = cy + Math.sin(angle) * dist * 0.6;
      const size = 2 + Math.sin(phaseTime * 8 + i * 2) * 1.5;
      const alpha = 0.6 + 0.4 * Math.sin(phaseTime * 6 + i * 3);
      ctx.fillStyle = `rgba(255,255,220,${alpha * intensity})`;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Golden frame flash
    ctx.strokeStyle = `rgba(255,215,0,${0.8 * intensity})`;
    ctx.lineWidth = 3 + 2 * Math.sin(phaseTime * 10);
    roundRect(ctx, x - 4, y - 4, w + 8, h + 8, 12);
    ctx.stroke();
  }

  return {
    onEnter() {
      animTimer = 0;
      currentIndex = 0;
      phase = PHASE_GLOW;
      phaseTimer = 0;
      waitingForTap = false;
      allRevealed = false;
      buttons = [
        new Button({
          x: Screen.width / 2 - 100,
          y: Screen.height - 80,
          w: 200,
          h: 52,
          text: '确定',
          gradient: ['#c88820', '#a06810'],
          onTap: () => sceneManager.pop(),
        }),
      ];
    },
    update(dt) {
      animTimer += dt;
      phaseTimer += dt;

      if (waitingForTap || allRevealed) {
        buttons.forEach((b) => b.update(dt));
        return;
      }

      if (currentIndex < results.length) {
        const isO = isOrange(currentIndex);

        if (phase === PHASE_GLOW) {
          // Glow phase: 1 second of intense golden light
          const glowDuration = isO ? 1.2 : 0.8;
          if (phaseTimer >= glowDuration) {
            phase = PHASE_FADE;
            phaseTimer = 0;
          }
        } else if (phase === PHASE_FADE) {
          // Fade phase: glow dissolves, hero appears
          const fadeDuration = isO ? 0.8 : 0.5;
          if (phaseTimer >= fadeDuration) {
            phase = PHASE_DONE;
            phaseTimer = 0;
            if (isO) {
              waitingForTap = true;
            } else {
              // Auto-advance for non-orange
              setTimeout(() => advanceReveal(), 300);
            }
          }
        } else if (phase === PHASE_DONE) {
          if (!isO) {
            advanceReveal();
          }
        }
      }

      buttons.forEach((b) => b.update(dt));
    },
    render(ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, Screen.height);
      grad.addColorStop(0, COLORS.bgResult[0]);
      grad.addColorStop(1, COLORS.bgResult[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, Screen.width, Screen.height);

      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.textGold;
      ctx.font = 'bold 26px serif';
      ctx.fillText('召唤结果', Screen.width / 2, 50);
      drawCloudDivider(ctx, Screen.width / 2 - 50, 70, 100);

      for (let i = 0; i <= currentIndex && i < results.length; i++) {
        const r = results[i];
        const pos = getCardPos(i);
        const x = pos.x;
        const y = pos.y;
        const isCurrent = i === currentIndex;
        const isO = isOrange(i);

        ctx.save();

        if (isCurrent && phase === PHASE_GLOW) {
          // Intense golden glow phase
          const intensity = Math.min(1, phaseTimer / 0.3); // ramp up quickly
          drawGlowPillar(ctx, x, y, chipW, chipH, intensity, phaseTimer);

          // Silhouette of hero in the glow (white outline)
          ctx.globalAlpha = 0.3 + 0.3 * Math.sin(phaseTimer * 8);
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.floor(chipW * 0.4)}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(r.hero.name[0], x + chipW / 2, y + chipH / 2);
        } else if (isCurrent && phase === PHASE_FADE) {
          // Glow fading, hero appearing
          const fadeT = phaseTimer / (isO ? 0.8 : 0.5);
          const glowIntensity = 1 - fadeT;
          const heroAlpha = fadeT;

          // Remaining glow
          if (glowIntensity > 0.1) {
            drawGlowPillar(ctx, x, y, chipW, chipH, glowIntensity * 0.5, phaseTimer);
          }

          // Hero card fading in
          ctx.globalAlpha = heroAlpha;
          const tag = r.isNew ? '新武将' : `+${r.shardsGained}碎片`;
          const tagColor = r.isNew ? COLORS.textGreen : COLORS.textYellow;
          drawHeroChip(ctx, r.hero, x, y, chipW, chipH, { tag, tagColor });
        } else {
          // Fully revealed or previous cards
          const tag = r.isNew ? '新武将' : `+${r.shardsGained}碎片`;
          const tagColor = r.isNew ? COLORS.textGreen : COLORS.textYellow;

          // Subtle residual glow for orange
          if (isO) {
            ctx.globalAlpha = 0.15;
            const glowGrad = ctx.createRadialGradient(
              x + chipW / 2, y + chipH / 2, chipW * 0.3,
              x + chipW / 2, y + chipH / 2, chipW * 0.9
            );
            glowGrad.addColorStop(0, 'rgba(255,200,50,0.3)');
            glowGrad.addColorStop(1, 'rgba(255,200,50,0)');
            ctx.fillStyle = glowGrad;
            ctx.fillRect(x - 20, y - 20, chipW + 40, chipH + 40);
            ctx.globalAlpha = 1;
          }

          drawHeroChip(ctx, r.hero, x, y, chipW, chipH, { tag, tagColor });
        }

        ctx.restore();
      }

      // Waiting prompt for orange card
      if (waitingForTap) {
        ctx.fillStyle = COLORS.textGold;
        ctx.font = 'bold 18px serif';
        ctx.textAlign = 'center';
        ctx.fillText('点击屏幕继续', Screen.width / 2, Screen.height - 120);

        const pulse = 0.5 + 0.5 * Math.sin(animTimer * 4);
        ctx.fillStyle = `rgba(212,175,55,${pulse})`;
        ctx.beginPath();
        ctx.arc(Screen.width / 2, Screen.height - 140, 8 + 4 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      if (allRevealed) {
        buttons.forEach((b) => b.render(ctx));
      }
    },
    onTouchStart(x, y) {
      buttons.forEach((b) => b.handleTouchStart(x, y));
    },
    onTouchEnd(x, y) {
      if (waitingForTap) {
        advanceReveal();
        return;
      }
      buttons.forEach((b) => b.handleTouchEnd(x, y));
    },
  };
}

module.exports = createGachaResultScene;
