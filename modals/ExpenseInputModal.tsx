import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ExpenseInputModalProps {
  visible: boolean;
  onClose: () => void;
  onAddExpense: (expense: { title: string; amount: string }) => void;
}

const ExpenseInputModal: React.FC<ExpenseInputModalProps> = ({
  visible,
  onClose,
  onAddExpense,
}) => {
  const [title, settitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = () => {
    onAddExpense({ title, amount });
    settitle("");
    setAmount("");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={settitle}
            placeholder="Enter expense title"
          />
          <TextInput
            style={[styles.input]}
            value={amount}
            onChangeText={(text) => {
              // Validate input to allow only numeric characters
              const numericValue = text.replace(/[^0-9]/g, "");
              setAmount(numericValue);
            }}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <Button
            title="Add Expense"
            onPress={handleAddExpense}
            disabled={title.trim() === "" || amount.trim() == ""}
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
  amountInput: {
    height: 100,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ExpenseInputModal;
