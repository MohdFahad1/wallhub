import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Header from "../../../components/Header";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://wallhub-server.vercel.app/api/categories"
      );
      const json = await response.json();
      if (json.success) {
        setCategories(json.categories);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError("An error occurred: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderItem = ({ item, index }) => (
    <AnimatedTouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/categories/wallpapers",
          params: {
            category: item._id,
            name: item.name,
          },
        })
      }
      entering={FadeInDown.delay(index * 100).springify()}
    >
      <View
        className="items-center justify-center mb-5 overflow-hidden rounded-[35px]"
        style={{
          width: wp(90),
          height: hp(18),
        }}
      >
        <Image
          source={{ uri: item.image }}
          className="object-cover w-full h-full"
        />
        <Text className="absolute text-3xl font-bold text-center text-white">
          {item.name}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <Header heading={"Categories"} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 55,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Categories;
