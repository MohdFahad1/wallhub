import { View, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const WallpaperDetail = () => {
  const { id, image, name } = useLocalSearchParams();

  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Sharing not available",
          "Sharing functionality is not supported on your device."
        );
        return;
      }
      const localFileUri =
        FileSystem.cacheDirectory + `${name ? name : "wallpaper"}.jpg`;

      await FileSystem.downloadAsync(image, localFileUri);

      await Sharing.shareAsync(localFileUri);
    } catch (error) {
      console.error("Error sharing image:", error);
      Alert.alert("Error", "Failed to share the image.");
    }
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image source={{ uri: image }} className="flex-1 object-cover bg-black" />
      <BackButton />
      <View
        className="absolute flex-col gap-5"
        style={{
          bottom: 40,
          right: 20,
          alignSelf: "flex-start",
          padding: 5,
          borderRadius: 10,
          position: "absolute",
        }}
      >
        <TouchableOpacity>
          <FontAwesome name="heart-o" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Octicons name="download" size={28} color="#fff" className="ml-1" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare}>
          <FontAwesome6 name="share" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WallpaperDetail;
