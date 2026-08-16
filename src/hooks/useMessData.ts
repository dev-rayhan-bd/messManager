import { useState, useMemo } from 'react';
import { Member, Expense, MessSummary, ExpenseCategory } from '../types/mess';

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Rayhan Ahmed',
    phone: '+880 1712-345678',
    deposit: 4500,
    meals: { breakfast: 14, lunch: 22, dinner: 20 },
    joinedDate: '2026-08-01',
  },
  {
    id: 'm2',
    name: 'Tanvir Hossain',
    phone: '+880 1812-987654',
    deposit: 3000,
    meals: { breakfast: 10, lunch: 18, dinner: 15 },
    joinedDate: '2026-08-01',
  },
  {
    id: 'm3',
    name: 'Shakib Al Hasan',
    phone: '+880 1912-112233',
    deposit: 5000,
    meals: { breakfast: 20, lunch: 24, dinner: 24 },
    joinedDate: '2026-08-02',
  },
  {
    id: 'm4',
    name: 'Mahfuzur Rahman',
    phone: '+880 1512-445566',
    deposit: 2500,
    meals: { breakfast: 8, lunch: 12, dinner: 10 },
    joinedDate: '2026-08-03',
  },
  {
    id: 'm5',
    name: 'Ariful Islam',
    phone: '+880 1612-778899',
    deposit: 4000,
    meals: { breakfast: 15, lunch: 20, dinner: 18 },
    joinedDate: '2026-08-05',
  },
];

const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'e1',
    title: 'Weekly Rice & Oil Bazar',
    amount: 3200,
    category: 'grocery',
    date: '2026-08-14',
    paidBy: 'Rayhan Ahmed',
    note: '50kg Miniket & 5L Rupchanda Oil',
  },
  {
    id: 'e2',
    title: 'Fresh Fish & Chicken',
    amount: 1850,
    category: 'bazar',
    date: '2026-08-15',
    paidBy: 'Tanvir Hossain',
    note: 'Rui fish 2kg, Broiler 3kg',
  },
  {
    id: 'e3',
    title: 'Electricity & Water Bill',
    amount: 2400,
    category: 'utility',
    date: '2026-08-10',
    paidBy: 'Shakib Al Hasan',
  },
  {
    id: 'e4',
    title: 'Cook Monthly Salary (Advance)',
    amount: 3000,
    category: 'cook',
    date: '2026-08-01',
    paidBy: 'Rayhan Ahmed',
  },
  {
    id: 'e5',
    title: 'Daily Spices & Vegetables',
    amount: 650,
    category: 'bazar',
    date: '2026-08-16',
    paidBy: 'Ariful Islam',
  },
];

const BUDGET_LIMIT = 20000;

export function useMessData() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);

  // Dynamic calculations
  const summary: MessSummary = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalDeposits = members.reduce((sum, m) => sum + m.deposit, 0);
    const totalMeals = members.reduce(
      (sum, m) => sum + m.meals.breakfast * 0.5 + m.meals.lunch * 1 + m.meals.dinner * 1,
      0
    );
    const mealRate = totalMeals > 0 ? Number((totalExpenses / totalMeals).toFixed(2)) : 0;

    return {
      totalExpenses,
      totalDeposits,
      totalMeals,
      mealRate,
      totalMembers: members.length,
      budgetLimit: BUDGET_LIMIT,
    };
  }, [members, expenses]);

  // Calculate detailed financial ledger for each member
  const memberLedger = useMemo(() => {
    return members.map((member) => {
      const memberTotalMeals =
        member.meals.breakfast * 0.5 + member.meals.lunch * 1 + member.meals.dinner * 1;
      const mealCost = Number((memberTotalMeals * summary.mealRate).toFixed(2));
      const netBalance = Number((member.deposit - mealCost).toFixed(2));
      const status: 'surplus' | 'due' | 'settled' =
        netBalance > 0 ? 'surplus' : netBalance < 0 ? 'due' : 'settled';

      return {
        ...member,
        totalMeals: memberTotalMeals,
        mealCost,
        netBalance,
        status,
      };
    });
  }, [members, summary.mealRate]);

  // Actions
  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const created: Expense = {
      ...newExpense,
      id: 'e' + Date.now(),
    };
    setExpenses((prev) => [created, ...prev]);
  };

  const updateMemberMeals = (
    memberId: string,
    type: 'breakfast' | 'lunch' | 'dinner',
    delta: number
  ) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        const currentCount = m.meals[type];
        const updatedCount = Math.max(0, currentCount + delta);
        return {
          ...m,
          meals: {
            ...m.meals,
            [type]: updatedCount,
          },
        };
      })
    );
  };

  const addDeposit = (memberId: string, amount: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, deposit: m.deposit + amount } : m))
    );
  };

  const addMember = (name: string, phone: string, initialDeposit: number) => {
    const newMember: Member = {
      id: 'm' + Date.now(),
      name,
      phone,
      deposit: initialDeposit,
      meals: { breakfast: 0, lunch: 0, dinner: 0 },
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setMembers((prev) => [...prev, newMember]);
  };

  return {
    members,
    expenses,
    summary,
    memberLedger,
    addExpense,
    updateMemberMeals,
    addDeposit,
    addMember,
  };
}
