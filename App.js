import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddTaskScreen from "./screens/AddTaskScreen";
import ViewTasksScreen from "./screens/ViewTasksScreen";
import { TaskProvider } from "./store/TaskContext";
import { Text } from "react-native";
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
              tabBarLabel: <Text>ADD TASKS</Text>,
              tabBarIcon: ({ color }) => (
                <Icon name="plus" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="View Tasks"
            component={ViewTasksScreen}
            options={{
              tabBarLabel: <Text>VIEW TASKS</Text>,
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
