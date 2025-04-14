import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const WallpaperDetail = () => {
  const { id, image, name } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <Image source={{ uri: image }} className="flex-1 object-cover bg-black" />
    </View>
  );
};

export default WallpaperDetail;
