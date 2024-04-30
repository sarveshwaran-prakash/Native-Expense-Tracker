import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface EditExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  expense?: string;
  amount?: string;
  onSave: (expense: string, amount: string) => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  visible,
  onClose,
  expense: initialExpense,
  amount: initialAmount,
  onSave,
}) => {
  const [editedExpense, setEditedExpense] = useState(initialExpense || "");
  const [editedAmount, setEditedAmount] = useState(initialAmount || "");

  useEffect(() => {
    setEditedExpense(initialExpense || "");
    setEditedAmount(initialAmount || "");
  }, [initialExpense, initialAmount]);

  const handleSave = () => {
    onSave(editedExpense, editedAmount);
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
          <TextInput
            style={styles.input}
            value={editedExpense}
            onChangeText={setEditedExpense}
            placeholder="Update expense"
          />
          <TextInput
            style={[styles.input, styles.amountInput]}
            value={editedAmount}
            onChangeText={setEditedAmount}
            placeholder="Update amount"
            multiline={true}
            numberOfLines={4}
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
