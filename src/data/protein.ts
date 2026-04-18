import { ProteinFood } from '../types';

export const proteinFoods: ProteinFood[] = [
  {
    name: 'Paneer (Cottage Cheese)',
    serving: '100g',
    protein: 18,
    description: 'A complete vegetarian protein rich in casein, which digests slowly — ideal for preventing overnight muscle breakdown.',
    meals: [
      'Paneer bhurji with capsicum and onion (scrambled, no butter)',
      'Grilled paneer tikka with mint chutney',
      'Palak paneer with 1 roti (use minimal oil)',
      'Paneer salad with cucumber, tomato, lemon, and chaat masala',
    ],
    icon: '🧀',
  },
  {
    name: 'Masoor / Moong Dal',
    serving: '1 cup cooked',
    protein: 18,
    description: 'High in plant protein and fiber. Moong dal is easy to digest and excellent for gut health. Pairs well with rice or roti for complete amino acids.',
    meals: [
      'Yellow moong dal with jeera tadka (low oil)',
      'Masoor dal with brown rice',
      'Moong dal chilla (savory pancake) with chutney',
      'Mixed dal soup with vegetables',
    ],
    icon: '🫘',
  },
  {
    name: 'Chicken Breast',
    serving: '100g cooked',
    protein: 31,
    description: 'The highest protein-per-calorie animal food. Lean chicken breast supports muscle repair and fat loss simultaneously — a perfect post-workout choice.',
    meals: [
      'Grilled chicken with salad and raita',
      'Chicken curry (low oil) with 1 roti',
      'Boiled chicken and vegetable soup',
      'Tandoori chicken (grilled, not fried) with mint chutney',
    ],
    icon: '🍗',
  },
  {
    name: 'Soya Chunks (Nutri-Nuggets)',
    serving: '50g dry',
    protein: 25,
    description: 'One of the richest plant protein sources available in India. Highly affordable, very high protein, and versatile in cooking. Contains all essential amino acids.',
    meals: [
      'Soya chunks curry with tomato-onion base',
      'Soya keema with peas and spices',
      'Soya chunks pulao (use brown rice)',
      'Soya stir-fry with bell peppers and garlic',
    ],
    icon: '🌿',
  },
  {
    name: 'Mixed Sprouts',
    serving: '1 cup',
    protein: 8,
    description: 'Sprouting increases protein bioavailability and adds enzymes. Rich in B vitamins and zinc which support testosterone levels important for men over 60.',
    meals: [
      'Sprout salad with lemon, chaat masala, onion, tomato',
      'Sprout chaat with tamarind and green chutney',
      'Stir-fried sprouts with cumin and turmeric',
      'Sprout soup with ginger and pepper',
    ],
    icon: '🌱',
  },
  {
    name: 'Greek Yogurt / Dahi',
    serving: '200g',
    protein: 12,
    description: 'Rich in whey protein and probiotics for gut health. Thick homemade curd or hung curd is excellent. Easy to digest and soothing for the digestive system.',
    meals: [
      'Hung curd with cucumber (low-calorie snack)',
      'Raita with grated carrot and coriander',
      'Curd rice with light seasoning',
      'Smoothie: dahi + banana + a pinch of turmeric',
    ],
    icon: '🥛',
  },
  {
    name: 'Eggs',
    serving: '2 whole eggs',
    protein: 12,
    description: 'Highest quality protein with a biological value of 100. Egg yolks provide vitamin D and B12 — nutrients commonly deficient in men over 60.',
    meals: [
      'Boiled eggs with black pepper and rock salt',
      'Egg white omelette with vegetables',
      'Anda bhurji (scrambled) with onion and tomato',
      'Poached eggs on toast with a side of salad',
    ],
    icon: '🥚',
  },
  {
    name: 'Roasted Chana (Bengal Gram)',
    serving: '50g',
    protein: 10,
    description: 'An ideal high-protein snack requiring no cooking. High in fiber to control blood sugar — especially important for older adults managing insulin sensitivity.',
    meals: [
      'Plain roasted chana as a mid-morning snack',
      'Chana chaat with onion, lemon, and spices',
      'Roasted chana mixed with murmura and peanuts',
      'Boiled kala chana with chopped onion and lemon',
    ],
    icon: '🟤',
  },
];

export const dailyProteinTarget = 120;

export const mealPlan = {
  earlyMorning: {
    time: '6:30 AM',
    label: 'Early Morning',
    items: ['5–6 soaked almonds', '1 glass warm water with lemon'],
  },
  breakfast: {
    time: '8:00 AM',
    label: 'Breakfast',
    items: ['Moong dal chilla (2 pieces)', 'Hung curd (100g)', '1 banana'],
  },
  midMorning: {
    time: '10:30 AM',
    label: 'Mid-Morning Snack',
    items: ['Roasted chana (50g)', '1 glass buttermilk (chaas)'],
  },
  lunch: {
    time: '1:00 PM',
    label: 'Lunch',
    items: ['2 roti', 'Dal (1 cup)', 'Sabzi (1 cup)', 'Salad', 'Curd (100g)'],
  },
  preWorkout: {
    time: '4:00 PM',
    label: 'Pre-Workout',
    items: ['Paneer (50g) or 2 boiled eggs', '1 banana', 'Green tea'],
  },
  postWorkout: {
    time: '6:30 PM',
    label: 'Post-Workout',
    items: ['Soya chunks curry (100g cooked)', '1 cup brown rice or 1 roti'],
  },
  dinner: {
    time: '8:00 PM',
    label: 'Dinner',
    items: ['Grilled chicken / paneer (100g)', 'Mixed vegetable soup', 'Salad with sprouts'],
  },
};
