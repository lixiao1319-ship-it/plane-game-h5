// Auto-generated from docs/design-mvp-v2.md. Do not hand-edit — regenerate via `node scripts/gen-heroes.js` if the design doc changes.
module.exports = [
  {
    "id": "曹操",
    "assetId": "h001",
    "name": "曹操",
    "camp": "魏",
    "rank": "orange",
    "class": "骑士",
    "stats": {
      "wuli": 85,
      "zhili": 92,
      "tongshuai": 95,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "虎豹骑",
        "desc": "召唤精锐骑兵冲阵，武力×200%伤害",
        "cd": 12
      },
      "jueji": {
        "name": "挟天子令",
        "desc": "己方全体武力+30%、攻速+20%，持续10秒",
        "cd": 40
      },
      "tianfu": {
        "name": "治世之能臣",
        "desc": "每有一名魏国武将上阵，己方小兵出兵速度+3%（最高+15%）"
      }
    }
  },
  {
    "id": "刘备",
    "assetId": "h002",
    "name": "刘备",
    "camp": "蜀",
    "rank": "orange",
    "class": "治疗",
    "stats": {
      "wuli": 72,
      "zhili": 78,
      "tongshuai": 90,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "仁义之师",
        "desc": "为生命最低的友方武将回复（统率×200%）",
        "cd": 10
      },
      "jueji": {
        "name": "汉室兴复",
        "desc": "己方全体全属性+20%，持续15秒",
        "cd": 45
      },
      "tianfu": {
        "name": "汉室宗亲",
        "desc": "场上每有一名蜀国武将，全体蜀将统率+5%（最高+25%）"
      }
    }
  },
  {
    "id": "孙权",
    "assetId": "h003",
    "name": "孙权",
    "camp": "吴",
    "rank": "orange",
    "class": "谋士",
    "stats": {
      "wuli": 70,
      "zhili": 85,
      "tongshuai": 88,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "碧眼紫髯",
        "desc": "为全体吴国武将提供护盾（智力×120%）",
        "cd": 12
      },
      "jueji": {
        "name": "御驾亲征",
        "desc": "敌方全体攻击力-20%（10秒），己方全体统率+30%（15秒）",
        "cd": 50
      },
      "tianfu": {
        "name": "江东之主",
        "desc": "每有一名吴国武将上阵，小兵出兵速度+5%；吴国阵营加成+3%"
      }
    }
  },
  {
    "id": "诸葛亮",
    "assetId": "h004",
    "name": "诸葛亮",
    "camp": "蜀",
    "rank": "orange",
    "class": "谋士",
    "stats": {
      "wuli": 55,
      "zhili": 100,
      "tongshuai": 85,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "锦囊妙计",
        "desc": "为前排友方武将提供护盾（智力×150%），持续8秒",
        "cd": 12
      },
      "jueji": {
        "name": "草船借箭",
        "desc": "召唤箭雨对敌方全体造成智力×300%伤害",
        "cd": 50
      },
      "tianfu": {
        "name": "鞠躬尽瘁",
        "desc": "每30秒随机解除一名友方武将所有负面状态并回复智力×200%生命"
      }
    }
  },
  {
    "id": "周瑜",
    "assetId": "h006",
    "name": "周瑜",
    "camp": "吴",
    "rank": "orange",
    "class": "谋士",
    "stats": {
      "wuli": 65,
      "zhili": 98,
      "tongshuai": 82,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "妙计安天下",
        "desc": "己方下次技能伤害+50%",
        "cd": 10
      },
      "jueji": {
        "name": "赤壁火攻",
        "desc": "对敌方全体造成智力×350%持续火焰伤害（3秒）",
        "cd": 50
      },
      "tianfu": {
        "name": "江东都督",
        "desc": "己方法术武将智力+10%；「赤壁双雄」「江东双壁」缘分效果+10%"
      }
    }
  },
  {
    "id": "关羽",
    "assetId": "h007",
    "name": "关羽",
    "camp": "蜀",
    "rank": "orange",
    "class": "骑士",
    "stats": {
      "wuli": 100,
      "zhili": 72,
      "tongshuai": 92,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "青龙偃月",
        "desc": "横扫正面1~3名敌方武将，武力×200%",
        "cd": 12
      },
      "jueji": {
        "name": "过五关斩六将",
        "desc": "5秒内普攻伤害×250%，每次击杀回复自身10%生命",
        "cd": 45
      },
      "tianfu": {
        "name": "武圣",
        "desc": "血量<30%时武力+50%；与张飞、刘备同阵时额外+10%"
      }
    }
  },
  {
    "id": "张飞",
    "assetId": "h008",
    "name": "张飞",
    "camp": "蜀",
    "rank": "orange",
    "class": "战士",
    "stats": {
      "wuli": 95,
      "zhili": 55,
      "tongshuai": 88,
      "sudu": 82
    },
    "skills": {
      "zhanji": {
        "name": "当阳怒吼",
        "desc": "敌方全体武将攻击力-20%，持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "据水断桥",
        "desc": "横扫走廊全部小兵+正面敌将，武力×250%",
        "cd": 40
      },
      "tianfu": {
        "name": "万夫莫当",
        "desc": "上阵后前5秒吸引敌方全部攻击；己方战士小兵统率+20%"
      }
    }
  },
  {
    "id": "吕布",
    "assetId": "h009",
    "name": "吕布",
    "camp": "群",
    "rank": "orange",
    "class": "骑士",
    "stats": {
      "wuli": 100,
      "zhili": 60,
      "tongshuai": 85,
      "sudu": 90
    },
    "skills": {
      "zhanji": {
        "name": "方天画戟",
        "desc": "旋斩周围多名敌方武将，武力×200%",
        "cd": 10
      },
      "jueji": {
        "name": "天下无双",
        "desc": "武力+80%+免疫控制5秒",
        "cd": 50
      },
      "tianfu": {
        "name": "三姓家奴",
        "desc": "每场战斗武力基础+15%；与貂蝉同阵时武力额外+20%"
      }
    }
  },
  {
    "id": "司马懿",
    "assetId": "h016",
    "name": "司马懿",
    "camp": "魏",
    "rank": "orange",
    "class": "谋士",
    "stats": {
      "wuli": 62,
      "zhili": 95,
      "tongshuai": 80,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "鬼谋",
        "desc": "使敌方智力最高武将技能冷却延长5秒",
        "cd": 15
      },
      "jueji": {
        "name": "空城退兵",
        "desc": "使敌方随机2名武将沉默8秒",
        "cd": 45
      },
      "tianfu": {
        "name": "深谋远虑",
        "desc": "每20秒自动为己方全体提供护盾（智力×100%）"
      }
    }
  },
  {
    "id": "赵云",
    "assetId": "h001",
    "name": "赵云",
    "camp": "蜀",
    "rank": "orange",
    "class": "弓手",
    "stats": {
      "wuli": 92,
      "zhili": 68,
      "tongshuai": 88,
      "sudu": 88
    },
    "skills": {
      "zhanji": {
        "name": "龙胆银枪",
        "desc": "穿透刺击正面敌将，武力×220%+目标武力-10%（5秒）",
        "cd": 10
      },
      "jueji": {
        "name": "单骑救主",
        "desc": "为生命最低友方武将附加护盾（自身统率×50%），自身输出+20%，持续8秒",
        "cd": 40
      },
      "tianfu": {
        "name": "常胜将军",
        "desc": "受暴击时50%概率免疫该次伤害；弓手小兵攻击力+15%"
      }
    }
  },
  {
    "id": "典韦",
    "assetId": "h002",
    "name": "典韦",
    "camp": "魏",
    "rank": "orange",
    "class": "战士",
    "stats": {
      "wuli": 95,
      "zhili": 45,
      "tongshuai": 95,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "铁壁",
        "desc": "自身附加护盾（统率×40%）并横扫周围小兵（武力×120%）",
        "cd": 10
      },
      "jueji": {
        "name": "虎痴怒吼",
        "desc": "狂暴8秒，武力+60%、移速+30%",
        "cd": 35
      },
      "tianfu": {
        "name": "无双上将",
        "desc": "统率+20%；受致命伤时30%概率以1点生命存活（每场一次）"
      }
    }
  },
  {
    "id": "夏侯惇",
    "assetId": "h003",
    "name": "夏侯惇",
    "camp": "魏",
    "rank": "orange",
    "class": "战士",
    "stats": {
      "wuli": 90,
      "zhili": 52,
      "tongshuai": 92,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "独眼怒吼",
        "desc": "吸收下次伤害并反击（吸收量×150%）",
        "cd": 15
      },
      "jueji": {
        "name": "拔矢啖睛",
        "desc": "无视一次致命伤害并反攻，己方全体武将武力+15%，持续12秒",
        "cd": 50
      },
      "tianfu": {
        "name": "魏之柱石",
        "desc": "统率+15%；相邻槽位武将受到的伤害减少8%"
      }
    }
  },
  {
    "id": "孙策",
    "assetId": "h004",
    "name": "孙策",
    "camp": "吴",
    "rank": "orange",
    "class": "骑士",
    "stats": {
      "wuli": 95,
      "zhili": 62,
      "tongshuai": 88,
      "sudu": 88
    },
    "skills": {
      "zhanji": {
        "name": "小霸王",
        "desc": "冲锋，武力×220%击退敌方武将",
        "cd": 12
      },
      "jueji": {
        "name": "百战雄师",
        "desc": "武力×300%爆发+敌方全体攻击力-15%（8秒）",
        "cd": 45
      },
      "tianfu": {
        "name": "少年英主",
        "desc": "战斗前3分钟武力+25%；与周瑜同阵时两人武力各+10%"
      }
    }
  },
  {
    "id": "陆逊",
    "assetId": "h006",
    "name": "陆逊",
    "camp": "吴",
    "rank": "orange",
    "class": "谋士",
    "stats": {
      "wuli": 58,
      "zhili": 94,
      "tongshuai": 82,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "夷陵之谋",
        "desc": "敌方下次技能伤害减少40%",
        "cd": 15
      },
      "jueji": {
        "name": "火烧连营",
        "desc": "敌方全体持续灼烧（每秒智力×80%，持续8秒）+敌方兵力值回复速度-50%（5秒）",
        "cd": 50
      },
      "tianfu": {
        "name": "儒将风范",
        "desc": "战斗满3分钟后智力+20%；吴国武将每10秒自动回复智力×50%生命"
      }
    }
  },
  {
    "id": "孙坚",
    "assetId": "h007",
    "name": "孙坚",
    "camp": "吴",
    "rank": "orange",
    "class": "骑士",
    "stats": {
      "wuli": 92,
      "zhili": 62,
      "tongshuai": 85,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "江东猛虎",
        "desc": "武力×180%冲击并击退",
        "cd": 12
      },
      "jueji": {
        "name": "玉玺之力",
        "desc": "全体武将全属性+20%持续8秒",
        "cd": 45
      },
      "tianfu": {
        "name": "霸王之气",
        "desc": "吴国武将武力+5%；孙策存在时两人武力各+10%；阵亡后为吴国武将留下统率×20%护盾"
      }
    }
  },
  {
    "id": "张辽",
    "assetId": "h008",
    "name": "张辽",
    "camp": "魏",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 90,
      "zhili": 65,
      "tongshuai": 85,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "威震逍遥",
        "desc": "冲击正面敌将，武力×180%并击退",
        "cd": 12
      },
      "jueji": {
        "name": "陷阵先锋",
        "desc": "对敌方全体造成武力×150%+使敌方混乱（攻击力-20%，5秒）",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "战斗开始时武力+20%，随时间线性递减（5分钟后归零）"
      }
    }
  },
  {
    "id": "郭嘉",
    "assetId": "h009",
    "name": "郭嘉",
    "camp": "魏",
    "rank": "purple",
    "class": "谋士",
    "stats": {
      "wuli": 48,
      "zhili": 96,
      "tongshuai": 75,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "十胜十败论",
        "desc": "己方所有技能冷却立即减少3秒",
        "cd": 15
      },
      "jueji": {
        "name": "遗计定辽东",
        "desc": "为己方随机3名武将提升各自最高属性20%，持续15秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "每次技能释放后20%概率免费再触发一次同一技能"
      }
    }
  },
  {
    "id": "庞统",
    "assetId": "h016",
    "name": "庞统",
    "camp": "蜀",
    "rank": "purple",
    "class": "谋士",
    "stats": {
      "wuli": 52,
      "zhili": 95,
      "tongshuai": 78,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "连环计",
        "desc": "对敌方随机2名武将施「连环」标记，下次受伤时爆炸溅射（智力×150%）",
        "cd": 12
      },
      "jueji": {
        "name": "凤雏天火",
        "desc": "天火灼烧敌方全体，每秒智力×50%伤害，持续8秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与诸葛亮同阵时技能冷却-20%；法术技能伤害+15%"
      }
    }
  },
  {
    "id": "马超",
    "assetId": "h001",
    "name": "马超",
    "camp": "蜀",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 95,
      "zhili": 55,
      "tongshuai": 82,
      "sudu": 92
    },
    "skills": {
      "zhanji": {
        "name": "西凉铁骑",
        "desc": "骑兵冲阵，武力×200%+目标减速5秒",
        "cd": 12
      },
      "jueji": {
        "name": "神威天将军",
        "desc": "武力+50%+免疫控制3秒，结束后武力×300%",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "己方骑士武将武力+10%；战斗前3分钟武力额外+15%"
      }
    }
  },
  {
    "id": "黄忠",
    "assetId": "h002",
    "name": "黄忠",
    "camp": "蜀",
    "rank": "purple",
    "class": "弓手",
    "stats": {
      "wuli": 92,
      "zhili": 58,
      "tongshuai": 80,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "百步穿杨",
        "desc": "狙击血量最低敌将，武力×300%暴击",
        "cd": 15
      },
      "jueji": {
        "name": "沙场老将·满弓",
        "desc": "下次普攻变为武力×400%+5秒眩晕",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "战斗满5分钟后，武力每分钟+10%（最高+50%）"
      }
    }
  },
  {
    "id": "魏延",
    "assetId": "h003",
    "name": "魏延",
    "camp": "蜀",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 88,
      "zhili": 60,
      "tongshuai": 80,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "子午谷奇谋",
        "desc": "武力×200%突袭并减速目标3秒",
        "cd": 12
      },
      "jueji": {
        "name": "反骨涌动",
        "desc": "武力+60%持续8秒，战斗满5分钟后CD缩短至25s",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "独自上阵时武力+30%；阵中有其他武将时此天赋消失"
      }
    }
  },
  {
    "id": "太史慈",
    "assetId": "h004",
    "name": "太史慈",
    "camp": "吴",
    "rank": "purple",
    "class": "弓手",
    "stats": {
      "wuli": 90,
      "zhili": 62,
      "tongshuai": 82,
      "sudu": 88
    },
    "skills": {
      "zhanji": {
        "name": "神射手",
        "desc": "武力×200%精准射击单体，附加流血3秒",
        "cd": 10
      },
      "jueji": {
        "name": "箭如雨下",
        "desc": "对敌方全体走廊射箭，武力×150%群体",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "弓手小兵攻击力+20%；暴击率+10%"
      }
    }
  },
  {
    "id": "甘宁",
    "assetId": "h006",
    "name": "甘宁",
    "camp": "吴",
    "rank": "purple",
    "class": "召唤",
    "stats": {
      "wuli": 88,
      "zhili": 55,
      "tongshuai": 80,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "百骑劫营",
        "desc": "对随机3条走廊小兵造成武力×180%群体伤害",
        "cd": 12
      },
      "jueji": {
        "name": "锦帆贼",
        "desc": "攻速+60%持续10秒，普攻30%概率额外溅射武力×100%",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "己方战士小兵数量+2；甘宁阵亡后留下的小兵攻击力+30%（持续5秒）"
      }
    }
  },
  {
    "id": "周泰",
    "assetId": "h007",
    "name": "周泰",
    "camp": "吴",
    "rank": "purple",
    "class": "战士",
    "stats": {
      "wuli": 82,
      "zhili": 45,
      "tongshuai": 92,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "护主铁盾",
        "desc": "指定孙权或血量最低友方武将，格挡下次伤害的100%",
        "cd": 10
      },
      "jueji": {
        "name": "百战伤痕",
        "desc": "进入狂怒：血量越低武力越高（最高+80%），持续8秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "血量<50%时所受伤害-15%，护盾效果+30%"
      }
    }
  },
  {
    "id": "貂蝉",
    "assetId": "h008",
    "name": "貂蝉",
    "camp": "群",
    "rank": "purple",
    "class": "谋士",
    "stats": {
      "wuli": 40,
      "zhili": 90,
      "tongshuai": 72,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "连环美人计",
        "desc": "魅惑最近的敌方武将，停止行动3秒",
        "cd": 15
      },
      "jueji": {
        "name": "倾国倾城",
        "desc": "敌方全体混乱（随机攻击5秒）；己方全体速度+20%",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "每次有友方武将阵亡时统率+10%（上限+50%）；统率每增加10点小兵数量+1"
      }
    }
  },
  {
    "id": "袁绍",
    "assetId": "h009",
    "name": "袁绍",
    "camp": "群",
    "rank": "purple",
    "class": "弓手",
    "stats": {
      "wuli": 78,
      "zhili": 70,
      "tongshuai": 85,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "河北弓骑",
        "desc": "精锐弓骑攻击2条走廊小兵，武力×200%",
        "cd": 12
      },
      "jueji": {
        "name": "四世三公",
        "desc": "己方全体全属性+15%，持续12秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "初始智力+20%；但每次技能释放有10%概率无效（性格特征反映）"
      }
    }
  },
  {
    "id": "吕蒙",
    "assetId": "h016",
    "name": "吕蒙",
    "camp": "吴",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 82,
      "zhili": 75,
      "tongshuai": 80,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "白衣渡江",
        "desc": "使一名敌将天赋失效5秒",
        "cd": 15
      },
      "jueji": {
        "name": "偷袭荆州",
        "desc": "使敌方2名武将技能封印8秒+己方全体攻速+15%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将武力+8%；每次天赋失效触发时回复智力×100%生命"
      }
    }
  },
  {
    "id": "荀彧",
    "assetId": "h001",
    "name": "荀彧",
    "camp": "魏",
    "rank": "purple",
    "class": "治疗",
    "stats": {
      "wuli": 45,
      "zhili": 94,
      "tongshuai": 78,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "王佐之才",
        "desc": "为武力最高的友方武将攻速+30%持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "运筹帷幄",
        "desc": "己方全体技能CD立即减少10秒",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "每10秒为全体回复智力×80%生命"
      }
    }
  },
  {
    "id": "姜维",
    "assetId": "h002",
    "name": "姜维",
    "camp": "蜀",
    "rank": "purple",
    "class": "弓手",
    "stats": {
      "wuli": 88,
      "zhili": 72,
      "tongshuai": 80,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "九伐中原",
        "desc": "连续射击3次，每次武力×100%",
        "cd": 10
      },
      "jueji": {
        "name": "承诸葛遗志",
        "desc": "对敌方全体造成武力×200%+使最弱目标眩晕3秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "每有蜀将阵亡武力+8%（上限+40%）"
      }
    }
  },
  {
    "id": "鲁肃",
    "assetId": "h003",
    "name": "鲁肃",
    "camp": "吴",
    "rank": "purple",
    "class": "治疗",
    "stats": {
      "wuli": 55,
      "zhili": 85,
      "tongshuai": 80,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "借荆州",
        "desc": "为武力最高友方武将提升全属性15%，持续8秒",
        "cd": 12
      },
      "jueji": {
        "name": "鸿儒之谋",
        "desc": "为全体友方立即降低所有技能CD 5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将统率+10%；促成缘分触发时额外提供全体护盾（统率×10%）"
      }
    }
  },
  {
    "id": "许褚",
    "assetId": "h004",
    "name": "许褚",
    "camp": "魏",
    "rank": "purple",
    "class": "战士",
    "stats": {
      "wuli": 95,
      "zhili": 42,
      "tongshuai": 92,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "裸衣狂战",
        "desc": "武力×180%并进入狂暴状态3秒",
        "cd": 10
      },
      "jueji": {
        "name": "虎侯",
        "desc": "武力+70%并免疫控制，持续6秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "与曹操同阵时武力额外+15%；受击时20%概率反伤武力×50%"
      }
    }
  },
  {
    "id": "张郃",
    "assetId": "h006",
    "name": "张郃",
    "camp": "魏",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 85,
      "zhili": 65,
      "tongshuai": 80,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "料敌先机",
        "desc": "绕后袭击目标武将武力×180%",
        "cd": 12
      },
      "jueji": {
        "name": "鹰扬将军",
        "desc": "己方全体骑士武将和骑士小兵攻速+20%持续10秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "战斗满5分钟后武力+20%"
      }
    }
  },
  {
    "id": "曹仁",
    "assetId": "h007",
    "name": "曹仁",
    "camp": "魏",
    "rank": "purple",
    "class": "战士",
    "stats": {
      "wuli": 82,
      "zhili": 60,
      "tongshuai": 88,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "仁德铁壁",
        "desc": "为前排2名友方武将各加护盾（统率×30%）",
        "cd": 12
      },
      "jueji": {
        "name": "曹氏铁骑",
        "desc": "全体护盾（统率×60%）+骑兵冲阵武力×150%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "战士小兵生命+20%"
      }
    }
  },
  {
    "id": "袁术",
    "assetId": "h008",
    "name": "袁术",
    "camp": "群",
    "rank": "purple",
    "class": "谋士",
    "stats": {
      "wuli": 65,
      "zhili": 72,
      "tongshuai": 75,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "僭越称帝",
        "desc": "全属性+10%持续5秒，5秒后负面抵消",
        "cd": 12
      },
      "jueji": {
        "name": "冢中枯骨",
        "desc": "对敌全体智力×180%伤害+己方武力+15%持续8秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "初始兵力值+3，但出兵速度-15%；血量低于30%时技能CD+50%"
      }
    }
  },
  {
    "id": "公孙瓒",
    "assetId": "h009",
    "name": "公孙瓒",
    "camp": "群",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 82,
      "zhili": 55,
      "tongshuai": 80,
      "sudu": 82
    },
    "skills": {
      "zhanji": {
        "name": "白马义从",
        "desc": "白马骑兵冲锋，武力×180%+减速3秒",
        "cd": 12
      },
      "jueji": {
        "name": "界桥之战",
        "desc": "己方全体骑士武将武力+30%持续8秒+召唤额外骑兵冲锋",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "己方骑士武将武力+10%；骑士小兵攻击力+10%"
      }
    }
  },
  {
    "id": "孟获",
    "assetId": "h016",
    "name": "孟获",
    "camp": "群",
    "rank": "purple",
    "class": "召唤",
    "stats": {
      "wuli": 90,
      "zhili": 45,
      "tongshuai": 92,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "七擒七纵",
        "desc": "当血量降至0时恢复20%生命（每场一次），被动触发无CD"
      },
      "jueji": {
        "name": "南蛮勇士",
        "desc": "召唤5名南蛮大兵同时涌入两条走廊",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "统率+20%；「七擒七纵」每场可触发一次，触发后武力+30%"
      }
    }
  },
  {
    "id": "祝融",
    "assetId": "h001",
    "name": "祝融",
    "camp": "群",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 85,
      "zhili": 60,
      "tongshuai": 80,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "蛮王夫人",
        "desc": "冲刺并携带火焰武力×180%+灼烧3秒",
        "cd": 10
      },
      "jueji": {
        "name": "南蛮火阵",
        "desc": "在走廊布置火阵，敌兵通过时每秒受智力×80%灼烧，持续10秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与孟获同阵时武力+20%、速度+20%；火焰伤害+10%"
      }
    }
  },
  {
    "id": "黄月英",
    "assetId": "h002",
    "name": "黄月英",
    "camp": "蜀",
    "rank": "purple",
    "class": "召唤",
    "stats": {
      "wuli": 50,
      "zhili": 90,
      "tongshuai": 75,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "机关术",
        "desc": "在走廊布置一座机关炮，每4秒自动攻击敌方小兵（武力×80%）",
        "cd": 12
      },
      "jueji": {
        "name": "木牛流马",
        "desc": "走廊部署3辆木牛流马作为移动障碍，持续20秒",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "与诸葛亮同阵时技能冷却-15%；机关类单位统率+30%"
      }
    }
  },
  {
    "id": "关兴",
    "assetId": "h003",
    "name": "关兴",
    "camp": "蜀",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 85,
      "zhili": 60,
      "tongshuai": 78,
      "sudu": 82
    },
    "skills": {
      "zhanji": {
        "name": "虎父无犬子",
        "desc": "冲刺，武力×180%+30%概率使目标眩晕2秒",
        "cd": 12
      },
      "jueji": {
        "name": "汉将后裔",
        "desc": "武力×250%单体爆发；与关羽同阵时升级为武力×350%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与关羽同阵时武力+20%；继承关羽天赋「武圣」10%效果"
      }
    }
  },
  {
    "id": "张苞",
    "assetId": "h004",
    "name": "张苞",
    "camp": "蜀",
    "rank": "purple",
    "class": "战士",
    "stats": {
      "wuli": 85,
      "zhili": 52,
      "tongshuai": 80,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "猛将遗风",
        "desc": "武力×170%横扫前排，穿刺2名目标",
        "cd": 10
      },
      "jueji": {
        "name": "张飞之子",
        "desc": "横扫全场武将+走廊，武力×220%；与张飞同阵时升级为武力×300%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与张飞同阵时武力+20%；战士小兵穿刺目标+1"
      }
    }
  },
  {
    "id": "马岱",
    "assetId": "h006",
    "name": "马岱",
    "camp": "蜀",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 82,
      "zhili": 58,
      "tongshuai": 78,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "奇袭斩将",
        "desc": "下次攻击必定暴击（武力×200%）",
        "cd": 12
      },
      "jueji": {
        "name": "马家铁骑",
        "desc": "召唤骑兵冲锋走廊，武力×180%全体",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "骑士小兵移速+20%；斩杀敌将时立即重置战技CD"
      }
    }
  },
  {
    "id": "夏侯渊",
    "assetId": "h007",
    "name": "夏侯渊",
    "camp": "魏",
    "rank": "purple",
    "class": "弓手",
    "stats": {
      "wuli": 88,
      "zhili": 55,
      "tongshuai": 80,
      "sudu": 90
    },
    "skills": {
      "zhanji": {
        "name": "神速弓骑",
        "desc": "武力×160%+目标减速3秒",
        "cd": 12
      },
      "jueji": {
        "name": "虎步关右",
        "desc": "正面武力×200%+己方全体攻速+20%持续8秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "弓手小兵攻速+15%"
      }
    }
  },
  {
    "id": "大乔",
    "assetId": "h008",
    "name": "大乔",
    "camp": "吴",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 38,
      "zhili": 85,
      "tongshuai": 75,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "国色天香",
        "desc": "为生命最低的2名友方武将回复生命（智力×200%），CD 10秒"
      },
      "jueji": {
        "name": "倾国芳华",
        "desc": "治愈光环，全体友方每秒回复（智力×150%），持续5秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "友方武将血量<50%时受到的伤害减少10%；与小乔同阵时治疗量+25%"
      }
    }
  },
  {
    "id": "小乔",
    "assetId": "h009",
    "name": "小乔",
    "camp": "吴",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 35,
      "zhili": 88,
      "tongshuai": 72,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "娇美如花",
        "desc": "为指定友方武将附加「花护」，下次受伤减少50%，CD 10秒",
        "cd": 5
      },
      "jueji": {
        "name": "梦幻泡影",
        "desc": "敌方全体停止攻击3秒；己方获得统率×100%护盾",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "法术技能伤害+10%；每当周瑜使用技能时，小乔治疗量+15%（5秒）"
      }
    }
  },
  {
    "id": "曹洪",
    "assetId": "h016",
    "name": "曹洪",
    "camp": "魏",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 80,
      "zhili": 52,
      "tongshuai": 80,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "护主骑冲",
        "desc": "武力×160%冲击并减缓目标",
        "cd": 12
      },
      "jueji": {
        "name": "家族忠心",
        "desc": "友方全体武力+20%持续10秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "曹魏武将阵亡后其武力×50%转移给相邻友方（持续5秒）"
      }
    }
  },
  {
    "id": "荀攸",
    "assetId": "h001",
    "name": "荀攸",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 42,
      "zhili": 90,
      "tongshuai": 72,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "奇计",
        "desc": "随机控制一名敌将眩晕2秒",
        "cd": 12
      },
      "jueji": {
        "name": "十二奇策",
        "desc": "敌方全体移速-50%+技能封印5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将智力+8%"
      }
    }
  },
  {
    "id": "程昱",
    "assetId": "h002",
    "name": "程昱",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 45,
      "zhili": 88,
      "tongshuai": 70,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "毒计",
        "desc": "对敌将施加持续智力×60%灼烧伤害，5秒",
        "cd": 10
      },
      "jueji": {
        "name": "骗粮",
        "desc": "敌方兵力值回复速度-50%持续10秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方法术伤害+10%"
      }
    }
  },
  {
    "id": "徐晃",
    "assetId": "h003",
    "name": "徐晃",
    "camp": "魏",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 82,
      "zhili": 52,
      "tongshuai": 80,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "长驱直入",
        "desc": "横扫走廊全体小兵，武力×160%",
        "cd": 12
      },
      "jueji": {
        "name": "大斧劈阵",
        "desc": "对前排敌方武将武力×220%并击退",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "战士小兵每次攻击穿刺2个目标"
      }
    }
  },
  {
    "id": "曹丕",
    "assetId": "h004",
    "name": "曹丕",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 65,
      "zhili": 82,
      "tongshuai": 75,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "文帝令",
        "desc": "使一名敌将沉默5秒",
        "cd": 15
      },
      "jueji": {
        "name": "称帝天威",
        "desc": "敌方全体攻击力-15%并智力-15%，持续10秒",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "友方每次释放技能后回复智力×50%生命"
      }
    }
  },
  {
    "id": "贾诩",
    "assetId": "h006",
    "name": "贾诩",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 48,
      "zhili": 92,
      "tongshuai": 72,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "毒士之谋",
        "desc": "延迟敌方全体技能CD+3秒",
        "cd": 15
      },
      "jueji": {
        "name": "乱武",
        "desc": "使敌方2名武将互相攻击，持续5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "血量<20%时触发全体回复30%生命（每场一次）"
      }
    }
  },
  {
    "id": "于禁",
    "assetId": "h007",
    "name": "于禁",
    "camp": "魏",
    "rank": "blue",
    "class": "召唤",
    "stats": {
      "wuli": 78,
      "zhili": 55,
      "tongshuai": 82,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "五营都督",
        "desc": "立即召唤2名额外战士小兵",
        "cd": 12
      },
      "jueji": {
        "name": "连营防线",
        "desc": "在走廊布置防阵持续15秒，敌兵经过受武力×150%伤害",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将受到的伤害减少8%"
      }
    }
  },
  {
    "id": "王平",
    "assetId": "h008",
    "name": "王平",
    "camp": "蜀",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 72,
      "zhili": 62,
      "tongshuai": 80,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "无当飞军",
        "desc": "在走廊召唤2名精锐盾兵，统率比普通小兵+50%",
        "cd": 12
      },
      "jueji": {
        "name": "稳如磐石",
        "desc": "走廊设置防线15秒，敌方小兵通过时受武力×120%伤害并减速",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "敌方小兵攻击力-10%；友方走廊小兵统率+15%"
      }
    }
  },
  {
    "id": "廖化",
    "assetId": "h009",
    "name": "廖化",
    "camp": "蜀",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 75,
      "zhili": 52,
      "tongshuai": 75,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "蜀中老将",
        "desc": "武力×150%横扫正面",
        "cd": 12
      },
      "jueji": {
        "name": "先锋突击",
        "desc": "带领小兵冲破走廊，武力×200%+摧毁对方一段防线",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "战斗满7分钟后武力+25%；战士小兵攻击力+10%"
      }
    }
  },
  {
    "id": "费祎",
    "assetId": "h016",
    "name": "费祎",
    "camp": "蜀",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 45,
      "zhili": 82,
      "tongshuai": 78,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "宽仁之政",
        "desc": "为生命最低的3名友方武将各回复智力×150%",
        "cd": 10
      },
      "jueji": {
        "name": "休养生息",
        "desc": "全体武将回复30%生命+解除所有负面状态",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "己方所有技能冷却-8%"
      }
    }
  },
  {
    "id": "蒋琬",
    "assetId": "h001",
    "name": "蒋琬",
    "camp": "蜀",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 42,
      "zhili": 80,
      "tongshuai": 80,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "稳健辅佐",
        "desc": "为2名武力最高友方武将各提供护盾（统率×20%）",
        "cd": 12
      },
      "jueji": {
        "name": "丞相遗志",
        "desc": "全体全属性+10%持续10秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "每10秒为血量百分比最低的武将回复智力×100%生命"
      }
    }
  },
  {
    "id": "法正",
    "assetId": "h002",
    "name": "法正",
    "camp": "蜀",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 52,
      "zhili": 88,
      "tongshuai": 72,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "军师之谋",
        "desc": "使目标敌将下次技能CD延长5秒",
        "cd": 12
      },
      "jueji": {
        "name": "定军山之计",
        "desc": "与黄忠同阵时共同触发：黄忠下次攻击武力×500%",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "己方法术伤害+10%；技能冷却降低效果+20%"
      }
    }
  },
  {
    "id": "张任",
    "assetId": "h003",
    "name": "张任",
    "camp": "蜀",
    "rank": "blue",
    "class": "弓手",
    "stats": {
      "wuli": 78,
      "zhili": 60,
      "tongshuai": 75,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "落凤坡",
        "desc": "武力×200%狙击，对骑兵额外+50%伤害",
        "cd": 12
      },
      "jueji": {
        "name": "蜀道天险",
        "desc": "在走廊设置弓箭阵，敌兵通过时受武力×120%伤害，持续15秒",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "对骑兵伤害+25%；弓手小兵攻击力+10%"
      }
    }
  },
  {
    "id": "刘封",
    "assetId": "h004",
    "name": "刘封",
    "camp": "蜀",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 72,
      "zhili": 50,
      "tongshuai": 72,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "义子骑冲",
        "desc": "武力×150%冲击",
        "cd": 12
      },
      "jueji": {
        "name": "父子情断",
        "desc": "武力×200%，与关羽同阵时升级为武力×350%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "单独上阵时武力+15%；与刘备同阵时武力+10%"
      }
    }
  },
  {
    "id": "关平",
    "assetId": "h006",
    "name": "关平",
    "camp": "蜀",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 75,
      "zhili": 52,
      "tongshuai": 75,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "护父铁盾",
        "desc": "为关羽方向挡下下次伤害100%",
        "cd": 10
      },
      "jueji": {
        "name": "父子并肩",
        "desc": "与关羽同阵时双方全属性+15%持续10秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与关羽同阵时统率+20%；为关羽格挡后自身武力+20%持续5秒"
      }
    }
  },
  {
    "id": "马谡",
    "assetId": "h007",
    "name": "马谡",
    "camp": "蜀",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 55,
      "zhili": 85,
      "tongshuai": 68,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "纸上谈兵",
        "desc": "己方技能CD-3秒，但随机一名友方武将武力-5%持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "街亭之失",
        "desc": "对敌全体造成智力×250%伤害，有20%概率反伤自身15%生命",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "智力+20%；与王平同阵时纸上谈兵的负面效果消除"
      }
    }
  },
  {
    "id": "糜竺",
    "assetId": "h008",
    "name": "糜竺",
    "camp": "蜀",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 40,
      "zhili": 72,
      "tongshuai": 78,
      "sudu": 60
    },
    "skills": {
      "zhanji": {
        "name": "商贾之道",
        "desc": "立即为己方补充兵力值+2",
        "cd": 10
      },
      "jueji": {
        "name": "倾家资助",
        "desc": "全体友方武将各回复30%生命",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "战斗开始时兵力值+3；每次扩建槽位后回复全体5%生命"
      }
    }
  },
  {
    "id": "孟达",
    "assetId": "h009",
    "name": "孟达",
    "camp": "蜀",
    "rank": "blue",
    "class": "弓手",
    "stats": {
      "wuli": 68,
      "zhili": 65,
      "tongshuai": 68,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "投敌反叛",
        "desc": "武力×150%攻击，15%概率使目标短暂停止行动2秒",
        "cd": 12
      },
      "jueji": {
        "name": "首鼠两端",
        "desc": "50%随机：增强己方全体武力+20%或削弱敌方全体武力-20%，持续8秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "攻击力+10%；天赋技能有15%概率失效（性格反映）"
      }
    }
  },
  {
    "id": "黄盖",
    "assetId": "h016",
    "name": "黄盖",
    "camp": "吴",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 78,
      "zhili": 60,
      "tongshuai": 78,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "苦肉计",
        "desc": "自损10%生命，下次攻击伤害+50%",
        "cd": 10
      },
      "jueji": {
        "name": "赤壁纵火船",
        "desc": "武力×250%+目标持续火焰伤害（智力×40%/秒，8秒）",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与周瑜同阵时技能伤害+20%；火焰伤害额外+10%"
      }
    }
  },
  {
    "id": "凌统",
    "assetId": "h001",
    "name": "凌统",
    "camp": "吴",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 80,
      "zhili": 55,
      "tongshuai": 78,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "步战之雄",
        "desc": "武力×180%冲击+目标流血3秒",
        "cd": 10
      },
      "jueji": {
        "name": "父仇必报",
        "desc": "受到暴击后立即反击武力×300%，并进入无敌1秒（触发后20s CD）"
      },
      "tianfu": {
        "name": "",
        "desc": "战士小兵统率+15%；受到暴击时触发概率+10%"
      }
    }
  },
  {
    "id": "丁奉",
    "assetId": "h002",
    "name": "丁奉",
    "camp": "吴",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 78,
      "zhili": 52,
      "tongshuai": 75,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "雪中奇袭",
        "desc": "快速突击武力×180%+目标减速3秒",
        "cd": 12
      },
      "jueji": {
        "name": "以少胜多",
        "desc": "敌方武将每多一名，本次伤害额外+10%，武力×（100+敌方武将数×40）%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "骑士小兵攻速+15%；以少打多时己方全体武力+5%"
      }
    }
  },
  {
    "id": "程普",
    "assetId": "h003",
    "name": "程普",
    "camp": "吴",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 75,
      "zhili": 55,
      "tongshuai": 80,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "老将守阵",
        "desc": "为前排3名武将提供减伤阵形，受击伤害-20%，持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "江东老臣",
        "desc": "吴国全体武力+20%持续10秒+为全体补充护盾（统率×20%）",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方全体受到伤害-8%；吴国阵营加成效果+5%"
      }
    }
  },
  {
    "id": "韩当",
    "assetId": "h004",
    "name": "韩当",
    "camp": "吴",
    "rank": "blue",
    "class": "弓手",
    "stats": {
      "wuli": 72,
      "zhili": 50,
      "tongshuai": 75,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "弓马娴熟",
        "desc": "追击血量<50%的目标，武力×150%+暴击率+20%",
        "cd": 12
      },
      "jueji": {
        "name": "忠心老将",
        "desc": "为血量最低友方武将附加护盾（统率×50%），持续8秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "吴国武将统率+8%；对血量<50%目标伤害+15%"
      }
    }
  },
  {
    "id": "诸葛瑾",
    "assetId": "h006",
    "name": "诸葛瑾",
    "camp": "吴",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 48,
      "zhili": 80,
      "tongshuai": 75,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "兄弟情深",
        "desc": "为场上智力最高友方武将回复智力×200%生命",
        "cd": 10
      },
      "jueji": {
        "name": "外交斡旋",
        "desc": "敌方全体攻击力-15%持续10秒+己方全体统率+3%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "诸葛亮存活时自身智力+20%；每10秒为全体回复1%生命"
      }
    }
  },
  {
    "id": "步骘",
    "assetId": "h007",
    "name": "步骘",
    "camp": "吴",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 50,
      "zhili": 78,
      "tongshuai": 72,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "文士之仁",
        "desc": "为血量最低友方武将回复智力×180%生命",
        "cd": 10
      },
      "jueji": {
        "name": "化解危机",
        "desc": "为全体友方解除所有负面状态+提供护盾（统率×20%）",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "吴国武将统率+8%；负面状态解除后回复5%生命"
      }
    }
  },
  {
    "id": "陆抗",
    "assetId": "h008",
    "name": "陆抗",
    "camp": "吴",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 52,
      "zhili": 82,
      "tongshuai": 75,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "儒将之策",
        "desc": "降低对方法术抵抗10%持续8秒",
        "cd": 12
      },
      "jueji": {
        "name": "西陵守将",
        "desc": "走廊布置防御工事：减速+每秒反伤，持续30秒",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "陆逊存活时智力+20%；防御工事伤害+15%"
      }
    }
  },
  {
    "id": "全琮",
    "assetId": "h009",
    "name": "全琮",
    "camp": "吴",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 72,
      "zhili": 52,
      "tongshuai": 72,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "全氏骑冲",
        "desc": "武力×150%冲击",
        "cd": 12
      },
      "jueji": {
        "name": "吴国援军",
        "desc": "立即召唤额外一波小兵全部冲锋",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "骑士小兵统率+10%；援军小兵攻击力+20%"
      }
    }
  },
  {
    "id": "孙翊",
    "assetId": "h016",
    "name": "孙翊",
    "camp": "吴",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 70,
      "zhili": 50,
      "tongshuai": 70,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "少年骑冲",
        "desc": "武力×140%冲击+目标攻速-15%持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "孙家血脉",
        "desc": "与孙权同阵时两人武力各+15%，持续10秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "骑士小兵移速+10%；与孙权/孙策同阵时武力+10%"
      }
    }
  },
  {
    "id": "潘璋",
    "assetId": "h001",
    "name": "潘璋",
    "camp": "吴",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 72,
      "zhili": 48,
      "tongshuai": 70,
      "sudu": 75
    },
    "skills": {
      "zhanji": {
        "name": "追命枪",
        "desc": "武力×150%追击+目标减速3秒",
        "cd": 10
      },
      "jueji": {
        "name": "截取青龙",
        "desc": "使关羽下次技能威力降低60%（一次，触发后30s CD）"
      },
      "tianfu": {
        "name": "",
        "desc": "走廊前排小兵攻击力+10%；对追击状态目标伤害+20%"
      }
    }
  },
  {
    "id": "徐盛",
    "assetId": "h002",
    "name": "徐盛",
    "camp": "吴",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 65,
      "zhili": 58,
      "tongshuai": 72,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "疑兵之计",
        "desc": "在走廊放置假人，吸引敌方小兵攻击5秒",
        "cd": 12
      },
      "jueji": {
        "name": "烽火连营",
        "desc": "走廊全面设置陷阱，触发时造成武力×150%伤害，持续20秒",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "守备时受到伤害-15%；假人统率+50%"
      }
    }
  },
  {
    "id": "朱然",
    "assetId": "h003",
    "name": "朱然",
    "camp": "吴",
    "rank": "blue",
    "class": "弓手",
    "stats": {
      "wuli": 68,
      "zhili": 55,
      "tongshuai": 70,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "精准射击",
        "desc": "武力×150%必定暴击",
        "cd": 10
      },
      "jueji": {
        "name": "守江要塞",
        "desc": "在己方走廊入口形成防线，敌兵通过时减速50%，持续15秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "弓手小兵数量+1；暴击伤害+20%"
      }
    }
  },
  {
    "id": "吕范",
    "assetId": "h004",
    "name": "吕范",
    "camp": "吴",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 55,
      "zhili": 70,
      "tongshuai": 72,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "后勤保障",
        "desc": "为全体友方补充统率×80%护盾，持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "大都督辅佐",
        "desc": "为吴国全体武将降低技能CD 5秒+提供统率×30%护盾",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "吴国武将统率+5%；每次阵营加成触发时额外回复全体3%生命"
      }
    }
  },
  {
    "id": "董卓",
    "assetId": "h006",
    "name": "董卓",
    "camp": "群",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 82,
      "zhili": 55,
      "tongshuai": 85,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "西凉悍将",
        "desc": "武力×160%冲击并使目标恐惧2秒",
        "cd": 12
      },
      "jueji": {
        "name": "祸乱朝纲",
        "desc": "敌方全体攻击力-20%持续8秒",
        "cd": 45
      },
      "tianfu": {
        "name": "暴虐无道",
        "desc": "统率+15%；击杀敌方武将后武力+10%（上限+30%）"
      }
    }
  },
  {
    "id": "颜良",
    "assetId": "h007",
    "name": "颜良",
    "camp": "群",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 92,
      "zhili": 45,
      "tongshuai": 78,
      "sudu": 85
    },
    "skills": {
      "zhanji": {
        "name": "河北猛将",
        "desc": "武力×200%速斩，附加目标不可移动2秒",
        "cd": 10
      },
      "jueji": {
        "name": "斗将先锋",
        "desc": "武力×280%单体爆发，斩杀目标时立即重置战技",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "战斗前2分钟武力+20%；与文丑同阵时两人武力各+10%"
      }
    }
  },
  {
    "id": "文丑",
    "assetId": "h008",
    "name": "文丑",
    "camp": "群",
    "rank": "purple",
    "class": "骑士",
    "stats": {
      "wuli": 88,
      "zhili": 42,
      "tongshuai": 75,
      "sudu": 82
    },
    "skills": {
      "zhanji": {
        "name": "颜文双将",
        "desc": "武力×160%，与颜良同阵时升级为武力×200%",
        "cd": 10
      },
      "jueji": {
        "name": "河北豪杰",
        "desc": "武力×240%单体强力冲击+目标击退",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "骑士小兵冲锋时数量+1；与颜良同阵时武力各+10%"
      }
    }
  },
  {
    "id": "华雄",
    "assetId": "h009",
    "name": "华雄",
    "camp": "群",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 85,
      "zhili": 40,
      "tongshuai": 78,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "虎牢先锋",
        "desc": "武力×180%冲击并嘲讽目标3秒",
        "cd": 10
      },
      "jueji": {
        "name": "诸将胆寒",
        "desc": "使敌方随机2名武将攻击力-25%+战技封印5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与吕布同阵时武力+15%；被嘲讽目标受到伤害+15%"
      }
    }
  },
  {
    "id": "高顺",
    "assetId": "h016",
    "name": "高顺",
    "camp": "群",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 80,
      "zhili": 50,
      "tongshuai": 82,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "陷阵营铁阵",
        "desc": "在走廊设置重甲防线，减少敌兵通过速度50%，持续8秒",
        "cd": 12
      },
      "jueji": {
        "name": "陷阵破敌",
        "desc": "率陷阵营冲破对方走廊防线，造成武力×200%群体+破除对方一段防线",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "走廊布防时敌兵受到伤害+20%；陷阵营小兵统率+25%"
      }
    }
  },
  {
    "id": "陈宫",
    "assetId": "h001",
    "name": "陈宫",
    "camp": "群",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 48,
      "zhili": 88,
      "tongshuai": 72,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "吕布军师",
        "desc": "为吕布提升武力15%并重置吕布战技CD",
        "cd": 15
      },
      "jueji": {
        "name": "奇谋诡计",
        "desc": "随机对敌方1~3名武将施加控制效果（眩晕/减速/沉默之一），持续3秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "与吕布同阵时技能CD-15%；敌方有3名以上武将时法术伤害+10%"
      }
    }
  },
  {
    "id": "张鲁",
    "assetId": "h002",
    "name": "张鲁",
    "camp": "群",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 52,
      "zhili": 85,
      "tongshuai": 75,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "五斗米道",
        "desc": "为全体友方武将回复智力×150%生命",
        "cd": 10
      },
      "jueji": {
        "name": "鬼神符咒",
        "desc": "使敌方全体随机进入异常状态（眩晕/减速/沉默之一）5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将每10秒回复最大生命2%；法术技能CD-10%"
      }
    }
  },
  {
    "id": "刘表",
    "assetId": "h003",
    "name": "刘表",
    "camp": "群",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 60,
      "zhili": 70,
      "tongshuai": 80,
      "sudu": 60
    },
    "skills": {
      "zhanji": {
        "name": "荆州牧",
        "desc": "为全体友方武将各回复智力×120%生命",
        "cd": 12
      },
      "jueji": {
        "name": "守成不攻",
        "desc": "全体受伤害-30%持续10秒+走廊防线增强",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将统率+10%，但己方攻击类加成效果减半"
      }
    }
  },
  {
    "id": "严颜",
    "assetId": "h004",
    "name": "严颜",
    "camp": "群",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 80,
      "zhili": 52,
      "tongshuai": 82,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "老将铁盾",
        "desc": "70%概率格挡下次攻击",
        "cd": 10
      },
      "jueji": {
        "name": "断头将军",
        "desc": "不降之志：己方全体武力+15%持续10秒，自身免疫控制5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "被控制时50%概率提前解除；老将韧性：统率低于20%时防御+30%"
      }
    }
  },
  {
    "id": "臧霸",
    "assetId": "h006",
    "name": "臧霸",
    "camp": "群",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 72,
      "zhili": 48,
      "tongshuai": 72,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "青州先锋",
        "desc": "武力×150%冲击",
        "cd": 12
      },
      "jueji": {
        "name": "泰山守将",
        "desc": "走廊设置巨石障碍，敌兵通过时受武力×120%伤害并减速，持续15秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "战士小兵统率+10%；守卫走廊时受到伤害-10%"
      }
    }
  },
  {
    "id": "张绣",
    "assetId": "h007",
    "name": "张绣",
    "camp": "群",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 75,
      "zhili": 48,
      "tongshuai": 70,
      "sudu": 80
    },
    "skills": {
      "zhanji": {
        "name": "宛城突袭",
        "desc": "武力×160%奇袭",
        "cd": 10
      },
      "jueji": {
        "name": "北方降将",
        "desc": "与曹操同阵时绝技升级：召唤骑兵+武力×200%",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "阵亡后30%概率为对方带来一名蓝色援军；降将身份使技能CD+10%"
      }
    }
  },
  {
    "id": "张角",
    "assetId": "h008",
    "name": "张角",
    "camp": "群",
    "rank": "blue",
    "class": "召唤",
    "stats": {
      "wuli": 60,
      "zhili": 80,
      "tongshuai": 72,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "天公将军",
        "desc": "立即召唤3名黄巾兵涌入走廊",
        "cd": 10
      },
      "jueji": {
        "name": "苍天已死",
        "desc": "己方全体小兵数量×3持续5秒+全体武将武力+15%",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "每有小兵被消灭积1点能量；积满10点触发爆发（武力×200%全体）"
      }
    }
  },
  {
    "id": "皇甫嵩",
    "assetId": "h009",
    "name": "皇甫嵩",
    "camp": "群",
    "rank": "blue",
    "class": "弓手",
    "stats": {
      "wuli": 75,
      "zhili": 65,
      "tongshuai": 75,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "平乱先锋",
        "desc": "武力×150%，对黄巾类小兵额外+50%",
        "cd": 10
      },
      "jueji": {
        "name": "火烧左丰",
        "desc": "范围火焰武力×200%群体+持续灼烧3秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "对群雄阵营武将伤害+15%；弓手小兵攻速+10%"
      }
    }
  },
  {
    "id": "何进",
    "assetId": "h016",
    "name": "何进",
    "camp": "群",
    "rank": "blue",
    "class": "召唤",
    "stats": {
      "wuli": 60,
      "zhili": 55,
      "tongshuai": 72,
      "sudu": 60
    },
    "skills": {
      "zhanji": {
        "name": "大将军令",
        "desc": "立即召唤2名禁军步兵加强走廊守备",
        "cd": 12
      },
      "jueji": {
        "name": "十常侍之乱",
        "desc": "使双方走廊所有小兵混战8秒（敌我不分）",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "战斗开始时兵力值+2；禁军类小兵统率+20%"
      }
    }
  },
  {
    "id": "华歆",
    "assetId": "h001",
    "name": "华歆",
    "camp": "魏",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 42,
      "zhili": 75,
      "tongshuai": 70,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "温言安抚",
        "desc": "为血量最低友方武将回复智力×150%生命",
        "cd": 10
      },
      "jueji": {
        "name": "朝廷威仪",
        "desc": "敌方全体攻击力-10%持续10秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "友方武将被控制持续时间-20%；每次控制解除时回血2%"
      }
    }
  },
  {
    "id": "王朗",
    "assetId": "h002",
    "name": "王朗",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 38,
      "zhili": 72,
      "tongshuai": 68,
      "sudu": 60
    },
    "skills": {
      "zhanji": {
        "name": "舌战",
        "desc": "使敌方一名武将被动失效4秒",
        "cd": 15
      },
      "jueji": {
        "name": "大骂贼将",
        "desc": "武力×200%嘲讽，被诸葛亮在场时效果减半",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将智力+5%；沉默类技能持续时间+1秒"
      }
    }
  },
  {
    "id": "曹真",
    "assetId": "h003",
    "name": "曹真",
    "camp": "魏",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 72,
      "zhili": 58,
      "tongshuai": 75,
      "sudu": 68
    },
    "skills": {
      "zhanji": {
        "name": "护军将军",
        "desc": "为前排2名武将各加护盾（统率×25%）",
        "cd": 12
      },
      "jueji": {
        "name": "反攻中原",
        "desc": "己方全体武力+15%并召唤额外步兵冲锋",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方战士小兵数量+1；战士小兵攻击力+10%"
      }
    }
  },
  {
    "id": "曹休",
    "assetId": "h004",
    "name": "曹休",
    "camp": "魏",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 70,
      "zhili": 52,
      "tongshuai": 72,
      "sudu": 72
    },
    "skills": {
      "zhanji": {
        "name": "鹰扬骑冲",
        "desc": "武力×150%冲击并减速3秒",
        "cd": 12
      },
      "jueji": {
        "name": "石亭之战",
        "desc": "大规模骑兵冲锋走廊，武力×180%全体",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "骑士小兵攻击力+10%；战斗开始时兵力值+1"
      }
    }
  },
  {
    "id": "乐进",
    "assetId": "h006",
    "name": "乐进",
    "camp": "魏",
    "rank": "blue",
    "class": "战士",
    "stats": {
      "wuli": 72,
      "zhili": 48,
      "tongshuai": 72,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "先登之功",
        "desc": "率先冲入，武力×150%+目标护盾破除",
        "cd": 10
      },
      "jueji": {
        "name": "乘势追击",
        "desc": "对血量<70%的武将额外造成50%伤害",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "首次上阵时免疫一次控制；战士小兵攻速+10%"
      }
    }
  },
  {
    "id": "李典",
    "assetId": "h007",
    "name": "李典",
    "camp": "魏",
    "rank": "blue",
    "class": "弓手",
    "stats": {
      "wuli": 65,
      "zhili": 62,
      "tongshuai": 70,
      "sudu": 70
    },
    "skills": {
      "zhanji": {
        "name": "斥候射击",
        "desc": "武力×140%并降低目标护盾20%，持续5秒",
        "cd": 12
      },
      "jueji": {
        "name": "夜袭",
        "desc": "武力×180%突袭+使目标失去视野（减攻速20%）5秒",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "弓手小兵射程+1格；夜间/绝技使用后攻速+10%"
      }
    }
  },
  {
    "id": "邓艾",
    "assetId": "h008",
    "name": "邓艾",
    "camp": "魏",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 75,
      "zhili": 60,
      "tongshuai": 72,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "奇兵突袭",
        "desc": "武力×160%，绕行突袭从侧翼",
        "cd": 12
      },
      "jueji": {
        "name": "偷渡阴平",
        "desc": "直接越过走廊对对方基地造成武力×300%伤害",
        "cd": 50
      },
      "tianfu": {
        "name": "",
        "desc": "步兵小兵移速+15%；绕行类攻击伤害+15%"
      }
    }
  },
  {
    "id": "钟会",
    "assetId": "h009",
    "name": "钟会",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 55,
      "zhili": 80,
      "tongshuai": 68,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "谋心之计",
        "desc": "使目标敌将沉默4秒",
        "cd": 15
      },
      "jueji": {
        "name": "效仿诸葛",
        "desc": "复制对方上次释放的技能效果",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "法术技能冷却-10%；复制类技能伤害+20%"
      }
    }
  },
  {
    "id": "曹彰",
    "assetId": "h016",
    "name": "曹彰",
    "camp": "魏",
    "rank": "blue",
    "class": "骑士",
    "stats": {
      "wuli": 78,
      "zhili": 45,
      "tongshuai": 75,
      "sudu": 78
    },
    "skills": {
      "zhanji": {
        "name": "任城王冲阵",
        "desc": "武力×170%狂暴骑兵冲击",
        "cd": 10
      },
      "jueji": {
        "name": "黄髯儿怒吼",
        "desc": "武力+50%+免疫控制5秒，结束后武力×180%",
        "cd": 40
      },
      "tianfu": {
        "name": "",
        "desc": "每击败一名敌方武将武力+10%（上限+40%）"
      }
    }
  },
  {
    "id": "曹植",
    "assetId": "h001",
    "name": "曹植",
    "camp": "魏",
    "rank": "blue",
    "class": "谋士",
    "stats": {
      "wuli": 40,
      "zhili": 85,
      "tongshuai": 68,
      "sudu": 65
    },
    "skills": {
      "zhanji": {
        "name": "七步成诗",
        "desc": "为全体友方提供护盾（智力×120%）",
        "cd": 12
      },
      "jueji": {
        "name": "洛神赋",
        "desc": "魅惑一名敌将为友方攻击5秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "每10秒为随机一名友方武将回复智力×100%生命"
      }
    }
  },
  {
    "id": "简雍",
    "assetId": "h002",
    "name": "简雍",
    "camp": "蜀",
    "rank": "blue",
    "class": "治疗",
    "stats": {
      "wuli": 40,
      "zhili": 68,
      "tongshuai": 68,
      "sudu": 62
    },
    "skills": {
      "zhanji": {
        "name": "游说之才",
        "desc": "使一名敌将停止行动2秒",
        "cd": 15
      },
      "jueji": {
        "name": "外交斡旋",
        "desc": "降低敌方全体攻击力15%持续10秒",
        "cd": 45
      },
      "tianfu": {
        "name": "",
        "desc": "己方武将每10秒回复最大生命1%"
      }
    }
  }
];
