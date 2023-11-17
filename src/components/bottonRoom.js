import { View, StyleSheet, Text, TouchableOpacity,Image } from 'react-native';

export default props => (

        <View>
            <TouchableOpacity style={formatacao.botton}>
                 {/*<Image style={formatacao.image} source={require('../assets/people-roof.png')}/>*/}
                 <Text style={formatacao.tex}>  {props.textoBotao} </Text>
            </TouchableOpacity> 
      
        </View>
    )
const formatacao = StyleSheet.create({
    botton:{
        margin: 30,
        height: 100,
        borderWidth: 0.5,
        width: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },/*
    image:{
        width: 100,
        height: 100,
        
    },*/
    tex:{
        marginTop:20,
        fontSize: 20,
    }
})