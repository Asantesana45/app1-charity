import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen
            name="General"
            options={{
                tabBarIcon: ({size, color})=>(
                    <Ionicons name='ios-information-circle' size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name="notifications"
            options={{
                tabBarIcon: ({size, color})=>(
                    <Ionicons name='notifications' size={size} color={color} />
                )
            }}
        />

    </Tabs>
  )
}