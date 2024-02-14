import React, { useCallback } from 'react';
import { useRef, useEffect} from 'react';
import {StatusBar } from 'react-native';
import { useState } from 'react';
import {Feather} from "@expo/vector-icons"
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, TextInput, FlatList, Pressable, ActivityIndicator} from 'react-native';
import RowText from '../components/RowText';
import RecipeContainer from '../components/RecipeContainer';
import { Animated } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import key from '../key';
import DishTab from '../components/DishTab';
import RecipeList from '../components/RecipeList';
import darkMode from '../styles/darkMode';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  temp: {
    fontSize: 48,
    color: 'black'
  },
  highLow:{
    color: 'black',
    fontSize: 20
  },
  highLowWrapper: {
    flexDirection: 'row',
    gap: 5
  },
  bodyWrapper: {
    justifyContent: "flex-end",
    alignItems: 'flex-start'

  },
  message: {
    fontSize: 30
  },
  description: {
    fontSize: 48
  },
  header:{
    fontSize: 25,
    fontWeight: '700'
  },
  recipeSearch: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 40,
  
    flexDirection: 'row',
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 8
  },
  categoriesTabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8
  },
  categoriesTab:{
    padding: 5,

    borderRadius: 20,
    borderWidth: 1
  }

})




export default function Home({recipes, fetchRecipeInfo, changeRecipes, theme}) {
  const tabs = ["Popular", "Breakfast", 'Appetizer', 'Drink', 'Soup', 'Salad']
  const [activeTab, setActiveTab] = useState("Popular")
  const initialIndex = useRef(0)
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [searchVal, setSearchVal] = useState("")
  const [horizontalView, setHorizontalView] = useState(false)

  useEffect(()=>{
    const fetchData = async ()=>{
      try{

        if(searchText === ''){
          return
        }
        
          const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${key}&number=25&query=${searchText}`)
          const data = await response.json()
          changeRecipes([{id: 'left-space'}, ...data, {id: 'right-space'}])
          
          
      }catch(err){
          alert("There is an error")
      }
  }

  

  
  const timer = setTimeout(()=>{ 
    fetchData()
  }, 500)

  return ()=>{
    clearTimeout(timer)
  }

  }, [searchText])

  const {safeAreaView} = styles
  
  const onViewCallBack = useRef(({viewableItems})=>{

    initialIndex.current = viewableItems[0].index
  })

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  })

  const handleTabPress = (tabName)=>{
    setActiveTab(tabName)
    fetchPopularRecipesOfType(tabName.toLowerCase())
  }

  const fetchPopularRecipesOfType = async (type)=>{
    setIsLoading(true)
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=25&type=${type}`)
    const data = await res.json()

    const newRecipes = data.results
    changeRecipes([{id: 'left-space'},...newRecipes,{id: 'right-space'}])
    setIsLoading(false)
  
  }



  

  return (
    <SafeAreaView style={[safeAreaView, theme==="light" ? {} : darkMode.appBackground]}>
      <View style={{marginBottom: 18}}>
        <Text style={[styles.header, theme==='light' ? {} : darkMode.bodyText]}>What would you like to cook today?</Text>
      </View>
      
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={20} color={theme === 'light' ? "black" : 'white'} style={styles.icon}></Feather>
        <TextInput style={[styles.recipeSearch, theme ==='light' ? {} : darkMode.bodyText]} placeholderTextColor={theme==='light' ? 'black' : 'white'}  placeholder='Search any recipes' onChangeText={(newText)=>{setSearchText(newText)}} value={searchText}></TextInput>
      </View>

      <View style={{marginTop: 16}}>
        <FlatList data={tabs} renderItem={({item})=><DishTab text={item} activeTab={activeTab} handlePress={handleTabPress} theme={theme}></DishTab>} keyExtractor={item=>item} horizontal/>
        
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center'}}>
        <Text style={theme !=='light' && darkMode.bodyText}>{`${recipes.length - 2} recipes`}</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={()=>{setHorizontalView(false)}}><MaterialCommunityIcons name="view-stream-outline" size={24} color={horizontalView? (theme==='light' ? 'gray' : 'gray') : (theme==='light' ? 'black' : 'white')} /></Pressable>
          <Pressable onPress={()=>{setHorizontalView(true)}}><MaterialCommunityIcons name="view-parallel-outline" size={24} color={horizontalView? (theme==='light' ? 'black' : 'white') :  (theme==='light' ? 'gray' : 'gray')} /></Pressable>
        </View>
        
      </View>

      <View style={{flex: 1}}>
        {isLoading ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size={'large'} color={'rgb(36, 36, 36)'}></ActivityIndicator></View> :
          <RecipeList recipes={recipes} horizontally={horizontalView} onClickHandle={fetchRecipeInfo}/>}
      </View>

      
      
    </SafeAreaView>
    
  );
}







