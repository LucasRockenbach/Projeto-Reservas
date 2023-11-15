import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../../screens/Home"
import EventPage from "../../screens/EventPage"
import EditReserva from "../../screens/EditReserva"

const Stack = createNativeStackNavigator()

export default props =>(

    <Stack.Navigator  screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home">
        {
            props => (
                
                    <Home {...props}/>
                
            )
        }
    </Stack.Screen>
    <Stack.Screen name="EventPage">
        {
            props => (
                
                    <EventPage {...props}/>
                
            )
        }
    </Stack.Screen>
    <Stack.Screen name="EditReserva">
        {
            props => (
                
                    <EditReserva {...props}/>
                
            )
        }
    </Stack.Screen>
    
</Stack.Navigator>
    
)