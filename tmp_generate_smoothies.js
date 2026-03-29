import fs from 'fs';

const rawData = [
  // Hero Smoothies (10)
  ["Ultimate Immunity Hero", "Immunity Boost", "The ultimate vitamin C fortress", true,
    ["Orange", "Ginger", "Camu Camu", "Turmeric"],
    "Peel the orange and blend with a thumb of grated ginger, 1 tsp camu camu, and a pinch of active turmeric until perfectly smooth.",
    "Provides a megadose of Vitamin C and potent antioxidants. Fights off seasonal illnesses and fortifies your immune defenses instantly."
  ],
  ["Vitamin C Nuclear Bomb", "Immunity Boost", "Nature’s strongest immunity shield", true,
    ["Acerola Cherry", "Lemon", "Kiwi", "Manuka Honey"],
    "Combine fresh acerola pulp, one peeled kiwi, a squeeze of lemon juice, and 1 tbsp of Manuka honey. Blend on high.",
    "Explodes with extreme Vitamin C levels, directly boosting white blood cell activity and maximizing cellular protection against external threats."
  ],
  ["Adaptogen Calm Hero", "Stress Relief & Calm", "Deep calm in every sip", true,
    ["Ashwagandha", "Almond Milk", "Blueberries", "Oats"],
    "Mix 1 scoop of premium ashwagandha root with a cup of cold almond milk, frozen blueberries, and rolled oats. Blend into a thick shake.",
    "Dramatically reduces cortisol levels and provides deep nervous system relaxation, melting away daily stress and mental fatigue."
  ],
  ["Brain & Focus Hero", "Energy & Vitality", "Unlock sharp focus and mental clarity", true,
    ["Matcha", "Lion's Mane", "Banana", "Coconut Water"],
    "Whisk the matcha gently, then blend with a frozen banana, Lion's Mane mushroom extract, and hydrating coconut water.",
    "Supercharges cognitive function, enhances memory retention, and provides clean, sustained mental energy without the jittery crash."
  ],
  ["Energy & Stamina Hero", "Energy & Vitality", "Natural power for body and mind", true,
    ["Maca Root", "Raw Cacao", "Dates", "Peanut Butter"],
    "Blend maca root powder, cacao, pitted dates, and a generous scoop of peanut butter until rich, creamy, and indulgent.",
    "Boosts physical endurance and stamina rapidly using ancient adaptogenic roots and complex carbohydrates for sustained output."
  ],
  ["Gut Healing Hero", "Digestion & Gut Health", "Heal your gut from within", true,
    ["Papaya", "Aloe Vera", "Flaxseed", "Kefir"],
    "Extract fresh aloe vera gel and blend with ripe papaya chunks, a spoonful of flaxseed, and probiotic kefir.",
    "Soothes the delicate stomach lining while delivering massive amounts of beneficial probiotics and digestive enzymes to repair the gut microbiome."
  ],
  ["Anti-Inflammatory Hero", "Anti-Inflammatory", "Fight inflammation naturally", true,
    ["Pineapple", "Curcumin", "Black Pepper", "Chia Seeds"],
    "Blend sweet pineapple chunks with a potent dash of curcumin, a tiny pinch of black pepper, and soaked chia seeds.",
    "Inhibits inflammatory pathways at the molecular level, relieving joint pain and systemic swelling effectively."
  ],
  ["Beauty & Glow Hero", "Skin Glow & Beauty", "Radiate beauty from the inside", true,
    ["Strawberries", "Collagen Peptides", "Avocado", "Spinach"],
    "Blend fresh strawberries with half an avocado, baby spinach, and a scoop of unflavored collagen peptides.",
    "Stimulates dermal elasticity and aggressively fights skin aging, rewarding you with a noticeable, radiant inner glow."
  ],
  ["Deep Sleep & Recovery Hero", "Sleep & Recovery", "Restorative sleep in a glass", true,
    ["Tart Cherry", "Lavender", "Magnesium", "Oat Milk"],
    "Mix pure tart cherry juice with a hint of food-grade lavender, a magnesium supplement, and warm oat milk.",
    "Naturally elevates melatonin production, guaranteeing deep, uninterrupted REM sleep and powerful overnight muscle recovery."
  ],
  ["Antioxidant God Mode", "Antioxidant Power", "Maximum antioxidant protection", true,
    ["Acai", "Goji Berries", "Pomegranate", "Dark Chocolate"],
    "Blend frozen acai packets with rehydrated goji berries, pomegranate juice, and a shaving of 85% dark chocolate.",
    "Floods your body with a massive spectrum of anthocyanins, neutralizing free radicals and halting cellular damage in its tracks."
  ],
  // Powerful Smoothies (25)
  ["Elderberry Shield", "Immunity Boost", "Ancient berry defense system", false,
    ["Elderberry Syrup", "Blackberries", "Cinnamon", "Water"],
    "Blend a tablespoon of elderberry syrup with a cup of fresh blackberries and a dash of cinnamon. Drink immediately.",
    "Acts as a formidable barrier against viral infections and significantly reduces the duration of common colds."
  ],
  ["Tropical Immunity", "Immunity Boost", "Tropical immune support", false,
    ["Mango", "Pineapple", "Coconut Yogurt", "Lime"],
    "Blend fresh mango and pineapple with rich coconut yogurt and a sharp squeeze of lime.",
    "Combines essential digestive enzymes with high-dose Vitamin C to keep your immune system functioning flawlessly."
  ],
  ["Berry Immune", "Immunity Boost", "Berry-powered immune boost", false,
    ["Raspberries", "Strawberries", "Hemp Seeds", "Almond Milk"],
    "Blend a mix of frozen berries with heart-healthy hemp seeds and almond milk until smooth.",
    "Provides a sustained flow of antioxidants and vitamins to protect your cells against oxidative stress."
  ],
  ["Star Defense", "Immunity Boost", "Starfruit immunity guardian", false,
    ["Starfruit", "Green Apple", "Mint", "Cucumber"],
    "Slice the starfruit, removing seeds, and blend with green apple, fresh mint leaves, and crisp cucumber.",
    "Detoxifies the system while delivering a unique profile of immune-boosting micronutrients."
  ],
  ["Soursop Guardian", "Immunity Boost", "Powerful tropical protector", false,
    ["Soursop Pulp", "Banana", "Vanilla Bean", "Coconut Water"],
    "Blend fresh or frozen soursop pulp with a ripe banana and authentic vanilla bean.",
    "Harnesses the exotic, powerful properties of soursop to defend cellular integrity and boost immunity."
  ],
  ["Lucuma Power", "Energy & Vitality", "Sustainable natural energy", false,
    ["Lucuma Powder", "Cashews", "Dates", "Oat Milk"],
    "Blend sweet lucuma powder with soaked cashews, dates, and oat milk for a caramel-like energy drink.",
    "Provides a low-glycemic energy surge that sustains you for hours without affecting your blood sugar negatively."
  ],
  ["Green Matcha Surge", "Energy & Vitality", "Clean focused energy boost", false,
    ["Matcha Green Tea", "Spinach", "Mango", "Soy Milk"],
    "Whisk the matcha and blend with baby spinach, sweet mango chunks, and soy milk.",
    "Delivers L-Theanine and natural caffeine for an intense but entirely calm, focused energy rush."
  ],
  ["Tropical Stamina", "Energy & Vitality", "Tropical endurance fuel", false,
    ["Banana", "Mango", "Chia Seeds", "Coconut Water"],
    "Blend tropical fruits with a tablespoon of pre-soaked chia seeds and pure coconut water.",
    "Perfect for pre-workout hydration and providing a sustained stream of complex carbohydrates."
  ],
  ["Jackfruit Fuel", "Energy & Vitality", "Heavyweight natural energy", false,
    ["Jackfruit", "Protein Powder", "Almond Butter", "Water"],
    "Blend sweet, ripe jackfruit pods with your favorite vanilla protein powder and a spoonful of almond butter.",
    "Loaded with extreme caloric-dense natural energy, perfect for bulking or intense physical labor."
  ],
  ["Papaya Digestive", "Digestion & Gut Health", "Enzyme-rich digestion support", false,
    ["Papaya", "Ginger", "Lime", "Water"],
    "Blend a generous serving of papaya with raw ginger and zesty lime juice.",
    "Utilizes the papain enzyme to rapidly digest heavy proteins and instantly relieve severe stomach bloating."
  ],
  ["Kiwi Cleanse", "Digestion & Gut Health", "Gentle daily gut cleanse", false,
    ["Kiwi", "Celery", "Apple", "Flaxseed"],
    "Blend unpeeled kiwi (for extra fiber) with crisp celery, a green apple, and ground flaxseed.",
    "Acts as a gentle, natural digestive sweep, ensuring regular bowel movements and gut cleanliness."
  ],
  ["Prickly Gut Reset", "Digestion & Gut Health", "Powerful prickly pear reset", false,
    ["Prickly Pear", "Watermelon", "Mint", "Aloe Vera Juice"],
    "Carefully extract the prickly pear flesh and blend with watermelon and soothing aloe vera juice.",
    "Reduces internal gut inflammation and provides a deeply hydrating environment for good bacteria to thrive."
  ],
  ["Apple Ginger Soothe", "Digestion & Gut Health", "Soothing digestive aid", false,
    ["Red Apple", "Ginger", "Cinnamon", "Warm Water"],
    "Blend a sweet red apple with a thumb of ginger and cinnamon using warm water for a soothing drink.",
    "An incredibly comforting blend that stops nausea in its tracks and gently warms the digestive tract."
  ],
  ["Ashwagandha Calm", "Stress Relief & Calm", "Stress-melting adaptogenic blend", false,
    ["Ashwagandha", "Banana", "Cacao", "Almond Milk"],
    "Blend standard ashwagandha powder with a sweet banana and rich cacao powder.",
    "Significantly mitigates daily anxiety and builds your body's long-term resilience to stress triggers."
  ],
  ["Tropical Calm", "Stress Relief & Calm", "Tropical relaxation in a glass", false,
    ["Passionfruit", "Mango", "Chamomile Tea", "Honey"],
    "Brew chamomile tea and let it chill. Blend with passionfruit pulp and sweet mango.",
    "Contains natural mild sedatives that safely relax the nervous system and promote deep muscular relaxation."
  ],
  ["Cherry Reishi Dream", "Stress Relief & Calm", "Calm mind and better sleep", false,
    ["Tart Cherry", "Reishi Mushroom", "Oat Milk", "Vanilla"],
    "Blend reishi mushroom powder with sleep-inducing tart cherry juice and a dash of vanilla extract.",
    "Balances emotional states while actively preparing your brain and body for a flawless night of sleep."
  ],
  ["Golden Anti-Inflammatory", "Anti-Inflammatory", "Golden inflammation fighter", false,
    ["Turmeric", "Mango", "Carrot", "Coconut Oil"],
    "Blend turmeric root with sweet mango, grated carrot, and a small spoonful of coconut oil to absorb the curcumin.",
    "A golden elixir designed specifically to flood your body with natural, highly absorbable anti-inflammatory agents."
  ],
  ["Cherry Beet Recovery", "Anti-Inflammatory", "Recovery and renewal blend", false,
    ["Beetroot", "Cherry", "Spinach", "Water"],
    "Blend cooked or raw beetroot chunks with sweet cherries and a handful of spinach.",
    "Boosts nitric oxide production to massively improve blood flow and accelerate muscular recovery."
  ],
  ["Mangosteen Relief", "Anti-Inflammatory", "Mangosteen anti-inflammatory power", false,
    ["Mangosteen", "Pineapple", "Mint", "Coconut Water"],
    "Carefully extract the delicate mangosteen flesh and blend with pineapple and mint.",
    "Harnesses powerful xanthones directly proven to reduce chronic cellular inflammation and oxidative stress."
  ],
  ["Acai Beauty Bowl", "Skin Glow & Beauty", "Super berry beauty fuel", false,
    ["Acai Base", "Blueberries", "Collagen", "Almond Milk"],
    "Blend unsweetened acai with blueberries and collagen for a thick, luxurious, bowl-ready base.",
    "Delivers a stunning concentration of antioxidants that actively prevent wrinkles and enhance skin luminosity."
  ],
  ["Sea Buckthorn Glow", "Skin Glow & Beauty", "Omega-rich skin radiance", false,
    ["Sea Buckthorn Juice", "Orange", "Carrot", "Ginger"],
    "Blend the tart sea buckthorn juice with sweet orange and fresh carrot.",
    "Provides extremely rare Omega-7 fatty acids that are absolutely vital for maintaining glowing, deeply hydrated skin."
  ],
  ["Maqui Radiance", "Skin Glow & Beauty", "Deep purple glow from within", false,
    ["Maqui Berry Powder", "Banana", "Spinach", "Oat Milk"],
    "Mix potent maqui berry powder with a banana and oat milk for an impossibly deep purple smoothie.",
    "Renowned for having the highest antioxidant score of any fruit, fiercely protecting your skin from UV and pollution damage."
  ],
  ["Heart Protector", "Heart Health", "Daily heart protection", false,
    ["Pomegranate", "Strawberries", "Chia Seeds", "Water"],
    "Blend pure pomegranate seeds with strawberries and a tablespoon of chia seeds.",
    "Improves blood lipid profiles effectively, reducing cholesterol oxidation and keeping arterial walls clear."
  ],
  ["Beet Berry Heart", "Heart Health", "Heart-loving berry blend", false,
    ["Beetroot", "Raspberries", "Walnuts", "Almond Milk"],
    "Blend vibrant beetroot with raspberries and a few heart-healthy walnuts.",
    "Dilates blood vessels safely to regulate blood pressure and provides crucial Omega-3 fatty acids for the heart."
  ],
  ["Deep Detox", "Detox & Cleansing", "Gentle daily detox support", false,
    ["Cilantro", "Green Apple", "Lemon", "Cucumber"],
    "Blend a small handful of cilantro with green apple, a squeeze of lemon, and cucumber.",
    "Binds to heavy metals in the bloodstream and actively assists the liver in flushing out deep-seated toxins."
  ]
];

const categoryColors = {
  "Immunity Boost": "orange",
  "Stress Relief & Calm": "purple",
  "Energy & Vitality": "amber",
  "Digestion & Gut Health": "yellow",
  "Anti-Inflammatory": "red",
  "Skin Glow & Beauty": "pink",
  "Sleep & Recovery": "indigo",
  "Antioxidant Power": "purple",
  "Heart Health": "red",
  "Detox & Cleansing": "green"
};

const smoothies = rawData.map((item, index) => {
  const [name, category, teaser, isHero, ingredients, steps, benefits] = item;
  const color = categoryColors[category] || "green";
  return {
    id: index + 1,
    name,
    title: name,
    category,
    teaser,
    color,
    description: teaser + " - A perfectly crafted blend to support your daily wellness.",
    benefits,
    healthTags: [category, "Wellness"],
    synergies: "Superfoods + Vitamins",
    image: "/images/smoothies/energy-banana.jpg",
    ingredients,
    steps,
    tier: "free",
    isHero
  };
});

const fileContent = `export const smoothies = ${JSON.stringify(smoothies, null, 2)};\n`;

fs.writeFileSync('/Users/luisfernandomezquitasanchez/Desktop/Proyectos Antigravity/VITFRUIT/src/data/smoothies.js', fileContent, 'utf-8');
console.log('Smoothies data with deep content successfully generated.');
