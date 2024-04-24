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

export default function EditTaskModal({
  visible,
  onClose,
  task: initialTask,
  description: initialDescription,
  onSave,
}) {
  const [editedTask, setEditedTask] = useState(initialTask || "");
  const [editedDescription, setEditedDescription] = useState(
    initialDescription || ""
  );

  useEffect(() => {
    // Update the state when task or description props change
    setEditedTask(initialTask || "");
    setEditedDescription(initialDescription || "");
  }, [initialTask, initialDescription]);

  const handleSave = () => {
    onSave(editedTask, editedDescription);
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
            value={editedTask}
            onChangeText={setEditedTask}
            placeholder="Update task"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Update descritption"
            multiline={true}
            numberOfLines={4}
          />
          <Button
            title="Save"
            onPress={handleSave}
            disabled={!editedTask?.trim()}
          />
        </View>
      </View>
    </Modal>
  );
}

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
  descriptionInput: {
    height: 100,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
