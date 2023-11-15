import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Room({ route }) {
  const navigation = useNavigation();
  const [userParam, setUserParam] = useState(route.params.user);

  const saveRoom = async () => {
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
    }

    // Navegue de volta para a tela RoomList após a atualização
    navigation.navigate("RoomList");
  };


    return (
      <>
      <View style={style.cont}>
                <Text style={style.texto}>Editar sala</Text>
            </View>
        <View style={style.container}>
            <Text style={[style.textocima, { marginTop: 20 }]}>Nome da sala</Text>
            <TextInput
                placeholder="Digite o nome para sala..."
                style={[style.butao, { paddingLeft: 10, marginTop: 10 }]}
                keyboardType="name-phone-pad"
                value={userParam.nome}
                onChangeText={(nome) => setUserParam({ ...userParam, nome })}
            />

            <Text style={[style.textocima, { marginTop: 20 }]}>Descrição</Text>
            <TextInput
                placeholder="Digite a descrição..."
                style={[style.butao2, { paddingLeft: 10 }]}
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
    marginTop: 40,
    marginLeft: 40,
    backgroundColor: 'green',
    borderRadius: 20,
    width: 200, // Ajuste a largura conforme necessário
    height: 60, // Ajuste a altura conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
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
        marginLeft: 118,
        marginTop: 80,
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
