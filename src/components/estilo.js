import { StyleSheet } from "react-native";

export default StyleSheet.create({

    homeContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#28364C",
    },
    navBarHome:{
        width: '100%',
        height: 50, // Altura da NavBar
        position: 'absolute',
        top: 0, // Mover para o topo da tela
    
    },
    homeCard: {
        backgroundColor: '#CCCCCC',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        width: '50%',
      },
      buttonHome:{
        backgroundColor: "#465881",
        color: "#084160",
    },
})