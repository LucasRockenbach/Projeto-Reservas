import { View, StatusBar, Text, StyleSheet, Alert,Image, FlatList, ActivityIndicator, Button, RefreshControl, TouchableOpacity  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import Botton from "../components/botton"
import Logo from '../components/logo';
import { FontAwesome } from "@expo/vector-icons";


export default props => {
    const {state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const URL = "https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/usuario";


    const getUsers = async () => {
        try{
            const response = await fetch(URL);
            const json = await response.json();
            console.log(json);
            setData(json);
        } catch(error) {
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getUsers();
    }, [])

    const deleteUser = async (user) =>{
        const URL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/usuario/' + user.idUsuario 

        const options = {
            method: 'DELETE'
        }

        fetch(URL, options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
                return response.json();
            })
            .then(responseData => {
                Alert.alert(
                    'Exclusão!',
                    'Usuário excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            onPress: () => props.navigation.push('UserList')
                        }
                    ]
                )
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }

    function deleteConfirm(user){
        Alert.alert('Excluir usuário!', 'Tem certeza que deseja excluir o usuário?',
        [
            {
                text: "Sim",
                onPress(){
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
    function getUserItem({item: user}){
        return(
            <ListItem

            >
                <ListItem.Content>
                    <ListItem.Title>{user.nome}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={()=>props.navigation.navigate("EditUser", {user})}
                />
                <ListItem.Chevron 
                    name="delete"
                    color="red"
                    size={25}
                    onPress={()=> {deleteConfirm(user)}}
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
            <View style={style.cont}>
                <Text style={style.texto}>Usuarios Cadastrados</Text>
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