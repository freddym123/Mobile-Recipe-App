import React from "react";
import { View, Text, StatusBar, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'rgb(36, 36, 36)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    headerText:{
        color: 'white'
    },
    signInBtn: {
        backgroundColor: 'rgb(71, 133, 71)',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5
    },
    signInBtnText: {
        color: 'white'
    }
})

export default function Header({openLogInModal, logInStatus}){
    return(
    <View style={styles.header}>
        <Text style={styles.headerText}>Terrific Chef</Text>
        {logInStatus ? "" :<Pressable style={styles.signInBtn} onPress={openLogInModal}><Text style={styles.signInBtnText}>Sign In</Text></Pressable>}
    </View>)
}