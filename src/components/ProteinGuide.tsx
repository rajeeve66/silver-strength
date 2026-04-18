import { Apple, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { proteinFoods, dailyProteinTarget, mealPlan } from '../data/protein';

export default function ProteinGuide() {
  const [expandedFood, setExpandedFood] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'foods' | 'mealplan'>('foods');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Apple size={24} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Indian Protein Guide</h2>
          <p className="text-gray-500 text-base">Optimised for muscle growth & fat loss</p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-700 font-medium">Daily Protein Target</p>
            <p className="text-3xl font-bold text-emerald-800">{dailyProteinTarget}g</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-700">For a 60-year-old man</p>
            <p className="text-xs text-emerald-600 mt-0.5">~1.5–2g per kg of body weight</p>
          </div>
        </div>
        <div className="mt-3 h-2 bg-emerald-200 rounded-full overflow-hidden">
          <div className="h-full w-full bg-emerald-500 rounded-full" />
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveTab('foods')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'foods'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Protein Foods
        </button>
        <button
          onClick={() => setActiveTab('mealplan')}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === 'mealplan'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Sample Meal Plan
        </button>
      </div>

      {activeTab === 'foods' && (
        <div className="space-y-3">
          {proteinFoods.map((food) => (
            <div key={food.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedFood(expandedFood === food.name ? null : food.name)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{food.icon}</span>
                    <div>
                      <p className="text-base font-bold text-gray-900">{food.name}</p>
                      <p className="text-sm text-gray-500">{food.serving}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">{food.protein}g</p>
                      <p className="text-xs text-gray-400">protein</p>
                    </div>
                    {expandedFood === food.name ? (
                      <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {expandedFood === food.name && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{food.description}</p>
                  <p className="text-sm font-bold text-gray-800 mb-2">Meal Ideas:</p>
                  <ul className="space-y-1.5">
                    {food.meals.map((meal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span>
                        {meal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mealplan' && (
        <div className="space-y-3">
          {Object.values(mealPlan).map((meal) => (
            <div key={meal.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={15} className="text-orange-500" />
                <span className="text-sm font-bold text-orange-600">{meal.time}</span>
                <span className="text-sm font-semibold text-gray-800">— {meal.label}</span>
              </div>
              <ul className="space-y-1">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4">
            <p className="text-sm font-bold text-amber-800 mb-2">Nutrition Notes for 60+</p>
            <ul className="space-y-1.5 text-sm text-amber-700">
              <li className="flex items-start gap-2"><span className="font-bold">•</span>Eat protein at every meal — ageing reduces muscle protein synthesis efficiency</li>
              <li className="flex items-start gap-2"><span className="font-bold">•</span>Take 2000–4000 IU Vitamin D3 daily if advised by doctor (critical for muscle & bone health)</li>
              <li className="flex items-start gap-2"><span className="font-bold">•</span>Drink 2.5–3 litres of water daily to support joint lubrication</li>
              <li className="flex items-start gap-2"><span className="font-bold">•</span>Minimise refined flour (maida), sugar, and fried snacks</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
