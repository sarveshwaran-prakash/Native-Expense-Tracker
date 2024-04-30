import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditExpenseModal from "./EditExpenseModal";

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: (
    editedExpense: string,
    editedAmount: string,
    editedSelectedType: string
  ) => void;
  onDelete: () => void;
  initialExpense?: string; // Make initialExpense optional
  initialAmount: string;
  initialSelectedType: string;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  initialExpense,
  initialAmount,
  initialSelectedType,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleSaveEdit = (
    editedExpense: string,
    editedAmount: string,
    editedSelectedType: string
  ) => {
    onEdit(editedExpense, editedAmount, editedSelectedType);
    setEditModalVisible(false); // Close the edit modal after saving edits
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.modalOption}>
                <FontAwesome name="edit" size={20} />
                Edit Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.modalOption}>
                <FontAwesome name="trash" size={20} /> Delete Expense
              </Text>
            </TouchableOpacity>
            {/* Display initial expense details */}
            <Text>Expense: {initialExpense}</Text>
            <Text>amount: {initialAmount}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* Conditionally render EditExpenseModal */}
      {editModalVisible && (
        <EditExpenseModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          expense={initialExpense || ""}
          amount={initialAmount}
          selectedType={initialSelectedType}
          onSave={handleSaveEdit}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  modalOption: {
    marginBottom: 20,
  },
});

export default ExpenseModal;
