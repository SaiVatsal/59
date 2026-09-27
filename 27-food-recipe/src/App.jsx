import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Heart,
  Clock,
  Users,
  Star,
  Play,
  Pause,
  RotateCcw,
  ChefHat,
  Search,
  PlusCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Sparkles
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedDiet,
    setSelectedDiet,
    dietaryFilters,
    searchQuery,
    setSearchQuery,
    recipes,
    favorites,
    activeCookingRecipe,
    activeStepIndex,
    toggleFavorite,
    startCookMode,
    setCookStepIndex,
    addRecipe
  } = useStore();

  const [selectedRecipeModal, setSelectedRecipeModal] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Kitchen Timer State in Cook Mode
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const [recipeForm, setRecipeForm] = useState({
    title: '',
    category: 'Mediterranean',
    author: 'Elena Rostova',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 4,
    description: '',
    ingredientsString: '300g Organic Semolina\n3 Pasture Eggs\n1 tsp Sea Salt Flakes'
  });

  // Handle active cooking step timer
  useEffect(() => {
    if (activeCookingRecipe && activeCookingRecipe.steps[activeStepIndex]?.timerSeconds) {
      setSecondsRemaining(activeCookingRecipe.steps[activeStepIndex].timerSeconds);
      setTimerRunning(false);
    } else {
      setSecondsRemaining(0);
      setTimerRunning(false);
    }
  }, [activeCookingRecipe, activeStepIndex]);

  useEffect(() => {
    let interval = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredRecipes = recipes.filter((rcp) => {
    const matchesDiet = selectedDiet === 'All' || rcp.category === selectedDiet;
    const matchesSearch =
      rcp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rcp.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rcp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiet && matchesSearch;
  });

  const handleRecipeSubmit = (e) => {
    e.preventDefault();
    if (!recipeForm.title) return;
    addRecipe(recipeForm);
    setShowSubmitModal(false);
    setRecipeForm({
      title: '',
      category: 'Mediterranean',
      author: 'Elena Rostova',
      prepTime: '15 mins',
      cookTime: '20 mins',
      servings: 4,
      description: '',
      ingredientsString: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#fffbeb] text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Warm Mustard Header */}
      <header className="sticky top-0 z-40 bg-[#fffbeb]/95 backdrop-blur border-b border-amber-200/80 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c2410c] flex items-center justify-center text-white shadow-md shadow-orange-700/20">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="font-hand-script text-2xl font-bold text-[#7c2d12] block leading-none">
                Saffron & Thyme
              </span>
              <span className="text-[10px] tracking-widest text-[#9a3412] uppercase font-bold">
                Artisanal Kitchens • Step-by-Step Cook Mode
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-amber-100/70 p-1.5 rounded-2xl border border-amber-200 text-xs font-bold text-[#7c2d12]">
            {[
              { id: 'recipes', label: 'Seasonal Recipes', icon: UtensilsCrossed },
              { id: 'favorites', label: `Cookbook Vault (${favorites.length})`, icon: Heart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-[#c2410c] text-white shadow-sm'
                      : 'hover:bg-amber-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Share Recipe</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* VIEW 1: RECIPES DISCOVERY */}
        {activeTab === 'recipes' && (
          <div className="space-y-8">
            {/* Search and Dietary Filter Bar */}
            <div className="bg-white border border-amber-200/80 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search saffron, pasta, chanterelles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Dietary Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {dietaryFilters.map((diet) => (
                  <button
                    key={diet}
                    onClick={() => setSelectedDiet(diet)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                      selectedDiet === diet
                        ? 'bg-[#c2410c] text-white'
                        : 'bg-amber-100/60 text-[#7c2d12] hover:bg-amber-200/60'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Photography Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((rcp) => {
                const isFav = favorites.includes(rcp.id);
                return (
                  <div
                    key={rcp.id}
                    className="bg-white border border-amber-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={rcp.image}
                        alt={rcp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(rcp.id);
                        }}
                        className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 backdrop-blur text-[#c2410c] hover:bg-white shadow-md transition"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-[#c2410c]' : ''}`} />
                      </button>
                      <div className="absolute bottom-3.5 left-3.5 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {rcp.prepTime} Prep • {rcp.cookTime} Cook
                      </div>
                    </div>

                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c2410c] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                            {rcp.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                            <Star className="w-3.5 h-3.5 fill-amber-500" /> {rcp.rating}
                          </span>
                        </div>

                        <h3
                          onClick={() => setSelectedRecipeModal(rcp)}
                          className="font-serif text-xl font-bold text-slate-900 leading-snug cursor-pointer hover:text-[#c2410c] transition"
                        >
                          {rcp.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {rcp.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-amber-100 flex gap-2">
                        <button
                          onClick={() => setSelectedRecipeModal(rcp)}
                          className="flex-1 py-2 bg-amber-100/70 hover:bg-amber-200/70 text-[#7c2d12] rounded-xl text-xs font-bold transition"
                        >
                          View Ingredients
                        </button>
                        <button
                          onClick={() => startCookMode(rcp)}
                          className="flex-1 py-2 bg-[#c2410c] hover:bg-[#9a3412] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Play className="w-3 h-3 fill-white" /> Cook Mode
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: COOK MODE (STEP-BY-STEP DISTRACTION FREE) */}
        {activeTab === 'cookmode' && activeCookingRecipe && (
          <div className="max-w-3xl mx-auto bg-white border border-amber-200 rounded-3xl p-8 shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-amber-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c2410c] bg-orange-50 px-2.5 py-0.5 rounded-full">
                  Interactive Kitchen Assistant
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  {activeCookingRecipe.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('recipes')}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Exit Cook Mode ✕
              </button>
            </div>

            {/* Step Progress Stepper */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {activeCookingRecipe.steps.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => setCookStepIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                    activeStepIndex === idx
                      ? 'bg-[#c2410c] text-white'
                      : idx < activeStepIndex
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-50 text-slate-500'
                  }`}
                >
                  Step {st.step}
                </button>
              ))}
            </div>

            {/* Active Step Content */}
            <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-200/70 space-y-4">
              <span className="text-xs font-bold text-[#c2410c] uppercase tracking-wider">
                Step {activeStepIndex + 1} of {activeCookingRecipe.steps.length}
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                {activeCookingRecipe.steps[activeStepIndex]?.title}
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {activeCookingRecipe.steps[activeStepIndex]?.instruction}
              </p>

              {/* Kitchen Countdown Timer Widget */}
              {secondsRemaining > 0 && (
                <div className="mt-6 p-4 bg-white rounded-2xl border border-amber-200 flex items-center justify-between gap-4 max-w-sm">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Cooking Timer</span>
                    <span className="text-3xl font-mono font-black text-[#c2410c]">
                      {formatTimer(secondsRemaining)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="p-3 bg-[#c2410c] text-white rounded-xl hover:bg-[#9a3412] transition shadow-md"
                    >
                      {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setSecondsRemaining(activeCookingRecipe.steps[activeStepIndex]?.timerSeconds || 0);
                      }}
                      className="p-3 bg-amber-100 text-[#7c2d12] rounded-xl hover:bg-amber-200 transition"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <button
                onClick={() => setCookStepIndex(Math.max(0, activeStepIndex - 1))}
                disabled={activeStepIndex === 0}
                className="px-5 py-2.5 bg-slate-100 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>

              {activeStepIndex < activeCookingRecipe.steps.length - 1 ? (
                <button
                  onClick={() => setCookStepIndex(activeStepIndex + 1)}
                  className="px-6 py-2.5 bg-[#c2410c] hover:bg-[#9a3412] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-700/20"
                >
                  <span>Next Step</span> <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('recipes')}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" /> Dish Completed!
                </button>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: SAVED COOKBOOK */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div className="border-b border-amber-200 pb-3">
              <h2 className="font-serif text-3xl font-bold text-slate-900">Your Private Kitchen Vault</h2>
              <p className="text-xs text-[#7c2d12]">Bookmarked recipes for weeknight meals and celebratory dinners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes
                .filter((r) => favorites.includes(r.id))
                .map((rcp) => (
                  <div key={rcp.id} className="bg-white border border-amber-200 rounded-3xl p-5 space-y-4 shadow-sm">
                    <img src={rcp.image} alt={rcp.title} className="w-full h-44 object-cover rounded-2xl" />
                    <h3 className="font-serif text-xl font-bold text-slate-900">{rcp.title}</h3>
                    <button
                      onClick={() => startCookMode(rcp)}
                      className="w-full py-2 bg-[#c2410c] text-white rounded-xl text-xs font-bold"
                    >
                      Start Cooking
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* RECIPE INGREDIENTS MODAL */}
      {selectedRecipeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-amber-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <span className="text-xs font-bold text-[#c2410c] uppercase">{selectedRecipeModal.category}</span>
              <button onClick={() => setSelectedRecipeModal(null)} className="text-slate-400">✕</button>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">{selectedRecipeModal.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedRecipeModal.servings} Servings • {selectedRecipeModal.prepTime} Prep</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#7c2d12]">Required Ingredients:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                {selectedRecipeModal.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                const target = selectedRecipeModal;
                setSelectedRecipeModal(null);
                startCookMode(target);
              }}
              className="w-full py-3 bg-[#c2410c] hover:bg-[#9a3412] text-white rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-md"
            >
              Launch Interactive Cook Mode
            </button>
          </div>
        </div>
      )}

      {/* SHARE RECIPE MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-amber-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-2">
              <h3 className="font-serif text-xl font-bold text-slate-900">Share Kitchen Recipe</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleRecipeSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Handmade Ricotta Gnocchi with Sage"
                  value={recipeForm.title}
                  onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })}
                  className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={recipeForm.category}
                    onChange={(e) => setRecipeForm({ ...recipeForm, category: e.target.value })}
                    className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
                  >
                    <option>Mediterranean</option>
                    <option>Plant-Based</option>
                    <option>Gluten-Free</option>
                    <option>High-Protein</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Cook Time</label>
                  <input
                    type="text"
                    value={recipeForm.cookTime}
                    onChange={(e) => setRecipeForm({ ...recipeForm, cookTime: e.target.value })}
                    className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ingredients (One per line)</label>
                <textarea
                  rows={3}
                  value={recipeForm.ingredientsString}
                  onChange={(e) => setRecipeForm({ ...recipeForm, ingredientsString: e.target.value })}
                  className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#c2410c] text-white rounded-xl font-bold"
                >
                  Publish Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-[#fffbeb] py-6 text-center text-xs text-[#9a3412] font-semibold">
        © 2026 SAFFRON & THYME • ARTISANAL RECIPE ENGINE • FIREBASE FIRESTORE SYNC
      </footer>
    </div>
  );
}
