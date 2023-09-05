import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fromCSS } from "@bacons/css-to-expo-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import GameUI from "./screens/GameUI";
import WelcomeScreen from "./screens/login/WelcomeScreen";
import HomeScreen from "./screens/login/HomeScreen";
import LoginScreen from "./screens/login/LoginScreen";
import SignUpScreen from "./screens/login/SignUpScreen";

const Stack = createNativeStackNavigator();

const UIStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={UIStack} />
        <Stack.Screen name="Game" component={GameUI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
