import React from "react";
import { StyleSheet, View, ImageBackground, Text, Pressable} from "react-native";

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
    },
    recipeInfoContainer:{
        padding: 16,
        position: 'absolute',
        bottom: 10
    }
})





export default function RecipeContainer({recipeObj, horizontalContainer, fetchRecipeInfo}){

    if(horizontalContainer){
        return(
            <Pressable style={{padding: 5, marginVertical: 10, position: 'relative', width: 300 }} onPress={()=>{fetchRecipeInfo(recipeObj.id)}}>
                <ImageBackground source={{uri: `https://spoonacular.com/recipeImages/${recipeObj.id}-480x360.${recipeObj.imageType}`}} style={styles.img} imageStyle={{borderRadius: 10}}>
                    <View style={styles.recipeInfoContainer}>
                    <Text style={styles.recipeTitle}>{recipeObj.title}</Text>
                    <View style={{flexDirection: 'row', gap: 20}}>
                        {
                            recipeObj.servings ? <Text style={styles.recipeInfo}>{`${recipeObj.servings} Servings`}</Text> : ''
                        }
                        {
                            recipeObj.readyInMinutes ? <Text style={styles.recipeInfo}>{`${recipeObj.readyInMinutes} Min`}</Text> : ''
                        }
                        
                        
                    </View>
                    
                    </View>
                    
                </ImageBackground>
                    
                
            </Pressable>)
    }
    return(
        <Pressable style={{padding: 5, marginVertical: 10, position: 'relative'}} onPress={()=>{fetchRecipeInfo(recipeObj.id)}}>
            <ImageBackground source={{uri: `https://spoonacular.com/recipeImages/${recipeObj.id}-480x360.${recipeObj.imageType}`}} style={styles.img} imageStyle={{borderRadius: 10}}>
                <View style={styles.recipeInfoContainer}>
                <Text style={styles.recipeTitle}>{recipeObj.title}</Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                {
                recipeObj.servings ? <Text style={styles.recipeInfo}>{`${recipeObj.servings} Servings`}</Text> : ''
                }
                        {
                            recipeObj.readyInMinutes ? <Text style={styles.recipeInfo}>{`${recipeObj.readyInMinutes} Min`}</Text> : ''
                        }
                </View>
                
                </View>
                
            </ImageBackground>
                
            
        </Pressable>)
}
    


