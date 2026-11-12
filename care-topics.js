/* =========================================================
   care-topics.js：「養鳥知識 → 共通照顧須知」的文章資料（只放資料，不放版面）
   內容來源：養鳥知識文章.md

   資料格式：
   - 每個主題 id 對應網址的 #（beginner / feed / daily / health / faq）
   - items 是一題一題的卡片：q = [中文標題, 英文標題]，body = 內容區塊
   - 內容區塊：{ p: [中, 英] } 段落、{ ul: [[中, 英], ...] } 清單、{ ol: [[中, 英], ...] } 編號清單、
               { shop: [中, 英] } 本店做法（淡橘色框）
   - 內文可以用 <b>粗體</b>；〔A〕這類來源標記用 <span class="rk">〔A〕</span>
   - refs 是參考來源：ref(用途中, 用途英, 機構, 標題, 網址)
   ========================================================= */
(function () {
  var O = {
    msd: ['MSD 獸醫手冊', 'MSD Veterinary Manual'],
    msdOwner: ['MSD 獸醫手冊（飼主版）', 'MSD Veterinary Manual (owner edition)'],
    msdPro: ['MSD 獸醫手冊（專業版）', 'MSD Veterinary Manual (professional edition)'],
    aav: ['AAV', 'AAV (Association of Avian Veterinarians)'],
    avian: ['Avian & Exotic Animal Hospital', 'Avian & Exotic Animal Hospital'],
    vetclick: ['VetClick', 'VetClick'],
    lafeber: ['LafeberVet', 'LafeberVet']
  };
  var AAV_FEED = 'https://static1.squarespace.com/static/5c8fbfe87d0c914f25ad6fa4/t/5cdc54081905f4bfdd4e91e7/1557943306229/Feeding+Birds.pdf';
  // ref(用途中文, 用途英文, 機構key, 文章標題, 網址, 備註[中,英])
  function ref(uz, ue, o, t, url, x) { return { u: uz ? [uz, ue] : null, o: O[o], t: t, url: url || '', x: x || null }; }
  function note(zh, en) { return { note: [zh, en] }; }

  window.CARE_TOPICS = [
    /* ================= 1. 新手入門 ================= */
    {
      id: 'beginner',
      title: ['新手入門', 'Beginner’s Guide'],
      sub: ['帶鳥回家前，先準備好這些', 'What to get ready before you bring a bird home'],
      items: [
        { q: ['養鳥是長期承諾嗎？鳥可以活多久？', 'Is keeping a bird a long-term commitment? How long do birds live?'],
          body: [{ p: ['很多寵物鳥都很長壽。一般來說，虎皮鸚鵡可以活 10～12 年以上，玄鳳鸚鵡 15～20 年以上，大型鸚鵡甚至能陪伴你 25～50 年。決定養之前，請先想想這段時間的照顧、醫療費和陪伴時間。',
                       'Many pet birds are very long-lived. Generally, budgerigars can live 10–12 years or more, cockatiels 15–20 years or more, and large parrots may keep you company for 25–50 years. Before deciding, think about the care, veterinary costs and companionship you will be giving for all those years.'] }] },
        { q: ['籠子要怎麼挑？', 'How do I choose a cage?'],
          body: [{ ul: [
            ['<b>夠大最重要</b>：籠子太小會讓鳥有壓力。基本原則是，籠子的長、寬、高都要至少是鳥張開翅膀寬度的 1.5 倍，讓牠能伸展。養兩隻以上要再更大。',
             '<b>Big enough comes first</b>: a cage that is too small stresses a bird. As a basic rule, the length, width and height should each be at least 1.5 times the bird’s wingspan so it can stretch. Keeping two or more birds needs an even bigger cage.'],
            ['<b>方形比圓形好</b>：多數鳥喜歡有角落可以待著，長方形的籠子比圓籠更有安全感。',
             '<b>Rectangular is better than round</b>: most birds like having a corner to settle in, so a rectangular cage feels safer than a round one.'],
            ['<b>不是每隻鳥都能同籠</b>：個性不合的鳥關在一起可能會打架，要合籠前先問過鳥醫或有經驗的店家。',
             '<b>Not every bird can share a cage</b>: birds with clashing personalities may fight. Ask an avian vet or an experienced shop before putting birds together.']
          ] }] },
        { q: ['籠子要放在家裡哪裡？', 'Where in the house should I put the cage?'],
          body: [{ ul: [
            ['避開窗邊和冷氣出風口，溫度變化太大鳥容易生病。', 'Keep it away from windows and air-conditioner vents; big temperature swings make birds sick.'],
            ['<b>不要放在廚房</b>：煮菜的油煙和燒焦的煙對鳥很危險。', '<b>Never in the kitchen</b>: cooking fumes and burnt smoke are dangerous to birds.'],
            ['有些鳥喜歡待在家人旁邊，有些鳥在安靜的角落比較安心，觀察你家鳥寶的個性來決定。', 'Some birds like to be near the family and others feel safer in a quiet corner; watch your bird’s personality and decide accordingly.']
          ] }] },
        { q: ['帶鳥回家前後要做什麼？', 'What should I do before and after bringing a bird home?'],
          body: [{ ul: [
            ['新鳥最好先讓<b>鳥類專科獸醫</b>檢查一次，再跟家裡其他的鳥接觸。', 'Have a new bird checked once by an <b>avian veterinarian</b> before it meets your other birds.'],
            ['趁鳥寶健康的時候，就先找好附近的鳥醫。鳥生病時很會隱藏，等到看出來往往已經很嚴重，事先找好醫生才不會手忙腳亂。', 'Find a bird vet nearby while your bird is still healthy. Sick birds hide their illness well, and by the time you can see it, it is often already serious; having a vet ready means you will not be scrambling.']
          ] }] }
      ],
      refs: [
        ref('壽命', 'Lifespan', 'avian', 'Basic Care for your Pet Bird', 'https://avianandexotic.com/care-sheets/birds/basic-care-for-your-pet-bird'),
        ref('籠子大小、方形籠、擺放位置、廚房油煙、合籠', 'Cage size, rectangular cages, placement, kitchen fumes, sharing a cage', 'msd', 'Providing a Home for a Bird', 'https://www.msdvetmanual.com/bird-owners/choosing-and-taking-care-of-a-pet-bird/providing-a-home-for-a-bird'),
        ref('新鳥先給獸醫檢查', 'Veterinary check for a new bird', 'msd', 'Importance of Veterinary Care in Pet Birds', 'https://www.msdvetmanual.com/bird-owners/routine-care-and-breeding-of-birds/importance-of-veterinary-care-in-pet-birds'),
        ref('事先找好鳥醫', 'Finding an avian vet in advance', 'aav', 'Bird Owner Resources', 'https://www.aav.org/page/birdowners')
      ]
    },

    /* ================= 2. 飼料怎麼選 ================= */
    {
      id: 'feed',
      title: ['飼料怎麼選', 'Choosing Feed'],
      sub: ['種子、滋養丸和副食', 'Seeds, pellets and fresh foods'],
      items: [
        { q: ['鸚鵡的理想菜單是什麼？', 'What is the ideal menu for a parrot?'],
          body: [{ p: ['鳥類獸醫一般建議，鸚鵡的飲食以<b>滋養丸（顆粒飼料）為主</b>，再搭配蔬菜、水果、全穀類，種子和堅果只給少量。',
                       'Avian vets generally recommend that a parrot’s diet be <b>mainly pellets</b>, supplemented with vegetables, fruit and whole grains, with only a small amount of seeds and nuts.'] }] },
        { q: ['為什麼種子不能當主食？', 'Why shouldn’t seeds be the main diet?'],
          body: [{ p: ['種子和堅果的脂肪、熱量很高，但維生素 A、鈣和某些必需胺基酸卻很少。市售種子雖然有些會噴上維生素，但大多沾在外殼上，鳥剝殼後幾乎吃不到。長期只吃種子，容易營養不均衡。',
                       'Seeds and nuts are high in fat and calories but low in vitamin A, calcium and some essential amino acids. Some commercial seed mixes are sprayed with vitamins, but most of it ends up on the hulls, so the bird barely gets any after hulling. Eating only seeds for a long time easily leads to an unbalanced diet.'] }] },
        { q: ['滋養丸是什麼？怎麼幫鳥換飼料？', 'What are pellets, and how do I switch my bird’s food?'],
          body: [
            { p: ['滋養丸是依照鳥的營養需求調配的，蛋白質、維生素、礦物質的比例都經過設計，營養比種子均衡得多。缺點是有些鳥不愛吃，特別是吃種子吃很久的鳥，可能根本不認得那是食物。',
                   'Pellets are formulated to a bird’s nutritional needs, with the proteins, vitamins and minerals balanced by design, so they are far more balanced than seeds. The downside is that some birds will not eat them, especially birds that have eaten seeds for a long time and may not even recognize pellets as food.'] },
            { p: ['<b>換飼料要慢慢來</b>：每次只加一點點新飼料，同時慢慢減少種子的量，並注意鳥寶<b>總共吃了多少</b>。換飼料期間最好定期幫牠量體重，有變瘦就要放慢速度。不確定怎麼換，可以問鳥醫或來店裡問我們。',
                   '<b>Switch slowly</b>: add only a little new food at a time while gradually reducing the seeds, and keep track of <b>how much your bird eats in total</b>. Weigh your bird regularly during the switch, and slow down if it loses weight. If you are not sure how to do it, ask your avian vet or come and ask us in the shop.'] }
          ] },
        { q: ['蔬菜水果要怎麼給？', 'How should I offer vegetables and fruit?'],
          body: [{ ul: [
            ['深綠色蔬菜（花椰菜、羽衣甘藍、菠菜）和橘紅色蔬菜（地瓜、紅蘿蔔）富含 β-胡蘿蔔素，可以補充種子缺少的維生素 A。', 'Dark green vegetables (broccoli, kale, spinach) and orange-red vegetables (sweet potato, carrots) are rich in beta-carotene and make up for the vitamin A that seeds lack.'],
            ['水果（尤其是莓果）有纖維和抗氧化物質。', 'Fruit (berries in particular) provides fiber and antioxidants.'],
            ['穀類選糙米、全麥這類全穀，少給白飯、白麵包。', 'For grains, choose whole grains such as brown rice and whole wheat, and give less white rice and white bread.'],
            ['新鮮食物放久會壞，<b>當天沒吃完要清掉</b>。', 'Fresh food spoils, so <b>throw out what is not eaten that day</b>.']
          ] }] },
        { q: ['哪些食物不能給鳥吃？', 'Which foods must never be given to birds?'],
          body: [{ ul: [
            ['<b>酪梨</b>：對人很健康，對鳥有毒', '<b>Avocado</b>: healthy for people, toxic to birds'],
            ['<b>巧克力</b>：含有可可鹼，可能造成過動甚至抽搐', '<b>Chocolate</b>: contains theobromine, which can cause hyperactivity and even seizures'],
            ['<b>太油、太鹹、太甜的食物</b>：鳥的體型小，很容易就吃過量', '<b>Foods that are too oily, salty or sweet</b>: birds are small and can easily overdo it'],
            ['<b>酒精飲料</b>', '<b>Alcoholic drinks</b>']
          ] }] },
        { q: ['保健砂、墨魚骨、鹽磚、維生素要給嗎？', 'Do I need grit, cuttlebone, salt blocks or vitamin supplements?'],
          body: [{ ul: [
            ['<b>保健砂</b>：大部分鸚鵡不需要；但金絲雀、文鳥這類雀科小鳥，常會建議提供磨碎的牡蠣殼砂。', '<b>Grit</b>: most parrots do not need it, but finches such as canaries and Java sparrows are often advised to have ground oyster-shell grit.'],
            ['<b>墨魚骨</b>：可以補充鈣質，正在生蛋的母鳥特別愛吃。', '<b>Cuttlebone</b>: a source of calcium that egg-laying hens especially like.'],
            ['<b>不要給鹽磚</b>。', '<b>Do not give salt blocks.</b>'],
            ['<b>維生素補充劑</b>：飲食均衡的鳥不需要，除非鳥醫建議，不要自己加。', '<b>Vitamin supplements</b>: a bird on a balanced diet does not need them; do not add them yourself unless your avian vet recommends it.'],
            ['<b>特殊飲食的鳥</b>：吸蜜鸚鵡在野外吃花蜜，要用專門的流質飼料；巨嘴鳥、八哥等鳥類需要<b>低鐵</b>的飲食。這些鳥請先跟我們或鳥醫討論。', '<b>Birds with special diets</b>: lories and lorikeets eat nectar in the wild and need a special liquid feed; toucans, mynas and similar birds need a <b>low-iron</b> diet. Please talk to us or your avian vet first about these birds.']
          ] }] }
      ],
      // 最後一題：不是展開卡片，而是切到「依鳥種查詢」
      speciesLink: { q: ['依鳥種的飼料建議', 'Feed recommendations by species'], hint: ['每種鳥的飼料建議，到「依鳥種查詢」看', 'See each species’ feeding advice in “By Species”'] },
      refs: [
        ref('全篇', 'Entire article', 'aav', 'Feeding Birds', AAV_FEED, ['（飼主手冊）', '(owner handout)'])
      ]
    },

    /* ================= 3. 日常照顧 ================= */
    {
      id: 'daily',
      title: ['日常照顧', 'Daily Care'],
      sub: ['每天花 10 分鐘就夠', 'Ten minutes a day is enough'],
      items: [
        { q: ['每天要幫鳥做哪些事？', 'What do I need to do for my bird every day?'],
          body: [{ ul: [
            ['<b>換新鮮的水</b>：隨時都要有乾淨的水。用飲水器比較不容易髒，但要定期清洗，並確認出水正常。放兩個飲水器，萬一一個壞了也不怕鳥沒水喝。', '<b>Change the water</b>: there should always be clean water. A water dispenser stays cleaner, but it must be washed regularly and checked to make sure water comes out. Put in two dispensers so your bird is not left without water if one fails.'],
            ['<b>洗食盆、水盆</b>，清掉前一天的剩食。', '<b>Wash the food and water bowls</b>, and clear away the previous day’s leftovers.'],
            ['<b>看一眼排便</b>：便便的顏色、形狀、量，是鳥健康最直接的指標（詳見〈健康警訊〉）。', '<b>Take a look at the droppings</b>: their color, shape and amount are the most direct indicators of a bird’s health (see “Warning Signs”).'],
            ['<b>觀察精神和食慾</b>：記住牠平常的樣子，才看得出哪裡不一樣。', '<b>Check its energy and appetite</b>: learn what is normal for your bird so you can tell when something is different.']
          ] }] },
        { q: ['怎麼讓鳥寶多運動？', 'How can I help my bird get more exercise?'],
          body: [{ ul: [
            ['鳥也需要運動。籠子裡要有足夠空間活動，放幾根粗細、材質不同的站架和玩具。', 'Birds need exercise too. The cage must have enough room to move, with a few perches of different thicknesses and materials, plus toys.'],
            ['可以讓牠出籠活動，但一定要<b>有人在旁邊看著</b>，並先關好門窗、收好電線。', 'You can let it out of the cage, but always <b>supervise it</b>, and close the doors and windows and put away electrical cords first.'],
            ['<b>不建議放鏡子玩具</b>，鏡子容易讓鳥搞混、產生壓力。', '<b>Mirror toys are not recommended</b>, because a mirror easily confuses a bird and causes stress.']
          ] }] },
        { q: ['怎麼讓鳥不無聊？', 'How do I keep my bird from getting bored?'],
          body: [
            { p: ['鳥類非常聰明，需要動腦。獸醫把「豐富化」分成五種，可以每一種都試試看：', 'Birds are very intelligent and need to use their minds. Vets divide “enrichment” into five kinds, and you can try each one:'] },
            { ol: [
              ['<b>感官</b>：不同的聲音、顏色、材質', '<b>Sensory</b>: different sounds, colors and textures'],
              ['<b>食物</b>：多樣化的飲食', '<b>Food</b>: a varied diet'],
              ['<b>操作</b>：可以啃、拆、玩的玩具', '<b>Manipulation</b>: toys it can chew, take apart and play with'],
              ['<b>環境</b>：偶爾調整籠內擺設', '<b>Environment</b>: occasionally rearranging things in the cage'],
              ['<b>行為</b>：訓練、互動、覓食遊戲，例如把零食藏在玩具裡讓牠找', '<b>Behavior</b>: training, interaction and foraging games, such as hiding a treat in a toy for it to find']
            ] }
          ] },
        { q: ['天冷時要怎麼保暖？', 'How do I keep my bird warm in cold weather?'],
          body: [{ p: ['人覺得舒服的溫度，鳥通常也覺得舒服。天冷時，與其蓋住籠子，不如把房間弄暖，或把籠子移離吹風的窗戶和出風口。',
                       'A temperature that feels comfortable to people is usually comfortable for birds too. When it is cold, rather than covering the cage, warm the room or move the cage away from drafty windows and vents.'] }] }
      ],
      refs: [
        ref('飲水、兩個飲水器、每日清洗食盆', 'Water, two water dispensers, washing bowls daily', 'aav', 'Feeding Birds', AAV_FEED),
        ref('運動、出籠要有人看、鏡子玩具、溫度與蓋籠', 'Exercise, supervising out-of-cage time, mirror toys, temperature and covering the cage', 'msd', 'Providing a Home for a Bird', 'https://www.msdvetmanual.com/bird-owners/choosing-and-taking-care-of-a-pet-bird/providing-a-home-for-a-bird'),
        ref('五種豐富化', 'The five kinds of enrichment', 'aav', 'Bird Owner Resources', 'https://www.aav.org/page/birdowners'),
        note('「關好門窗、收好電線」為一般安全常識，非上述來源內容', '“Close doors and windows, put away cords” is general safety common sense, not content from the sources above.')
      ]
    },

    /* ================= 4. 健康警訊 ================= */
    {
      id: 'health',
      title: ['健康警訊', 'Warning Signs'],
      sub: ['鳥很會「假裝沒事」', 'Birds are good at “pretending to be fine”'],
      items: [
        { q: ['為什麼鳥生病了很難看出來？', 'Why is it so hard to tell when a bird is sick?'],
          body: [{ p: ['在野外，生病的鳥會被天敵盯上，所以鳥天生就會<b>隱藏病痛</b>。等到看得出來生病，通常已經不輕了。所以平常就要熟悉鳥寶的習慣，一有變化就要警覺。',
                       'In the wild, a sick bird gets targeted by predators, so birds instinctively <b>hide their illness</b>. By the time you can see it, it is usually already serious. So get to know your bird’s habits well, and be alert at the first change.'] }] },
        { q: ['出現哪些狀況要盡快帶去看鳥醫？', 'Which signs mean I should take my bird to the vet right away?'],
          body: [
            { p: ['出現這些狀況，請盡快帶去看鳥醫：', 'If you see any of these signs, take your bird to an avian vet as soon as possible:'] },
            { ul: [
              ['羽毛一直<b>蓬起來</b>', 'Feathers <b>fluffed up</b> all the time'],
              ['<b>睡得比平常多</b>，常常閉著眼睛', '<b>Sleeping more than usual</b>, often with its eyes closed'],
              ['沒精神、對什麼都提不起興趣', 'Listless, not interested in anything'],
              ['<b>叫聲或說話變少</b>，例如早上不叫了', '<b>Calling or talking less</b>, for example no longer calling in the morning'],
              ['站得很低、<b>縮在籠底</b>', 'Sitting low, <b>huddled on the cage floor</b>'],
              ['沒力氣、站不穩', 'Weak and unsteady on its feet'],
              ['<b>呼吸困難</b>：喘、有雜音，或呼吸時尾巴一上一下地擺動', '<b>Difficulty breathing</b>: panting, noisy breathing, or the tail bobbing up and down with each breath'],
              ['<b>便便改變</b>（顏色、形狀、量不一樣）', '<b>Changes in droppings</b> (different color, shape or amount)'],
              ['食慾或喝水量突然變多或變少', 'Appetite or water intake suddenly increasing or decreasing'],
              ['吐出食物', 'Vomiting food']
            ] }
          ] },
        { q: ['為什麼要定期量體重？', 'Why should I weigh my bird regularly?'],
          body: [{ p: ['羽毛很蓬，鳥就算瘦了很多，外表也看不出來。建議買一台<b>以「公克」為單位的電子秤</b>，每週固定時間幫鳥寶量一次，記錄下來。體重持續下降，就是該看醫生的訊號。',
                       'Under all those fluffy feathers, a bird can lose a lot of weight without it showing. Buy a <b>digital scale that measures in grams</b>, weigh your bird at a fixed time each week, and keep a record. A steady drop in weight is a signal to see the vet.'] }] },
        { q: ['等待就醫時可以做什麼？', 'What can I do while waiting to see the vet?'],
          body: [{ ul: [
            ['<b>保暖</b>：讓環境稍微溫暖一點，幫牠省體力。但不要太熱，如果鳥在<b>喘氣或把翅膀張開</b>，代表太熱了。', '<b>Keep it warm</b>: make the surroundings a little warmer to help it save energy. But not too hot; if the bird is <b>panting or holding its wings open</b>, it is too hot.'],
            ['<b>安靜休息</b>：減少打擾，不要讓牠出籠飛來飛去。', '<b>Let it rest quietly</b>: reduce disturbance and do not let it fly around outside the cage.'],
            ['<b>不要自己餵藥或加營養品</b>，交給鳥醫判斷。', '<b>Do not give medicine or supplements yourself</b>; leave that for the avian vet to decide.']
          ] }] }
      ],
      extraDisclaimer: ['鳥寶身體不舒服，請盡快就醫，選擇有<b>鳥類專科</b>的動物醫院。', 'If your bird is unwell, see a vet as soon as possible, and choose an animal hospital with <b>avian specialists</b>.'],
      refs: [
        ref('鳥會隱藏病痛、10 個就醫徵兆', 'Birds hide illness; 10 signs to see a vet', 'msd', 'Illness in Pet Birds', 'https://www.msdvetmanual.com/bird-owners/routine-care-and-breeding-of-birds/signs-of-illness-in-pet-birds'),
        ref('早上不叫、羽毛會掩蓋消瘦、體重的重要性', 'Not calling in the morning, feathers hiding weight loss, the importance of weight', 'msdPro', 'Management of Pet Birds', 'https://www.msdvetmanual.com/exotic-and-laboratory-animals/pet-birds/management-of-pet-birds'),
        ref('保暖、太熱的徵兆、安靜休息', 'Warmth, signs of overheating, quiet rest', 'msd', 'Introduction to Disorders and Diseases of Pet Birds', 'https://www.merckvetmanual.com/bird-owners/disorders-and-diseases-of-birds/introduction-to-disorders-and-diseases-of-pet-birds'),
        ref('不要自行添加營養品', 'Do not add supplements yourself', 'aav', 'Feeding Birds', '')
      ]
    },

    /* ================= 5. 新手問答 ================= */
    {
      id: 'faq',
      title: ['新手問答', 'Beginner Q&A'],
      sub: ['新手最常問的問題', 'Questions beginners ask most'],
      intro: ['問題的挑選：參考網路上新手飼主最常問的題目（例如台灣養鳥文章的常見問題）。答案的內容：只採用獸醫或獸醫組織的資料，並標註來源。', 'How the questions were chosen: based on what new bird keepers most often ask online (for example, the FAQs in Taiwanese bird-keeping articles). Where the answers come from: only information from veterinarians or veterinary organizations, with sources marked.'],
      items: [
        { q: ['選鳥前要先想清楚什麼？', 'What should I think through before choosing a bird?'],
          body: [{ p: ['除了買鳥的錢，還要考慮之後的照顧時間、看醫生的費用、鳥的體型（決定籠子要多大）和叫聲大小。有些鳥非常吵，住在鄰居很近的地方要特別考慮。<span class="rk">〔A〕</span>',
                       'Besides the cost of the bird, consider the time you will spend caring for it, vet fees, the bird’s size (which decides how big the cage must be) and how loud it is. Some birds are very noisy, which matters especially if your neighbors live close by. <span class="rk">[A]</span>'] }] },
        { q: ['新手適合養大型鸚鵡嗎？', 'Are large parrots suitable for beginners?'],
          body: [
            { p: ['中小型的錐尾鸚鵡，以及亞馬遜、灰鸚鵡、金剛、巴丹這類大型鸚鵡，個性鮮明，需要飼主花更多時間和心力滿足牠們的社交和行為需求。也有人建議，想養大型鸚鵡的人，可以先從小一點的鸚鵡開始，熟悉鸚鵡的需求和習性。<span class="rk">〔B〕</span>',
                   'Small to medium conures, and large parrots such as Amazons, African greys, macaws and cockatoos, have strong personalities and need their keepers to spend more time and effort meeting their social and behavioral needs. Some also suggest that people who want a large parrot start with a smaller one to learn about parrots’ needs and habits. <span class="rk">[B]</span>'] },
            { p: ['以上只是建議，不是絕對。適不適合，還是要看您的時間、空間和經驗，歡迎到店和我們聊聊您的狀況。',
                   'This is only a suggestion, not an absolute rule. Whether it suits you depends on your time, space and experience; you are welcome to visit the shop and talk to us about your situation.'] }
          ] },
        { q: ['要買幼鳥嗎？', 'Should I buy a young bird?'],
          body: [{ p: ['已經斷奶、會自己吃東西的年輕鳥，通常很容易親近和訓練。<span class="rk">〔B〕</span>',
                       'A young bird that is already weaned and eats on its own is usually easy to bond with and train. <span class="rk">[B]</span>'] }] },
        { q: ['去哪裡買鳥比較好？', 'Where is the best place to buy a bird?'],
          body: [
            { p: ['找可靠的繁殖場，或專門賣鳥的店家，並確認是人工繁殖、不是從野外抓來的。<span class="rk">〔A〕</span>',
                   'Look for a reliable breeder or a specialist bird shop, and make sure the bird is captive-bred and not caught in the wild. <span class="rk">[A]</span>'] },
            { shop: ['歡迎到店現場看鳥寶，我們會和您一起當面確認鳥的狀態。<span class="rk">〔本店〕</span>',
                     'You are welcome to visit the shop to see the birds, and we will check the bird’s condition together with you in person. <span class="rk">[Our shop]</span>'] }
          ] },
        { q: ['怎麼看鳥健不健康？', 'How can I tell if a bird is healthy?'],
          body: [
            { ul: [
              ['健康的鳥眼睛明亮、有精神、活潑，不會縮成一團或一直把羽毛蓬起來<span class="rk">〔A〕</span>', 'A healthy bird has bright eyes and is alert and active, and does not huddle up or keep its feathers fluffed <span class="rk">[A]</span>'],
              ['看看店家怎麼養：環境要乾淨、籠子寬敞，有新鮮的食物和乾淨的水<span class="rk">〔A〕</span>', 'Look at how the shop keeps its birds: the environment should be clean and the cages roomy, with fresh food and clean water <span class="rk">[A]</span>']
            ] },
            { shop: ['每一隻鳥寶，我們都會在現場和客人一起確認健康狀態；不健康的鳥我們不會提供，除非客人特別指定。<span class="rk">〔本店〕</span>',
                     'For every bird, we check its health together with the customer on the spot. We do not offer unhealthy birds unless the customer specifically asks for one. <span class="rk">[Our shop]</span>'] }
          ] },
        { q: ['買鳥是為了學說話，可以嗎？', 'Can I buy a bird mainly so it will learn to talk?'],
          body: [{ p: ['只因為「會說話」而選鳥不太實際，因為有些鳥怎麼教都不一定會學。<span class="rk">〔B〕</span>',
                       'Choosing a bird only because it “can talk” is not very realistic, because some birds will not necessarily learn no matter how you teach them. <span class="rk">[B]</span>'] }] },
        { q: ['養一隻還是兩隻好？', 'Is it better to keep one bird or two?'],
          body: [{ p: ['有些鳥會非常依賴主人，獨自在家時容易有壓力，要確定你有時間陪牠。<span class="rk">〔B〕</span><br>如果想養兩隻，不是每隻鳥都合得來，同籠可能會打架，要先問鳥醫怎麼讓牠們認識，籠子也要更大。<span class="rk">〔C〕</span>',
                       'Some birds depend heavily on their owners and get stressed when alone at home, so make sure you have time for them. <span class="rk">[B]</span><br>If you want two, not every pair gets along and sharing a cage may lead to fights; ask your avian vet how to introduce them, and the cage must be bigger. <span class="rk">[C]</span>'] }] },
        { q: ['一定要剪羽嗎？', 'Do I have to clip my bird’s wings?'],
          body: [{ p: ['不一定。飛行是鳥的天性，也是很好的運動；如果家裡能提供安全的飛行環境，獸醫不一定建議剪羽。<br>另外要知道，剪羽只是讓鳥比較難飛，<b>不代表完全飛不起來</b>，在家只能滑翔的鳥，到戶外遇到風可能還是會飛走。<span class="rk">〔D〕</span>',
                       'Not necessarily. Flying is natural for birds and great exercise; if your home offers a safe place to fly, vets do not necessarily recommend clipping.<br>Also know that clipping only makes flying harder; it <b>does not mean the bird cannot fly at all</b>. A bird that can only glide indoors may still be carried away by a gust of wind outdoors. <span class="rk">[D]</span>'] }] },
        { q: ['鳥需要曬太陽嗎？', 'Do birds need sunlight?'],
          body: [{ p: ['需要適度接觸紫外線。獸醫組織建議所有寵物鳥都應該接觸一些紫外線，有助於維持骨骼密度、鼓勵運動。<span class="rk">〔E〕</span>',
                       'They need a moderate amount of ultraviolet light. Veterinary organizations recommend that all pet birds get some UV exposure, which helps maintain bone density and encourages activity. <span class="rk">[E]</span>'] }] },
        { q: ['鳥需要洗澡嗎？', 'Do birds need baths?'],
          body: [{ p: ['很多鸚鵡原本生活在潮濕的熱帶地區，在野外常常洗澡；就算是來自乾燥地區的鸚鵡，也喜歡洗澡並從中得到好處。<span class="rk">〔F〕</span>金剛鸚鵡這類大型鳥，建議常常讓牠淋浴。<span class="rk">〔G〕</span>',
                       'Many parrots originally live in humid tropical regions and bathe often in the wild; even parrots from dry regions enjoy bathing and benefit from it. <span class="rk">[F]</span> Large birds such as macaws should be showered often. <span class="rk">[G]</span>'] }] }
      ],
      refs: [
        { plain: ['〔本店〕禾園鳥坊的店內做法，非外部資料', '[Our shop] Hoyuan Birds’ in-shop practice, not external information'] },
        { m: 'A', o: O.msdOwner, t: 'Selecting a Bird', url: 'https://www.msdvetmanual.com/bird-owners/selecting-and-providing-a-home-for-a-pet-bird/selecting-a-bird' },
        { m: 'B', o: O.vetclick, t: 'What You Should Know About Selecting A Bird', url: 'https://www.vetclick.com/news/what-you-should-know-about-selecting-a-bird-p351.php' },
        { m: 'C', o: O.msdOwner, t: 'Providing a Home for a Pet Bird', url: 'https://www.msdvetmanual.com/en-gb/bird-owners/selecting-and-providing-a-home-for-a-pet-bird/providing-a-home-for-a-pet-bird' },
        { m: 'D', o: O.msdPro, t: 'Management of Pet Birds', url: 'https://www.msdvetmanual.com/exotic-and-laboratory-animals/pet-birds/management-of-pet-birds' },
        { m: 'E', o: ['AAV', 'AAV'], t: 'Ultraviolet Lighting for Companion Birds: Benefits & Risks', url: 'https://harrisonsbirdfoods.com/wp-content/uploads/2023/12/aav-uv-light-handout.pdf' },
        { m: 'F', o: O.lafeber, t: 'Teaching Bathing Skills', url: 'https://lafeber.com/vet/species/parrot/page/2/', x: ['衛教單（列於該連結的頁面）', 'client handout (listed on the linked page)'] },
        { m: 'G', o: O.lafeber, t: 'Basic Information Sheet: Macaw', url: 'https://lafeber.com/vet/basic-information-sheet-for-the-macaw/' }
      ]
    }
  ];
})();
