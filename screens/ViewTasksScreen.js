import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useTaskContext } from "../store/TaskContext";

export default function ViewTasksScreen() {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const handleDeleteTask = (index) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch({ type: "DELETE_TASK", payload: index });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      {tasks.length === 0 ? (
        <Text>No tasks available</Text>
      ) : (
        tasks.map((task, index) => (
          <View key={index} style={styles.task}>
            <Text>{task}</Text>
            <Button title="Delete" onPress={() => handleDeleteTask(index)} />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
