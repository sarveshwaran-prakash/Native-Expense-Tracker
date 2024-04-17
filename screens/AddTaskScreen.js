import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTaskContext } from "../store/TaskContext";

export default function AddTaskScreen() {
  const { dispatch } = useTaskContext();
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    dispatch({ type: "ADD_TASK", payload: task });
    setTask("");
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
