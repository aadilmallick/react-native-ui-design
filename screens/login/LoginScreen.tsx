import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { shadow_styles } from "../../styles/shadows";
import { useNavigation } from "@react-navigation/native";
import SC from "../../components/StyledComponents";
import colors from "tailwindcss/colors";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1 bg-purple-500"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      {/* go back button */}
      <TouchableOpacity
        className="self-start p-2 rounded-tr-2xl rounded-bl-2xl bg-yellow-400 ml-4"
        style={shadow_styles.shadow_subtle}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* image */}
      <View className="h-48 w-48 self-center">
        <Image
          source={require("../../assets/images/login.png")}
          className="w-full h-full"
        />
      </View>
      {/* form */}
      <View className="bg-white flex-1 rounded-t-[50px] p-4 px-8">
        <View className="space-y-4">
          <View className="space-y-1">
            <SC.Text.Label className="ml-2">email address</SC.Text.Label>
            <TextInput
              className="p-4 bg-gray-100 rounded-2xl"
              placeholder="email..."
            />
          </View>
          <View className="space-y-1">
            <SC.Text.Label className="ml-2">password</SC.Text.Label>
            <TextInput
              className="p-4 bg-gray-100 rounded-2xl"
              placeholder="password..."
              secureTextEntry
            />
          </View>
          <TouchableOpacity className="bg-yellow-400 px-6 py-3 rounded-2xl">
            <SC.Text.ButtonText>Login</SC.Text.ButtonText>
          </TouchableOpacity>
          <SC.Text.H4 className="text-center">or</SC.Text.H4>
          <View className="flex-row justify-around">
            <TouchableOpacity
              className="bg-white p-2 rounded-full"
              style={shadow_styles.shadow_md}
            >
              <Ionicons
                name="logo-google"
                size={40}
                color={colors.purple["400"]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white p-2 rounded-full"
              style={shadow_styles.shadow_md}
            >
              <Ionicons
                name="logo-apple"
                size={40}
                color={colors.yellow["400"]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white p-2 rounded-full"
              style={shadow_styles.shadow_md}
            >
              <Ionicons
                name="logo-facebook"
                size={40}
                color={colors.blue["400"]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
