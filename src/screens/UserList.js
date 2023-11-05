import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import Botton from "../components/botton"
import Logo from '../components/logo';

export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

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
            <Logo />
            {isLoading ? (
                <ActivityIndicator size={80}></ActivityIndicator>
            ) : (
                <FlatList 
                    data={data}
                    keyExtractor={({id})=>id}
                    renderItem={ ({item})=>(
                        <Text>
                            - nome: {item.nome} - email: {item.email} - Telefone: {item.telefone} 
                        </Text>
                    )
                    }
                />
            )
            }
            <Button title="Atualizar" onPress={ () => getUsers()} />
            <View>
                <Botton textoBotao={"Cadastrar"} funcao={
                    () => {
                        props.navigation.navigate("RegisterPage")

                    }

                } />
            </View>
        </View>
    )
}
const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#28364C',
            alignItems: 'center',
            justifyContent: 'center'
          },

})