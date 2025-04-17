import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import WallpaperCard from "../../../../components/WallpaperCard";
import Header from "../../../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../../../components/BackButton";

const Wallpapers = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { category, name } = useLocalSearchParams();

  const fetchWallpapers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wallhub-server.vercel.app/api/wallpapers?category=${category}`
      );
      setWallpapers(response?.data?.wallpapers);
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, [category]);

  return (
    <ScreenWrapper>
      <View>
        <BackButton
          style={{
            top: 10,
            left: 20,
            backgroundColor: "#e3e3e3",
          }}
        />
        <Header heading={name} />
      </View>
      {loading ? (
        <View className="items-center justify-center flex-1 w-full h-full">
          <ActivityIndicator size={"large"} color={"#000"} />
        </View>
      ) : (
        <WallpaperCard wallpapers={wallpapers} loading={loading} />
      )}
    </ScreenWrapper>
  );
};

export default Wallpapers;
