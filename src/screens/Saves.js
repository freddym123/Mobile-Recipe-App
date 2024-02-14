import React from "react";
import { SafeAreaView, Text, StyleSheet, ImageBackground, StatusBar, View, FlatList, ScrollView } from "react-native";
import RecipeList from "../components/RecipeList";
import IconText from "../components/IconText";
import { AntDesign } from '@expo/vector-icons';
import SavedRecipeContainer from "../components/SavedRecipeContainer";
import RecipeSeperator from "../components/RecipeSeperator";
import darkMode from "../styles/darkMode";

const City = ({savedRecipes, logInStatus, theme, fetchRecipeInfo})=>{
    console.log(savedRecipes.length)
    const recipeSorted = {}
    for(let i = 0; i < savedRecipes.length; i++){
        let dishType = savedRecipes[i].dishTypes[0]
        dishType = dishType ? dishType : 'other'
        if(recipeSorted.hasOwnProperty(dishType)){
            recipeSorted[dishType].push(savedRecipes[i])
        }else{
            recipeSorted[dishType] = [savedRecipes[i]]
        }
    }
    const recipeDishTypes = []

    for(key in recipeSorted){
        recipeDishTypes.push(key)
    }

    console.log(recipeSorted[recipeDishTypes[0]])
    console.log(recipeDishTypes)

    const {container, cityName, cityText, countryName, populationText, populationWrapper, riseSetText, riseSetWrapper, rowLayout, imageLayout} = styles

    if(logInStatus){
        return (
            <View style={[{flex: 1, paddingHorizontal: 10, paddingVertical: 10}, theme == 'light' ? {} : darkMode.appBackground]}>
                <Text style={[{fontSize: 18, fontWeight: '600'}, theme=='light' ? {color: "black"} : darkMode.bodyText]}>Favorite Recipes</Text>

                <FlatList data={recipeDishTypes} renderItem={({item, index})=><RecipeSeperator sectionTitle={item} recipes={recipeSorted[item]} index={index} fetchRecipeInfo={fetchRecipeInfo} theme={theme}/>} keyExtractor={(item=>item)} />
        </View>
        
        )
    }

    return (
        <View style={[{flex: 1, alignItems: "center", justifyContent: 'center'}, theme=='light'? {} : darkMode.appBackground]}>
            <Text>Sign In</Text>
            <Text>In order to view saved recipes</Text>
        </View>
    
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageLayout:{
        flex: 1
    },
    cityName: {
        fontSize: 40,
    },
    countryName: {
        fontSize: 30,
    },
    cityText: {
        justifyContent: "center",
        alignSelf: "center",
        fontWeight: 'bold',
        color: 'white'
    },
    populationWrapper: {
        justifyContent: 'center',
        marginTop: 30
    },
    populationText: {
        fontSize: 25,
        marginLeft: 7.5,
        color: 'red',
    },
    riseSetWrapper:{
        justifyContent: 'space-around',
        marginTop: 30
    },
    riseSetText: {
        fontSize: 20,
        color: 'white',
    },
    rowLayout:{
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default City