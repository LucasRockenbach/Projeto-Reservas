import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { ListItem } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import UserContext from "../context/userContext";

export default function RoomList(props) {
    const { state, dispatch } = useContext(UserContext);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const URL = "https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala";

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
        const deleteURL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala/' + user.idSala;

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
            <ListItem onPress={() => setSelectedRoom(user)}>
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
            <View style={style.cont}>
                <Text style={style.texto}>Salas Criadas</Text>
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
                {selectedRoom && (
                    <View>
                        {/* Renderizar informações adicionais para a sala selecionada */}
                        <Text>{selectedRoom.nome}</Text>
                        {/* Adicionar mais detalhes com base na sua estrutura de dados */}
                    </View>
                )}
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
      cont: {
        width: 395,
        height: 143,
        backgroundColor: "#28364D",
        borderRadius: 30,
    },
    texto: {
      width: 266,
      height: 39,
      color: '#FAFAFA',
      fontStyle: 'normal',
      fontSize: 30,
      alignItems: 'center',
      marginLeft: 135,
      marginTop: 80,
      fontWeight: '700',
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
})


/*
return(

    <View style={style.container}>
        <View style={style.viewLogo}>
            <Logo />
        </View>

        {isLoading ? (
            <ActivityIndicator size={80}></ActivityIndicator>
        ) : (
            <FlatList style={style.list}
                data={data}
                keyExtractor={({id})=>id}
                renderItem={ ({item})=>(
                    <Text style={style.item}>

                        <Text style={style.label}>
                            nome:
                        </Text>
                        <Text style={style.value}>
                            {item.nome}
                        </Text>
                        {'\n'}
                        <Text style={style.label}>
                            Email:
                        </Text>
                        <Text style={style.value}>
                            {item.email}
                        </Text>
                        {'\n'}
                        <Text style={style.label}>
                            Telefone:
                        </Text>
                        <Text style={style.value}>
                            {item.telefone}
                        </Text>   
                    </Text> 
                                      
                )}
            />
        )
        }
        <View>
            <Button title="Atualizar" onPress={ () => getUsers()} />
            <Botton textoBotao={"Cadastrar"} funcao={
                () => {
                    props.navigation.navigate("RegisterPage")

                }

            } />
        </View>
    </View>
)*/