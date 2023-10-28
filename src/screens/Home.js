import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { BackgroundImage, ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import estilo from "../components/estilo"

export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const URL = "https://localhost:7198/api/reserva";


    const getReservas = async () => {
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
        getReservas();
    }, [])

    return(
        <View style={estilo.homeContainer}>
            <Image source={require('../assets/Embrapa.png')}/>
            <View  style={estilo.navBarHome} >
                <NavBar/>
            </View>
            <View style={estilo.homeCard}>
            <TouchableOpacity onPress={() => toggleCard(index)}>
              <Text>AHHHHHHHHHHHHHHHHHHHH</Text>
            </TouchableOpacity>

            <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <Text>{item.text}</Text>
                    )}
            />
            </View>
            <Button style={estilo.buttonHome} title="Atualizar" onPress={() => getReservas()} />
        </View>
    )

 }

