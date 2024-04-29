import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddTaskScreen from "./screens/AddTaskScreen";
import ViewTasksScreen from "./screens/ViewTasksScreen";
import { TaskProvider } from "./store/TaskContext";
import Icon from "react-native-vector-icons/FontAwesome"; // for FontAwesome icons

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Add Task"
            component={AddTaskScreen}
            options={{
              tabBarLabel: "ADD TASKS",
              tabBarIcon: ({ color }) => (
                <Icon name="plus" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="View Tasks"
            component={ViewTasksScreen}
            options={{
              tabBarLabel: "VIEW TASKS",
              tabBarIcon: ({ color }) => (
                <Icon name="list" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
