import React, { useReducer } from "react";
import { useEffect } from "react";
import { View, FlatList, Text, Pressable, Animated} from "react-native";
import SavedRecipeContainer from "./SavedRecipeContainer";
import { AntDesign } from '@expo/vector-icons';
import { LayoutAnimation } from "react-native";
import darkMode from "../styles/darkMode";

export default function RecipeSeperator({sectionTitle, recipes, index, theme, fetchRecipeInfo}){
    const animationController = React.useRef(new Animated.Value(0)).current
    const [showRecipeList, setShowRecipeList] = React.useState(false)

    const toggleListItem = ()=>{
        LayoutAnimation.configureNext(toggleAnimation)
        setShowRecipeList(!showRecipeList)
    }

    const toggleAnimation = {
        duration: 300,
        update: {
            duration: 300,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        delete: {
            duration: 200,
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        }
    }

    useEffect(()=>{
        if(index === 0){
            setShowRecipeList(true)
        }
    }, [])

    const capatalized = sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1) 
    console.log(theme)
    return (
        <View>
            
                <View>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingVertical: 10, alignItems: 'center', borderColor: theme=="light" ? "black" : "white"}}>
                        <View style={{flexDirection: 'row', gap: 5}}>
                            <Text style={[{fontSize: 18, fontWeight: '600'}, theme=="light" ? {color: "black"} : darkMode.bodyText]}>{capatalized}</Text> 
                            <Text style={[{color: 'gray'}, theme=='light' ? {} : darkMode.bodyText]}>{recipes.length}</Text>
                        </View>
                        <Pressable onPress={toggleListItem}><AntDesign name="down" size={15} color={theme=='light'?"black":"white"} /></Pressable>
                    </View>
                    {   showRecipeList ?
                        <Animated.View style={{overflow: 'hidden'}}><FlatList style={{overflow: 'hidden'}} data={recipes} renderItem={({item})=><SavedRecipeContainer recipeInfo={item} theme={theme} fetchRecipeInfo={fetchRecipeInfo}/>} horizontal /></Animated.View>
                    : ""}
                </View>
        </View>
    )
}