import { useState } from 'react';
import { Search, Clock, Zap, ChefHat, Heart, Loader } from 'lucide-react';
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

export default function RecipeGuide({ profile }: RecipeGuideProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'all', label: '🍽️ All' },
    { id: 'breakfast', label: '🌅 Breakfast' },
    { id: 'lunch', label: '☀️ Lunch' },
    { id: 'dinner', label: '🌙 Dinner' },
    { id: 'snack', label: '🍎 Snack' },
  ];

  async function generateRecipes() {
    setLoading(true);
    setError('');
    try {
      const prompt = `Generate 12 high-protein Indian recipes for a ${profile?.age || 60}-year-old person weighing ${profile?.weight_kg || 85}kg with target weight ${profile?.target_weight_kg || 75}kg.

Requirements:
- High protein (15g+ per serving)
- Indian ingredients easily available in India
- Senior-friendly (easy to digest, soft textures)
- Weight loss friendly
- Mix of breakfast, lunch, dinner and snack

Return ONLY a valid JSON array with exactly this structure, no other text:
[
  {
    "id": "unique_id",
    "name": "Recipe Name in English",
    "hindiName": "Recipe Name in Hindi",
    "category": "breakfast|lunch|dinner|snack",
    "cookTime": 20,
    "protein": 25,
    "calories": 350,
    "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
    "steps": ["Step 1", "Step 2", "Step 3"],
    "seniorTip": "Special tip for 60+ adults",
    "tags": ["high-protein", "weight-loss"]
  }
]`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4000,
            },
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;

      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Invalid response');

      const parsed = JSON.parse(jsonMatch[0]);
      setRecipes(parsed);
      setGenerated(true);
    } catch (err) {
      setError('Failed to generate recipes. Please try again.');
      console.error(err);
    }
    setLoading(false);
  }

  async function generateMore() {
    setLoading(true);
    setError('');
    try {
      const existing = recipes.map((r) => r.name).join(', ');
      const prompt = `Generate 8 MORE high-protein Indian recipes for a ${profile?.age || 60}-year-old person.
      
Already generated: ${existing}
      
DO NOT repeat these recipes. Generate completely different ones.
Same requirements: high protein 15g+, Indian ingredients, senior-friendly, weight loss.

Return ONLY valid JSON array same structure as before.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 1.0,
              maxOutputTokens: 6000,
            },
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Invalid response');
      const parsed = JSON.parse(jsonMatch[0]);
      setRecipes((prev) => [...prev, ...parsed]);
    } catch (err) {
      setError('Failed to generate more recipes. Try again.');
    }
    setLoading(false);
  }

  function toggleFavourite(id: string) {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  const filtered = recipes.filter((r) => {
    const matchCat = category === 'all' || r.category === category;
    const matchSearch =
      search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.hindiName.includes(search) ||
      r.tags.some((t) => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
          <ChefHat size={40} className="text-orange-400 mx-auto mb-3" />
          <p className="text-orange-800 font-bold text-lg">Set Up Your Profile First</p>
          <p className="text-orange-600 text-sm mt-1">
            AI needs your age and weight to suggest perfect recipes!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">AI Recipes</h2>
        <p className="text-gray-500 mt-1">
          Personalised for {profile.name} • {profile.age} yrs • {profile.weight_kg}kg
        </p>
      </div>

      {/* Generate Button */}
      {!generated ? (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-6 text-white text-center">
          <ChefHat size={48} className="mx-auto mb-3 text-orange-200" />
          <p className="font-bold text-xl mb-2">Get Your Personal Recipe Plan!</p>
          <p className="text-orange-100 text-sm mb-4">
            AI will generate 12 high-protein Indian recipes personalised for your age, weight and goal
          </p>
          <button
            onClick={generateRecipes}
            disabled={loading}
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors disabled:opacity-70 flex items-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Generating your recipes...
              </>
            ) : (
              <>
                <ChefHat size={20} />
                Generate My Recipes! 🍽️
              </>
            )}
          </button>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
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
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-500">{recipes.length}</p>
              <p className="text-xs text-gray-400">Total Recipes</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-emerald-500">{filtered.length}</p>
              <p className="text-xs text-gray-400">Showing</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-red-400">{favourites.length}</p>
              <p className="text-xs text-gray-400">Favourites</p>
            </div>
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Recipe Cards */}
      <div className="space-y-3">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
          >
            {/* Recipe Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() =>
                setExpanded(expanded === recipe.id ? null : recipe.id)
              }
            >
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
                      <Zap size={14} />
                      {recipe.protein}g protein
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} />
                      {recipe.cookTime} mins
                    </span>
                    <span className="text-gray-400">
                      {recipe.calories} cal
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(recipe.id);
                  }}
                  className="ml-2 p-1"
                >
                  <Heart
                    size={20}
                    className={favourites.includes(recipe.id)
                      ? 'text-red-500 fill-red-500'
                      : 'text-gray-300'
                    }
                  />
                </button>
              </div>
            </div>

            {/* Expanded Recipe Details */}
            {expanded === recipe.id && (
              <div className="px-4 pb-4 border-t border-gray-100">

                {/* Ingredients */}
                <div className="mt-3 mb-3">
                  <p className="font-bold text-gray-800 text-sm mb-2">
                    🛒 Ingredients
                  </p>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="mb-3">
                  <p className="font-bold text-gray-800 text-sm mb-2">
                    👨‍🍳 How to Make
                  </p>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Senior Tip */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700 mb-1">
                    👴 Senior Tip (60+)
                  </p>
                  <p className="text-sm text-amber-800">{recipe.seniorTip}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {generated && (
        <button
          onClick={generateMore}
          disabled={loading}
          className="w-full mt-6 bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Generating more...
            </>
          ) : (
            <>
              <ChefHat size={20} />
              Generate 8 More Recipes! ✨
            </>
          )}
        </button>
      )}

    </div>
  );
}