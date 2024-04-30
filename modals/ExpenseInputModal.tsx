import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ExpenseInputModalProps {
  visible: boolean;
  onClose: () => void;
  onAddExpense: (expense: {
    title: string;
    amount: string;
    selectedType: string;
  }) => void;
}

const ExpenseInputModal: React.FC<ExpenseInputModalProps> = ({
  visible,
  onClose,
  onAddExpense,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedType, setSelectedType] = useState("Income");

  const handleAddExpense = () => {
    onAddExpense({ title, amount, selectedType });
    setTitle("");
    setAmount("");
  };

  // Placeholder text based on selected type
  const placeholderText =
    selectedType === "Expense"
      ? "Enter expense description"
      : "Enter income description";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === "Income" && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType("Income")}
            >
              <Text style={styles.buttonText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                selectedType === "Expense" && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType("Expense")}
            >
              <Text style={styles.buttonText}>Expense</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={placeholderText}
          />
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setAmount(numericValue);
            }}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <Button
            title="Add Expense"
            onPress={handleAddExpense}
            disabled={title.trim() === "" || amount.trim() === ""}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: width * 0.8,
    maxHeight: height * 0.6,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
  },
  selectedTypeButton: {
    backgroundColor: "#81b0ff",
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ExpenseInputModal;
