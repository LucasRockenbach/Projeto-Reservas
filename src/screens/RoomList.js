import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button,  RefreshControl, ScrollView} from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import Botton from "../components/botton"
import { FontAwesome } from "@expo/vector-icons";



export default props => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const toggleCard = index => {
      setExpandedCardIndex(index === expandedCardIndex ? null : index);
    };

    const URL = "https://localhost:7198/api/sala";


    const getRoom = async () => {
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
        <View style={styles.cont}>
        <Text style={styles.texto}>Salas Criadas</Text>
        </View>
            <View style={styles.container}>
      {data.length === 0 ? (
        <Text>Você não possui nenhuma sala cadastrada ainda</Text>
      ) : (
        data.map((data, index) => (
          <View key={index} style={styles.roomCard}>
            <TouchableOpacity onPress={() => toggleCard(index)}>
              <Text>{data.name}</Text>
            </TouchableOpacity>
            {expandedCardIndex === index && (
              <View>
                <Text>Total de lugares: {data.totalLugares}</Text>
                <Text>Andar: {data.andar}</Text>
                <Text>Bloco: {data.bloco}</Text>
                  <Text>Descrição: {data.descricao.substring(0, 50)}</Text>
                {/* Limita a descrição a 20 caracteres */}
              </View>
            )}
          </View>
        ))
      )}
          <TouchableOpacity style={styles.roundButton} onPress={() =>navigation.navigate("addRoom")}>
  <FontAwesome name="plus" size={24} color="white" />
</TouchableOpacity>
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
    roomCard: {
      backgroundColor: '#CCCCCC',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      width: '100%',
    },
    buttonContainer: {
      marginTop: 20,
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
    fontFamily: 'Inter',
    marginLeft: 99,
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
  });

 /* <TouchableOpacity style={styles.roundButton} onPress={() =>navigation.navigate("addRoom")}>
  <FontAwesome name="plus" size={24} color="white" />
</TouchableOpacity> */