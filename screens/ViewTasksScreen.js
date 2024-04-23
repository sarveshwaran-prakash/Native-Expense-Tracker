import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTaskContext } from "../store/TaskContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import TaskModal from "../modals/TaskModal";
import TaskList from "../components/TaskList"; // Import TaskList component

export default function ViewTasksScreen() {
  const { state, dispatch } = useTaskContext();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Hook to access navigation

  const handleDeleteTask = async (index) => {
    try {
      // Check if the index is valid
      if (index < 0 || index >= state.tasks.length) {
        throw new Error("Invalid task index");
      }

      // Get the ID of the task to be deleted

      // Send DELETE request to delete the task using its ID
      const response = await fetch(`http://10.0.2.2:3000/tasks/${index}`, {
        method: "DELETE",
      });

      // Check if the request was successful
      if (response.ok) {
        // Remove the deleted task from the state
        dispatch({ type: "DELETE_TASK", payload: index });
        setModalVisible(false); // Close the modal after deleting task
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (index) => {
    // Your edit task function
  };

  const handleTaskOptionPress = (index) => {
    setSelectedTaskIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="View Tasks" />
      {console.log("tasksscreen", state.tasks)}
      <View style={styles.content}>
        <Text style={styles.title}>Tasks</Text>
        {state.tasks.length === 0 ? (
          <Text>No tasks available</Text>
        ) : (
          <TaskList
            tasks={state.tasks}
            handleTaskOptionPress={handleTaskOptionPress}
            handleDeleteTask={handleDeleteTask} // Pass the handleDeleteTask function
          />
        )}
      </View>
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={() => handleEditTask(selectedTaskIndex)}
        onDelete={() => handleDeleteTask(selectedTaskIndex)}
      />
    </View>
  );
}

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
