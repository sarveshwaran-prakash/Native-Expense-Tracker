import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useExpenseContext } from "../store/ExpenseContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import ExpenseModal from "../modals/ExpenseModal";
import ExpenseList from "../components/ExpenseList";

interface Expense {
  id: string;
  title: string;
  amount?: string; // Ensure that amount is optional
  selectedType: string;
  selectedDate: string;
}

const ViewExpensesScreen: React.FC = () => {
  const { state, dispatch } = useExpenseContext();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      return () => {
        fadeAnim.setValue(0);
      };
    }, [])
  );

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/expenses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "DELETE_EXPENSE", payload: id });
        setModalVisible(false);
      } else {
        throw new Error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = async (
    editedExpense: string,
    editedAmount: string,
    editedSelectedType: string,
    editSelectedDate: string
  ) => {
    try {
      if (!selectedExpense) {
        throw new Error("Expense not found");
      }

      const updatedExpense: Expense = {
        ...selectedExpense,
        title: editedExpense,
        amount: editedAmount,
        selectedType: editedSelectedType,
        selectedDate: editSelectedDate,
      };

      const response = await fetch(
        `http://10.0.2.2:3000/expenses/${selectedExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (response.ok) {
        // Update expense state with the edited expense
        const updatedExpenses: Expense[] = state.expenses.map((expense) =>
          expense.id === selectedExpense.id ? updatedExpense : expense
        );
        dispatch({
          type: "SET_EXPENSES",
          payload: { expenses: updatedExpenses },
        });
        setModalVisible(false);
      } else {
        throw new Error("Failed to update expense");
      }
    } catch (error: any) {
      console.error("Error updating expense:", error.message);
    }
  };

  const handleExpenseOptionPress = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* <Header title="View Expenses" /> */}
      <View style={styles.content}>
        <Text style={styles.title}>Transactions</Text>
        {state.expenses.length === 0 ? (
          <Text>No expenses available</Text>
        ) : (
          <ExpenseList
            expenses={state.expenses}
            handleExpenseOptionPress={handleExpenseOptionPress}
            handleDeleteExpense={handleDeleteExpense}
          />
        )}
      </View>
      {selectedExpense && (
        <ExpenseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          initialExpense={selectedExpense ? selectedExpense.title : ""} // Add null check
          initialAmount={selectedExpense ? selectedExpense.amount || "" : ""} // Add null check
          initialSelectedType={
            selectedExpense ? selectedExpense.selectedType || "" : ""
          }
          initialSelectedDate={
            selectedExpense ? selectedExpense.selectedDate || "" : ""
          }
          onEdit={handleEditExpense}
          onDelete={() =>
            handleDeleteExpense(selectedExpense ? selectedExpense.id : "")
          }
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ViewExpensesScreen;
