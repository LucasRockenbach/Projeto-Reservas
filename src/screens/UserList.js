import { View, StatusBar, Text, StyleSheet, Alert, Image, FlatList, TextInput, ActivityIndicator, Button, RefreshControl, TouchableOpacity, Modal, Pressable } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import Botton from "../components/botton"
import Logo from '../components/logo';
import { FontAwesome } from "@expo/vector-icons";


export default props => {
    const { state, dispatch } = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const URL = "https://reservasembrapa-dev-bggt.2.us-1.fl0.io/api/usuario";



    const filterUsers = () => {
        const filteredUsers = data.filter(user =>
            user.nome.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filteredUsers);
    };

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
    }

    useEffect(() => {
        getUsers();
    }, [])

    const deleteUser = async (user) => {
        const URL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/usuario/' + user.idUsuario

        try {
            const response = await fetch(URL, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Erro na solicitação HTTP');
            }
            Alert.alert(
                'Exclusão!',
                'Usuário excluído com sucesso!',
                [
                    {
                        text: 'Ok',
                        onPress: () => props.navigation.push('UserList')
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
                        //console.warn("Excluido o id: " + user.id)
                        deleteUser(user)
                    }
                },
                {
                    text: "Não"
                }
            ]
        )
    }
    function getUserItem({ item: user }) {
        return (
            <ListItem onPress={() => {
                setSelectedUser(user);
                setModalVisible(true);
            }}>
                <ListItem.Content>
                    <ListItem.Title>{user.nome}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={() => props.navigation.navigate("EditUser", { user })}
                />
                <ListItem.Chevron
                    name="delete"
                    color="red"
                    size={25}
                    onPress={() => { deleteConfirm(user) }}
                />
            </ListItem>
        )
    }

    const onRefresh = () => {
        setIsRefreshing(true);
        getUsers();
        setIsRefreshing(false);
    }

    return (
        <>
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>Usuarios</Text>
      </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(user) => user.idUsuario}
                    renderItem={getUserItem}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
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
                        <Text>ID do Usuário: {selectedUser?.idUsuario}</Text>
                        <Text>Nome: {selectedUser?.nome}</Text>
                        <Text>Email: {selectedUser?.email}</Text>
                        <Text>Telefone: {selectedUser?.telefone}</Text>
                        <Text>Descrição reserva: {selectedUser?.reserva?.descricao}</Text>
                        <Pressable
                            style={[style.button, style.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={style.textStyle}>Fechar</Text>
                        </Pressable>
                    </View>
                </Modal>

            </View>

            {/* Botão de adicionar sala */}
            <TouchableOpacity
                style={style.roundButton}
                onPress={() => props.navigation.navigate("RegisterPage")}
            >
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
        </>
    );
};
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28364C',
        alignItems: 'center',
        justifyContent: 'center',

    },

    viewLogo: {
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
        fontSize: 34,
        fontWeight: '700',
        marginTop: 60,
        marginRight: 50,
        marginLeft: 105,
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