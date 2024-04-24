import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useTaskContext } from "../store/TaskContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import TaskModal from "../modals/TaskModal";
import TaskList from "../components/TaskList";

export default function ViewTasksScreen() {
  const { state, dispatch } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: "DELETE_TASK", payload: id });
        setModalVisible(false);
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async (editedTask, editedDescription) => {
    try {
      if (!selectedTask) {
        throw new Error("Task not found");
      }

      const updatedTask = {
        ...selectedTask,
        title: editedTask,
        description: editedDescription,
      };

      const response = await fetch(
        `http://10.0.2.2:3000/tasks/${selectedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
        setModalVisible(false);
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      Alert.alert("Error", "Failed to update task. Please try again later.");
    }
  };

  const handleTaskOptionPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="View Tasks" />
      <View style={styles.content}>
        <Text style={styles.title}>Tasks</Text>
        {state.tasks.length === 0 ? (
          <Text>No tasks available</Text>
        ) : (
          <TaskList
            tasks={state.tasks}
            handleTaskOptionPress={handleTaskOptionPress}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </View>
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialTask={selectedTask?.title}
        initialDescription={selectedTask?.description}
        onEdit={handleEditTask}
        onDelete={() => handleDeleteTask(selectedTask?.id)}
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
