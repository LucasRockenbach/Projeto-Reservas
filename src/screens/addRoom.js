import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, Text, Modal } from "react-native";
import NavBar from "../components/navBar";
import Botton from "../components/botton";
import UserContext from "../context/userContext";
import { useNavigation } from "@react-navigation/native";

export default ({ route, navigation }) => {
  const { dispatch } = useContext(UserContext);
  const [userParam, setUserParam] = useState({});

  const doPost = () => {
    //validações
    if (userParam.capacidade > 100) {
      alert('A capacidade da sala não pode ser maior do que 100.');
      return; // Não prossegue com o cadastro se a capacidade for maior do que 100
    }

    if (userParam.andar > 3) {
      alert('O número do andar não pode ser maior do que 3.');
      return; // Não prossegue com o cadastro se o andar for maior do que 3
    }
if (userParam.numero > 50) {
    alert('O número da sala não pode ser maior do que 50.');
    return; // Não prossegue com o cadastro se o número da sala for maior do que 50
  }
  
    const URL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala/';
    const dadosParaEnviar = {
      idSala: userParam.id,
      nome: userParam.nome,
      capacidade: userParam.capacidade,
      descricao: userParam.descricao,
      bloco: userParam.bloco,
      andar: userParam.andar,
      numero: userParam.numero,
    };

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParaEnviar),
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('A solicitação via POST falhou!');
        }
        return response.json();
      })
      .then((dadosRecebidos) => {
        console.log('Resposta do servidor: ', dadosRecebidos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <View style={style.cont}>
        <NavBar />
        <Text style={style.texto}>Cadastre um Sala</Text>
      </View>
      <View style={style.container}>
        <Text style={[style.textocima, {marginTop: 20, }]}>Nome da sala</Text>
        <TextInput
          placeholder="Digite o nome para sala..."
          style={[style.butao, { paddingLeft: 10, marginTop: 10 }]} // Ajuste de marginTop
          keyboardType="name-phone-pad"
          value={userParam.nome}
          onChangeText={(nome) => setUserParam({ ...userParam, nome })}
        />

        <Text style={[style.textocima, {marginTop: 20, }]}>Descrição</Text>
        <TextInput
          placeholder="Digite a descrição..."
          style={[style.butao2, { paddingLeft: 10,}]} // Ajuste de marginTop
          keyboardType="name-phone-pad"
          value={userParam.descricao}
          onChangeText={(descricao) => setUserParam({ ...userParam, descricao })}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TextInput
                placeholder='Capacidade'
                placeholderTextColor="#FFFFFF"
                style = {[style.inputs,{color: "#FFFFFF", }]}
                keyboardType='numeric'
                value={userParam.capacidade}
                onChangeText={ capacidade => setUserParam({...userParam, capacidade}) }/>
                
                <TextInput 
                    placeholder='Bloco'
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs,{color: "#FFFFFF", }]}
                    keyboardType={'email-address'}
                    value={userParam.bloco}
                    onChangeText={ bloco => setUserParam({...userParam, bloco}) }
                />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                <TextInput 
                    placeholder='Andar'
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs,{color: "#FFFFFF", }]}
                    keyboardType={'numeric'}
                    value={userParam.andar}
            onChangeText={ andar => setUserParam({...userParam, andar}) }
                /> 
                <TextInput 
                    placeholder='N°'
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs,{color: "#FFFFFF", }]}
                    keyboardType={'numeric'}
                    value={userParam.numero}
            onChangeText={ numero => setUserParam({...userParam, numero}) }
                /> 
            </View>

            <View style={style.buttonsContainer}>
          <Botton 
            textoBotao={"Cancelar"}
            funcao={() => {
              // Função para cancelar, se necessário
            }}
            style={[style.button, style.cancelButton]} // Estilo para o botão de cancelar
          />
          <Botton 
            textoBotao={"Cadastrar"}
            funcao={() => {
              doPost();
              navigation.navigate("RoomList");
            }}
            style={style.button} // Estilo para o botão de cadastrar
          />
        </View>
      </View>
    </View>
  );
};


const style = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20, // Espaçamento horizontal para os botões
  },
  submitButton: {
    width: 1, // Largura do botão de cadastrar
  },
  cancelButton: {
    backgroundColor: "red", // Cor de fundo vermelha para o botão de cancelar
  },
  button: {
    width: 80, // Largura dos botões
    height: 40, // Altura dos botões
    borderRadius: 5, // Borda arredondada
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: "center",
    marginBottom: 150, // Ajuste de marginTop para mover os inputs para cima
  },
  label: {
    marginRight: 200,
    width: 208,
    height: 27,
    backgroundColor: "#383838",
    fontSize: 18,
    fontStyle: "normal",
  },
  inputLogin: {
    height: 60,
    width: 250,
    fontSize: 20,
    margin: 20,
    textAlign: "center",
    borderWidth: 0.5,
    borderRadius: 20,
  },
      inputs:{
        height: 60,
        width: 105,
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        borderWidth: 0.5,
        backgroundColor: "#28364D",
        borderRadius: 5,
      },
      cont: {
        width: 395,
        height: 143,
        backgroundColor: "#28364D",
        borderRadius: 30,
    },
    texto: {
        width: 266,
        height: 39,
        fontStyle: 'normal',
        fontSize: 30,
        alignItems: 'center',
        marginLeft: 70,
        marginTop: 20,
        fontWeight: '700',
        color: 'white'
      },
     textocima: {
        marginRight: 105,
        width: 208,
        height: 27,
        fontSize: 18,
        fontStyle: "normal",
        color: '#383838',
      },
      butao2: {
        width: 315,
        height: 80,
        backgroundColor: "#E9EBED",
        borderRadius: 5,
        alignItems: 'center'
      },
      textocima: {
        marginRight: 105,
        width: 208,
        height: 27,
        fontSize: 18,
        fontStyle: "normal",
        color: '#383838',
      },
      butao: {
        width: 315,
        height: 50,
        backgroundColor: "#E9EBED",
        borderRadius: 5,
        alignItems: 'center'
      },
})
    