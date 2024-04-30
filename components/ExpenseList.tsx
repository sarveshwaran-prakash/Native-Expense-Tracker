import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

interface Expense {
  id: string;
  title: string;
  amount?: string;
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
        <View key={expense.id} style={styles.expense}>
          <View style={styles.expenseContent}>
            <Text numberOfLines={1} style={styles.title}>
              {expense.title}
            </Text>
            {expense.amount && (
              <Text numberOfLines={1} style={styles.amount}>
                {expense.amount}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => handleExpenseOptionPress(expense)}>
            <Text style={styles.optionText}>Options</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
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
  optionText: {
    marginRight: 10,
  },
});

export default ExpenseList;
