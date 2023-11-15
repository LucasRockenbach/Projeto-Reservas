import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import botton from '../components/botton';
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Linking, Modal } from 'react-native';
import Botton from '../components/botton';
import Logo from '../components/logo';
import { useNavigation } from '@react-navigation/native';

const logoImage = require('../assets/Embrapa.png'); 


export default({ route, navigation })=> {
  const [userParam, setUserParam] = useState({});
  const [isEmailIncorrectModalVisible, setIsEmailIncorrectModalVisible] = useState(false);

  const toggleEmailIncorrectModal = () => {
    setIsEmailIncorrectModalVisible(!isEmailIncorrectModalVisible);
  };

  const MAX_PHONE_LENGTH = 11;

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return '';
    }
    if (phoneNumber.length >= 2) {
      return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2)}`;
    }
    return phoneNumber;
  };

  const doPost = async () => {
    const emailPattern = /^(.+)@(gmail|hotmail)\.com$/;

    if (!emailPattern.test(userParam.email)) {
      toggleEmailIncorrectModal();
      return;
    }
    

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

  return (
    <View style={style.container}>
      <Image source={logoImage} style={style.logo} resizeMode="contain" />
      <TextInput
        placeholder="nome"
        style={style.inputLogin}
        keyboardType="name-phone-pad"
        value={userParam.nome}
        onChangeText={(nome) => setUserParam({ ...userParam, nome })}
      />
      <TextInput
        placeholder="telefone"
        style={style.inputLogin}
        keyboardType="numeric"
        value={formatPhoneNumber(userParam.telefone)}
        onChangeText={(telefone) =>
          setUserParam({ ...userParam, telefone: telefone.replace(/\D/g, '').substring(0, MAX_PHONE_LENGTH) })
        }
      />
      <TextInput
        placeholder="E-mail"
        style={style.inputLogin}
        keyboardType={'email-address'}
        value={userParam.email}
        onChangeText={(email) => setUserParam({ ...userParam, email })}
      />

      {/* Modal para exibir mensagem de e-mail incorreto */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isEmailIncorrectModalVisible}
        onRequestClose={toggleEmailIncorrectModal}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalText}>
              Formato de e-mail incorreto. O e-mail deve ser do tipo @gmail.com ou @hotmail.com.
            </Text>
            <TouchableOpacity onPress={toggleEmailIncorrectModal}>
              <Text style={style.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Botton textoBotao={'Cadastrar'} funcao={doPost} />
    </View>
  );
};

  
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#28364C',
      alignItems: 'center',
      justifyContent: 'center',
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
  logo: {
    width: 300, 
    height: 200, 
    marginBottom: 20, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    color: 'blue',
  },
  });