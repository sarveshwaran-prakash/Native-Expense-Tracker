import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text, Animated } from "react-native";
import { useTaskContext } from "../store/TaskContext";
import Header from "../components/Header";
import TaskInputModal from "../modals/TaskInputModal";

export default function AddTaskScreen() {
  const { dispatch } = useTaskContext();
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(100))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000, // Adjust duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAddTask = async (task: {
    title: string;
    description: string;
  }) => {
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
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Header title="Add Task" />
      </Animated.View>
      <Animated.View
        style={[styles.content, { transform: [{ translateY: slideAnim }] }]}
      >
        <Text style={styles.title}>Add a New Task</Text>
        <Button title="Add Task" onPress={() => setModalVisible(true)} />
      </Animated.View>
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
  header: {
    alignItems: "center",
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
