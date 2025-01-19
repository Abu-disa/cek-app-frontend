import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://svs6bqbz-5000.asse.devtunnels.ms/auth/login",
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      await AsyncStorage.setItem("token", token);

      Alert.alert("Login Successful", "Welcome back!");
      navigation.navigate("Main");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.error || "Server error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput} // Gunakan gaya khusus untuk input password
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.toggleButton}
          >
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20} // Ukuran ikon
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <Button title="Login" onPress={handleLogin} />
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have an account? Register here.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "80%", // Sesuaikan dengan kebutuhan
  },
  box: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row", // Agar input dan ikon berada dalam satu baris
    alignItems: "center", // Menyelaraskan ikon secara vertikal
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10, // Ruang di dalam kontainer
    marginBottom: 15,
    backgroundColor: "#fff", // Latar belakang
  },
  passwordInput: {
    flex: 1, // Mengisi sisa ruang di dalam container
    padding: 10,
  },
  toggleButton: {
    padding: 10, // Memberikan ruang klik di sekitar ikon
  },
  link: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
  },
});
