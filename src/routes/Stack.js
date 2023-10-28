/*import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RegisterPage from "../screens/RegisterPage"
import LoginPage from "../screens/loginPage"
import Home from "../screens/Home"
import AddRoom from "../screens/addRoom"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"


const Stack = createNativeStackNavigator()

export default props =>(

            <Stack.Navigator initialRouteName="loginPage" screenOptions={{headerShown: false}}>
        <Stack.Screen name="loginPage" 
            options={{title:"tela login"}}
        >
            {
                props => (
                    
                    <LoginPage {...props}/>
                    
                )
            }
        </Stack.Screen>
        
        <Stack.Screen name="RegistePage">
            {
                props => (
                    
                        <RegisterPage {...props}/>
                    
                )
            }
        </Stack.Screen>
        <Stack.Screen name="Home">
            {
                props => (
                    
                        <Home {...props}/>
                    
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
    
)*/