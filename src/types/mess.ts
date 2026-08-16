export type ExpenseCategory = 'grocery' | 'bazar' | 'utility' | 'cook' | 'other';

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  deposit: number;
  meals: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  joinedDate: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  paidBy: string; // Member name or ID
  note?: string;
}

export interface DailyMealEntry {
  date: string;
  memberId: string;
  breakfast: number;
  lunch: number;
  dinner: number;
}

export interface MessSummary {
  totalExpenses: number;
  totalDeposits: number;
  totalMeals: number;
  mealRate: number;
  totalMembers: number;
  budgetLimit: number;
}
