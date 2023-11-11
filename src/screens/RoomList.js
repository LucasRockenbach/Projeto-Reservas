/*import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button,  RefreshControl, ScrollView} from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import { FontAwesome } from "@expo/vector-icons";
import UserContext from "../context/userContext"

export default props => {

  const {state, dispatch} = useContext(UserContext)
    //console.warn(Object.keys(cont.state))
    const [isRefreshing, setIsRefreshing] = useState(false);

    const deleteUser = async (user) =>{
        const URL = 'http://10.133.32.170:3000/api/usuario/' + user.id

        const options = {
            method: 'DELETE'
        }

        fetch(URL, options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Resposta da requisição: ", responseData)
                Alert.alert(
                    'Exclusão!',
                    'Usuário excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            onPress: () => props.navigation.push('UserList')
                        }
                    ]
                )
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }

    function deleteConfirm(user){
        Alert.alert('Excluir usuário!', 'Tem certeza que deseja excluir o usuário?',
        [
            {
                text: "Sim",
                onPress(){
                    //console.warn("Excluido o id: " + user.id)
                    deleteUser(user)
                }
            },
            {
                text: "Não"
            }
        ]
        )
    }
 



  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const toggleCard = index => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);
  };

  const URL = "https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala";


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
    getRoom().then(() => setRefreshing(false));
};

  useEffect(()=>{
      getRoom();
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
            <Text>{data.nome}</Text>
          </TouchableOpacity>
          {expandedCardIndex === index && (
            <View>
              <Text>Total de lugares: {data.capacidade}</Text>
              <Text>Andar: {data.andar}</Text>
              <Text>Bloco: {data.bloco}</Text>
                <Text>Descrição: {data.descricao.substring(0, 50)}</Text>
              {/* Limita a descrição a 20 caracteres }
            </View>
          )}
        </View>
      ))
    )}
        <TouchableOpacity style={styles.roundButton} onPress={() => props.navigation.navigate("addRoom")}>
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

import { View, StatusBar, Text, StyleSheet, Alert,Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import Botton from "../components/botton"
import Logo from '../components/logo';
import { RefreshControl } from "react-native-gesture-handler"
import { FontAwesome } from "@expo/vector-icons";

export default props => {
    const {state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const URL = "https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala";


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

    const deleteUser = async (user) =>{
        const URL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/sala/' + user.idSala

        const options = {
            method: 'DELETE'
        }

        fetch(URL, options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Resposta da requisição: ", responseData)
                Alert.alert(
                    'Exclusão!',
                    'Usuário excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            onPress: () => props.navigation.push('RoomList')
                        }
                    ]
                )
            })
            .catch(error => {
                console.error('Erro: ', error)
            })
    }

    function deleteConfirm(user){
        Alert.alert('Excluir usuário!', 'Tem certeza que deseja excluir o usuário?',
        [
            {
                text: "Sim",
                onPress(){
                    //console.warn("Excluido o id: " + user.id)
                    deleteUser(user)
                }
            },
            {
                text: "Não"
            }
        ]
        )
    }




    function getUserItem({item: user}){
        return(
            <ListItem
            >
                <ListItem.Content>
                    <ListItem.Title>{user.nome}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron 
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={()=>props.navigation.navigate("Room", user)}
                />
                <ListItem.Chevron 
                    name="delete"
                    color="red"
                    size={25}
                    onPress={()=> {deleteConfirm(user)}}
                />
            </ListItem>
           
        );
    };

    const atualiza = ()=>{
        setIsRefreshing(true)
        getUsers()
        setIsRefreshing(false)
    }

    return(
        <>
         <View style={style.cont}>
      <Text style={style.texto}>Salas Criadas</Text>
      </View>
        <View>
            <FlatList 
                data={data}
                renderItem={getUserItem}
            />
        </View>
        <TouchableOpacity style={style.roundButton} onPress={() => props.navigation.navigate("addRoom")}>
<FontAwesome name="plus" size={24} color="white" />
</TouchableOpacity>
       </> 
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
})


