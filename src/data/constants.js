// Numeric constants sourced from docs/design-mvp-v2.md sections 零(数值系统) and 八(抽卡系统).

module.exports = {
  RANK: {
    orange: { label: '橙色·传说', color: '#ff7a1a' },
    purple: { label: '紫色·史诗', color: '#a259ff' },
    blue: { label: '蓝色·精良', color: '#2f8bff' },
  },

  // 属性换算公式
  STAT_FORMULA: {
    hpPerTongshuai: 150, // 最大生命值 = 统率 × 150
    atkPerWuli: 12, // 物理攻击 = 武力 × 12
    matkPerZhili: 12, // 法术攻击 = 智力 × 12
    atkIntervalBase: 3.5,
    atkIntervalPerSudu: 0.02, // 普攻间隔 = 3.5 - 速度×0.02
  },

  // 等级成长：系数 = 1 + 0.08 × (等级-1)，1~15级
  MAX_LEVEL: 15,
  LEVEL_GROWTH_PER_LEVEL: 0.08,
  SPEED_GROWTH_PER_LEVEL: 1, // 速度 +1/级，不随升星成长

  // 升星系数
  STAR_MULTIPLIER: [1.0, 1.2, 1.45, 1.75, 2.15, 2.6], // index 0 = 1星
  MAX_STAR: 6,

  // 抽卡
  GACHA: {
    costPerDraw: 200,
    tenDrawCost: 1800, // 9折
    baseRate: { orange: 0.02, purple: 0.25, blue: 0.73 },
    orangeRateStep: 0.004, // 每次未出橙色 +0.4%
    orangePity: 70, // 70抽必出橙色
    purplePity: 10, // 10抽必出紫色以上
  },

  // 重复武将 -> 碎片
  DUPLICATE_SHARDS: { orange: 30, purple: 15, blue: 5 },

  // 升星消耗碎片（累计）：index 0 = 1→2星 所需碎片
  STAR_UP_COST: [20, 40, 60, 80, 120],

  // 体力
  STAMINA: {
    max: 60,
    regenPerMinutes: 30, // +1点/30分钟
    cost: { normal: 5, elite: 10, weeklyBoss: 15 },
  },

  // 初始玩家资源（新手引导用，可按需调整）
  STARTING_RESOURCES: {
    gold: 2000,
    yuanbao: 300,
    stamina: 60,
  },
};
