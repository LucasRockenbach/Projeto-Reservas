import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Botton from '../components/botton';
import Logo from '../components/logo';

export default function Room({ route, navigation }) {
  const [userParam, setUserParam] = useState(route.params.user);

  const saveRoom = async () => {
    const putURL = `https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/usuario/${userParam.idUsuario}`;

    try {
        const response = await fetch(putURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userParam),
        });

        if (!response.ok) {
            throw new Error('Erro na solicitação HTTP');
        }

        const responseData = await response.json();
        console.log("Resposta da requisição PUT: ", responseData);

        // Adicione aqui qualquer lógica adicional após o sucesso da atualização

        // Navegue de volta para a tela UserList após a atualização
        navigation.navigate('UserList');
    } catch (error) {
        console.error('Erro: ', error);
    }
};

  return (
    <View style={style.container}>
      <Logo />
      <TextInput
        placeholder='nome'
        style={style.inputLogin}
        keyboardType='name-phone-pad'
        value={userParam.nome}
        onChangeText={nome => setUserParam({ ...userParam, nome })}
      />
      <TextInput
        placeholder='telefone'
        style={style.inputLogin}
        keyboardType='numeric'
        value={userParam.telefone}
        onChangeText={telefone => setUserParam({ ...userParam, telefone })}
      />
      <TextInput
        placeholder='E-mail'
        style={style.inputLogin}
        keyboardType={'email-address'}
        value={userParam.email}
        onChangeText={email => setUserParam({ ...userParam, email })}
      />

      <TouchableOpacity
        style={[style.roundButton, { bottom: 20, right: 20 }]}
        onPress={saveRoom}
      >
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28364C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLogin: {
    height: 60,
    width: 250,
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: "white"
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#28364D",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
