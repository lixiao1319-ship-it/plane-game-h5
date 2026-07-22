// Unified design tokens for consistent visuals across all scenes.
// Style: 暗黑国风 (Dark Chinese Fantasy) — deep indigo/ink base, gold accents,
// celadon/teal secondary colors.

const COLORS = {
  // Scene backgrounds — deep indigo/ink tones
  bgHome: ['#1a1a2e', '#16213e'],
  bgGacha: ['#1a1a2e', '#16213e'],
  bgRoster: ['#1a1a2e', '#16213e'],
  bgResult: ['#1a1a2e', '#16213e'],
  bgDetail: {
    orange: ['#2a1a3e', '#1a1a2e'],
    purple: ['#2a1a3e', '#1a1a2e'],
    blue: ['#1a2a3e', '#1a1a2e'],
  },

  // Surface — subtle elevated panels
  surface: 'rgba(255,255,255,0.06)',
  surfaceBorder: 'rgba(255,255,255,0.10)',
  surfaceLight: 'rgba(255,255,255,0.04)',
  surfaceDark: 'rgba(0,0,0,0.3)',

  // Text
  textPrimary: '#e8e4d8',      // warm white (paper/ink)
  textSecondary: '#a8a898',    // muted sage
  textMuted: '#6a6a7a',        // dim indigo-gray
  textGold: '#d4af37',         // classic gold
  textYellow: '#e8d44d',       // bright gold
  textBlue: '#7ec8e3',         // celadon blue
  textGreen: '#7ec8a0',        // jade green
  textRed: '#e07a5f',          // terracotta red

  // Quality (rank) colors — used for borders, glows, badges
  rank: {
    orange: {
      main: '#e8a838',
      glow: 'rgba(232,168,56,0.35)',
      dim: 'rgba(232,168,56,0.15)',
      gradient: ['#f0c060', '#c88820'],
      label: '橙色·传说',
    },
    purple: {
      main: '#a878e8',
      glow: 'rgba(168,120,232,0.30)',
      dim: 'rgba(168,120,232,0.15)',
      gradient: ['#c090f0', '#8858d0'],
      label: '紫色·史诗',
    },
    blue: {
      main: '#5898d8',
      glow: 'rgba(88,152,216,0.25)',
      dim: 'rgba(88,152,216,0.15)',
      gradient: ['#78b0e8', '#3870b8'],
      label: '蓝色·精良',
    },
  },

  // Camp (faction) colors — 魏蜀吴群
  camp: {
    魏: '#5898d8',   // Wei — celadon blue
    蜀: '#58a858',   // Shu — jade green
    吴: '#d85858',   // Wu — crimson red
    群: '#a878e8',   // Qun — mystic purple
  },

  // Class colors
  class: {
    战士: '#e08858',
    骑士: '#e8c858',
    弓手: '#58c888',
    谋士: '#78a8e8',
    召唤: '#b888e8',
    治疗: '#78d8a8',
  },

  // Decorative
  divider: 'rgba(212,175,55,0.2)',
  inkWash: 'rgba(32,32,64,0.6)',
};

const FONT = {
  title: 'bold 32px sans-serif',
  heading: 'bold 26px sans-serif',
  subheading: 'bold 20px sans-serif',
  body: '18px sans-serif',
  bodySmall: '16px sans-serif',
  caption: '14px sans-serif',
  tiny: '13px sans-serif',
  button: 'bold 22px sans-serif',
  buttonSmall: 'bold 18px sans-serif',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

const RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  pill: 999,
};

module.exports = { COLORS, FONT, SPACING, RADIUS };
