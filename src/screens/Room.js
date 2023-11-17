import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Botton, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Room({ route }) {
  const navigation = useNavigation();
  const [userParam, setUserParam] = useState(route.params.user);

  const saveRoom = async () => {
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
  
    const putURL = `https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala/${userParam.idSala}`;
  
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
    } catch (error) {
      console.error('Erro: ', error);
      // Mostrar um alerta em caso de erro na solicitação HTTP
    }
  
    // Navegue de volta para a tela RoomList após a atualização
    navigation.navigate("RoomList");
  };


    return (
      <>
        <View style={style.HeaderContainer}>
          <Text style={style.HeaderText}>Editar Salas</Text>
        </View>
        <View style={style.container}>
            <Text style={[style.textocima, { marginTop: 20 }]}>Nome da sala</Text>
            <TextInput
                placeholder="Digite o nome para sala..."
                style={[style.inputLogin, { paddingLeft: 10, marginTop: 10 }]}
                keyboardType="name-phone-pad"
                value={userParam.nome}
                onChangeText={(nome) => setUserParam({ ...userParam, nome })}
            />

            <Text style={[style.textocima, { marginTop: 20 }]}>Descrição</Text>
            <TextInput
                placeholder="Digite a descrição..."
                style={[style.inputLogin, { paddingLeft: 10 }]}
                keyboardType="name-phone-pad"
                value={userParam.descricao}
                onChangeText={(descricao) => setUserParam({ ...userParam, descricao })}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TextInput
                    placeholder="Capacidade"
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs, { color: "#FFFFFF" }]}
                    keyboardType="numeric"
                    value={userParam.capacidade.toString()}
                    onChangeText={(capacidade) => setUserParam({ ...userParam, capacidade })}
                />

                <TextInput
                    placeholder="Bloco"
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs, { color: "#FFFFFF" }]}
                    keyboardType={'email-address'}
                    value={userParam.bloco.toString()}
                    onChangeText={(bloco) => setUserParam({ ...userParam, bloco })}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TextInput
                    placeholder="Andar"
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs, { color: "#FFFFFF" }]}
                    keyboardType="numeric"
                    value={userParam.andar.toString()}
                    onChangeText={(andar) => setUserParam({ ...userParam, andar })}
                />
                <TextInput
                    placeholder="N°"
                    placeholderTextColor="#FFFFFF"
                    style={[style.inputs, { color: "#FFFFFF" }]}
                    keyboardType="numeric"
                    value={userParam.numero.toString()}
                    onChangeText={(numero) => setUserParam({ ...userParam, numero })}
                />
            </View>
            

            <TouchableOpacity
                style={[style.greenButton, { bottom: 20, right: 20 }]}
                onPress={() => { saveRoom()
                    // Adicione aqui a lógica para salvar as alterações ou enviar os dados para o servidor
                    // Por exemplo, você pode chamar uma função de atualização aqui
                    // Exemplo fictício: saveRoom(userParam)
                    // Lembre-se de implementar a lógica de navegação ou feedback de sucesso
                }}
            >
                <Text style={style.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
        </>
        
    );
}
const style = StyleSheet.create({
  greenButton: {
    backgroundColor: 'green',
    height: 50,
    width: 300,
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 32,
},
buttonText: {
    color: 'white',
    fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
},
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
        width: 105,
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
        marginLeft: 85,
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