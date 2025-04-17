import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WallpaperCard from "../../components/WallpaperCard";
import ScreenWrapper from "../../components/ScreenWrapper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "../../components/Header";

const Home = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchWallpapers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await axios.get(
        "https://wallhub-server.vercel.app/api/wallpapers",
        {
          params: {
            page,
          },
        }
      );

      const newWallpapers = response?.data?.wallpapers;

      if (!newWallpapers || newWallpapers.length === 0) {
        setHasMore(false);
      } else {
        setWallpapers((prev) => [...prev, ...newWallpapers]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  return (
    <ScreenWrapper>
      <Header heading={"Wallpapers"} mb={0} />
      <WallpaperCard
        wallpapers={wallpapers}
        loadMore={fetchWallpapers}
        loading={loading}
      />
    </ScreenWrapper>
  );
};

export default Home;
