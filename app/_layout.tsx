import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawerContent from '../components/customDrawerContent';


export default function _layout() {
    return <Drawer
        screenOptions={{
            drawerLabelStyle: {
                marginLeft: -20
            },
            // drawerActiveBackgroundColor: 'gray',
            // drawerActiveTintColor: 'white',
            // drawerInactiveTintColor: 'white'
        }}
        drawerContent={CustomDrawerContent}
    >

        <Drawer.Screen
            name="home"
            options={{
                drawerLabel: 'Home',
                title: 'Home',
                drawerIcon: ({size, color})=>(
                    <Ionicons name='md-home' size={size} color={color} />
                )

            }}
        />
        <Drawer.Screen
            name="index"
            options={{
                drawerLabel: 'About',
                title: 'About',
                drawerIcon: ({size, color})=>(
                    <Ionicons name='ios-information-circle' size={size} color={color} />
                )

            }}
        />
         <Drawer.Screen
    name="Profile"
    options={{
        drawerLabel: 'Profile',
        title: 'Profile',
        drawerIcon: ({size, color}) => (
            <Ionicons name='ios-person' size={size} color={color} />
        )
    }}
/>


        <Drawer.Screen
    name="Fundraise"
    options={{
        drawerLabel: 'Fundraise',
        title: 'Fundraise',
        drawerIcon: ({size, color}) => (
            <Ionicons name='ios-cash' size={size} color={color} />
        )
    }}
/>

<Drawer.Screen
    name="Donation"
    options={{
        drawerLabel: 'Donation',
        title: 'Donation',
        drawerIcon: ({size, color}) => (
            <Ionicons name='ios-heart' size={size} color={color} />
        )
    }}
/>



    </Drawer>
}