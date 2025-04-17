import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = ({ style }) => {
  const router = useRouter();

  return (
    <Pressable
      className="absolute"
      onPress={() => router.back()}
      style={[
        {
          position: "absolute",
          backgroundColor: "rgba(242, 242, 242, 0.8)",
          top: 40,
          left: 20,
          padding: 5,
          borderRadius: 10,
          zIndex: 10,
        },
        style,
      ]}
    >
      <Text>
        <Ionicons name="chevron-back" size={26} color="black" />
      </Text>
    </Pressable>
  );
};

export default BackButton;
