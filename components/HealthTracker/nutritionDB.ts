export type FoodUnit = 'g' | 'ml' | 'piece' | 'scoop'

export interface FoodEntry {
  cal: number
  protein: number
  fat: number
  carbs: number
  unit: FoodUnit
  per?: number
  grams?: number
}

export const FOOD_DB: Record<string, FoodEntry> = {
  // Proteins
  'Chicken Breast (cooked)': {
    cal: 165,
    protein: 31,
    fat: 3.6,
    carbs: 0,
    unit: 'g'
  },
  'Egg (whole)': {
    cal: 78,
    protein: 6,
    fat: 5.3,
    carbs: 0.6,
    unit: 'piece',
    per: 1,
    grams: 50
  },
  'Egg White': {
    cal: 17,
    protein: 3.6,
    fat: 0.1,
    carbs: 0.2,
    unit: 'piece',
    per: 1,
    grams: 33
  },
  Paneer: { cal: 265, protein: 18, fat: 20, carbs: 3, unit: 'g' },
  'Greek Yogurt': { cal: 59, protein: 10, fat: 0.4, carbs: 3.6, unit: 'g' },
  'Curd (Dahi)': { cal: 61, protein: 3.5, fat: 3.3, carbs: 4.7, unit: 'g' },
  'Tuna (canned)': { cal: 116, protein: 26, fat: 1, carbs: 0, unit: 'g' },
  Salmon: { cal: 208, protein: 20, fat: 13, carbs: 0, unit: 'g' },
  'Whey Protein Scoop': {
    cal: 120,
    protein: 27,
    fat: 1.5,
    carbs: 3,
    unit: 'scoop',
    per: 1,
    grams: 30
  },
  // Dairy
  'Whole Milk': { cal: 61, protein: 3.2, fat: 3.3, carbs: 4.8, unit: 'ml' },
  'Skim Milk': { cal: 35, protein: 3.4, fat: 0.2, carbs: 4.9, unit: 'ml' },
  'Cheese (Cheddar)': {
    cal: 402,
    protein: 25,
    fat: 33,
    carbs: 1.3,
    unit: 'g'
  },
  // Grains & Carbs
  'Rice (cooked)': { cal: 130, protein: 2.7, fat: 0.3, carbs: 28, unit: 'g' },
  'Oats (dry)': { cal: 389, protein: 17, fat: 7, carbs: 66, unit: 'g' },
  'Roti (wheat)': {
    cal: 80,
    protein: 2.5,
    fat: 0.5,
    carbs: 15,
    unit: 'piece',
    per: 1,
    grams: 40
  },
  'Brown Bread': { cal: 247, protein: 9, fat: 3.4, carbs: 41, unit: 'g' },
  'White Bread': { cal: 265, protein: 9, fat: 3.2, carbs: 49, unit: 'g' },
  'Poha (cooked)': { cal: 110, protein: 2.5, fat: 1.5, carbs: 22, unit: 'g' },
  Idli: {
    cal: 39,
    protein: 2,
    fat: 0.4,
    carbs: 8,
    unit: 'piece',
    per: 1,
    grams: 50
  },
  Dosa: {
    cal: 168,
    protein: 4,
    fat: 5,
    carbs: 27,
    unit: 'piece',
    per: 1,
    grams: 100
  },
  'Quinoa (cooked)': { cal: 120, protein: 4.4, fat: 1.9, carbs: 21, unit: 'g' },
  'Sweet Potato (boiled)': {
    cal: 86,
    protein: 1.6,
    fat: 0.1,
    carbs: 20,
    unit: 'g'
  },
  Banana: {
    cal: 89,
    protein: 1.1,
    fat: 0.3,
    carbs: 23,
    unit: 'piece',
    per: 1,
    grams: 120
  },
  Apple: {
    cal: 52,
    protein: 0.3,
    fat: 0.2,
    carbs: 14,
    unit: 'piece',
    per: 1,
    grams: 180
  },
  // Pintola Muesli (from meal plan)
  'Pintola High Protein Muesli': {
    cal: 380,
    protein: 20,
    fat: 8,
    carbs: 55,
    unit: 'g'
  },
  // Vegetables
  'Spinach (cooked)': {
    cal: 23,
    protein: 2.9,
    fat: 0.4,
    carbs: 3.6,
    unit: 'g'
  },
  Broccoli: { cal: 34, protein: 2.8, fat: 0.4, carbs: 7, unit: 'g' },
  Tomato: { cal: 18, protein: 0.9, fat: 0.2, carbs: 3.9, unit: 'g' },
  Onion: { cal: 40, protein: 1.1, fat: 0.1, carbs: 9.3, unit: 'g' },
  'Dal (cooked)': { cal: 116, protein: 9, fat: 0.4, carbs: 20, unit: 'g' },
  'Rajma (cooked)': { cal: 127, protein: 8.7, fat: 0.5, carbs: 23, unit: 'g' },
  'Chickpeas (cooked)': {
    cal: 164,
    protein: 8.9,
    fat: 2.6,
    carbs: 27,
    unit: 'g'
  },
  // Fats & Oils
  'Olive Oil': { cal: 884, protein: 0, fat: 100, carbs: 0, unit: 'ml' },
  Ghee: { cal: 900, protein: 0, fat: 99.5, carbs: 0, unit: 'g' },
  Almonds: { cal: 579, protein: 21, fat: 50, carbs: 22, unit: 'g' },
  'Peanut Butter': { cal: 588, protein: 25, fat: 50, carbs: 20, unit: 'g' },
  // Beverages
  'Black Coffee': { cal: 2, protein: 0.3, fat: 0, carbs: 0, unit: 'ml' },
  'Green Tea': { cal: 1, protein: 0.2, fat: 0, carbs: 0.2, unit: 'ml' },
  'Coconut Water': { cal: 19, protein: 0.7, fat: 0.2, carbs: 3.7, unit: 'ml' },
  // Snacks
  'Peanuts (roasted)': { cal: 585, protein: 24, fat: 50, carbs: 21, unit: 'g' },
  'Makhana (Fox Nuts)': {
    cal: 347,
    protein: 9.7,
    fat: 0.1,
    carbs: 77,
    unit: 'g'
  },
  'Protein Bar': {
    cal: 200,
    protein: 20,
    fat: 7,
    carbs: 22,
    unit: 'piece',
    per: 1,
    grams: 60
  }
}

