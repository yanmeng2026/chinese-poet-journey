/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PoemRelation {
  WRITTEN_HERE = 'written_here',   // 作于此地
  ABOUT_PLACE = 'about_place',    // 咏此地
  ASSOCIATED = 'associated',      // 关联此地
  PHASE_WORK = 'phase_work'       // 阶段代表作
}

export enum PoemImportance {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  REFERENCE = 'reference'
}

export interface Poem {
  id: string;
  titleEn: string;
  titleZh: string;
  authorEn: string;
  authorZh: string;
  fullPoemZh: string[];
  fullPoemEn: string[];
  translationEn: string[];
  excerptEn: string;
  excerptZh: string;
  approximateYear?: string;
  relationType: PoemRelation;
  importance: PoemImportance;
  noteEn: string;
  noteZh: string;
  sortWeight: number;
}

export interface JourneyStop {
  id: string;
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleZh: string;
  cityEn: string;
  cityZh: string;
  phaseId: string;
  phaseTitleEn: string;
  phaseTitleZh: string;
  phaseShortLabelEn: string;
  phaseShortLabelZh: string;
  phaseDescriptionEn: string;
  phaseDescriptionZh: string;
  emotionalToneEn: string;
  emotionalToneZh: string;
  year: string;
  atmosphere: string;
  summaryEn: string;
  summaryZh: string;
  stopSummaryEn: string;
  stopSummaryZh: string;
  journeySentenceEn: string;
  journeySentenceZh: string;
  heroPoemId: string; // ID of the primary poem
  poems: Poem[];
  x: number;
  y: number;
}

/**
 * Validates the Li Bai journey data for consistency.
 */
function validateJourneyData(data: JourneyStop[]) {
  data.forEach(stop => {
    // 1. Warn if a city has no poems
    if (!stop.poems || stop.poems.length === 0) {
      console.warn(`[Data Validation] City "${stop.cityZh}" (${stop.id}) has no poems.`);
      return;
    }

    // 2. Warn if a city has no primary poem
    const primaryPoem = stop.poems.find(p => p.importance === PoemImportance.PRIMARY);
    if (!primaryPoem) {
      console.warn(`[Data Validation] City "${stop.cityZh}" (${stop.id}) has no primary poem.`);
    }

    // 3. Warn if primary poem is not marked as written_here
    if (primaryPoem && primaryPoem.relationType !== PoemRelation.WRITTEN_HERE) {
      console.warn(`[Data Validation] Primary poem "${primaryPoem.titleZh}" in "${stop.cityZh}" is not marked as WRITTEN_HERE.`);
    }

    // Check for heroPoemId validity
    const heroPoem = stop.poems.find(p => p.id === stop.heroPoemId);
    if (!heroPoem) {
      console.warn(`[Data Validation] heroPoemId "${stop.heroPoemId}" not found in city "${stop.cityZh}".`);
    }
  });
}

export const liBaiJourney: JourneyStop[] = [
  {
    id: "birth",
    chapterNumber: 1,
    chapterTitleEn: "Out of the Mountains",
    chapterTitleZh: "辞亲远行",
    cityEn: "Jiangyou",
    cityZh: "江油",
    phaseId: "youth",
    phaseTitleEn: "Youth in Sichuan",
    phaseTitleZh: "少年蜀中",
    phaseShortLabelEn: "Youth",
    phaseShortLabelZh: "少年",
    phaseDescriptionEn: "The formative years of growth and boundless imagination in the mountains of Sichuan.",
    phaseDescriptionZh: "李白早年成长与想象力形成阶段，山川奇秀孕育了诗人的浪漫底色。",
    emotionalToneEn: "Mountains, Imagination, Departure",
    emotionalToneZh: "山野、想象、出发",
    year: "701-724",
    atmosphere: "misty-green",
    summaryEn: "Born in the wild borders, Li Bai's youth in Sichuan's lush peaks shaped his untethered spirit and love for nature.",
    summaryZh: "生于边陲，长于绵州。蜀地的奇峰秀水孕育了李白狂放不羁的性格与对自然的终身热爱。",
    stopSummaryEn: "Sichuan is the cradle of Li Bai's spirit, where the 'Banished Immortal' first dreamed of soaring beyond the peaks.",
    stopSummaryZh: "蜀地是李白精神的摇篮，这位“谪仙人”在这里第一次梦见飞越巅峰。",
    journeySentenceEn: "Here, the young Li Bai first learned to see mountains as freedom.",
    journeySentenceZh: "少年的李白在这里初次领悟，山川即是自由。",
    heroPoemId: "quiet-night",
    x: 25,
    y: 60,
    poems: [
      {
        id: "quiet-night",
        titleEn: "Quiet Night Thought",
        titleZh: "静夜思",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "Before my bed, there is bright moonlight, So that it seems like frost on the ground.",
        excerptZh: "床前明月光，疑是地上霜。",
        fullPoemZh: ["床前明月光，", "疑是地上霜。", "举头望明月，", "低头思故乡。"],
        fullPoemEn: ["Moonlight spills before my bed,", "Like frost upon the earth it's spread.", "I lift my head to watch the moon,", "Then bow my head with home-sick dread."],
        translationEn: [
          "Before my bed, a pool of light—",
          "Can it be frost upon the ground?",
          "Looking up, I find the moon bright;",
          "Bowing, in homesickness I'm drowned."
        ],
        noteEn: "The quintessential Chinese poem of nostalgia.",
        noteZh: "中国文学中最著名的咏月诗，简洁而深邃地捕捉了游子内心最纯粹的乡愁。",
        sortWeight: 100
      },
      {
        id: "emei-moon",
        titleEn: "Moon Over Mount Emei",
        titleZh: "峨眉山月歌",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "The autumn moon is half-round over the Emei mountain, Its light falls and flows with the Pingqiang River.",
        excerptZh: "峨眉山月半轮秋，影入平羌江水流。",
        fullPoemZh: ["峨眉山月半轮秋，", "影入平羌江水流。", "夜发清溪向三峡，", "思君不见下渝州。"],
        fullPoemEn: ["The autumn moon is half-round over Emei,", "Its shadow enters Pingqiang and flows away.", "At night I leave Qingxi for the Gorges,", "Thinking of you, I go down to Yuzhou today."],
        translationEn: [
          "The autumn moon hangs like a half-disk over Mount Emei,",
          "Its reflection enters the waters of the Pingqiang River.",
          "I set out at night from Qingxi towards the Three Gorges,",
          "Thinking of you whom I cannot see, as I sail down to Yuzhou."
        ],
        noteEn: "A rhythmic and vibrant journey song from his early travels in Sichuan.",
        noteZh: "李白出蜀初期的杰作，灵动地描绘了月夜出航的壮丽景观与对故友的思念。",
        sortWeight: 95
      },
      {
        id: "visiting-hermit",
        titleEn: "Visiting a Hermit on Mount Daitian",
        titleZh: "访戴天山道士不遇",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "The dog barks amidst the sound of water; The peach blossoms are heavy with dew.",
        excerptZh: "犬吠水声中，桃花带露浓。",
        fullPoemZh: ["犬吠水声中，", "桃花带露浓。", "林深见鹿，", "溪午不闻钟。", "野竹分青霭，", "飞泉挂碧峰。", "无人知所去，", "愁倚两三松。"],
        fullPoemEn: ["Dog barks near the water's sound", "Peaches heavy with dew on the ground", "Deep in woods, the deer appear", "No midday bell by the stream I hear", "Wild bamboo parts the azure mist", "Springs hang on peaks by jade kissed", "None knows where the master has gone", "Propped on two or three pines, I mourn"],
        translationEn: [
          "Barking of dogs amidst the splash of water,",
          "Peach blossoms are heavy and wet with dew.",
          "Deep in the forest I see the deer,",
          "At the stream at noon I hear no bell.",
          "Wild bamboos divide the blue mist,",
          "A flying waterfall hangs from the green peak.",
          "None knows where he has gone,",
          "Thinking, I lean against two or three pine trees."
        ],
        noteEn: "Early landscape poem showing the influence of Taoist seeking in his youth.",
        noteZh: "李白早年在戴天山大明寺读书时所作，展现了清新脱俗的自然观察力。",
        sortWeight: 90
      }
    ]
  },
  {
    id: "changan",
    chapterNumber: 2,
    chapterTitleEn: "Imperial Glory",
    chapterTitleZh: "翰林荣光",
    cityEn: "Chang’an",
    cityZh: "长安",
    phaseId: "court",
    phaseTitleEn: "Entering Chang'an",
    phaseTitleZh: "长安入世",
    phaseShortLabelEn: "Court",
    phaseShortLabelZh: "入世",
    phaseDescriptionEn: "Reaching the heart of the Tang Empire, encountering both the peak of ideals and the boundaries of reality.",
    phaseDescriptionZh: "李白进入帝国中心，接近人生理想的最顶峰，也遭遇了现实最残酷的边界。",
    emotionalToneEn: "Gold, Prosperity, Loss",
    emotionalToneZh: "金色、繁华、失落",
    year: "742-744",
    atmosphere: "imperial-gold",
    summaryEn: "Reaching the heart of the Tang Dynasty, Li Bai was celebrated as a 'Banished Immortal' by the Emperor himself.",
    summaryZh: "入京供奉，贵妃捧砚，力士脱靴。此时的李白是大唐盛世最耀眼的文化符号。",
    stopSummaryEn: "Chang'an represents the collision between Li Bai's grand political dreams and the suffocating court life.",
    stopSummaryZh: "长安见证了李白宏大抱负与窒息宫廷生活之间的激烈撞击。",
    journeySentenceEn: "Here, ambition met the gate of empire.",
    journeySentenceZh: "雄心壮志在这里叩响了大唐帝国的府门。",
    heroPoemId: "bring-wine",
    x: 45,
    y: 50,
    poems: [
      {
        id: "bring-wine",
        titleEn: "Bring in the Wine",
        titleZh: "将进酒",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "See how the Yellow River's waters move out of heaven, Rushing to the sea, never to return.",
        excerptZh: "君不见，黄河之水天上来，奔流到海不复回。",
        fullPoemZh: ["君不见黄河之水天上来，", "奔流到海不复回。", "君不见高堂明镜悲白发，", "朝如青丝暮成雪。", "人生得意须尽欢，", "莫使金樽空对月。", "天生我材必有用，", "千金散尽还复来。"],
        fullPoemEn: ["Yellow River comes from heaven", "Rushing to the sea, never returns", "Don't you see mirrors grieving hair", "Dawn like silk, dusk like snow turns", "When happy, enjoy life fully", "Never let moon face an empty cup", "Heaven made me, I must be useful", "Spend a thousand gold, it returns still"],
        translationEn: [
          "Don't you see the Yellow River, rushing from the sky?",
          "It flows to the sea and never returns.",
          "Don't you see the mirrors of the hall, grieving at mirrors?",
          "Silken hair at dawn, at dusk turned to snow.",
          "If life is happy, you must drink your fill,",
          "Never let your gold cup face the moon empty.",
          "Heaven made me with a talent that must be used,",
          "A thousand pieces of gold scattered will return again."
        ],
        noteEn: "The peak of Tang poetic exuberance, celebrating the fleeting nature of time and the nobility of the spirit.",
        noteZh: "唐诗中豪放派的巅峰之作，宣泄了对人生苦短的感叹与卓尔不群的才气。",
        sortWeight: 100
      },
      {
        id: "road-is-hard",
        titleEn: "The Road is Hard - I",
        titleZh: "行路难·其一",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.PHASE_WORK,
        importance: PoemImportance.SECONDARY,
        excerptEn: "I will mount a long wind some day and break the heavy waves, And set my cloudy sail straight and bridge the deep, deep sea.",
        excerptZh: "长风破浪会有时，直挂云帆济沧海。",
        fullPoemZh: ["金樽清酒斗十千，", "玉盘珍羞直万钱。", "停杯投箸不能食，", "拔剑四顾心茫然。", "欲渡黄河冰塞川，", "将登太行雪满山。", "闲来垂钓碧溪上，", "忽复乘舟梦日边。", "行路难，行路难，", "多歧路，今安在？", "长风破浪会有时，", "直挂云帆济沧海。"],
        fullPoemEn: ["Pure wine in gold cup, ten thousand worth", "Fine food on jade plate, cost of earth", "Stop cup, drop sticks, I cannot eat", "Draw sword, look round, heart in defeat", "Want to cross Yellow River, ice blocks stream", "Want to climb Taihang, snow blocks dream", "Idle fishing by the azure creek side", "Sailing near the sun in a dream-like ride", "Hard is the road, hard is the road", "Many branching ways, where is the node?", "A grand wind will break the waves one day", "Cloud-sail hung high, I'll cross the sea's spray"],
        translationEn: [
          "Pure wine in a golden cup costs ten thousand a gallon,",
          "Delicacies on a jade plate are worth ten thousand more.",
          "I stop drinking, drop my chopsticks, and cannot eat;",
          "I draw my sword and look around, my mind in a maze.",
          "I wish to cross the Yellow River, but ice chokes the stream;",
          "I wish to climb the Taihang Mountains, but snow covers the path.",
          "So I pass my time fishing by a green creek,",
          "Or dreaming of sailing past the sun's very edge.",
          "Hard is the road! Hard is the road!",
          "There are many forks; which one should I take?",
          "Someday a great wind will break the waves,",
          "And I'll set my cloudy sail to cross the deep sea."
        ],
        noteEn: "A profound expression of frustration and ultimate optimism regarding his career.",
        noteZh: "李白最具代表性的励志名篇，在极度的苦闷中依然爆发处对未来的宏大愿景。",
        sortWeight: 90
      },
      {
        id: "long-yearning",
        titleEn: "Eternal Longing - I",
        titleZh: "长相思·其一",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.PHASE_WORK,
        importance: PoemImportance.SECONDARY,
        excerptEn: "Eternal longing, In Chang'an. The autumn crickets chirp by the well's railing.",
        excerptZh: "长相思，在长安。络纬秋啼金井栏，微霜凄凄簟色寒。",
        fullPoemZh: ["长相思，在长安。", "络纬秋啼金井栏，", "微霜凄凄簟色寒。", "孤灯不明思欲绝，", "卷帷望月空长叹。", "美人如花隔云端！", "上有青冥之高天，", "下有渌水之波澜。", "天长地远魂飞苦，", "梦魂不到关山难。", "长相思，摧心肝！"],
        fullPoemEn: ["Long yearning, in Chang'an", "Autumn crickets by golden well", "Cold frost on the mat I can tell", "Dim lamp, thoughts cut my breath", "Rolling curtain, moon sigh like death", "The beauty like flowers beyond the cloud", "High azure sky above, vast and proud", "Green waters below with ripples loud", "Sky long, earth far, soul flies in pain", "Dreams cannot reach the mountain pass again", "Eternal longing breaks the heart in twain"],
        translationEn: [
          "Eternal longing, in the city of Chang'an.",
          "The crickets of autumn chirp by the golden well-railing,",
          "A light frost is chilly, the color of the mat is cold.",
          "The solitary lamp is dim, my thoughts are near death,",
          "I roll up the curtain to gaze at the moon, and sigh in vain.",
          "The beautiful one is like a flower, separated by the clouds!",
          "Above is the high heaven of the azure dark,",
          "Below are the waves of the clear green water.",
          "The sky is long, the earth far, the soul flies in bitterness,",
          "The dream-soul cannot reach beyond the difficult mountain passes.",
          "Eternal longing breaks my heart!"
        ],
        noteEn: "A hauntingly beautiful poem of longing, often interpreted as his yearning for the capital after leaving.",
        noteZh: "李白离开长安后的怀乡之作，这里的“美人”往往被视为理想的政治寄托。",
        sortWeight: 80
      },
      {
        id: "qingping-tune",
        titleEn: "Qingping Tune - I",
        titleZh: "清平调·其一",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "Her robes are like clouds, her face like flowers; The spring wind brushes the railing, dew-heavy and bright.",
        excerptZh: "云想衣裳花想容，春风拂槛露华浓。",
        fullPoemZh: ["云想衣裳花想容，", "春风拂槛露华浓。", "若非群玉山头见，", "会向瑶台月下逢。"],
        fullPoemEn: ["Clouds for her robes, flowers for her face", "Spring wind at railings, dew in its place", "If not on Jade Mountain's immortal base", "Then at Yao Terrace in moon's embrace"],
        translationEn: [
          "Clouds remind one of her robes, flowers of her face,",
          "The spring wind brushes the railing, the dew is thick and brilliant.",
          "If she is not seen at the head of the Mount of Many Jades,",
          "She will be met under the moon at the Terrace of Jasper."
        ],
        noteEn: "A delicate and sensory poem written for Lady Yang, capturing the peak of courtly elegance.",
        noteZh: "李白供奉翰林期间为杨贵妃所作三首清平调之一，极尽辞藻之华美。",
        sortWeight: 75
      }
    ]
  },
  {
    id: "yangzhou",
    chapterNumber: 3,
    chapterTitleEn: "Roaming the South",
    chapterTitleZh: "漫游江南",
    cityEn: "Yangzhou",
    cityZh: "扬州",
    phaseId: "roaming",
    phaseTitleEn: "Roaming the South",
    phaseTitleZh: "江南漫游",
    phaseShortLabelEn: "Roaming",
    phaseShortLabelZh: "漫游",
    phaseDescriptionEn: "A period of wandering through the mist and moonlight of the southern river cities.",
    phaseDescriptionZh: "李白在江南山水与繁华城市之间自由游历，诗意在水色与月光中逐渐展开。",
    emotionalToneEn: "Water, Moonlight, Wandering",
    emotionalToneZh: "水气、月色、漂泊",
    year: "726-742",
    atmosphere: "river-blue",
    summaryEn: "Wandering through the prosperous canal cities of the south, many partings were immortalized in his verse.",
    summaryZh: "仗剑远游，南下金陵、扬州。在那片水光潋滟的江南，他留下了无数关于离别的名篇。",
    stopSummaryEn: "Yangzhou was a vibrant hub in Li Bai's southern travels, where partings and departures intertwined.",
    stopSummaryZh: "扬州是李白江南漫游中的繁华节点，也是离别与远行交织之地。",
    journeySentenceEn: "Here, farewell became spring mist over the river.",
    journeySentenceZh: "离别在这里化作了江面上的一场春烟。",
    heroPoemId: "farewell-meng",
    x: 72,
    y: 55,
    poems: [
      {
        id: "farewell-meng",
        titleEn: "Farewell to Meng Haoran",
        titleZh: "黄鹤楼送孟浩然之广陵",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "His solitary sail's far shadow vanishes into the blue void. All I see is the river flowing to the edge of the sky.",
        excerptZh: "孤帆远影碧空尽，唯见长江天际流。",
        fullPoemZh: ["故人西辞黄鹤楼，", "烟花三月下扬州。", "孤帆远影碧空尽，", "唯见长江天际流。"],
        fullPoemEn: ["Friend leaves west at Crane Tower", "Third month, to Yangzhou he sails", "Lone sail vanishes in blue air", "Only the long river's trail prevails"],
        translationEn: [
          "My old friend says goodbye at the Yellow Crane Tower,",
          "In the mists and flowers of March, he heads to Yangzhou.",
          "His solitary sail's far shadow vanishes into the blue,",
          "I see only the Long River flowing to the edge of the sky."
        ],
        noteEn: "The most elegant expression of friendship and the vastness of the southern landscape.",
        noteZh: "中国文学中最优美的送别诗，将离愁别绪融入了廖阔的长江盛景之中。",
        sortWeight: 100
      },
      {
        id: "autumn-jingmen",
        titleEn: "Autumn Down to Jingmen",
        titleZh: "秋下荆门",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.ABOUT_PLACE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "Frost falls on Jingmen, the river trees are bare.",
        excerptZh: "霜落荆门江树空，布帆无恙逐东风。",
        fullPoemZh: ["霜落荆门江树空，", "布帆无恙逐东风。", "此行不为鲈鱼鲙，", "自爱名山入剡中。"],
        fullPoemEn: ["Frost falls on Jingmen, trees are bare", "Cloth sail safe in the east wind's care", "I go not for the perch so rare", "But for the mountains I love there"],
        translationEn: [
          "Frost falls on Jingmen, the river trees are bare,",
          "My cloth sail is safe, following the east wind.",
          "This journey is not for the sake of minced perch,",
          "But because I love the famous mountains of Shanzhong."
        ],
        noteEn: "Written during his early travels, expressing his romantic pursuit of nature.",
        noteZh: "李白出蜀后漫游江南的作品，展现了他不为物欲所累、唯爱山水的旷达之心。",
        sortWeight: 80
      }
    ]
  },
  {
    id: "jinling",
    chapterNumber: 4,
    chapterTitleEn: "The Southern Capital",
    chapterTitleZh: "金陵怀古",
    cityEn: "Nanjing",
    cityZh: "金陵",
    phaseId: "roaming",
    phaseTitleEn: "Roaming the South",
    phaseTitleZh: "江南漫游",
    phaseShortLabelEn: "Roaming",
    phaseShortLabelZh: "漫游",
    phaseDescriptionEn: "Reflecting on history and the passage of time in the ancient capital by the river.",
    phaseDescriptionZh: "在六朝古都的残垣与酒肆间，李白回望历史，感慨人事代謝与王朝兴衰。",
    emotionalToneEn: "Water, Moonlight, Wandering",
    emotionalToneZh: "水气、月色、漂泊",
    year: "747",
    atmosphere: "sepia-gold",
    summaryEn: "In the ancient capital of Jinling, Li Bai wandered through ruins and wine shops, reflecting on the rise and fall of dynasties.",
    summaryZh: "六朝胜地，金陵酒家。在这座充满历史感的古都，李白在诗中叹浮生之短暂，哀王朝之更迭。",
    stopSummaryEn: "In Jinling, Li Bai blended his observations of the present with deep reflections on the ancient past.",
    stopSummaryZh: "在金陵，李白将对现实的观察与对古老历史的深沉反思融为一体。",
    journeySentenceEn: "Here, history turned into moonlight and memory.",
    journeySentenceZh: "在这里，往昔的历史沉淀为月色与回忆。",
    heroPoemId: "phoenix-terrace",
    x: 70,
    y: 48,
    poems: [
      {
        id: "phoenix-terrace",
        titleEn: "Climbing Phoenix Terrace",
        titleZh: "登金陵凤凰台",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "The overall clouds can shade the sun, and not seeing Chang'an makes me sad.",
        excerptZh: "总为浮云能蔽日，长安不见使人愁。",
        fullPoemZh: ["凤凰台上凤凰游，", "凤去台空江自流。", "吴宫花草埋幽径，", "晋代衣冠成古丘。", "三山半落青天外，", "二水中分白鹭洲。", "总为浮云能蔽日，", "长安不见使人愁。"],
        fullPoemEn: ["Phoenix roamed on the terrace", "Phoenix gone, river flows in space", "Wu palace weeds on paths we trace", "Jin dynasty nobles, tombs displace", "Three peaks half-fall past blue sky", "Two streams divide Heron Isle nearby", "Floating clouds cover the sun's eye", "Chang'an hidden, making me sigh"],
        translationEn: [
          "On the Phoenix Terrace the phoenixes used to roam;",
          "The birds are gone, the terrace empty, the river flows on.",
          "Flowers and grass of the Wu palace bury the hidden paths;",
          "Official robes of the Jin dynasty have become ancient mounds.",
          "The three peaks are half-visible beyond the blue sky;",
          "The white egret isle divides the river in two.",
          "Floating clouds can always shade the sun;",
          "And not to see Chang'an makes one sad."
        ],
        noteEn: "One of the greatest seven-syllable regulated poems, blending landscape with political melancholy.",
        noteZh: "李白七律的巅峰，将壮丽山河与身世之悲、家国之忧完美融合。",
        sortWeight: 100
      },
      {
        id: "jinling-wine-shop",
        titleEn: "Farewell in a Nanjing Wine Shop",
        titleZh: "金陵酒肆留别",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "The wind brings the fragrance of willow flowers into the wine shop.",
        excerptZh: "风吹柳花满店香，吴姬压酒劝客尝。",
        fullPoemZh: ["风吹柳花满店香，", "吴姬压酒唤客尝。", "金陵子弟来相送，", "欲行不行各尽觞。", "请君试问东流水，", "别意与之谁短长？"],
        fullPoemEn: ["Willow flowers fill the shop with scent", "Hostess presses wine, on serving bent", "Friends from Jinling come to say goodbye", "Emptying cups before the time is spent", "Please ask the river flowing to the east", "Whose parting sorrow is the least?"],
        translationEn: [
          "The wind blows willow flowers, filling the shop with fragrance,",
          "A girl of Wu presses the wine and urges the guests to taste.",
          "The young men of Jinling come to see me off;",
          "Planning to go or not, we each drain our cups.",
          "I ask you to inquire of the river flowing east:",
          "Compared with it, whose parting sorrow is longer?"
        ],
        noteEn: "A lively and emotional parting scene capturing the spirit of his travels.",
        noteZh: "极具生活气息的别宴描绘，最后两句以水喻情，神来之笔。",
        sortWeight: 90
      },
      {
        id: "night-mooring",
        titleEn: "Night Mooring at Niuzhu",
        titleZh: "夜泊牛渚怀古",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.ABOUT_PLACE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "At the Niuzhu rock on the western river night, The blue sky is without a single cloud.",
        excerptZh: "牛渚西江夜，青天无片云。",
        fullPoemZh: ["牛渚西江夜，", "青天无片云。", "登舟望秋月，", "空忆谢将军。", "余亦能高咏，", "斯人不可闻。", "明朝挂帆去，", "枫叶落纷纷。"],
        fullPoemEn: ["On the western river at Niuzhu night", "Not a cloud in the blue sky's light", "Board the boat to watch the moon", "Thinking of General Xie too soon", "I too can chant poems high", "But such a man no longer nearby", "Tomorrow I'll hoist the sail and fly", "As maple leaves fall from the sky"],
        translationEn: [
          "At the Niuzhu rock on the western river night,",
          "The blue sky is without a single cloud.",
          "I board the boat to watch the autumn moon,",
          "And in vain I remember the General Xie of old.",
          "I too am able to chant poems loudly,",
          "But there is no one left to hear them now.",
          "Tomorrow I shall hoist my sails and depart,",
          "As the maple leaves continue to fall in abundance."
        ],
        noteEn: "A melancholic reflection on history and the lack of spiritual peers.",
        noteZh: "登临怀古之作，抒发了怀才不遇且世无知音深沉感慨。",
        sortWeight: 80
      }
    ]
  },
  {
    id: "lushan",
    chapterNumber: 5,
    chapterTitleEn: "The Celestial Peak",
    chapterTitleZh: "山水神韵",
    cityEn: "Mount Lu",
    cityZh: "庐山",
    phaseId: "seeking",
    phaseTitleEn: "Seeking Immortality",
    phaseTitleZh: "求仙访道",
    phaseShortLabelEn: "Seeking",
    phaseShortLabelZh: "求道",
    phaseDescriptionEn: "A pursuit of spiritual freedom amidst the grand peaks and Taoist imaginings.",
    phaseDescriptionZh: "在崇山峻岭与道教想象中，李白寻找着超越尘世的精神自由。",
    emotionalToneEn: "Peaks, Clouds, Transcendence",
    emotionalToneZh: "山峰、云雾、超脱",
    year: "747",
    atmosphere: "celestial-white",
    summaryEn: "In the thundering cataracts of Mount Lu, Li Bai saw the divine source of all creation.",
    summaryZh: "庐山的银河瀑布激发起他最狂放的仙思，这里是他寻求超脱尘世的精神乐土。",
    stopSummaryEn: "Mount Lu's majestic waterfalls inspired Li Bai's most transcendental and cosmic poetic visions.",
    stopSummaryZh: "庐山雄伟的瀑布激发出李白最具超现实感与宇宙观的诗意想象。",
    journeySentenceEn: "Here, waterfalls became the scale of imagination.",
    journeySentenceZh: "在这里，奔流的瀑布成为了想象力的标尺。",
    heroPoemId: "waterfall",
    x: 62,
    y: 72,
    poems: [
      {
        id: "waterfall",
        titleEn: "Watching the Waterfall",
        titleZh: "望庐山瀑布",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "The flying current plunges three thousand feet; It seems as though the Milky Way is falling from the sky.",
        excerptZh: "飞流直下三千尺，疑是银河落九天。",
        fullPoemZh: ["日照香炉生紫烟，", "遥看瀑布挂前川。", "飞流直下三千尺，", "疑是银河落九天。"],
        fullPoemEn: ["Sun upon Censer creates purple mist", "Waterfall hangs like a river ahead", "Three thousand feet down it plunges", "Milky Way falls from the ninth heaven's bed"],
        translationEn: [
          "The sunshine on Incense Burner Peak breeds a purple haze,",
          "From afar, the waterfall hangs like a river suspended above.",
          "Its flying current plunges three thousand feet down,",
          "As if the Milky Way has fallen from the ninth heaven."
        ],
        noteEn: "Hyperbolic genius that transforms a mountain scene into a cosmic vision.",
        noteZh: "李白浪漫主义想象力的巅峰，将地上的山水升华为天上的奇观。",
        sortWeight: 100
      },
      {
        id: "song-of-lushan",
        titleEn: "Song of Mount Lu",
        titleZh: "庐山谣寄卢侍御虚舟",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "I am a madman of Chu, Singing songs to mock the Sage Kong.",
        excerptZh: "我本楚狂人，凤歌笑孔丘。",
        fullPoemZh: ["我本楚狂人，", "凤歌笑孔丘。", "手持绿玉杖，", "朝别黄鹤楼。", "五岳寻仙不辞远，", "一生好入名山游。", "庐山秀出南斗傍，", "屏风九叠云锦张。", "影落明湖青黛光。"],
        fullPoemEn: ["I'm a madman of Chu", "Singing to mock the Sage", "With jade staff in my hand", "Leaving the Crane's stage", "Five peaks I seek afar", "All life in mountains I are", "Lu peaks by South Dipper rise", "Folding screens of clouds in skies", "Shadows fall on lake, dark dyes"],
        translationEn: [
          "I am originally a madman of Chu,",
          "Singing the Phoenix Song to mock Confucius.",
          "With a green jade staff in my hand,",
          "I leave the Yellow Crane Tower at dawn.",
          "Seeking immortals in the Five Peaks, I ignore the distance,",
          "All my life, I have loved to wander among famous mountains.",
          "Mount Lu stands out near the Southern Dipper,",
          "The nine-fold hanging screens spread out like embroidered clouds.",
          "Their shadows fall on the clear lake with a dark green light."
        ],
        noteEn: "A longer, more complex work expressing Li Bai's lifelong spiritual quest and eccentric personality.",
        noteZh: "李白晚年的长篇古诗，既有奇幻的山色描写，也寄寓了他在仕途失意后的求仙之志。",
        sortWeight: 90
      }
    ]
  },
  {
    id: "xuancheng",
    chapterNumber: 6,
    chapterTitleEn: "Echoes of Silence",
    chapterTitleZh: "清寂余响",
    cityEn: "Xuancheng",
    cityZh: "宣城",
    phaseId: "late",
    phaseTitleEn: "Late Echoes",
    phaseTitleZh: "晚年余响",
    phaseShortLabelEn: "Echoes",
    phaseShortLabelZh: "余响",
    phaseDescriptionEn: "Visions of exile, return, and a quiet, profound look back at a life of constant motion.",
    phaseDescriptionZh: "经历流放与归途，晚年的李白在静谧中回望一生，诗风更显苍茫深邃。",
    emotionalToneEn: "Lonely Boat, Distant Mountains, Vastness",
    emotionalToneZh: "孤舟、远山、苍茫",
    year: "753",
    summaryEn: "Seeking silence after years of roaming, the poet finds a reflection of his own soul in the motionless mountain.",
    summaryZh: "宣城的敬亭山，在李白心中是一种近似同类的陪伴。他写下“相看两不厌，只有敬亭山”，将整座山视为唯一的知己。",
    stopSummaryEn: "At Mount Jingting, Li Bai found a silent companion that mirrored his own proud solitude.",
    stopSummaryZh: "在敬亭山，李白找到了一个无需言语、映照他内心孤高寂寞的灵魂伴侣。",
    journeySentenceEn: "Here, solitude became clear and gentle.",
    journeySentenceZh: "在这里，孤独变得清澈而温柔。",
    atmosphere: "silent-gray",
    heroPoemId: "jingting",
    x: 66,
    y: 78,
    poems: [
      {
        id: "jingting",
        titleEn: "Alone Looking at Mount Jingting",
        titleZh: "独坐敬亭山",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "We look at each other, never growing tired; between us, only the Jingting Mountain remains.",
        excerptZh: "相看两不厌，只有敬亭山。",
        fullPoemZh: ["众鸟高飞尽，", "孤云独去闲。", "相看两不厌，", "只有敬亭山。"],
        fullPoemEn: ["The multi-colored birds have all flown away,", "A solitary cloud drifts leisurely alone.", "We look at each other, never growing tired,", "Between us, only the Jingting Mountain remains."],
        translationEn: [
          "Flocks of birds have flown high and vanished,",
          "A single cloud floats lazily by,",
          "We never grow tired of each other,",
          "Only the Mount Jingting and I."
        ],
        noteEn: "A minimalist masterpiece expressing the absolute unity between the poet and nature.",
        noteZh: "五言绝句的巅峰之作，表达了物我两忘、万物一体的极高境界。",
        sortWeight: 100
      },
      {
        id: "xie-tiao-farewell",
        titleEn: "Farewell at Xie Tiao's Tower",
        titleZh: "宣州谢朓楼饯别校书叔云",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "Trying to cut water with a sword only makes it flow faster; Raising a cup to drown sorrows only makes them deeper.",
        excerptZh: "抽刀断水水更流，举杯消愁愁更愁。",
        fullPoemZh: ["弃我去者不可留，", "乱我心者多烦忧。", "长风万里送秋雁，", "对此可以酣高楼。", "蓬莱文章建安骨，", "中间小谢又清发。", "俱怀逸兴壮思飞，", "欲上青天揽明月。", "抽刀断水水更流，", "举杯消愁愁更愁。", "人生在世不称意，", "明朝散发弄扁舟。"],
        fullPoemEn: ["Those who left me cannot be stayed", "Those who trouble my heart leave me dismayed", "Long wind sends autumn geese afar", "Let's drink high in this tower, no bar", "Peng Lai essays, Jian An bone", "Little Xie's style, clearly known", "Grand spirit and bold thoughts fly", "Taking the moon from the blue sky", "Cut water with sword, water flows fast", "Drink to drown sorrow, sorrow will last", "Life in this world meets no heart's desire", "Tomorrow I'll let hair down, on a boat retire"],
        translationEn: [
          "Yesterday has left me and cannot be stayed,",
          "Today troubles my heart with much anxiety.",
          "A long wind of ten thousand miles sends off the autumn geese,",
          "Faced with this, we can drink to our fill in this high tower.",
          "The writings of the immortals have the vigor of the Jian'an age,",
          "And in between, the younger Xie's style is clear and fresh.",
          "We both possess heroic spirits and bold thoughts that fly,",
          "Wishing to ascend the blue sky to embrace the bright moon.",
          "One draws a sword to cut the water, but the water flows faster;",
          "One raises a cup to drown sorrow, but sorrow becomes deeper.",
          "Since one's desires are not met in this life,",
          "Tomorrow I shall let down my hair and drift in a small boat."
        ],
        noteEn: "A passionate exploration of literary tradition and personal disillusionment.",
        noteZh: "极具爆发力的杰作，将壮志凌云与现实苦闷交织，展现了李白极其复杂的情感世界。",
        sortWeight: 95
      },
      {
        id: "xie-tiao-tower",
        titleEn: "Climbing Xie Tiao Tower",
        titleZh: "秋登宣城谢朓北楼",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.SECONDARY,
        excerptEn: "Two rivers merge like mirrors, Two bridges span like rainbow bows.",
        excerptZh: "两水夹明镜，双桥落彩虹。",
        fullPoemZh: ["江城如画里，", "山晚望晴空。", "两水夹明镜，", "双桥落彩虹。", "人烟寒橘柚，", "秋色老梧桐。", "谁念北楼上，", "临风怀谢公。"],
        fullPoemEn: ["River town like a painting", "Evening mountains, sky clear", "Two waters hold a mirror", "Double bridges, rainbows near", "Cold mist on orange trees", "Autumn ages the plane tree leaves", "Who remembers on the tower", "Leaning in wind, mourning Xie's sleeves"],
        translationEn: [
          "The river town is like a painting in a scroll,",
          "Evening mountains look upon the clear sky.",
          "The two rivers enclose a bright mirror,",
          "The double bridges drop down like rainbows.",
          "Mist cold among the oranges and pomelos,",
          "Autumn colors age the plane trees.",
          "Who considers high on the North Tower,",
          "Leaning into the wind and thinking of Master Xie?"
        ],
        noteEn: "A tribute to his predecessor Xie Tiao, capturing the timeless beauty of the landscape.",
        noteZh: "李白对前贤谢朓的追思之作，描写了宣城如画的秋景。",
        sortWeight: 90
      }
    ]
  },
  {
    id: "baidi",
    chapterNumber: 7,
    chapterTitleEn: "The Final Flight",
    chapterTitleZh: "重归江海",
    cityEn: "Baidi City",
    cityZh: "白帝城",
    phaseId: "late",
    phaseTitleEn: "Late Echoes",
    phaseTitleZh: "晚年余响",
    phaseShortLabelEn: "Echoes",
    phaseShortLabelZh: "余响",
    phaseDescriptionEn: "A final burst of vitality as the poet is pardoned and returns to the wide, free waters.",
    phaseDescriptionZh: "获赦后的李白重归江海，生命在最后的航程中迸发出惊人的轻盈与自由。",
    emotionalToneEn: "Lonely Boat, Distant Mountains, Vastness",
    emotionalToneZh: "孤舟、远山、苍茫",
    year: "762",
    atmosphere: "morning-glow",
    summaryEn: "Pardoned from exile, the poet's boat flies through the gorges back to the world, weightless and free.",
    summaryZh: "流放中途遇赦，李白乘舟疾驰而下。那一刻，他生命中所有的重担都随猿声消逝在万重山后。",
    stopSummaryEn: "The swift return from Baidi represents the final release of all the weights that burdened Li Bai's life.",
    stopSummaryZh: "从白帝城的飞驰而归，象征着李白生命中所有重担的最后卸下与释放。",
    journeySentenceEn: "Here, the soul finally found the lightness of release.",
    journeySentenceZh: "在这里，灵魂终在飞驰中寻得了释怀的轻盈。",
    heroPoemId: "baidi-departure",
    x: 40,
    y: 70,
    poems: [
      {
        id: "baidi-departure",
        titleEn: "Departing from Baidi City",
        titleZh: "早发白帝城",
        authorEn: "Li Bai",
        authorZh: "李白",
        relationType: PoemRelation.WRITTEN_HERE,
        importance: PoemImportance.PRIMARY,
        excerptEn: "Amidst the monkeys' chatter that never stops, My light boat has already passed ten thousand mountains.",
        excerptZh: "两岸猿声啼不住，轻舟已过万重山。",
        fullPoemZh: ["朝辞白帝彩云间，", "千里江陵一日还。", "两岸猿声啼不住，", "轻舟已过万重山。"],
        fullPoemEn: ["Leave Baidi in dawn's glow", "Single day to Jiangling I go", "Monkey cries still ring on shores", "Boat past peaks of long ago"],
        translationEn: [
          "At dawn, I left Baidi amidst the colorful clouds,",
          "By dusk, I returned to Jiangling, a thousand miles away,",
          "The monkeys' chatter from both banks never stops,",
          "But my light boat has already passed ten thousand peaks."
        ],
        noteEn: "A triumphant celebration of sudden liberty and the lightness of a soul set free.",
        noteZh: "经历了流放的绝望后，这首诗迸发出惊人的速度感与生命力，宣告了诗人的重生。",
        sortWeight: 100
      }
    ]
  }
];

validateJourneyData(liBaiJourney);
