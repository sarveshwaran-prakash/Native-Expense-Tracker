import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

interface Expense {
  id: string;
  title: string;
  amount?: string;
  selectedType: string;
  selectedDate: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  handleExpenseOptionPress: (expense: Expense) => void;
  handleDeleteExpense: (id: string) => void;
}

const { width } = Dimensions.get("window");

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  handleExpenseOptionPress,
}) => {
  console.log("expense.title", expenses);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {expenses.map((expense) => (
        <TouchableWithoutFeedback
          key={expense.id}
          onLongPress={() => handleExpenseOptionPress(expense)}
        >
          <View
            style={[
              styles.expense,
              expense.selectedType === "Expense"
                ? styles.expenseExpenseType
                : styles.expenseIncomeType,
            ]}
          >
            <View style={styles.expenseContent}>
              <Text numberOfLines={1} style={styles.title}>
                {expense.title}
              </Text>
              {expense.amount && (
                <Text numberOfLines={1} style={styles.amount}>
                  {/* {expense.amount} */}
                  {expense.selectedDate}
                </Text>
              )}
            </View>
            {/* <TouchableOpacity onPress={() => handleExpenseOptionPress(expense)}>
            <Text style={styles.optionText}>...</Text>
          </TouchableOpacity> */}
            <Text style={styles.title}>{expense.amount}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 20,
  },
  expense: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: width * 0.9,
    alignSelf: "center",
  },
  expenseContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  amount: {
    fontSize: 14,
    color: "gray",
  },

  selectedType: {
    fontWeight: "bold",
    fontSize: 16,
    right: 90,
  },
  expenseExpenseType: {
    borderColor: "red",
  },
  expenseIncomeType: {
    borderColor: "green",
  },
});

export default ExpenseList;
