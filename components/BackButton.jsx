import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = () => {
  const router = useRouter();

  return (
    <Pressable
      className="absolute"
      onPress={() => router.back()}
      style={{
        backgroundColor: "rgba(0,0,0,0.07)",
        top: 40,
        left: 20,
        alignSelf: "flex-start",
        padding: 5,
        borderRadius: 20,
      }}
    >
      <Text>
        <Ionicons name="chevron-back" size={26} color="black" />
      </Text>
    </Pressable>
  );
};

export default BackButton;
