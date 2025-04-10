import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const IndexScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const router = useRouter();

  useEffect(() => {
    // Set initial padding
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    // Delay and animation for rings
    ring1Padding.value = withDelay(300, withSpring(hp(5)));
    ring2Padding.value = withDelay(300, withSpring(hp(5.5)));

    // Redirect after animation
    setTimeout(() => {
      router.replace("home");
    }, 2200);
  }, []);

  return (
    <View className="items-center justify-center flex-1 space-y-10 bg-[#101010]">
      <StatusBar style="light" />

      {/* Logo with rings */}
      <Animated.View
        className="rounded-full bg-white/20"
        style={{ padding: ring2Padding }}
      >
        <Animated.View
          className="rounded-full bg-white/20"
          style={{ padding: ring1Padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            className="rounded-full"
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* Title & Punchline */}
      <View className="flex items-center mt-5">
        <Text
          className="font-bold tracking-widest text-white"
          style={{ fontSize: hp(7) }}
        >
          Wallhub
        </Text>
        <Text
          className="font-medium tracking-widest text-white"
          style={{ fontSize: hp(2) }}
        >
          Your Screen, Your Story.
        </Text>
      </View>
    </View>
  );
};

export default IndexScreen;
