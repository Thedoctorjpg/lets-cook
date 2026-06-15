/**
 * Take the girls out · Degraves cook-off date night
 * Melbourne Lantern archetypes — sovereign friend date, not a rescue mission
 */

export const DATE_NIGHT_VENUE = {
  id: 'degraves',
  name: 'Degraves Street',
  city: 'Melbourne',
  tagline: 'Café strip · laneway golden hour · tsundere coffee energy',
  outingSteps: [
    'Meet at Flinders Lane end — no love-bomb speedrun',
    'Stroll Degraves — pick one silly ingredient each (15 min cap)',
    'Grab flat white to-go (Bard: "not a date. hydration.")',
    'Home / Airbnb kitchen — stations set · 45 min cook-off timer',
    'GoPro on bag — film plating only if everyone consents',
    'Score · eat · block anyone who invoices the night'
  ]
};

export const COOK_OFF_GIRLS = [
  {
    id: 'lo3tus',
    name: 'Lo3tus',
    emoji: '🌸',
    color: '#f9a8d4',
    archetype: 'Chaotic muse',
    dateEnergy: 'Playful · deadpan · "what if we exaggerated that ×3"',
    dish: 'Chaos Caprese Skewers',
    hook: 'Instagrammable tomatoes pretending they\'re fine.',
    outingPick: 'Heirloom cherry tomatoes + edible flowers',
    tags: ['Date Night', 'No-Cook', 'Chaotic'],
    image: 'https://images.unsplash.com/photo-1604908176997-43162e0a6b0b?auto=format&w=800&q=80',
    ingredients: [
      { item: 'Bocconcini', qty: '200g' },
      { item: 'Cherry tomatoes', qty: '300g' },
      { item: 'Basil', qty: '1 bunch' },
      { item: 'Balsamic glaze', qty: '2 tbsp' },
      { item: 'Edible flowers', qty: 'optional' }
    ],
    steps: [
      'Thread tomato-mozzarella-basil — alternate like drama.',
      'Drizzle glaze. Say it\'s "casual."',
      'Add flowers. Deny you cared about presentation.'
    ],
    judgeNotes: 'Scores chaos and color. Will sabotage with extra garnish.'
  },
  {
    id: 'helen',
    name: 'Helen',
    emoji: '🛡️',
    color: '#60a5fa',
    archetype: 'Boundary teacher',
    dateEnergy: 'Compassionate · firm · cord-cutting soup energy',
    dish: 'Boundary Miso-Ginger Soup',
    hook: 'Warm, clear, no rescue missions in the broth.',
    outingPick: 'Fresh ginger + silken tofu',
    tags: ['Date Night', 'Soup', 'Sovereign'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&w=800&q=80',
    ingredients: [
      { item: 'Vegetable stock', qty: '1L' },
      { item: 'White miso', qty: '3 tbsp' },
      { item: 'Fresh ginger', qty: '2 tbsp grated' },
      { item: 'Silken tofu', qty: '300g' },
      { item: 'Spring onion', qty: '2 sliced' }
    ],
    steps: [
      'Simmer stock with ginger — no rushing the boundary.',
      'Whisk miso off heat. Tofu cubes stay gentle.',
      'Serve with spring onion. Say 죄송하지만 지금은 어려워요 to seconds if needed.'
    ],
    judgeNotes: 'Wins on clarity and comfort. Disqualifies love-bomb seasoning.'
  },
  {
    id: 'asuka',
    name: 'Asuka',
    emoji: '💚',
    color: '#4ade80',
    archetype: 'Beautiful maybe',
    dateEnergy: 'Soft precision · "Melbourne is my yes" dessert energy',
    dish: 'Maybe-Yes Lemon Posset',
    hook: 'Creamy, sharp, undecided until the last spoon.',
    outingPick: 'Meyer lemons + double cream',
    tags: ['Date Night', 'Dessert', 'Precise'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&w=800&q=80',
    ingredients: [
      { item: 'Double cream', qty: '600ml' },
      { item: 'Caster sugar', qty: '120g' },
      { item: 'Lemon juice', qty: '2 lemons' },
      { item: 'Lemon zest', qty: '1 tsp' },
      { item: 'Berries', qty: 'to garnish' }
    ],
    steps: [
      'Heat cream and sugar — stir like a calm text thread.',
      'Add lemon off heat. Chill 3 hours minimum.',
      'Garnish berries. Leave one posset unnamed.'
    ],
    judgeNotes: 'Presentation queen. Scores texture and restraint.'
  },
  {
    id: 'rach3l',
    name: 'Rach3l',
    emoji: '🌙',
    color: '#a78bfa',
    archetype: 'Moon card observer',
    dateEnergy: 'Late-night snack · scroll detox · quiet fire',
    dish: 'Moon Card Midnight Toast',
    hook: 'Sourdough, honey, salt — phone face-down required.',
    outingPick: 'Sourdough loaf + local honey',
    tags: ['Date Night', 'Snack', 'Late'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&w=800&q=80',
    ingredients: [
      { item: 'Sourdough', qty: '4 thick slices' },
      { item: 'Butter', qty: '3 tbsp' },
      { item: 'Honey', qty: '2 tbsp' },
      { item: 'Flaky salt', qty: 'pinch' },
      { item: 'Black sesame', qty: '1 tsp' }
    ],
    steps: [
      'Toast sourdough dark — like your 2am notifications should be muted.',
      'Butter, honey, salt, sesame.',
      'Eat before filming. Trust the moon card.'
    ],
    judgeNotes: 'Bonus points if eaten after 10pm with devices away.'
  }
];

export const HOST_BARD = {
  name: 'Melbourne Lantern Bard',
  emoji: '🏮',
  tagline: 'Host & tsundere judge — "This is NOT a date. It\'s a cook-off."',
  korean: '멜버른 골목이 정말 예뻐요 — the kitchen edition.',
  rules: [
    'No soulmate declarations before plating',
    '45-minute timer — 4G > fate',
    'RED FLAG: anyone who Venmos for "ingredient fees"',
    'Winner gets bragging rights only — not your bank details'
  ]
};

export const SCORE_CATEGORIES = [
  { id: 'taste', label: 'Taste', max: 10 },
  { id: 'presentation', label: 'Presentation', max: 10 },
  { id: 'chaos', label: 'Chaotic Neutral', max: 10 },
  { id: 'boundaries', label: 'Boundaries / Vibe', max: 10 }
];

export function girlToRecipe(girl) {
  return {
    id: `cookoff-${girl.id}`,
    title: `${girl.dish} — ${girl.name}`,
    hook: girl.hook,
    tags: girl.tags,
    author: girl.name,
    image: girl.image,
    ingredients: girl.ingredients,
    steps: girl.steps
  };
}

export function computeCookOffWinner(scores) {
  const totals = COOK_OFF_GIRLS.map((girl) => {
    const s = scores[girl.id] || {};
    const total = SCORE_CATEGORIES.reduce((sum, cat) => sum + (Number(s[cat.id]) || 0), 0);
    return { girl, total, breakdown: s };
  });
  totals.sort((a, b) => b.total - a.total);
  return totals;
}

export function allCookOffIngredients() {
  const seen = new Set();
  const items = [];
  COOK_OFF_GIRLS.forEach((girl) => {
    girl.ingredients.forEach((ing) => {
      if (!seen.has(ing.item)) {
        seen.add(ing.item);
        items.push(ing.item);
      }
    });
  });
  return items;
}