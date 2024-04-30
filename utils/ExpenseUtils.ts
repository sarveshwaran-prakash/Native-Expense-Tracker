import { Expense } from "../components/ExpenseList";

export const computeTotalAmount = (
  expenses: Expense[],
  type: string
): number => {
  return expenses
    .filter((expense) => expense.selectedType === type)
    .reduce((total, expense) => {
      return type === "Income"
        ? total + parseFloat(expense.amount || "0")
        : total - parseFloat(expense.amount || "0");
    }, 0);
};

export const computeTotalAll = (expenses: Expense[]): number => {
  const totalIncome = computeTotalAmount(expenses, "Income");
  const totalExpense = computeTotalAmount(expenses, "Expense");
  return totalIncome + totalExpense;
};
