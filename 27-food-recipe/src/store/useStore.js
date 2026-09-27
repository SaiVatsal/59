import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'recipes', // 'recipes' | 'favorites' | 'cookmode' | 'submit'

  selectedDiet: 'All',
  dietaryFilters: ['All', 'Mediterranean', 'Plant-Based', 'Gluten-Free', 'High-Protein', 'Quick 20-Min'],

  searchQuery: '',

  recipes: [
    {
      id: 'rcp-01',
      title: 'Tuscan Saffron Pappardelle with Wild Chanterelles',
      category: 'Mediterranean',
      author: 'Chef Lorenzo Rossi',
      prepTime: '20 mins',
      cookTime: '15 mins',
      servings: 4,
      rating: 4.95,
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=1000&q=80',
      description: 'Handmade egg ribbon pasta tossed in golden saffron butter, blistered thyme, shaved Parmigiano-Reggiano, and pan-roasted chanterelles.',
      ingredients: [
        '400g Fresh Pappardelle Ribbon Pasta',
        '0.5g Premium Iranian Saffron Threads',
        '300g Fresh Chanterelle Mushrooms (cleaned)',
        '60g Cultured Unsalted Butter',
        '3 cloves Early Garlic, finely sliced',
        '80g Parmigiano-Reggiano 24-Month Aged'
      ],
      steps: [
        { step: 1, title: 'Bloom the Saffron', instruction: 'Steep saffron threads in 4 tablespoons of warm starchy pasta water for 10 minutes until deeply golden.', timerSeconds: 600 },
        { step: 2, title: 'Sear Chanterelles', instruction: 'Melt half the butter in a heavy copper skillet. Sauté chanterelles on high heat until golden-edged and aromatic (approx 4 mins).', timerSeconds: 240 },
        { step: 3, title: 'Emulsify Sauce', instruction: 'Add sliced garlic, bloomed saffron infusion, and remaining butter. Swirl vigorously to form a glossy silk emulsion.', timerSeconds: 120 },
        { step: 4, title: 'Toss & Plate', instruction: 'Drop pasta directly into skillet. Fold with grated parmesan and fresh thyme leaves. Serve immediately on warmed stoneware.' }
      ]
    },
    {
      id: 'rcp-02',
      title: 'Charred Heirloom Shakshuka with Whipped Labneh & Zaatar',
      category: 'Mediterranean',
      author: 'Chef Yasmin Al-Hassan',
      prepTime: '15 mins',
      cookTime: '25 mins',
      servings: 3,
      rating: 4.92,
      image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1000&q=80',
      description: 'Cast-iron roasted bell peppers and San Marzano tomatoes spiced with cumin, smoked paprika, soft-poached pasture eggs, and cool mint labneh.',
      ingredients: [
        '4 Pasture-Raised Organic Eggs',
        '1 Can San Marzano Whole Tomatoes',
        '2 Red Bell Peppers, wood-charred & diced',
        '1 Yellow Onion, caramelized',
        '1 tsp Cumin & Smoked Spanish Paprika',
        '150g Labneh with Zaatar & Olive Oil'
      ],
      steps: [
        { step: 1, title: 'Caramelize Aromatics', instruction: 'Cook diced onions and charred peppers in olive oil until sweet and tender.', timerSeconds: 480 },
        { step: 2, title: 'Simmer Spiced Tomato Ragù', instruction: 'Crush San Marzano tomatoes into skillet with spices. Simmer gently until thickened.', timerSeconds: 600 },
        { step: 3, title: 'Poach Pasture Eggs', instruction: 'Create 4 shallow wells in sauce. Crack eggs in, cover skillet, and cook until whites set and yolks remain molten.', timerSeconds: 300 }
      ]
    },
    {
      id: 'rcp-03',
      title: 'Crispy Miso-Glazed Tempeh & Avocado Poke Bowl',
      category: 'Plant-Based',
      author: 'Kenji Sato',
      prepTime: '15 mins',
      cookTime: '10 mins',
      servings: 2,
      rating: 4.88,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
      description: 'Golden caramelized organic tempeh cubes over steamed sushi rice with edamame, pickled ginger, ripe avocado, and toasted sesame nori.',
      ingredients: [
        '250g Organic Tempeh cubes',
        '2 tbsp Red Miso & Mirin Glaze',
        '1 cup Steamed Short-Grain Rice',
        '1 Ripe Haas Avocado',
        '1/2 cup Shelled Edamame',
        'Toasted Sesame & Nori Flakes'
      ],
      steps: [
        { step: 1, title: 'Pan-Sear Tempeh', instruction: 'Sear cubes in sesame oil until golden crisp on all sides.', timerSeconds: 360 },
        { step: 2, title: 'Caramelize Miso Glaze', instruction: 'Pour miso-mirin reduction over hot tempeh. Toss 1 minute until sticky glaze adheres.', timerSeconds: 60 },
        { step: 3, title: 'Assemble Bowl', instruction: 'Layer rice, sliced avocado, edamame, and glazed tempeh. Garnish with toasted nori.' }
      ]
    }
  ],

  favorites: ['rcp-01'],

  activeCookingRecipe: null,
  activeStepIndex: 0,

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedDiet: (diet) => set({ selectedDiet: diet }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleFavorite: (recipeId) => set((state) => {
    const isFav = state.favorites.includes(recipeId);
    return {
      favorites: isFav
        ? state.favorites.filter(id => id !== recipeId)
        : [...state.favorites, recipeId]
    };
  }),

  startCookMode: (recipe) => set({
    activeCookingRecipe: recipe,
    activeStepIndex: 0,
    activeTab: 'cookmode'
  }),

  setCookStepIndex: (idx) => set({ activeStepIndex: idx }),

  addRecipe: (rcpData) => set((state) => {
    const newRcp = {
      id: `rcp-${Date.now()}`,
      title: rcpData.title,
      category: rcpData.category || 'Mediterranean',
      author: rcpData.author || 'Home Artisan',
      prepTime: rcpData.prepTime || '15 mins',
      cookTime: rcpData.cookTime || '20 mins',
      servings: Number(rcpData.servings || 4),
      rating: 5.0,
      image: rcpData.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      description: rcpData.description || 'Delicious home-cooked seasonal recipe.',
      ingredients: (rcpData.ingredientsString || '').split('\n').filter(Boolean),
      steps: [
        { step: 1, title: 'Prepare Ingredients', instruction: 'Wash, chop, and assemble all fresh aromatics and pantry staples.' },
        { step: 2, title: 'Cook and Assemble', instruction: 'Follow gentle heat technique until fragrant and cooked through.' },
        { step: 3, title: 'Garnish and Serve', instruction: 'Plate with fresh herbs, flaky sea salt, and extra virgin olive oil.' }
      ]
    };
    return { recipes: [newRcp, ...state.recipes] };
  })
}));
