import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface ProteinFood {
  name: string;
  hindiName: string;
  serving: string;
  protein: number;
  calories: number;
  category: 'veg' | 'nonveg' | 'dairy';
  meals: string[];
  tip: string;
  icon: string;
}

const foods: ProteinFood[] = [
  // DAIRY
  {
    name: 'Paneer',
    hindiName: 'पनीर',
    serving: '100g',
    protein: 18,
    calories: 265,
    category: 'dairy',
    meals: ['Lunch', 'Dinner'],
    tip: 'Best absorbed when eaten with roti or rice. Homemade paneer has more protein than store-bought.',
    icon: '🧀',
  },
  {
    name: 'Greek Yogurt / Hung Curd',
    hindiName: 'हंग कर्ड',
    serving: '100g',
    protein: 10,
    calories: 97,
    category: 'dairy',
    meals: ['Breakfast', 'Snack'],
    tip: 'Strain regular dahi in muslin cloth overnight to make hung curd. Great with fruits or as raita.',
    icon: '🥛',
  },
  {
    name: 'Dahi (Curd)',
    hindiName: 'दही',
    serving: '200g (1 bowl)',
    protein: 7,
    calories: 120,
    category: 'dairy',
    meals: ['Lunch', 'Dinner', 'Snack'],
    tip: 'Have with every meal. Probiotic bacteria improve gut health which helps protein absorption.',
    icon: '🥣',
  },
  {
    name: 'Milk',
    hindiName: 'दूध',
    serving: '250ml (1 glass)',
    protein: 8,
    calories: 150,
    category: 'dairy',
    meals: ['Breakfast', 'Bedtime'],
    tip: 'Warm milk at bedtime contains casein protein that digests slowly — great for muscle recovery overnight.',
    icon: '🥛',
  },
  {
    name: 'Whey Protein (Doodh Protein)',
    hindiName: 'व्हे प्रोटीन',
    serving: '1 scoop (30g)',
    protein: 24,
    calories: 120,
    category: 'dairy',
    meals: ['Post-workout', 'Breakfast'],
    tip: 'Mix with milk instead of water for extra protein. Take within 30 minutes after workout.',
    icon: '💪',
  },
  // VEG
  {
    name: 'Chana Dal',
    hindiName: 'चना दाल',
    serving: '100g cooked',
    protein: 13,
    calories: 164,
    category: 'veg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Pair with rice for a complete amino acid profile. Add ghee for better fat-soluble vitamin absorption.',
    icon: '🫘',
  },
  {
    name: 'Moong Dal',
    hindiName: 'मूंग दाल',
    serving: '100g cooked',
    protein: 9,
    calories: 105,
    category: 'veg',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    tip: 'Easiest dal to digest — great for 60+ adults. Sprouted moong has 30% more protein and nutrients.',
    icon: '🌱',
  },
  {
    name: 'Rajma',
    hindiName: 'राजमा',
    serving: '100g cooked',
    protein: 9,
    calories: 127,
    category: 'veg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Rajma-chawal is a complete protein meal. Soak overnight and pressure cook for better digestion.',
    icon: '🫘',
  },
  {
    name: 'Chana (Kala/Safed)',
    hindiName: 'छोले / काला चना',
    serving: '100g cooked',
    protein: 15,
    calories: 164,
    category: 'veg',
    meals: ['Breakfast', 'Lunch', 'Snack'],
    tip: 'Boiled chana with lemon and salt is a perfect high-protein snack. Kala chana has more iron than safed.',
    icon: '⚫',
  },
  {
    name: 'Sattu',
    hindiName: 'सत्तू',
    serving: '50g (2 tbsp)',
    protein: 11,
    calories: 184,
    category: 'veg',
    meals: ['Breakfast', 'Pre-workout'],
    tip: 'Bihar\'s original protein powder! Mix with water, lemon, salt. Best pre-workout drink for seniors.',
    icon: '💪',
  },
  {
    name: 'Tofu',
    hindiName: 'टोफू',
    serving: '100g',
    protein: 8,
    calories: 76,
    category: 'veg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Use firm tofu in bhurji or sabzi instead of paneer to cut calories while keeping protein high.',
    icon: '🟨',
  },
  {
    name: 'Peanuts / Moongfali',
    hindiName: 'मूंगफली',
    serving: '30g (small handful)',
    protein: 8,
    calories: 170,
    category: 'veg',
    meals: ['Snack', 'Pre-workout'],
    tip: 'Natural peanut butter (no sugar added) is great