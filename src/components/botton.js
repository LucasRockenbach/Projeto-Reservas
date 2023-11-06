import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';

export default props=>(
        <View >
            <TouchableOpacity onPress={props.funcao} style={formatacao.botaoSecundario}>
                <View >
                    
                <Text style={formatacao.textoBotaoSecundario}>
                    {props.textoBotao}
                    
                </Text>
                </View>
            </TouchableOpacity> 
      
        </View>
)

    
       
    


  

const formatacao = StyleSheet.create({
    botaoSecundario:{
        margin: 20,
        backgroundColor: '#078F2D',
        height: 60,
        width: 240,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotaoSecundario:{
        color: 'white',
        fontSize: 20,
    }
})