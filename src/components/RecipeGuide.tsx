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
  healthTag: 'weight-loss' | 'heart-health' | 'diabetes' | 'bone-joint';
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

const healthColors: Record<string, string> = {
  'weight-loss': 'bg-orange-100 text-orange-700',
  'heart-health': 'bg-red-100 text-red-700',
  'diabetes': 'bg-blue-100 text-blue-700',
  'bone-joint': 'bg-green-100 text-green-700',
};

const healthLabels: Record<string, string> = {
  'weight-loss': '⚖️ Weight Loss',
  'heart-health': '❤️ Heart Health',
  'diabetes': '🩺 Diabetes',
  'bone-joint': '🦴 Bone & Joint',
};

const ALL_RECIPES: Recipe[] = [
  // ========== WEIGHT LOSS (25) ==========
  {
    id: 'w1', name: 'Cucumber Moong Salad', hindiName: 'खीरा मूंग सलाद',
    category: 'breakfast', cookTime: 10, protein: 14, calories: 130,
    healthTag: 'weight-loss',
    ingredients: ['1 cup sprouted moong', '1 cucumber', '1 tomato', '1 lemon', 'Black salt', 'Cumin powder', 'Coriander'],
    steps: ['Steam sprouts 5 mins', 'Chop cucumber and tomato', 'Mix all together', 'Add lemon and spices', 'Toss well', 'Serve immediately'],
    seniorTip: 'Only 130 calories with 14g protein. Perfect weight loss breakfast. Very filling due to high fiber.',
    tags: ['weight-loss', 'low-calorie', 'high-protein', 'no-cook']
  },
  {
    id: 'w2', name: 'Egg White Vegetable Omelette', hindiName: 'अंडे का सफेद ऑमलेट',
    category: 'breakfast', cookTime: 10, protein: 20, calories: 150,
    healthTag: 'weight-loss',
    ingredients: ['4 egg whites', 'Spinach', 'Mushrooms', 'Bell peppers', 'Onion', 'Salt', 'Pepper', 'Olive oil spray'],
    steps: ['Whisk egg whites', 'Saute vegetables in spray oil', 'Pour egg whites over vegetables', 'Cook both sides', 'Fold and serve', 'Season with pepper'],
    seniorTip: 'Zero fat, pure protein. Egg whites are best weight loss food. Adding vegetables fills you up.',
    tags: ['weight-loss', 'zero-fat', 'high-protein', 'filling']
  },
  {
    id: 'w3', name: 'Green Smoothie', hindiName: 'हरी स्मूदी',
    category: 'breakfast', cookTime: 5, protein: 10, calories: 140,
    healthTag: 'weight-loss',
    ingredients: ['1 cup spinach', '1 green apple', '1 cucumber', '1 inch ginger', '1 lemon', '1 tbsp chia seeds', 'Water'],
    steps: ['Add all ingredients to blender', 'Blend until smooth', 'Add water for consistency', 'Add chia seeds and blend', 'Pour in glass', 'Drink immediately'],
    seniorTip: 'Alkaline green smoothie reduces inflammation. Ginger boosts metabolism for weight loss.',
    tags: ['weight-loss', 'alkaline', 'metabolism-boost', 'detox']
  },
  {
    id: 'w4', name: 'Masala Oats Porridge', hindiName: 'मसाला ओट्स',
    category: 'breakfast', cookTime: 10, protein: 12, calories: 200,
    healthTag: 'weight-loss',
    ingredients: ['1 cup rolled oats', 'Onion', 'Tomato', 'Green peas', 'Carrot', 'Cumin', 'Turmeric', 'Salt'],
    steps: ['Roast oats lightly', 'Saute vegetables', 'Add oats to vegetables', 'Add water and cook', 'Stir until thick', 'Serve hot'],
    seniorTip: 'Oats beta-glucan reduces cholesterol and hunger. Keeps you full 4+ hours. Perfect weight loss food.',
    tags: ['weight-loss', 'low-calorie', 'filling', 'cholesterol-friendly']
  },
  {
    id: 'w5', name: 'Watermelon Mint Juice', hindiName: 'तरबूज पुदीना रस',
    category: 'snack', cookTime: 5, protein: 2, calories: 60,
    healthTag: 'weight-loss',
    ingredients: ['2 cups watermelon', 'Fresh mint', '1 lemon', 'Black salt', 'Roasted cumin', 'Ice cubes'],
    steps: ['Blend watermelon', 'Add mint leaves', 'Add lemon and black salt', 'Add cumin powder', 'Blend with ice', 'Serve chilled'],
    seniorTip: 'Only 60 calories. Watermelon is 92% water — best hydration for weight loss in summers.',
    tags: ['weight-loss', 'very-low-calorie', 'hydrating', 'summer-drink']
  },
  {
    id: 'w6', name: 'Moong Dal Soup', hindiName: 'मूंग दाल सूप',
    category: 'lunch', cookTime: 25, protein: 14, calories: 160,
    healthTag: 'weight-loss',
    ingredients: ['1 cup moong dal', 'Spinach', 'Tomato', 'Garlic', 'Ginger', 'Lemon', 'Black pepper', 'Cumin'],
    steps: ['Cook dal until mushy', 'Add spinach and cook', 'Blend until smooth', 'Add garlic temper', 'Add lemon and pepper', 'Serve hot'],
    seniorTip: 'This soup is filling but only 160 calories. Replace one meal with this soup for fast weight loss.',
    tags: ['weight-loss', 'low-calorie', 'filling', 'meal-replacement']
  },
  {
    id: 'w7', name: 'Grilled Fish with Salad', hindiName: 'ग्रिल्ड मछली सलाद',
    category: 'lunch', cookTime: 25, protein: 32, calories: 280,
    healthTag: 'weight-loss',
    ingredients: ['250g fish fillet', 'Mixed greens', 'Cucumber', 'Tomato', 'Lemon dressing', 'Olive oil', 'Spices'],
    steps: ['Marinate fish with spices and lemon', 'Grill on high heat', 'Prepare salad with dressing', 'Place fish on salad bed', 'Add extra lemon squeeze', 'Serve immediately'],
    seniorTip: 'Highest protein to calorie ratio. Fish fills you up without fat. Best weight loss lunch.',
    tags: ['weight-loss', 'high-protein', 'low-calorie', 'omega-3']
  },
  {
    id: 'w8', name: 'Vegetable Clear Soup', hindiName: 'सब्जी का साफ सूप',
    category: 'dinner', cookTime: 20, protein: 8, calories: 80,
    healthTag: 'weight-loss',
    ingredients: ['Broccoli', 'Carrot', 'Beans', 'Mushrooms', 'Garlic', 'Ginger', 'Pepper', 'Salt'],
    steps: ['Boil water with garlic and ginger', 'Add all vegetables', 'Cook 10 minutes', 'Season with pepper and salt', 'Do not blend — keep chunky', 'Serve very hot'],
    seniorTip: 'Only 80 calories for dinner! Have before main meal to eat 20% less. Best weight loss strategy.',
    tags: ['weight-loss', 'very-low-calorie', 'pre-meal', 'appetite-control']
  },
  {
    id: 'w9', name: 'Tandoori Chicken Salad', hindiName: 'तंदूरी चिकन सलाद',
    category: 'lunch', cookTime: 35, protein: 36, calories: 280,
    healthTag: 'weight-loss',
    ingredients: ['200g chicken breast', 'Tandoori masala', 'Curd', 'Mixed greens', 'Onion rings', 'Lemon', 'Mint chutney'],
    steps: ['Marinate chicken in spiced curd', 'Grill until charred', 'Slice chicken thin', 'Place on bed of greens', 'Add onion rings', 'Drizzle mint chutney'],
    seniorTip: 'Tandoori chicken is zero oil grilled protein. This salad replaces a full meal at only 280 calories.',
    tags: ['weight-loss', 'high-protein', 'grilled', 'zero-oil']
  },
  {
    id: 'w10', name: 'Lauki Raita', hindiName: 'लौकी रायता',
    category: 'dinner', cookTime: 15, protein: 10, calories: 120,
    healthTag: 'weight-loss',
    ingredients: ['1 cup lauki grated', '200g curd', 'Roasted cumin', 'Black salt', 'Mint', 'Green chilli', 'Coriander'],
    steps: ['Cook lauki until soft', 'Cool completely', 'Whisk curd smooth', 'Mix lauki into curd', 'Add spices', 'Garnish with mint'],
    seniorTip: 'Lauki is 96% water. This raita is extremely filling with very few calories. Perfect light dinner.',
    tags: ['weight-loss', 'very-low-calorie', 'filling', 'probiotic']
  },
  {
    id: 'w11', name: 'Steamed Idli with Sambar', hindiName: 'उबला इडली सांभर',
    category: 'breakfast', cookTime: 30, protein: 14, calories: 250,
    healthTag: 'weight-loss',
    ingredients: ['4 small idlis', 'Thin sambar', 'Coconut chutney', 'Drumstick in sambar', 'Toor dal', 'Vegetables'],
    steps: ['Steam idlis without oil', 'Make thin sambar', 'Avoid adding sugar', 'Serve idli in sambar bowl', 'Add chutney sparingly', 'Eat slowly and mindfully'],
    seniorTip: 'Fermented idli has low glycemic index. Steamed not fried. Sambar adds protein. Perfect south Indian diet.',
    tags: ['weight-loss', 'low-gi', 'probiotic', 'south-indian']
  },
  {
    id: 'w12', name: 'Palak Paneer Light', hindiName: 'हल्का पालक पनीर',
    category: 'lunch', cookTime: 25, protein: 20, calories: 240,
    healthTag: 'weight-loss',
    ingredients: ['150g low-fat paneer', '3 cups spinach', 'Tomatoes', 'Onion', 'Spices', 'Minimal oil', 'No cream'],
    steps: ['Blanch and puree spinach', 'Saute onion and tomato in minimal oil', 'Add spinach puree', 'Add low-fat paneer', 'Simmer without cream', 'Serve with roti'],
    seniorTip: 'Skip cream to save 100 calories. Low-fat paneer has same protein. This version is 40% fewer calories.',
    tags: ['weight-loss', 'low-fat', 'high-protein', 'modified-recipe']
  },
  {
    id: 'w13', name: 'Bitter Gourd Sabzi', hindiName: 'करेला सब्जी',
    category: 'lunch', cookTime: 20, protein: 6, calories: 100,
    healthTag: 'weight-loss',
    ingredients: ['2 bitter gourds', 'Onion', 'Tomato', 'Turmeric', 'Cumin', 'Minimal oil', 'Salt', 'Lemon'],
    steps: ['Slice and salt karela', 'Rest 15 minutes to reduce bitterness', 'Squeeze and wash', 'Saute in minimal oil', 'Add onion and spices', 'Cook until soft'],
    seniorTip: 'Karela controls blood sugar and aids weight loss. Reduces belly fat specifically. Bitter taste gets easier.',
    tags: ['weight-loss', 'blood-sugar', 'belly-fat', 'medicinal']
  },
  {
    id: 'w14', name: 'Protein Chaas', hindiName: 'प्रोटीन छाछ',
    category: 'snack', cookTime: 5, protein: 10, calories: 90,
    healthTag: 'weight-loss',
    ingredients: ['200ml buttermilk', '1 tbsp sattu', 'Roasted cumin', 'Black salt', 'Ginger', 'Mint leaves', 'Ice'],
    steps: ['Blend buttermilk with sattu', 'Add cumin and black salt', 'Add ginger and mint', 'Blend with ice', 'Pour and serve', 'Drink between meals'],
    seniorTip: 'Only 90 calories with 10g protein. Sattu in chaas is best Indian weight loss drink. Drink daily.',
    tags: ['weight-loss', 'low-calorie', 'protein-drink', 'traditional']
  },
  {
    id: 'w15', name: 'Mushroom Egg Scramble', hindiName: 'मशरूम अंडा भुर्जी',
    category: 'breakfast', cookTime: 15, protein: 22, calories: 180,
    healthTag: 'weight-loss',
    ingredients: ['3 eggs', '1 cup mushrooms', 'Onion', 'Garlic', 'Pepper', 'Salt', 'Minimal oil', 'Parsley'],
    steps: ['Saute mushrooms until browned', 'Add onion and garlic', 'Beat eggs and add', 'Scramble on medium heat', 'Season with pepper', 'Serve hot'],
    seniorTip: 'Mushrooms are extremely low calorie but filling. This breakfast gives 22g protein at only 180 calories.',
    tags: ['weight-loss', 'low-calorie', 'high-protein', 'filling']
  },
  {
    id: 'w16', name: 'Ragi Dosa', hindiName: 'रागी डोसा',
    category: 'breakfast', cookTime: 20, protein: 10, calories: 180,
    healthTag: 'weight-loss',
    ingredients: ['1 cup ragi flour', '1/4 cup rice flour', 'Onion', 'Green chilli', 'Cumin', 'Salt', 'Water'],
    steps: ['Mix flours with water to thin batter', 'Add onion chilli and spices', 'Heat tawa until hot', 'Pour batter and spread thin', 'Cook until crispy', 'Serve with sambar'],
    seniorTip: 'Ragi has high calcium and fiber. Very low glycemic index. Keeps you full longer than wheat. Best for weight loss.',
    tags: ['weight-loss', 'high-calcium', 'low-gi', 'fiber-rich']
  },
  {
    id: 'w17', name: 'Curd with Flaxseeds', hindiName: 'अलसी दही',
    category: 'snack', cookTime: 5, protein: 12, calories: 130,
    healthTag: 'weight-loss',
    ingredients: ['200g low-fat curd', '1 tbsp flaxseeds', '1 tsp honey', 'Seasonal fruit', 'Cinnamon powder'],
    steps: ['Take curd in bowl', 'Add flaxseeds', 'Add honey and cinnamon', 'Add fruit pieces', 'Mix gently', 'Eat immediately'],
    seniorTip: 'Flaxseeds omega-3 reduces inflammation. Cinnamon controls appetite. Best afternoon snack for weight loss.',
    tags: ['weight-loss', 'omega-3', 'appetite-control', 'anti-inflammatory']
  },
  {
    id: 'w18', name: 'Zucchini Dal Soup', hindiName: 'तोरई दाल सूप',
    category: 'dinner', cookTime: 25, protein: 12, calories: 150,
    healthTag: 'weight-loss',
    ingredients: ['1/2 cup moong dal', '1 zucchini or turai', 'Tomato', 'Garlic', 'Ginger', 'Cumin', 'Lemon', 'Coriander'],
    steps: ['Cook dal with zucchini', 'Blend half the soup', 'Add garlic temper', 'Add lemon and spices', 'Serve hot', 'Garnish with coriander'],
    seniorTip: 'Zucchini adds bulk with almost zero calories. This soup fills stomach completely for only 150 calories.',
    tags: ['weight-loss', 'low-calorie', 'volumetric-eating', 'filling']
  },
  {
    id: 'w19', name: 'Chicken Lettuce Wrap', hindiName: 'चिकन लेटस रैप',
    category: 'lunch', cookTime: 20, protein: 30, calories: 220,
    healthTag: 'weight-loss',
    ingredients: ['200g minced chicken', 'Lettuce leaves', 'Garlic', 'Ginger', 'Soy sauce', 'Sesame oil', 'Spring onion', 'Chilli'],
    steps: ['Stir fry minced chicken', 'Add garlic and ginger', 'Season with soy sauce', 'Cook until dry', 'Place in lettuce cups', 'Top with spring onion'],
    seniorTip: 'No bread no rice! Lettuce replaces roti for weight loss. 30g protein at only 220 calories.',
    tags: ['weight-loss', 'no-carb', 'high-protein', 'innovative']
  },
  {
    id: 'w20', name: 'Apple Cinnamon Oats', hindiName: 'सेब दालचीनी ओट्स',
    category: 'breakfast', cookTime: 10, protein: 10, calories: 220,
    healthTag: 'weight-loss',
    ingredients: ['1 cup oats', '1 apple chopped', '1 tsp cinnamon', '1 tbsp honey', 'Almond milk', '5 almonds', 'Chia seeds'],
    steps: ['Cook oats in almond milk', 'Add chopped apple', 'Add cinnamon and honey', 'Stir until thick', 'Top with almonds', 'Add chia seeds and serve'],
    seniorTip: 'Cinnamon reduces blood sugar spikes by 29%. Apple pectin fiber suppresses appetite naturally.',
    tags: ['weight-loss', 'blood-sugar', 'appetite-control', 'fiber-rich']
  },
  {
    id: 'w21', name: 'Boiled Egg Salad', hindiName: 'उबला अंडा सलाद',
    category: 'snack', cookTime: 15, protein: 18, calories: 170,
    healthTag: 'weight-loss',
    ingredients: ['3 eggs boiled', 'Lettuce', 'Cucumber', 'Cherry tomatoes', 'Lemon dressing', 'Black pepper', 'Salt'],
    steps: ['Boil and peel eggs', 'Slice in half', 'Arrange on lettuce', 'Add vegetables around', 'Drizzle lemon dressing', 'Season with pepper'],
    seniorTip: 'Eating boiled eggs prevents overeating at next meal by up to 36%. Best weight management snack.',
    tags: ['weight-loss', 'appetite-control', 'high-protein', 'low-calorie']
  },
  {
    id: 'w22', name: 'Cauliflower Rice', hindiName: 'फूलगोभी चावल',
    category: 'lunch', cookTime: 15, protein: 8, calories: 120,
    healthTag: 'weight-loss',
    ingredients: ['1 cauliflower', 'Onion', 'Garlic', 'Peas', 'Carrot', 'Soy sauce', 'Pepper', 'Sesame oil'],
    steps: ['Grate cauliflower into rice-size pieces', 'Saute onion and garlic', 'Add vegetables', 'Add cauliflower rice', 'Season with soy sauce', 'Cook 5 minutes'],
    seniorTip: 'Cauliflower rice has 80% fewer calories than regular rice. Same taste, massive calorie saving.',
    tags: ['weight-loss', 'very-low-calorie', 'rice-substitute', 'innovative']
  },
  {
    id: 'w23', name: 'Tomato Egg Drop Soup', hindiName: 'टमाटर अंडा सूप',
    category: 'dinner', cookTime: 15, protein: 14, calories: 130,
    healthTag: 'weight-loss',
    ingredients: ['3 tomatoes', '2 eggs', 'Garlic', 'Ginger', 'Cornflour', 'Black pepper', 'Vinegar', 'Salt'],
    steps: ['Make tomato broth with garlic', 'Thicken with cornflour', 'Beat eggs', 'Slowly drizzle eggs into hot soup', 'Add vinegar and pepper', 'Serve immediately'],
    seniorTip: 'Chinese-style weight loss soup. Eggs drop gives protein. Tomato lycopene is anti-cancer for seniors.',
    tags: ['weight-loss', 'low-calorie', 'anti-cancer', 'quick-dinner']
  },
  {
    id: 'w24', name: 'Turai Sabzi', hindiName: 'तोरई सब्जी',
    category: 'lunch', cookTime: 15, protein: 4, calories: 80,
    healthTag: 'weight-loss',
    ingredients: ['2 turai (ridge gourd)', 'Onion', 'Tomato', 'Mustard seeds', 'Turmeric', 'Salt', 'Minimal oil'],
    steps: ['Peel and slice turai', 'Temper mustard seeds', 'Add onion and tomato', 'Add turai and turmeric', 'Cook covered until soft', 'Serve with roti'],
    seniorTip: 'Turai is 95% water and extremely low calorie. Excellent for kidney health and weight loss.',
    tags: ['weight-loss', 'very-low-calorie', 'kidney-friendly', 'traditional']
  },
  {
    id: 'w25', name: 'Protein Khichdi', hindiName: 'प्रोटीन खिचड़ी',
    category: 'dinner', cookTime: 25, protein: 18, calories: 280,
    healthTag: 'weight-loss',
    ingredients: ['1/4 cup rice', '3/4 cup mixed dal', 'Vegetables', 'Turmeric', 'Ghee minimal', 'Cumin', 'Asafoetida'],
    steps: ['Use less rice more dal ratio', 'Pressure cook together', 'Add extra vegetables', 'Make ghee temper', 'Keep consistency thin', 'Serve with pickle'],
    seniorTip: 'More dal less rice increases protein reduces carbs. This ratio gives 18g protein for weight loss.',
    tags: ['weight-loss', 'high-protein', 'low-carb', 'easy-digestion']
  },
  // ========== HEART HEALTH (25) ==========
  {
    id: 'h1', name: 'Oats with Flaxseed', hindiName: 'अलसी ओट्स',
    category: 'breakfast', cookTime: 10, protein: 12, calories: 280,
    healthTag: 'heart-health',
    ingredients: ['1 cup oats', '2 tbsp ground flaxseed', 'Almond milk', 'Blueberries', '1 tsp honey', 'Cinnamon', 'Walnuts'],
    steps: ['Cook oats in almond milk', 'Add flaxseed powder', 'Stir well and cook 5 minutes', 'Add honey and cinnamon', 'Top with blueberries', 'Add crushed walnuts'],
    seniorTip: 'Oats + flaxseed + walnuts = triple heart protection. Reduces LDL cholesterol by up to 15%. Eat daily.',
    tags: ['heart-health', 'cholesterol-reducing', 'omega-3', 'daily-essential']
  },
  {
    id: 'h2', name: 'Garlic Tomato Soup', hindiName: 'लहसुन टमाटर सूप',
    category: 'dinner', cookTime: 20, protein: 6, calories: 100,
    healthTag: 'heart-health',
    ingredients: ['5 tomatoes', '10 garlic cloves', 'Onion', 'Olive oil', 'Basil or tulsi', 'Black pepper', 'Salt'],
    steps: ['Roast garlic and tomatoes', 'Blend until smooth', 'Cook with olive oil', 'Add basil and pepper', 'Simmer 10 minutes', 'Serve hot'],
    seniorTip: 'Garlic reduces blood pressure and LDL cholesterol. Tomato lycopene protects arteries. Daily heart medicine.',
    tags: ['heart-health', 'blood-pressure', 'cholesterol', 'anti-inflammatory']
  },
  {
    id: 'h3', name: 'Walnut Banana Smoothie', hindiName: 'अखरोट केला स्मूदी',
    category: 'breakfast', cookTime: 5, protein: 12, calories: 280,
    healthTag: 'heart-health',
    ingredients: ['8 walnuts', '1 banana', '1 cup low-fat milk', '1 tbsp honey', 'Cinnamon', 'Cardamom'],
    steps: ['Soak walnuts 2 hours', 'Blend all ingredients', 'Add cinnamon and cardamom', 'Blend until smooth', 'Pour in glass', 'Drink immediately'],
    seniorTip: 'Walnuts are number 1 heart food. ALA omega-3 reduces heart attack risk by 30%. Eat 8 walnuts daily.',
    tags: ['heart-health', 'omega-3', 'blood-pressure', 'artery-protection']
  },
  {
    id: 'h4', name: 'Palak Dal', hindiName: 'पालक दाल',
    category: 'lunch', cookTime: 30, protein: 18, calories: 260,
    healthTag: 'heart-health',
    ingredients: ['1 cup toor dal', '2 cups spinach', 'Garlic', 'Tomato', 'Minimal ghee', 'Turmeric', 'Lemon', 'Cumin'],
    steps: ['Cook dal with turmeric', 'Blanch spinach', 'Add spinach to dal', 'Make garlic temper', 'Add tomato and cook', 'Finish with lemon'],
    seniorTip: 'Spinach folate prevents homocysteine buildup that damages arteries. Dal fiber removes cholesterol.',
    tags: ['heart-health', 'folate-rich', 'cholesterol-reducing', 'iron-rich']
  },
  {
    id: 'h5', name: 'Baked Fish with Herbs', hindiName: 'जड़ी बूटी पकी मछली',
    category: 'lunch', cookTime: 30, protein: 34, calories: 240,
    healthTag: 'heart-health',
    ingredients: ['300g fish', 'Olive oil', 'Garlic', 'Lemon', 'Turmeric', 'Black pepper', 'Coriander', 'Ajwain'],
    steps: ['Marinate fish with spices', 'Drizzle olive oil', 'Bake at 180°C for 20 minutes', 'Check for doneness', 'Squeeze lemon', 'Serve with salad'],
    seniorTip: 'Omega-3 in fish reduces triglycerides by 25-30%. Baking not frying keeps it heart-healthy.',
    tags: ['heart-health', 'omega-3', 'triglycerides', 'baked', 'zero-bad-fat']
  },
  {
    id: 'h6', name: 'Amla Juice', hindiName: 'आंवला रस',
    category: 'snack', cookTime: 5, protein: 1, calories: 30,
    healthTag: 'heart-health',
    ingredients: ['3 amla (Indian gooseberry)', 'Water', 'Honey optional', 'Ginger', 'Black salt'],
    steps: ['Wash and deseed amla', 'Blend with water', 'Strain through cloth', 'Add ginger juice', 'Add honey and black salt', 'Drink on empty stomach'],
    seniorTip: 'Amla is richest Vitamin C source. Reduces cholesterol and blood pressure naturally. Drink every morning.',
    tags: ['heart-health', 'vitamin-c', 'cholesterol', 'blood-pressure', 'daily-ritual']
  },
  {
    id: 'h7', name: 'Bajra Roti with Methi', hindiName: 'मेथी बाजरा रोटी',
    category: 'lunch', cookTime: 20, protein: 10, calories: 220,
    healthTag: 'heart-health',
    ingredients: ['1 cup bajra flour', '1/2 cup methi leaves', 'Garlic', 'Turmeric', 'Oil', 'Salt', 'Water'],
    steps: ['Mix bajra flour with methi', 'Add garlic and turmeric', 'Knead firm dough', 'Make thick rotis', 'Cook on tawa both sides', 'Serve with dal or curd'],
    seniorTip: 'Bajra reduces bad cholesterol. Methi controls blood sugar and cholesterol together. Traditional Rajasthani heart food.',
    tags: ['heart-health', 'cholesterol', 'blood-sugar', 'traditional', 'rajasthani']
  },
  {
    id: 'h8', name: 'Olive Oil Stir Fry Vegetables', hindiName: 'ऑलिव ऑयल सब्जी',
    category: 'dinner', cookTime: 15, protein: 8, calories: 180,
    healthTag: 'heart-health',
    ingredients: ['Broccoli', 'Bell peppers', 'Beans', 'Garlic', 'Olive oil', 'Black pepper', 'Lemon', 'Salt'],
    steps: ['Heat olive oil on medium', 'Add garlic and saute', 'Add harder vegetables first', 'Add bell peppers and beans', 'Season with pepper and salt', 'Finish with lemon'],
    seniorTip: 'Olive oil monounsaturated fat raises good HDL cholesterol. Broccoli sulforaphane protects heart arteries.',
    tags: ['heart-health', 'hdl-boosting', 'anti-inflammatory', 'mediterranean']
  },
  {
    id: 'h9', name: 'Pomegranate Raita', hindiName: 'अनार रायता',
    category: 'snack', cookTime: 5, protein: 10, calories: 140,
    healthTag: 'heart-health',
    ingredients: ['200g curd', '1/2 cup pomegranate seeds', 'Roasted cumin', 'Black salt', 'Mint', 'Honey'],
    steps: ['Whisk curd smooth', 'Add pomegranate seeds', 'Add cumin and black salt', 'Add honey', 'Garnish with mint', 'Serve chilled'],
    seniorTip: 'Pomegranate reduces arterial plaque and lowers blood pressure. Curd probiotics reduce inflammation.',
    tags: ['heart-health', 'arterial-plaque', 'blood-pressure', 'antioxidant']
  },
  {
    id: 'h10', name: 'Almond Milk Chai', hindiName: 'बादाम दूध चाय',
    category: 'breakfast', cookTime: 5, protein: 4, calories: 80,
    healthTag: 'heart-health',
    ingredients: ['1 cup almond milk', 'Green tea leaves', 'Ginger', 'Cinnamon', 'Cardamom', 'Honey'],
    steps: ['Brew green tea in water', 'Add almond milk', 'Add ginger and spices', 'Simmer 2 minutes', 'Add honey', 'Strain and serve'],
    seniorTip: 'Green tea catechins reduce LDL cholesterol. Replace morning chai with this for heart health.',
    tags: ['heart-health', 'green-tea', 'cholesterol', 'antioxidant', 'morning-ritual']
  },
  {
    id: 'h11', name: 'Toor Dal Soup', hindiName: 'तोर दाल सूप',
    category: 'dinner', cookTime: 25, protein: 14, calories: 200,
    healthTag: 'heart-health',
    ingredients: ['1 cup toor dal', 'Tomato', 'Garlic', 'Turmeric', 'Cumin seeds', 'Minimal ghee', 'Lemon', 'Coriander'],
    steps: ['Pressure cook toor dal', 'Blend smooth', 'Add water for soup consistency', 'Make ghee and cumin temper', 'Add tomato and cook', 'Serve with lemon'],
    seniorTip: 'Dal soluble fiber binds to cholesterol and removes it from body. Eat dal soup daily for heart protection.',
    tags: ['heart-health', 'cholesterol-binding', 'soluble-fiber', 'daily-essential']
  },
  {
    id: 'h12', name: 'Brown Rice Khichdi', hindiName: 'ब्राउन राइस खिचड़ी',
    category: 'lunch', cookTime: 35, protein: 16, calories: 340,
    healthTag: 'heart-health',
    ingredients: ['1/2 cup brown rice', '1/2 cup moong dal', 'Vegetables', 'Turmeric', 'Ghee', 'Cumin', 'Asafoetida'],
    steps: ['Soak brown rice 30 minutes', 'Cook with dal and vegetables', 'Add turmeric and spices', 'Make ghee temper', 'Mix and adjust consistency', 'Serve with pickle'],
    seniorTip: 'Brown rice has more fiber than white. Lignans in brown rice reduce heart disease risk. Complete meal.',
    tags: ['heart-health', 'brown-rice', 'fiber-rich', 'complete-meal']
  },
  {
    id: 'h13', name: 'Avocado Toast', hindiName: 'एवोकाडो टोस्ट',
    category: 'breakfast', cookTime: 5, protein: 8, calories: 220,
    healthTag: 'heart-health',
    ingredients: ['1 avocado', '2 whole wheat bread slices', 'Lemon', 'Black pepper', 'Red chilli flakes', 'Salt', 'Pomegranate seeds'],
    steps: ['Toast bread until golden', 'Mash avocado with lemon', 'Season with pepper and salt', 'Spread on toast', 'Sprinkle chilli flakes', 'Top with pomegranate'],
    seniorTip: 'Avocado monounsaturated fat raises HDL by 11%. Available in India now at Big Bazaar. Eat 3x per week.',
    tags: ['heart-health', 'hdl-boosting', 'monounsaturated-fat', 'modern-indian']
  },
  {
    id: 'h14', name: 'Mixed Sprouts Salad', hindiName: 'मिश्रित अंकुरित सलाद',
    category: 'snack', cookTime: 10, protein: 14, calories: 160,
    healthTag: 'heart-health',
    ingredients: ['Mixed sprouts', 'Onion', 'Tomato', 'Cucumber', 'Pomegranate', 'Lemon', 'Flaxseed', 'Black salt'],
    steps: ['Steam sprouts lightly', 'Mix with vegetables', 'Add pomegranate seeds', 'Add flaxseed', 'Drizzle lemon', 'Toss with black salt'],
    seniorTip: 'Sprouts contain coumestans that reduce heart disease. Flaxseed ALA reduces inflammation. Best heart snack.',
    tags: ['heart-health', 'anti-inflammatory', 'omega-3', 'antioxidant']
  },
  {
    id: 'h15', name: 'Beetroot Juice', hindiName: 'चुकंदर रस',
    category: 'snack', cookTime: 5, protein: 2, calories: 60,
    healthTag: 'heart-health',
    ingredients: ['2 beetroots', '1 apple', '1 carrot', '1 inch ginger', 'Lemon', 'Black salt'],
    steps: ['Wash and chop vegetables', 'Blend or juice all', 'Add ginger juice', 'Add lemon and black salt', 'Strain if preferred', 'Drink immediately'],
    seniorTip: 'Beetroot nitrates reduce blood pressure by 4-5 points within hours. Drink daily for hypertension.',
    tags: ['heart-health', 'blood-pressure', 'nitrates', 'hypertension', 'daily-ritual']
  },
  {
    id: 'h16', name: 'Soya Milk Porridge', hindiName: 'सोया दूध दलिया',
    category: 'breakfast', cookTime: 15, protein: 16, calories: 280,
    healthTag: 'heart-health',
    ingredients: ['1 cup oats or dalia', '300ml soya milk', 'Banana', 'Honey', 'Cinnamon', 'Mixed nuts', 'Seeds'],
    steps: ['Heat soya milk', 'Add oats and cook', 'Stir continuously', 'Add honey and cinnamon', 'Top with banana', 'Add nuts and seeds'],
    seniorTip: 'Soya isoflavones reduce cholesterol by 5-10%. Oats beta-glucan adds another 10% reduction. Powerful combination.',
    tags: ['heart-health', 'cholesterol-reducing', 'isoflavones', 'beta-glucan']
  },
  {
    id: 'h17', name: 'Tomato Onion Dal', hindiName: 'टमाटर प्याज दाल',
    category: 'lunch', cookTime: 30, protein: 16, calories: 240,
    healthTag: 'heart-health',
    ingredients: ['1 cup masoor dal', '3 tomatoes', '2 onions', 'Garlic', 'Turmeric', 'Mustard oil', 'Coriander', 'Lemon'],
    steps: ['Cook dal with tomatoes and turmeric', 'Fry onions until dark golden', 'Add garlic to onions', 'Mix with dal', 'Add mustard oil temper', 'Finish with lemon'],
    seniorTip: 'Quercetin in onions reduces blood pressure and clot formation. Tomato reduces heart attack risk 30%.',
    tags: ['heart-health', 'quercetin', 'anti-clotting', 'blood-pressure']
  },
  {
    id: 'h18', name: 'Grilled Sardines', hindiName: 'ग्रिल्ड सार्डिन',
    category: 'lunch', cookTime: 15, protein: 28, calories: 200,
    healthTag: 'heart-health',
    ingredients: ['300g sardines or small fish', 'Ginger garlic paste', 'Lemon', 'Turmeric', 'Chilli', 'Mustard oil', 'Curry leaves'],
    steps: ['Clean and score fish', 'Marinate with spices', 'Grill on high heat', 'Cook 4-5 minutes each side', 'Squeeze lemon', 'Serve with onion rings'],
    seniorTip: 'Small fish like sardines have highest omega-3 content. Eat with bones for extra calcium. Weekly must.',
    tags: ['heart-health', 'omega-3', 'calcium', 'coastal-food']
  },
  {
    id: 'h19', name: 'Jeera Rice with Dal', hindiName: 'जीरा चावल दाल',
    category: 'dinner', cookTime: 30, protein: 16, calories: 360,
    healthTag: 'heart-health',
    ingredients: ['1 cup basmati rice', '1 cup dal', 'Cumin seeds', 'Bay leaves', 'Ghee', 'Salt', 'Coriander'],
    steps: ['Cook rice with cumin and bay leaves', 'Cook dal separately', 'Make ghee and cumin temper for dal', 'Serve rice with dal', 'Add coriander on top', 'Eat together'],
    seniorTip: 'Basmati rice has lower glycemic index than regular rice. Cumin aids digestion and reduces bloating.',
    tags: ['heart-health', 'lower-gi', 'digestive', 'traditional']
  },
  {
    id: 'h20', name: 'Methi Water Morning', hindiName: 'मेथी पानी',
    category: 'snack', cookTime: 2, protein: 2, calories: 20,
    healthTag: 'heart-health',
    ingredients: ['1 tsp fenugreek seeds', '1 glass water', 'Optional lemon'],
    steps: ['Soak fenugreek seeds overnight', 'Morning strain water', 'Drink on empty stomach', 'Can also eat seeds', 'Follow with breakfast', 'Do this daily'],
    seniorTip: 'Methi reduces total cholesterol by 14% and LDL by 18%. Simple daily habit with big heart benefits.',
    tags: ['heart-health', 'cholesterol-14-percent', 'daily-habit', 'traditional-remedy']
  },
  {
    id: 'h21', name: 'Turmeric Milk', hindiName: 'हल्दी दूध',
    category: 'dinner', cookTime: 5, protein: 8, calories: 150,
    healthTag: 'heart-health',
    ingredients: ['1 glass milk', '1 tsp turmeric', '1 tsp honey', 'Pinch black pepper', 'Cardamom', 'Saffron strands'],
    steps: ['Heat milk', 'Add turmeric and black pepper', 'Add cardamom', 'Add honey and saffron', 'Stir well', 'Drink before bed'],
    seniorTip: 'Black pepper increases curcumin absorption 2000%. Turmeric reduces inflammation and protects arteries.',
    tags: ['heart-health', 'anti-inflammatory', 'curcumin', 'nightly-ritual']
  },
  {
    id: 'h22', name: 'Rajma with Brown Rice', hindiName: 'राजमा ब्राउन राइस',
    category: 'lunch', cookTime: 50, protein: 20, calories: 420,
    healthTag: 'heart-health',
    ingredients: ['1 cup rajma', '1 cup brown rice', 'Onion', 'Tomato', 'Ginger garlic', 'Minimal oil', 'Whole spices'],
    steps: ['Soak rajma overnight', 'Pressure cook rajma', 'Make tomato masala', 'Add rajma to masala', 'Cook brown rice', 'Serve together'],
    seniorTip: 'Rajma potassium reduces blood pressure. Brown rice fiber reduces cholesterol. Perfect heart meal combo.',
    tags: ['heart-health', 'potassium-rich', 'blood-pressure', 'complete-meal']
  },
  {
    id: 'h23', name: 'Cucumber Mint Detox Water', hindiName: 'खीरा पुदीना पानी',
    category: 'snack', cookTime: 5, protein: 0, calories: 10,
    healthTag: 'heart-health',
    ingredients: ['1 cucumber sliced', 'Fresh mint', '1 lemon sliced', 'Ginger slices', 'Water 1 liter', 'Ice cubes'],
    steps: ['Add all ingredients to jug', 'Add cold water', 'Add ice cubes', 'Let infuse 2 hours', 'Drink throughout day', 'Refill water twice'],
    seniorTip: 'This infused water flushes sodium and reduces blood pressure. Drink 8 glasses daily for heart health.',
    tags: ['heart-health', 'sodium-flush', 'blood-pressure', 'hydration', 'zero-calorie']
  },
  {
    id: 'h24', name: 'Sabut Moong Dal', hindiName: 'साबुत मूंग दाल',
    category: 'dinner', cookTime: 35, protein: 18, calories: 280,
    healthTag: 'heart-health',
    ingredients: ['1 cup whole green moong', 'Onion', 'Tomato', 'Ginger garlic', 'Turmeric', 'Minimal ghee', 'Coriander', 'Lemon'],
    steps: ['Soak moong 4 hours', 'Cook in pressure cooker', 'Make onion tomato masala', 'Add cooked dal', 'Simmer 10 minutes', 'Finish with lemon'],
    seniorTip: 'Whole moong is better than split for heart. High in magnesium which is natural blood pressure regulator.',
    tags: ['heart-health', 'magnesium-rich', 'blood-pressure', 'whole-grain']
  },
  {
    id: 'h25', name: 'Arjuna Bark Tea', hindiName: 'अर्जुन चाय',
    category: 'snack', cookTime: 10, protein: 0, calories: 20,
    healthTag: 'heart-health',
    ingredients: ['1 tsp arjuna bark powder', '1 cup milk or water', 'Cinnamon', 'Cardamom', 'Honey'],
    steps: ['Boil water with arjuna powder', 'Add milk if desired', 'Add cinnamon and cardamom', 'Simmer 5 minutes', 'Strain and add honey', 'Drink warm'],
    seniorTip: 'Arjuna bark is Ayurvedas heart medicine. Strengthens heart muscle. Take daily under doctor guidance.',
    tags: ['heart-health', 'ayurvedic', 'heart-strengthening', 'traditional-medicine']
  },
  // ========== DIABETES FRIENDLY (25) ==========
  {
    id: 'db1', name: 'Bitter Gourd Juice', hindiName: 'करेला रस',
    category: 'breakfast', cookTime: 5, protein: 2, calories: 30,
    healthTag: 'diabetes',
    ingredients: ['2 karela', '1 inch ginger', 'Lemon', 'Black salt', 'Amla optional'],
    steps: ['Wash and chop karela', 'Blend with ginger', 'Strain juice', 'Add lemon and black salt', 'Add amla if available', 'Drink immediately on empty stomach'],
    seniorTip: 'Karela contains charantin that acts like insulin. Reduces blood sugar by up to 20%. Drink every morning.',
    tags: ['diabetes', 'blood-sugar', 'natural-insulin', 'morning-ritual', 'medicinal']
  },
  {
    id: 'db2', name: 'Ragi Idli', hindiName: 'रागी इडली',
    category: 'breakfast', cookTime: 30, protein: 12, calories: 200,
    healthTag: 'diabetes',
    ingredients: ['1 cup ragi', '1/2 cup urad dal', 'Salt', 'Water', 'Oil for greasing'],
    steps: ['Soak ragi and dal separately', 'Grind and mix', 'Ferment overnight', 'Steam in idli molds', 'Cook 12 minutes', 'Serve with sambar'],
    seniorTip: 'Ragi has glycemic index of 54 vs 72 for white rice. Massive blood sugar improvement. Perfect diabetic breakfast.',
    tags: ['diabetes', 'low-gi', 'ragi', 'fermented', 'south-indian']
  },
  {
    id: 'db3', name: 'Jamun Smoothie', hindiName: 'जामुन स्मूदी',
    category: 'breakfast', cookTime: 5, protein: 8, calories: 160,
    healthTag: 'diabetes',
    ingredients: ['1 cup jamun (black plum)', '200g curd', 'Ginger', 'Cinnamon', 'Black salt', 'Ice'],
    steps: ['Deseed jamun', 'Blend with curd', 'Add ginger and cinnamon', 'Add black salt', 'Blend with ice', 'Drink immediately'],
    seniorTip: 'Jamun seeds powder is Ayurvedas best diabetes medicine. The fruit itself reduces blood sugar naturally.',
    tags: ['diabetes', 'jamun', 'blood-sugar', 'ayurvedic', 'seasonal']
  },
  {
    id: 'db4', name: 'Sprouts Breakfast Bowl', hindiName: 'अंकुरित नाश्ता बाउल',
    category: 'breakfast', cookTime: 10, protein: 16, calories: 180,
    healthTag: 'diabetes',
    ingredients: ['1 cup mixed sprouts', '100g curd', 'Cucumber', 'Tomato', 'Lemon', 'Cumin powder', 'Coriander'],
    steps: ['Steam sprouts lightly', 'Add curd over sprouts', 'Add vegetables', 'Season with cumin and lemon', 'Toss gently', 'Eat immediately'],
    seniorTip: 'Sprouting reduces glycemic index by 25-30%. Curd protein slows sugar absorption. Perfect diabetic breakfast.',
    tags: ['diabetes', 'low-gi', 'blood-sugar-control', 'probiotic']
  },
  {
    id: 'db5', name: 'Cinnamon Oats', hindiName: 'दालचीनी ओट्स',
    category: 'breakfast', cookTime: 10, protein: 10, calories: 220,
    healthTag: 'diabetes',
    ingredients: ['1 cup steel-cut oats', '1 tsp cinnamon', 'Almond milk', 'Chia seeds', '1 tsp honey', 'Nuts'],
    steps: ['Cook oats in almond milk', 'Add cinnamon while cooking', 'Stir well and cook 8 minutes', 'Add chia seeds', 'Top with nuts', 'Add minimal honey'],
    seniorTip: 'Cinnamon lowers fasting blood sugar by 24-29%. Steel cut oats have lower GI than rolled. Use daily.',
    tags: ['diabetes', 'cinnamon', 'blood-sugar-29-percent', 'low-gi', 'daily']
  },
  {
    id: 'db6', name: 'Methi Dal', hindiName: 'मेथी दाल',
    category: 'lunch', cookTime: 30, protein: 16, calories: 240,
    healthTag: 'diabetes',
    ingredients: ['1 cup chana dal', '1 cup methi leaves', 'Onion', 'Tomato', 'Garlic', 'Turmeric', 'Cumin', 'Minimal oil'],
    steps: ['Cook chana dal with turmeric', 'Saute onion and tomato', 'Add fresh methi leaves', 'Add dal and spices', 'Cook 10 minutes', 'Serve with roti'],
    seniorTip: 'Methi seeds have galactomannan fiber that slows sugar absorption. Reduces post-meal glucose spike.',
    tags: ['diabetes', 'galactomannan', 'glucose-spike', 'blood-sugar', 'anti-diabetic']
  },
  {
    id: 'db7', name: 'Chicken Vegetable Soup', hindiName: 'चिकन सब्जी सूप',
    category: 'lunch', cookTime: 35, protein: 24, calories: 200,
    healthTag: 'diabetes',
    ingredients: ['200g chicken', 'Broccoli', 'Spinach', 'Beans', 'Garlic', 'Ginger', 'Black pepper', 'Salt'],
    steps: ['Boil chicken with garlic ginger', 'Shred chicken', 'Add vegetables to broth', 'Cook 10 minutes', 'Add shredded chicken', 'Season and serve'],
    seniorTip: 'High protein meal without carbs. Protein does not raise blood sugar. Best diabetic lunch. Very filling.',
    tags: ['diabetes', 'no-carb', 'high-protein', 'blood-sugar-safe']
  },
  {
    id: 'db8', name: 'Bajra Khichdi', hindiName: 'बाजरा खिचड़ी',
    category: 'dinner', cookTime: 30, protein: 12, calories: 300,
    healthTag: 'diabetes',
    ingredients: ['1/2 cup bajra', '1/2 cup moong dal', 'Ghee', 'Cumin', 'Turmeric', 'Asafoetida', 'Salt'],
    steps: ['Soak bajra 2 hours', 'Cook with dal', 'Add turmeric and salt', 'Make ghee temper', 'Mix and serve', 'Eat with pickle and curd'],
    seniorTip: 'Bajra has glycemic index of 55 vs 72 for rice. High in magnesium which improves insulin sensitivity.',
    tags: ['diabetes', 'low-gi', 'magnesium', 'insulin-sensitivity', 'bajra']
  },
  {
    id: 'db9', name: 'Lauki Juice', hindiName: 'लौकी रस',
    category: 'snack', cookTime: 5, protein: 2, calories: 25,
    healthTag: 'diabetes',
    ingredients: ['1 small lauki', 'Mint leaves', 'Ginger', 'Lemon', 'Black salt', 'Water'],
    steps: ['Peel and chop lauki', 'Blend with water', 'Add mint and ginger', 'Add lemon and salt', 'Strain if preferred', 'Drink fresh'],
    seniorTip: 'Lauki juice reduces fasting blood sugar and controls Type 2 diabetes naturally. Drink every morning.',
    tags: ['diabetes', 'fasting-sugar', 'natural-remedy', 'daily-ritual']
  },
  {
    id: 'db10', name: 'Mixed Dal with Drumstick', hindiName: 'सहजन दाल',
    category: 'lunch', cookTime: 35, protein: 18, calories: 260,
    healthTag: 'diabetes',
    ingredients: ['Mixed dal', 'Drumstick pieces', 'Tomato', 'Onion', 'Turmeric', 'Sambar masala', 'Mustard seeds', 'Curry leaves'],
    steps: ['Cook dal with drumstick', 'Add tomato and masala', 'Make mustard temper', 'Add curry leaves', 'Mix and simmer', 'Serve with brown rice'],
    seniorTip: 'Drumstick (moringa) leaves reduce blood sugar and improve insulin function. Eat drumstick 3x per week.',
    tags: ['diabetes', 'moringa', 'insulin-function', 'blood-sugar', 'superfood']
  },
  {
    id: 'db11', name: 'Tofu Bhurji', hindiName: 'टोफू भुर्जी',
    category: 'breakfast', cookTime: 15, protein: 18, calories: 180,
    healthTag: 'diabetes',
    ingredients: ['200g firm tofu', 'Onion', 'Tomato', 'Turmeric', 'Cumin', 'Minimal oil', 'Salt', 'Coriander'],
    steps: ['Crumble tofu', 'Saute onion and tomato', 'Add turmeric and cumin', 'Add crumbled tofu', 'Cook 5 minutes', 'Serve with roti'],
    seniorTip: 'Tofu protein does not raise blood sugar. Soya protein improves insulin sensitivity. Best diabetic protein source.',
    tags: ['diabetes', 'soya', 'insulin-sensitivity', 'no-sugar-spike', 'vegetarian']
  },
  {
    id: 'db12', name: 'Palak Soup', hindiName: 'पालक सूप',
    category: 'dinner', cookTime: 15, protein: 8, calories: 100,
    healthTag: 'diabetes',
    ingredients: ['3 cups spinach', 'Garlic', 'Onion', 'Ginger', 'Black pepper', 'Cornflour minimal', 'Salt', 'Lemon'],
    steps: ['Saute garlic and onion', 'Add spinach and cook', 'Blend smooth', 'Thicken minimally with cornflour', 'Add pepper and lemon', 'Serve hot'],
    seniorTip: 'Spinach magnesium improves insulin sensitivity. This soup has almost no carbs. Perfect diabetic dinner.',
    tags: ['diabetes', 'low-carb', 'magnesium', 'insulin-sensitivity', 'night-safe']
  },
  {
    id: 'db13', name: 'Amla Juice Morning Shot', hindiName: 'आंवला शॉट',
    category: 'breakfast', cookTime: 5, protein: 1, calories: 25,
    healthTag: 'diabetes',
    ingredients: ['2 amla', 'Turmeric pinch', 'Black pepper', 'Ginger', 'Warm water'],
    steps: ['Blend or grate amla', 'Extract juice', 'Add turmeric and pepper', 'Add ginger juice', 'Mix with warm water', 'Drink on empty stomach'],
    seniorTip: 'Amla chromium reduces blood sugar and improves insulin response. Daily amla reduces HbA1c in diabetics.',
    tags: ['diabetes', 'chromium', 'hba1c', 'insulin-response', 'daily-shot']
  },
  {
    id: 'db14', name: 'Roasted Chana Snack', hindiName: 'भुना चना स्नैक',
    category: 'snack', cookTime: 5, protein: 10, calories: 120,
    healthTag: 'diabetes',
    ingredients: ['50g roasted chana (kala or safed)', 'Black salt', 'Lemon juice', 'Cumin powder', 'Chilli powder'],
    steps: ['Take roasted chana', 'Add black salt', 'Squeeze lemon', 'Add cumin and chilli', 'Mix and eat', 'Chew slowly'],
    seniorTip: 'Chana glycemic index is only 28! Safest snack for diabetics. High protein slows sugar release.',
    tags: ['diabetes', 'gi-28', 'very-safe', 'affordable', 'daily-snack']
  },
  {
    id: 'db15', name: 'Fish Dal Combo', hindiName: 'मछली दाल',
    category: 'lunch', cookTime: 40, protein: 32, calories: 320,
    healthTag: 'diabetes',
    ingredients: ['200g fish', '1/2 cup masoor dal', 'Onion', 'Tomato', 'Turmeric', 'Mustard oil', 'Spices'],
    steps: ['Cook dal separately', 'Make fish curry with mustard oil', 'Serve fish curry over dal', 'Add mustard oil temper', 'Mix before eating', 'Serve with roti'],
    seniorTip: 'Omega-3 in fish improves insulin resistance. Dal fiber slows glucose absorption. Together they manage diabetes well.',
    tags: ['diabetes', 'insulin-resistance', 'omega-3', 'glucose-absorption', 'bengali-style']
  },
  {
    id: 'db16', name: 'Cucumber Raita', hindiName: 'खीरा रायता',
    category: 'snack', cookTime: 5, protein: 10, calories: 100,
    healthTag: 'diabetes',
    ingredients: ['200g curd', '1 cucumber', 'Cumin powder', 'Black salt', 'Mint', 'Green chilli optional'],
    steps: ['Grate or chop cucumber', 'Whisk curd smooth', 'Mix cucumber into curd', 'Add spices', 'Add mint', 'Serve chilled'],
    seniorTip: 'Curd reduces post-meal blood sugar by 18%. Cucumber has almost zero glycemic impact. Safe snack anytime.',
    tags: ['diabetes', 'post-meal-sugar', 'zero-gi', 'probiotic', 'anytime-safe']
  },
  {
    id: 'db17', name: 'Barley Khichdi', hindiName: 'जौ खिचड़ी',
    category: 'dinner', cookTime: 35, protein: 14, calories: 320,
    healthTag: 'diabetes',
    ingredients: ['1/2 cup barley', '1/2 cup moong dal', 'Vegetables', 'Turmeric', 'Ghee', 'Cumin', 'Salt'],
    steps: ['Soak barley 2 hours', 'Cook barley and dal together', 'Add vegetables', 'Make ghee temper', 'Mix and serve', 'Eat with curd'],
    seniorTip: 'Barley has glycemic index of 28! Lowest of all grains. Beta-glucan dramatically reduces blood sugar after meals.',
    tags: ['diabetes', 'gi-28', 'lowest-gi-grain', 'beta-glucan', 'blood-sugar-control']
  },
  {
    id: 'db18', name: 'Egg Salad No Carb', hindiName: 'अंडा सलाद नो कार्ब',
    category: 'lunch', cookTime: 15, protein: 20, calories: 200,
    healthTag: 'diabetes',
    ingredients: ['3 eggs boiled', 'Avocado', 'Cucumber', 'Tomato', 'Mustard sauce', 'Lemon', 'Black pepper', 'Lettuce'],
    steps: ['Boil and slice eggs', 'Mash avocado with lemon', 'Arrange on lettuce', 'Add vegetables', 'Add mustard sauce', 'Season with pepper'],
    seniorTip: 'Zero carbohydrate lunch! Eggs and avocado do not raise blood sugar at all. Perfect diabetic meal.',
    tags: ['diabetes', 'zero-carb', 'no-blood-sugar-rise', 'keto-friendly']
  },
  {
    id: 'db19', name: 'Gymnema Tea', hindiName: 'गुड़मार चाय',
    category: 'snack', cookTime: 5, protein: 0, calories: 10,
    healthTag: 'diabetes',
    ingredients: ['1 tsp gymnema leaves or powder', '1 cup water', 'Ginger', 'Cinnamon stick', 'Honey tiny amount'],
    steps: ['Boil water with gymnema', 'Add ginger and cinnamon', 'Simmer 5 minutes', 'Strain', 'Add tiny honey if needed', 'Drink warm'],
    seniorTip: 'Gymnema (gurmar) blocks sugar receptors and reduces absorption. Hindi name means sugar destroyer!',
    tags: ['diabetes', 'gymnema', 'sugar-blocking', 'ayurvedic', 'natural-remedy']
  },
  {
    id: 'db20', name: 'Paneer Low Carb Bowl', hindiName: 'पनीर लो कार्ब बाउल',
    category: 'dinner', cookTime: 15, protein: 22, calories: 260,
    healthTag: 'diabetes',
    ingredients: ['200g paneer', 'Spinach', 'Mushrooms', 'Bell peppers', 'Garlic', 'Olive oil', 'Spices', 'Lemon'],
    steps: ['Cube and pan fry paneer', 'Saute garlic in olive oil', 'Add mushrooms and spinach', 'Add bell peppers', 'Add paneer back', 'Season and serve'],
    seniorTip: 'Low carb dinner does not spike blood sugar overnight. Paneer provides protein for overnight recovery.',
    tags: ['diabetes', 'low-carb', 'overnight-safe', 'high-protein', 'no-glucose-spike']
  },
  {
    id: 'db21', name: 'Dal Palak Soup', hindiName: 'दाल पालक सूप',
    category: 'dinner', cookTime: 25, protein: 14, calories: 180,
    healthTag: 'diabetes',
    ingredients: ['1/2 cup masoor dal', '2 cups spinach', 'Garlic', 'Turmeric', 'Lemon', 'Cumin', 'Black pepper'],
    steps: ['Cook dal and spinach together', 'Blend smooth', 'Adjust consistency', 'Add garlic and cumin temper', 'Season with pepper and lemon', 'Serve hot'],
    seniorTip: 'Dal protein + spinach magnesium together reduce fasting blood sugar. Evening ritual for diabetics.',
    tags: ['diabetes', 'fasting-sugar', 'evening-ritual', 'magnesium', 'protein']
  },
  {
    id: 'db22', name: 'Neem Leaf Chutney', hindiName: 'नीम चटनी',
    category: 'snack', cookTime: 5, protein: 2, calories: 20,
    healthTag: 'diabetes',
    ingredients: ['10 fresh neem leaves', 'Mint', 'Coriander', 'Garlic', 'Ginger', 'Lemon', 'Salt', 'Green chilli'],
    steps: ['Wash neem leaves well', 'Blend with other herbs', 'Add garlic and ginger', 'Add lemon and salt', 'Blend to smooth chutney', 'Have 1 tsp with meals'],
    seniorTip: 'Neem reduces blood sugar and improves pancreatic function. Bitter taste activates insulin secretion.',
    tags: ['diabetes', 'neem', 'pancreatic-function', 'insulin-secretion', 'ayurvedic']
  },
  {
    id: 'db23', name: 'Chickpea Salad', hindiName: 'काबुली चना सलाद',
    category: 'lunch', cookTime: 10, protein: 16, calories: 240,
    healthTag: 'diabetes',
    ingredients: ['1 cup boiled chickpeas', 'Cucumber', 'Tomato', 'Onion', 'Bell pepper', 'Lemon', 'Olive oil', 'Parsley or coriander'],
    steps: ['Drain and rinse chickpeas', 'Chop all vegetables', 'Mix together', 'Add lemon and olive oil', 'Season with salt and pepper', 'Refrigerate 30 minutes'],
    seniorTip: 'Chickpeas have glycemic index of only 28. Eating them reduces post-meal blood sugar by up to 36%.',
    tags: ['diabetes', 'gi-28', 'post-meal-sugar-36-percent', 'high-fiber', 'mediterranean']
  },
  {
    id: 'db24', name: 'Flaxseed Roti', hindiName: 'अलसी रोटी',
    category: 'dinner', cookTime: 20, protein: 12, calories: 200,
    healthTag: 'diabetes',
    ingredients: ['3/4 cup whole wheat flour', '1/4 cup flaxseed powder', 'Salt', 'Oil minimal', 'Water'],
    steps: ['Mix wheat flour and flaxseed powder', 'Add salt and minimal oil', 'Knead firm dough with water', 'Make medium thickness rotis', 'Cook on tawa both sides', 'Serve with dal or sabzi'],
    seniorTip: 'Flaxseed lignans and omega-3 improve insulin sensitivity. This roti is 30% lower GI than plain wheat roti.',
    tags: ['diabetes', 'lower-gi', 'insulin-sensitivity', 'omega-3', 'modified-roti']
  },
  {
    id: 'db25', name: 'Moong Sprout Dhokla', hindiName: 'मूंग अंकुरित ढोकला',
    category: 'snack', cookTime: 30, protein: 14, calories: 160,
    healthTag: 'diabetes',
    ingredients: ['1 cup moong sprouts', 'Ginger green chilli paste', 'Curd', 'Eno fruit salt', 'Turmeric', 'Salt', 'Mustard seeds', 'Curry leaves'],
    steps: ['Blend sprouts with curd and spices', 'Add eno just before steaming', 'Pour in greased plates', 'Steam 12 minutes', 'Make mustard temper', 'Serve with green chutney'],
    seniorTip: 'Fermented sprout dhokla has very low glycemic index. Protein and fiber together prevent sugar spikes.',
    tags: ['diabetes', 'low-gi', 'fermented', 'gujarati', 'sugar-spike-prevention']
  },
  // ========== BONE & JOINT HEALTH (25) ==========
  {
    id: 'bj1', name: 'Sesame Milk', hindiName: 'तिल का दूध',
    category: 'breakfast', cookTime: 5, protein: 8, calories: 180,
    healthTag: 'bone-joint',
    ingredients: ['2 tbsp white sesame seeds', '1 glass milk', 'Honey', 'Cardamom', 'Saffron', 'Turmeric'],
    steps: ['Roast sesame until golden', 'Blend with milk', 'Heat gently', 'Add honey and cardamom', 'Add saffron and turmeric', 'Drink warm morning and night'],
    seniorTip: 'Sesame has highest calcium of any seed — 975mg per 100g! Daily sesame milk prevents osteoporosis.',
    tags: ['bone-joint', 'calcium-975mg', 'osteoporosis', 'sesame', 'daily-essential']
  },
  {
    id: 'bj2', name: 'Ragi Porridge', hindiName: 'रागी दलिया',
    category: 'breakfast', cookTime: 10, protein: 10, calories: 220,
    healthTag: 'bone-joint',
    ingredients: ['1 cup ragi flour', '1.5 cups milk', 'Jaggery', 'Cardamom', 'Almonds', 'Dry fruits'],
    steps: ['Mix ragi flour in cold water', 'Add to hot milk', 'Cook stirring constantly', 'Add jaggery and cardamom', 'Cook until thick', 'Top with almonds and dry fruits'],
    seniorTip: 'Ragi has 344mg calcium per 100g — highest of all grains. Essential daily food for seniors with bone issues.',
    tags: ['bone-joint', 'calcium-344mg', 'highest-grain-calcium', 'ragi', 'bone-building']
  },
  {
    id: 'bj3', name: 'Fish Bone Soup', hindiName: 'मछली हड्डी सूप',
    category: 'lunch', cookTime: 60, protein: 24, calories: 200,
    healthTag: 'bone-joint',
    ingredients: ['500g fish with bones', 'Ginger', 'Garlic', 'Onion', 'Turmeric', 'Black pepper', 'Lemon', 'Coriander'],
    steps: ['Boil fish with bones for 45 minutes', 'Extract and save all broth', 'Remove large bones', 'Blend fish meat into broth', 'Add spices and simmer', 'Serve hot with lemon'],
    seniorTip: 'Fish bones release calcium and collagen. This broth rebuilds joints and bones. Traditional healing food.',
    tags: ['bone-joint', 'collagen', 'joint-rebuilding', 'bone-broth', 'calcium']
  },
  {
    id: 'bj4', name: 'Paneer and Spinach', hindiName: 'पनीर पालक',
    category: 'lunch', cookTime: 25, protein: 22, calories: 300,
    healthTag: 'bone-joint',
    ingredients: ['200g paneer', '3 cups spinach', 'Tomato', 'Garlic', 'Turmeric', 'Oil', 'Spices'],
    steps: ['Blanch and puree spinach', 'Make light gravy', 'Add paneer cubes', 'Cook 10 minutes', 'Add calcium-rich garnishes', 'Serve with roti'],
    seniorTip: 'Paneer 200mg + spinach 99mg calcium per 100g. Vitamin K in spinach directs calcium to bones not arteries.',
    tags: ['bone-joint', 'calcium', 'vitamin-k', 'calcium-to-bones', 'joint-health']
  },
  {
    id: 'bj5', name: 'Turmeric Golden Milk', hindiName: 'सोना दूध',
    category: 'dinner', cookTime: 5, protein: 8, calories: 150,
    healthTag: 'bone-joint',
    ingredients: ['1 glass milk', '1.5 tsp turmeric', '1 tsp black pepper', '1 tsp ginger powder', 'Honey', 'Cardamom'],
    steps: ['Heat milk until hot', 'Add turmeric and pepper', 'Add ginger powder', 'Add cardamom and honey', 'Stir well', 'Drink before bed'],
    seniorTip: 'Curcumin in turmeric reduces joint inflammation better than ibuprofen in studies. Daily golden milk reduces arthritis pain.',
    tags: ['bone-joint', 'anti-inflammatory', 'arthritis', 'curcumin', 'pain-relief', 'daily-ritual']
  },
  {
    id: 'bj6', name: 'Sesame Chikki', hindiName: 'तिल चिक्की',
    category: 'snack', cookTime: 15, protein: 8, calories: 200,
    healthTag: 'bone-joint',
    ingredients: ['1 cup white sesame', 'Jaggery', 'Ghee', 'Cardamom'],
    steps: ['Roast sesame golden', 'Melt jaggery with ghee', 'Cook to hard ball stage', 'Add sesame and cardamom', 'Press thin on plate', 'Cut into pieces when warm'],
    seniorTip: 'Traditional Indian bone food! Sesame jaggery gives calcium and iron together. Have 2 pieces daily.',
    tags: ['bone-joint', 'calcium', 'iron', 'traditional', 'daily-snack']
  },
  {
    id: 'bj7', name: 'Dahi with Almonds', hindiName: 'बादाम दही',
    category: 'breakfast', cookTime: 5, protein: 14, calories: 220,
    healthTag: 'bone-joint',
    ingredients: ['200g full-fat curd', '10 soaked almonds', '1 tbsp honey', 'Cardamom', 'Saffron', 'Pistachios'],
    steps: ['Soak almonds overnight', 'Peel almonds', 'Whisk curd smooth', 'Add almonds to curd', 'Add honey and saffron', 'Top with pistachios'],
    seniorTip: 'Curd is best bioavailable calcium source. Almonds add magnesium which is needed for calcium absorption.',
    tags: ['bone-joint', 'bioavailable-calcium', 'magnesium', 'calcium-absorption', 'daily']
  },
  {
    id: 'bj8', name: 'Moringa Dal Soup', hindiName: 'सहजन दाल सूप',
    category: 'dinner', cookTime: 30, protein: 14, calories: 200,
    healthTag: 'bone-joint',
    ingredients: ['1/2 cup toor dal', 'Moringa leaves (drumstick leaves)', 'Drumstick pieces', 'Tomato', 'Tamarind', 'Sambar masala'],
    steps: ['Cook dal with drumstick pieces', 'Add moringa leaves', 'Add tomato and tamarind', 'Add sambar masala', 'Simmer 10 minutes', 'Serve hot'],
    seniorTip: 'Moringa has 17x more calcium than milk! Drumstick pieces release bone-building minerals into broth.',
    tags: ['bone-joint', 'moringa', 'calcium-17x-milk', 'bone-building', 'superfood']
  },
  {
    id: 'bj9', name: 'Almond Milk Chia Pudding', hindiName: 'बादाम चिया पुडिंग',
    category: 'breakfast', cookTime: 5, protein: 10, calories: 220,
    healthTag: 'bone-joint',
    ingredients: ['3 tbsp chia seeds', '1 cup almond milk', '1 tsp honey', 'Vanilla essence', 'Almonds', 'Pomegranate'],
    steps: ['Mix chia seeds in almond milk', 'Add honey and vanilla', 'Refrigerate overnight', 'Morning top with almonds', 'Add pomegranate seeds', 'Eat cold'],
    seniorTip: 'Chia seeds have 631mg calcium per 100g! Almond milk adds more. Overnight prep saves morning time for seniors.',
    tags: ['bone-joint', 'chia-calcium-631mg', 'easy-prep', 'overnight', 'anti-inflammatory']
  },
  {
    id: 'bj10', name: 'Sarson Saag', hindiName: 'सरसों साग',
    category: 'lunch', cookTime: 45, protein: 12, calories: 240,
    healthTag: 'bone-joint',
    ingredients: ['3 cups mustard leaves', '1 cup spinach', '1 cup bathua', 'Maize flour', 'Garlic', 'Ginger', 'Ghee', 'Onion'],
    steps: ['Boil all greens together', 'Blend until smooth', 'Add maize flour for thickness', 'Cook on low heat 20 minutes', 'Make ghee and garlic temper', 'Serve with makki roti'],
    seniorTip: 'Mustard greens have 115mg calcium per 100g and high Vitamin K. This Punjabi dish is natural bone medicine.',
    tags: ['bone-joint', 'vitamin-k', 'calcium', 'punjabi', 'seasonal', 'winter-special']
  },
  {
    id: 'bj11', name: 'Eggshell Calcium Drink', hindiName: 'अंडे के छिलके का कैल्शियम',
    category: 'snack', cookTime: 10, protein: 2, calories: 20,
    healthTag: 'bone-joint',
    ingredients: ['1 eggshell', 'Lemon juice', 'Water', 'Honey'],
    steps: ['Wash eggshell thoroughly', 'Bake at 200°C for 10 minutes', 'Grind to fine powder', 'Add 1/4 tsp to lemon water', 'Add honey', 'Drink immediately'],
    seniorTip: 'Eggshell is 95% calcium carbonate — 800mg per half shell! Lemon dissolves it for maximum absorption.',
    tags: ['bone-joint', 'calcium-800mg', 'zero-waste', 'maximum-absorption', 'innovative']
  },
  {
    id: 'bj12', name: 'Paneer Tikka with Bones', hindiName: 'पनीर टिक्का',
    category: 'snack', cookTime: 20, protein: 20, calories: 260,
    healthTag: 'bone-joint',
    ingredients: ['200g paneer', 'Curd marinade', 'Tikka masala', 'Bell peppers', 'Onion', 'Lemon', 'Chaat masala'],
    steps: ['Marinate paneer in spiced curd', 'Grill on high heat', 'Cook until golden marks', 'Sprinkle chaat masala', 'Squeeze lemon', 'Serve hot'],
    seniorTip: 'Eating paneer daily provides 200mg calcium per 100g. Regular intake prevents bone density loss in seniors.',
    tags: ['bone-joint', 'calcium-daily', 'bone-density', 'prevention', 'daily-protein']
  },
  {
    id: 'bj13', name: 'Small Fish Fry', hindiName: 'छोटी मछली',
    category: 'lunch', cookTime: 20, protein: 28, calories: 220,
    healthTag: 'bone-joint',
    ingredients: ['300g small fish (ate khalli or similar)', 'Mustard oil', 'Turmeric', 'Chilli', 'Ginger garlic', 'Salt', 'Lemon'],
    steps: ['Marinate small fish with spices', 'Heat mustard oil until smoking', 'Fry small fish crispy', 'Cook until bones are edible', 'Drain excess oil', 'Serve with lemon'],
    seniorTip: 'Eat crispy small fish WITH bones. Edible fish bones give calcium directly. Best Indian bone food!',
    tags: ['bone-joint', 'edible-bones', 'calcium-rich', 'omega-3', 'traditional']
  },
  {
    id: 'bj14', name: 'Broccoli Stir Fry', hindiName: 'ब्रोकली स्टिर फ्राई',
    category: 'dinner', cookTime: 15, protein: 8, calories: 140,
    healthTag: 'bone-joint',
    ingredients: ['2 cups broccoli', 'Garlic', 'Ginger', 'Soy sauce', 'Sesame oil', 'Sesame seeds', 'Pepper'],
    steps: ['Blanch broccoli 2 minutes', 'Heat sesame oil', 'Add garlic and ginger', 'Add broccoli on high heat', 'Add soy sauce', 'Top with sesame seeds'],
    seniorTip: 'Broccoli has 47mg calcium and high Vitamin K2. K2 directs calcium specifically to bone matrix, not arteries.',
    tags: ['bone-joint', 'vitamin-k2', 'calcium-to-bone-matrix', 'broccoli', 'anti-cancer']
  },
  {
    id: 'bj15', name: 'Ginger Turmeric Tea', hindiName: 'अदरक हल्दी चाय',
    category: 'snack', cookTime: 5, protein: 1, calories: 30,
    healthTag: 'bone-joint',
    ingredients: ['1 inch ginger', '1 tsp turmeric', '1 tsp honey', '1 cup hot water', 'Lemon', 'Black pepper'],
    steps: ['Boil water', 'Add grated ginger', 'Add turmeric and pepper', 'Steep 5 minutes', 'Strain into cup', 'Add honey and lemon'],
    seniorTip: 'Ginger gingerols reduce joint pain like aspirin. Turmeric curcumin reduces arthritis swelling. Daily ritual.',
    tags: ['bone-joint', 'joint-pain', 'arthritis', 'anti-inflammatory', 'pain-free-movement']
  },
  {
    id: 'bj16', name: 'Sattu with Calcium', hindiName: 'कैल्शियम सत्तू',
    category: 'breakfast', cookTime: 5, protein: 12, calories: 200,
    healthTag: 'bone-joint',
    ingredients: ['4 tbsp sattu', '1 tbsp sesame powder', '1 glass milk', 'Honey', 'Cardamom'],
    steps: ['Mix sattu with sesame powder', 'Blend with milk', 'Add honey and cardamom', 'Mix until smooth', 'Drink immediately', 'Have with soaked almonds'],
    seniorTip: 'Adding sesame to sattu boosts calcium massively. This drink gives 300mg calcium in one glass.',
    tags: ['bone-joint', 'calcium-300mg', 'sattu', 'sesame', 'traditional']
  },
  {
    id: 'bj17', name: 'Rajgira Ladoo', hindiName: 'राजगिरा लड्डू',
    category: 'snack', cookTime: 20, protein: 8, calories: 180,
    healthTag: 'bone-joint',
    ingredients: ['1 cup rajgira', 'Jaggery', 'Ghee', 'Cardamom', 'Sesame seeds', 'Cashews'],
    steps: ['Puff rajgira in dry pan', 'Mix with sesame seeds', 'Melt jaggery with ghee', 'Mix all together quickly', 'Form into balls', 'Cool and store'],
    seniorTip: 'Rajgira has 159mg calcium per 100g + sesame adds more. Used in navratri — traditional bone food.',
    tags: ['bone-joint', 'calcium-159mg', 'rajgira', 'traditional', 'navratri', 'vrat']
  },
  {
    id: 'bj18', name: 'Warm Bone Broth', hindiName: 'हड्डी शोरबा',
    category: 'dinner', cookTime: 120, protein: 12, calories: 100,
    healthTag: 'bone-joint',
    ingredients: ['500g chicken or mutton bones', 'Onion', 'Garlic', 'Ginger', 'Turmeric', 'Apple cider vinegar', 'Black pepper', 'Salt'],
    steps: ['Add bones to large pot with cold water', 'Add splash of apple cider vinegar', 'Boil and skim foam', 'Add vegetables and spices', 'Simmer 2-3 hours on low', 'Strain and drink warm'],
    seniorTip: 'Long-simmered bone broth releases collagen, glucosamine, chondroitin — exact supplements doctors prescribe for joints!',
    tags: ['bone-joint', 'collagen', 'glucosamine', 'chondroitin', 'joint-repair', 'natural-supplement']
  },
  {
    id: 'bj19', name: 'Nachni Roti', hindiName: 'नाचनी रोटी',
    category: 'dinner', cookTime: 15, protein: 10, calories: 200,
    healthTag: 'bone-joint',
    ingredients: ['1 cup ragi (nachni) flour', 'Salt', 'Water', 'Ghee'],
    steps: ['Mix ragi flour with water', 'Knead smooth dough', 'Make medium rotis', 'Cook on both sides on tawa', 'Apply ghee on hot roti', 'Serve with dal or curd'],
    seniorTip: 'Ragi is Maharashtrian term for finger millet. Best grain for bone health. Eat ragi roti 5 days per week.',
    tags: ['bone-joint', 'ragi', 'finger-millet', 'calcium-rich', 'maharashtrian']
  },
  {
    id: 'bj20', name: 'Coconut Milk Curry', hindiName: 'नारियल दूध करी',
    category: 'lunch', cookTime: 30, protein: 16, calories: 320,
    healthTag: 'bone-joint',
    ingredients: ['200g paneer or chicken', 'Coconut milk', 'Vegetables', 'Curry leaves', 'Mustard seeds', 'Coconut oil', 'Spices'],
    steps: ['Make base with mustard seeds and curry leaves', 'Add vegetables and cook', 'Add protein (paneer or chicken)', 'Pour coconut milk', 'Simmer 10 minutes', 'Serve with rice'],
    seniorTip: 'Coconut has lauric acid which reduces joint inflammation. Curry leaves calcium prevents bone density loss.',
    tags: ['bone-joint', 'lauric-acid', 'anti-inflammatory', 'bone-density', 'kerala-style']
  },
  {
    id: 'bj21', name: 'Ajwain Water', hindiName: 'अजवाइन पानी',
    category: 'snack', cookTime: 5, protein: 0, calories: 10,
    healthTag: 'bone-joint',
    ingredients: ['1 tsp ajwain seeds', '1 glass warm water', 'Lemon', 'Honey'],
    steps: ['Soak ajwain in warm water 5 minutes', 'Or boil briefly', 'Strain', 'Add lemon and honey', 'Drink warm morning and evening', 'Can eat the seeds too'],
    seniorTip: 'Ajwain reduces joint pain and stiffness. Traditional remedy for arthritis. Used in Ayurveda for 5000 years.',
    tags: ['bone-joint', 'arthritis', 'joint-stiffness', 'ayurvedic', 'traditional-remedy']
  },
  {
    id: 'bj22', name: 'Til Gur Chutney', hindiName: 'तिल गुड़ चटनी',
    category: 'snack', cookTime: 10, protein: 6, calories: 160,
    healthTag: 'bone-joint',
    ingredients: ['3 tbsp roasted sesame', 'Jaggery', 'Ginger powder', 'Cardamom', 'Water'],
    steps: ['Blend sesame into powder', 'Add jaggery and blend', 'Add ginger and cardamom', 'Add water for chutney consistency', 'Blend smooth', 'Have 2 tbsp daily'],
    seniorTip: 'Sesame + jaggery = traditional Indian calcium and iron. This Makar Sankranti food eaten for bone health.',
    tags: ['bone-joint', 'sesame', 'jaggery', 'calcium-iron', 'makar-sankranti', 'traditional']
  },
  {
    id: 'bj23', name: 'Fish Pulao', hindiName: 'मछली पुलाव',
    category: 'dinner', cookTime: 40, protein: 28, calories: 380,
    healthTag: 'bone-joint',
    ingredients: ['200g fish fillet', '1 cup basmati rice', 'Whole spices', 'Onion', 'Tomato', 'Saffron', 'Ghee', 'Coriander'],
    steps: ['Cook rice with whole spices', 'Make fish curry separately', 'Layer fish over rice', 'Cover and dum cook 10 minutes', 'Drizzle saffron milk', 'Garnish with fried onion'],
    seniorTip: 'Fish omega-3 DHA reduces joint cartilage degradation. Eating fish 3x per week reduces arthritis pain significantly.',
    tags: ['bone-joint', 'omega-3-dha', 'cartilage-protection', 'arthritis-pain', 'festive']
  },
  {
    id: 'bj24', name: 'Moringa Leaf Powder Drink', hindiName: 'सहजन पत्ती पाउडर',
    category: 'breakfast', cookTime: 3, protein: 4, calories: 40,
    healthTag: 'bone-joint',
    ingredients: ['1 tsp moringa powder', 'Warm water', 'Lemon', 'Honey', 'Ginger'],
    steps: ['Mix moringa powder in warm water', 'Add lemon juice', 'Add honey', 'Add ginger juice', 'Stir well', 'Drink 30 minutes before breakfast'],
    seniorTip: 'Moringa has 17x more calcium than milk. Daily moringa drink is best bone supplement for seniors. No side effects.',
    tags: ['bone-joint', 'moringa', 'calcium-17x-milk', 'superfood', 'daily-supplement']
  },
  {
    id: 'bj25', name: 'Curd Rice with Til', hindiName: 'तिल दही चावल',
    category: 'dinner', cookTime: 10, protein: 12, calories: 300,
    healthTag: 'bone-joint',
    ingredients: ['1 cup cooked rice', '200g thick curd', '1 tbsp sesame seeds toasted', 'Mustard seeds', 'Curry leaves', 'Ginger', 'Salt'],
    steps: ['Mix rice and curd well', 'Toast sesame seeds until golden', 'Make mustard temper', 'Add ginger to temper', 'Pour over rice mixture', 'Top with toasted sesame'],
    seniorTip: 'South Indian curd rice with sesame is traditional bone health dinner. Calcium from curd plus sesame daily.',
    tags: ['bone-joint', 'calcium', 'sesame', 'probiotic', 'traditional', 'south-indian']
  },
];

export default function RecipeGuide({ profile }: RecipeGuideProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  const mealCategories = [
    { id: 'all', label: '🍽️ All Meals' },
    { id: 'breakfast', label: '🌅 Breakfast' },
    { id: 'lunch', label: '☀️ Lunch' },
    { id: 'dinner', label: '🌙 Dinner' },
    { id: 'snack', label: '🍎 Snack' },
  ];

  const healthCategories = [
    { id: 'all', label: '✅ All' },
    { id: 'weight-loss', label: '⚖️ Weight Loss' },
    { id: 'heart-health', label: '❤️ Heart' },
    { id: 'diabetes', label: '🩺 Diabetes' },
    { id: 'bone-joint', label: '🦴 Bone & Joint' },
    { id: 'favourites', label: '❤️ Saved' },
  ];

  function toggleFavourite(id: string) {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const filtered = ALL_RECIPES.filter((r) => {
    const matchMeal = category === 'all' || r.category === category;
    const matchHealth = healthFilter === 'all' || healthFilter === 'favourites'
      ? healthFilter === 'favourites' ? favourites.includes(r.id) : true
      : r.healthTag === healthFilter;
    const matchSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.hindiName.includes(search) ||
      r.tags.some((t) => t.includes(search.toLowerCase()));
    return matchMeal && matchHealth && matchSearch;
  });

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
          <ChefHat size={40} className="text-orange-400 mx-auto mb-3" />
          <p className="text-orange-800 font-bold text-lg">Set Up Your Profile First</p>
          <p className="text-orange-600 text-sm mt-1">Go to Profile tab to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-gray-900">Healthy Recipes</h2>
        <p className="text-gray-500 mt-1">100 medically-designed recipes for 60+ adults</p>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-2 text-center">
          <p className="text-lg font-bold text-orange-600">25</p>
          <p className="text-xs text-gray-500">⚖️ Weight</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-center">
          <p className="text-lg font-bold text-red-600">25</p>
          <p className="text-xs text-gray-500">❤️ Heart</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-center">
          <p className="text-lg font-bold text-blue-600">25</p>
          <p className="text-xs text-gray-500">🩺 Diabetes</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-2 text-center">
          <p className="text-lg font-bold text-green-600">25</p>
          <p className="text-xs text-gray-500">🦴 Bones</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search recipes, ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-400"
        />
      </div>

      {/* Health Filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {healthCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setHealthFilter(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              healthFilter === cat.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Meal Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {mealCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat.id
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-3">Showing {filtered.length} recipes</p>

      {/* Recipe Cards */}
      <div className="space-y-3">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-4 cursor-pointer" onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-gray-900">{recipe.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${healthColors[recipe.healthTag]}`}>
                      {healthLabels[recipe.healthTag]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{recipe.hindiName}</p>
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <span className="flex items-center gap-1 text-orange-500 font-bold">
                      <Zap size={14} />{recipe.protein}g protein
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} />{recipe.cookTime} mins
                    </span>
                    <span className="text-gray-400">{recipe.calories} cal</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[recipe.category]}`}>
                      {recipe.category}
                    </span>
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
                  <p className="text-xs font-bold text-amber-700 mb-1">👴 Senior Health Tip</p>
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
          <p className="text-sm mt-1">Try different filters</p>
        </div>
      )}

    </div>
  );
}