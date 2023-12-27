// ALI HASSAN: Import React and React-Native Library Packages
import React, {useEffect} from "react";
import {StyleSheet, View} from 'react-native';

// IMPORT FIREBASE Auth and Database
import { Auth } from './../firebase-config/Firebase';

// Default Export Function of LogoutScreen
export default function LogoutScreen({navigation})
{	
    // ALI HASSAN: useEffect Hook to Navigate User to Login Screen After His Session is Ended
	useEffect ( ()=>
    {
		const Session = Auth.onAuthStateChanged(
		(user) => 
        {
			if (user)
			{
                Auth.signOut()
                .then ( () =>
                {
                    alert("Signed Out...!!!");
                    navigation.navigate("Login");
                })
                .catch ( () =>
                {
                    alert("An Error Occured");
                })
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