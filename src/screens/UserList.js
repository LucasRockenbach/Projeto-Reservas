import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button  } from "react-native"
import NavBar from "../components/navBar"
import { ListItem } from "@rneui/base"
import { useEffect, useState, useContext } from "react"
import UserContext from "../context/userContext"
import Botton from "../components/botton"
import { RefreshControl } from "react-native-gesture-handler"

export default props => {
    const {state, dispatch} = useContext(UserContext)
    const [isRefreshing, setIsRefreshing] = useState(false);

    function getUserItem({item: user}){
        return(
            <ListItem
            >
                <ListItem.Content>
                    <ListItem.Title>{user.nome}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron 
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={()=>props.navigation.navigate("UserForm", user)}
                />
            </ListItem>
        )
    }

    const atualiza = ()=>{
        setIsRefreshing(true)
        props.navigation.push("GetUsersAPI")
        setIsRefreshing(false)
    }

    return(
        <View>
            <FlatList 
                keyExtractor={ user => user.id}
                renderItem={getUserItem}
                refreshControl={
                    <RefreshControl
                        onRefresh={atualiza}
                        refreshing={isRefreshing}
                    />
                }
            />
        </View>
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




})