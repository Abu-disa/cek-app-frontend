import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Library Ikon
import CekResi from "../components/CekResi";
import TentangAplikasi from "../components/TentangAplikasi";
import CekOngkir from "../components/CekOngkir";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#f8f8f8" },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Cek Resi") {
            iconName = "document-text-outline";
          } else if (route.name === "Cek Ongkir") {
            iconName = "cube-outline";
          } else if (route.name === "Tentang Aplikasi") {
            iconName = "information-circle-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Cek Resi" component={CekResi} />
      <Tab.Screen name="Cek Ongkir" component={CekOngkir} />
      <Tab.Screen name="Tentang Aplikasi" component={TentangAplikasi} />
    </Tab.Navigator>
  );
}
