import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WallpaperCard from "../../components/WallpaperCard";
import ScreenWrapper from "../../components/ScreenWrapper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Home = () => {
  const [wallpapers, setWallpapers] = useState([]);

  const fetchWallpapers = async () => {
    try {
      const response = await axios.get(
        "https://wallhub-server.vercel.app/api/wallpapers"
      );
      setWallpapers(response?.data?.wallpapers);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  return (
    <ScreenWrapper>
      <Text className="font-bold text-center" style={{ fontSize: hp(4) }}>
        Wallpapers
      </Text>
      <WallpaperCard wallpapers={wallpapers} />
    </ScreenWrapper>
  );
};

export default Home;
