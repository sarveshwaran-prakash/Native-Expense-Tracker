import React, { useState, useEffect, useRef } from "react";
import { View, Button, StyleSheet, Text, Animated } from "react-native";
import { useExpenseContext } from "../store/ExpenseContext";
import Header from "../components/Header";
import ExpenseInputModal from "../modals/ExpenseInputModal";

export default function AddExpenseScreen() {
  const { dispatch } = useExpenseContext();
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddExpense = async (expense: {
    title: string;
    amount: string;
  }) => {
    try {
      const response = await fetch("http://10.0.2.2:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const data = await response.json();
      console.log("added expense", data);
      dispatch({ type: "ADD_EXPENSE", payload: data });
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        {/* <Header title="Add Expense" /> */}
      </Animated.View>
      <View style={styles.content}>
        <Text style={styles.title}>Add a New Expense</Text>
        <Button title="Add Expense" onPress={() => setModalVisible(true)} />
      </View>
      <ExpenseInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExpense={handleAddExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
