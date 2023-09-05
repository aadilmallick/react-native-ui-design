import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { fromCSS } from "@bacons/css-to-expo-linear-gradient";
import SC from "../../components/StyledComponents";
import { useNavigation } from "@react-navigation/native";
export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      {...fromCSS("linear-gradient(43deg, #411ecd 0%, #ae64efa5 100%)")}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-around items-center p-4">
        {/* title */}
        <SC.Text.H1 className="text-white">Let's get started!</SC.Text.H1>
        {/* image */}
        <View className="w-80 h-64">
          <Image
            source={require("../../assets/images/welcome.png")}
            className="w-full h-full"
          />
        </View>
        {/* button */}
        <View className="space-y-4 self-stretch">
          <TouchableOpacity
            className="py-3 px-6 bg-yellow-400 rounded-xl w-full"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text className="text-lg font-bold text-center capitalize">
              Sign up
            </Text>
          </TouchableOpacity>
          <Text
            className="font-semibold text-sm text-center text-white"
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account?{" "}
            <Text className="text-yellow-400">Log in</Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
