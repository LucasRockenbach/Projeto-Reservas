import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RoomList from "../../screens/RoomList"
import AddRoom from "../../screens/addRoom"
import Room from "../../screens/Room"
import loginPage from "../../screens/loginPage"

const Stack = createNativeStackNavigator()

export default props =>(

    <Stack.Navigator initialRouteName="loginPage" screenOptions={{headerShown: false}}>
        
        <Stack.Screen name="loginPage" component={loginPage}>
        {
        
        }
    </Stack.Screen>

    <Stack.Screen name="RoomList">
        {
            props => (
                
                    <RoomList {...props}/>
                
            )
        }
    </Stack.Screen>
    <Stack.Screen name="addRoom">
        {
            props => (
                
                    <AddRoom {...props}/>
                
            )
        }
    </Stack.Screen>
    <Stack.Screen name="Room">
        {
            props => (
                
                    <Room {...props}/>
                
            )
        }
    </Stack.Screen>


    
</Stack.Navigator>
    
)