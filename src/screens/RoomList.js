import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, RefreshControl, Modal, Pressable } from "react-native";
import { ListItem } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import UserContext from "../context/userContext";

export default function RoomList(props) {
    const { state, dispatch } = useContext(UserContext);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const URL = "https://reservasembrapa-dev-bggt.2.us-1.fl0.io/api/sala";

    const getUsers = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            console.log(json);
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (user) => {
        const deleteURL = 'https://reservasembrapa-dev-bggt.2.us-1.fl0.io/api/sala/' + user.idSala;

        try {
            const response = await fetch(deleteURL, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Erro na solicitação HTTP');
            }
            Alert.alert(
                'Exclusão!',
                'Usuário excluído com sucesso!',
                [
                    {
                        text: 'Ok',
                        onPress: () => props.navigation.push('RoomList')
                    }
                ]
            );
        } catch (error) {
            console.error('Erro: ', error);
        }
    };

    function deleteConfirm(user) {
        Alert.alert('Excluir usuário!', 'Tem certeza que deseja excluir o usuário?',
            [
                {
                    text: "Sim",
                    onPress() {
                        deleteUser(user);
                    }
                },
                {
                    text: "Não"
                }
            ]
        );
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem onPress={() => {
                setSelectedRoom(user);
                setModalVisible(true);
            }}>
                <ListItem.Content>
                    <ListItem.Title>{user.nome}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={() => props.navigation.navigate("Room", { user })}
                />
                <ListItem.Chevron
                    name="delete"
                    color="red"
                    size={25}
                    onPress={() => { deleteConfirm(user) }}
                />
            </ListItem>
        );
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        getUsers();
        setIsRefreshing(false);
    }

    return (
        <>
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>Salas</Text>
      </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={getUserItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={style.modalView}>
                        <Text>Nome: {selectedRoom?.nome}</Text>
                        <Text>Descrição: {selectedRoom?.descricao}</Text>
                        <Text>Capacidade: {selectedRoom?.capacidade}</Text>
                        <Text>Bloco: {selectedRoom?.bloco}</Text>
                        <Text>Andar: {selectedRoom?.andar}</Text>
                        <Text>Número: {selectedRoom?.numero}</Text>
                        <Pressable
                            style={[style.button, style.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            
                            <Text style={style.textStyle}>Fechar</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
            <TouchableOpacity style={style.roundButton} onPress={() => props.navigation.navigate("addRoom")}>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
        </>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28364C',
        alignItems: 'center',
        justifyContent: 'center',

    },
    viewLogo:{
        bottom: 20,
        top: 20,
    },
    item: {
        fontSize: 20,
        padding: 10,
        backgroundColor: 'lightgray',
        marginBottom: 10,
    },
    list: {
        flexDirection: 'row',
        padding: 10,
      },
      labelContainer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      label: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#28364C',
        
      },
      value: {
        fontSize: 16,
      },
      HeaderContainer: {
        width: 395,
        height: 143,
        backgroundColor: "#28364D",
        borderRadius: 10,
      },
      HeaderText: {
        width: 266,
        height: 45,
        color: '#FAFAFA',
        fontStyle: 'normal',
        fontSize: 35,
        fontWeight: '700',
        marginTop: 55,
        marginRight: 50,
        marginLeft: 135,
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
      modalView: {
        marginTop: 260,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})