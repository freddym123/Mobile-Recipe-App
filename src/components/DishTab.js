import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import darkMode from "../styles/darkMode";



const styles = StyleSheet.create({
    tabContainer: {
        marginRight: 10,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    tab: function(tabName, activeTab){
        if(tabName === activeTab){
            return {
                backgroundColor: 'rgb(71, 133, 71)',
            }
        }
        return {
            borderWidth: 1,
            borderColor: 'black'
        }
    },
    tabTextStyle: function(tabName, activeTab){
        return tabName === activeTab ? {
            color: 'white'
        } : {}
    }
})

export default function DishTab({text, activeTab, handlePress, theme}){
    return (<TouchableOpacity style={[styles.tabContainer, styles.tab(text, activeTab), theme==='light' ? {} : darkMode.borderColor] } onPress={()=>handlePress(text)}>
        <Text style={[styles.tabTextStyle(text, activeTab), theme==='light' ? {} : darkMode.bodyText]}>{text}</Text>
    </TouchableOpacity>)
}
