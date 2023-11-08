import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RoomList from "../../screens/RoomList"
import AddRoom from "../../screens/addRoom"

const Stack = createNativeStackNavigator()

export default props =>(

    <Stack.Navigator  screenOptions={{headerShown: false}}>
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
</Stack.Navigator>
    
)