import React from "react";
import { useRef } from "react";

import { Animated, View } from "react-native";

import RecipeContainer from "./RecipeContainer";

export default function RecipeList({recipes, horizontally, onClickHandle}){

    const scrollX = useRef(new Animated.Value(0)).current
    
    if(horizontally){
        return (<Animated.FlatList horizontal={true} snapToInterval={300}
            initialScrollIndex={0}
            
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true}
          )} 
          scrollEventThrottle={16}
          decelerationRate={0} bounces={false} data={recipes} 
          renderItem={({item, index})=>{
            const inputRange = [
              (index - 2) * 290,
              (index - 1) * 290,
              index * 290,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0,-20,0]
            })
            if (!item.title){
              return <View style={{width: 20}}></View>
            }
            return <Animated.View style={{transform: [{translateY}], flex: 1, paddingTop: 20}}><RecipeContainer recipeObj={item} horizontalContainer={horizontally} fetchRecipeInfo={onClickHandle}></RecipeContainer></Animated.View>}} keyExtractor={item=>item.id}/>)
    }

    return (
        <Animated.FlatList
          initialScrollIndex={0}
          snapToInterval={380}
          scrollEventThrottle={16}
          decelerationRate={0} bounces={false} data={recipes} renderItem={({item, index})=>{
            if (!item.title){
              return <View></View>
            }
            return <View><RecipeContainer recipeObj={item} fetchRecipeInfo={onClickHandle}></RecipeContainer></View>}} keyExtractor={item=>item.id}/>
    )
    
}