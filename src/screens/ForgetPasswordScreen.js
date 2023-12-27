// ALI HASSAN: Import React & React-Native Library Packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
// ALI HASSAN: IMPORT FIREBASE Authentication
import { Auth } from './../firebase-config/Firebase';
// ALI HASSAN: Import Manually Created Components
import UnloggedHeaderScreen from './../components/UnloggedHeaderScreen';

// ALI HASSAN: Default Export Function of ForgetPasswordScreen
export default function ForgetPasswordScreen({navigation})
{
    // ALI HASSAN: useState Variables Declaration and Initialization
    const [emailAddress, setEmailAddress] = useState("");
    const [validateEmailAddressText, setValidateEmailAddressText] = useState("*");
    const [authFailedText, setAuthFailedText] = useState("");

    // ALI HASSAN: validateEmailAddress Function to Check Whetehr User Input Correct Syntax of Email Address or Not
    const validateEmailAddress = (inputValue) =>
    {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setAuthFailedText("");

        if (!(reg.test(inputValue)))
        {
            setValidateEmailAddressText("Invalid Email Address");
        }
        else
        {
            setValidateEmailAddressText("");
        }

        setEmailAddress(inputValue);
    }

    // ALI HASSAN: PasswordRecoveryFunction to Send An Email to User to Recover Password in Case of Password Lost
    const PasswordRecoveryFunction = () =>
    {
        Auth.sendPasswordResetEmail(emailAddress)
        .then( () => 
        {
            alert("Password Reset Link Has Been Sent on Your Email");
            navigation.navigate("Login");
        })
        .catch((error) => {
            setAuthFailedText("Invalid Email / Email is Not Registered");
        })
    }

    // ALI HASSAN: useEffect Hook to Check Whether User is LoggedIn or Not. Navigate to Dashboard if LoggedIn
    useEffect ( ()=>
    {
		const Session = Auth.onAuthStateChanged(
		user => 
        {
			if (user)
			{
				navigation.navigate("UserDashboard");
			}
		});

		return Session;
    },[]);

    // ALI HASSAN: Return Value of ForgetPasswordScreen
    return (
        <View style={styles.containerStyle}>
            <UnloggedHeaderScreen />

            <View style={styles.resetPasswordFormStyle}>
                <Text style={styles.resetPasswordFormTitleStyle}>
                    RESET PASSWORD
                </Text>

                <Text style={styles.authFailedTextStyle}>
                    {authFailedText}
                </Text>

                <View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.resetPasswordFormInputNameStyle}>
                            Email Address:
                        </Text>
                        <Text style={styles.asteriskStyle}>
                            {validateEmailAddressText}
                        </Text>
                    </View>
                    <TextInput 
                        style = {styles.resetPasswordFormInputFieldStyle}
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                        textContentType = "emailAddress"
                        keyboardType = "email-address"
                        placeholder = "Email Address"
                        placeholderTextColor = "white"
                        value = {emailAddress}
                        onChangeText = { validateEmailAddress }
                    />
                </View>

                <View>
                    <TouchableOpacity 
                        style = {styles.resetPasswordFormButtonStyle}
                        onPress = { PasswordRecoveryFunction }
                    >
                        <Text style={styles.resetPasswordFormButtonTextStyle}>
                            Send Password Reset Mail
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.resetPasswordFormAlternateStyle}>
                        <Text style={styles.resetPasswordFormAlternateTextStyle}>
                            Remember Your Password?  
                        </Text>
                        <TouchableOpacity 
                            style = {styles.resetPasswordFormAlternateLinkButtonStyle}
                            onPress = {()=>navigation.navigate('Login')}
                        >
                            <Text style={styles.resetPasswordFormAlternateLinkTextStyle}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

// ALI HASSAN: CSS StyleSheet of ForgetPasswordScreen
const styles =StyleSheet.create(
{
    containerStyle:
    {
        backgroundColor: "black",
        flex: 1,
    },

    resetPasswordFormStyle:
    {
        backgroundColor: "black",
        flex: 1,
    },

    resetPasswordFormTitleStyle:
    {
        fontFamily: "sans-serif",
        fontSize: 32,
        fontWeight: "bold",
        color: "rgb(168, 4, 7)",
        alignSelf: "center",
    },

    resetPasswordFormInputNameStyle:
    {
        color: "white",
        fontWeight: "bold",
        marginTop: "3%",
        marginBottom: "2%",
        marginLeft: "5%",
        fontSize: 20,
    },

    resetPasswordFormInputFieldStyle:
    {
        color: "white",
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: "5%",
        marginHorizontal: "5%",
        height: "28%",
        fontSize: 16,
    },

    authFailedTextStyle:
    {
        color: "rgb(168, 4, 7)",
        fontWeight: "bold",
        marginHorizontal: "5%",
        marginTop: "2%",
    },

    asteriskStyle:
    {
        color: "rgb(168, 4, 7)",
        fontWeight: "bold",
        marginTop: "3%",
        marginLeft: "1%",
    },

    resetPasswordFormButtonStyle:
    {
        backgroundColor: "rgb(168, 4, 7)",
        marginHorizontal: "5%",
        marginTop: "37%",
        borderRadius: 25,
    },

    resetPasswordFormButtonTextStyle:
    {
        color: "white",
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        padding: "2%",
    },

    resetPasswordFormAlternateStyle:
    {
        flexDirection: "row",
        alignSelf: "center",
    },

    resetPasswordFormAlternateTextStyle:
    {
        color: "white",
        alignSelf: "center",
        marginVertical: "5%",
    },

    resetPasswordFormAlternateLinkButtonStyle:
    {
        backgroundColor: "white",
        borderRadius: 25,
        width: "18%",
        height: "50%",
        marginVertical: "5%",
        marginHorizontal: "1%",
        padding: "1%",
    },

    resetPasswordFormAlternateLinkTextStyle:
    {
        color: "rgb(168, 4, 7)",
        alignSelf: "center",
    }
});