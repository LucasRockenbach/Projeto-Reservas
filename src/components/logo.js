import { View, StyleSheet, Text, Image } from 'react-native';

export default props => (
    <View style={style.ImageComponent}>
        <Image style={style.Logo} source={require('../assets/Embrapa.png')} />
    </View>
)
const style = StyleSheet.create ({

    Logo:{
        height: 200,
        width: 350,
    },
    ImageComponent:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        bottom: 50,
        borderRadius: 50,
    }
})