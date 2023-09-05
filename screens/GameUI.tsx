import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { fromCSS } from "@bacons/css-to-expo-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { shadow_styles } from "../styles/shadows";
import StarRating from "react-native-star-rating";

interface FeaturedGame {
  title: string;
  image: string;
  downloads: string;
  stars: number;
}

const featured = [
  {
    title: "Zooba",
    image: require("../assets/images/zooba.png"),
    downloads: "200k",
    stars: 4,
  },
  {
    title: "Alto's Adventure",
    image: require("../assets/images/altosAdventure.png"),
    downloads: "20k",
    stars: 4,
  },
  {
    title: "Clash of Clans",
    image: require("../assets/images/clashofclans.png"),
    downloads: "20k",
    stars: 4.2,
  },
];

const categories = [
  "action",
  "adventure",
  "arcade",
  "casual",
  "puzzle",
  "racing",
  "role-playing",
  "simulation",
  "sports",
  "strategy",
];

const CategoryPill = ({ category }: { category: string }) => {
  const isActive = category === "action";
  if (isActive) {
    return (
      <TouchableOpacity className="mr-2">
        <LinearGradient
          {...fromCSS(
            `linear-gradient(-90deg, rgba(58,131, 244, 0.9), rgba(9,181,211, 0.9));`
          )}
          className="rounded-full px-4 py-2"
        >
          <Text className="text-white capitalize">{category}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      className="bg-blue-200 rounded-full px-4 py-2 mr-2"
      style={{ elevation: 2 }}
    >
      <Text className="text-black capitalize">{category}</Text>
    </TouchableOpacity>
  );
};

// image overlay example
const FeaturedGame = ({ game }: { game: FeaturedGame }) => (
  <View
    className="w-80 h-60 mr-4 relative bg-white rounded-2xl"
    style={shadow_styles.shadow_lg}
  >
    <Image
      source={game.image as ImageSourcePropType}
      className="w-full h-full rounded-2xl"
    />
    <LinearGradient
      {...fromCSS(`linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.4));`)}
      className="absolute w-full h-full rounded-2xl justify-between"
    >
      <View className="flex-row justify-end">
        <TouchableOpacity className="mr-2 mt-2 p-2 bg-white/50 rounded-full">
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="items-start p-4">
        <StarRating
          disabled={false}
          maxStars={5}
          rating={game.stars}
          starSize={16}
          fullStarColor="#FFD700"
          emptyStarColor="white"
        />
        <Text className="text-white text-lg font-bold">{game.title}</Text>
        <Ionicons name="download-outline" color="white" size={24} />
      </View>
    </LinearGradient>
  </View>
);

const ActionGame = ({ game }: { game: FeaturedGame }) => {
  return (
    <View className="p-2 flex flex-row items-center">
      <View className="flex-row flex-1 items-end">
        {/* img */}
        <Image source={game.image} className="w-20 h-20 rounded-2xl" />
        {/* ratings */}
        <View className="ml-2">
          <Text className=" text-lg font-bold">{game.title}</Text>
          <View className="flex flex-row items-center space-x-1">
            <StarRating
              disabled={false}
              maxStars={1}
              rating={1}
              starSize={16}
              fullStarColor="#FFD700"
              emptyStarColor="white"
            />
            <Text>{game.stars} stars</Text>
            <Ionicons name="download-outline" color="blue" size={24} />
            <Text>{game.downloads}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="mr-2">
        <LinearGradient
          {...fromCSS(
            `linear-gradient(-90deg, rgba(58,131, 244, 0.9), rgba(9,181,211, 0.9));`
          )}
          className="rounded-full px-6 py-2"
          style={shadow_styles.shadow_subtle}
        >
          <Text className="text-white font-semibold">play</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default function GameUI() {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        {...fromCSS(
          `linear-gradient(180deg, rgba(58,131, 244, 0.4), rgba(9,181,211, 0.4));`
        )}
        className="flex-1 p-4"
        style={{ paddingTop: Constants.statusBarHeight }}
      >
        {/* top icon bar */}
        <View className="flex flex-row justify-between">
          <Ionicons name="options" size={30} color="black" />
          <Ionicons name="notifications" size={30} color="black" />
        </View>
        {/* categories */}
        <View className="mt-4 space-y-2">
          <Text className="capitalize text-3xl font-bold">
            Browse Categories
          </Text>
          {/* categories scroll view */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryPill category={category} key={category} />
            ))}
          </ScrollView>
        </View>
        {/* featured games */}
        <View className="mt-4 space-y-2">
          <Text className="capitalize text-xl font-bold">featured games</Text>
          {/* featured games scroll view */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 24,
            }}
            className="-ml-6"
          >
            {featured.map((game) => (
              <FeaturedGame game={game} key={game.title} />
            ))}
          </ScrollView>
        </View>
        {/* top action games */}
        <View className="-mt-4 space-y-2 flex-1">
          <Text className="capitalize text-xl font-bold">top action games</Text>
          <ScrollView className="flex-1">
            {featured.map((game) => (
              <ActionGame game={game} key={game.title} />
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
