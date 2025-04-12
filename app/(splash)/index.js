import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import "../../global.css";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View className="relative flex-1">
      <StatusBar style="dark" />
      <Image
        source={require("../../assets/images/welcome.png")}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <Animated.View
        entering={FadeInDown.duration(600)}
        className="z-10 flex-1"
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          className="absolute bottom-0 w-full h-[65%]"
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />

        {/* Content */}
        <View className="items-center justify-end flex-1 gap-3">
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={{ fontSize: hp(7) }}
            className="font-bold text-gray-900"
          >
            Wallhub
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            className="mb-2 font-medium tracking-wide"
            style={{ fontSize: hp(2.2) }}
          >
            Your Hub for Stunning Screens
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              onPress={() => router.push("home")}
              style={{ width: wp(83) }}
              className="py-4 mb-12 bg-gray-900 rounded-2xl"
            >
              <Text
                className="font-medium tracking-wide text-center text-white"
                style={{ fontSize: hp(3.2) }}
              >
                Start Explore
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
