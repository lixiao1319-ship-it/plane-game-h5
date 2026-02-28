/**
 * 游戏全局配置
 */
const GameConfig = {
  // 画布
  canvas: {
    width: 375,
    height: 667,
  },

  // 帧率
  fps: 60,

  // 玩家配置
  player: {
    speed: 5,
    maxHp: 3,
    bulletSpeed: 10,
    fireRate: 15,       // 每隔多少帧射击一次
    invincibleTime: 120, // 无敌帧数（受伤后）
  },

  // 敌机配置（按类型分级）
  enemy: {
    small: {
      hp: 1,
      speed: 3,
      score: 100,
      spawnWeight: 60,  // 生成权重
    },
    medium: {
      hp: 3,
      speed: 2,
      score: 300,
      spawnWeight: 30,
    },
    boss: {
      hp: 20,
      speed: 1,
      score: 2000,
      spawnWeight: 10,
    },
  },

  // 敌机生成节奏
  spawn: {
    initialInterval: 80,  // 初始生成间隔（帧）
    minInterval: 20,      // 最小生成间隔
    difficultyStep: 500,  // 每积累多少分加快一次
  },

  // 道具
  powerUp: {
    dropChance: 0.15,      // 击杀敌机后道具掉落概率
    speed: 2,
    types: ['shield', 'doubleFire', 'bomb'],
  },

  // 音频
  audio: {
    bgmVolume: 0.4,
    sfxVolume: 0.8,
  },

  // 存储 key
  storage: {
    highScore: 'planeGame_highScore',
    settings: 'planeGame_settings',
  },
};

export default GameConfig;
