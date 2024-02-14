import React, {useEffect, useRef, useState} from "react";
import { Dimensions } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Animated } from "react-native";
import { Text, View, Modal, Pressable, Image, ScrollView, StyleSheet, StatusBar, FlatList} from "react-native";
import Ingridient from "./Ingridient";
import { ActivityIndicator } from "react-native";
import darkMode from "../styles/darkMode";


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

  

export default function RecipeModal({recipeToShow, closeRecipeModal, recipeInfoLoading, savedRecipes, changeSavedRecipes, theme}){
  const ingridientAnimation = useRef(new Animated.Value(0)).current;
  const [ingridientIsOpen, setIngridientIsOpen] = useState(false)
  const directionAnimation = useRef(new Animated.Value(0)).current;
  const [directionsIsOpen, setDirectionsIsOpen] = useState(false)

  let heightInterpolate;
  let directionHeightInterpolate;

  const findRecipe = (id)=>{
    for(let i = 0; i < savedRecipes.length; i++){
      if(savedRecipes[i].id === id){
        return true
      }
    }
    return false
  }



  const startIngredientAnimation = ()=>{
    const value = ingridientIsOpen ? 0 : 1
    setIngridientIsOpen(!ingridientIsOpen)
    Animated.timing(ingridientAnimation,{
      toValue: value,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  const startDirectionsAnimation = ()=>{
    const value = directionsIsOpen ? 0 : 1
    setDirectionsIsOpen(!directionsIsOpen)
    Animated.timing(directionAnimation, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  const handlePress = (recipe)=>{
    if(findRecipe(recipe.id)){
      newList = savedRecipes.filter(item=>item.id!== recipe.id)
      changeSavedRecipes(savedRecipes.filter(item=>item.id !== recipe.id))
  }else{
    changeSavedRecipes([...savedRecipes, recipe])
    newList = [...savedRecipes, recipe]
  }
  }


  directionHeightInterpolate = directionAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ['65%', '200%']
  })
  
  heightInterpolate = ingridientAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ['80%', '200%']
  })
  console.log(recipeToShow.id)
  console.log(savedRecipes)
  console.log('hi')

    return (
      
        <Modal animationType="slide" style={theme=='light' ? darkMode.appBackground :{}}>
          {
            recipeInfoLoading ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size={'large'} color={'blue'}></ActivityIndicator></View> :
            <View style={[{flex: 1, alignItems: "center", position:'relative'}, theme=="light" ? {} : darkMode.appBackground]}>

    
    <View style={[{width: "90%", margin: "auto", }, theme=='light' ? {} : darkMode.appBackground] }>
      <View style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}, theme=="light"? {} : darkMode.appBackground]}>
      <Pressable style={styles.modalNavBtn} onPress={closeRecipeModal}><Ionicons name="arrow-back-outline" size={24} color="black" /></Pressable>
      <Text style={[{fontSize: 20}, theme=="light" ? {}: darkMode.bodyText]}>Recipe</Text>
      <Pressable style={styles.modalNavBtn} onPress={()=>{handlePress(recipeToShow)}}>{
        findRecipe(recipeToShow.id) ? <FontAwesome name="heart" size={24} color="red" /> : <FontAwesome5 name="heart" size={18} color="black" />
        }
      </Pressable>
    

      </View>
      <Text style={[{fontSize: 20, fontWeight: '500'}, theme=="light" ? {} : darkMode.bodyText]}>{recipeToShow.title}</Text>
      <Image source={{uri: `https://spoonacular.com/recipeImages/${recipeToShow.id}-312x231.${recipeToShow.imageType}`}} style={{marginTop:20, marginBottom: 10, width: '100%', height: 170, borderRadius: 25}}></Image>
      
      <ScrollView style={{height: 100, marginVertical: 10}}>
        <Text style={theme=="light" ? {} : darkMode.bodyText}>{recipeToShow.summary ? recipeToShow.summary.replace(/(<([^>]+)>)/ig,''): ''}</Text>
      </ScrollView>
      <View>

      </View>
      
     </View>
     <View style={[{width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 100, flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 20, paddingVertical: 10}, theme=="light" ? {} : darkMode.appBackground]}>
      <View>
        <Text style={[{fontSize: 18}, theme=="light" ? {} : darkMode.bodyText]}>Servings</Text>
        <Text style={[{alignSelf: 'center'}, theme=="light"? {} : darkMode.bodyText]}>{recipeToShow.servings}</Text>
      </View>
      <View>
        <Text style={[{fontSize: 18}, theme=="light" ? {} : darkMode.bodyText]}>Cook Time</Text>
        <Text style={[{alignSelf: 'center'}, theme=="light"? {} :darkMode.bodyText]}>{recipeToShow.readyInMinutes} mins</Text>
      </View>

      <Animated.View style={[{borderTopLeftRadius: 25, borderTopRightRadius: 25, width: '100%', position:'absolute', bottom: 0, height: heightInterpolate, paddingVertical: 10, paddingHorizontal: "5%", backgroundColor: 'rgb(232, 245, 228)', paddingBottom: ingridientIsOpen ? '70%': 10}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18}}>Ingredients</Text>
            <Pressable onPress={startIngredientAnimation}><AntDesign name={ingridientIsOpen ? 'down' : "up"} size={20} color="black" /></Pressable> 
        </View>
        <View>
          <FlatList data={recipeToShow.extendedIngredients.filter((val, index, self) => self.findIndex(v=>v.id === val.id) === index)} renderItem={({item})=><Ingridient ingridientInfo={item}></Ingridient>} keyExtractor={item=>item.id}></FlatList>
        </View>
      </Animated.View>

      <Animated.View style={{borderTopLeftRadius: 25, borderTopRightRadius: 25, backgroundColor: 'red', width: '100%', position:'absolute', bottom: 0, height: directionHeightInterpolate, paddingVertical: 10, paddingHorizontal: "5%", backgroundColor: 'rgb(179, 199, 173)'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 18}}>Direction</Text>
            <Pressable onPress={startDirectionsAnimation}><AntDesign name={directionsIsOpen ? 'down' : "up"} size={20} color="black" /></Pressable>
        </View>
        <ScrollView>
        <Text>
          {recipeToShow.instructions ? recipeToShow.instructions.replace(/(<([^>]+)>)/ig,'') : 'No directions found'}          
        </Text>
        </ScrollView>
        
      </Animated.View>

     </View>

     </View>
          }
    
     
      
  </Modal>
    )
}