import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import WallpaperCard from "../../../../components/WallpaperCard";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Wallpapers = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <Text className="font-bold text-center" style={{ fontSize: hp(4) }}>
        {name}
      </Text>
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
