globalThis.HMPlaytestContent = {
  "revision": "playtest2-20261017",
  "bank": {
    "version": "2026-10-17-advanced30",
    "scope": "生物基礎全般。新作。実験値は設問用の仮定。難度は資料読解・比較・短い計算で上げ、専門用語の範囲を広げない。",
    "curriculum_source": "https://www.mext.go.jp/content/20250311-mxt_kyoiku02-100002620_05.pdf",
    "selection": {
      "existing": 5,
      "advanced": 5,
      "area_counts": "3分野から2・2・1問（1問になる分野も周回で変わる）",
      "duplicate_questions": false,
      "shuffle_options": true
    },
    "questions": [
      {
        "id": "adv001",
        "area": "生物の特徴・遺伝子",
        "unit": "細胞",
        "q": "細胞XにはDNAとタンパク質合成の装置があるが、核膜はない。細胞Yには核膜がある。両者の比較として適切なのは？",
        "options": [
          "XもYもDNAの情報を利用してタンパク質をつくる",
          "XだけはDNAを使わずにタンパク質をつくる",
          "Xは核膜がないため細胞とはいえない",
          "Yだけが細胞膜で外界と区切られる"
        ],
        "answer": 0,
        "explain": "核膜の有無と、DNA・細胞膜・タンパク質合成の有無を混同しない。原核細胞にもこれらの共通性がある。",
        "source": "https://openstax.org/books/biology-2e/pages/4-2-prokaryotic-cells",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv002",
        "area": "生物の特徴・遺伝子",
        "unit": "酵素",
        "q": "酵素液Aを20℃、同じ液Bを80℃で10分保ち、両方20℃に戻して同量の基質を加えた。Bだけ反応が著しく弱い。最も適切な説明は？",
        "options": [
          "酵素は反応のたびに同量ずつ消費されるのでBだけ不足した",
          "高温で酵素の立体構造が変化し、冷却しても働きが十分戻らなかった",
          "Bは測定時の温度が低いので反応が弱かった",
          "80℃で基質が全て分解されたので反応が弱かった"
        ],
        "answer": 1,
        "explain": "基質を加えたのは温度を戻した後。温度による反応速度の違いと、高温による酵素の変性を区別する。",
        "source": "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv003",
        "area": "生物の特徴・遺伝子",
        "unit": "酵素の実験",
        "q": "液の総量と温度をそろえ、十分な基質の下で、酵素液1mLの反応開始直後の生成速度は40、0.5mLでは20だった。酵素液1mLで基質だけをさらに増やしても40のままだった。考えやすい律速要因は？",
        "options": [
          "反応で失われた酵素の再合成",
          "酵素液を薄めることで必ず生じる失活",
          "働ける酵素の量",
          "加えた基質の量だけ"
        ],
        "answer": 2,
        "explain": "基質を増やしても速くならず、酵素量を半分にすると速度も半分。開始直後で基質が十分なら、酵素量が制限していると考えられる。",
        "source": "https://openstax.org/books/biology-2e/pages/6-5-enzymes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv004",
        "area": "生物の特徴・遺伝子",
        "unit": "ATP",
        "q": "ある細胞群が保有するATPは2単位だが、1分に100単位を利用している。量がほぼ一定なら、どう説明できる？",
        "options": [
          "最初の2単位だけで、分解せず100単位分の仕事をした",
          "ATPは仕事に使われてもADPなどへ変わらない",
          "ATPの不足分はDNAを直接エネルギーとして使って補う",
          "ADPなどからATPが繰り返し合成され、利用とほぼ釣り合っている"
        ],
        "answer": 3,
        "explain": "ATPの保有量と一定時間の利用量は別。ATPは合成と利用を繰り返すため、少量の存在量でも大きな流量を支えられる。",
        "source": "https://openstax.org/books/biology-2e/pages/6-4-atp-adenosine-triphosphate",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv005",
        "area": "生物の特徴・遺伝子",
        "unit": "光合成と呼吸",
        "q": "同じ水草の酸素変化は暗所で毎分−3、明所で毎分＋5だった。明所でも呼吸の速度が暗所と等しいとすると、明所の光合成による酸素発生は毎分いくつ？",
        "options": [
          "8",
          "2",
          "5",
          "15"
        ],
        "answer": 0,
        "explain": "明所の見かけの増加5＝光合成による発生−呼吸による消費3。したがって発生は8。呼吸が明所で止まるとは考えない。",
        "source": "https://www.mext.go.jp/content/20250311-mxt_kyoiku02-100002620_05.pdf",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv006",
        "area": "生物の特徴・遺伝子",
        "unit": "DNAの塩基組成",
        "q": "ある二本鎖DNA全体でアデニンは22％だった。このDNA全体でシトシンは何％？",
        "options": [
          "56％",
          "28％",
          "22％",
          "44％"
        ],
        "answer": 1,
        "explain": "二本鎖全体ではA=T、G=C。AとTで44％、残り56％をGとCで半分ずつ占める。片方の鎖だけにはこの比率をそのまま使えない。",
        "source": "https://openstax.org/books/biology-2e/pages/14-3-basics-of-dna-replication",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv007",
        "area": "生物の特徴・遺伝子",
        "unit": "DNA複製",
        "q": "重い標識で両鎖を標識したDNAを、軽い材料だけの環境で2回複製した。各DNAの新しい鎖は軽く、元の鎖は保たれる。得られた4本の二本鎖DNAの内訳は？",
        "options": [
          "4本とも重い鎖と軽い鎖の組になる",
          "両鎖とも軽いものが4本になる",
          "重い鎖と軽い鎖の組が2本、両鎖とも軽いものが2本",
          "両鎖とも重いものが1本、両鎖とも軽いものが3本"
        ],
        "answer": 2,
        "explain": "1回目は全て中間の組、2回目は各組が中間1本と軽い1本を生む。元の重い鎖は合計2本のまま。",
        "source": "https://openstax.org/books/biology-2e/pages/14-3-basics-of-dna-replication",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv008",
        "area": "生物の特徴・遺伝子",
        "unit": "細胞周期",
        "q": "同じ個体の体細胞をDNA量で分けると、1細胞当たり2の群、2より多く4未満の群、4の群があった。2より多く4未満の群は主に何をしている？",
        "options": [
          "細胞分裂で娘細胞へDNAを配り終えている",
          "染色体を全て失っている",
          "DNAの情報を読むたびにDNAが倍増している",
          "DNAを複製している"
        ],
        "answer": 3,
        "explain": "分裂前にはDNA量が連続的に増える複製の時期がある。DNA量4の時期と、2から4へ増加途中の時期を区別する。",
        "source": "https://www.mext.go.jp/content/20250311-mxt_kyoiku02-100002620_05.pdf",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv009",
        "area": "生物の特徴・遺伝子",
        "unit": "遺伝情報の発現",
        "q": "あるタンパク質の情報は303塩基分のmRNAで、開始から終止までを含む。3塩基で1組、終止の1組だけはアミノ酸を指定しない。できる鎖のアミノ酸数は？",
        "options": [
          "100個",
          "99個",
          "101個",
          "303個"
        ],
        "answer": 0,
        "explain": "303÷3=101組。そのうち終止の1組はアミノ酸を指定しないので100個。開始の組は最初のアミノ酸を指定する。",
        "source": "https://openstax.org/books/biology-2e/pages/15-1-the-genetic-code",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv010",
        "area": "生物の特徴・遺伝子",
        "unit": "分化と遺伝子",
        "q": "同じ個体の肝臓細胞と神経細胞で、DNAの基本的な情報は共通なのに主につくられるタンパク質が異なった。適切な解釈は？",
        "options": [
          "各細胞が異なる種類の遺伝暗号を使う",
          "働いている遺伝子の組み合わせが異なる",
          "神経細胞はDNAを全て失う",
          "肝臓細胞だけが遺伝情報を利用する"
        ],
        "answer": 1,
        "explain": "共通の遺伝情報を持っていても、発現する遺伝子が違えばつくられるタンパク質や細胞の働きは異なる。",
        "source": "https://openstax.org/books/biology-2e/pages/16-1-regulation-of-gene-expression",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv011",
        "area": "体内環境・免疫",
        "unit": "負のフィードバック",
        "q": "甲状腺ホルモンを投与すると、下垂体の甲状腺刺激ホルモンが減った。甲状腺刺激ホルモンには甲状腺を働かせる作用がある。この関係の説明は？",
        "options": [
          "投与したホルモンは甲状腺刺激ホルモンそのものである",
          "下垂体と甲状腺は互いに情報をやり取りしない",
          "結果が上流の促進を弱め、過剰な産生を抑える",
          "結果が上流の促進を強め、産生をさらに増やす"
        ],
        "answer": 2,
        "explain": "下流のホルモンが上流の刺激を抑える関係は負のフィードバック。増加を際限なく強める正のフィードバックと区別する。",
        "source": "https://openstax.org/books/biology-2e/pages/37-3-regulation-of-body-processes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv012",
        "area": "体内環境・免疫",
        "unit": "ホルモンの標的",
        "q": "同じホルモンを細胞X・Yへ同じ濃度で与えた。Xには対応する受容体があり、Yにはない。Xだけが反応した。何がいえる？",
        "options": [
          "ホルモンはXだけがある場所へ血管を選んで流れる",
          "Yには細胞膜が存在しない",
          "濃度を等しくすると受容体の有無は関係しない",
          "血液で届くことと、細胞が反応できることは別である"
        ],
        "answer": 3,
        "explain": "広く運ばれた情報でも、対応する受容体を持つ細胞が標的になる。到達範囲と作用範囲を混同しない。",
        "source": "https://openstax.org/books/biology-2e/pages/9-1-signaling-molecules-and-cellular-receptors",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv013",
        "area": "体内環境・免疫",
        "unit": "自律神経",
        "q": "心臓への神経Pを刺激すると拍動が増え、Qを刺激すると減った。Qだけの働きを弱めると、同じ条件で拍動は以前より多くなった。最も適切な解釈は？",
        "options": [
          "促進と抑制の釣り合いで拍動が調節される",
          "Qは心臓を直接収縮させる唯一の神経である",
          "PとQは常に同じ方向の働きをする",
          "抑制が弱まると促進側も必ず同じだけ弱まる"
        ],
        "answer": 0,
        "explain": "交感神経と副交感神経のように、逆方向の作用の釣り合いが調節に関わる。抑制が減るだけでも結果は変わる。",
        "source": "https://openstax.org/books/biology-2e/pages/33-3-homeostasis",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv014",
        "area": "体内環境・免疫",
        "unit": "血糖調節",
        "q": "実験動物の食後、血糖とホルモンXが上がり、肝臓のグリコーゲンが増えた。Xの作用として最も整合するのは？",
        "options": [
          "血液中の糖をDNAへ直接変える",
          "細胞への糖の取り込みや貯蔵を促す",
          "肝臓のグリコーゲン分解だけを促す",
          "細胞から血液への糖の放出だけを促す"
        ],
        "answer": 1,
        "explain": "食後の血糖低下へ向かう調節と、グリコーゲンとしての貯蔵が対応する。糖の放出を促す作用なら説明が逆になる。",
        "source": "https://openstax.org/books/biology-2e/pages/37-3-regulation-of-body-processes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv015",
        "area": "体内環境・免疫",
        "unit": "水分調節",
        "q": "水分不足のとき、あるホルモンの濃度上昇とともに尿量が減り、尿が濃くなった。最も整合する働きは？",
        "options": [
          "尿へ捨てる水の量を増やす",
          "体内の水を全て細胞内だけへ閉じ込める",
          "腎臓で水の再吸収を増やす",
          "腎臓で水の再吸収を減らす"
        ],
        "answer": 2,
        "explain": "水を体内へ戻す割合が増えると尿量は減り、溶質に対して水が少ない尿になる。尿量低下を、尿の希薄化と混同しない。",
        "source": "https://openstax.org/books/biology-2e/pages/37-3-regulation-of-body-processes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv016",
        "area": "体内環境・免疫",
        "unit": "腎臓の収支",
        "q": "腎臓の細管に入った液に、ある物質が1時間に100単位含まれ、尿へ出たのは2単位だった。分泌・分解・新生はないとする。体内へ戻った量は？",
        "options": [
          "2単位",
          "50単位",
          "102単位",
          "98単位"
        ],
        "answer": 3,
        "explain": "入った量100＝尿へ出た2＋再吸収された量。体積や濃度だけでなく、物質量の収支から98と求める。",
        "source": "https://openstax.org/books/biology-2e/pages/37-3-regulation-of-body-processes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv017",
        "area": "体内環境・免疫",
        "unit": "免疫記憶",
        "q": "抗原Aを初めて与えた後、Aを再び与えた群では抗体が速く多く増えた。同時期に初めて抗原Bを与えた群では遅かった。適切な説明は？",
        "options": [
          "Aに対応する免疫の記憶が、Aへの反応を強めた",
          "二度目以降は抗原の種類に関係なく同じ速さになる",
          "抗体は全ての抗原に同じ強さで結合する",
          "Bを与えるとAへの免疫記憶は必ず消える"
        ],
        "answer": 0,
        "explain": "二次応答は抗原に特異的な記憶による。同じ個体でも、初めて接する別の抗原には一次応答が起こる。",
        "source": "https://openstax.org/books/biology-2e/pages/42-2-adaptive-immune-response",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv018",
        "area": "体内環境・免疫",
        "unit": "免疫の役割分担",
        "q": "ウイルス感染細胞は残るが、血液中のウイルスに結合する抗体は十分にある。感染細胞自体の除去に特に関わるのは？",
        "options": [
          "抗体が細胞内へ入り、直接すべてのウイルスを分解すること",
          "キラーT細胞などによる細胞性免疫",
          "赤血球による酸素運搬だけ",
          "抗体をつくる細胞が血液中で全ての細胞を食べること"
        ],
        "answer": 1,
        "explain": "抗体による体液性免疫と、感染細胞を標的にする細胞性免疫の分担を考える。抗体が十分でも役割は同一ではない。",
        "source": "https://openstax.org/books/biology-2e/pages/42-2-adaptive-immune-response",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv019",
        "area": "体内環境・免疫",
        "unit": "獲得免疫の実験",
        "q": "抗原Xに対する抗体を含む血清を、未経験の個体へ移した。直後にはXへの抵抗性が増したが、移した抗体は後に減った。この結果だけからいえるのは？",
        "options": [
          "受け手が自分で同じ抗体を大量に産生したと証明された",
          "X以外の全ての抗原にも永続的な防御ができた",
          "抗体が一時的な防御を担える",
          "受け手にXへの免疫記憶が必ずできた"
        ],
        "answer": 2,
        "explain": "抗体の移入で得られる一時的防御と、受け手自身の記憶細胞の形成は別。血清移入の結果だけで記憶の獲得は証明できない。",
        "source": "https://openstax.org/books/biology-2e/pages/42-2-adaptive-immune-response",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv020",
        "area": "体内環境・免疫",
        "unit": "体温調節",
        "q": "暑い環境へ移した後、体温が上がりかけたが、皮膚の血流と発汗が増えて上昇が抑えられた。この結果の解釈は？",
        "options": [
          "外界の温度変化が体内へ全く伝わらなかった",
          "恒常性とは体温が一瞬も変化しないことである",
          "発汗の主な目的は体内で熱を増産することである",
          "体温のずれに対する調節が働いた"
        ],
        "answer": 3,
        "explain": "恒常性は変化を感知して範囲内へ戻す動的な調節であり、外界の変化や一時的なずれが全くないことではない。",
        "source": "https://openstax.org/books/biology-2e/pages/33-3-homeostasis",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv021",
        "area": "生態系・生物多様性",
        "unit": "光と植生",
        "q": "植物Xは弱い光で酸素の収支が0となり、Yはそれより強い光で0となった。他条件が等しいとき、林床の弱い光への適応を説明しやすいのは？",
        "options": [
          "Xはより弱い光でも光合成と呼吸の収支が釣り合う",
          "Xは暗闇でも呼吸せず光合成だけ行う",
          "Yは強い光を必要とするので必ず林床で有利になる",
          "収支0の光では両方とも光合成をしていない"
        ],
        "answer": 0,
        "explain": "収支0は光合成と呼吸が釣り合う点。光合成がない点ではない。より低い光で釣り合う植物は弱光条件に対応しやすい。",
        "source": "https://openstax.org/books/biology-2e/pages/45-6-community-ecology",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv022",
        "area": "生態系・生物多様性",
        "unit": "遷移",
        "q": "裸地から調べた地点では、先に草本が増え、後に土壌が厚くなり、樹木が増えた。説明として適切なのは？",
        "options": [
          "どんな場所でも同じ年数で同じ森林へ変わる",
          "生物による環境の変化が、後から入る生物の条件にも影響する",
          "遷移中は土壌などの環境が変わらない",
          "後から入る植物は先にいた植物と必ず同じ性質である"
        ],
        "answer": 1,
        "explain": "遷移では生物と環境が相互に影響する。経路や速さは気候や土壌などにも左右され、一律ではない。",
        "source": "https://openstax.org/books/biology-2e/pages/45-6-community-ecology",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv023",
        "area": "生態系・生物多様性",
        "unit": "バイオーム",
        "q": "地域AとBは年平均気温が等しく、Aは多雨、Bは少雨だった。植生が違う理由を調べる際、最も適切な考え方は？",
        "options": [
          "降水量は動物にしか影響しない",
          "植物は土壌や降水の影響を受けず光だけで決まる",
          "気温だけでなく水分条件も植物の生育を制限する",
          "平均気温が等しければ必ず同じ森林になる"
        ],
        "answer": 2,
        "explain": "バイオームの成立には気温と降水量などが関わる。平均気温という一つの条件が同じでも、水分条件によって植生は異なり得る。",
        "source": "https://openstax.org/books/biology-2e/pages/44-3-terrestrial-biomes",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv024",
        "area": "生態系・生物多様性",
        "unit": "エネルギー収支",
        "q": "ある草地の植物は1年に光合成で2100単位を取り込み、呼吸で1500単位を使った。残った分の10％が草食動物の新しい体として蓄えられた。蓄積量は？",
        "options": [
          "150単位",
          "210単位",
          "600単位",
          "60単位"
        ],
        "answer": 3,
        "explain": "植物の純生産量は2100−1500=600。その10％なので60。総生産量と純生産量を区別してから計算する。",
        "source": "https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv025",
        "area": "生態系・生物多様性",
        "unit": "分解者",
        "q": "落ち葉と土を入れた容器でCO₂が増えた。微生物の働きを止めた比較容器では増加が小さかった。示唆されるのは？",
        "options": [
          "分解者の呼吸で有機物の炭素がCO₂へ移る",
          "落ち葉の炭素は分解しても形を変えない",
          "分解者は呼吸せずエネルギーを必要としない",
          "CO₂増加は分解者が光合成した証拠である"
        ],
        "answer": 0,
        "explain": "落ち葉の有機物を利用する分解者も呼吸する。炭素は有機物からCO₂へ移り、物質循環の一部を担う。",
        "source": "https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv026",
        "area": "生態系・生物多様性",
        "unit": "窒素循環",
        "q": "植物のない土壌で、アンモニウムが減り、硝酸が増えた。これら以外との出入りがないとして、正しい説明は？",
        "options": [
          "硝酸が増えた分だけ、窒素が無から生まれた",
          "窒素を含む物質の形が変わった",
          "窒素という元素そのものが酸素へ変わった",
          "空気中の窒素が全て植物へ取り込まれた"
        ],
        "answer": 1,
        "explain": "生態系の循環では物質の形は変わっても元素は保存される。植物の有無と、微生物を介した化学形の変換を区別する。",
        "source": "https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv027",
        "area": "生態系・生物多様性",
        "unit": "食物網",
        "q": "水草→小型動物→魚という関係だけを考える。魚を減らした直後、小型動物が増え、水草が減った。最も整合する説明は？",
        "options": [
          "魚が減ると小型動物の食物も必ず減る",
          "食物網では一種の変化が他種へ影響することはない",
          "捕食の減少が小型動物を増やし、水草への食圧が強まった",
          "魚が水草を直接大量に食べるようになった"
        ],
        "answer": 2,
        "explain": "魚から小型動物への捕食圧が下がり、水草への食圧が上がる間接効果。設問で示した関係と期間の範囲で考える。",
        "source": "https://openstax.org/books/biology-2e/pages/45-6-community-ecology",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv028",
        "area": "生態系・生物多様性",
        "unit": "多様性の見方",
        "q": "群集Aは4種が25個体ずつ、Bは4種が97・1・1・1個体だった。比較として確実に正しいのは？",
        "options": [
          "Bの方が種数が多い",
          "AとBは個体数の内訳まで同じである",
          "総個体数が同じなら群集の構成は区別できない",
          "種数は同じだが、個体数の偏りはBの方が大きい"
        ],
        "answer": 3,
        "explain": "両者とも4種100個体。しかし各種の個体数の分布は異なる。多様性を考える際、種数だけでは捉えきれない違いがある。",
        "source": "https://openstax.org/books/biology-2e/pages/47-3-threats-to-biodiversity",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv029",
        "area": "生態系・生物多様性",
        "unit": "外来生物と実験",
        "q": "同じ条件の複数の水槽を無作為に2群に分け、一方だけに外来の捕食者を入れた。後者でのみ在来種が減った。次の解釈は？",
        "options": [
          "この実験条件では外来捕食者の導入が減少に関わったと考えられる",
          "全ての外来種が全ての場所で同じ影響を与えると証明された",
          "在来種は外来種がいなくても全滅することが証明された",
          "無作為に分けた実験では原因を検討できない"
        ],
        "answer": 0,
        "explain": "比較条件と繰り返しから導入の影響を検討できる。ただし一つの条件の結果を、全ての外来種や環境へ一般化しない。",
        "source": "https://openstax.org/books/biology-2e/pages/47-3-threats-to-biodiversity",
        "difficulty": "advanced",
        "original": true
      },
      {
        "id": "adv030",
        "area": "生態系・生物多様性",
        "unit": "生息地の保全",
        "q": "分断された林を緑の通路で結ぶと、調査対象の動物が林の間を移動する回数が増えた。この結果が直接支持するのは？",
        "options": [
          "通路がなくても移動回数は同じだと証明された",
          "通路がこの動物の生息地間の移動を助けた",
          "周辺の全ての種の絶滅リスクが0になった",
          "その動物の個体数が必ず倍増した"
        ],
        "answer": 1,
        "explain": "観察されたのは対象動物の移動の増加。個体数や全生物の絶滅リスクまで、測っていない結果を断定しない。",
        "source": "https://openstax.org/books/biology-2e/pages/47-3-threats-to-biodiversity",
        "difficulty": "advanced",
        "original": true
      }
    ]
  },
  "holiday": {
    "activity_slots": 2,
    "night_contact_slots": 1,
    "dates_per_day": 1,
    "incoming_f": 50,
    "incoming_t": 25,
    "incoming_limit": 2
  },
  "closed_choices": {
    "ins": {
      "prompt": "澄の緊張をほぐしながら待つには？",
      "kind": "care",
      "options": [
        {
          "label": "あめを一つ受け取り、残りは澄の分にしておく",
          "response": [
            {
              "who": "insulin",
              "text": "はい、半分ずつ。……一緒に待つって、こういう感じですね。",
              "expr": "happy"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "kiku": 1
          }
        },
        {
          "label": "窓の近くで外の足音を聞き、澄に知らせる",
          "response": [
            {
              "who": "insulin",
              "text": "足音、聞こえますか？　わたし、ここで待っていますね。",
              "expr": "trust"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "rika": 1
          }
        },
        {
          "label": "座れる場所を整え、落ち着いて話しかける",
          "response": [
            {
              "who": "insulin",
              "text": "ありがとうございます。……少し、肩の力が抜けました。",
              "expr": "blush",
              "act": "shy-side"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "gei": 1
          }
        }
      ]
    },
    "glu": {
      "prompt": "蓄と、どんなふうに時間をつなぐ？",
      "kind": "care",
      "options": [
        {
          "label": "楽に座れる場所を見つけ、隣で待つ",
          "response": [
            {
              "who": "glucagon",
              "text": "……うん。今は、むだに動かない。……隣、空いてる。",
              "expr": "blush",
              "act": "shy-side"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "kiku": 1
          }
        },
        {
          "label": "外へ声をかける間隔を決め、交代する",
          "response": [
            {
              "who": "glucagon",
              "text": "交代なら、もつ。……じゃ、次はこっちの番。",
              "expr": "trust"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "tai": 1
          }
        },
        {
          "label": "帰ったら何を食べるか、二人で考える",
          "response": [
            {
              "who": "glucagon",
              "text": "……それ、余計に腹減る。でも、続きは聞く。",
              "expr": "playful"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "ryo": 1
          }
        }
      ]
    },
    "adr": {
      "prompt": "息を切らした瞬に、どう寄り添う？",
      "kind": "care",
      "options": [
        {
          "label": "同じ速さでゆっくり息を吐き、落ち着くのを待つ",
          "response": [
            {
              "who": "adrenaline",
              "text": "……ふう。……きみが隣で待ってくれると、少し戻れる。",
              "expr": "trust"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "kiku": 1
          }
        },
        {
          "label": "誰かが通る音を一緒に聞き、合図のタイミングを決める",
          "response": [
            {
              "who": "adrenaline",
              "text": "ずっと叩くより、通ったときに一回。……うん、できそう。",
              "expr": "neutral"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "rika": 1
          }
        },
        {
          "label": "次の劇の話で、気持ちを別のところへ向ける",
          "response": [
            {
              "who": "adrenaline",
              "text": "今それ聞く？　……でも、その場面、ちょっと好き。",
              "expr": "happy"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "gei": 1
          }
        }
      ]
    },
    "thy": {
      "prompt": "冷えてきた倉庫で、燈とどう過ごす？",
      "kind": "care",
      "options": [
        {
          "label": "風の入る隙間から離れ、並んで座る",
          "response": [
            {
              "who": "thyroxine",
              "text": "……うん。逃げる熱も、少なくしておこう。……こっち。",
              "expr": "blush",
              "act": "shy-side"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "kiku": 1
          }
        },
        {
          "label": "帰るまでの段取りを、短く二人で確かめる",
          "response": [
            {
              "who": "thyroxine",
              "text": "……慌てず、一つずつ。……それなら、もつ。",
              "expr": "trust"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "gaku": 1
          }
        },
        {
          "label": "窓から見える夕日の色を、言葉にして伝える",
          "response": [
            {
              "who": "thyroxine",
              "text": "……そんな色にも、見えるんだ。……もう少し、聞かせて。",
              "expr": "happy"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "gei": 1
          }
        }
      ]
    },
    "cor": {
      "prompt": "予定にない四十分を、備とどう使う？",
      "kind": "care",
      "options": [
        {
          "label": "まず休む時間にして、見回りの時刻だけ確かめる",
          "response": [
            {
              "who": "cortisol",
              "text": "……そうしよう。休む時間まで、予定で埋めなくていいね。",
              "expr": "blush",
              "act": "shy-side"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "kiku": 1
          }
        },
        {
          "label": "安全な出口と連絡手段を、一緒に確認する",
          "response": [
            {
              "who": "cortisol",
              "text": "確認できたら、待とう。……一人で全部調べなくていいの、助かる。",
              "expr": "trust"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "rika": 1
          }
        },
        {
          "label": "明日の予定から、減らせる仕事を一つ探す",
          "response": [
            {
              "who": "cortisol",
              "text": "増やす話かと思った。減らす方なんだ。……それ、いいね。",
              "expr": "happy"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "gaku": 1
          }
        }
      ]
    },
    "adh": {
      "prompt": "残り半分の水を、水守とどう分ける？",
      "kind": "care",
      "options": [
        {
          "label": "水守の分も残し、二人ののどの渇きを確かめる",
          "response": [
            {
              "who": "adh",
              "text": "……二人の分、なんだね。……じゃあ、一緒に。",
              "expr": "blush",
              "act": "shy-side"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "kiku": 1
          }
        },
        {
          "label": "暑くならない場所へ移り、体力を温存する",
          "response": [
            {
              "who": "adh",
              "text": "……汗で出る分も、少なくできる。……そこ、座ろう。",
              "expr": "trust"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "rika": 1
          }
        },
        {
          "label": "ふたを返し、外に人が来るまで交代で様子を見る",
          "response": [
            {
              "who": "adh",
              "text": "……ずっと気を張らなくていいね。……次、見てる。",
              "expr": "happy"
            }
          ],
          "effects": {
            "f": 2,
            "t": 1,
            "tai": 1
          }
        }
      ]
    }
  },
  "trio_scenes": [
    {
      "id": "outing_trio_ins",
      "title": "三人で、少し寄り道",
      "day": "holiday",
      "date": "",
      "place": "keep",
      "time": "休日",
      "bgm": "date",
      "cast": [
        "insulin",
        "redcell"
      ],
      "char": "ins",
      "lines": [
        {
          "who": "narr",
          "text": "赤路に声をかけてもらい、澄と三人で{spot}へ出かけた。",
          "expr": "neutral"
        },
        {
          "who": "redcell",
          "text": "最初から気合い入れなくていいって。今日は三人で、気楽に行こう。",
          "expr": "neutral"
        },
        {
          "who": "insulin",
          "text": "みんなで来ると、分けっこできるものも増えますね。",
          "expr": "happy"
        }
      ],
      "choices": [
        {
          "prompt": "三人で、どう過ごそう？",
          "kind": "outing",
          "options": [
            {
              "label": "気になったものを順番に紹介し合う",
              "response": [
                {
                  "who": "insulin",
                  "text": "それ、気づかなかった。……次は、こっちの番。",
                  "expr": "happy"
                }
              ],
              "effects": {
                "f": 3,
                "gei": 1
              }
            },
            {
              "label": "少し休んで、お互いの近況を聞く",
              "response": [
                {
                  "who": "insulin",
                  "text": "……聞いてくれるだけで、話しやすい。",
                  "expr": "trust"
                }
              ],
              "effects": {
                "f": 3,
                "kiku": 1
              }
            },
            {
              "label": "帰りの時間を確かめ、もう一か所だけ回る",
              "response": [
                {
                  "who": "insulin",
                  "text": "そのくらいなら、ちょうどいいね。",
                  "expr": "neutral"
                }
              ],
              "effects": {
                "f": 3,
                "gaku": 1
              }
            }
          ]
        }
      ],
      "after": [
        {
          "who": "redcell",
          "text": "よし、今日はここまで。また三人でも来よう。",
          "expr": "neutral"
        }
      ],
      "clues": [],
      "goto": {
        "type": "next",
        "id": "DAY"
      }
    },
    {
      "id": "outing_trio_glu",
      "title": "三人で、少し寄り道",
      "day": "holiday",
      "date": "",
      "place": "keep",
      "time": "休日",
      "bgm": "date",
      "cast": [
        "glucagon",
        "redcell"
      ],
      "char": "glu",
      "lines": [
        {
          "who": "narr",
          "text": "赤路に声をかけてもらい、蓄と三人で{spot}へ出かけた。",
          "expr": "neutral"
        },
        {
          "who": "redcell",
          "text": "最初から気合い入れなくていいって。今日は三人で、気楽に行こう。",
          "expr": "neutral"
        },
        {
          "who": "glucagon",
          "text": "……三人なら、まあ。気楽なのは、助かる。",
          "expr": "happy"
        }
      ],
      "choices": [
        {
          "prompt": "三人で、どう過ごそう？",
          "kind": "outing",
          "options": [
            {
              "label": "気になったものを順番に紹介し合う",
              "response": [
                {
                  "who": "glucagon",
                  "text": "それ、気づかなかった。……次は、こっちの番。",
                  "expr": "happy"
                }
              ],
              "effects": {
                "f": 3,
                "gei": 1
              }
            },
            {
              "label": "少し休んで、お互いの近況を聞く",
              "response": [
                {
                  "who": "glucagon",
                  "text": "……聞いてくれるだけで、話しやすい。",
                  "expr": "trust"
                }
              ],
              "effects": {
                "f": 3,
                "kiku": 1
              }
            },
            {
              "label": "帰りの時間を確かめ、もう一か所だけ回る",
              "response": [
                {
                  "who": "glucagon",
                  "text": "そのくらいなら、ちょうどいいね。",
                  "expr": "neutral"
                }
              ],
              "effects": {
                "f": 3,
                "gaku": 1
              }
            }
          ]
        }
      ],
      "after": [
        {
          "who": "redcell",
          "text": "よし、今日はここまで。また三人でも来よう。",
          "expr": "neutral"
        }
      ],
      "clues": [],
      "goto": {
        "type": "next",
        "id": "DAY"
      }
    },
    {
      "id": "outing_trio_adr",
      "title": "三人で、少し寄り道",
      "day": "holiday",
      "date": "",
      "place": "keep",
      "time": "休日",
      "bgm": "date",
      "cast": [
        "adrenaline",
        "redcell"
      ],
      "char": "adr",
      "lines": [
        {
          "who": "narr",
          "text": "赤路に声をかけてもらい、瞬と三人で{spot}へ出かけた。",
          "expr": "neutral"
        },
        {
          "who": "redcell",
          "text": "最初から気合い入れなくていいって。今日は三人で、気楽に行こう。",
          "expr": "neutral"
        },
        {
          "who": "adrenaline",
          "text": "三人そろった！　じゃあ、最初は何から行く？",
          "expr": "happy"
        }
      ],
      "choices": [
        {
          "prompt": "三人で、どう過ごそう？",
          "kind": "outing",
          "options": [
            {
              "label": "気になったものを順番に紹介し合う",
              "response": [
                {
                  "who": "adrenaline",
                  "text": "それ、気づかなかった。……次は、こっちの番。",
                  "expr": "happy"
                }
              ],
              "effects": {
                "f": 3,
                "gei": 1
              }
            },
            {
              "label": "少し休んで、お互いの近況を聞く",
              "response": [
                {
                  "who": "adrenaline",
                  "text": "……聞いてくれるだけで、話しやすい。",
                  "expr": "trust"
                }
              ],
              "effects": {
                "f": 3,
                "kiku": 1
              }
            },
            {
              "label": "帰りの時間を確かめ、もう一か所だけ回る",
              "response": [
                {
                  "who": "adrenaline",
                  "text": "そのくらいなら、ちょうどいいね。",
                  "expr": "neutral"
                }
              ],
              "effects": {
                "f": 3,
                "gaku": 1
              }
            }
          ]
        }
      ],
      "after": [
        {
          "who": "redcell",
          "text": "よし、今日はここまで。また三人でも来よう。",
          "expr": "neutral"
        }
      ],
      "clues": [],
      "goto": {
        "type": "next",
        "id": "DAY"
      }
    },
    {
      "id": "outing_trio_thy",
      "title": "三人で、少し寄り道",
      "day": "holiday",
      "date": "",
      "place": "keep",
      "time": "休日",
      "bgm": "date",
      "cast": [
        "thyroxine",
        "redcell"
      ],
      "char": "thy",
      "lines": [
        {
          "who": "narr",
          "text": "赤路に声をかけてもらい、燈と三人で{spot}へ出かけた。",
          "expr": "neutral"
        },
        {
          "who": "redcell",
          "text": "最初から気合い入れなくていいって。今日は三人で、気楽に行こう。",
          "expr": "neutral"
        },
        {
          "who": "thyroxine",
          "text": "……今日は、ゆっくり見て回れる。",
          "expr": "happy"
        }
      ],
      "choices": [
        {
          "prompt": "三人で、どう過ごそう？",
          "kind": "outing",
          "options": [
            {
              "label": "気になったものを順番に紹介し合う",
              "response": [
                {
                  "who": "thyroxine",
                  "text": "それ、気づかなかった。……次は、こっちの番。",
                  "expr": "happy"
                }
              ],
              "effects": {
                "f": 3,
                "gei": 1
              }
            },
            {
              "label": "少し休んで、お互いの近況を聞く",
              "response": [
                {
                  "who": "thyroxine",
                  "text": "……聞いてくれるだけで、話しやすい。",
                  "expr": "trust"
                }
              ],
              "effects": {
                "f": 3,
                "kiku": 1
              }
            },
            {
              "label": "帰りの時間を確かめ、もう一か所だけ回る",
              "response": [
                {
                  "who": "thyroxine",
                  "text": "そのくらいなら、ちょうどいいね。",
                  "expr": "neutral"
                }
              ],
              "effects": {
                "f": 3,
                "gaku": 1
              }
            }
          ]
        }
      ],
      "after": [
        {
          "who": "redcell",
          "text": "よし、今日はここまで。また三人でも来よう。",
          "expr": "neutral"
        }
      ],
      "clues": [],
      "goto": {
        "type": "next",
        "id": "DAY"
      }
    },
    {
      "id": "outing_trio_cor",
      "title": "三人で、少し寄り道",
      "day": "holiday",
      "date": "",
      "place": "keep",
      "time": "休日",
      "bgm": "date",
      "cast": [
        "cortisol",
        "redcell"
      ],
      "char": "cor",
      "lines": [
        {
          "who": "narr",
          "text": "赤路に声をかけてもらい、備と三人で{spot}へ出かけた。",
          "expr": "neutral"
        },
        {
          "who": "redcell",
          "text": "最初から気合い入れなくていいって。今日は三人で、気楽に行こう。",
          "expr": "neutral"
        },
        {
          "who": "cortisol",
          "text": "決めてきた予定はあるけど、変えても大丈夫だよ。",
          "expr": "happy"
        }
      ],
      "choices": [
        {
          "prompt": "三人で、どう過ごそう？",
          "kind": "outing",
          "options": [
            {
              "label": "気になったものを順番に紹介し合う",
              "response": [
                {
                  "who": "cortisol",
                  "text": "それ、気づかなかった。……次は、こっちの番。",
                  "expr": "happy"
                }
              ],
              "effects": {
                "f": 3,
                "gei": 1
              }
            },
            {
              "label": "少し休んで、お互いの近況を聞く",
              "response": [
                {
                  "who": "cortisol",
                  "text": "……聞いてくれるだけで、話しやすい。",
                  "expr": "trust"
                }
              ],
              "effects": {
                "f": 3,
                "kiku": 1
              }
            },
            {
              "label": "帰りの時間を確かめ、もう一か所だけ回る",
              "response": [
                {
                  "who": "cortisol",
                  "text": "そのくらいなら、ちょうどいいね。",
                  "expr": "neutral"
                }
              ],
              "effects": {
                "f": 3,
                "gaku": 1
              }
            }
          ]
        }
      ],
      "after": [
        {
          "who": "redcell",
          "text": "よし、今日はここまで。また三人でも来よう。",
          "expr": "neutral"
        }
      ],
      "clues": [],
      "goto": {
        "type": "next",
        "id": "DAY"
      }
    },
    {
      "id": "outing_trio_adh",
      "title": "三人で、少し寄り道",
      "day": "holiday",
      "date": "",
      "place": "keep",
      "time": "休日",
      "bgm": "date",
      "cast": [
        "adh",
        "redcell"
      ],
      "char": "adh",
      "lines": [
        {
          "who": "narr",
          "text": "赤路に声をかけてもらい、水守と三人で{spot}へ出かけた。",
          "expr": "neutral"
        },
        {
          "who": "redcell",
          "text": "最初から気合い入れなくていいって。今日は三人で、気楽に行こう。",
          "expr": "neutral"
        },
        {
          "who": "adh",
          "text": "……一人ずつ、違うところを見てる。……おもしろいね。",
          "expr": "happy"
        }
      ],
      "choices": [
        {
          "prompt": "三人で、どう過ごそう？",
          "kind": "outing",
          "options": [
            {
              "label": "気になったものを順番に紹介し合う",
              "response": [
                {
                  "who": "adh",
                  "text": "それ、気づかなかった。……次は、こっちの番。",
                  "expr": "happy"
                }
              ],
              "effects": {
                "f": 3,
                "gei": 1
              }
            },
            {
              "label": "少し休んで、お互いの近況を聞く",
              "response": [
                {
                  "who": "adh",
                  "text": "……聞いてくれるだけで、話しやすい。",
                  "expr": "trust"
                }
              ],
              "effects": {
                "f": 3,
                "kiku": 1
              }
            },
            {
              "label": "帰りの時間を確かめ、もう一か所だけ回る",
              "response": [
                {
                  "who": "adh",
                  "text": "そのくらいなら、ちょうどいいね。",
                  "expr": "neutral"
                }
              ],
              "effects": {
                "f": 3,
                "gaku": 1
              }
            }
          ]
        }
      ],
      "after": [
        {
          "who": "redcell",
          "text": "よし、今日はここまで。また三人でも来よう。",
          "expr": "neutral"
        }
      ],
      "clues": [],
      "goto": {
        "type": "next",
        "id": "DAY"
      }
    }
  ],
  "crisis": {
    "ins": {
      "opening": [
        {
          "who": "insulin",
          "text": "廊下の箱、さっきから減り方を見ています。多いのか、もう足りたのか。そこから決めましょう。",
          "expr": "worried"
        }
      ],
      "states": [
        {
          "evidence": "箱の数は増加中。受け取り先の空きはあり、食べ歩きの列からも新しい箱が届いている。",
          "q": {
            "prompt": "澄に、どこまで片付けてもらう？",
            "kind": "message",
            "options": [
              {
                "label": "部室と倉庫への受け取りを進め、残量を確かめる",
                "response": [
                  {
                    "who": "insulin",
                    "text": "はい。行き先を確かめて、受け取りを進めます。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "新しい箱を止めるまで、受け取りをいったん止める",
                "response": [
                  {
                    "who": "insulin",
                    "text": "入ってくる分を減らすのも大事。でも、今ある分の受け取りは続けられます。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "不足に備え、蓄にも倉庫を開けておいてもらう",
                "response": [
                  {
                    "who": "insulin",
                    "text": "増えている間は、倉庫から出すと逆なんです。まず届いた分を受け取ります。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        },
        {
          "evidence": "箱の数はすでに平常範囲。食べ歩きの列も解散し、新しく届く量は落ち着いた。",
          "q": {
            "prompt": "同じ勢いで続けるか、澄にどう伝える？",
            "kind": "message",
            "options": [
              {
                "label": "箱がもっと少なくなるまで、同じ速さを続ける",
                "response": [
                  {
                    "who": "insulin",
                    "text": "少なければよい、ではないんです。足りたところで緩めますね。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "平常に戻ったと伝え、片付けの強さを戻す",
                "response": [
                  {
                    "who": "insulin",
                    "text": "はい、ここまで。……見ていてくれて、助かりました。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "次の食事に備え、今ある箱も全部しまう",
                "response": [
                  {
                    "who": "insulin",
                    "text": "次に備えることと、今の分を減らしすぎることは別なんです。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        }
      ],
      "second": {
        "prompt": "箱はあるのに、ある部室だけ受け取らない。次に確かめるのは？",
        "kind": "message",
        "options": [
          {
            "label": "澄が運ぶ量だけを増やす",
            "response": [
              {
                "who": "insulin",
                "text": "届ける量だけでなく、受け取る側も見たいです。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "その部室の受け取り口が働いているか",
            "response": [
              {
                "who": "insulin",
                "text": "そうです。届いた合図を受け取れなければ、同じようには動けません。",
                "expr": "trust",
                "act": "look-up"
              }
            ],
            "effects": {
              "f": 2,
              "t": 2,
              "u": 1,
              "rika": 1
            }
          },
          {
            "label": "蓄に同じ部室への箱をもっと出してもらう",
            "response": [
              {
                "who": "insulin",
                "text": "箱を増やす前に、受け取れない理由を確かめましょう。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          }
        ]
      },
      "closing": "……先生だけじゃなくて、あなたも見ていてくれたから。次も、一緒に確かめたいです。"
    },
    "glu": {
      "opening": [
        {
          "who": "glucagon",
          "text": "列をさばいて、食べるのを忘れてた。……倉庫の記録、見て。今、出す番かどうか。",
          "expr": "worried"
        }
      ],
      "states": [
        {
          "evidence": "廊下の箱は不足。肝臓に当たる倉庫にはまだ蓄えがある。",
          "q": {
            "prompt": "まず、蓄とどの手を打つ？",
            "kind": "message",
            "options": [
              {
                "label": "蓄えを使い切るまで、一度に全部出す",
                "response": [
                  {
                    "who": "glucagon",
                    "text": "いま要る分から出す。全部出して、後をなくすのも違う。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "備の長期の手配が終わるまで、供給を待つ",
                "response": [
                  {
                    "who": "glucagon",
                    "text": "長い先の準備は頼む。でも、今の不足には倉庫から出せる。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "倉庫の蓄えを使い、不足を埋めながら推移を見る",
                "response": [
                  {
                    "who": "glucagon",
                    "text": "……うん。今は、出す番。足りたら、止める。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              }
            ]
          }
        },
        {
          "evidence": "廊下の箱は平常に戻った。倉庫からの追加が続けば、今度は多くなりそうだ。",
          "q": {
            "prompt": "回復の報告を受け、蓄へ何と伝える？",
            "kind": "message",
            "options": [
              {
                "label": "追加の供給を緩め、次の推移を見よう",
                "response": [
                  {
                    "who": "glucagon",
                    "text": "……了解。ずっと出し続けるのが、仕事じゃない。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "備に引き継ぐまで、同じ量を出し続けよう",
                "response": [
                  {
                    "who": "glucagon",
                    "text": "今は足りてる。引き継ぎのために増やしすぎなくていい。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "澄の片付けも増やし、倉庫は開け続けよう",
                "response": [
                  {
                    "who": "glucagon",
                    "text": "出す量と片付ける量を、両方わざわざ増やす必要はないだろ。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        }
      ],
      "second": {
        "prompt": "倉庫の蓄えが少なくなってきた。次の見通しは？",
        "kind": "message",
        "options": [
          {
            "label": "筋肉の倉庫から、そのまま血糖用の糖を出す",
            "response": [
              {
                "who": "glucagon",
                "text": "筋肉の蓄えは、基本的に筋肉が使う分。血中へ出す倉庫と同じじゃない。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "同じ倉庫を開け続ければ、量は増える",
            "response": [
              {
                "who": "glucagon",
                "text": "扉を開けても、蓄え自体は増えない。次の作り方が要る。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "備に長く供給を支える手配を頼む",
            "response": [
              {
                "who": "glucagon",
                "text": "……それなら、先につながる。こっちの在庫と、向こうの準備。両方伝える。",
                "expr": "trust",
                "act": "look-up"
              }
            ],
            "effects": {
              "f": 2,
              "t": 2,
              "u": 1,
              "rika": 1
            }
          }
        ]
      },
      "closing": "……足りたって言っても、置いていかないんだな。そういうところ、見てた。"
    },
    "adr": {
      "opening": [
        {
          "who": "adrenaline",
          "text": "先生の声が止まった。でも、まず何を急ぐか、見れば動ける。きみ、確認を頼む！",
          "expr": "surprised"
        }
      ],
      "states": [
        {
          "evidence": "混雑で通路の誘導が止まった。すぐ動ける係が近くにいるが、放送の連絡が届いていない。",
          "q": {
            "prompt": "最初の連絡は、どの道で送る？",
            "kind": "message",
            "options": [
              {
                "label": "放送で近くの係へ、短い指示を直接送る",
                "response": [
                  {
                    "who": "adrenaline",
                    "text": "了解！　近くにいる人から動いて！",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "前の段から刺激の呼び出し状を順番に回す",
                "response": [
                  {
                    "who": "adrenaline",
                    "text": "その道もあるけど、今すぐの連絡は放送から送れる。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "奥の段に放送内容を書いて、本人の手紙として出す",
                "response": [
                  {
                    "who": "adrenaline",
                    "text": "奥の段は、先生が作った別の手紙の道。放送の代わりにはしない。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        },
        {
          "evidence": "通路の混雑は解けた。誘導係はすでに配置につき、呼びかけを続けると人が余計に集まりそうだ。",
          "q": {
            "prompt": "瞬の呼びかけを、どう切り替える？",
            "kind": "message",
            "options": [
              {
                "label": "再び混む前に、同じ緊急放送を繰り返す",
                "response": [
                  {
                    "who": "adrenaline",
                    "text": "ずっと非常ベルだと、集まる方も落ち着けないね。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "誘導が整ったと伝え、通常の案内に戻す",
                "response": [
                  {
                    "who": "adrenaline",
                    "text": "……よし、戻そう。止まる合図も、ちゃんと聞けた。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "長く支える係が来るまで、誘導係をさらに呼ぶ",
                "response": [
                  {
                    "who": "adrenaline",
                    "text": "今いる人数で足りたんだよね。引き継ぎは、増員とは別に伝えよう。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        }
      ],
      "second": {
        "prompt": "落ち着いた後も、強い緊張が続いている。次は？",
        "kind": "message",
        "options": [
          {
            "label": "瞬だけに、最初と同じ強さで走ってもらう",
            "response": [
              {
                "who": "adrenaline",
                "text": "速い対応の後まで、ずっと全力だと、もたない。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "全ての連絡を止め、状況確認も終える",
            "response": [
              {
                "who": "adrenaline",
                "text": "止めるのは強すぎる合図。確認までなくすのは困るよ。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "備へ長く支える段取りを渡し、瞬は必要時の連絡へ戻す",
            "response": [
              {
                "who": "adrenaline",
                "text": "うん。速い方から、長い方へ。……ちゃんと渡せた。",
                "expr": "trust",
                "act": "look-up"
              }
            ],
            "effects": {
              "f": 2,
              "t": 2,
              "u": 1,
              "rika": 1
            }
          }
        ]
      },
      "closing": "……最初に飛び出すのは得意。でも、戻るところを見てくれるの、きみなんだね。"
    },
    "thy": {
      "opening": [
        {
          "who": "thyroxine",
          "text": "……工房の火と、学園の温度。……両方、見て。",
          "expr": "worried"
        }
      ],
      "states": [
        {
          "evidence": "学園の温度は基準より低く、ゆっくり下がっている。工房の火は弱い。",
          "q": {
            "prompt": "燈へ、どんな手配を頼む？",
            "kind": "message",
            "options": [
              {
                "label": "短時間で戻すため、火力を最大に固定する",
                "response": [
                  {
                    "who": "thyroxine",
                    "text": "……大きく振ると、戻しすぎる。……少しずつ。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "三段階の連絡を通して、火を少しずつ強める",
                "response": [
                  {
                    "who": "thyroxine",
                    "text": "……うん。遅れて届く分も、見ながら。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "窓を開けて、熱をさらに逃がす",
                "response": [
                  {
                    "who": "thyroxine",
                    "text": "……今は、冷えている。……逃がす方ではない。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        },
        {
          "evidence": "学園の温度は基準へ戻り、もう下がっていない。工房には先ほどの追加指示が残っている。",
          "q": {
            "prompt": "追加指示を、どう扱う？",
            "kind": "message",
            "options": [
              {
                "label": "また冷えるのに備え、追加をそのまま続ける",
                "response": [
                  {
                    "who": "thyroxine",
                    "text": "……戻った後まで強めると、今度は熱くなる。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "先生への報告だけ済ませ、前の段の追加は残す",
                "response": [
                  {
                    "who": "thyroxine",
                    "text": "……前の段にも、足りたって、届けたい。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "先生と前の段へ回復を報告し、追加の刺激を緩める",
                "response": [
                  {
                    "who": "thyroxine",
                    "text": "……二か所、届いた。……このくらいで、保とう。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              }
            ]
          }
        }
      ],
      "second": {
        "prompt": "火を強めた直後に温度が動かない。まず何を見る？",
        "kind": "message",
        "options": [
          {
            "label": "作用が届くまでの遅れを見込み、推移を確かめる",
            "response": [
              {
                "who": "thyroxine",
                "text": "……待ってもらえると、合わせられる。……慌てて足さないで。",
                "expr": "trust",
                "act": "look-up"
              }
            ],
            "effects": {
              "f": 2,
              "t": 2,
              "u": 1,
              "rika": 1
            }
          },
          {
            "label": "効いていないと決め、直ちに追加指示を重ねる",
            "response": [
              {
                "who": "thyroxine",
                "text": "……まだ、届く途中。……重ねた分が、あとで来る。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "放送と同じ速さでないので、連絡先を瞬へ変える",
            "response": [
              {
                "who": "thyroxine",
                "text": "……速さが違うだけ。……同じ仕事の代わりではない。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          }
        ]
      },
      "closing": "……遅いところも、終わるところも。……見ていてくれた。……ありがとう。"
    },
    "cor": {
      "opening": [
        {
          "who": "narr",
          "text": "保健室から、おなかをこわした生徒の連絡が重なった。体調の対応は養護の先生が引き受け、こちらには水場の記録が届く。",
          "expr": "neutral"
        },
        {
          "who": "cortisol",
          "text": "これは、塩を受け持つ妹にも連絡しよう。水守だけで抱える仕事じゃない。",
          "expr": "worried"
        },
        {
          "who": "salt",
          "text": "備から聞いたよ。塩の回収を担当するね。まず、水場から来た量の記録を見せて。",
          "expr": "neutral"
        }
      ],
      "states": [
        {
          "evidence": "水と塩分が一緒に失われ、巡る体液の量が減っている。濃さは平常に近いが、腎臓から「流れが弱い」と知らせが来た。",
          "q": {
            "prompt": "備の妹へ、どの知らせをつなぐ？",
            "kind": "message",
            "options": [
              {
                "label": "濃さが平常なら、回収の手配は不要と伝える",
                "response": [
                  {
                    "who": "cortisol",
                    "text": "濃さだけでは量が足りるとはいえない。流れの報告も見よう。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "腎臓からの量不足の知らせをつなぎ、塩の回収を強める",
                "response": [
                  {
                    "who": "cortisol",
                    "text": "うん。妹の主な呼び出しは、腎臓からつながる道だよ。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "備への刺激ホルモンの呼び出しを、そのまま妹にも回す",
                "response": [
                  {
                    "who": "cortisol",
                    "text": "同じ副腎皮質でも、主な呼び出し方まで同じではないんだ。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        },
        {
          "evidence": "保健室での補いと水場の調節で、巡る体液量が平常に戻った。下痢への対応と経過観察は養護の先生が続けている。",
          "q": {
            "prompt": "回復した量を見て、回収の手配は？",
            "kind": "message",
            "options": [
              {
                "label": "量が戻ったと伝え、強めていた回収を通常へ戻す",
                "response": [
                  {
                    "who": "cortisol",
                    "text": "うん。妹にも回復を伝えよう。保健室の見守りは、そのまま続けて。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "下痢という言葉が残る間、最大の回収を固定する",
                "response": [
                  {
                    "who": "cortisol",
                    "text": "原因への対応は続ける。でも、回復した量まで増やしすぎないようにしよう。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "妹の手配を強めたまま、水守だけを休ませる",
                "response": [
                  {
                    "who": "cortisol",
                    "text": "片方だけで決めずに、水と塩、両方の収支を見よう。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        }
      ],
      "second": {
        "prompt": "備・妹・水守の分担として合うのは？",
        "kind": "message",
        "options": [
          {
            "label": "備が塩分回収、妹が糖新生、水守が下痢の停止",
            "response": [
              {
                "who": "cortisol",
                "text": "担当が逆だね。それに、水守が下痢自体を止めるわけではない。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "妹だけで失った水と塩を無から補える",
            "response": [
              {
                "who": "cortisol",
                "text": "回収は、これ以上失う分を抑える仕事。失った分を補う対応も必要だよ。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "備は長く支える供給、妹は塩分回収、水守は水の回収",
            "response": [
              {
                "who": "cortisol",
                "text": "その分担なら、つながる。保健室からの補いと、水場での保持を並行しよう。",
                "expr": "trust",
                "act": "look-up"
              }
            ],
            "effects": {
              "f": 2,
              "t": 2,
              "u": 1,
              "rika": 1
            }
          }
        ]
      },
      "closing": "予定を立てるだけじゃなくて、誰の仕事かも、一緒に考えてくれた。……頼りになったよ。"
    },
    "adh": {
      "opening": [
        {
          "who": "narr",
          "text": "おなかをこわした生徒の対応を、養護の先生が進めている。水守は、体液の濃さと量の二つの記録を持ってきた。",
          "expr": "neutral"
        },
        {
          "who": "adh",
          "text": "……濃さだけじゃ、わからない。……どれだけ残っているかも、見て。",
          "expr": "worried"
        }
      ],
      "states": [
        {
          "evidence": "体液の濃さは平常に近い。しかし、水と塩分を一緒に失い、巡る量は大きく減っている。",
          "q": {
            "prompt": "水守へ、どちらの記録を伝える？",
            "kind": "message",
            "options": [
              {
                "label": "濃さが平常なので、水の保持も必ず不要と伝える",
                "response": [
                  {
                    "who": "adh",
                    "text": "……量が大きく減っても、知らせは来る。……濃さだけじゃ、止められない。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "濃さが平常なら量も平常のはずと伝える",
                "response": [
                  {
                    "who": "adh",
                    "text": "……同じ濃さでも、量は減る。……両方、別に見て。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "濃さと量の両方を伝え、塩係にも連絡する",
                "response": [
                  {
                    "who": "adh",
                    "text": "……うん。水だけで抱えない。……塩を戻す係と、一緒に。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              }
            ]
          }
        },
        {
          "evidence": "保健室での補いにより巡る量は回復。濃さも平常へ戻った。強い水の保持を続けると、今度は薄まりそうだ。",
          "q": {
            "prompt": "回復した水守へ、どう知らせる？",
            "kind": "message",
            "options": [
              {
                "label": "念のため、強い水の保持を続ける",
                "response": [
                  {
                    "who": "adh",
                    "text": "……多ければいい、じゃない。……薄めすぎないように、戻す。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              },
              {
                "label": "両方戻ったと伝え、強めていた保持を通常へ戻す",
                "response": [
                  {
                    "who": "adh",
                    "text": "……二つとも、戻った。……じゃあ、このくらいにする。",
                    "expr": "trust",
                    "act": "look-up"
                  }
                ],
                "effects": {
                  "f": 2,
                  "t": 2,
                  "u": 1,
                  "rika": 1
                }
              },
              {
                "label": "塩の方だけ止め、水の保持は強いままにする",
                "response": [
                  {
                    "who": "adh",
                    "text": "……水と塩、一緒に確かめたい。……片方だけで決めないで。",
                    "expr": "worried"
                  }
                ],
                "effects": {
                  "u": 1
                }
              }
            ]
          }
        }
      ],
      "second": {
        "prompt": "保健室へ届ける補水用の飲み物に糖も入っている。役割は？",
        "kind": "message",
        "options": [
          {
            "label": "小腸で塩と糖が一緒に吸収され、水の吸収も助ける",
            "response": [
              {
                "who": "adh",
                "text": "……腸で入れる仕事と、水場で戻す仕事。……両方あるんだね。",
                "expr": "trust",
                "act": "look-up"
              }
            ],
            "effects": {
              "f": 2,
              "t": 2,
              "u": 1,
              "rika": 1
            }
          },
          {
            "label": "血糖を下げる合図がないと、水が一滴も吸収されない",
            "response": [
              {
                "who": "adh",
                "text": "……腸で入れる仕組みは、その合図がなくても働くよ。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          },
          {
            "label": "糖を増やすほど、配合に関係なく水が吸収される",
            "response": [
              {
                "who": "adh",
                "text": "……決まった配合のものを、保健室から。……濃くすればいい、ではない。",
                "expr": "worried"
              }
            ],
            "effects": {
              "u": 1
            }
          }
        ]
      },
      "closing": "……足りない方も、戻った方も。……一緒に見てくれると、安心する。"
    }
  },
  "salt_character": {
    "name": "未定",
    "display": "塩係（備の妹・電話）",
    "relation": "備の妹（暫定設定）",
    "role": "鉱質コルチコイド、主にアルドステロン",
    "portrait": null,
    "romance_target": false
  },
  "sources": [
    "https://www.who.int/health-topics/diarrhoea",
    "https://www.who.int/publications/i/item/WHO-FCH-CAH-06.1",
    "https://www.ncbi.nlm.nih.gov/books/NBK279079/",
    "https://www.niddk.nih.gov/health-information/digestive-diseases/diarrhea/treatment"
  ],
  "scientific_limits": [
    "下痢自体をADHやアルドステロンが止める描写にしない",
    "失われた水や塩をホルモンが無から生む描写にしない",
    "備（糖質コルチコイド）と塩係（鉱質コルチコイド）の主な作用と分泌調節を分ける",
    "Na再吸収と腎髄質の浸透圧勾配形成を同一視しない",
    "下痢を一律に等張性脱水と断定せず、今回の記録を示した条件の場面とする",
    "経口補水の吸収をインスリン依存としない",
    "投薬量や自作補水液の調製手順はゲームへ入れない"
  ],
  "incoming": {
    "ins": [
      "今日、お時間ありますか？　一緒に出かけられたら、うれしいです。",
      "では、十時に駅前で。……楽しみにしていますね。"
    ],
    "glu": [
      "……今日、空いてる？　出かけるなら、一緒でもいいけど。",
      "じゃ、十時、駅前。……忘れないでよ。"
    ],
    "adr": [
      "今日、時間ある？　きみと、ちょっと出かけたい！",
      "十時に駅前！　じゃ、あとでね！"
    ],
    "thy": [
      "……今日。……時間、ある？　……一緒に、出かけたい。",
      "……十時、駅前で。……待ってる。"
    ],
    "cor": [
      "今日、予定はある？　よければ、一緒に出かけない？",
      "では、十時に駅前で。予定に入れておくね。"
    ],
    "adh": [
      "……今日、一緒に出かけない？　……会えたら、うれしい。",
      "……十時。駅前で。……また、あとで。"
    ]
  },
  "crisis_common": [
    {
      "who": "narr",
      "text": "文化祭の夕方。放送が途切れ、職員室へ駆けつけると、中枢先生が机に手をついていた。"
    },
    {
      "who": "narr",
      "text": "先生の胸元で、懐中時計の針が止まっていた。"
    },
    {
      "who": "hypothalamus",
      "text": "みんなが笑うこの時間を、取っておきたくてね。……でも、まずは今の記録だ。一緒に、頼むよ。",
      "expr": "worried"
    }
  ],
  "pier_dialogue": {
    "insulin": [
      {
        "who": "insulin",
        "text": "湖で釣りですね。……何か、食べてきました？",
        "expr": "worried"
      },
      {
        "who": "insulin",
        "text": "食べていない人を見ると、心配で景色どころじゃなくて……。",
        "expr": "sorrow"
      }
    ],
    "glucagon": [
      {
        "who": "glucagon",
        "text": "静かな湖。……わかってるじゃん。",
        "expr": "happy"
      },
      {
        "who": "glucagon",
        "text": "浮きを待ってる時間、けっこう好き。釣ろう。",
        "expr": "playful"
      }
    ],
    "adrenaline": [
      {
        "who": "adrenaline",
        "text": "湖の釣り……静か……待つの、長い……。",
        "expr": "listless"
      },
      {
        "who": "adrenaline",
        "text": "あ、魚かかった！　……やっと出番だ！",
        "expr": "neutral"
      }
    ],
    "thyroxine": [
      {
        "who": "thyroxine",
        "text": "……湖の風。……少し冷たくて、落ち着く。",
        "expr": "happy"
      },
      {
        "who": "thyroxine",
        "text": "……日差しが届くところは、じわじわ温かい。",
        "expr": "neutral"
      }
    ],
    "cortisol": [
      {
        "who": "cortisol",
        "text": "静かな湖。落ち着いて手順を考えられるから、ちょうどいい。",
        "expr": "happy"
      },
      {
        "who": "cortisol",
        "text": "帰った後に休む予定も、入れてあるよ。",
        "expr": "neutral"
      }
    ],
    "adh": [
      {
        "who": "adh",
        "text": "……湖。……水、たくさん。",
        "expr": "neutral"
      },
      {
        "who": "adh",
        "text": "……見てるだけで、満ちる。",
        "expr": "happy"
      }
    ]
  }
};
