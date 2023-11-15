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
      console.log('Antes da navegação');
      navigation.navigate('UserList');
    } catch (error) {
      console.error('Erro:', error.message);

      // Adicione tratamento de erro específico para o erro de parsing JSON
      if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
        console.error('Erro de parsing JSON: Resposta vazia ou inválida.');
        // Adicione lógica adicional conforme necessário
      }
    }
  };

  return (
    <>
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>Editar Usuarios</Text>
      </View>
    <View style={style.container}>
      <View>
        
      </View>
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
        <Text style={[style.buttonText]}>Salvar</Text>
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
    width: 315,
    height: 50,
    backgroundColor: "#E9EBED",
    borderRadius: 5,
    alignItems: 'center'
  },
  roundButton: {
    width: 60,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#28364D",
    justifyContent: "center",
    alignItems: "center",
    top: 25,
  },
  buttonText: {
    color: 'white', // Cor padrão do texto dentro do botão
    fontSize: 15,
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
