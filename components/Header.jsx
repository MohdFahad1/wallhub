import { View, Text } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Header = ({ heading, mb = 10 }) => {
  return (
    <View>
      <Text
        style={{ fontSize: hp(4), marginBottom: mb }}
        className="font-bold text-center "
      >
        {heading}
      </Text>
    </View>
  );
};

export default Header;
