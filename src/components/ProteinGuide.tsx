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
    tip: 'Natural peanut butter (no sugar added) is great on roti. Peanuts are the most affordable protein source.',
    icon: '🥜',
  },
  {
    name: 'Soya Chunks',
    hindiName: 'सोया बड़ी',
    serving: '50g dry',
    protein: 25,
    calories: 173,
    category: 'veg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Highest plant protein source! Soak in hot water, squeeze dry, add to curries or pulao.',
    icon: '🟤',
  },
  {
    name: 'Masoor Dal',
    hindiName: 'मसूर दाल',
    serving: '100g cooked',
    protein: 9,
    calories: 116,
    category: 'veg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Quickest cooking dal — no soaking needed. High in iron which is important for energy in older adults.',
    icon: '🫘',
  },
  // NON VEG
  {
    name: 'Eggs',
    hindiName: 'अंडा',
    serving: '2 whole eggs',
    protein: 12,
    calories: 140,
    category: 'nonveg',
    meals: ['Breakfast', 'Post-workout'],
    tip: 'Eat the whole egg — yolk has Vitamin D and B12 critical for bone and nerve health in seniors.',
    icon: '🥚',
  },
  {
    name: 'Chicken Breast',
    hindiName: 'चिकन',
    serving: '100g cooked',
    protein: 31,
    calories: 165,
    category: 'nonveg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Highest protein per calorie of all foods. Tandoori chicken or boiled chicken is healthiest — avoid fried.',
    icon: '🍗',
  },
  {
    name: 'Fish (Rohu/Katla)',
    hindiName: 'मछली',
    serving: '100g cooked',
    protein: 22,
    calories: 97,
    category: 'nonveg',
    meals: ['Lunch', 'Dinner'],
    tip: 'Best protein for 60+ adults! Omega-3 in fish reduces joint inflammation and improves heart health.',
    icon: '🐟',
  },
  {
    name: 'Tuna (Canned)',
    hindiName: 'टूना',
    serving: '100g',
    protein: 25,
    calories: 116,
    category: 'nonveg',
    meals: ['Lunch', 'Snack'],
    tip: 'Easiest high-protein meal — mix with onion, lemon, green chilli. Available in Big Bazaar/Amazon.',
    icon: '🐟',
  },
];

const categories = [
  { id: 'all', label: '🍽️ All Foods' },
  { id: 'veg', label: '🥦 Vegetarian' },
  { id: 'dairy', label: '🥛 Dairy' },
  { id: 'nonveg', label: '🍗 Non-Veg' },
];

export default function ProteinGuide() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [weight, setWeight] = useState('91');

  const filtered = foods.filter((f) => {
    const matchCat = category === 'all' || f.category === category;
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.hindiName.includes(search);
    return matchCat && matchSearch;
  });

  const dailyTarget = weight ? Math.round(parseFloat(weight) * 1.6) : 120;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Protein Guide</h2>
        <p className="text-gray-500 mt-1">25+ Indian high-protein foods for 60+ adults</p>
      </div>

      {/* Protein Target Calculator */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 mb-6 text-white">
        <p className="font-bold text-lg mb-3">🎯 Your Daily Protein Target</p>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-orange-100 text-sm mb-1">Your weight (kg)</p>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-24 bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white font-bold text-lg placeholder-white/60 focus:outline-none"
            />
          </div>
          <div className="text-4xl">→</div>
          <div>
            <p className="text-orange-100 text-sm mb-1">Daily target</p>
            <p className="text-4xl font-bold">{dailyTarget}g</p>
          </div>
        </div>
        <p className="text-orange-100 text-xs mt-3">
          Formula: 1.6g × body weight. Seniors need more protein to prevent muscle loss (sarcopenia).
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search foods... (e.g. paneer, dal, egg)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-400"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              category === cat.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Food Count */}
      <p className="text-sm text-gray-400 mb-4 font-medium">
        Showing {filtered.length} foods
      </p>

      {/* Food Cards */}
      <div className="space-y-3">
        {filtered.map((food) => (
          <div
            key={food.name}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
          >
            {/* Main Row */}
            <div
              className="p-4 cursor-pointer"
              onClick={() =>
                setExpanded(expanded === food.name ? null : food.name)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{food.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">{food.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        food.category === 'veg'
                          ? 'bg-emerald-100 text-emerald-700'
                          : food.category === 'dairy'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {food.category === 'veg' ? '🥦 Veg' : food.category === 'dairy' ? '🥛 Dairy' : '🍗 Non-veg'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {food.hindiName} • {food.serving}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange-500">{food.protein}g</p>
                    <p className="text-xs text-gray-400">protein</p>
                  </div>
                  {expanded === food.name
                    ? <ChevronUp size={18} className="text-gray-400" />
                    : <ChevronDown size={18} className="text-gray-400" />
                  }
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expanded === food.name && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3 mt-3 mb-3">
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-orange-500">{food.protein}g</p>
                    <p className="text-xs text-gray-500">Protein</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-gray-700">{food.calories}</p>
                    <p className="text-xs text-gray-500">Calories</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {food.meals.map((meal) => (
                    <span key={meal} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {meal}
                    </span>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700 mb-1">💡 Senior Tip</p>
                  <p className="text-sm text-amber-800">{food.tip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Daily Meal Plan */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
        <p className="font-bold text-gray-800 text-base mb-4">
          🍽️ Sample High-Protein Day ({dailyTarget}g target)
        </p>
        <div className="space-y-3">
          {[
            { meal: '🌅 Breakfast', foods: 'Sattu drink + 2 eggs + 1 glass milk', protein: 35 },
            { meal: '☀️ Lunch', foods: 'Dal + Paneer sabzi + Curd + Roti', protein: 40 },
            { meal: '🌤️ Snack', foods: 'Boiled chana + Peanuts', protein: 20 },
            { meal: '🌙 Dinner', foods: 'Fish/Chicken + Dal + Sabzi + Rice', protein: 40 },
          ].map((item) => (
            <div key={item.meal} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-sm text-gray-800">{item.meal}</p>
                <p className="text-sm text-gray-500 mt-0.5">{item.foods}</p>
              </div>
              <span className="text-orange-500 font-bold text-sm whitespace-nowrap ml-3">
                ~{item.protein}g
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <p className="font-bold text-gray-800">Total</p>
            <p className="font-bold text-orange-500 text-lg">~135g protein</p>
          </div>
        </div>
      </div>

    </div>
  );
}