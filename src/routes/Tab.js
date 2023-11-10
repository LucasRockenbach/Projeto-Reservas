import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import UserList from "../screens/UserList"
import Home from "../screens/Home"
import StackRoom from "./Stack/StackRoom"
import StackUser from "./Stack/StackUser"
import StackReserva from "./Stack/StackReserva"

const Tab = createBottomTabNavigator()

export default props => (
    <Tab.Navigator screenOptions={{
        tabBarLabelStyle: {fontSize: 50},
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#28364D',
        headerShown: false,
        tabBarShowLabel: false

        
    }}>
        <Tab.Screen 
            name="Salas" 
            component={StackRoom} 
            options={{
                tabBarLabel: 'User',
                tabBarIcon: ({color, size})=>(
                    <FontAwesome name="home" color={color} size={size} />
                )
            }}      
        />
        <Tab.Screen 
            name="Reserva" 
            component={StackReserva}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) =>(
                    <FontAwesome name="list" color={color} size={size} />
                )
            }}
        />
        <Tab.Screen 
            name="Usuario" 
            component={StackUser} 
            options={{
                tabBarLabel: 'User',
                tabBarIcon: ({color, size})=>(
                    <FontAwesome name="user" color={color} size={size} />
                )
            }}      
        />
        
    </Tab.Navigator>
)