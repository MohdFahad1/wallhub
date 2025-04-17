import { StyleSheet, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WallpaperCard from "../../components/WallpaperCard";
import { useIsFocused } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Favourites = () => {
  const [favorites, setFavourites] = useState([]);
  const isFocused = useIsFocused();

  const fetchFavorites = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem("favourite-wallpapers");
      setFavourites(raw ? JSON.parse(raw) : []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchFavorites();
    }
  }, [isFocused, fetchFavorites]);

  return (
    <ScreenWrapper>
      <Text style={{ fontSize: hp(3) }} className="font-bold text-center ">
        Favourites
      </Text>
      {favorites.length === 0 ? (
        <Text
          style={{ fontSize: hp(2) }}
          className="items-center justify-center flex-1 text-gray-500"
        >
          No favourites saved yet.
        </Text>
      ) : (
        <WallpaperCard wallpapers={favorites} />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({});

export default Favourites;
