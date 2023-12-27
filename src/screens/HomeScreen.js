// ALI HASSAN: Import React and React-Native Library Packages
import React, {useEffect} from "react";
import {StyleSheet, View} from 'react-native';

// IMPORT FIREBASE Auth and Database
import {Auth} from './../firebase-config/Firebase';

// Default Export Function of HomeScreen
export default function HomeScreen({navigation})
{	
    // ALI HASSAN: useEffect Hook to Check whether User is LoggedIn or Not. 
    // ALI HASSAN: Navigate to Dashboard if LoggedIn. Navigate to LoginScreen id Not LoggedIn
	useEffect ( ()=>
    {
		const Session = Auth.onAuthStateChanged(
		(user) => 
        {
			if (user)
			{
				navigation.navigate("UserDashboard");
			}
			else
			{
				navigation.navigate("Login");
			}
		});

		return Session;
    },[]);

	return(
        <View>

        </View>
    );
};

const styles = StyleSheet.create
({

});