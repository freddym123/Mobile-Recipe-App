import React from "react";

import { View, Text, Pressable, StyleSheet, Image, ImageBackground} from "react-native";

import { AntDesign } from '@expo/vector-icons';
import darkMode from "../styles/darkMode";

const styles = StyleSheet.create({
    recipeTitle:{
        fontSize: 30,
        color: 'white',
        fontWeight: '600'
    },
    recipeInfo:{
        fontSize: 15,
        color: 'white',
        backgroundColor: 'rgba(150,150,150,.5)',
        borderRadius: 10,
        paddingHorizontal: 4
    },
    img: {
        width: "100%",
        height: 350,
        borderRadius: 10,
        position: 'relative',
        height: 250
    },
    recipeInfoContainer:{
        padding: 16,
        position: 'absolute',
        bottom: 10
    }
})

export default function SavedRecipeContainer({recipeInfo, fetchRecipeInfo, theme}){
    console.log(fetchRecipeInfo)
    return (
        <Pressable style={{padding: 5, marginVertical: 10, position: 'relative', width: 200}} onPress={()=>{fetchRecipeInfo(recipeInfo.id)}}>
            <View>
            <ImageBackground source={{uri: `https://spoonacular.com/recipeImages/${recipeInfo.id}-480x360.${recipeInfo.imageType}`}} style={styles.img} imageStyle={{borderRadius: 20}}>
            <View style={{position: 'absolute', bottom: 0, right: 0, margin: 10, backgroundColor: 'pink', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}><AntDesign name="heart" size={20} color="white" /></View>
            </ImageBackground>
            </View>
            <Text style={[{fontSize: 18, fontWeight: '500'}, theme=="light" ? {} : darkMode.bodyText]} lineBreakMode="clip" numberOfLines={1}>{recipeInfo.title}</Text>
            <View style={{flexDirection: 'row', gap: 10}}><Text style={theme=="light" ? { } : darkMode.bodyText}>{`${recipeInfo.readyInMinutes} mins`}</Text><Text style={theme=="light" ? {} : darkMode.bodyText}>{`${recipeInfo.servings} servings`}</Text></View>

            
                
            
        </Pressable>
    )
}