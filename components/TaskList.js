import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");
const TaskList = ({ tasks, handleTaskOptionPress }) => {
  useEffect(() => {
    // Log tasks whenever tasks change for debugging
    console.log("Updated tasks:", tasks);
  }, [tasks]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.task}>
          <View style={styles.taskContent}>
            <Text numberOfLines={1} style={styles.taskTitle}>
              {task.title}
            </Text>
            {task.description && (
              <Text numberOfLines={1} style={styles.taskDescription}>
                {task.description}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => handleTaskOptionPress(task)}>
            <Text style={styles.optionText}>Options</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 20,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: width * 0.9,
    alignSelf: "center",
  },
  taskContent: {
    flex: 1,
    marginRight: 10,
  },
  taskTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "gray",
  },
  optionText: {
    marginRight: 10,
  },
});

export default TaskList;
