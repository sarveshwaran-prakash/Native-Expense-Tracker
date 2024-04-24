// TaskModal.js
import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditTaskModal from "./EditTaskModal";

export default function TaskModal({
  visible,
  onClose,
  onEdit,
  onDelete,
  task,
  description,
}) {
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleSaveEdit = (editedTask, editedDescription) => {
    onEdit(editedTask, editedDescription);
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
                Edit Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.modalOption}>
                <FontAwesome name="trash" size={20} /> Delete Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <EditTaskModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        task={task}
        description={description}
        onSave={handleSaveEdit}
      />
    </Modal>
  );
}

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
