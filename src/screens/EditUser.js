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
        throw new Error(`Erro na solicitação HTTP: ${response.status}`);
      }

      // Verifica se a resposta está vazia ou nula
      if (response.status === 204) {
        console.log('A resposta está vazia.');
        // Adicione lógica adicional conforme necessário
      } else {
        // Tenta fazer o parsing do JSON
        const responseData = await response.json();
        console.log('Resposta da requisição PUT:', responseData);
        // Adicione aqui qualquer lógica adicional após o sucesso da atualização
      }

      // Navegue de volta para a tela UserList após a atualização
    } catch (error) {
      console.error('Erro: ', error);
    }

    // Navegue de volta para a tela RoomList após a atualização
    navigation.navigate("UserList");
  };

  return (
    <>
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>Editar Usuarios</Text>
      </View>
    <View style={style.container}>
      <Text style={[style.TextInput, { marginTop: 20 }]}>Nome</Text>
      <TextInput
        placeholder='nome'
        style={[style.inputLogin, { paddingLeft: 10, marginTop: 10 }]}
        keyboardType='name-phone-pad'
        value={userParam.nome}
        onChangeText={nome => setUserParam({ ...userParam, nome })}
      />
      <Text style={[style.TextInput, { marginTop: 20 }]}>Telefone</Text>
      <TextInput
        placeholder='telefone'
        style={[style.inputLogin, { paddingLeft: 10, marginTop: 10 }]}
        keyboardType='numeric'
        value={userParam.telefone}
        onChangeText={telefone => setUserParam({ ...userParam, telefone })}
      />
      <Text style={[style.TextInput, { marginTop: 20 }]}>E-mail</Text>
      <TextInput
        placeholder='E-mail'
        style={[style.inputLogin, { paddingLeft: 10, marginTop: 10 }]}
        keyboardType={'email-address'}
        value={userParam.email}
        onChangeText={email => setUserParam({ ...userParam, email })}
      />

      <TouchableOpacity
        style={[style.roundButton, { bottom: 20, right: 20 }]}
        onPress={saveRoom}
      >
        <Text style={[style.editButtonText]}>Salvar</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  HeaderContainer: {
    width: 395,
    height: 143,
    backgroundColor: "#28364D",
    borderRadius: 10,
  },
  HeaderText: {
    width: 266,
    height: 39,
    color: '#FAFAFA',
    fontStyle: 'normal',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 65,
    marginLeft: 65,
  },
  inputLogin: {
    height: 55,
    width: 300,
    fontSize: 16,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    // Estilos adicionais para relevo e sombra
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
  },
  shadowOpacity: 5,
  shadowRadius: 5,
  elevation: 5, // Adiciona a elevação para a sombra no Android
},
  roundButton: {
    backgroundColor: '#28364D',
    height: 50,
    width: 300,
    top: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 32,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  TextInput: {
    marginRight: 105,
    width: 208,
    height: 27,
    fontSize: 18,
    fontStyle: "normal",
    color: '#383838',
  },
});