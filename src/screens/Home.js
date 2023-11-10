import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { FontAwesome } from "@expo/vector-icons"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"

export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const URL = "https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/reserva/";


    const getMovies = async () => {
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
        getMovies();
    }, [])

    return(
        <>
            <View>
                <NavBar></NavBar>

                {isLoading ? (
                    <ActivityIndicator size={80}></ActivityIndicator>
                ) : (
                    <FlatList 
                        data={data}
                        keyExtractor={({id})=>id}
                        renderItem={ ({item})=>(
                            <Text>
                                - nome: {item.nome} - capacidade: {item.capacidade} - descricao: {item.descricao} 
                            </Text>
                        )
                        }
                    />
                )
                }
                <Button title="Atualizar" onPress={ () => getMovies()} />
            </View>
            <TouchableOpacity style={style.roundButton} onPress={() => props.navigation.navigate("EventPage")}>
<FontAwesome name="plus" size={24} color="white" />
</TouchableOpacity>
        </>
    )
}
const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30

    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'row'
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