import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import Botton from '../components/botton';
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Linking, } from 'react-native';

export default props =>(

            <View style={styles.container}>

                

            <Image style={styles.logo} source={require('../assets/Embrapa.png')}/>

            <TextInput
            placeholder='email' 
            style={styles.inputLogin}
            keyboardType={'email-address'}/>
            
            <TextInput 
              placeholder='Insira uma senha'
              style={styles.inputLogin}
              keyboardType={'numeric'}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={
              ()=> props.navigation.navigate("RegistePage")
            }>
              <Text style ={{color:'black'}}>
                Não possui um cadastro? Cadastre-se
              </Text>
            </TouchableOpacity>


            <Botton textoBotao={"Login"} funcao = {
            
                ()=> props.navigation.navigate("Home")
              
            
              } />

            <StatusBar style='auto' />
            </View>

)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  botaoPrincipal:{
    backgroundColor: 'blue',
    height: 40,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao:{
    color: 'white',
    fontWeight: 'bold',
  },
  logo:{
    width: 255,
    height: 200,
    borderRadius: 50,
    margin: 20
  },
  inputLogin:{
    height: 60,
    width: 250,
    borderWidth: 0.5,
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    borderRadius: 20
  }
});
