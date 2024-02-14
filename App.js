import React, {useState, useEffect} from "react";
import {ActivityIndicator, StyleSheet, View, Modal, Text, ScrollView, TextInput, Pressable, Image, SafeAreaView} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage, {AsyncStorageStatic} from '@react-native-async-storage/async-storage'
import { useColorScheme } from "react-native";

import Tabs from "./src/components/Tabs";

import key from "./src/key";
import RecipeModal from "./src/components/RecipeModal";
import LogInModal from "./src/components/LogInModal";
import darkMode from "./src/styles/darkMode";


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1 
  },
  signInModalContainer: {
    position: 'absolute',
    top: 100,
    zIndex: 34,

    width: "100%",
    alignItems: 'center',

  },
  signInModalContent: {
    backgroundColor: 'white',
    width: "90%",
    padding: 16,
    borderRadius: 10,
  },
  textInput:{
    borderColor: 'gray',
    borderWidth: 2,
    padding: 3
  },
  labelText:{
    fontSize: 15
  },
  signInBtn: {
    backgroundColor: 'rgb(71, 133, 71)',
    width: 60,
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    marginVertical: 10
  },
  linkColor: {
    color: "rgb(71, 133, 71)"
  },
  modalNavBtn: {
    backgroundColor: 'gainsboro',
    height: 40,
    width: 40,
    borderRadius: 40/2,
    alignItems: "center",
    justifyContent: 'center'
  

  }
})



const App = ()=>{
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [showingRecipeModal, setShowingRecipeModal] = useState(false)
  const [recipeToShow, setRecipeToShow] = useState({})
  const [recipeInfoLoading, setRecipeInfoLoading] = useState(false)
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [showingLogInModal, setShowingLogInModal] = useState(false)
  const [userId, setUserId] = useState('')
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [theme, setTheme] = useState('light')



  const fetchRandomRecipes = async ()=>{
    const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${key}&number=50`)
    const data = await res.json()
    setRecipes([{id: 'left-space'},...data.recipes, {id: 'right-spacer'}])
    setLoading(false)
  }

  function changeSavedRecipes(newRecipes){
    setSavedRecipes(newRecipes)
  }

  const fetchRecipeInfo = async (id)=>{
    setShowingRecipeModal(true)
    setRecipeInfoLoading(true)
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${key}`)
    const recipeInfo = await res.json()
    setRecipeToShow(recipeInfo)
    console.log(recipeInfo)
    
    setRecipeInfoLoading(false)
  }

  async function changeLogginStatus(){
    setLoggedIn(!loggedIn)
  }

  function closeLogInModal(){
    setShowingLogInModal(false)
  }

  function changeRecipes(newRecipes){
    setRecipes(newRecipes)
  }


  function setFetchedRecipes(recipes){
    setSavedRecipes(recipes)
  }

  async function changeSavedRecipes(recipes){
    setSavedRecipes(recipes)
    const filteredRecipes = recipes.map(recipe=>{
      return {
        "dishTypes": recipe.dishTypes.length > 0 ? recipe.dishTypes : ['other'],
        "title": recipe.title,
        "imageType": recipe.imageType,
        readyInMinutes: recipe.readyInMinutes,
        id: recipe.id,
        servings: recipe.servings
      }
    })
    const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: userId,
        recipes: filteredRecipes
      })
  }

    const res = await fetch("http://10.0.2.2:3000/users/updateRecipes", options).catch(err=>console.log(err))
    const data = await res.json()
    console.log(data)
  }

  function closeRecipeModal(){
    setShowingRecipeModal(false)
  }

  function openLogInModal(){
    setShowingLogInModal(true)
  }

  function changeUserId(id){
    setUserId(id)
  }
  
  useEffect(()=>{
    ;(async () => {
      await fetchRandomRecipes()
    })()
  }, [])


  if(loading){
    return(
      
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'}></ActivityIndicator>
      </View>
    )
  }
  return(
  <SafeAreaView style={[{flex: 1, position: 'relative', zIndex: 0}]}>
  {showingLogInModal ? <LogInModal closeModal={closeLogInModal} logIn={changeLogginStatus} setFetchedRecipes={setFetchedRecipes} setUserId={changeUserId}/> : ""}
  {showingRecipeModal ? <RecipeModal recipeToShow={recipeToShow} closeRecipeModal={closeRecipeModal} recipeInfoLoading={recipeInfoLoading} savedRecipes={savedRecipes} changeSavedRecipes={changeSavedRecipes} theme={theme}></RecipeModal> : ''}


  <View style={{flex: 1, position: 'relative', zIndex: 2}}>
  
  <NavigationContainer>
    <Tabs recipes={recipes} fetchRecipeInfo={fetchRecipeInfo} changeRecipes={changeRecipes} savedRecipes={savedRecipes} openLogInModal={openLogInModal} logInStatus={loggedIn} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} setTheme={setTheme} theme={theme} signOut={changeLogginStatus} clearSavedRecipes={setFetchedRecipes}></Tabs>
  </NavigationContainer>
  </View>
  </SafeAreaView>
  )
}


export default App;