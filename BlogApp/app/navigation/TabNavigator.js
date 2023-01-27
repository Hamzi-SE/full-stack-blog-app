import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import Search from "../components/Search";
import AppNavigator from "./AppNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused, color, size }) => <Octicons name="home" size={size} color={color} />,
				}}
				name="HomeScreen"
				component={AppNavigator}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused, color, size }) => <Octicons name="search" size={size} color={color} />,
				}}
				name="SearchScreen"
				component={Search}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
