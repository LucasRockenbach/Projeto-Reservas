import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default props =>(

   
        <View style={style.navBar}>
            <TouchableOpacity onPress={props.funcao}>
                <Image style={style.barsSolid} source={require('../assets/icon.png')}></Image>
                
            </TouchableOpacity>
        </View>
)

const style = StyleSheet.create({
    barsSolid:{
        width: 25,
        height: 25
    },
    search:{
        width: 25,
        height: 25
    },
    navBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        
    }
})