import { View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import AsyncStorage from "@react-native-async-storage/async-storage";

const WallpaperDetail = () => {
  const { id, image, name } = useLocalSearchParams();
  const [isFavourite, setIsFavourite] = useState(false);

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

  const handleSave = async () => {
    try {
      const raw = await AsyncStorage.getItem("favourite-wallpapers");
      const favs = raw ? JSON.parse(raw) : [];

      if (id && favs.find((w) => w.id === id)) {
        return Alert.alert(
          "Already Saved",
          "This wallpaper is in your favourites."
        );
      }

      const newFav = { id, image, name };
      favs.push(newFav);
      await AsyncStorage.setItem("favourite-wallpapers", JSON.stringify(favs));

      setIsFavourite(true);
      Alert.alert("Saved", "Wallpaper saved to favourites successfully.");
    } catch (error) {
      console.error("Error saving wallpaper:", error);
      Alert.alert("Error", "Could not save wallpaper.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("favourite-wallpapers");
        const favs = raw ? JSON.parse(raw) : [];
        if (id && favs.find((w) => w.id === id)) {
          setIsFavourite(true);
        }
      } catch (err) {
        console.error("Error reading favourites:", err);
      }
    })();
  }, [id]);

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
        <TouchableOpacity onPress={handleSave}>
          <FontAwesome
            name={isFavourite ? "heart" : "heart-o"}
            size={25}
            color={isFavourite ? "#e0245e" : "#fff"}
          />
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
