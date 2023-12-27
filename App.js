
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import UserDashboardScreen from './src/screens/UserDashboardScreen';


const navigator = createStackNavigator(
{
	Home: HomeScreen,
	Login: LoginScreen,
	Signup: SignupScreen,
	ForgetPassword: ForgetPasswordScreen,
	Logout: LogoutScreen,
    UserDashboard: UserDashboardScreen,
},
{
	initialRouteName: "Home",
    headerMode: 'none',
});

export default createAppContainer(navigator);