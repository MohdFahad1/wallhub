import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { View, ActivityIndicator, Pressable, Image } from "react-native";

const WallpaperCard = ({ wallpapers }) => {
  return (
    <View
      className="items-center justify-center flex-1"
      style={{ paddingHorizontal: 5 }}
    >
      {wallpapers.length === 0 ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <MasonryList
          data={wallpapers}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <Wallpaper item={item} index={i} />}
        />
      )}
    </View>
  );
};

export default WallpaperCard;

const Wallpaper = ({ item, index }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.duration(600)
        .springify()
        .delay(index * 100)
        .damping(20)}
      className="flex"
      style={{ width: "100%", marginTop: 7 }}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 5,
          paddingRight: isEven ? 5 : 0,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 30,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
      </Pressable>
    </Animated.View>
  );
};
