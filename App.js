// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddTaskScreen from "./screens/AddTaskScreen";
import ViewTasksScreen from "./screens/ViewTasksScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Add Task" component={AddTaskScreen} />
        <Tab.Screen name="View Tasks" component={ViewTasksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
