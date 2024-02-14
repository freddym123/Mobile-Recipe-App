import React from "react";
import Home from "../screens/Home";
import UpcomingWeather from "../screens/Profile";
import City from "../screens/Saves";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Feather} from "@expo/vector-icons"
import Header from "./Header";


const Tab = createBottomTabNavigator()

const Tabs = ({recipes, fetchRecipeInfo, changeRecipes, savedRecipes, openLogInModal, logInStatus, colorScheme, toggleColorScheme, setTheme, theme, signOut, clearSavedRecipes})=>{

    return(
        <>
            <Header openLogInModal={openLogInModal} logInStatus={logInStatus}></Header>
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'grey',
            tabBarStyle: {
                backgroundColor: 'rgb(36, 36, 36)'
            },
            headerStyle:{
                height: 0
            },
          }}>
              <Tab.Screen name={'Home'} children={()=><Home recipes={recipes} fetchRecipeInfo={fetchRecipeInfo} changeRecipes={changeRecipes} theme={theme}></Home>} options={{tabBarIcon:
              ({focused }) => (<Feather name="home" size={24} color={focused? 'white' : 'black'}></Feather>)}}/>
              <Tab.Screen name={"Saves"} children={()=><City savedRecipes={savedRecipes} logInStatus={logInStatus} theme={theme} fetchRecipeInfo={fetchRecipeInfo}/>} options={{tabBarIcon:
              ({focused }) => (<Feather name="bookmark" size={24} color={focused? 'white' : 'black'}></Feather>)}}/>
              <Tab.Screen name={"Profile"} children={()=><UpcomingWeather logInStatus={logInStatus} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} setTheme={setTheme} theme={theme} signOut={signOut} clearSavedRecipes={clearSavedRecipes}/>} options={{tabBarIcon:
              ({focused }) => (<Feather name="user" size={24} color={focused? 'white' : 'black'}></Feather>)}}/>
          </Tab.Navigator>
        </>
        
    )
}

export default Tabs