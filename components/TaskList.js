// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

// const TaskList = ({
//   tasks,
//   handleTaskOptionPress,
//   handleDeleteTask,
//   handleAddToFavorites,
//   favorites,
// }) => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {tasks.map((task, index) => (
//         <View key={index} style={styles.task}>
//           <View style={styles.taskContent}>
//             <Text numberOfLines={1} style={styles.taskTitle}>
//               {task.title}
//             </Text>
//             {task.description && (
//               <Text numberOfLines={2} style={styles.taskDescription}>
//                 {task.description}
//               </Text>
//             )}
//           </View>
//           <TouchableOpacity onPress={() => handleTaskOptionPress(index)}>
//             <Text style={styles.optionText}>Options</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleAddToFavorites(index)}>
//             {favorites.includes(task.title) ? (
//               <FontAwesome name="heart" size={24} color="red" />
//             ) : (
//               <FontAwesome name="heart" size={24} color="white" />
//             )}
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     width: "100%",
//     paddingBottom: 20,
//   },
//   task: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     width: width * 0.9,
//     alignSelf: "center",
//   },
//   taskContent: {
//     flex: 1,
//     marginRight: 10,
//   },
//   taskTitle: {
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   taskDescription: {
//     color: "#666",
//   },
//   optionText: {
//     marginRight: 10,
//   },
// });

// export default TaskList;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { useTaskContext } from "../store/TaskContext";
import { useTaskContext } from "../store/TaskContext";

const { width } = Dimensions.get("window");
// const { dispatch } = useTaskContext();
const TaskList = ({
  tasks,
  handleTaskOptionPress,
  handleAddToFavorites,
  favorites,
}) => {
  console.log("tasklist", tasks);
  // const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://dummyjson.com/todos");
  //       const data = await response.json();
  //       setTasks(data.todos);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://10.0.2.2:3000/tasks");
  //       const data = await response.json();
  //       console.log("initially fetched tasks", data);
  //       // dispatch({ type: "SET_TASKS", payload: { tasks: data } });
  //       setTasks(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.task}>
          <View style={styles.taskContent}>
            <Text numberOfLines={1} style={styles.taskTitle}>
              {/* {task.todo} */}
              {task.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleTaskOptionPress(task.id)}>
            <Text style={styles.optionText}>Options</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddToFavorites(task.id)}>
            {favorites.includes(task.id) ? (
              <FontAwesome name="heart" size={24} color="red" />
            ) : (
              <FontAwesome name="heart" size={24} color="white" />
            )}
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
  optionText: {
    marginRight: 10,
  },
});

export default TaskList;
