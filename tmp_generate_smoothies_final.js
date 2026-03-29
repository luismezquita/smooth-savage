import fs from 'fs';

const rawData = [
  // Hero Smoothies (10)
  ["Ultimate Immunity Hero", "Immunity Boost", "The ultimate vitamin C fortress", true,
    ["Orange", "Ginger", "Camu Camu", "Turmeric"],
    "Peel 1 whole orange and add it to the blender. Add 1 teaspoon of freshly grated ginger, 1 teaspoon of camu camu powder, and 1/4 teaspoon of turmeric powder. Pour in 1/2 cup of water and blend on high speed for 60 seconds until perfectly smooth.",
    "Provides a megadose of Vitamin C and potent antioxidants. Fights off seasonal illnesses and fortifies your immune defenses instantly."
  ],
  ["Vitamin C Nuclear Bomb", "Immunity Boost", "Nature’s strongest immunity shield", true,
    ["Acerola Cherry", "Lemon", "Kiwi", "Manuka Honey"],
    "Combine 1/2 cup of fresh acerola cherry pulp, 1 peeled kiwi, 1 tablespoon of freshly squeezed lemon juice, and 1 tablespoon of Manuka honey. Blend on high for 45 seconds until completely liquid.",
    "Explodes with extreme Vitamin C levels, directly boosting white blood cell activity and maximizing cellular protection against external threats."
  ],
  ["Adaptogen Calm Hero", "Stress Relief & Calm", "Deep calm in every sip", true,
    ["Ashwagandha", "Almond Milk", "Blueberries", "Oats"],
    "Mix 1 scoop (approx 1 teaspoon) of premium ashwagandha root powder with 1 cup of cold almond milk, 1/2 cup of frozen blueberries, and 1/4 cup of rolled oats. Blend for 90 seconds into a thick, creamy shake.",
    "Dramatically reduces cortisol levels and provides deep nervous system relaxation, melting away daily stress and mental fatigue."
  ],
  ["Brain & Focus Hero", "Energy & Vitality", "Unlock sharp focus and mental clarity", true,
    ["Matcha", "Lion's Mane", "Banana", "Coconut Water"],
    "Whisk 1 teaspoon of matcha green tea powder gently in a small bowl, then transfer to the blender. Add 1 frozen banana, 1/2 teaspoon of Lion's Mane mushroom extract, and 1 cup of hydrating coconut water. Blend until frothy.",
    "Supercharges cognitive function, enhances memory retention, and provides clean, sustained mental energy without the jittery crash."
  ],
  ["Energy & Stamina Hero", "Energy & Vitality", "Natural power for body and mind", true,
    ["Maca Root", "Raw Cacao", "Dates", "Peanut Butter"],
    "Blend 1 teaspoon of maca root powder, 1 tablespoon of raw cacao powder, 3 pitted dates, and 1 generous tablespoon of peanut butter with 1 cup of water until rich, creamy, and indulgent.",
    "Boosts physical endurance and stamina rapidly using ancient adaptogenic roots and complex carbohydrates for sustained output."
  ],
  ["Gut Healing Hero", "Digestion & Gut Health", "Heal your gut from within", true,
    ["Papaya", "Aloe Vera", "Flaxseed", "Kefir"],
    "Extract 2 tablespoons of fresh aloe vera gel and blend with 1 cup of ripe papaya chunks, 1 tablespoon of ground flaxseed, and 1 cup of probiotic kefir. Blend on low speed for 30 seconds to preserve probiotics.",
    "Soothes the delicate stomach lining while delivering massive amounts of beneficial probiotics and digestive enzymes to repair the gut microbiome."
  ],
  ["Anti-Inflammatory Hero", "Anti-Inflammatory", "Fight inflammation naturally", true,
    ["Pineapple", "Curcumin", "Black Pepper", "Chia Seeds"],
    "Blend 1 cup of sweet pineapple chunks with 1/2 teaspoon of pure curcumin extract, 1 tiny pinch of black pepper (to activate the curcumin), and 1 tablespoon of soaked chia seeds. Blend with 1/2 cup of water.",
    "Inhibits inflammatory pathways at the molecular level, relieving joint pain and systemic swelling effectively."
  ],
  ["Beauty & Glow Hero", "Skin Glow & Beauty", "Radiate beauty from the inside", true,
    ["Strawberries", "Collagen Peptides", "Avocado", "Spinach"],
    "Blend 1 cup of fresh strawberries with 1/4 of a ripe avocado, 1 handful of fresh baby spinach, and 1 scoop of unflavored collagen peptides. Mix with 1/2 cup of water until completely smooth.",
    "Stimulates dermal elasticity and aggressively fights skin aging, rewarding you with a noticeable, radiant inner glow."
  ],
  ["Deep Sleep & Recovery Hero", "Sleep & Recovery", "Restorative sleep in a glass", true,
    ["Tart Cherry", "Lavender", "Magnesium", "Oat Milk"],
    "Mix 1/2 cup of pure tart cherry juice with 1 small pinch of culinary-grade dried lavender, 1 measuring scoop of powdered magnesium supplement, and 1 cup of warm oat milk. Stir or blend gently.",
    "Naturally elevates melatonin production, guaranteeing deep, uninterrupted REM sleep and powerful overnight muscle recovery."
  ],
  ["Antioxidant God Mode", "Antioxidant Power", "Maximum antioxidant protection", true,
    ["Acai", "Goji Berries", "Pomegranate", "Dark Chocolate"],
    "Blend 1 frozen acai packet (100g) with 1 tablespoon of rehydrated goji berries, 1/2 cup of pure pomegranate juice, and a 1/2 ounce shaving of 85% dark chocolate until thoroughly combined.",
    "Floods your body with a massive spectrum of anthocyanins, neutralizing free radicals and halting cellular damage in its tracks."
  ],
  // Powerful Smoothies (25)
  ["Elderberry Shield", "Immunity Boost", "Ancient berry defense system", false,
    ["Elderberry Syrup", "Blackberries", "Cinnamon", "Water"],
    "Blend 1 tablespoon of elderberry syrup with 1 cup of fresh blackberries, 1/2 teaspoon of cinnamon, and 1 cup of filtered water. Drink immediately for maximum effect.",
    "Acts as a formidable barrier against viral infections and significantly reduces the duration of common colds."
  ],
  ["Tropical Immunity", "Immunity Boost", "Tropical immune support", false,
    ["Mango", "Pineapple", "Coconut Yogurt", "Lime"],
    "Blend 1/2 cup of fresh mango and 1/2 cup of pineapple chunks with 1/2 cup of rich coconut yogurt and the freshly squeezed juice of 1 lime.",
    "Combines essential digestive enzymes with high-dose Vitamin C to keep your immune system functioning flawlessly."
  ],
  ["Berry Immune", "Immunity Boost", "Berry-powered immune boost", false,
    ["Raspberries", "Strawberries", "Hemp Seeds", "Almond Milk"],
    "Blend 1/2 cup of frozen raspberries, 1/2 cup of strawberries, 1 tablespoon of heart-healthy hemp seeds, and 1 cup of almond milk until completely smooth.",
    "Provides a sustained flow of antioxidants and vitamins to protect your cells against oxidative stress."
  ],
  ["Star Defense", "Immunity Boost", "Starfruit immunity guardian", false,
    ["Starfruit", "Green Apple", "Mint", "Cucumber"],
    "Slice 1 whole starfruit (removing seeds) and blend with 1 green apple, 5 fresh mint leaves, and 1/2 cup of crisp cucumber slices.",
    "Detoxifies the system while delivering a unique profile of immune-boosting micronutrients."
  ],
  ["Soursop Guardian", "Immunity Boost", "Powerful tropical protector", false,
    ["Soursop Pulp", "Banana", "Vanilla Bean", "Coconut Water"],
    "Blend 1/2 cup of fresh or frozen soursop pulp with 1 ripe banana, the scraped seeds of 1/2 authentic vanilla bean, and 1 cup of coconut water.",
    "Harnesses the exotic, powerful properties of soursop to defend cellular integrity and boost immunity."
  ],
  ["Lucuma Power", "Energy & Vitality", "Sustainable natural energy", false,
    ["Lucuma Powder", "Cashews", "Dates", "Oat Milk"],
    "Blend 1 tablespoon of sweet lucuma powder with 1/4 cup of soaked cashews, 2 pitted dates, and 1 cup of oat milk for a caramel-like energy drink.",
    "Provides a low-glycemic energy surge that sustains you for hours without affecting your blood sugar negatively."
  ],
  ["Green Matcha Surge", "Energy & Vitality", "Clean focused energy boost", false,
    ["Matcha", "Spinach", "Mango", "Soy Milk"],
    "Whisk 1 teaspoon of matcha powder and blend with 1 large handful of baby spinach, 1/2 cup of sweet mango chunks, and 1 cup of soy milk.",
    "Delivers L-Theanine and natural caffeine for an intense but entirely calm, focused energy rush."
  ],
  ["Tropical Stamina", "Energy & Vitality", "Tropical endurance fuel", false,
    ["Banana", "Mango", "Chia Seeds", "Coconut Water"],
    "Blend 1 banana and 1/2 cup of mango with 1 tablespoon of pre-soaked chia seeds and 1 cup of pure coconut water.",
    "Perfect for pre-workout hydration and providing a sustained stream of complex carbohydrates."
  ],
  ["Jackfruit Fuel", "Energy & Vitality", "Heavyweight natural energy", false,
    ["Jackfruit", "Protein Powder", "Almond Butter", "Water"],
    "Blend 1 cup of sweet, ripe jackfruit pods with 1 scoop of your favorite vanilla protein powder, 1 tablespoon of almond butter, and 1 cup of water.",
    "Loaded with extreme caloric-dense natural energy, perfect for bulking or intense physical labor."
  ],
  ["Papaya Digestive", "Digestion & Gut Health", "Enzyme-rich digestion support", false,
    ["Papaya", "Ginger", "Lime", "Water"],
    "Blend 1 generous cup of papaya with 1/2 teaspoon of raw grated ginger, the juice of 1/2 lime, and 1/2 cup of water.",
    "Utilizes the papain enzyme to rapidly digest heavy proteins and instantly relieve severe stomach bloating."
  ],
  ["Kiwi Cleanse", "Digestion & Gut Health", "Gentle daily gut cleanse", false,
    ["Kiwi", "Celery", "Apple", "Flaxseed"],
    "Blend 2 unpeeled kiwis (for extra fiber) with 1 stalk of crisp celery, 1/2 green apple, and 1 tablespoon of ground flaxseed.",
    "Acts as a gentle, natural digestive sweep, ensuring regular bowel movements and gut cleanliness."
  ],
  ["Prickly Gut Reset", "Digestion & Gut Health", "Powerful prickly pear reset", false,
    ["Prickly Pear", "Watermelon", "Mint", "Aloe Vera Juice"],
    "Carefully extract the flesh of 1 prickly pear and blend with 1 cup of watermelon, 3 mint leaves, and 1/4 cup of soothing aloe vera juice.",
    "Reduces internal gut inflammation and provides a deeply hydrating environment for good bacteria to thrive."
  ],
  ["Apple Ginger Soothe", "Digestion & Gut Health", "Soothing digestive aid", false,
    ["Red Apple", "Ginger", "Cinnamon", "Warm Water"],
    "Blend 1 sweet red apple with 1 thumb of ginger and 1/2 teaspoon of cinnamon using 1 cup of warm water for a soothing drink.",
    "An incredibly comforting blend that stops nausea in its tracks and gently warms the digestive tract."
  ],
  ["Ashwagandha Calm", "Stress Relief & Calm", "Stress-melting adaptogenic blend", false,
    ["Ashwagandha", "Banana", "Cacao", "Almond Milk"],
    "Blend 1 teaspoon of standard ashwagandha powder with 1 sweet banana, 1 tablespoon of rich cacao powder, and 1 cup of almond milk.",
    "Significantly mitigates daily anxiety and builds your body's long-term resilience to stress triggers."
  ],
  ["Tropical Calm", "Stress Relief & Calm", "Tropical relaxation in a glass", false,
    ["Passionfruit", "Mango", "Chamomile Tea", "Honey"],
    "Brew 1 cup of chamomile tea and let it chill. Blend with the pulp of 1 passionfruit, 1/2 cup of sweet mango, and 1 teaspoon of honey.",
    "Contains natural mild sedatives that safely relax the nervous system and promote deep muscular relaxation."
  ],
  ["Cherry Reishi Dream", "Stress Relief & Calm", "Calm mind and better sleep", false,
    ["Tart Cherry", "Reishi Mushroom", "Oat Milk", "Vanilla"],
    "Blend 1/2 teaspoon of reishi mushroom powder with 1/2 cup of sleep-inducing tart cherry juice, 1/2 cup of oat milk, and a dash (1/4 tsp) of vanilla extract.",
    "Balances emotional states while actively preparing your brain and body for a flawless night of sleep."
  ],
  ["Golden Anti-Inflammatory", "Anti-Inflammatory", "Golden inflammation fighter", false,
    ["Turmeric", "Mango", "Carrot", "Coconut Oil"],
    "Blend 1 inch of fresh turmeric root with 1/2 cup of sweet mango, 1 grated carrot, and 1 small teaspoon of coconut oil to properly absorb the curcumin.",
    "A golden elixir designed specifically to flood your body with natural, highly absorbable anti-inflammatory agents."
  ],
  ["Cherry Beet Recovery", "Anti-Inflammatory", "Recovery and renewal blend", false,
    ["Beetroot", "Cherry", "Spinach", "Water"],
    "Blend 1/2 cup of cooked or raw beetroot chunks with 1/2 cup of sweet cherries, 1 large handful of spinach, and 1 cup of water.",
    "Boosts nitric oxide production to massively improve blood flow and accelerate muscular recovery."
  ],
  ["Mangosteen Relief", "Anti-Inflammatory", "Mangosteen anti-inflammatory power", false,
    ["Mangosteen", "Pineapple", "Mint", "Coconut Water"],
    "Carefully extract the delicate flesh of 2 mangosteens and blend with 1/2 cup of pineapple, 4 mint leaves, and 1 cup of coconut water.",
    "Harnesses powerful xanthones directly proven to reduce chronic cellular inflammation and oxidative stress."
  ],
  ["Acai Beauty Bowl", "Skin Glow & Beauty", "Super berry beauty fuel", false,
    ["Acai Base", "Blueberries", "Collagen", "Almond Milk"],
    "Blend 1 unsweetened acai packet (100g) with 1/2 cup of blueberries, 1 scoop of collagen, and 1/2 cup of almond milk for a thick, luxurious base.",
    "Delivers a stunning concentration of antioxidants that actively prevent wrinkles and enhance skin luminosity."
  ],
  ["Sea Buckthorn Glow", "Skin Glow & Beauty", "Omega-rich skin radiance", false,
    ["Sea Buckthorn Juice", "Orange", "Carrot", "Ginger"],
    "Blend 2 tablespoons of tart sea buckthorn juice with 1 sweet orange, 1 fresh carrot, and 1/2 inch of ginger.",
    "Provides extremely rare Omega-7 fatty acids that are absolutely vital for maintaining glowing, deeply hydrated skin."
  ],
  ["Maqui Radiance", "Skin Glow & Beauty", "Deep purple glow from within", false,
    ["Maqui Berry Powder", "Banana", "Spinach", "Oat Milk"],
    "Mix 1 teaspoon of potent maqui berry powder with 1 ripening banana, 1 handful of spinach, and 1 cup of oat milk for an impossibly deep purple smoothie.",
    "Renowned for having the highest antioxidant score of any fruit, fiercely protecting your skin from UV and pollution damage."
  ],
  ["Heart Protector", "Heart Health", "Daily heart protection", false,
    ["Pomegranate", "Strawberries", "Chia Seeds", "Water"],
    "Blend 1/4 cup of pure pomegranate seeds with 1/2 cup of strawberries, 1 tablespoon of chia seeds, and 3/4 cup of water.",
    "Improves blood lipid profiles effectively, reducing cholesterol oxidation and keeping arterial walls clear."
  ],
  ["Beet Berry Heart", "Heart Health", "Heart-loving berry blend", false,
    ["Beetroot", "Raspberries", "Walnuts", "Almond Milk"],
    "Blend 1/2 cup of vibrant beetroot with 1/2 cup of raspberries, 1 tablespoon (approx 4 halves) of heart-healthy walnuts, and 1 cup of almond milk.",
    "Dilates blood vessels safely to regulate blood pressure and provides crucial Omega-3 fatty acids for the heart."
  ],
  ["Deep Detox", "Detox & Cleansing", "Gentle daily detox support", false,
    ["Cilantro", "Green Apple", "Lemon", "Cucumber"],
    "Blend 1 small handful of cilantro with 1 chopped green apple, the juice of 1 lemon, and 1/2 of a cucumber.",
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
    description: teaser + ".",
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
console.log('Smoothies data with detailed quantities successfully generated.');
