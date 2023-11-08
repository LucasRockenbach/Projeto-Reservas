import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import botton from '../components/botton';
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Linking, } from 'react-native';
import Botton from '../components/botton';
import Logo from '../components/logo';

export default  ()=> {
    const [userParam, setUserParam] = useState({})
  const doPost = async () => {
    //validações 
    

    URL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/usuario'
    const dadosParaEnviar = {
        idUsuario: userParam.idUsuario,
        nome: userParam.nome,
        email: userParam.email,
        telefone: userParam.telefone,
    }

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar)
    };

    try {
      const response = await fetch(URL, options);

      if (response.ok) {
        const dadosRecebidos = await response.json();
        console.log('Resposta do servidor: ', dadosRecebidos);
        // Navegue para a tela desejada após a conclusão bem-sucedida do POST
        navigation.navigate('UserList'); 
      } else {
        throw new Error('A solicitação via POST falhou!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return(
  <View style={style.container}>
      <Logo/>
      <TextInput
      placeholder='nome'
      style = {style.inputLogin}
      keyboardType='name-phone-pad'
      value={userParam.nome}
      onChangeText={ nome => setUserParam({...userParam, nome}) }
      
      />
      <TextInput
      placeholder='telefone'
      style = {style.inputLogin}
      keyboardType='numeric'
      value={userParam.telefone}
            onChangeText={ telefone => setUserParam({...userParam, telefone}) }/>
      
      <TextInput 
        placeholder='E-mail'
        style={style.inputLogin}
        keyboardType={'email-address'}
        value={userParam.email}
        onChangeText={ email => setUserParam({...userParam, email}) }
      />

      <Botton textoBotao={'cadastrar'} funcao ={
       ()=>{doPost()}
          
      }/>

    </View>


)

}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28364C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputLogin:{
    height: 60,
    width: 250,
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "white"
  },
});
