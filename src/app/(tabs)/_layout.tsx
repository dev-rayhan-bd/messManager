import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Colors } from '../../constants/theme';
import { LayoutDashboard, Utensils, Receipt, Users } from 'lucide-react-native';

export default function TabLayout() {
<<<<<<< HEAD
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
=======
  const scheme = useColorScheme() ?? 'light';
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
  const theme = Colors[scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color as string} />,
=======
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => <Utensils size={size} color={color as string} />,
=======
          tabBarIcon: ({ color, size }) => <Utensils size={size} color={color} />,
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => <Receipt size={size} color={color as string} />,
=======
          tabBarIcon: ({ color, size }) => <Receipt size={size} color={color} />,
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: 'Ledger',
<<<<<<< HEAD
          tabBarIcon: ({ color, size }) => <Users size={size} color={color as string} />,
=======
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
        }}
      />
    </Tabs>
  );
}
