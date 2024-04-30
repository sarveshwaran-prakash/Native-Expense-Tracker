import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface EditExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  expense?: string;
  amount?: string;
  selectedType: string;
  onSave: (expense: string, amount: string, selectedType: string) => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  visible,
  onClose,
  expense: initialExpense,
  amount: initialAmount,
  selectedType: initialSelectedType,
  onSave,
}) => {
  const [editedExpense, setEditedExpense] = useState(initialExpense || "");
  const [editedAmount, setEditedAmount] = useState(initialAmount || "");
  const [editedSelectedType, setEditedSelectedType] = useState(
    initialSelectedType || ""
  );

  useEffect(() => {
    setEditedExpense(initialExpense || "");
    setEditedAmount(initialAmount || "");
  }, [initialExpense, initialAmount]);

  const handleSave = () => {
    onSave(editedExpense, editedAmount, editedSelectedType);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedSelectedType === "Income" && styles.selectedTypeButton,
              ]}
              onPress={() => setEditedSelectedType("Income")}
            >
              <Text style={styles.buttonText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editedSelectedType === "Expense" && styles.selectedTypeButton,
              ]}
              onPress={() => setEditedSelectedType("Expense")}
            >
              <Text style={styles.buttonText}>Expense</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={editedExpense}
            onChangeText={setEditedExpense}
            placeholder="Update expense"
          />
          <TextInput
            style={[styles.input]}
            value={editedAmount}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, "");
              const decimalValue = numericValue.replace(/(\..*)\./g, "$1");
              setEditedAmount(decimalValue);
            }}
            placeholder="Update amount"
            keyboardType="numeric"
          />
          <Button
            title="Save"
            onPress={handleSave}
            disabled={!editedExpense?.trim()}
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  selectedTypeButton: {
    backgroundColor: "#81b0ff",
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
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

export default EditExpenseModal;