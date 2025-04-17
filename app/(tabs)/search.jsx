import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import WallpaperCard from "../../components/WallpaperCard";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      setWallpapers([]);
      setError("");
      return;
    }

    const handle = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(
          `https://wallhub-server.vercel.app/api/wallpapers?searchValue=${encodeURIComponent(
            searchTerm.trim()
          )}`
        );

        if (data.wallpapers?.length) {
          setWallpapers(data.wallpapers);
        } else {
          setWallpapers([]);
          setError("No results found");
        }
      } catch (err) {
        const status = err?.response?.status;
        if (axios.isAxiosError(err) && status === 404) {
          setWallpapers([]);
          setError("No results found");
        } else {
          console.error(err);
          setWallpapers([]);
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(handle);
  }, [searchTerm]);

  return (
    <ScreenWrapper>
      <View className="flex-1 px-3">
        <Header heading="Search Wallpapers" mb={0} />

        <View className="flex-row items-center px-3 my-3 border border-gray-300 rounded-xl">
          <View className="flex-row items-center flex-1 space-x-2">
            <AntDesign name="search1" size={24} color="gray" />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search wallpapers..."
              className="flex-1 py-3 text-lg"
            />
          </View>

          {searchTerm.length > 0 && (
            <Pressable
              onPress={() => setSearchTerm("")}
              className="p-2 bg-gray-200 rounded-xl"
            >
              <Entypo name="cross" size={22} color="black" />
            </Pressable>
          )}
        </View>

        {/** No query yet */}
        {searchTerm.trim().length === 0 ? (
          <View className="items-center justify-center flex-1">
            <Text className="text-gray-500" style={{ fontSize: hp("2%") }}>
              Start typing to find stunning wallpapers!
            </Text>
          </View>
        ) : loading ? (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : error ? (
          <View className="items-center justify-center flex-1">
            <Text className="text-base text-red-500">{error}</Text>
          </View>
        ) : (
          <WallpaperCard wallpapers={wallpapers} loading={loading} />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Search;
