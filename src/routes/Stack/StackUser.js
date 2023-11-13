import { createNativeStackNavigator } from "@react-navigation/native-stack"
import UserList from "../../screens/UserList"
import RegisterPage from "../../screens/RegisterPage"
import EditUser from "../../screens/EditUser"
const Stack = createNativeStackNavigator()

export default props =>(

    <Stack.Navigator  screenOptions={{headerShown: false}}>
    <Stack.Screen name="UserList">
        {
            props => (
                
                    <UserList {...props}/>
                
            )
        }
    </Stack.Screen>
    <Stack.Screen name="RegisterPage">
        {
            props => (
                
                    <RegisterPage {...props}/>
                
            )
        }
    </Stack.Screen>
    <Stack.Screen name="EditUser">
        {
            props => (
                
                    <EditUser {...props}/>
                
            )
        }
    </Stack.Screen>
    
</Stack.Navigator>
    
)