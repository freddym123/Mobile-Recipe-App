import React from "react";
import { SafeAreaView, StyleSheet, Text, FlatList, View, StatusBar, ImageBackground, Switch, Pressable} from "react-native";
import { useState } from "react";
import { useColorScheme } from "react-native";
import ListItem from "../components/ListItem";
import darkMode from "../styles/darkMode";

const Data = [
    {
        dt_txt: "2023-02-18 12:00:00",
        main: {
            temp_max: 8.55,
            temp_min: 7.55
        },
        weather: [
            {
                main: "Clear"
            }
        ]
    },
    {
        dt_txt: "2023-02-18 15:00:00",
        main: {
            temp_max: 8.55,
            temp_min: 7.55
        },
        weather: [
            {
                main: "Clouds"
            }
        ]
    },
    {
        dt_txt: "2023-02-18 18:00:00",
        main: {
            temp_max: 8.55,
            temp_min: 7.55
        },
        weather: [
            {
                main: "Rain"
            }
        ]
    }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    backgroundImage: {
        flex: 1
    }
})





const UpcomingWeather = ({logInStatus, setTheme, theme, signOut, clearSavedRecipes})=>{
    const [darkTheme, setDarkTheme] = useState(false)
    
    const toggleSwitch = ()=> {
        darkTheme ? setTheme('light') : setTheme('dark')
        setDarkTheme(previousTheme=>!previousTheme)
    }

    function startLogOut(){
        signOut();
        clearSavedRecipes([])
    }



    console.log(darkTheme)
    if(logInStatus){
        return (
        <View style={[{flex: 1, padding: 10}, theme=="light" ? {} : darkMode.appBackground]} >
            <View>
                <Pressable style={[{backgroundColor: 'red', alignItems:'center', paddingVertical: 10, borderRadius: 20, backgroundColor: "rgb(71, 133, 71)"}]} onPress={startLogOut}><Text style={{color: "white"}}>Sign out</Text></Pressable>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={theme=="light" ? {} : darkMode.bodyText}>Dark Theme</Text>
                    <Switch value={darkTheme} onValueChange={toggleSwitch}/>
                </View>
            </View>
        </View>
        )
    }

    return (
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                <Text style={{fontSize: 35}}>Sign In...</Text>
                <Text style={{fontSize: 15}}>In order to view settings</Text>
            </View>
    )
}

export default UpcomingWeather