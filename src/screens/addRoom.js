import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, Text, Modal, Alert } from "react-native";
import NavBar from "../components/navBar";
import Botton from "../components/botton";
import UserContext from "../context/userContext";
import { useNavigation } from "@react-navigation/native";

export default ({ route, navigation }) => {
  const { dispatch } = useContext(UserContext);
  const [userParam, setUserParam] = useState({});
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [botaoCadastrarHabilitado, setBotaoCadastrarHabilitado] = useState(false);

  const doPost = () => {
    // Verificar campos obrigatórios
    if (!userParam.nome || !userParam.descricao || !userParam.capacidade || !userParam.bloco || !userParam.andar || !userParam.numero) {
      setExibirAlerta(true);
      return;
    }

    // Validarções
    if (userParam.capacidade > 100) {
      Alert.alert('A capacidade da sala não pode ser maior do que 100.');
      return;
    }

    if (userParam.andar > 3) {
      Alert.alert('O número do andar não pode ser maior do que 3.');
      return;
    }

    if (userParam.numero > 50) {
      Alert.alert('O número da sala não pode ser maior do que 50.');
      return;
    }

    const URL = 'https://reservasembrapa-dev-bggt.2.us-1.fl0.io/api/sala/';
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
        // Se o cadastro for bem-sucedido, navegue para a próxima tela
        navigation.navigate("RoomList");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Atualizar o estado do botão de cadastro ao modificar os campos
  const atualizarBotaoCadastrar = () => {
    setBotaoCadastrarHabilitado(
      userParam.nome &&
      userParam.descricao &&
      userParam.capacidade &&
      userParam.bloco &&
      userParam.andar &&
      userParam.numero
    );
  };
  const cancelarCadastro = () => {
    // Navegar de volta para a tela "RoomList"
    navigation.navigate("RoomList");
  };
  return (
    <View>
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>Cadastrar Salas</Text>
      </View>
      <View style={style.container}>
        <Text style={[style.TextInput, {marginTop: 20}]}>Nome da sala</Text>
        <TextInput
          placeholder="Digite o nome para a sala..."
          style={[style.inputLogin, { paddingLeft: 10, marginTop: 10 }]}
          keyboardType="name-phone-pad"
          value={userParam.nome}
          onChangeText={(nome) => setUserParam({ ...userParam, nome })}
        />

        <Text style={[style.TextInput, {marginTop: 20}]}>Descrição</Text>
        <TextInput
          placeholder="Digite a descrição..."
          style={[style.inputLogin, { paddingLeft: 10 }]}
          keyboardType="name-phone-pad"
          value={userParam.descricao}
          onChangeText={(descricao) => setUserParam({ ...userParam, descricao })}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TextInput
            placeholder='Capacidade'
            placeholderTextColor="#FFFFFF"
            style={[style.inputs,{color: "#FFFFFF"}]}
            keyboardType='numeric'
            value={userParam.capacidade}
            onChangeText={ capacidade => setUserParam({...userParam, capacidade}) }
          />
          
          <TextInput 
            placeholder='Bloco'
            placeholderTextColor="#FFFFFF"
            style={[style.inputs,{color: "#FFFFFF"}]}
            keyboardType={'email-address'}
            value={userParam.bloco}
            onChangeText={ bloco => setUserParam({...userParam, bloco}) }
          />
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <TextInput 
            placeholder='Andar'
            placeholderTextColor="#FFFFFF"
            style={[style.inputs,{color: "#FFFFFF"}]}
            keyboardType={'numeric'}
            value={userParam.andar}
            onChangeText={ andar => setUserParam({...userParam, andar}) }
          /> 
          <TextInput 
            placeholder='N°'
            placeholderTextColor="#FFFFFF"
            style={[style.inputs,{color: "#FFFFFF"}]}
            keyboardType={'numeric'}
            value={userParam.numero}
            onChangeText={ numero => setUserParam({...userParam, numero}) }
          /> 
        </View>

        <View>
        <Botton 
            textoBotao={"Cancelar"}
            funcao={cancelarCadastro}
            style={[style.button]}
          />
          <Botton 
            textoBotao={"Cadastrar"}
            funcao={() => {
              doPost();
            }}
            style={[style.button, { opacity: botaoCadastrarHabilitado ? 1 : 0.1}]}
            disabled={!botaoCadastrarHabilitado}
          />
        </View>
      </View>

      <Modal
        transparent={true}
        visible={exibirAlerta}
        animationType="slide"
        onRequestClose={() => {
          setExibirAlerta(false);
        }}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text>Por favor, preencha todos os campos obrigatórios.</Text>
            <Botton
              textoBotao={"OK"}
              funcao={() => {
                setExibirAlerta(false);
              }}
              style={style.button}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({

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
      inputs:{
        height: 60,
        width: 150,
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        borderWidth: 0.5,
        backgroundColor: "#28364D",
        borderRadius: 5,
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
     TextInput: {
      marginRight: 105,
      marginBottom: 10,
      width: 208,
      height: 27,
      fontSize: 18,
      fontStyle: "normal",
      color: '#383838',
      },

      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
      },
})