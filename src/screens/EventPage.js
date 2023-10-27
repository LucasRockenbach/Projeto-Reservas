/*import { View,  StyleSheet, TextInput, ActivityIndicator } from "react-native"
import NavBar from "../components/navBar"
import Botton from "../components/botton"
  

export default props =>(

    <View style={{justifyContent: "space-around"}}>
        <View > 
        
            <NavBar funcao={
                ()=>props.navigation.openDrawer() 
            }/>
        </View>
        <View style={style.container} >
            <TextInput
            placeholder='Reservista'
            style = {style.inputLogin}
            keyboardType='name-phone-pad'/>
            <TextInput
            placeholder='Descrição'
            style = {style.inputLogin}
            keyboardType='numeric'/>

            
            <TextInput 
                placeholder='Sala'
                style={style.inputLogin}
                keyboardType={'email-address'}
            />
            <Botton textoBotao={"cadastrar"} />

            {/*<ActivityIndicator size={"large"}/>*/

    
/*
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
      datePickerStyle: {
        width: 230,
      },
    



}) */