import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function AddTaskScreen({ navigation }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    setTask("");
    navigation.navigate("View Tasks", { tasks: updatedTasks }); // Pass updatedTasks to ViewTasksScreen
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Enter task"
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
