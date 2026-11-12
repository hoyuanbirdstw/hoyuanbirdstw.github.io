/* =========================================================
   care-data.js：「養鳥知識 → 依鳥種查詢」的鳥種資料（只放資料，不放版面）
   內容來源：鸚鵡鳥種資料.md（每格都有來源編號，對應各鳥種最後的 sources 清單）

   怎麼補資料：
   - 每一列是 r('欄位代號', 中文, 英文, '來源編號')，來源編號對應 sources 的順序（1 開始）
   - 中文寫 null 的列（「待店家補充」）網頁上不會顯示。之後補好資料，把 null 換成文字就會出現
   - 新增一組鳥種：複製一整組 { ... } 加進 window.CARE_SPECIES
   - 內文可以用 <b>粗體</b>、<i>學名</i>
   ========================================================= */
(function () {
  // 欄位名稱（中文, 英文）
  var L = {
    size: ['體型', 'Size'], look: ['外觀', 'Appearance'], sex: ['公母', 'Telling males from females'],
    life: ['壽命', 'Lifespan'], pers: ['個性', 'Personality'], voice: ['叫聲', 'Noise level'],
    newbie: ['適合新手嗎', 'Good for beginners?'], diet: ['飲食重點', 'Diet highlights'],
    note: ['特別注意', 'Special note'], care: ['照顧小提醒', 'Care tips'], mood: ['情緒健康', 'Emotional health'],
    temp: ['溫度', 'Temperature'], health: ['健康注意', 'Health concerns'], trait: ['特色', 'Distinctive trait'],
    quirk: ['特殊行為', 'Unusual behavior'], others: ['和其他鳥', 'With other birds'],
    wild: ['野外吃什麼', 'What it eats in the wild'], staple: ['主食比例', 'Staple diet'],
    extra: ['要特別補充', 'Be sure to add'], avoid: ['要少給或避免', 'Limit or avoid'],
    issue: ['常見飲食問題', 'Common diet problems'], tip: ['換新食物的訣竅', 'Tip for new foods'],
    watch: ['要特別注意', 'Watch out for'], vet: ['獸醫經驗分享', 'One vet’s experience'],
    other: ['其他', 'Other'], habit: ['飲食習慣', 'Eating habits']
  };
  function r(k, zh, en, src) { return { k: L[k], v: zh === null ? null : [zh, en], src: src || '' }; }

  // 重複使用的主食比例文字
  var STAPLE = ['以滋養丸為主，搭配蔬菜、水果、全穀類，種子和堅果只給少量（來源未給具體百分比）',
                'Mostly pellets, with vegetables, fruit and whole grains; only a small amount of seeds and nuts (the source gives no specific percentages).'];
  var NOGRIT_ZH = '保健砂（鸚鵡剝殼吃種子不需要，生病時可能吃太多造成阻塞）';
  var NOGRIT_EN = 'grit (parrots hull their seeds and do not need it; a sick bird may eat too much and become blocked)';

  // 來源清單
  var S = {
    aav: { org: 'AAV', title: 'Feeding Birds', url: 'https://static1.squarespace.com/static/5c8fbfe87d0c914f25ad6fa4/t/5cdc54081905f4bfdd4e91e7/1557943306229/Feeding+Birds.pdf' },
    vitA: { org: 'LafeberVet', title: 'Vitamin A Client Handout', url: 'https://lafeber.com/vet/vitamin-a-client-handout/' },
    macaw: { org: 'LafeberVet', title: 'Basic Information Sheet: Macaw', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-macaw/' },
    conure: { org: 'LafeberVet', title: 'Basic Information Sheet: Conure', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-conure/' },
    cockatoo: { org: 'LafeberVet', title: 'Basic Information Sheet: Cockatoo', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-cockatoo/' },
    grey: { org: 'LafeberVet', title: 'Basic Information Sheet: African Grey Parrot', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-african-grey-parrot/' },
    amazon: { org: 'LafeberVet', title: 'Basic Information Sheet: Amazon Parrot', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-amazon-parrot/' },
    eclectus: { org: 'LafeberVet', title: 'Basic Information Sheet: Eclectus Parrot', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-eclectus-parrot/' },
    lory: { org: 'LafeberVet', title: 'Basic Information Sheet: Lory and Lorikeet', by: 'Christal Pollock, DVM, DABVP (Avian Practice)', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-lory-and-lorikeet/' },
    caique: { org: 'Lafeber', orgZh: 'Lafeber 飼主版', title: 'Caique', url: 'https://lafeber.com/pet-birds/species/caique/' },
    senegal: { org: 'Lafeber', orgZh: 'Lafeber 飼主版', title: 'Senegal Parrot', url: 'https://lafeber.com/pet-birds/species/senegal-parrot/' },
    quaker: { org: 'Lafeber', orgZh: 'Lafeber 飼主版', title: 'Quaker Parakeet', url: 'https://lafeber.com/pet-birds/species/quaker-parakeet/' },
    hawk: { org: 'Lafeber', orgZh: 'Lafeber 飼主版', title: 'Hawk-Headed Parrot', url: 'https://lafeber.com/pet-birds/species/hawk-headed-parrot/' }
  };

  window.CARE_CITES_SRC = { org: 'CITES', title: 'Appendices I, II and III', note: ['2026 年 3 月 5 日起生效版本，2026/11/12 查證', 'version in force from 5 March 2026, checked 12 Nov 2026'], url: 'https://cites.org/eng/app/appendices.php' };

  window.CARE_SPECIES = [
    /* ---------------- 金剛鸚鵡 ---------------- */
    {
      id: 'macaw',
      name: ['金剛鸚鵡', 'Macaws'],
      members: ['琉璃・紅肩・栗額', 'Blue-and-gold・Hahn’s・Severe'],
      names: ['Blue-and-gold Macaw（<i>Ara ararauna</i>，琉璃金剛）、Red-shouldered／Hahn’s Macaw（<i>Diopsittaca nobilis</i>，紅肩金剛）、Chestnut-fronted／Severe Macaw（<i>Ara severus</i>，栗額金剛）',
              'Blue-and-gold Macaw (<i>Ara ararauna</i>), Red-shouldered / Hahn’s Macaw (<i>Diopsittaca nobilis</i>), Chestnut-fronted / Severe Macaw (<i>Ara severus</i>)'],
      lowSource: false,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['琉璃、紅肩、栗額金剛都是 CITES 附錄二，買賣需依規定辦理相關文件。附錄一的金剛為 <i>Ara ambiguus、glaucogularis、macao、militaris、rubrogenys</i>，不包含這三種。',
               'Blue-and-gold, Red-shouldered and Severe Macaws are all CITES Appendix II; trade requires the proper permits. The macaws on Appendix I are <i>Ara ambiguus, glaucogularis, macao, militaris, rubrogenys</i>, which do not include these three.'] },
      profile: [
        r('size', '琉璃金剛是大型鸚鵡，體重約 900～1300 公克；紅肩金剛是迷你金剛，約 120～160 公克', 'The Blue-and-gold Macaw is a large parrot weighing about 900–1,300 g; the Red-shouldered (Hahn’s) Macaw is a mini macaw at about 120–160 g.', '1'),
        r('life', '大型金剛平均 30～45 年，有機會活到 75 年以上；小型金剛平均 20～25 年', 'Large macaws average 30–45 years and may live past 75; small macaws average 20–25 years.', '1'),
        r('pers', '非常聰明，需要大量的互動和刺激；大型金剛多半性情溫和', 'Very intelligent and in need of plenty of interaction and stimulation; large macaws are mostly gentle.', '1'),
        r('voice', '大型金剛叫聲很大，也很會破壞東西，不適合需要安靜的住家', 'Large macaws are very loud and destructive, and are not suited to homes that need quiet.', '1'),
        r('newbie', '大型金剛不建議新手；迷你金剛體型小，但同樣需要大量陪伴', 'Large macaws are not recommended for beginners; mini macaws are smaller but still need a great deal of companionship.', '1'),
        r('diet', '單吃種子會缺乏蛋白質、鈣和維生素 A；鸚鵡會剝殼吃種子，不需要保健砂，生病時亂吃砂反而危險', 'A seed-only diet lacks protein, calcium and vitamin A. Parrots hull their seeds and do not need grit; eating grit when sick can actually be dangerous.', '1'),
        r('note', '南美洲的鸚鵡（包括金剛）特別容易缺乏維生素 A，獸醫建議每天至少給一種富含維生素 A 的食物，例如紅蘿蔔、地瓜、深綠色蔬菜', 'South American parrots (macaws included) are especially prone to vitamin A deficiency. Vets recommend at least one vitamin A-rich food every day, such as carrots, sweet potato or dark leafy greens.', '2'),
        r('care', '需要很大的活動空間；籠子欄杆間距約 1.9～3.8 公分；站架粗細要配合體型；喜歡洗澡，要常讓牠淋浴；臉頰沒有羽毛的地方變紅，代表情緒有變化', 'Needs a lot of room to move; cage bar spacing about 1.9–3.8 cm; perch thickness should suit its size; loves to bathe, so shower it often; the bare cheek patches turning red means its mood has changed.', '1'),
        r('mood', '迷你金剛比較容易出現拔毛行為，要多給玩具和覓食遊戲', 'Mini macaws are more prone to feather plucking, so give plenty of toys and foraging games.', '1')
      ],
      feed: [
        r('wild', '種子、水果、無花果、棕櫚果、葉子、花蜜和花朵', 'Seeds, fruit, figs, palm fruit, leaves, nectar and flowers.', '1'),
        r('staple', STAPLE[0], STAPLE[1], '3'),
        r('extra', '維生素 A：每天至少給一種富含維生素 A 的食物，例如紅蘿蔔、地瓜、深綠色蔬菜', 'Vitamin A: give at least one vitamin A-rich food every day, such as carrots, sweet potato or dark leafy greens.', '2,3'),
        r('avoid', '全種子飲食（缺蛋白質、鈣、維生素 A）；' + NOGRIT_ZH + '；所有鳥共通的禁忌食物：酪梨、巧克力、太油太鹹太甜、酒精', 'An all-seed diet (lacks protein, calcium and vitamin A); ' + NOGRIT_EN + '; foods no bird should have: avocado, chocolate, anything too oily, salty or sweet, and alcohol.', '1,3'),
        r('issue', '維生素 A 缺乏是寵物鳥最常見的問題之一，南美洲鸚鵡（包括金剛）特別容易發生', 'Vitamin A deficiency is one of the most common problems in pet birds, and South American parrots (macaws included) are especially prone to it.', '2'),
        r('tip', '鳥會看顏色、口感，換個形狀或擺法，比較容易接受新食物；要有耐心', 'Birds judge food by color and texture. Changing the shape or how it is offered can help them accept a new food; be patient.', '2')
      ],
      sources: [S.macaw, S.vitA, S.aav]
    },

    /* ---------------- 錐尾鸚鵡 ---------------- */
    {
      id: 'conure',
      name: ['錐尾鸚鵡', 'Conures'],
      members: ['金太陽・小太陽（香吉士、月亮）', 'Sun・Green-cheeked'],
      names: ['Sun Conure（<i>Aratinga solstitialis</i>，金太陽）、Green-cheeked Conure（<i>Pyrrhura molinae</i>，小太陽；香吉士、月亮為顏色變異）',
              'Sun Conure (<i>Aratinga solstitialis</i>) and Green-cheeked Conure (<i>Pyrrhura molinae</i>; the “Citrus” and “Moon” types are color mutations)'],
      lowSource: false,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['金太陽、小太陽皆為 CITES 附錄二。同屬的 <i>Pyrrhura cruentata</i> 才是附錄一，不是小太陽。',
               'Sun and Green-cheeked Conures are both CITES Appendix II. Only <i>Pyrrhura cruentata</i> of the same genus is on Appendix I; it is not the Green-cheeked Conure.'] },
      profile: [
        r('size', '中小型，嘴喙強壯、尾巴長；金太陽約 120 公克，小太陽約 60～80 公克', 'Small to medium, with a strong beak and long tail; Sun Conures weigh about 120 g and Green-cheeked Conures about 60–80 g.', '1'),
        r('look', '金太陽大部分是黃色，翅膀和尾巴綠色，頭和腹部有橘色；小太陽大部分是綠色，尾巴紅褐色，頸部羽毛有鱗片狀花紋', 'Sun Conures are mostly yellow with green wings and tail and orange on the head and belly; Green-cheeked Conures are mostly green with a red-brown tail and scale-like markings on the neck feathers.', '1'),
        r('sex', '公鳥和母鳥外觀一樣，看外表分不出來', 'Males and females look alike and cannot be told apart by appearance.', '1'),
        r('life', '平均 20～25 年，也有活到 35～40 年的紀錄', 'Average 20–25 years, with records of 35–40 years.', '1'),
        r('pers', '活潑、愛玩', 'Lively and playful.', '1'),
        r('voice', '小太陽這一類（<i>Pyrrhura</i>）相對安靜；金太陽這一類（<i>Aratinga</i>）有些叫聲又大又尖', 'The Green-cheeked group (<i>Pyrrhura</i>) is relatively quiet; some of the Sun Conure group (<i>Aratinga</i>) have loud, shrill calls.', '1'),
        r('newbie', null, null, ''),
        r('care', '要常讓牠洗澡或淋浴，保持皮膚和羽毛健康；籠子最小約 51×51×91 公分；欄杆間距小型錐尾 1.3～1.9 公分、大型錐尾 1.9～2.5 公分；站架粗約 1.3～1.6 公分，不建議用砂紙套站架，會磨傷腳；玩具非常重要，也要鼓勵牠覓食、玩耍', 'Bathe or shower it often to keep skin and feathers healthy; minimum cage about 51 × 51 × 91 cm; bar spacing 1.3–1.9 cm for small conures and 1.9–2.5 cm for large ones; perches about 1.3–1.6 cm thick, and avoid sandpaper perch covers, which can injure the feet; toys are very important, and encourage foraging and play.', '1'),
        r('temp', '室溫 21～27°C 一般都可以接受', 'A room temperature of 21–27 °C is generally acceptable.', '1'),
        r('health', '新買的鳥建議先隔離觀察；錐尾常見的疾病包括鸚鵡熱（披衣菌）、鸚鵡喙羽症', 'Quarantine a newly bought bird and observe it first. Common conure illnesses include psittacosis (chlamydia) and psittacine beak and feather disease.', '1')
      ],
      feed: [
        r('wild', '各種種子、水果和堅果', 'Various seeds, fruit and nuts.', '1'),
        r('staple', STAPLE[0], STAPLE[1], '3'),
        r('extra', '飲食要多樣化，並含有足夠的維生素 K；南美洲鸚鵡容易缺乏維生素 A，每天至少給一種富含維生素 A 的食物', 'Offer a varied diet with enough vitamin K. South American parrots are prone to vitamin A deficiency, so give at least one vitamin A-rich food every day.', '1,2'),
        r('avoid', '全種子飲食（缺乏蛋白質、維生素和礦物質，包括鈣和維生素 A）；' + NOGRIT_ZH, 'An all-seed diet (lacks protein, vitamins and minerals, including calcium and vitamin A); ' + NOGRIT_EN + '.', '1'),
        r('issue', '維生素 A 缺乏', 'Vitamin A deficiency.', '2')
      ],
      sources: [S.conure, S.vitA, S.aav]
    },

    /* ---------------- 傘巴 ---------------- */
    {
      id: 'cockatoo',
      name: ['傘巴', 'Umbrella Cockatoo'],
      members: ['雨傘巴丹', 'Umbrella Cockatoo'],
      names: ['Umbrella Cockatoo（<i>Cacatua alba</i>，雨傘巴丹）', 'Umbrella Cockatoo (<i>Cacatua alba</i>)'],
      lowSource: false,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['傘巴（<i>Cacatua alba</i>）是 CITES 附錄二。附錄一的鳳頭鸚鵡為 <i>Cacatua goffiniana、haematuropygia、moluccensis</i>（鮭色巴丹）、<i>sulphurea</i>（小葵花）、<i>Probosciger aterrimus</i>（棕櫚鳳頭）。',
               'The Umbrella Cockatoo (<i>Cacatua alba</i>) is CITES Appendix II. The cockatoos on Appendix I are <i>Cacatua goffiniana, haematuropygia, moluccensis</i> (Salmon-crested), <i>sulphurea</i> (Yellow-crested) and <i>Probosciger aterrimus</i> (Palm Cockatoo).'] },
      profile: [
        r('size', '鳳頭鸚鵡是中大型鸚鵡，嘴喙厚重，全長約 30～70 公分；傘巴體重約 400～700 公克', 'Cockatoos are medium to large parrots with heavy beaks, about 30–70 cm long; the Umbrella Cockatoo weighs about 400–700 g.', '1'),
        r('look', '白色冠羽豎起來像撐開的雨傘，是和其他白色鳳頭鸚鵡最好分辨的特徵', 'The white crest opens like an umbrella when raised, which is the easiest way to tell it from other white cockatoos.', '1'),
        r('sex', '看眼睛：公鳥虹膜是黑色或深褐色，母鳥是淺褐或紅褐色；幼鳥是淺灰色', 'Look at the eyes: the male’s iris is black or dark brown, the female’s is light brown or reddish brown; in young birds it is pale gray.', '1'),
        r('life', '鳳頭鸚鵡平均 30～45 年', 'Cockatoos average 30–45 years.', '1'),
        r('pers', '非常黏人、社交需求高，也非常敏感；受威脅、興奮、生氣或想玩的時候會豎起冠羽', 'Very affectionate, highly social and very sensitive; it raises its crest when threatened, excited, angry or wanting to play.', '1'),
        r('voice', null, null, ''),
        r('newbie', null, null, ''),
        r('care', '需要高大、寬敞、焊接牢固的籠子，籠門和食盆要能上鎖；欄杆間距約 1.3～1.9 公分；站架粗約 1.9～5 公分（依體型）；傘巴會產生大量粉絨，要常洗澡或淋浴', 'Needs a tall, roomy, well-welded cage with lockable doors and food bowls; bar spacing about 1.3–1.9 cm; perches about 1.9–5 cm thick depending on size; the Umbrella Cockatoo produces a lot of powder down, so bathe or shower it often.', '1'),
        r('mood', '比較容易出現拔毛和自殘行為，要多給互動、玩具和覓食遊戲', 'More prone to feather plucking and self-injury, so give plenty of interaction, toys and foraging games.', '1'),
        r('health', '新鳥建議先隔離觀察；常見疾病包括鸚鵡喙羽症、腺胃擴張症（博納病毒）、疱疹病毒；平常抱起來手上會沾到白色粉末，如果沒有粉，可能是羽毛異常的早期徵兆', 'Quarantine a new bird and observe it first. Common illnesses include psittacine beak and feather disease, proventricular dilatation disease (bornavirus) and herpesvirus. Handling it normally leaves white powder on your hands; if there is none, it may be an early sign of abnormal feathers.', '1')
      ],
      feed: [
        r('wild', '水果、種子、昆蟲和幼蟲、花朵；和多數鸚鵡不同，有些鳳頭鸚鵡會吃水果的果肉', 'Fruit, seeds, insects and larvae, and flowers; unlike most parrots, some cockatoos eat the flesh of fruit.', '1'),
        r('staple', STAPLE[0], STAPLE[1], '2'),
        r('avoid', '全種子飲食（缺乏蛋白質、維生素和礦物質，包括鈣和維生素 A）；保健砂（不需要，生病時可能吃太多造成阻塞）', 'An all-seed diet (lacks protein, vitamins and minerals, including calcium and vitamin A); grit (not needed, and a sick bird may eat too much and become blocked).', '1'),
        r('issue', null, null, '')
      ],
      sources: [S.cockatoo, S.aav]
    },

    /* ---------------- 灰鸚鵡 ---------------- */
    {
      id: 'grey',
      name: ['灰鸚鵡', 'African Grey'],
      members: ['剛果灰・提姆尼灰', 'Congo・Timneh'],
      names: ['African Grey Parrot（<i>Psittacus erithacus</i>）', 'African Grey Parrot (<i>Psittacus erithacus</i>)'],
      lowSource: false,
      cites: { badge: ['附錄一', 'Appendix I'], level: 'I',
        note: ['最嚴格等級，買賣和進出口需要特別注意相關文件。',
               'The strictest level. Buying, selling, importing and exporting need special attention to the required documents.'] },
      profile: [
        r('size', '中型鸚鵡，臉部有一塊沒有羽毛的皮膚；體重約 300～400 公克', 'A medium-sized parrot with a patch of bare skin on the face; weighs about 300–400 g.', '1'),
        r('look', '剛果灰：黑色嘴、銀灰色身體、紅色尾巴；提姆尼灰：牛角色嘴、深灰色身體、暗紅色尾巴；眼睛出生前 4 個月是黑色，4 歲前會完全變成黃色', 'Congo grey: black beak, silver-grey body, red tail. Timneh grey: horn-colored beak, dark grey body, dark red tail. The eyes are black for the first 4 months and turn fully yellow by age 4.', '1'),
        r('sex', '外觀一樣，看外表分不出來', 'Males and females look alike and cannot be told apart by appearance.', '1'),
        r('life', '剛果灰平均 30～40 年', 'Congo greys average 30–40 years.', '1'),
        r('pers', '非常聰明，常能模仿各種聲音和說話；需要大量身體和腦力的刺激；如果沒有特別注意，很容易只親近一個人', 'Very intelligent and often able to mimic all kinds of sounds and speech; needs a lot of physical and mental stimulation; without care, it easily bonds with just one person.', '1'),
        r('voice', null, null, ''),
        r('newbie', null, null, ''),
        r('care', '會產生大量粉絨，每天要洗澡或淋浴；曬不到自然光的話，要提供全光譜燈；欄杆間距約 1.9～2.5 公分；站架粗約 2.5 公分；新東西要慢慢介紹，減少壓力', 'Produces a lot of powder down, so bathe or shower it every day; if it gets no natural light, provide a full-spectrum lamp; bar spacing about 1.9–2.5 cm; perches about 2.5 cm thick; introduce new things slowly to reduce stress.', '1'),
        r('mood', '拔毛是常見問題，特別是沒有得到足夠關注，或作息突然改變的時候', 'Feather plucking is common, especially when it gets too little attention or its routine suddenly changes.', '1'),
        r('health', '常見疾病包括低血鈣症候群、維生素 A 缺乏、麴菌症、口腔膿瘍、鼻石、鸚鵡喙羽症、腺胃擴張症', 'Common illnesses include hypocalcemia syndrome, vitamin A deficiency, aspergillosis, oral abscesses, rhinoliths, psittacine beak and feather disease and proventricular dilatation disease.', '1')
      ],
      feed: [
        r('wild', '種子、無花果和水果', 'Seeds, figs and fruit.', '1'),
        r('staple', STAPLE[0], STAPLE[1], '2'),
        r('avoid', '全種子飲食；保健砂（不需要）', 'An all-seed diet; grit (not needed).', '1'),
        r('issue', '灰鸚鵡出了名的挑食，偏愛吃種子，容易造成營養缺乏，<b>特別是缺鈣</b>', 'African greys are notoriously picky and prefer seeds, which easily leads to nutritional deficiencies, <b>especially calcium</b>.', '1')
      ],
      sources: [S.grey, S.aav]
    },

    /* ---------------- 小黃帽（亞馬遜） ---------------- */
    {
      id: 'amazon',
      name: ['小黃帽（亞馬遜）', 'Amazons'],
      members: ['亞馬遜鸚鵡（整體介紹）', 'Amazon parrots (general)'],
      names: ['Amazon Parrot（<i>Amazona</i> spp.，以亞馬遜鸚鵡整體介紹）', 'Amazon Parrot (<i>Amazona</i> spp.; described here as a group)'],
      lowSource: false,
      cites: { badge: ['依種類為附錄一或附錄二', 'Appendix I or II, by species'], level: 'mix',
        note: ['以亞馬遜鸚鵡整體介紹，依種類而定：有 16 種列在附錄一，例如 <i>Amazona oratrix</i>（黃頭亞馬遜），其餘為附錄二。',
               'Described here as a group, so it depends on the species: 16 species are on Appendix I, for example <i>Amazona oratrix</i> (Yellow-headed Amazon), and the rest are on Appendix II.'] },
      profile: [
        r('size', '身材矮壯、尾巴短而圓，全長約 30～38 公分；體重依種類約 300～550 公克', 'Stocky with a short, rounded tail, about 30–38 cm long; weighs roughly 300–550 g depending on species.', '1'),
        r('sex', '除了極少數種類，外觀一樣，看外表分不出來', 'Apart from a very few species, males and females look alike and cannot be told apart by appearance.', '1'),
        r('life', '平均 40～60 年', 'Average 40–60 years.', '1'),
        r('pers', '外向，通常不會只認定一位家人，一般是很好的家庭寵物；社交互動對牠很重要；繁殖季可能出現看起來像攻擊的行為', 'Outgoing and usually does not fix on just one family member, so it is generally a good family pet; social interaction matters a lot to it; in breeding season it may show behavior that looks aggressive.', '1'),
        r('voice', '可能很吵', 'Can be very noisy.', '1'),
        r('newbie', null, null, ''),
        r('care', '常讓牠洗澡或淋浴；站架粗約 2.5 公分；欄杆間距多數約 1.9～2.5 公分，大型種類 1.9～3.8 公分；活動量很重要，可以預防肥胖', 'Bathe or shower it often; perches about 2.5 cm thick; bar spacing mostly about 1.9–2.5 cm, or 1.9–3.8 cm for large species; exercise matters and helps prevent obesity.', '1'),
        r('health', '常見問題包括肥胖、脂肪肝、動脈粥狀硬化、維生素 A 缺乏引起的鼻竇炎、蛋阻塞、麴菌症、鸚鵡熱；鉛中毒時尿液可能變紅褐色', 'Common problems include obesity, fatty liver disease, atherosclerosis, sinusitis caused by vitamin A deficiency, egg binding, aspergillosis and psittacosis; in lead poisoning the urine may turn reddish brown.', '1')
      ],
      feed: [
        r('wild', '水果、花、種子，有時也吃昆蟲', 'Fruit, flowers and seeds, and sometimes insects.', '1'),
        r('staple', STAPLE[0], STAPLE[1], '2'),
        r('avoid', '全種子飲食；保健砂（不需要）', 'An all-seed diet; grit (not needed).', '1'),
        r('issue', '亞馬遜胃口很好，活動量少就容易變胖；飲食要多樣化，降低肥胖的機會', 'Amazons have a big appetite and gain weight easily if they do not move much; offer a varied diet to lower the chance of obesity.', '1')
      ],
      sources: [S.amazon, S.aav]
    },

    /* ---------------- 折衷鸚鵡 ---------------- */
    {
      id: 'eclectus',
      name: ['折衷鸚鵡', 'Eclectus'],
      members: ['公鳥綠色・母鳥紅色', 'Green males・red females'],
      names: ['Eclectus Parrot（<i>Eclectus roratus</i>）', 'Eclectus Parrot (<i>Eclectus roratus</i>)'],
      lowSource: false,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['CITES 附錄二；國際自然保護聯盟（IUCN）列為「無危」。', 'CITES Appendix II; listed as “Least Concern” by the IUCN.'] },
      profile: [
        r('size', '中型鸚鵡，全長約 31～37 公分；體重約 375～550 公克', 'A medium-sized parrot, about 31–37 cm long; weighs about 375–550 g.', '1'),
        r('sex', '鳥類世界中公母差異最明顯的例子：公鳥主要是綠色，母鳥是鮮豔的紅色，過去生物學家還以為是兩種不同的鳥', 'The most striking difference between the sexes in the bird world: males are mainly green and females are bright red, so biologists once thought they were two different birds.', '1'),
        r('life', '平均 30～40 年，最長紀錄 50～60 年', 'Average 30–40 years, with a maximum record of 50–60 years.', '1'),
        r('pers', '非常聰明、相對安靜；母鳥個性可能從強勢到具攻擊性，只建議有經驗的飼主飼養母鳥；公鳥有時比較膽小', 'Very intelligent and relatively quiet. Females can range from dominant to aggressive, so only experienced keepers are advised to keep a female; males are sometimes timid.', '1'),
        r('voice', '相對安靜', 'Relatively quiet.', '1'),
        r('newbie', '母鳥只建議有經驗的飼主', 'Only experienced keepers are advised to keep a female.', '1'),
        r('care', '很多書建議籠子最小 61×91×122 公分，但牠需要很多空間玩和爬，越大越好；欄杆間距約 1.9～3.8 公分；站架粗約 2.5 公分；曬不到自然光的話，考慮提供全光譜燈，降低維生素 D 缺乏的風險', 'Many books suggest a minimum cage of 61 × 91 × 122 cm, but it needs plenty of space to play and climb, so bigger is better; bar spacing about 1.9–3.8 cm; perches about 2.5 cm thick; if it gets no natural light, consider a full-spectrum lamp to lower the risk of vitamin D deficiency.', '1'),
        r('health', '常見問題包括維生素 A 缺乏、拔毛、趾頭束帶症、多瘤病毒、鸚鵡喙羽症', 'Common problems include vitamin A deficiency, feather plucking, toe constriction, polyomavirus and psittacine beak and feather disease.', '1')
      ],
      feed: [
        r('wild', '主要是水果、無花果、堅果、花芽和葉芽，也吃少量種子', 'Mainly fruit, figs, nuts, flower buds and leaf buds, plus a small amount of seeds.', '1'),
        r('staple', '給多樣化的飲食，包括滋養丸、全穀類、水果和蔬菜（來源未給具體百分比）', 'A varied diet including pellets, whole grains, fruit and vegetables (the source gives no specific percentages).', '1'),
        r('avoid', '全種子飲食；保健砂（不需要）', 'An all-seed diet; grit (not needed).', '1'),
        r('issue', '維生素 A 缺乏', 'Vitamin A deficiency.', '1')
      ],
      sources: [S.eclectus]
    },

    /* ---------------- 紅色系吸蜜 ---------------- */
    {
      id: 'lory',
      name: ['紅色系吸蜜', 'Lories & Lorikeets'],
      members: ['紅色吸蜜等吸蜜鸚鵡', 'Red lory and other nectar-feeding parrots'],
      names: ['Lory／Lorikeet（以吸蜜鸚鵡整體介紹；最常見的寵物種是紅色吸蜜 <i>Eos bornea</i>）', 'Lory / Lorikeet (described here as a group; the most common pet species is the Red Lory, <i>Eos bornea</i>)'],
      lowSource: false,
      cites: { badge: ['多數附錄二，少數附錄一', 'Mostly Appendix II, a few Appendix I'], level: 'mix',
        note: ['以吸蜜鸚鵡整體介紹：多數為 CITES 附錄二，少數種類如紅藍吸蜜（<i>Eos histrio</i>）、<i>Vini ultramarina</i> 是附錄一。',
               'Described here as a group: most are CITES Appendix II, but a few such as the Red-and-blue Lory (<i>Eos histrio</i>) and <i>Vini ultramarina</i> are on Appendix I.'] },
      profile: [
        r('size', '依種類 20～280 公克；紅色吸蜜約 170 公克', 'Depending on species, 20–280 g; the Red Lory weighs about 170 g.', '1'),
        r('look', '小型的 lorikeet 尾巴比較細長，大型的 lory 尾巴短而鈍', 'Small lorikeets have slender, longer tails; larger lories have short, blunt tails.', '1'),
        r('sex', '多數寵物種外觀一樣', 'In most pet species males and females look alike.', '1'),
        r('life', 'lorikeet 平均 15～20 年；lory 平均 20～30 年', 'Lorikeets average 15–20 years; lories average 20–30 years.', '1'),
        r('pers', '聰明、非常愛玩，很容易學會說話和把戲；有領域性，和其他鳥種處不來', 'Intelligent and very playful, and easily learn to talk and do tricks; territorial and may not get along with other species.', '1'),
        r('voice', null, null, ''),
        r('newbie', null, null, ''),
        r('care', '每天洗澡或淋浴；站架粗約 0.95～1.9 公分，不建議砂紙套；很會開籠門逃走，門一定要鎖好；因為吃花蜜，便便很水，比較適合養在鳥舍', 'Bathe or shower it every day; perches about 0.95–1.9 cm thick, and avoid sandpaper covers; it is good at opening cage doors and escaping, so always lock the door; because it eats nectar its droppings are very watery, so it is better suited to an aviary.', '1'),
        r('health', '常見問題包括血鐵沉積症、肝病、維生素 A 缺乏、肥胖和脂肪肝、大腸桿菌和沙門氏菌感染、鸚鵡喙羽症', 'Common problems include iron storage disease, liver disease, vitamin A deficiency, obesity and fatty liver, E. coli and Salmonella infections, and psittacine beak and feather disease.', '1')
      ],
      feed: [
        r('wild', '花粉、花蜜、花朵、軟的水果和昆蟲，屬於「花蜜食性」', 'Pollen, nectar, flowers, soft fruit and insects; they are “nectarivores”.', '1'),
        r('staple', '需要專門的花蜜飼料，和一般鸚鵡不同', 'Needs a special nectar diet, unlike other parrots.', '2'),
        r('watch', '一定要提供足夠的水；食物要常常更換，避免腐壞', 'Always provide enough water; change food often to keep it from spoiling.', '1'),
        r('avoid', '保健砂（不需要，但吸蜜會吃，生病時可能吃太多造成阻塞）', 'Grit (not needed, but lories will eat it, and a sick bird may eat too much and become blocked).', '1'),
        r('issue', '血鐵沉積症、肥胖和脂肪肝', 'Iron storage disease, obesity and fatty liver.', '1'),
        r('vet', '有獸醫分享，她用「滋養丸加水，再拌入無糖的有機嬰兒食品」餵養吸蜜，不加玉米糖漿或甜味劑，她的鳥活到 20 歲（屬於個別獸醫經驗，不是通用標準）', 'One vet reports feeding her lories “pellets with water, mixed with unsweetened organic baby food”, with no corn syrup or sweeteners, and her bird lived to 20 (one vet’s personal experience, not a general standard).', '1')
      ],
      sources: [S.lory, S.aav]
    },

    /* ---------------- 凱克（飼料公司資料） ---------------- */
    {
      id: 'caique',
      name: ['凱克', 'Caiques'],
      members: ['綠腿・金凱・黑凱', 'Green-thighed・White-bellied・Black-headed'],
      names: ['Black-headed Caique（<i>Pionites melanocephalus</i>，黑凱）、White-bellied Caique（<i>Pionites leucogaster</i>，金凱；綠腿為白腹凱克的亞種類型）',
              'Black-headed Caique (<i>Pionites melanocephalus</i>) and White-bellied Caique (<i>Pionites leucogaster</i>; the “green-thighed” type is a subspecies form of the White-bellied Caique)'],
      lowSource: true,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['凱克（<i>Pionites</i> spp.）是 CITES 附錄二。', 'Caiques (<i>Pionites</i> spp.) are CITES Appendix II.'] },
      profile: [
        r('size', '中型，身長約 23～25 公分；身材結實，比外表看起來重', 'Medium-sized, about 23–25 cm long; stocky and heavier than it looks.', '1'),
        r('look', '黑凱：黑色頭和黑色嘴；金凱：白肚子、牛角色嘴、橘黃色的頭；兩種都是綠、橘、黃、白的色塊組合', 'Black-headed: black head and black beak. White-bellied: white belly, horn-colored beak and orange-yellow head. Both are patchworks of green, orange, yellow and white.', '1'),
        r('life', '可達 30 年', 'Can reach 30 years.', '1'),
        r('pers', '被稱為「鳥界的小丑」，精力旺盛、非常愛玩、外向；但也可能固執、愛咬、很有主見', 'Known as the “clowns of the bird world”: energetic, very playful and outgoing, but can also be stubborn, bitey and strong-willed.', '1'),
        r('voice', '中等，比不上鳳頭鸚鵡那麼吵，但也不安靜；不以說話出名，比較擅長吹口哨和咯咯聲', 'Moderate: not as loud as a cockatoo, but not quiet either. It is not known for talking and is better at whistling and clucking.', '1'),
        r('newbie', null, null, ''),
        r('care', '雖然是中型鳥，但需要很大的空間，小籠子會讓牠很痛苦；籠子要堅固（例如不鏽鋼），牠很快就會找到籠子的弱點；需要源源不絕的玩具，特別是可以破壞的玩具', 'Although it is a medium-sized bird it needs a lot of space, and a small cage makes it miserable; the cage must be sturdy (stainless steel, for example) because it will quickly find any weak point; it needs an endless supply of toys, especially ones it can destroy.', '1'),
        r('others', '容易攻擊其他鳥，家裡有其他鳥要特別注意', 'Likely to attack other birds, so take extra care if you keep other birds.', '1'),
        r('health', '好奇又愛玩，出籠時要特別看好；可能比較容易感染多瘤病毒', 'Curious and playful, so watch it closely when it is out of the cage; it may be more prone to polyomavirus infection.', '1')
      ],
      feed: [
        r('staple', '以滋養丸為主，搭配新鮮蔬果（來源未給具體百分比）', 'Mostly pellets, with fresh vegetables and fruit (the source gives no specific percentages).', '1,2'),
        r('other', null, null, '')
      ],
      sources: [S.caique, S.aav]
    },

    /* ---------------- 非洲鸚鵡（飼料公司資料） ---------------- */
    {
      id: 'african',
      name: ['非洲鸚鵡', 'Poicephalus'],
      members: ['塞內加爾・麥耶氏・紅腹・賈丁氏・魯佩氏・好望角', 'Senegal・Meyer’s・Red-bellied・Jardine’s・Rüppell’s・Cape'],
      names: ['<i>Poicephalus</i> 屬。以下以最常見的<b>塞內加爾</b>（Senegal Parrot，<i>Poicephalus senegalus</i>）為代表；麥耶氏、紅腹、賈丁氏、魯佩氏、好望角同屬',
              'Genus <i>Poicephalus</i>. The information below uses the most common species, the <b>Senegal Parrot</b> (<i>Poicephalus senegalus</i>), as its example; Meyer’s, Red-bellied, Jardine’s, Rüppell’s and Cape Parrots belong to the same genus.'],
      lowSource: true,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['六種（塞內加爾、麥耶氏、紅腹、賈丁氏、魯佩氏、好望角）都是 CITES 附錄二。', 'All six (Senegal, Meyer’s, Red-bellied, Jardine’s, Rüppell’s and Cape) are CITES Appendix II.'] },
      profile: [
        r('size', '塞內加爾屬小型，身長約 23 公分', 'The Senegal Parrot is small, about 23 cm long.', '1'),
        r('look', '深綠色和灰褐色為主，喉部有綠色光澤、腿部橘色、胸口黃色，嘴和腳是黑色，眼睛淡黃橘色', 'Mainly dark green and grey-brown, with a glossy green throat, orange legs and a yellow chest; the beak and feet are black and the eyes pale yellow-orange.', '1'),
        r('life', '30 年以上', 'Over 30 years.', '1'),
        r('pers', '這一屬以適合當寵物、安靜、性情穩定出名；塞內加爾很黏「自己的人」，不一定需要同伴；如果沒有每天回應牠的感情，牠會變得沮喪；不順牠的意時可能會咬人，不一定適合小孩', 'This genus is known for being good pets, quiet and even-tempered. The Senegal bonds closely with “its person” and does not necessarily need a companion bird; if you do not return its affection every day it becomes depressed; it may bite when it does not get its way, so it is not always suited to children.', '1'),
        r('voice', '不太會尖叫，多半是吹口哨和咯咯聲，不太會吵到鄰居；有些個體能學會幾十個詞', 'Rarely screams; mostly whistles and clucks, so it is unlikely to disturb neighbors; some individuals learn dozens of words.', '1'),
        r('newbie', '來源認為適合「有一點經驗」的飼主', 'The source considers it suitable for keepers with “some experience”.', '1'),
        r('care', '玩具是必需品，很愛啃軟木塊，可以給大型鸚鵡尺寸的玩具；繩子玩具要定期修剪，避免長線纏住腳或脖子', 'Toys are a must; it loves to chew cork blocks, and toys sized for large parrots are fine; trim rope toys regularly so long strands do not tangle around its feet or neck.', '1'),
        r('health', '這一屬常見的健康問題是麴菌症（黴菌感染），保持環境乾淨、均衡飲食、減少壓力可以降低風險；也要注意腺胃擴張症（博納病毒），症狀是有吃東西卻變瘦、食物沒消化、反芻', 'A common health problem in this genus is aspergillosis (a fungal infection); a clean environment, a balanced diet and less stress lower the risk. Also watch for proventricular dilatation disease (bornavirus), with signs such as losing weight despite eating, undigested food and regurgitation.', '1')
      ],
      feed: [
        r('staple', '以滋養丸為主，搭配新鮮蔬果（來源未給具體百分比）', 'Mostly pellets, with fresh vegetables and fruit (the source gives no specific percentages).', '1,2'),
        r('habit', '一般不挑食，願意吃各種營養食物；新食物要從小開始給，比較容易接受', 'Generally not picky and willing to eat all kinds of nutritious foods; start new foods when it is young so it accepts them more easily.', '1'),
        r('issue', '有變胖的傾向，給足夠的運動和均衡飲食可以避免', 'Tends to gain weight; enough exercise and a balanced diet help prevent this.', '1')
      ],
      sources: [S.senegal, S.aav]
    },

    /* ---------------- 各色和尚（飼料公司資料） ---------------- */
    {
      id: 'monk',
      name: ['各色和尚', 'Monk Parakeets'],
      members: ['藍綠・黃・白銀・黃臉派洛・肉桂', 'Blue-green・yellow・silver・and more'],
      names: ['Monk／Quaker Parakeet（<i>Myiopsitta monachus</i>，各色為顏色變異）', 'Monk / Quaker Parakeet (<i>Myiopsitta monachus</i>; the different colors are color mutations)'],
      lowSource: true,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['各色和尚（<i>Myiopsitta monachus</i>）是 CITES 附錄二。', 'Monk Parakeets (<i>Myiopsitta monachus</i>) of all colors are CITES Appendix II.'] },
      profile: [
        r('size', '小型，身長約 30 公分', 'Small, about 30 cm long.', '1'),
        r('life', '照顧得好可達 30 年', 'Up to 30 years with good care.', '1'),
        r('trait', '唯一自己用樹枝築巢的鸚鵡（其他鸚鵡多在樹洞築巢），巢可以非常大', 'The only parrot that builds its own nest of sticks (other parrots mostly nest in tree holes), and the nest can be very large.', '1'),
        r('pers', '非常社會化，喜歡家人或同伴陪伴，太常獨處會沮喪、焦躁；手養的和尚可以非常親人，沒馴化的也能慢慢馴服；很聰明，可以訓練學把戲', 'Very social and enjoys the company of family or other birds; too much time alone makes it depressed and restless. Hand-raised monks can be very friendly, and untamed ones can be tamed slowly; very smart and can be trained to do tricks.', '1'),
        r('quirk', '會上下擺動、顫抖，看起來像不舒服，其實是牠特有的正常行為', 'It bobs up and down and quivers, which looks like illness but is normal behavior for this bird.', '1'),
        r('voice', '<b>很吵</b>，可能吵醒熟睡的人或吵到鄰居，對聲音敏感的人要考慮；但很會說話，能學很多字句，年紀小就會開始說', '<b>Very noisy</b>; it can wake sleepers or disturb neighbors, so think carefully if you are sensitive to noise. But it talks very well, can learn many words and phrases, and starts at a young age.', '1'),
        r('newbie', null, null, ''),
        r('care', '非常愛啃，會破壞家具，要給大量可以啃的玩具和安全的樹枝', 'Loves to chew and will damage furniture, so give lots of chewable toys and safe branches.', '1'),
        r('health', '最常見的問題是拔毛，以及脂肪肝（和高油脂飲食，也就是以種子為主的飲食有關）', 'The most common problems are feather plucking and fatty liver disease (linked to a high-fat, seed-based diet).', '1')
      ],
      feed: [
        r('staple', '以滋養丸為主，搭配新鮮蔬果和健康的人類食物（來源未給具體百分比）', 'Mostly pellets, with fresh vegetables and fruit and healthy human foods (the source gives no specific percentages).', '1,2'),
        r('avoid', '以種子為主的高油脂飲食', 'A high-fat, seed-based diet.', '1'),
        r('issue', '脂肪肝', 'Fatty liver disease.', '1')
      ],
      sources: [S.quaker, S.aav]
    },

    /* ---------------- 鷹頭鸚鵡（飼料公司資料） ---------------- */
    {
      id: 'hawk',
      name: ['鷹頭鸚鵡', 'Hawk-headed Parrot'],
      members: ['紅扇鸚鵡', 'Red-fan Parrot'],
      names: ['Hawk-headed Parrot（<i>Deroptyus accipitrinus</i>），又稱紅扇鸚鵡', 'Hawk-headed Parrot (<i>Deroptyus accipitrinus</i>), also called the Red-fan Parrot'],
      lowSource: true,
      cites: { badge: ['附錄二', 'Appendix II'], level: 'II',
        note: ['鷹頭鸚鵡（<i>Deroptyus accipitrinus</i>）是 CITES 附錄二。', 'The Hawk-headed Parrot (<i>Deroptyus accipitrinus</i>) is CITES Appendix II.'] },
      profile: [
        r('size', '中型', 'Medium-sized.', '1'),
        r('look', '興奮或受威脅時，頭頸會豎起一圈紅藍相間的扇形羽毛，像老鷹一樣，因此得名；冠羽豎起也可能代表有攻擊性', 'When excited or threatened it raises a fan of red and blue feathers around the head and neck, like a hawk, which gives it its name; a raised fan can also signal aggression.', '1'),
        r('life', '30 年以上', 'Over 30 years.', '1'),
        r('pers', '個性強烈、獨立、有主見；野外成對或小群生活，容易只和家中一個人建立深厚感情；對陌生人可能害羞；好奇心強、愛探索、愛解謎', 'Strong-minded, independent and opinionated; in the wild it lives in pairs or small groups, and it easily forms a deep bond with just one person at home; it can be shy with strangers; curious, loves to explore and loves puzzles.', '1'),
        r('voice', '會吹口哨、嘎嘎叫、喋喋不休，音量有人比喻和凱克差不多；興奮或受威脅時會發出大聲尖銳的叫聲；能學少量詞句，但不如灰鸚鵡或亞馬遜', 'Whistles, squawks and chatters, with a volume some compare to a caique; it gives loud, shrill screams when excited or threatened; it can learn a few words and phrases, but not as many as an African grey or an Amazon.', '1'),
        r('newbie', '有人認為通常不適合第一次養鳥的人，因為行為複雜、需要有經驗的人照顧（只是建議，個體有差異）', 'Some consider it generally unsuitable for first-time bird keepers because its behavior is complex and it needs an experienced keeper (only a suggestion; individuals differ).', '1'),
        r('care', '籠子最小約寬 76×深 61×高 91 公分，欄杆間距約 1.9～2.5 公分；放不同粗細和材質的站架；需要爬梯、繩子、鞦韆；喜歡撕咬破壞，要提供安全木頭、棕櫚葉、紙板玩具和益智覓食玩具', 'Minimum cage about 76 cm wide × 61 cm deep × 91 cm high, with bar spacing about 1.9–2.5 cm; provide perches of different thicknesses and materials; it needs ladders, ropes and swings; it loves to tear and destroy things, so provide safe wood, palm leaves, cardboard toys and puzzle foraging toys.', '1'),
        r('health', '鸚鵡熱、麴菌症、營養缺乏（特別是維生素 A）、拔毛、鸚鵡喙羽症', 'Psittacosis, aspergillosis, nutritional deficiencies (especially vitamin A), feather plucking and psittacine beak and feather disease.', '1')
      ],
      feed: [
        r('staple', '優質滋養丸搭配新鮮蔬果（來源未給具體百分比）', 'High-quality pellets with fresh vegetables and fruit (the source gives no specific percentages).', '1,2'),
        r('issue', '飲食不均衡時容易缺乏維生素，特別是維生素 A，可能影響呼吸道或免疫系統', 'When the diet is unbalanced it easily lacks vitamins, especially vitamin A, which can affect the respiratory tract or the immune system.', '1')
      ],
      sources: [S.hawk, S.aav]
    }
  ];
})();

/* 鳥種照片（Wikimedia Commons）：檔案放在 photos/species/，作者與授權也列在 photos/species/CREDITS.md
   pos = 圖片裁切時對齊的位置（直式照片用 center 25%，露出頭部） */
window.CARE_PHOTOS = {
  macaw: { file: 'macaw.jpg', pos: 'center', w: 600, h: 400, alt: ["琉璃金剛特寫", "Close-up of a Blue-and-gold Macaw"], author: "H. Zell", license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', page: 'https://commons.wikimedia.org/wiki/File:Ara_ararauna_01.jpg' },
  conure: { file: 'conure.jpg', pos: 'center', w: 600, h: 450, alt: ["站在橫桿上的金太陽錐尾鸚鵡", "A Sun Conure perched on a bar"], author: "Sarah G from Tulsa, USA", license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0', page: 'https://commons.wikimedia.org/wiki/File:Aratinga_solstitialis_on_perch.jpg' },
  cockatoo: { file: 'cockatoo.jpg', pos: 'center', w: 600, h: 450, alt: ["豎起冠羽的傘巴", "An Umbrella Cockatoo with its crest raised"], author: "www.viajar24h.com", license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', page: 'https://commons.wikimedia.org/wiki/File:Cacatua_alba_-Bali_Bird_Park_-crest-8.jpg' },
  grey: { file: 'grey.jpg', pos: 'center', w: 600, h: 450, alt: ["灰鸚鵡半身照", "Upper body of an African Grey Parrot"], author: "L.Miguel Bugallo Sánchez", license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', page: 'https://commons.wikimedia.org/wiki/File:Psittacus_erithacus_-upper_body-8c.jpg' },
  amazon: { file: 'amazon.jpg', pos: 'center 25%', w: 600, h: 912, alt: ["小黃帽（黃頂亞馬遜鸚鵡）", "A Yellow-crowned Amazon parrot"], author: "Noop1958 at German Wikipedia", license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', page: 'https://commons.wikimedia.org/wiki/File:Gelbscheitelamazone.jpg' },
  eclectus: { file: 'eclectus.jpg', pos: 'center', w: 600, h: 444, alt: ["母折衷鸚鵡紅色的頭部", "The red head of a female Eclectus Parrot"], author: "H. Zell", license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', page: 'https://commons.wikimedia.org/wiki/File:Eclectus_roratus_-_Maroparque_03.jpg' },
  lory: { file: 'lory.jpg', pos: 'center 25%', w: 600, h: 900, alt: ["紅色吸蜜鸚鵡", "A Red Lory"], author: "Zhao !", license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', page: 'https://commons.wikimedia.org/wiki/File:Eos_bornea_-captive-8a.jpg' },
  caique: { file: 'caique.jpg', pos: 'center', w: 600, h: 450, alt: ["兩隻金凱（白腹凱克）", "Two White-bellied Caiques"], author: "TJ Lin", license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0', page: 'https://commons.wikimedia.org/wiki/File:Pionites_leucogaster_-two_perching-8a.jpg' },
  african: { file: 'african.jpg', pos: 'center', w: 600, h: 548, alt: ["塞內加爾鸚鵡", "A Senegal Parrot"], author: "Arne Müseler", license: 'CC BY-SA 3.0 DE', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en', page: 'https://commons.wikimedia.org/wiki/File:Mohrenkopfpapagei1.jpg' },
  monk: { file: 'monk.jpg', pos: 'center', w: 600, h: 600, alt: ["站在枝頭的和尚鸚鵡", "A Monk Parakeet perched on a branch"], author: "Charles J. Sharp", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', page: 'https://commons.wikimedia.org/wiki/File:Monk_parakeet_(Myiopsitta_monachus)_Santiago.jpg' },
  hawk: { file: 'hawk.jpg', pos: 'center', w: 600, h: 450, alt: ["豎起扇形羽毛的鷹頭鸚鵡", "A Hawk-headed Parrot with its fan of feathers raised"], author: "frank wouters", license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0', page: 'https://commons.wikimedia.org/wiki/File:Deroptyus_accipitrinus_-head-3.jpg' }
};
