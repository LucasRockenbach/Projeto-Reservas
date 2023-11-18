import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import Botton from '../components/botton';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import UserContext from '../context/userContext';

export default props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // Aqui você pode adicionar sua lógica de autenticação
    // Por exemplo, verificar o email e a senha em algum lugar
    // Se a autenticação for bem-sucedida, navegue para a tela 'Home'

    // Condição de exemplo (substitua por sua própria lógica de autenticação)
    if (email === 'lucas@gmail.com' && password === '1234') {
      // Navegar para a tela 'Home'
      props.navigation.navigate('RoomList');
    } else {
      // Mostrar um alerta se a autenticação falhar
      Alert.alert('Erro de autenticação', 'Credenciais inválidas. Tente novamente.');
    }
  };

  const handleForgotPassword = () => {
    // Adicione a lógica para lidar com "Esqueceu sua senha?"
    // Por exemplo, pode ser exibida uma tela para redefinir a senha
    Alert.alert('Esqueceu sua senha?', 'Implemente a lógica aqui.');
  };

  return (
    <View style={style.container}>
      <View style={style.ImageContainer}>
        <Image style={style.logo} source={require('../assets/Embrapa.png')} />
      </View>

      <View style={style.inputContainer}>
        <Text style={style.label}>Email</Text>
        <TextInput
          placeholder="Insira seu email"
          style={style.inputLogin}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={style.label}>Senha</Text>
        <TextInput
          placeholder="Insira sua senha"
          style={style.inputLogin}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={style.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={style.loginButton}>
        <Text style={style.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Cadastro')}
        style={style.registerButton}
      >
        <Text style={style.registerButtonText}>Não possui um cadastro? Cadastre-se</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ImageContainer:{
    bottom: 120,
    height: 100,
  },
  logo: {
    width: 255,
    height: 200,
    borderRadius: 50,
    margin: 20,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 25,
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
  forgotPasswordText: {
    color: 'black',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#28364D',
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FAFAFA',
    fontWeight: 'bold',
    fontSize: 20,
  },
  registerButton: {
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'black',
    fontSize: 14,
  },
});