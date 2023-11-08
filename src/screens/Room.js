import { View, StatusBar, Text, StyleSheet, Image,TextInput, TouchableOpacity, FlatList, ActivityIndicator, Button,  RefreshControl, ScrollView} from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import Botton from "../components/botton"
import { FontAwesome } from "@expo/vector-icons";
import NavBar2 from "../components/navBar2"



export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const toggleCard = index => {
      setExpandedCardIndex(index === expandedCardIndex ? null : index);
    };

    const URL = "https://localhost:7198/api/sala";


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
    const onRefresh = () => {
      setRefreshing(true);
      getMovies().then(() => setRefreshing(false));
  };

    useEffect(()=>{
        getMovies();
    }, [])

    return(
        <>
        <View style={styles.cont2}>
        <View style={styles.cont}>
        <Text style={styles.texto}>Sala 1</Text> 
        <Text  style={styles.descricao}>Ar condicionado, 30 lugares, refletor, lousa</Text>
        </View>

        <View style={styles.container}>
        <Text style={[styles.textocima, {marginTop: 20, }]}>Nome da sala</Text>
        <TextInput
          placeholder="Digite o nome para sala..."
          style={[styles.butao, { paddingLeft: 10, marginTop: 10 }]} // Ajuste de marginTop
          keyboardType="name-phone-pad"
          
        />
        </View>
        </View>
        </>
        
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    cont: {
      width: 395,
      height: 200,
      backgroundColor: "#FAFAFA",
      borderRadius: 30,
  },
  cont2: {
    backgroundColor: "#28364C",
    height: 1000,
},
  texto: {
    width: 266,
    height: 39,
    color: '#383838',
    fontStyle: 'normal',
    fontSize: 30,
    marginLeft: 30,
    alignItems: 'center',
    marginTop: 80,
    fontWeight: '700',
  },
  descricao: {
    width: 266,
    height: 39,
    color: '#383838',
    fontStyle: 'normal',
    fontSize: 16,
    marginLeft: 30,
    alignItems: 'center',
    marginTop: 10,
    fontWeight: '300',
  },
  container: {
    alignItems: "center",
    marginBottom: 150, // Ajuste de marginTop para mover os inputs para cima
  },
  textocima: {
    marginRight: 105,
    width: 208,
    height: 27,
    fontSize: 18,
    fontStyle: "normal",
    color: '#383838',
  },
  });
