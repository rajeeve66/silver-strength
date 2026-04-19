import { useState } from 'react';
import { Search, Clock, Zap, ChefHat, Heart } from 'lucide-react';
import { Profile } from '../types';

interface Recipe {
  id: string;
  name: string;
  hindiName: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cookTime: number;
  protein: number;
  calories: number;
  ingredients: string[];
  steps: string[];
  seniorTip: string;
  tags: string[];
}

interface RecipeGuideProps {
  profile: Profile | null;
}

const categoryColors: Record<string, string> = {
  breakfast: 'bg-yellow-100 text-yellow-700',
  lunch: 'bg-green-100 text-green-700',
  dinner: 'bg-blue-100 text-blue-700',
  snack: 'bg-purple-100 text-purple-700',
};

const ALL_RECIPES: Recipe[] = [
  // ========== BREAKFAST (25) ==========
  {
    id: 'b1', name: 'Moong Dal Chilla', hindiName: 'मूंग दाल चीला',
    category: 'breakfast', cookTime: 20, protein: 18, calories: 220,
    ingredients: ['1 cup moong dal (soaked)', '1 onion chopped', '1 green chilli', '1 tsp cumin', 'Salt to taste', '1 tsp oil'],
    steps: ['Soak moong dal for 2 hours and grind to paste', 'Mix onion, chilli, cumin, salt', 'Pour batter on hot tawa like dosa', 'Cook both sides until golden', 'Serve with green chutney'],
    seniorTip: 'Easy to digest. Add ginger for better digestion. Skip chilli if stomach is sensitive.',
    tags: ['high-protein', 'vegetarian', 'weight-loss']
  },
  {
    id: 'b2', name: 'Egg White Omelette', hindiName: 'अंडे का ऑमलेट',
    category: 'breakfast', cookTime: 10, protein: 22, calories: 180,
    ingredients: ['4 egg whites', '1 onion chopped', '1 tomato chopped', '1 green chilli', 'Salt and pepper', '1 tsp oil'],
    steps: ['Whisk egg whites until frothy', 'Heat oil in pan', 'Add onion, tomato, chilli', 'Pour egg whites over vegetables', 'Fold and serve hot'],
    seniorTip: 'Egg whites are pure protein with zero fat. Add turmeric for anti-inflammatory benefits.',
    tags: ['high-protein', 'non-veg', 'quick']
  },
  {
    id: 'b3', name: 'Sattu Drink', hindiName: 'सत्तू शर्बत',
    category: 'breakfast', cookTime: 5, protein: 12, calories: 150,
    ingredients: ['4 tbsp sattu powder', '1 glass water', '1 lemon juice', 'Black salt', '1 tsp roasted cumin', 'Fresh mint'],
    steps: ['Mix sattu in water thoroughly', 'Add lemon juice and black salt', 'Add roasted cumin powder', 'Mix well and add ice', 'Garnish with mint and serve'],
    seniorTip: 'Bihar\'s original protein drink. Cooling for summers, energising for mornings. Best pre-workout drink.',
    tags: ['high-protein', 'vegetarian', 'quick', 'pre-workout']
  },
  {
    id: 'b4', name: 'Paneer Bhurji', hindiName: 'पनीर भुर्जी',
    category: 'breakfast', cookTime: 15, protein: 20, calories: 280,
    ingredients: ['200g paneer crumbled', '1 onion chopped', '2 tomatoes chopped', '1 tsp turmeric', '1 tsp cumin', 'Salt to taste', '1 tsp oil'],
    steps: ['Heat oil and add cumin', 'Saute onions until golden', 'Add tomatoes and cook', 'Add turmeric and salt', 'Add crumbled paneer and mix', 'Cook 5 minutes and serve'],
    seniorTip: 'Use homemade paneer for more protein. Eat with whole wheat roti for complete nutrition.',
    tags: ['high-protein', 'vegetarian', 'filling']
  },
  {
    id: 'b5', name: 'Greek Yogurt Bowl', hindiName: 'हंग कर्ड बाउल',
    category: 'breakfast', cookTime: 5, protein: 15, calories: 200,
    ingredients: ['200g hung curd', '1 banana sliced', '1 tbsp honey', '2 tbsp mixed seeds', '5 almonds chopped', 'Pinch of cinnamon'],
    steps: ['Take hung curd in bowl', 'Add banana slices', 'Drizzle honey', 'Top with seeds and almonds', 'Sprinkle cinnamon and serve'],
    seniorTip: 'Make hung curd by straining regular dahi overnight. Seeds provide omega-3 for joint health.',
    tags: ['high-protein', 'vegetarian', 'quick', 'no-cook']
  },
  {
    id: 'b6', name: 'Sprouted Moong Salad', hindiName: 'अंकुरित मूंग सलाद',
    category: 'breakfast', cookTime: 10, protein: 14, calories: 160,
    ingredients: ['1 cup sprouted moong', '1 tomato chopped', '1 cucumber chopped', '1 lemon juice', 'Black salt', 'Chaat masala', 'Coriander leaves'],
    steps: ['Steam sprouts for 5 minutes', 'Mix with vegetables', 'Add lemon juice and spices', 'Toss well', 'Garnish with coriander and serve'],
    seniorTip: 'Sprouting increases protein by 30%. Steam instead of eating raw for easier digestion at 60+.',
    tags: ['high-protein', 'vegetarian', 'light', 'weight-loss']
  },
  {
    id: 'b7', name: 'Masala Egg Boiled', hindiName: 'मसाला उबला अंडा',
    category: 'breakfast', cookTime: 15, protein: 18, calories: 200,
    ingredients: ['3 eggs', '1 tsp chaat masala', '1 tsp black pepper', 'Black salt', '1 lemon', 'Coriander leaves'],
    steps: ['Boil eggs for 10 minutes', 'Peel and slice in half', 'Sprinkle chaat masala', 'Add black pepper and salt', 'Squeeze lemon and garnish'],
    seniorTip: 'Eat the whole egg including yolk — it has Vitamin D critical for bone health in seniors.',
    tags: ['high-protein', 'non-veg', 'quick']
  },
  {
    id: 'b8', name: 'Besan Cheela', hindiName: 'बेसन चीला',
    category: 'breakfast', cookTime: 20, protein: 16, calories: 240,
    ingredients: ['1 cup besan', '1 onion chopped', '1 tomato chopped', '1 tsp ajwain', 'Salt to taste', 'Water to make batter', '1 tsp oil'],
    steps: ['Mix besan with water to thin batter', 'Add onion, tomato, ajwain, salt', 'Heat tawa and pour batter', 'Cook on medium heat both sides', 'Serve with curd or chutney'],
    seniorTip: 'Besan is high in protein and fiber. Ajwain aids digestion. Perfect senior breakfast.',
    tags: ['high-protein', 'vegetarian', 'filling']
  },
  {
    id: 'b9', name: 'Dalia Upma', hindiName: 'दलिया उपमा',
    category: 'breakfast', cookTime: 25, protein: 12, calories: 280,
    ingredients: ['1 cup broken wheat dalia', '1 onion', '1 carrot', '1/2 cup peas', '1 tsp mustard seeds', 'Curry leaves', '2 cups water', 'Salt'],
    steps: ['Roast dalia until golden', 'Temper mustard seeds and curry leaves', 'Add vegetables and saute', 'Add water and salt', 'Add roasted dalia and cook covered', 'Serve hot with curd'],
    seniorTip: 'Dalia is high fiber and protein. Adding vegetables increases nutrition. Easy on digestion.',
    tags: ['high-protein', 'vegetarian', 'fiber-rich']
  },
  {
    id: 'b10', name: 'Milk Oats', hindiName: 'दूध ओट्स',
    category: 'breakfast', cookTime: 10, protein: 14, calories: 320,
    ingredients: ['1 cup oats', '1.5 cups milk', '1 banana', '1 tbsp peanut butter', '1 tsp honey', 'Cardamom powder'],
    steps: ['Cook oats in milk on low heat', 'Stir continuously for 5 minutes', 'Add honey and cardamom', 'Top with banana slices', 'Add peanut butter and serve'],
    seniorTip: 'Peanut butter adds protein and healthy fats. Oats lower cholesterol — important at 60+.',
    tags: ['high-protein', 'vegetarian', 'heart-healthy']
  },
  {
    id: 'b11', name: 'Soya Milk Smoothie', hindiName: 'सोया मिल्क स्मूदी',
    category: 'breakfast', cookTime: 5, protein: 20, calories: 250,
    ingredients: ['250ml soya milk', '1 banana', '2 tbsp peanut butter', '1 tbsp oats', '1 tsp honey', 'Ice cubes'],
    steps: ['Add all ingredients to blender', 'Blend until smooth', 'Add ice and blend again', 'Pour in glass and serve', 'Drink immediately'],
    seniorTip: 'Soya milk is complete plant protein. This smoothie gives 20g protein in one glass!',
    tags: ['high-protein', 'vegetarian', 'quick', 'smoothie']
  },
  {
    id: 'b12', name: 'Idli with Sambar', hindiName: 'इडली सांभर',
    category: 'breakfast', cookTime: 30, protein: 15, calories: 300,
    ingredients: ['4 idlis', '1 cup sambar', '1/4 cup toor dal', 'Tamarind', 'Vegetables', 'Sambar masala', 'Coconut chutney'],
    steps: ['Prepare sambar with toor dal and vegetables', 'Steam idlis until cooked', 'Serve hot idlis with sambar', 'Add coconut chutney on side', 'Serve with hot filter coffee'],
    seniorTip: 'Fermented idli is probiotic and easy to digest. Sambar with dal provides complete protein.',
    tags: ['high-protein', 'vegetarian', 'south-indian']
  },
  {
    id: 'b13', name: 'Peanut Chikki Smoothie', hindiName: 'मूंगफली स्मूदी',
    category: 'breakfast', cookTime: 5, protein: 16, calories: 280,
    ingredients: ['3 tbsp peanut butter', '1 glass milk', '1 banana', '1 tsp honey', 'Pinch of salt', 'Ice cubes'],
    steps: ['Blend peanut butter with milk', 'Add banana and honey', 'Add pinch of salt', 'Blend with ice', 'Serve immediately'],
    seniorTip: 'Natural peanut butter has no added sugar. Peanuts are cheapest and best protein source in India.',
    tags: ['high-protein', 'vegetarian', 'affordable']
  },
  {
    id: 'b14', name: 'Tofu Scramble', hindiName: 'टोफू भुर्जी',
    category: 'breakfast', cookTime: 15, protein: 18, calories: 200,
    ingredients: ['200g firm tofu crumbled', '1 onion', '1 tomato', '1 tsp turmeric', '1 tsp cumin', 'Salt', '1 tsp oil'],
    steps: ['Press tofu dry and crumble', 'Heat oil and add cumin', 'Saute onions and tomatoes', 'Add turmeric and salt', 'Add crumbled tofu and mix', 'Cook 5 minutes and serve'],
    seniorTip: 'Tofu has same protein as paneer with fewer calories. Good for weight loss.',
    tags: ['high-protein', 'vegetarian', 'low-calorie', 'weight-loss']
  },
  {
    id: 'b15', name: 'Rajgira Porridge', hindiName: 'राजगिरा दलिया',
    category: 'breakfast', cookTime: 15, protein: 10, calories: 220,
    ingredients: ['1/2 cup rajgira (amaranth)', '1.5 cups milk', '1 tbsp jaggery', 'Cardamom', '5 almonds', '1 tbsp raisins'],
    steps: ['Cook rajgira in milk on low heat', 'Stir until thick like porridge', 'Add jaggery and cardamom', 'Top with almonds and raisins', 'Serve warm'],
    seniorTip: 'Rajgira is gluten-free and high calcium — excellent for bone strength in seniors.',
    tags: ['high-protein', 'vegetarian', 'gluten-free', 'bone-health']
  },
  {
    id: 'b16', name: 'Curd Rice', hindiName: 'दही चावल',
    category: 'breakfast', cookTime: 10, protein: 10, calories: 280,
    ingredients: ['1 cup cooked rice', '1 cup thick curd', '1 tsp mustard seeds', 'Curry leaves', '1 green chilli', 'Ginger', 'Salt'],
    steps: ['Mix rice and curd well', 'Temper mustard seeds and curry leaves', 'Add ginger and chilli to tempering', 'Pour over rice mixture', 'Mix and serve cold'],
    seniorTip: 'Curd rice is probiotic and cooling. Perfect summer breakfast for seniors in South India.',
    tags: ['probiotic', 'vegetarian', 'cooling', 'easy-digestion']
  },
  {
    id: 'b17', name: 'Methi Thepla', hindiName: 'मेथी थेपला',
    category: 'breakfast', cookTime: 25, protein: 12, calories: 260,
    ingredients: ['1 cup whole wheat flour', '1/2 cup methi leaves', '2 tbsp besan', '1 tsp turmeric', '1 tsp oil', 'Salt', 'Water'],
    steps: ['Mix flour, besan, methi, spices', 'Add oil and knead dough', 'Make thin rotis', 'Cook on tawa with minimal oil', 'Serve with curd or pickle'],
    seniorTip: 'Methi controls blood sugar — crucial for diabetic seniors. Besan adds protein to whole wheat.',
    tags: ['high-protein', 'vegetarian', 'diabetic-friendly']
  },
  {
    id: 'b18', name: 'Rava Upma', hindiName: 'रवा उपमा',
    category: 'breakfast', cookTime: 20, protein: 10, calories: 280,
    ingredients: ['1 cup semolina', '1 onion', '1 carrot', 'Green peas', 'Mustard seeds', 'Curry leaves', '2 cups water', 'Ghee'],
    steps: ['Roast semolina until golden', 'Temper mustard seeds in ghee', 'Add vegetables and saute', 'Add hot water and salt', 'Add semolina and stir well', 'Cover and cook 5 minutes'],
    seniorTip: 'Add a handful of peanuts for extra protein. Ghee aids absorption of fat-soluble vitamins.',
    tags: ['vegetarian', 'south-indian', 'quick']
  },
  {
    id: 'b19', name: 'Pesarattu', hindiName: 'पेसरट्टु',
    category: 'breakfast', cookTime: 20, protein: 16, calories: 230,
    ingredients: ['1 cup whole green moong', '1 inch ginger', '2 green chillies', '1 onion chopped', 'Cumin seeds', 'Salt', 'Oil'],
    steps: ['Soak moong overnight and grind', 'Add ginger, chilli, cumin', 'Make thin dosas on tawa', 'Sprinkle onion on top', 'Cook crispy and serve with chutney'],
    seniorTip: 'Whole moong is more nutritious than split. High protein and fiber. Andhra breakfast favourite.',
    tags: ['high-protein', 'vegetarian', 'andhra', 'filling']
  },
  {
    id: 'b20', name: 'Fruit Chaat', hindiName: 'फ्रूट चाट',
    category: 'breakfast', cookTime: 10, protein: 8, calories: 180,
    ingredients: ['1 apple', '1 banana', '1 orange', '1/2 cup pomegranate', '1 cup curd', 'Chaat masala', 'Black salt', 'Honey'],
    steps: ['Cut all fruits into pieces', 'Mix with curd', 'Add chaat masala and black salt', 'Drizzle honey', 'Toss and serve chilled'],
    seniorTip: 'Adding curd converts fruit salad to protein-rich breakfast. Pomegranate is excellent for heart health.',
    tags: ['vegetarian', 'light', 'heart-healthy', 'antioxidant']
  },
  {
    id: 'b21', name: 'Almond Milk Porridge', hindiName: 'बादाम दूध दलिया',
    category: 'breakfast', cookTime: 15, protein: 12, calories: 300,
    ingredients: ['1 cup oats', '1.5 cups almond milk', '10 almonds', '5 walnuts', '1 tbsp honey', 'Cinnamon', 'Cardamom'],
    steps: ['Heat almond milk in pan', 'Add oats and stir', 'Cook on low for 5 minutes', 'Add honey and spices', 'Top with nuts and serve'],
    seniorTip: 'Walnuts are best brain food for seniors. Almond milk is dairy-free for lactose intolerant.',
    tags: ['high-protein', 'vegetarian', 'brain-health']
  },
  {
    id: 'b22', name: 'Poha with Peanuts', hindiName: 'मूंगफली पोहा',
    category: 'breakfast', cookTime: 15, protein: 12, calories: 290,
    ingredients: ['1 cup thick poha', '3 tbsp peanuts', '1 onion', '1 potato', 'Turmeric', 'Mustard seeds', 'Lemon', 'Coriander'],
    steps: ['Rinse poha and drain', 'Fry peanuts until crispy', 'Temper mustard seeds', 'Add potato and onion', 'Add poha and turmeric', 'Mix peanuts and finish with lemon'],
    seniorTip: 'Peanuts add protein to poha. Use less oil than traditional recipe for weight management.',
    tags: ['high-protein', 'vegetarian', 'maharashtrian']
  },
  {
    id: 'b23', name: 'Whey Protein Lassi', hindiName: 'व्हे लस्सी',
    category: 'breakfast', cookTime: 5, protein: 30, calories: 280,
    ingredients: ['1 scoop whey protein', '200ml curd', '1 banana', '1 cup milk', '1 tsp honey', 'Ice cubes'],
    steps: ['Blend curd and milk', 'Add whey protein powder', 'Add banana and honey', 'Blend with ice', 'Serve immediately after workout'],
    seniorTip: 'Take within 30 minutes post workout. This gives 30g protein in one serving — maximum muscle repair.',
    tags: ['very-high-protein', 'non-veg', 'post-workout']
  },
  {
    id: 'b24', name: 'Sabudana Khichdi', hindiName: 'साबूदाना खिचड़ी',
    category: 'breakfast', cookTime: 20, protein: 8, calories: 320,
    ingredients: ['1 cup sabudana', '3 tbsp peanuts', '1 potato', 'Green chilli', 'Cumin', 'Lemon', 'Coriander', 'Salt'],
    steps: ['Soak sabudana for 4 hours', 'Fry peanuts and crush', 'Fry potato cubes', 'Add cumin and chilli', 'Add sabudana and peanuts', 'Mix and cook 5 minutes'],
    seniorTip: 'Add more peanuts for protein. Sabudana is easy on stomach. Good for vrat (fasting) days.',
    tags: ['vegetarian', 'easy-digestion', 'vrat-friendly']
  },
  {
    id: 'b25', name: 'Multigrain Roti with Dal', hindiName: 'मल्टीग्रेन रोटी दाल',
    category: 'breakfast', cookTime: 20, protein: 16, calories: 340,
    ingredients: ['1/2 cup wheat flour', '1/4 cup besan', '1/4 cup bajra', '1 cup moong dal', 'Turmeric', 'Salt', 'Ghee'],
    steps: ['Mix all flours and make dough', 'Make thin rotis on tawa', 'Cook moong dal with turmeric', 'Add salt and temper with ghee', 'Serve roti with dal'],
    seniorTip: 'Multigrain flour gives complete amino acids. Ghee on roti aids fat-soluble vitamin absorption.',
    tags: ['high-protein', 'vegetarian', 'complete-nutrition']
  },
  // ========== LUNCH (25) ==========
  {
    id: 'l1', name: 'Rajma Chawal', hindiName: 'राजमा चावल',
    category: 'lunch', cookTime: 45, protein: 20, calories: 450,
    ingredients: ['1 cup rajma (soaked)', '2 tomatoes', '1 onion', 'Ginger garlic paste', 'Rajma masala', 'Brown rice', 'Ghee'],
    steps: ['Pressure cook rajma for 4 whistles', 'Make onion tomato masala', 'Add cooked rajma to masala', 'Simmer 15 minutes', 'Serve with brown rice and ghee'],
    seniorTip: 'Rajma + rice is a complete protein meal. Brown rice is better than white for blood sugar control.',
    tags: ['high-protein', 'vegetarian', 'north-indian', 'complete-meal']
  },
  {
    id: 'l2', name: 'Dal Makhani', hindiName: 'दाल मखनी',
    category: 'lunch', cookTime: 60, protein: 18, calories: 380,
    ingredients: ['1/2 cup urad dal', '1/4 cup rajma', 'Tomato puree', 'Cream', 'Butter', 'Garam masala', 'Kasuri methi'],
    steps: ['Soak dal overnight', 'Pressure cook until soft', 'Make rich tomato gravy', 'Add dal to gravy', 'Simmer 20 minutes', 'Add cream and kasuri methi'],
    seniorTip: 'Use minimal cream. Urad dal is high protein. Slow cooking makes it very digestible for seniors.',
    tags: ['high-protein', 'vegetarian', 'punjabi']
  },
  {
    id: 'l3', name: 'Chicken Curry', hindiName: 'चिकन करी',
    category: 'lunch', cookTime: 45, protein: 35, calories: 380,
    ingredients: ['300g chicken', '2 onions', '3 tomatoes', 'Yogurt', 'Ginger garlic', 'Chicken masala', 'Oil', 'Coriander'],
    steps: ['Marinate chicken in yogurt and spices', 'Brown onions in oil', 'Add ginger garlic paste', 'Add tomatoes and cook', 'Add chicken and simmer', 'Garnish with coriander'],
    seniorTip: 'Remove skin before cooking to reduce fat. Chicken breast has most protein with least fat.',
    tags: ['very-high-protein', 'non-veg', 'north-indian']
  },
  {
    id: 'l4', name: 'Palak Paneer', hindiName: 'पालक पनीर',
    category: 'lunch', cookTime: 35, protein: 22, calories: 320,
    ingredients: ['200g paneer', '2 cups spinach', '2 tomatoes', '1 onion', 'Cream', 'Garam masala', 'Ghee'],
    steps: ['Blanch and puree spinach', 'Saute onion and tomatoes', 'Add spinach puree', 'Add paneer cubes', 'Simmer 10 minutes', 'Add cream and serve'],
    seniorTip: 'Spinach is iron-rich — prevents anemia in seniors. Paneer adds calcium for bone strength.',
    tags: ['high-protein', 'vegetarian', 'iron-rich', 'bone-health']
  },
  {
    id: 'l5', name: 'Fish Curry', hindiName: 'मछली करी',
    category: 'lunch', cookTime: 35, protein: 30, calories: 280,
    ingredients: ['300g rohu fish', '2 tomatoes', '1 onion', 'Mustard oil', 'Turmeric', 'Fish masala', 'Curry leaves'],
    steps: ['Marinate fish with turmeric and salt', 'Fry fish pieces lightly', 'Make onion tomato gravy', 'Add fish to gravy', 'Simmer 10 minutes', 'Serve with rice'],
    seniorTip: 'Fish omega-3 reduces joint pain and inflammation. Best protein for 60+ adults. Eat fish 3x per week.',
    tags: ['very-high-protein', 'non-veg', 'omega-3', 'joint-health']
  },
  {
    id: 'l6', name: 'Chana Masala', hindiName: 'छोले मसाला',
    category: 'lunch', cookTime: 40, protein: 18, calories: 350,
    ingredients: ['1 cup kabuli chana', '2 tomatoes', '1 onion', 'Chole masala', 'Tea bag for color', 'Ginger', 'Amchur'],
    steps: ['Soak chana overnight', 'Pressure cook with tea bag', 'Make masala with onion tomato', 'Add chana to masala', 'Add amchur and cook 10 minutes', 'Serve with bhature or rice'],
    seniorTip: 'Chana is highest protein legume. Amchur aids vitamin C absorption for better iron uptake.',
    tags: ['high-protein', 'vegetarian', 'punjabi']
  },
  {
    id: 'l7', name: 'Egg Curry', hindiName: 'अंडे की करी',
    category: 'lunch', cookTime: 30, protein: 24, calories: 300,
    ingredients: ['4 eggs boiled', '2 onions', '3 tomatoes', 'Egg curry masala', 'Oil', 'Ginger garlic', 'Coriander'],
    steps: ['Hard boil and peel eggs', 'Make rich onion tomato gravy', 'Add egg curry masala', 'Add eggs to gravy', 'Simmer 10 minutes', 'Garnish and serve'],
    seniorTip: 'Eggs contain all essential amino acids. This curry is economical and nutritious for seniors.',
    tags: ['high-protein', 'non-veg', 'affordable']
  },
  {
    id: 'l8', name: 'Soya Chunks Curry', hindiName: 'सोया करी',
    category: 'lunch', cookTime: 30, protein: 28, calories: 300,
    ingredients: ['100g soya chunks', '2 tomatoes', '1 onion', 'Ginger garlic', 'Garam masala', 'Oil', 'Curd'],
    steps: ['Soak soya in hot water 15 minutes', 'Squeeze dry', 'Make onion tomato masala', 'Add soya chunks', 'Add curd and spices', 'Simmer 15 minutes'],
    seniorTip: 'Soya has highest plant protein. Good meat substitute for vegetarians. Reduces cholesterol.',
    tags: ['very-high-protein', 'vegetarian', 'cholesterol-friendly']
  },
  {
    id: 'l9', name: 'Dal Tadka', hindiName: 'दाल तड़का',
    category: 'lunch', cookTime: 30, protein: 16, calories: 280,
    ingredients: ['1/2 cup arhar dal', '1/4 cup masoor dal', 'Tomato', 'Onion', 'Ghee', 'Cumin', 'Kashmiri chilli', 'Asafoetida'],
    steps: ['Cook both dals together', 'Make tadka with ghee', 'Add cumin, onion, tomato', 'Add chilli and asafoetida', 'Pour tadka over dal', 'Serve with roti and rice'],
    seniorTip: 'Two dal combination gives complete amino acid profile. Ghee tadka improves nutrient absorption.',
    tags: ['high-protein', 'vegetarian', 'dhaba-style', 'complete-protein']
  },
  {
    id: 'l10', name: 'Paneer Tikka Masala', hindiName: 'पनीर टिक्का मसाला',
    category: 'lunch', cookTime: 40, protein: 24, calories: 380,
    ingredients: ['250g paneer', 'Bell peppers', 'Onion', 'Tikka masala', 'Curd for marination', 'Tomato gravy', 'Cream', 'Oil'],
    steps: ['Marinate paneer in spiced curd', 'Grill or pan fry paneer', 'Make rich tomato gravy', 'Add grilled paneer to gravy', 'Simmer and add cream', 'Serve with butter naan'],
    seniorTip: 'Grilling instead of frying reduces calories. Paneer is best dairy protein for seniors.',
    tags: ['high-protein', 'vegetarian', 'restaurant-style']
  },
  {
    id: 'l11', name: 'Mutton Soup', hindiName: 'मटन सूप',
    category: 'lunch', cookTime: 60, protein: 30, calories: 280,
    ingredients: ['300g mutton with bones', 'Onion', 'Ginger garlic', 'Whole spices', 'Turmeric', 'Black pepper', 'Coriander'],
    steps: ['Pressure cook mutton with spices', 'Cook for 5-6 whistles', 'Remove bones carefully', 'Strain and add vegetables', 'Simmer 10 minutes', 'Serve hot soup'],
    seniorTip: 'Bone broth is rich in collagen — excellent for joint health. Easy to eat for seniors with dental issues.',
    tags: ['very-high-protein', 'non-veg', 'joint-health', 'soft']
  },
  {
    id: 'l12', name: 'Paneer Khichdi', hindiName: 'पनीर खिचड़ी',
    category: 'lunch', cookTime: 30, protein: 20, calories: 380,
    ingredients: ['1/2 cup rice', '1/2 cup moong dal', '100g paneer', 'Vegetables', 'Ghee', 'Cumin', 'Turmeric', 'Salt'],
    steps: ['Cook rice and dal together', 'Add turmeric and salt', 'Fry paneer cubes separately', 'Add vegetables to khichdi', 'Add fried paneer on top', 'Add ghee and serve hot'],
    seniorTip: 'Khichdi is easiest to digest. Adding paneer makes it complete meal. Perfect for upset stomach.',
    tags: ['high-protein', 'vegetarian', 'easy-digestion', 'complete-meal']
  },
  {
    id: 'l13', name: 'Tuna Salad', hindiName: 'टूना सलाद',
    category: 'lunch', cookTime: 10, protein: 28, calories: 220,
    ingredients: ['1 can tuna', '1 cucumber', '1 tomato', '1 onion', 'Lemon juice', 'Black pepper', 'Olive oil', 'Coriander'],
    steps: ['Drain tuna from can', 'Chop all vegetables', 'Mix tuna with vegetables', 'Add lemon and pepper', 'Drizzle oil and toss', 'Serve chilled'],
    seniorTip: 'Canned tuna is convenient high protein. Available at Big Bazaar. Best weight loss lunch.',
    tags: ['very-high-protein', 'non-veg', 'weight-loss', 'no-cook']
  },
  {
    id: 'l14', name: 'Moong Dal Soup', hindiName: 'मूंग दाल सूप',
    category: 'lunch', cookTime: 25, protein: 14, calories: 200,
    ingredients: ['1 cup moong dal', 'Spinach', 'Tomato', 'Ginger', 'Cumin', 'Turmeric', 'Lemon', 'Salt'],
    steps: ['Cook moong dal until soft', 'Add spinach and cook 5 minutes', 'Blend to smooth soup', 'Add cumin temper', 'Add lemon and salt', 'Serve hot'],
    seniorTip: 'Moong is easiest to digest of all dals. Ideal lunch for seniors with digestive issues.',
    tags: ['high-protein', 'vegetarian', 'easy-digestion', 'light']
  },
  {
    id: 'l15', name: 'Brown Rice Chicken Bowl', hindiName: 'ब्राउन राइस चिकन',
    category: 'lunch', cookTime: 40, protein: 38, calories: 420,
    ingredients: ['150g chicken breast', '1 cup brown rice', 'Broccoli', 'Carrots', 'Soy sauce', 'Ginger', 'Garlic', 'Sesame oil'],
    steps: ['Cook brown rice', 'Grill chicken breast', 'Stir fry vegetables with ginger', 'Add soy sauce and sesame oil', 'Slice chicken over rice', 'Add vegetables and serve'],
    seniorTip: 'This bowl gives 38g protein — complete daily requirement in one meal. Brown rice for sustained energy.',
    tags: ['very-high-protein', 'non-veg', 'weight-loss', 'gym-food']
  },
  {
    id: 'l16', name: 'Sambar with Idli Rice', hindiName: 'सांभर भात',
    category: 'lunch', cookTime: 40, protein: 16, calories: 350,
    ingredients: ['1 cup toor dal', 'Tamarind', 'Drumstick', 'Brinjal', 'Tomatoes', 'Sambar powder', 'Mustard seeds', 'Curry leaves'],
    steps: ['Cook toor dal with vegetables', 'Add tamarind water', 'Add sambar powder', 'Temper with mustard and curry leaves', 'Simmer 10 minutes', 'Serve with rice'],
    seniorTip: 'Drumstick in sambar is excellent for bone health. Tamarind is rich in antioxidants for seniors.',
    tags: ['high-protein', 'vegetarian', 'south-indian', 'bone-health']
  },
  {
    id: 'l17', name: 'Kadhi Chawal', hindiName: 'कढ़ी चावल',
    category: 'lunch', cookTime: 35, protein: 14, calories: 380,
    ingredients: ['1 cup curd', '3 tbsp besan', 'Pakoras', 'Turmeric', 'Mustard seeds', 'Dried red chilli', 'Ghee', 'Rice'],
    steps: ['Whisk curd and besan with water', 'Cook until thick on low heat', 'Make pakoras from besan', 'Add pakoras to kadhi', 'Make tempering with ghee', 'Serve with rice'],
    seniorTip: 'Curd based kadhi is probiotic. Besan adds protein. Avoid too many pakoras for weight management.',
    tags: ['high-protein', 'vegetarian', 'probiotic', 'north-indian']
  },
  {
    id: 'l18', name: 'Chicken Soup', hindiName: 'चिकन सूप',
    category: 'lunch', cookTime: 45, protein: 28, calories: 180,
    ingredients: ['250g chicken with bones', 'Carrots', 'Onion', 'Celery', 'Black pepper', 'Bay leaves', 'Garlic', 'Salt'],
    steps: ['Boil chicken with vegetables', 'Cook 30 minutes on medium', 'Remove chicken and shred', 'Strain and clarify broth', 'Add shredded chicken back', 'Serve hot with bread'],
    seniorTip: 'Chicken soup is easiest protein for seniors with dental issues. Healing for cold and infections.',
    tags: ['high-protein', 'non-veg', 'healing', 'soft', 'immunity']
  },
  {
    id: 'l19', name: 'Peas Paneer', hindiName: 'मटर पनीर',
    category: 'lunch', cookTime: 30, protein: 20, calories: 340,
    ingredients: ['200g paneer', '1 cup peas', '2 tomatoes', '1 onion', 'Ginger garlic', 'Garam masala', 'Oil', 'Cream'],
    steps: ['Make onion tomato gravy', 'Add peas and cook 5 minutes', 'Add paneer cubes', 'Add garam masala', 'Simmer 10 minutes', 'Add cream and serve'],
    seniorTip: 'Peas and paneer together provide complete protein. Peas are rich in vitamins A and C.',
    tags: ['high-protein', 'vegetarian', 'north-indian']
  },
  {
    id: 'l20', name: 'Mixed Dal', hindiName: 'पंचमेल दाल',
    category: 'lunch', cookTime: 35, protein: 20, calories: 300,
    ingredients: ['Mix of 5 dals', 'Tomato', 'Onion', 'Ghee', 'Cumin', 'Turmeric', 'Coriander', 'Lemon'],
    steps: ['Soak all dals 30 minutes', 'Cook together in pressure cooker', 'Make tadka with ghee and spices', 'Add tomato and onion to tadka', 'Mix with dal', 'Serve with roti'],
    seniorTip: 'Five dal combination gives complete amino acid profile better than single dal. Best protein meal.',
    tags: ['very-high-protein', 'vegetarian', 'rajasthani', 'complete-protein']
  },
  {
    id: 'l21', name: 'Bhuna Chicken', hindiName: 'भुना चिकन',
    category: 'lunch', cookTime: 40, protein: 38, calories: 320,
    ingredients: ['300g chicken', 'Onions', 'Tomatoes', 'Thick curd', 'Bhuna masala', 'Oil', 'Kasuri methi'],
    steps: ['Marinate chicken in thick masala', 'Cook on high heat until dry', 'Add onion and tomato paste', 'Bhuno until oil separates', 'Add water for gravy', 'Finish with kasuri methi'],
    seniorTip: 'Dry roasting preserves more protein than boiling. Remove excess oil before serving.',
    tags: ['very-high-protein', 'non-veg', 'high-flavor', 'north-indian']
  },
  {
    id: 'l22', name: 'Chole Bhature Healthy', hindiName: 'स्वस्थ छोले',
    category: 'lunch', cookTime: 45, protein: 18, calories: 380,
    ingredients: ['1 cup kabuli chana', 'Whole spices', 'Onion tomato masala', 'Kulcha bread instead of bhature', 'Pickled onions', 'Lemon'],
    steps: ['Cook chana with whole spices', 'Make masala gravy', 'Simmer chana in gravy', 'Serve with whole wheat kulcha', 'Add pickled onions', 'Serve with lemon'],
    seniorTip: 'Kulcha instead of fried bhature reduces calories by 200. Same taste, much healthier!',
    tags: ['high-protein', 'vegetarian', 'healthier-version']
  },
  {
    id: 'l23', name: 'Steamed Fish', hindiName: 'भाप में पकी मछली',
    category: 'lunch', cookTime: 20, protein: 32, calories: 180,
    ingredients: ['300g fish fillet', 'Ginger slices', 'Lemon', 'Turmeric', 'Black pepper', 'Coriander', 'Salt'],
    steps: ['Marinate fish with spices', 'Place on steamer plate', 'Add ginger slices', 'Steam 12-15 minutes', 'Squeeze lemon', 'Serve with steamed rice'],
    seniorTip: 'Steaming is healthiest cooking method — preserves maximum omega-3. Zero oil used.',
    tags: ['very-high-protein', 'non-veg', 'zero-oil', 'omega-3', 'healthy']
  },
  {
    id: 'l24', name: 'Paneer Salad', hindiName: 'पनीर सलाद',
    category: 'lunch', cookTime: 10, protein: 18, calories: 240,
    ingredients: ['150g fresh paneer', 'Cucumber', 'Tomato', 'Bell peppers', 'Onion', 'Lemon', 'Black pepper', 'Chaat masala'],
    steps: ['Cut paneer into cubes', 'Chop all vegetables', 'Mix together', 'Add lemon and spices', 'Toss well', 'Serve immediately'],
    seniorTip: 'No cooking required. Fresh paneer is highest quality protein. Light and cooling for seniors.',
    tags: ['high-protein', 'vegetarian', 'no-cook', 'light', 'quick']
  },
  {
    id: 'l25', name: 'Vegetable Pulao with Raita', hindiName: 'वेज पुलाव रायता',
    category: 'lunch', cookTime: 35, protein: 16, calories: 400,
    ingredients: ['1 cup basmati rice', 'Mixed vegetables', 'Whole spices', 'Ghee', '1 cup thick curd', 'Cucumber', 'Cumin', 'Mint'],
    steps: ['Cook pulao with vegetables and spices', 'Make raita with curd and cucumber', 'Add roasted cumin to raita', 'Add mint leaves', 'Serve pulao with raita', 'Add pickle on side'],
    seniorTip: 'Raita adds protein and probiotics to pulao. Complete and balanced meal for seniors.',
    tags: ['high-protein', 'vegetarian', 'complete-meal', 'probiotic']
  },
  // ========== DINNER (25) ==========
  {
    id: 'd1', name: 'Grilled Chicken Tikka', hindiName: 'चिकन टिक्का',
    category: 'dinner', cookTime: 30, protein: 35, calories: 280,
    ingredients: ['300g chicken breast', 'Thick curd', 'Tikka masala', 'Lemon juice', 'Ginger garlic paste', 'Oil for basting'],
    steps: ['Marinate chicken 4 hours', 'Skewer chicken pieces', 'Grill on high heat', 'Baste with oil', 'Cook until charred marks', 'Serve with mint chutney'],
    seniorTip: 'Grilled chicken is lowest calorie highest protein option. Perfect light dinner for seniors.',
    tags: ['very-high-protein', 'non-veg', 'low-calorie', 'grilled']
  },
  {
    id: 'd2', name: 'Dal Soup', hindiName: 'दाल सूप',
    category: 'dinner', cookTime: 25, protein: 14, calories: 180,
    ingredients: ['1/2 cup masoor dal', 'Spinach', 'Carrot', 'Tomato', 'Garlic', 'Lemon', 'Black pepper', 'Ghee'],
    steps: ['Cook masoor dal until soft', 'Add vegetables and cook', 'Blend until smooth', 'Heat with ghee and garlic', 'Add pepper and lemon', 'Serve hot'],
    seniorTip: 'Light soup dinner is ideal for seniors. Easy digestion at night. Promotes good sleep.',
    tags: ['high-protein', 'vegetarian', 'light', 'easy-digestion', 'good-sleep']
  },
  {
    id: 'd3', name: 'Paneer Bhurji Roti', hindiName: 'पनीर भुर्जी रोटी',
    category: 'dinner', cookTime: 20, protein: 24, calories: 380,
    ingredients: ['200g paneer', '1 onion', '2 tomatoes', 'Capsicum', 'Spices', '2 whole wheat rotis', 'Ghee'],
    steps: ['Crumble paneer finely', 'Saute vegetables', 'Add paneer and spices', 'Cook 5 minutes', 'Serve hot with roti', 'Add ghee on roti'],
    seniorTip: 'Paneer at dinner provides casein protein for overnight muscle repair. Ideal for 60+ adults.',
    tags: ['high-protein', 'vegetarian', 'muscle-repair']
  },
  {
    id: 'd4', name: 'Fish Tikka', hindiName: 'मछली टिक्का',
    category: 'dinner', cookTime: 25, protein: 30, calories: 220,
    ingredients: ['300g fish fillets', 'Curd', 'Tikka masala', 'Lemon', 'Ginger garlic', 'Mustard oil'],
    steps: ['Cut fish into cubes', 'Marinate in curd and spices', 'Grill on tawa or oven', 'Cook until golden', 'Squeeze lemon', 'Serve with chutney'],
    seniorTip: 'Fish tikka is light and high protein. Mustard oil is best for fish marination and has omega-3.',
    tags: ['very-high-protein', 'non-veg', 'light', 'omega-3']
  },
  {
    id: 'd5', name: 'Moong Dal Khichdi', hindiName: 'मूंग दाल खिचड़ी',
    category: 'dinner', cookTime: 25, protein: 16, calories: 320,
    ingredients: ['1/2 cup moong dal', '1/2 cup rice', 'Ghee', 'Cumin', 'Turmeric', 'Asafoetida', 'Salt', 'Pickle'],
    steps: ['Rinse dal and rice together', 'Pressure cook 2 whistles', 'Make ghee tadka with cumin', 'Add asafoetida and turmeric', 'Mix with khichdi', 'Serve with pickle and curd'],
    seniorTip: 'Khichdi is called "superfood of India". Easiest to digest. Perfect senior dinner. Add ghee liberally.',
    tags: ['high-protein', 'vegetarian', 'easy-digestion', 'superfood', 'complete-meal']
  },
  {
    id: 'd6', name: 'Egg Bhurji', hindiName: 'अंडे की भुर्जी',
    category: 'dinner', cookTime: 15, protein: 22, calories: 260,
    ingredients: ['3 eggs', '1 onion', '2 tomatoes', '1 green chilli', 'Turmeric', 'Salt', 'Oil', 'Coriander'],
    steps: ['Beat eggs with salt', 'Saute onion and tomato', 'Add chilli and turmeric', 'Add eggs and scramble', 'Cook on medium heat', 'Garnish with coriander'],
    seniorTip: 'Quick protein-rich dinner in 15 minutes. Eggs at dinner prevent overnight muscle loss in seniors.',
    tags: ['high-protein', 'non-veg', 'quick', 'muscle-preservation']
  },
  {
    id: 'd7', name: 'Masoor Dal Tadka', hindiName: 'मसूर दाल तड़का',
    category: 'dinner', cookTime: 25, protein: 16, calories: 250,
    ingredients: ['1 cup masoor dal', 'Tomato', 'Onion', 'Garlic', 'Ghee', 'Kashmiri chilli', 'Cumin', 'Lemon'],
    steps: ['Pressure cook masoor dal', 'Make tadka with ghee and garlic', 'Add onion and cook golden', 'Add tomato and chilli', 'Pour over dal', 'Add lemon and serve'],
    seniorTip: 'Masoor dal needs no soaking and cooks fastest. Iron-rich — prevents evening fatigue in seniors.',
    tags: ['high-protein', 'vegetarian', 'iron-rich', 'quick']
  },
  {
    id: 'd8', name: 'Baked Chicken', hindiName: 'बेक्ड चिकन',
    category: 'dinner', cookTime: 45, protein: 40, calories: 250,
    ingredients: ['300g chicken', 'Olive oil', 'Garlic', 'Rosemary or ajwain', 'Lemon', 'Black pepper', 'Salt', 'Vegetables'],
    steps: ['Marinate chicken with spices', 'Place in baking tray with vegetables', 'Bake at 200°C for 35 minutes', 'Check internal temperature', 'Rest 5 minutes before cutting', 'Serve with salad'],
    seniorTip: 'Baking uses zero oil. Highest protein lowest calorie dinner. Excellent for weight loss.',
    tags: ['very-high-protein', 'non-veg', 'zero-oil', 'weight-loss']
  },
  {
    id: 'd9', name: 'Vegetable Raita', hindiName: 'वेज रायता',
    category: 'dinner', cookTime: 10, protein: 10, calories: 160,
    ingredients: ['2 cups thick curd', 'Cucumber', 'Tomato', 'Onion', 'Roasted cumin', 'Black salt', 'Coriander', 'Mint'],
    steps: ['Whisk curd smooth', 'Add chopped vegetables', 'Add roasted cumin and black salt', 'Mix well', 'Refrigerate 15 minutes', 'Garnish with mint and serve'],
    seniorTip: 'Light protein dinner. Curd promotes sleep and muscle recovery at night. Add if not sleeping well.',
    tags: ['high-protein', 'vegetarian', 'light', 'probiotic', 'good-sleep']
  },
  {
    id: 'd10', name: 'Lauki Dal', hindiName: 'लौकी दाल',
    category: 'dinner', cookTime: 30, protein: 14, calories: 220,
    ingredients: ['1/2 cup toor dal', '1 cup lauki', 'Tomato', 'Turmeric', 'Cumin', 'Ghee', 'Coriander', 'Lemon'],
    steps: ['Pressure cook dal with lauki', 'Add tomato and turmeric', 'Make ghee tadka', 'Add cumin and coriander', 'Mix with dal', 'Add lemon and serve'],
    seniorTip: 'Lauki is excellent for kidney health and digestion. Very light dinner — good for hypertension.',
    tags: ['high-protein', 'vegetarian', 'kidney-friendly', 'hypertension', 'light']
  },
  {
    id: 'd11', name: 'Tandoori Roti with Dal', hindiName: 'तंदूरी रोटी दाल',
    category: 'dinner', cookTime: 30, protein: 18, calories: 360,
    ingredients: ['Whole wheat dough', '1 cup mixed dal', 'Ghee', 'Onion', 'Tomato', 'Spices', 'Coriander'],
    steps: ['Cook mixed dal with spices', 'Make tandoori roti on tawa', 'Apply ghee on hot roti', 'Serve with dal', 'Add raw onion on side', 'Finish with coriander'],
    seniorTip: 'Traditional Indian dinner. Whole wheat roti is better than maida. Dal provides complete protein.',
    tags: ['high-protein', 'vegetarian', 'traditional', 'complete-meal']
  },
  {
    id: 'd12', name: 'Chicken Stew', hindiName: 'चिकन स्टू',
    category: 'dinner', cookTime: 45, protein: 32, calories: 300,
    ingredients: ['250g chicken', 'Potatoes', 'Carrots', 'Onion', 'Coconut milk', 'Whole spices', 'Pepper', 'Salt'],
    steps: ['Cook chicken in water with spices', 'Add vegetables and cook', 'Add coconut milk', 'Simmer until thick', 'Adjust seasoning', 'Serve with appam or bread'],
    seniorTip: 'Kerala stew is very gentle on digestion. Coconut milk provides healthy fats for seniors.',
    tags: ['very-high-protein', 'non-veg', 'kerala', 'gentle-digestion']
  },
  {
    id: 'd13', name: 'Paneer Soup', hindiName: 'पनीर सूप',
    category: 'dinner', cookTime: 20, protein: 18, calories: 200,
    ingredients: ['150g paneer', 'Vegetable broth', 'Carrots', 'Beans', 'Garlic', 'Black pepper', 'Cornflour', 'Salt'],
    steps: ['Prepare vegetable broth', 'Add diced paneer', 'Add vegetables and garlic', 'Thicken with cornflour', 'Add black pepper', 'Serve piping hot'],
    seniorTip: 'Warm soup dinner helps sleep. Paneer provides complete protein for overnight recovery.',
    tags: ['high-protein', 'vegetarian', 'light', 'good-sleep']
  },
  {
    id: 'd14', name: 'Egg Dal', hindiName: 'अंडा दाल',
    category: 'dinner', cookTime: 30, protein: 26, calories: 320,
    ingredients: ['2 eggs', '1/2 cup toor dal', 'Tomato', 'Onion', 'Spices', 'Oil', 'Coriander'],
    steps: ['Cook toor dal', 'Make masala with onion tomato', 'Add dal to masala', 'Crack eggs directly into dal', 'Cover and cook 5 minutes', 'Garnish and serve'],
    seniorTip: 'Unique combination of dal and egg gives 26g protein. Bihar style recipe. Very nutritious.',
    tags: ['very-high-protein', 'non-veg', 'bihari', 'unique']
  },
  {
    id: 'd15', name: 'Tofu Stir Fry', hindiName: 'टोफू स्टिर फ्राई',
    category: 'dinner', cookTime: 20, protein: 20, calories: 240,
    ingredients: ['200g firm tofu', 'Bell peppers', 'Broccoli', 'Soy sauce', 'Ginger garlic', 'Sesame oil', 'Spring onions'],
    steps: ['Press tofu dry and cube', 'Fry tofu until golden', 'Stir fry vegetables on high heat', 'Add soy sauce and ginger', 'Add tofu back', 'Finish with sesame oil'],
    seniorTip: 'Tofu is complete protein like meat. Stir frying preserves maximum nutrients. Light and easy to digest.',
    tags: ['high-protein', 'vegetarian', 'chinese-style', 'light']
  },
  {
    id: 'd16', name: 'Aloo Chole', hindiName: 'आलू छोले',
    category: 'dinner', cookTime: 35, protein: 16, calories: 380,
    ingredients: ['1 cup chana', '2 potatoes', 'Onion tomato masala', 'Whole spices', 'Amchur', 'Ghee'],
    steps: ['Pressure cook chana and potato', 'Make masala', 'Add chana and potato', 'Simmer 15 minutes', 'Add amchur for tanginess', 'Serve with puri or rice'],
    seniorTip: 'Chana gives sustained energy throughout night. Potato adds carbs for restful sleep.',
    tags: ['high-protein', 'vegetarian', 'north-indian', 'filling']
  },
  {
    id: 'd17', name: 'Prawn Curry', hindiName: 'झींगा करी',
    category: 'dinner', cookTime: 30, protein: 28, calories: 260,
    ingredients: ['300g prawns', 'Coconut milk', 'Onion', 'Tomatoes', 'Ginger garlic', 'Prawn masala', 'Curry leaves', 'Oil'],
    steps: ['Clean and devein prawns', 'Make masala with onion tomato', 'Add coconut milk', 'Add prawns and cook 8 minutes', 'Add curry leaves', 'Serve with rice'],
    seniorTip: 'Prawns are very high protein with low calories. Easy to chew — good for seniors with dental issues.',
    tags: ['very-high-protein', 'non-veg', 'coastal', 'easy-to-chew']
  },
  {
    id: 'd18', name: 'Spinach Dal', hindiName: 'पालक दाल',
    category: 'dinner', cookTime: 30, protein: 18, calories: 260,
    ingredients: ['1/2 cup chana dal', '2 cups spinach', 'Tomato', 'Garlic', 'Cumin', 'Ghee', 'Turmeric', 'Lemon'],
    steps: ['Cook chana dal with turmeric', 'Blanch and puree spinach', 'Mix dal and spinach', 'Make garlic tadka in ghee', 'Add to dal mixture', 'Serve with roti'],
    seniorTip: 'Iron from spinach + Vitamin C from lemon = maximum iron absorption. Prevents anemia in seniors.',
    tags: ['high-protein', 'vegetarian', 'iron-rich', 'anti-anemia']
  },
  {
    id: 'd19', name: 'Curd Chicken', hindiName: 'दही चिकन',
    category: 'dinner', cookTime: 40, protein: 38, calories: 300,
    ingredients: ['300g chicken', 'Thick curd', 'Onion', 'Garam masala', 'Kewra water', 'Ghee', 'Saffron'],
    steps: ['Marinate chicken in curd overnight', 'Cook onions until golden', 'Add chicken with marinade', 'Cook on low heat covered', 'Add saffron and kewra', 'Serve with naan or rice'],
    seniorTip: 'Curd tenderizes chicken making it soft and easy to digest. Very gentle on stomach for seniors.',
    tags: ['very-high-protein', 'non-veg', 'mughlai', 'easy-digestion']
  },
  {
    id: 'd20', name: 'Warm Milk with Turmeric', hindiName: 'हल्दी वाला दूध',
    category: 'dinner', cookTime: 5, protein: 8, calories: 150,
    ingredients: ['1 glass milk', '1 tsp turmeric', '1 tsp honey', 'Pinch of black pepper', 'Cardamom', 'Saffron'],
    steps: ['Heat milk until hot', 'Add turmeric and pepper', 'Add cardamom and honey', 'Add saffron', 'Stir well', 'Drink hot before bed'],
    seniorTip: 'Golden milk before bed is best natural sleep remedy. Turmeric reduces inflammation overnight.',
    tags: ['protein', 'vegetarian', 'anti-inflammatory', 'good-sleep', 'traditional']
  },
  {
    id: 'd21', name: 'Moong Soup', hindiName: 'मूंग सूप',
    category: 'dinner', cookTime: 25, protein: 12, calories: 180,
    ingredients: ['1/2 cup whole moong', 'Ginger', 'Tomato', 'Cumin', 'Turmeric', 'Lemon', 'Coriander', 'Black pepper'],
    steps: ['Cook moong until soft', 'Add ginger and tomato', 'Blend half the soup', 'Mix smooth and chunky', 'Add cumin tadka', 'Squeeze lemon and serve'],
    seniorTip: 'Light protein soup is ideal before 8pm dinner for seniors. Easy digestion and good sleep.',
    tags: ['high-protein', 'vegetarian', 'light', 'easy-digestion']
  },
  {
    id: 'd22', name: 'Masala Oats', hindiName: 'मसाला ओट्स',
    category: 'dinner', cookTime: 15, protein: 12, calories: 250,
    ingredients: ['1 cup oats', 'Onion', 'Tomato', 'Peas', 'Carrot', 'Cumin', 'Turmeric', 'Salt'],
    steps: ['Temper cumin in oil', 'Add vegetables and saute', 'Add oats and mix', 'Add water and cook 5 minutes', 'Adjust consistency', 'Serve hot'],
    seniorTip: 'Savory oats is a light, healthy dinner option. High fiber helps digestion overnight.',
    tags: ['high-protein', 'vegetarian', 'light', 'fiber-rich', 'quick']
  },
  {
    id: 'd23', name: 'Shrimp Stir Fry', hindiName: 'झींगा भुना',
    category: 'dinner', cookTime: 15, protein: 30, calories: 200,
    ingredients: ['250g shrimp', 'Garlic', 'Ginger', 'Soy sauce', 'Lemon', 'Spring onion', 'Sesame oil', 'Pepper'],
    steps: ['Clean shrimp thoroughly', 'Heat oil and fry garlic ginger', 'Add shrimp and cook 3 minutes', 'Add soy sauce and lemon', 'Finish with sesame oil', 'Garnish with spring onion'],
    seniorTip: 'Shrimp cooks in minutes and is very high protein. Easy to chew and digest for seniors.',
    tags: ['very-high-protein', 'non-veg', 'quick', 'easy-to-chew']
  },
  {
    id: 'd24', name: 'Beans and Rice', hindiName: 'राजमा चावल',
    category: 'dinner', cookTime: 40, protein: 16, calories: 380,
    ingredients: ['1/2 cup beans', '1 cup brown rice', 'Tomato', 'Onion', 'Garlic', 'Cumin', 'Coriander', 'Lemon'],
    steps: ['Cook beans in pressure cooker', 'Cook brown rice separately', 'Make simple tomato masala', 'Add beans to masala', 'Serve over brown rice', 'Add lemon and coriander'],
    seniorTip: 'Beans plus rice gives complete protein. Brown rice lowers blood sugar spike — ideal for diabetics.',
    tags: ['high-protein', 'vegetarian', 'diabetic-friendly', 'complete-protein']
  },
  {
    id: 'd25', name: 'Milk Paneer Kheer', hindiName: 'पनीर खीर',
    category: 'dinner', cookTime: 30, protein: 16, calories: 280,
    ingredients: ['1 cup milk', '100g soft paneer', 'Sugar or jaggery', 'Cardamom', 'Saffron', 'Almonds', 'Pistachios'],
    steps: ['Heat milk and reduce to half', 'Add crumbled soft paneer', 'Add sugar and cardamom', 'Add saffron and stir', 'Cook 10 minutes', 'Serve warm or cold with nuts'],
    seniorTip: 'Casein protein in paneer and milk digests slowly overnight — best for muscle preservation while sleeping.',
    tags: ['high-protein', 'vegetarian', 'dessert', 'muscle-preservation', 'sweet']
  },
  // ========== SNACKS (25) ==========
  {
    id: 's1', name: 'Boiled Chana Chat', hindiName: 'उबला चना चाट',
    category: 'snack', cookTime: 10, protein: 15, calories: 180,
    ingredients: ['1 cup boiled chana', 'Onion chopped', 'Tomato chopped', 'Lemon juice', 'Chaat masala', 'Black salt', 'Coriander', 'Green chilli'],
    steps: ['Boil chana until soft', 'Mix with chopped vegetables', 'Add lemon juice generously', 'Add chaat masala and black salt', 'Toss well', 'Garnish with coriander'],
    seniorTip: 'Best afternoon snack. High protein and fiber keeps you full until dinner. Cheapest protein snack.',
    tags: ['high-protein', 'vegetarian', 'affordable', 'filling']
  },
  {
    id: 's2', name: 'Roasted Peanuts', hindiName: 'भुनी मूंगफली',
    category: 'snack', cookTime: 10, protein: 10, calories: 160,
    ingredients: ['50g raw peanuts', 'Salt', 'Chilli powder', 'Chaat masala', 'Lemon juice'],
    steps: ['Dry roast peanuts in pan', 'Roast until golden and fragrant', 'Sprinkle salt and chilli', 'Add chaat masala', 'Add lemon juice', 'Cool and eat'],
    seniorTip: 'Handful of peanuts is perfect 4pm snack. Prevents overeating at dinner. Heart healthy fats.',
    tags: ['high-protein', 'vegetarian', 'affordable', 'heart-healthy']
  },
  {
    id: 's3', name: 'Paneer Tikka Snack', hindiName: 'पनीर टिक्का स्नैक',
    category: 'snack', cookTime: 20, protein: 20, calories: 240,
    ingredients: ['150g paneer cubes', 'Bell peppers', 'Onion', 'Curd', 'Tikka masala', 'Lemon', 'Chaat masala'],
    steps: ['Marinate paneer in spiced curd', 'Thread on toothpicks with vegetables', 'Grill on tawa', 'Cook until golden marks', 'Sprinkle chaat masala', 'Serve with mint chutney'],
    seniorTip: 'Paneer tikka as snack provides protein hit between meals. Prevents muscle loss throughout day.',
    tags: ['high-protein', 'vegetarian', 'restaurant-style', 'muscle-preservation']
  },
  {
    id: 's4', name: 'Greek Yogurt with Berries', hindiName: 'दही फल',
    category: 'snack', cookTime: 5, protein: 12, calories: 150,
    ingredients: ['150g hung curd', 'Seasonal fruits', '1 tbsp honey', 'Mixed seeds', 'Granola optional'],
    steps: ['Take hung curd in bowl', 'Top with seasonal fruits', 'Add honey', 'Sprinkle seeds', 'Add granola for crunch', 'Serve immediately'],
    seniorTip: 'Perfect 4pm snack. Curd protein keeps energy stable. Seeds provide omega-3 and minerals.',
    tags: ['high-protein', 'vegetarian', 'quick', 'energy-boost']
  },
  {
    id: 's5', name: 'Egg Salad', hindiName: 'अंडा सलाद',
    category: 'snack', cookTime: 15, protein: 18, calories: 200,
    ingredients: ['3 boiled eggs', 'Cucumber', 'Tomato', 'Onion', 'Mustard', 'Black pepper', 'Salt', 'Coriander'],
    steps: ['Boil and peel eggs', 'Mash or slice eggs', 'Mix with chopped vegetables', 'Add mustard and pepper', 'Mix well', 'Eat with whole wheat crackers'],
    seniorTip: 'High protein snack that keeps hunger away for 3 hours. Eggs contain all 9 essential amino acids.',
    tags: ['high-protein', 'non-veg', 'filling', 'complete-protein']
  },
  {
    id: 's6', name: 'Soya Milk', hindiName: 'सोया दूध',
    category: 'snack', cookTime: 5, protein: 8, calories: 120,
    ingredients: ['200ml soya milk', '1 tsp honey', 'Cardamom', 'Pinch of turmeric', 'Warm or cold'],
    steps: ['Heat soya milk or serve cold', 'Add honey and cardamom', 'Add turmeric if having warm', 'Stir well', 'Drink slowly', 'Best afternoon snack'],
    seniorTip: 'Soya milk is complete plant protein. Reduces cholesterol. Excellent for diabetics and heart patients.',
    tags: ['high-protein', 'vegetarian', 'heart-healthy', 'diabetic-friendly']
  },
  {
    id: 's7', name: 'Sprouts Chaat', hindiName: 'अंकुरित चाट',
    category: 'snack', cookTime: 10, protein: 14, calories: 160,
    ingredients: ['1 cup mixed sprouts', 'Pomegranate', 'Cucumber', 'Tomato', 'Lemon', 'Chaat masala', 'Black salt', 'Coriander'],
    steps: ['Steam sprouts lightly', 'Mix with all vegetables', 'Add pomegranate seeds', 'Add lemon and spices', 'Toss well', 'Serve immediately'],
    seniorTip: 'Sprouts are living food — highest nutrients. Pomegranate adds antioxidants. Perfect senior snack.',
    tags: ['high-protein', 'vegetarian', 'antioxidant', 'living-food']
  },
  {
    id: 's8', name: 'Peanut Butter Toast', hindiName: 'मूंगफली टोस्ट',
    category: 'snack', cookTime: 5, protein: 12, calories: 220,
    ingredients: ['2 whole wheat bread', '2 tbsp natural peanut butter', '1 banana', '1 tsp honey', 'Chia seeds'],
    steps: ['Toast whole wheat bread', 'Spread peanut butter', 'Add banana slices', 'Drizzle honey', 'Sprinkle chia seeds', 'Eat immediately'],
    seniorTip: 'Peanut butter on whole wheat is balanced carb-protein snack. Banana adds potassium for heart health.',
    tags: ['high-protein', 'vegetarian', 'quick', 'heart-healthy']
  },
  {
    id: 's9', name: 'Roasted Chickpeas', hindiName: 'भुना चना',
    category: 'snack', cookTime: 30, protein: 12, calories: 150,
    ingredients: ['1 cup kabuli chana', 'Olive oil', 'Cumin powder', 'Chilli powder', 'Salt', 'Amchur'],
    steps: ['Drain and dry chickpeas', 'Toss with oil and spices', 'Spread on baking tray', 'Bake at 200°C for 25 minutes', 'Cool until crispy', 'Store in airtight container'],
    seniorTip: 'Crispy roasted chickpeas are better than chips. High protein healthy snack. Make in bulk.',
    tags: ['high-protein', 'vegetarian', 'crunchy', 'meal-prep']
  },
  {
    id: 's10', name: 'Cottage Cheese Dip', hindiName: 'पनीर डिप',
    category: 'snack', cookTime: 10, protein: 16, calories: 180,
    ingredients: ['150g soft paneer', 'Garlic', 'Lemon juice', 'Coriander', 'Green chilli', 'Salt', 'Cucumber sticks', 'Carrot sticks'],
    steps: ['Blend paneer until smooth', 'Add garlic and lemon', 'Add chilli and coriander', 'Blend to creamy dip', 'Serve with vegetable sticks', 'Refrigerate for 30 minutes'],
    seniorTip: 'High protein dip with raw vegetables. Crunching raw vegetables is excellent jaw exercise for seniors.',
    tags: ['high-protein', 'vegetarian', 'no-cook', 'raw-vegetables']
  },
  {
    id: 's11', name: 'Almonds and Walnuts', hindiName: 'बादाम अखरोट',
    category: 'snack', cookTime: 2, protein: 8, calories: 180,
    ingredients: ['10 almonds', '5 walnuts', '5 cashews', 'Pinch of black salt', 'Turmeric milk optional'],
    steps: ['Soak almonds overnight', 'Peel soaked almonds', 'Mix all nuts together', 'Add black salt', 'Eat slowly chewing well', 'Have with warm turmeric milk'],
    seniorTip: 'Soaked almonds are easier to digest than raw. Walnuts are best brain food — have daily for cognitive health.',
    tags: ['high-protein', 'vegetarian', 'brain-health', 'bone-health', 'daily-essential']
  },
  {
    id: 's12', name: 'Besan Ladoo', hindiName: 'बेसन लड्डू',
    category: 'snack', cookTime: 20, protein: 8, calories: 180,
    ingredients: ['1 cup besan', 'Ghee', 'Jaggery', 'Cardamom', 'Almonds', 'Cashews'],
    steps: ['Roast besan in ghee until fragrant', 'Add powdered jaggery', 'Add cardamom and nuts', 'Mix well and cool slightly', 'Form into small balls', 'Store in airtight container'],
    seniorTip: 'Traditional protein sweet. Besan is high protein. Use jaggery not sugar for iron and minerals.',
    tags: ['high-protein', 'vegetarian', 'traditional', 'sweet', 'festive']
  },
  {
    id: 's13', name: 'Tuna Crackers', hindiName: 'टूना क्रैकर्स',
    category: 'snack', cookTime: 5, protein: 20, calories: 220,
    ingredients: ['1 can tuna', 'Whole wheat crackers', 'Lemon', 'Black pepper', 'Onion', 'Cucumber'],
    steps: ['Drain tuna can', 'Mix with lemon and pepper', 'Add chopped onion and cucumber', 'Serve on whole wheat crackers', 'Top with cucumber slice', 'Eat immediately'],
    seniorTip: 'Canned tuna is most convenient protein. 5-minute snack with 20g protein. Available everywhere.',
    tags: ['very-high-protein', 'non-veg', 'quick', 'convenient']
  },
  {
    id: 's14', name: 'Chana Dal Namkeen', hindiName: 'चना दाल नमकीन',
    category: 'snack', cookTime: 20, protein: 12, calories: 200,
    ingredients: ['1 cup chana dal', 'Oil for frying', 'Salt', 'Chilli powder', 'Amchur', 'Cumin powder'],
    steps: ['Soak chana dal 2 hours', 'Dry completely on cloth', 'Deep fry until crispy', 'Drain on paper', 'Season with spices', 'Cool and store in box'],
    seniorTip: 'Homemade namkeen is healthier than packaged. High protein. Better than chips for seniors.',
    tags: ['high-protein', 'vegetarian', 'crunchy', 'homemade']
  },
  {
    id: 's15', name: 'Fruit Yogurt', hindiName: 'फ्रूट योगर्ट',
    category: 'snack', cookTime: 5, protein: 10, calories: 160,
    ingredients: ['200g curd', 'Mango or banana', 'Honey', 'Cardamom', 'Pomegranate seeds', 'Mint'],
    steps: ['Whisk curd smooth', 'Add honey and cardamom', 'Add fruit pieces', 'Mix gently', 'Top with pomegranate', 'Garnish with mint'],
    seniorTip: 'Curd is probiotic and high protein. Adding fruit provides natural vitamins and sugars for energy.',
    tags: ['high-protein', 'vegetarian', 'probiotic', 'energy-boost', 'refreshing']
  },
  {
    id: 's16', name: 'Makhana Namkeen', hindiName: 'मखाना नमकीन',
    category: 'snack', cookTime: 10, protein: 8, calories: 120,
    ingredients: ['2 cups makhana', 'Ghee', 'Salt', 'Black pepper', 'Turmeric', 'Roasted cumin powder'],
    steps: ['Heat ghee in pan', 'Add makhana and roast', 'Roast on low heat 8 minutes', 'Add all spices', 'Toss well', 'Cool and store in airtight box'],
    seniorTip: 'Makhana is high protein low calorie. Anti-aging food. Excellent for seniors with diabetes and arthritis.',
    tags: ['high-protein', 'vegetarian', 'anti-aging', 'diabetic-friendly', 'low-calorie']
  },
  {
    id: 's17', name: 'Boiled Eggs', hindiName: 'उबले अंडे',
    category: 'snack', cookTime: 12, protein: 18, calories: 150,
    ingredients: ['3 eggs', 'Black salt', 'Chaat masala', 'Lemon juice', 'Black pepper', 'Coriander'],
    steps: ['Boil eggs in water', 'Cook 10 minutes', 'Cool in cold water', 'Peel carefully', 'Season with black salt and masala', 'Add lemon and serve'],
    seniorTip: 'Simplest high protein snack. Carry boiled eggs for travel. Never go hungry with eggs.',
    tags: ['very-high-protein', 'non-veg', 'portable', 'travel-friendly']
  },
  {
    id: 's18', name: 'Murmura Chivda', hindiName: 'मुरमुरा चिवड़ा',
    category: 'snack', cookTime: 15, protein: 6, calories: 150,
    ingredients: ['2 cups puffed rice', '3 tbsp peanuts', '1/4 cup chana dal', 'Curry leaves', 'Mustard seeds', 'Turmeric', 'Oil', 'Salt'],
    steps: ['Roast peanuts and chana dal', 'Temper mustard seeds and curry leaves', 'Add puffed rice and toss', 'Add turmeric and salt', 'Roast on low heat', 'Cool and store'],
    seniorTip: 'Light snack with protein from peanuts and dal. Very common across India. Easily portable.',
    tags: ['protein', 'vegetarian', 'light', 'traditional', 'portable']
  },
  {
    id: 's19', name: 'Dahi Vada', hindiName: 'दही वड़ा',
    category: 'snack', cookTime: 30, protein: 14, calories: 260,
    ingredients: ['1/2 cup urad dal vadas', 'Thick curd', 'Tamarind chutney', 'Green chutney', 'Chaat masala', 'Cumin', 'Red chilli'],
    steps: ['Soak vadas in water', 'Squeeze and place in curd', 'Add both chutneys', 'Sprinkle masalas', 'Refrigerate 30 minutes', 'Serve chilled'],
    seniorTip: 'Soaked vadas are much lighter than fried. Curd adds protein. Excellent cooling snack for summers.',
    tags: ['high-protein', 'vegetarian', 'cooling', 'probiotic', 'summer-special']
  },
  {
    id: 's20', name: 'Protein Bar Homemade', hindiName: 'प्रोटीन बार',
    category: 'snack', cookTime: 20, protein: 16, calories: 240,
    ingredients: ['3 tbsp peanut butter', '2 tbsp oats', '2 tbsp honey', '1 tbsp chia seeds', '2 tbsp protein powder', 'Mixed nuts', 'Dates'],
    steps: ['Blend dates until sticky paste', 'Mix with peanut butter', 'Add oats, protein powder, seeds', 'Mix thoroughly', 'Press into tray', 'Refrigerate 2 hours and cut'],
    seniorTip: 'Homemade protein bar without preservatives. Perfect pre or post workout snack. Make weekly batch.',
    tags: ['very-high-protein', 'vegetarian', 'homemade', 'pre-workout', 'meal-prep']
  },
  {
    id: 's21', name: 'Coconut Chutney with Idli', hindiName: 'नारियल चटनी इडली',
    category: 'snack', cookTime: 15, protein: 10, calories: 200,
    ingredients: ['2 idlis', 'Fresh coconut', 'Roasted chana dal', 'Green chilli', 'Ginger', 'Mustard seeds', 'Curry leaves'],
    steps: ['Blend coconut with chana dal', 'Add chilli and ginger', 'Make thick chutney', 'Temper mustard seeds', 'Serve idli with chutney', 'Add sambar on side'],
    seniorTip: 'Idli is probiotic fermented food. Chana dal in chutney adds protein. Excellent South Indian snack.',
    tags: ['high-protein', 'vegetarian', 'south-indian', 'probiotic']
  },
  {
    id: 's22', name: 'Sattu Laddoo', hindiName: 'सत्तू लड्डू',
    category: 'snack', cookTime: 15, protein: 14, calories: 220,
    ingredients: ['1 cup sattu', 'Ghee', 'Jaggery powder', 'Cardamom', 'Fennel seeds', 'Desiccated coconut'],
    steps: ['Mix sattu with ghee', 'Add jaggery and spices', 'Add coconut and mix', 'Form into firm balls', 'If dry add more ghee', 'Store in cool place'],
    seniorTip: 'Sattu is Bihar\'s protein powerhouse. High protein energy ball. Perfect pre-workout or travel snack.',
    tags: ['high-protein', 'vegetarian', 'bihar', 'traditional', 'energy']
  },
  {
    id: 's23', name: 'Methi Seeds Water', hindiName: 'मेथी बीज पानी',
    category: 'snack', cookTime: 5, protein: 4, calories: 40,
    ingredients: ['1 tsp methi seeds', '1 glass warm water', 'Lemon optional', 'Honey optional'],
    steps: ['Soak methi seeds overnight', 'Morning drink soaked water', 'Or boil briefly and cool', 'Add lemon if desired', 'Drink on empty stomach', 'Eat soaked seeds too'],
    seniorTip: 'Methi water controls blood sugar, cholesterol, and joint pain. Essential daily ritual for 60+ adults.',
    tags: ['diabetic-friendly', 'vegetarian', 'medicinal', 'daily-ritual', 'joint-health']
  },
  {
    id: 's24', name: 'Protein Lassi', hindiName: 'प्रोटीन लस्सी',
    category: 'snack', cookTime: 5, protein: 18, calories: 220,
    ingredients: ['200ml thick curd', '50ml milk', '1 tbsp honey', '1 tsp cardamom', 'Rose water', 'Ice cubes', 'Saffron'],
    steps: ['Blend curd and milk', 'Add honey and cardamom', 'Add rose water and saffron', 'Blend with ice', 'Pour in glass', 'Serve immediately'],
    seniorTip: 'Lassi is traditional Punjabi protein drink. Curd protein + milk protein = 18g in one glass.',
    tags: ['high-protein', 'vegetarian', 'punjabi', 'traditional', 'cooling']
  },
  {
    id: 's25', name: 'Peanut Chikki', hindiName: 'मूंगफली चिक्की',
    category: 'snack', cookTime: 20, protein: 10, calories: 200,
    ingredients: ['1 cup peanuts', 'Jaggery', 'Ghee', 'Cardamom'],
    steps: ['Roast peanuts and remove skin', 'Melt jaggery with ghee', 'Cook until string consistency', 'Add peanuts quickly', 'Spread on greased plate', 'Cut while warm', 'Store when cool'],
    seniorTip: 'Chikki is traditional high protein sweet. Jaggery provides iron. Better than chocolate for seniors.',
    tags: ['high-protein', 'vegetarian', 'traditional', 'sweet', 'iron-rich']
  },
];

export default function RecipeGuide({ profile }: RecipeGuideProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: '🍽️ All' },
    { id: 'breakfast', label: '🌅 Breakfast' },
    { id: 'lunch', label: '☀️ Lunch' },
    { id: 'dinner', label: '🌙 Dinner' },
    { id: 'snack', label: '🍎 Snack' },
  ];

  function toggleFavourite(id: string) {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const filtered = ALL_RECIPES.filter((r) => {
    const matchCat = category === 'all' || r.category === category;
    const matchFav = category === 'favourites' ? favourites.includes(r.id) : true;
    const matchSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.hindiName.includes(search) ||
      r.tags.some((t) => t.includes(search.toLowerCase()));
    return matchCat && matchSearch && matchFav;
  });

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
          <ChefHat size={40} className="text-orange-400 mx-auto mb-3" />
          <p className="text-orange-800 font-bold text-lg">Set Up Your Profile First</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Recipe Guide</h2>
        <p className="text-gray-500 mt-1">100 Indian high-protein recipes for 60+ adults</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-orange-500">100</p>
          <p className="text-xs text-gray-400">Recipes</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-emerald-500">{filtered.length}</p>
          <p className="text-xs text-gray-400">Showing</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-red-400">{favourites.length}</p>
          <p className="text-xs text-gray-400">Favourites ❤️</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search recipes, ingredients, tags..."
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
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <button
          onClick={() => setCategory('favourites')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            category === 'favourites'
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          ❤️ Saved
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="space-y-3">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-4 cursor-pointer" onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-gray-900">{recipe.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[recipe.category]}`}>
                      {recipe.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{recipe.hindiName}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-orange-500 font-bold">
                      <Zap size={14} />{recipe.protein}g protein
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} />{recipe.cookTime} mins
                    </span>
                    <span className="text-gray-400">{recipe.calories} cal</span>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavourite(recipe.id); }} className="ml-2 p-1">
                  <Heart size={20} className={favourites.includes(recipe.id) ? 'text-red-500 fill-red-500' : 'text-gray-300'} />
                </button>
              </div>
            </div>

            {expanded === recipe.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="mt-3 mb-3">
                  <p className="font-bold text-gray-800 text-sm mb-2">🛒 Ingredients</p>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>{ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-bold text-gray-800 text-sm mb-2">👨‍🍳 How to Make</p>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>{step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700 mb-1">👴 Senior Tip (60+)</p>
                  <p className="text-sm text-amber-800">{recipe.seniorTip}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {recipe.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <ChefHat size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No recipes found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}