const CACHE_NAME = 'SMOOTH_SAVAGE_RELENTLESS_V2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.jsx',
  '/src/index.css',
  '/images/fruits/acai_berries.webp',
  '/images/fruits/acerola.webp',
  '/images/fruits/amla.webp',
  '/images/fruits/apple.webp',
  '/images/fruits/apricot.webp',
  '/images/fruits/aronia_berry.webp',
  '/images/fruits/avocado.webp',
  '/images/fruits/bananas.webp',
  '/images/fruits/baobab.webp',
  '/images/fruits/bilberry.webp',
  '/images/fruits/blackberries.webp',
  '/images/fruits/blackcurrant.webp',
  '/images/fruits/blacksapote.webp',
  '/images/fruits/blood_orange.webp',
  '/images/fruits/blue_java_banana.webp',
  '/images/fruits/blueberries.webp',
  '/images/fruits/breadfruit.webp',
  '/images/fruits/cantaloupe.webp',
  '/images/fruits/cape_goosberry.webp',
  '/images/fruits/cempedak.webp',
  '/images/fruits/cherries.webp',
  '/images/fruits/coconut.webp',
  '/images/fruits/cranberry.webp',
  '/images/fruits/custard_apple.webp',
  '/images/fruits/dragonfruit.webp',
  '/images/fruits/durian.webp',
  '/images/fruits/elderberry.webp',
  '/images/fruits/fig.webp',
  '/images/fruits/grapefruit.webp',
  '/images/fruits/grapes.webp',
  '/images/fruits/guava.webp',
  '/images/fruits/honeydew.webp',
  '/images/fruits/jacckfruit.webp',
  '/images/fruits/jambolan.webp',
  '/images/fruits/jujube.webp',
  '/images/fruits/kiwi.webp',
  '/images/fruits/kumquat.webp',
  '/images/fruits/langsat.webp',
  '/images/fruits/lemon.webp',
  '/images/fruits/lime.webp',
  '/images/fruits/longan.webp',
  '/images/fruits/loquat.webp',
  '/images/fruits/lucuma.webp',
  '/images/fruits/lychee.webp',
  '/images/fruits/mango.webp',
  '/images/fruits/mangosteen.webp',
  '/images/fruits/mulberry.webp',
  '/images/fruits/nectarine.webp',
  '/images/fruits/nectarines.webp',
  '/images/fruits/orange.webp',
  '/images/fruits/papaya.webp',
  '/images/fruits/passionfruit.webp',
  '/images/fruits/pawpaw.webp',
  '/images/fruits/peach.webp',
  '/images/fruits/pear.webp',
  '/images/fruits/persimon.webp',
  '/images/fruits/physalis.webp',
  '/images/fruits/pineapple.webp',
  '/images/fruits/plantain.webp',
  '/images/fruits/plum.webp',
  '/images/fruits/plumcot.webp',
  '/images/fruits/pomegranate.webp',
  '/images/fruits/pomelo.webp',
  '/images/fruits/prickly_pear.webp',
  '/images/fruits/quince.webp',
  '/images/fruits/rambutan.webp',
  '/images/fruits/raspberries.webp',
  '/images/fruits/red_currant.webp',
  '/images/fruits/sapodilla.webp',
  '/images/fruits/soursop.webp',
  '/images/fruits/starfruit.webp',
  '/images/fruits/strawberries.webp',
  '/images/fruits/tamarind.webp',
  '/images/fruits/ugli_fruit.webp',
  '/images/fruits/ugly_fruit.webp',
  '/images/fruits/walnuts.webp',
  '/images/fruits/watermelon.webp',
  '/images/fruits/yuzu.webp',
  '/images/smoothies/acai_beauty_bowl.webp',
  '/images/smoothies/adaptogen_calm_hero.webp',
  '/images/smoothies/anti_inflammatory_hero.webp',
  '/images/smoothies/anti_oxidant_god_mode.webp',
  '/images/smoothies/apple_ginger_soothe.webp',
  '/images/smoothies/ashwagandha-calm.webp',
  '/images/smoothies/ashwagandha_calm.webp',
  '/images/smoothies/beauty_and_glow_hero.webp',
  '/images/smoothies/beet_berry_heart.webp',
  '/images/smoothies/berry-immune.webp',
  '/images/smoothies/berry_immune.webp',
  '/images/smoothies/brain_&_focus_hero.webp',
  '/images/smoothies/cherry-reishi-dream.webp',
  '/images/smoothies/cherry_beet_recovery.webp',
  '/images/smoothies/cherry_reishi_dream.webp',
  '/images/smoothies/deep_detox.webp',
  '/images/smoothies/deep_sleep_and _recovery_hero.webp',
  '/images/smoothies/elderberry-shield.webp',
  '/images/smoothies/energy_stamina_hero.webp',
  '/images/smoothies/golden_anti_inflammatory.webp',
  '/images/smoothies/green-matcha-surge.webp',
  '/images/smoothies/green_matcha_surge.webp',
  '/images/smoothies/gut_healing_hero.webp',
  '/images/smoothies/heart_protector.webp',
  '/images/smoothies/jackfruit-fuel.webp',
  '/images/smoothies/jackfruit_fuel.webp',
  '/images/smoothies/kiwi-cleanse.webp',
  '/images/smoothies/kiwi_cleanse.webp',
  '/images/smoothies/lucuma-power.webp',
  '/images/smoothies/lucuma_power.webp',
  '/images/smoothies/mangosteen_relief.webp',
  '/images/smoothies/maqui_radiance.webp',
  '/images/smoothies/papaya-digestive.webp',
  '/images/smoothies/papaya_digestive.webp',
  '/images/smoothies/prickly-gut-reset.webp',
  '/images/smoothies/prickly_gut_reset.webp',
  '/images/smoothies/sea_buckthorn_glow.webp',
  '/images/smoothies/soursop_guardian.webp',
  '/images/smoothies/star-defense.webp',
  '/images/smoothies/star_defense.webp',
  '/images/smoothies/tropical-calm.webp',
  '/images/smoothies/tropical-immunity.webp',
  '/images/smoothies/tropical-stamina.webp',
  '/images/smoothies/tropical_calm.webp',
  '/images/smoothies/tropical_immunity.webp',
  '/images/smoothies/tropical_stamina.webp',
  '/images/smoothies/ultimate_immunity hero.webp',
  '/images/smoothies/vitaminc_nuclear_bomb.webp',
  '/images/superfoods/acai-berries.webp',
  '/images/superfoods/aloe-vera.webp',
  '/images/superfoods/arugula.webp',
  '/images/superfoods/ashwaganda.webp',
  '/images/superfoods/asparagus.webp',
  '/images/superfoods/avocado.webp',
  '/images/superfoods/beetroot.webp',
  '/images/superfoods/bell-pepper.webp',
  '/images/superfoods/bok-choy.webp',
  '/images/superfoods/broccoli.webp',
  '/images/superfoods/brussels-sprouts.webp',
  '/images/superfoods/cacao.webp',
  '/images/superfoods/camu-camu.webp',
  '/images/superfoods/carrot.webp',
  '/images/superfoods/cauliflower.webp',
  '/images/superfoods/celery.webp',
  '/images/superfoods/chaga-mushroom.webp',
  '/images/superfoods/chia-seeds.webp',
  '/images/superfoods/chlorella.webp',
  '/images/superfoods/cilantro.webp',
  '/images/superfoods/collard-greens.webp',
  '/images/superfoods/cordyceps.webp',
  '/images/superfoods/cucumber.webp',
  '/images/superfoods/dandelion-greens.webp',
  '/images/superfoods/fennel.webp',
  '/images/superfoods/flaxseeds.webp',
  '/images/superfoods/ginger.webp',
  '/images/superfoods/goji-berries.webp',
  '/images/superfoods/greek-yogurt.webp',
  '/images/superfoods/hemp-hearts.webp',
  '/images/superfoods/kakadu-plum.webp',
  '/images/superfoods/kale.webp',
  '/images/superfoods/kohlrabi.webp',
  '/images/superfoods/lions-mane.webp',
  '/images/superfoods/maca-root.webp',
  '/images/superfoods/matcha.webp',
  '/images/superfoods/moring.webp',
  '/images/superfoods/moringa.webp',
  '/images/superfoods/olive-oil.webp',
  '/images/superfoods/parsley.webp',
  '/images/superfoods/pomegranate.webp',
  '/images/superfoods/pumpkin.webp',
  '/images/superfoods/purslane.webp',
  '/images/superfoods/red-cabbage.webp',
  '/images/superfoods/reishi.webp',
  '/images/superfoods/sea-moss.webp',
  '/images/superfoods/spinach.webp',
  '/images/superfoods/spirulina.webp',
  '/images/superfoods/sweet-potato.webp',
  '/images/superfoods/swiss-chard.webp',
  '/images/superfoods/turmeric.webp',
  '/images/superfoods/water-cress.webp',
  '/images/superfoods/wheatgrass.webp',
  '/images/superfoods/zucchini.webp',
  '/icons/rayo-hoja-192.png',
  '/icons/rayo-hoja-512.png',
  '/images/smoothies/alkaline_king.webp',
  '/images/smoothies/androgenic_peak.webp',
  '/images/smoothies/anti_viral_star.webp',
  '/images/smoothies/ashwagandha-calm.webp',
  '/images/smoothies/berry-immune.webp',
  '/images/smoothies/black_seed_cure.webp',
  '/images/smoothies/camu_camu_titan.webp',
  '/images/smoothies/cherry-reishi-dream.webp',
  '/images/smoothies/deep_sea_mineral.webp',
  '/images/smoothies/digestive_star.webp',
  '/images/smoothies/electric_violet.webp',
  '/images/smoothies/goji_zen.webp',
  '/images/smoothies/golden_shield.webp',
  '/images/smoothies/green-matcha-surge.webp',
  '/images/smoothies/heavy_metal_cleanse.webp',
  '/images/smoothies/himalayan_resin.webp',
  '/images/smoothies/jackfruit-fuel.webp',
  '/images/smoothies/kiwi-cleanse.webp',
  '/images/smoothies/lucuma-power.webp',
  '/images/smoothies/mesozoic_fiber.webp',
  '/images/smoothies/omega_7_radiance.webp',
  '/images/smoothies/papaya-digestive.webp',
  '/images/smoothies/prickly-gut-reset.webp',
  '/images/smoothies/saffron_sun.webp',
  '/images/smoothies/shatavari_bloom.webp',
  '/images/smoothies/star-defense.webp',
  '/images/smoothies/telomere_tonic.webp',
  '/images/smoothies/the_empress_glow.webp',
  '/images/smoothies/the_five_flavour_runner.webp',
  '/images/smoothies/the_fluid_flush.webp',
  '/images/smoothies/the_great_wall.webp',
  '/images/smoothies/tremella_dew.webp',
  '/images/smoothies/tropical-calm.webp',
  '/images/smoothies/tropical-immunity.webp',
  '/images/smoothies/tropical-stamina.webp',
  '/images/smoothies/viking_focus.webp',
  '/images/smoothies/white_pearl_zen.webp',
];

// Installl event - Cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache first, then dynamic fetch and cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Check if valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Dynamically cache WebP images and other assets we want offline (fonts, JS, CSS)
            if (
              event.request.url.includes('/images/') || 
              event.request.destination === 'image' ||
              event.request.destination === 'script' ||
              event.request.destination === 'style' ||
              event.request.destination === 'font'
            ) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return networkResponse;
          })
          .catch(() => {
            // Fallback for offline mode if the resource is not in cache (e.g., custom offline page)
            // For now, it fails silently or returns an empty Response to not crash
            // The browser will show the standard "No internet" if totally failing
            // But since index.html is cached, the app frame will load.
console.log('[Service Worker] Fetch failed; returning offline page instead.', event.request.url);
          });
      })
  );
});
