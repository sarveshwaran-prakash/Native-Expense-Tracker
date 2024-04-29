import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExpenseProvider } from "./store/ExpenseContext";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ViewExpensesScreen from "./screens/ViewExpensesScreen";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // for FontAwesome icons

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Add Expense"
            component={AddExpenseScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="plus" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="View Expenses"
            component={ViewExpensesScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="list" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}
