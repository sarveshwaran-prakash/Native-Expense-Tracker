import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useTaskContext } from "../store/TaskContext";
import Header from "../components/Header";
import TaskInputModal from "../modals/TaskInputModal";

export default function AddTaskScreen() {
  const { dispatch } = useTaskContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = async (task) => {
    try {
      const response = await fetch("http://10.0.2.2:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();
      console.log("added task", data);
      dispatch({ type: "ADD_TASK", payload: data });
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add Task" />
      <View style={styles.content}>
        <Text style={styles.title}>Add a New Task</Text>
        <Button title="Add Task" onPress={() => setModalVisible(true)} />
      </View>
      <TaskInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
