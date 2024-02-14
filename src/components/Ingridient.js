import React from "react"
import { View, Image, Text} from "react-native"
export default function Ingridient({ingridientInfo}){
    return (
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <Image style={{width: 50, height: 50}} source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingridientInfo.image}`}}></Image>
            <Text>{ingridientInfo.name}</Text>
        </View>
    )
}