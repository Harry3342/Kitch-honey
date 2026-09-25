import { Product, SubscriptionBoxPlan, KenyanCounty } from '../types';

import heroImg from '../assets/images/hero_kenyan_honey_1790247364441.jpg';
import acaciaImg from '../assets/images/honey_acacia_baringo_1790247377201.jpg';
import forestImg from '../assets/images/honey_kakamega_forest_1790247386756.jpg';
import stinglessImg from '../assets/images/honey_melipona_stingless_1790247396682.jpg';
import subscriptionImg from '../assets/images/subscription_asali_box_1790247407582.jpg';
import honeycombHiveHero from '../assets/images/honeycomb_hive_hero_1790248790293.jpg';
import honeycombPatternBg from '../assets/images/honeycomb_pattern_bg_1790248801825.jpg';

export const HERO_IMAGE = honeycombHiveHero;
export const HONEYCOMB_HIVE_IMAGE = honeycombHiveHero;
export const HONEYCOMB_PATTERN_BG = honeycombPatternBg;
export const SUBSCRIPTION_IMAGE = subscriptionImg;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-baringo-acacia',
    name: 'Baringo Golden Wild Acacia Honey',
    swahiliTitle: 'Asali ya Mshikio ya Baringo',
    slug: 'baringo-wild-acacia',
    category: 'monofloral',
    tagline: 'Light amber, delicate floral notes from the semi-arid Great Rift Valley',
    description: 'Harvested directly from traditional log and Langstroth hives in the semi-arid thornbrush conservancies of Lake Baringo. High fructose-to-glucose balance prevents crystallization, leaving a velvety texture with subtle vanilla and wild acacia blossom notes.',
    tastingNotes: ['Wild acacia blossom', 'Subtle vanilla pod', 'Warm desert sun finish', 'Silky butterscotch'],
    recommendedUses: ['Morning lemon dawa', 'Specialty coffee & rooibos tea', 'Drizzled on aged goat cheese', 'Natural daily immunity'],
    priceKES: 1150,
    weightGrams: 500,
    stock: 14,
    reserved: 2,
    lowStockThreshold: 5,
    image: acaciaImg,
    fallbackColor: '#F59E0B',
    featured: true,
    quality: {
      batchNumber: 'BRG-AC-2026-09A',
      harvestDate: 'August 2026',
      moistureContent: 16.9,
      fructoseGlucoseRatio: 1.22,
      hmfLevel: 8.6,
      pollenGrainDensity: '92.4% Acacia Tortilis / Senegal',
      kebsCertificateNo: 'KEBS/EAS36-08119',
      apiaryRegion: 'Marigat & Kampi ya Samaki, Baringo County',
      leadBeekeeper: 'Lparmaroi Lemashon',
      cooperativeName: 'Baringo Pastoralists Apiary CBO'
    }
  },
  {
    id: 'prod-kakamega-rainforest',
    name: 'Kakamega Forest Raw Canopy Honey',
    swahiliTitle: 'Asali ya Msitu wa Kakamega',
    slug: 'kakamega-rainforest-raw',
    category: 'forest',
    tagline: 'Deep dark amber, bold botanical complexity from Kenya\'s last equatorial rainforest',
    description: 'A deeply pigmented, mineral-dense forest honey harvested along the fringes of the UNESCO-designated Kakamega equatorial canopy. Rich in polyphenols and wild bioactive enzymes from indigenous Elgon teak, Prunus africana, and climbing lianas.',
    tastingNotes: ['Caramelized fig', 'Damp earth & resin', 'Wild blackberry', 'Smoky cedar note'],
    recommendedUses: ['Chai ya Tangawizi (ginger tea)', 'Nyama choma glaze & barbecue marinades', 'Sore throat & cough soother', 'Morning fermented sourdough'],
    priceKES: 1350,
    weightGrams: 500,
    stock: 8,
    reserved: 1,
    lowStockThreshold: 4,
    image: forestImg,
    fallbackColor: '#78350F',
    featured: true,
    quality: {
      batchNumber: 'KKM-FOR-2026-07D',
      harvestDate: 'July 2026',
      moistureContent: 17.4,
      fructoseGlucoseRatio: 1.15,
      hmfLevel: 10.2,
      pollenGrainDensity: '88.7% Multi-floral Rainforest Canopy',
      kebsCertificateNo: 'KEBS/EAS36-09432',
      apiaryRegion: 'Buyangu Forest Reserve, Kakamega County',
      leadBeekeeper: 'Mama Salome Khamisi',
      cooperativeName: 'Kakamega Rainforest Community Apiaries'
    }
  },
  {
    id: 'prod-nandi-melipona',
    name: 'Nandi Hills Melipona Stingless Bee Elixir',
    swahiliTitle: 'Asali ya Kosikosi (Nyuki Wasiouma)',
    slug: 'nandi-melipona-stingless',
    category: 'medicinal',
    tagline: 'Rare micro-batch medicinal nectar with tangy citric acidity & concentrated propolis',
    description: 'Sourced from tiny indigenous stingless bees (Meliponula bocandei) dwelling in subterranean and hollow-trunk hives in the misty tea highlands of Nandi. Each hive yields merely 800ml annually. Renowned across East Africa for potent antimicrobial and gut-healing bioactive properties.',
    tastingNotes: ['Pleasant citric tang', 'Passionfruit blossom', 'Wild propolis resin', 'Light citrus acidity'],
    recommendedUses: ['One therapeutic teaspoon on empty stomach', 'Skin wound & blemish healing', 'Upper respiratory immune booster', 'Prebiotic digestif'],
    priceKES: 2850,
    weightGrams: 250,
    stock: 4,
    reserved: 0,
    lowStockThreshold: 3,
    image: stinglessImg,
    fallbackColor: '#D97706',
    featured: true,
    quality: {
      batchNumber: 'NDI-MEL-2026-06M',
      harvestDate: 'June 2026',
      moistureContent: 19.8, // Melipona naturally carries slightly higher water content
      fructoseGlucoseRatio: 1.34,
      hmfLevel: 5.1,
      pollenGrainDensity: '96.2% High-elevation Indigenous Highland Flora',
      kebsCertificateNo: 'KEBS/EAS36-10024',
      apiaryRegion: 'Aldai Sub-County, Nandi Hills',
      leadBeekeeper: 'Kipruto Arap Sang',
      cooperativeName: 'Nandi Indigenous Beekeepers Alliance'
    }
  },
  {
    id: 'prod-coastal-mangrove',
    name: 'Lamu Archipelago Coastal Mangrove Honey',
    swahiliTitle: 'Asali ya Mikoko ya Lamu',
    slug: 'lamu-coastal-mangrove',
    category: 'monofloral',
    tagline: 'Distinctive golden-amber with subtle saline floral mineral undertones',
    description: 'Harvested sustainably by Swahili traditional dhow beekeepers within the protected mangrove channels of Lamu Island and Kipungani. Coastal mangrove flowers infuse this raw honey with maritime trace minerals and a unique savory-sweet balance.',
    tastingNotes: ['Sea salt finish', 'Tropical blossom', 'Warm roasted almond', 'Sun-warmed molasses'],
    recommendedUses: ['Seafood glazes & grilled prawns', 'Warm spiced milk', 'Fresh fruit platters with pawpaw and lime', 'Gourmet baking'],
    priceKES: 1450,
    weightGrams: 500,
    stock: 9,
    reserved: 1,
    lowStockThreshold: 4,
    image: acaciaImg, // high quality honey jar
    fallbackColor: '#B45309',
    quality: {
      batchNumber: 'LAM-MNG-2026-08S',
      harvestDate: 'August 2026',
      moistureContent: 17.1,
      fructoseGlucoseRatio: 1.19,
      hmfLevel: 7.9,
      pollenGrainDensity: '91.0% Rhizophora & Avicennia Mangrove',
      kebsCertificateNo: 'KEBS/EAS36-07851',
      apiaryRegion: 'Shela & Kipungani Mangrove Creeks, Lamu County',
      leadBeekeeper: 'Fundi Athman Bwana',
      cooperativeName: 'Lamu Archipelago Seafarers Apiculture Guild'
    }
  },
  {
    id: 'prod-mt-kenya-creamed',
    name: 'Mount Kenya Ginger & Cinnamon Whipped Honey',
    swahiliTitle: 'Asali Laini ya Mlima Kenya na Tangawizi',
    slug: 'mt-kenya-ginger-creamed',
    category: 'infusions',
    tagline: 'Ultra-smooth creamed raw comb honey infused with sun-dried Meru spices',
    description: 'Cold-creamed to microscopic crystal perfection without heat, blended with freshly ground organic ginger roots from Meru and highland sweet cinnamon bark. Spreads like rich butter on warm toasts, mandazis, and pancakes.',
    tastingNotes: ['Zesty ginger warmth', 'Sweet ceylon cinnamon', 'Velvety creamed texture', 'Honeyed chai essence'],
    recommendedUses: ['Spread on warm mahamri or toast', 'Stirred into morning Kenyan chai', 'Natural soothing throat balm', 'Oatmeal & muesli topping'],
    priceKES: 1250,
    weightGrams: 400,
    stock: 16,
    reserved: 0,
    lowStockThreshold: 6,
    image: forestImg,
    fallbackColor: '#CA8A04',
    quality: {
      batchNumber: 'MTK-CRM-2026-09C',
      harvestDate: 'September 2026',
      moistureContent: 17.0,
      fructoseGlucoseRatio: 1.17,
      hmfLevel: 6.8,
      pollenGrainDensity: '85.4% Mount Kenya Foothill Flora + Meru Spices',
      kebsCertificateNo: 'KEBS/EAS36-11208',
      apiaryRegion: 'Nanyuki & Timau Foothills, Meru/Laikipia Border',
      leadBeekeeper: 'Faith Nyambura',
      cooperativeName: 'Mount Kenya Women Agroforestry & Apiaries'
    }
  },
  {
    id: 'prod-mau-forest-comb',
    name: 'Mau Forest Raw Natural Honeycomb Jar',
    swahiliTitle: 'Asali na Masega ya Asili kutoka Mau',
    slug: 'mau-forest-comb-honey',
    category: 'comb',
    tagline: 'Pure virgin beeswax comb submerged in fresh unfiltered forest nectar',
    description: 'The purest way to experience honey as the bees intended. Hand-cut slabs of natural wax comb dripping with unfiltered golden nectar. Chew the aromatic wax like natural chewing gum to release beneficial propolis and pollen.',
    tastingNotes: ['Floral wax crunch', 'Intense raw blossom sweetness', 'Cedar resin', 'Alpine forest herbs'],
    recommendedUses: ['Centerpiece for grazing boards', 'Paired with aged cheddar or blue cheese', 'Chewed raw for oral and sinus health', 'Dessert garnish'],
    priceKES: 1750,
    weightGrams: 450,
    stock: 6,
    reserved: 2,
    lowStockThreshold: 4,
    image: honeycombPatternBg,
    fallbackColor: '#92400E',
    quality: {
      batchNumber: 'MAU-CMB-2026-08K',
      harvestDate: 'August 2026',
      moistureContent: 16.5,
      fructoseGlucoseRatio: 1.20,
      hmfLevel: 4.8,
      pollenGrainDensity: '95.1% Dombeya & Olea Africana Comb',
      kebsCertificateNo: 'KEBS/EAS36-09012',
      apiaryRegion: 'Mau Escarpment Forest, Nakuru / Narok County',
      leadBeekeeper: 'Ole Senteu Kiprono',
      cooperativeName: 'Mau Conservation Honey Keepers'
    }
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionBoxPlan[] = [
  {
    id: 'sub-explorer',
    title: 'The Terroir Discovery Box',
    tagline: 'Two revolving single-origin Kenyan honeys with origin passports',
    description: 'Perfect for households who appreciate subtle seasonal nuances. Every cycle brings two distinct 500g glass jars from contrasting Kenyan micro-climates (e.g. Desert Acacia vs. Coastal Mangrove) with tasting cards.',
    frequencyOptions: ['monthly', 'bimonthly'],
    defaultFrequency: 'monthly',
    priceKES: 2400,
    originalValueKES: 2700,
    image: subscriptionImg,
    includedItems: [
      '2x Revolving 500g Terroir Jars (Seasonal Rotation)',
      'Quarterly Beekeeper Origin Story & Lab Certificate',
      'Free Express Delivery within Nairobi Metro',
      'KES 150 Kitch Loyalty Credit on every renewal',
      'Access to private seasonal micro-batch releases'
    ],
    freeDelivery: true,
    loyaltyPointsPerCycle: 120,
    bestFor: 'Couples & tea/coffee connoisseurs wanting variety',
    popular: true
  },
  {
    id: 'sub-wellness',
    title: 'Family Wellness & Immunity Crate',
    tagline: 'Generous raw honey staple + rare medicinal stingless bee elixir + pure beeswax candle',
    description: 'Designed for healthy Kenyan families. Keeps your pantry stocked with 1kg daily raw Acacia/Forest honey for daily dawa and chai, plus a dedicated jar of rare Nandi Melipona stingless bee honey for seasonal colds and healing.',
    frequencyOptions: ['monthly', 'bimonthly'],
    defaultFrequency: 'monthly',
    priceKES: 4600,
    originalValueKES: 5350,
    image: subscriptionImg,
    includedItems: [
      '1x 1kg Daily Raw Baringo Acacia or Kakamega Honey',
      '1x 250g Medicinal Nandi Stingless Bee Honey (Melipona)',
      '1x Hand-rolled Pure Kenyan Beeswax Taper Candle',
      '1x Glass Vial of Raw Highland Bee Pollen Granules (50g)',
      'Free Priority Delivery Countrywide (Nairobi & Fargo Upcountry)'
    ],
    freeDelivery: true,
    loyaltyPointsPerCycle: 250,
    bestFor: 'Families prioritizing daily clean immunity & pure unadulterated sweetness',
    popular: false
  },
  {
    id: 'sub-connoisseur',
    title: 'Artisan Beekeeper Reserve Crate',
    tagline: 'Quarterly ultra-rare micro-batches, raw comb, and handcrafted olive wood dipper',
    description: 'An exclusive membership strictly capped at 250 collectors across East Africa. Receive limited-edition apiary harvests, virgin raw comb, and direct sponsorship of a youth beekeeping hive in Baringo or Kakamega.',
    frequencyOptions: ['quarterly'],
    defaultFrequency: 'quarterly',
    priceKES: 6800,
    originalValueKES: 8100,
    image: subscriptionImg,
    includedItems: [
      '3x Ultra-rare Reserve Harvests (Mangrove, Stingless Bee & Mau Comb)',
      'Hand-carved Kenyan Olive Wood Honey Dipper & Dipping Dish',
      'Direct named sponsorship of 1 modern top-bar hive with GPS updates',
      'VIP invitation to the annual kakamega rainforest harvest festival',
      'Complimentary concierge replacement if jar breaks in transit'
    ],
    freeDelivery: true,
    loyaltyPointsPerCycle: 400,
    bestFor: 'Gourmands, corporate gifting, and passionate conservation champions'
  }
];

export const KENYAN_COUNTIES: KenyanCounty[] = [
  { code: 'NBO', name: 'Nairobi (Central, Westlands, Kilimani, Karen, Gigiri)', zone: 'nairobi_express', feeKES: 200, estimatedDelivery: 'Same-day (Under 3 hours by Boda Rider)' },
  { code: 'KBU', name: 'Kiambu (Ruiru, Kikuyu, Thika, Limuru)', zone: 'nairobi_metro', feeKES: 280, estimatedDelivery: 'Next day morning' },
  { code: 'MCH', name: 'Machakos (Athi River, Syokimau, Machakos Town)', zone: 'nairobi_metro', feeKES: 280, estimatedDelivery: 'Next day morning' },
  { code: 'KJD', name: 'Kajiado (Kitengela, Rongai, Ngong)', zone: 'nairobi_metro', feeKES: 280, estimatedDelivery: 'Next day morning' },
  { code: 'MSA', name: 'Mombasa (Nyali, Island, Bamburi, Diani)', zone: 'major_towns', feeKES: 390, estimatedDelivery: '24 hours via Fargo Courier' },
  { code: 'KSM', name: 'Kisumu (Milimani, City Center, Riat)', zone: 'major_towns', feeKES: 390, estimatedDelivery: '24 hours via Fargo Courier' },
  { code: 'NKR', name: 'Nakuru (Milimani, Section 58, Njoro)', zone: 'major_towns', feeKES: 350, estimatedDelivery: '24 hours via Fargo Courier' },
  { code: 'ELD', name: 'Uasin Gishu (Eldoret, Elgon View)', zone: 'major_towns', feeKES: 390, estimatedDelivery: '24 hours via Fargo Courier' },
  { code: 'NYI', name: 'Nyeri & Mount Kenya Region', zone: 'upcountry', feeKES: 390, estimatedDelivery: '24-48 hours via G4S / Fargo' },
  { code: 'KTN', name: 'Kilifi & Malindi', zone: 'upcountry', feeKES: 420, estimatedDelivery: '24-48 hours via Fargo Courier' },
  { code: 'OTR', name: 'Other Counties (Upcountry G4S / Fargo Station Pickup)', zone: 'upcountry', feeKES: 450, estimatedDelivery: '48 hours to nearest county station' }
];

export const KENYAN_TERROIRS = [
  {
    region: 'Great Rift Valley (Baringo & Turkana)',
    floralSource: 'Acacia Tortilis, Desert Thorn & Desert Date',
    elevation: '900m - 1,400m',
    climate: 'Semi-arid savannah with intense sunshine',
    harvestSeason: 'February & August',
    tasteSignature: 'Delicate light amber, high natural fructose, silky sweet floral finish'
  },
  {
    region: 'Kakamega Rainforest Canopy',
    floralSource: 'Elgon Teak, Croton megalocarpus & Wild Guava',
    elevation: '1,500m - 1,700m',
    climate: 'High-rainfall dense equatorial rainforest',
    harvestSeason: 'June & December',
    tasteSignature: 'Deep dark treacle, medicinal woodiness, rich antioxidant polyphenols'
  },
  {
    region: 'Nandi Hills Highland Cloud Forests',
    floralSource: 'Highland herbs, wild ferns & tea blossoms',
    elevation: '2,000m - 2,400m',
    climate: 'Mist-draped tropical highland ridges',
    harvestSeason: 'Year-round micro-trickle (Melipona stingless bees)',
    tasteSignature: 'Sharp citric tang, passionfruit notes, concentrated therapeutic propolis'
  },
  {
    region: 'Lamu Archipelago Marine Mangroves',
    floralSource: 'Red and Black Mangrove Creeks (Rhizophora mucronata)',
    elevation: '0m (Sea Level)',
    climate: 'Equatorial maritime coastline with tidal creek flows',
    harvestSeason: 'September - October',
    tasteSignature: 'Golden hue, subtle savory mineral note, crisp tropical honeyed finish'
  }
];
