import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import axios from "axios";
import WallpaperCard from "../../components/WallpaperCard";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";
import Header from "../../components/Header";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm.trim()) {
        const fetchSearchedWallpaper = async () => {
          try {
            setLoading(true);
            const response = await axios.get(
              `https://wallhub-server.vercel.app/api/wallpapers?searchValue=${searchTerm}`
            );
            setWallpapers(response?.data.wallpapers);
          } catch (error) {
            setError("No results found");
          } finally {
            setLoading(false);
          }
        };
        fetchSearchedWallpaper();
      }
    }, 700);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <ScreenWrapper>
      <View className="px-3">
        <Header heading={"Search Wallpapers"} mb={0} />
        <View className="border-[1px] rounded-xl h-fit w-fit my-3 flex-row items-center justify-between px-3">
          <TextInput
            placeholder="Search wallpapers..."
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
            className="w-[89%] text-lg"
          />
          {searchTerm ? (
            <Pressable
              className="p-1 bg-gray-200 rounded-xl"
              onPress={() => setSearchTerm("")}
            >
              <Entypo name="cross" size={22} color="black" />
            </Pressable>
          ) : null}
        </View>
      </View>
      {!searchTerm || searchTerm.length === 0 ? (
        <View className="items-center justify-center flex-1">
          <Text>Search wallpapers to get results.</Text>
        </View>
      ) : loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <WallpaperCard wallpapers={wallpapers} />
      )}
    </ScreenWrapper>
  );
};

export default Search;
