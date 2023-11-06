import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import Botton from "../components/botton"
import Logo from '../components/logo';
import { RefreshControl } from "react-native-gesture-handler"

export default props => {
    const {state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);

    const URL = "https://localhost:7198/api/usuario";


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
                    onPress={()=>props.navigation.navigate("UserForm", user)}
                />
            </ListItem>
        )
    }

    const atualiza = ()=>{
        setIsRefreshing(true)
        props.navigation.push("GetUsersAPI")
        setIsRefreshing(false)
    }

    return(
        <View>
            <FlatList 
                keyExtractor={ user => user.id}
                renderItem={getUserItem}
                refreshControl={
                    <RefreshControl
                        onRefresh={atualiza}
                        refreshing={isRefreshing}
                    />
                }
            />
        </View>
    )
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
})