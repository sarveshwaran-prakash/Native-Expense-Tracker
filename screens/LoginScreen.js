import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch(`http://10.0.2.2:3000/users?email=${email}&password=${password}`)
      .then((response) => response.json())
      .then((users) => {
        if (users.length > 0) {
          // Valid credentials, navigate to the AddTaskScreen
          navigation.navigate("AddTask");
        } else {
          // Invalid credentials, handle accordingly (e.g., display error message)
          alert("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Create Account"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
