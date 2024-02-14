import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons"



const styles = StyleSheet.create({
    
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 5,
        backgroundColor: "pink"
    }
})

const ListItem = (props)=>{
    const {dt_txt, min, max, condition} = props
    return(
        <View style={styles.item}>
            <Feather name={'sun'} size={50} color={"white"}></Feather>
            <Text>{dt_txt}</Text>
            <Text>{min}</Text>
            <Text>{max}</Text>
        </View>
    )
}



export default ListItem