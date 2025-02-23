import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import LogModal from '@/components/LogModal';

export default function TabLayout() {
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#417F3D',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#E8F5E9',
            borderTopWidth: 0,
            height: 80,
            position: 'relative',
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="magnifyingglass" color={color} />,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: '',
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => setIsLogModalVisible(true)}
              >
                <IconSymbol size={24} name="plus" color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="people"
          options={{
            title: 'People',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.2.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: 'Rewards',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="star.fill" color={color} />,
          }}
        />
      </Tabs>

      <LogModal 
        isVisible={isLogModalVisible}
        onClose={() => setIsLogModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 56,
    height: 56,
    backgroundColor: '#417F3D',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#E8F5E9',
  },
});
