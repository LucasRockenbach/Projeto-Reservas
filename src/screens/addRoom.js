/*import { View,  StyleSheet, TextInput } from "react-native"
import NavBar from "../components/navBar"
import Botton from "../components/botton"
import { useContext } from "react"
import UserContext from "../context/userContext"
import { useState } from "react" */
import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import Botton from "../components/botton"

/*export default ({route, navigation}) => {
    const {dispatch} = useContext(UserContext)
    const [roomParam, setUserParam] = useState( {}) */

    export default  ()=> {
        const [roomParam, setRoomParam] = useState({})
      const doPost = () => {


        URL = 'https://localhost:7198/api/sala'
        const dadosParaEnviar = {
            idSala: roomParam.id,
            nome: roomParam.nome,
            capacidade: roomParam.capacidade,
            descricao: roomParam.descricao,
            bloco: roomParam.bloco,
            andar: roomParam.andar,
            numero: roomParam.numero,
        }

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosParaEnviar)
        };

        fetch(URL, options)
        .then(
            (response)=>{
                if(!response.ok){
                    throw new Error('A solicitação via POST falhou!')
                }
                return response.json();
            }
        ).then(
            (dadosRecebidos) => {
                console.log('Resposta do servidor: ', dadosRecebidos)
                
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )}

        return(
<View>
        <View > 
            <NavBar/>
        </View>
        <View style={style.container} >
            <TextInput
            placeholder='nome'
            style = {style.inputLogin}
            keyboardType='name-phone-pad'
            value={roomParam.nome}
            onChangeText={ nome => setroomParam({...roomParam, nome}) }/>

            <View style={{flexDirection: "row", justifyContent: "space-around" }}>
                <TextInput
                placeholder='capacidade'
                style = {style.inputs}
                keyboardType='numeric'
                value={roomParam.capacidade}
                onChangeText={ capacidade => setroomParam({...roomParam, capacidade}) }/>
                
                <TextInput 
                    placeholder='bloco'
                    style={style.inputs}
                    keyboardType={'email-address'}
                    value={roomParam.bloco}
                    onChangeText={ bloco => setroomParam({...roomParam, bloco}) }
                />
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                <TextInput 
                    placeholder='andar'
                    style={style.inputs}
                    keyboardType={'numeric'}
                    value={roomParam.andar}
            onChangeText={ andar => setroomParam({...roomParam, andar}) }
                /> 
                <TextInput 
                    placeholder='N°'
                    style={style.inputs}
                    keyboardType={'numeric'}
                    value={roomParam.numero}
            onChangeText={ numero => setRoomParam({...roomParam, numero}) }
                /> 
            </View>
                
           
            <View>
                <TextInput
                placeholder='Descrição'
                style = {style.inputLogin}
                keyboardType='name-phone-pad'
                value={roomParam.descricao}
                onChangeText={ descricao => setRoomParam({...roomParam, descricao}) }/>
            </View>
            
            
            <Botton textoBotao={"Cadastrar"} funcao={
                ()=>{ doPost(), props.navigation.navigate("RoomList")

                }

            }>

            </Botton>
        </View>
     </View>  
        )
    

}


   
    
    


const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 140

    },
    inputLogin:{
        height: 60,
        width: 250,
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 20
      },
      inputs:{
        height: 60,
        width: 105,
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 20
      }
    



})
    
