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

  const handleDownloadImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Media library access is required to save the image."
        );

        return;
      }

      const fileUri =
        FileSystem.documentDirectory + `${name ? name : "wallpaper"}.jpg`;
      const { uri } = await FileSystem.downloadAsync(image, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);

      await MediaLibrary.createAlbumAsync("Wallhub", asset, false);

      Alert.alert("Success", "Image saved to gallery successfully");
    } catch (error) {
      // console.error("Download error:", error);
      Alert.alert("Error", "Failed to save the image.");
      return;
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

        <TouchableOpacity onPress={handleDownloadImage}>
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
