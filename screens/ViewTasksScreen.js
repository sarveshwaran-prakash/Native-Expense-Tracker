import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTaskContext } from "../store/TaskContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import TaskModal from "../modals/TaskModal";
import TaskList from "../components/TaskList"; // Import TaskList component
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

export default function ViewTasksScreen() {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Hook to access navigation
  const [favorites, setFavorites] = useState([]);

  // const handleDeleteTask = (index) => {
  //   Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
  //     {
  //       text: "No",
  //       style: "cancel",
  //     },
  //     {
  //       text: "Yes",
  //       onPress: () => {
  //         dispatch({ type: "DELETE_TASK", payload: index });
  //         setModalVisible(false); // Close the modal after deleting task
  //       },
  //     },
  //   ]);
  // };
  const handleDeleteTask = async (index) => {
    console.log(index);
    try {
      // Check if the index is valid
      if (index < 0 || index >= tasks.length) {
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

  const handleAddToFavorites = (index) => {
    const task = tasks[index];
    const newTasks = [...tasks];
    const isFavorite = favorites.includes(task);

    if (isFavorite) {
      // Remove task from favorites
      const updatedFavorites = favorites.filter(
        (favoriteTask) => favoriteTask !== task
      );
      setFavorites(updatedFavorites);
    } else {
      // Add task to favorites
      setFavorites([task, ...favorites]);
    }

    // Move the task to the top
    newTasks.splice(index, 1);
    newTasks.unshift(task);
    dispatch({ type: "SET_TASKS", payload: newTasks });
  };

  return (
    <View style={styles.container}>
      <Header title="View Tasks" />
      <View style={styles.content}>
        <Text style={styles.title}>Tasks</Text>
        {console.log("hi", state.tasks)}
        {state.tasks.length === 0 ? (
          <Text>No tasks available</Text>
        ) : (
          <TaskList
            tasks={tasks}
            handleTaskOptionPress={handleTaskOptionPress}
            handleDeleteTask={handleDeleteTask} // Pass the handleDeleteTask function
            handleAddToFavorites={handleAddToFavorites}
            favorites={favorites}
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
