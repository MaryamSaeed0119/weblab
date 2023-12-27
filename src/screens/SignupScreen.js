//  Import React & React-Native Library Packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
//  Import Feather Icons
import { Feather } from '@expo/vector-icons';
//  IMPORT FIREBASE Authentication
import { Auth } from './../firebase-config/Firebase';
//  Import Manually Created Components
import UnloggedHeaderScreen from './../components/UnloggedHeaderScreen';

export default function LoginScreen({navigation})
{
    //  useState Variables Declaration and Initialization
    const [emailAddress, setEmailAddress] = useState("");
    const [validateEmailAddressText, setValidateEmailAddressText] = useState("*");
    const [password, setPassword] = useState("");
    const [validatePasswordText, setValidatePasswordText] = useState("*");
    const [showHidePassword, setShowHidePassword] = useState(true);
    const [signupFailedText, setSignupFailedText] = useState("");

    //  validateEmailAddress Function to Check if Symtax of Email Adress is Valid or Not
    const validateEmailAddress = (inputValue) =>
    {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setSignupFailedText("");

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

    //  validatePassword Function to Check if Syntax of Password Contains Atleast 8 AlphaNumeric Characters or Not
    const validatePassword = (inputValue) =>
    {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        setSignupFailedText("");
        
        if (!(reg.test(inputValue)))
        {
            setValidatePasswordText("Invalid Password");
        }
        else
        {
            setValidatePasswordText("");
        }
        
        setPassword(inputValue);
    }

    //  showHidePasswordFunction to Change the State of showHidePassword useState Variable
    const showHidePasswordFunction = () =>
    {
        setShowHidePassword(!(showHidePassword));
    }

    //  SignupFunction Function to Create/Register New Account on Friendly-Share
    const SignupFunction = () =>
    {
        Auth.createUserWithEmailAndPassword(emailAddress, password)
        .then(userCredentials => 
        {
            alert("Account Registered Successfully");
            navigation.navigate("Login");
        })
        .catch((error) => {
            setSignupFailedText("Account Registration Error Occured");
        })
    }

    //  useEffect to Check if User is LoggedIn or Not. Navigate to Dashboard if User is LoggedIn
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

    //  Return Value of SignupScreen
    return (
        <View style={styles.containerStyle}>
            <View style={styles.signupFormStyle}>
                <Text style={styles.signupFormTitleStyle}>
                    SIGN UP
                </Text>

                <Text style={styles.signupFailedTextStyle}>
                    {signupFailedText}
                </Text>

                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Email Address:
                        </Text>
                        <Text style={styles.asteriskStyle}>
                            {validateEmailAddressText}
                        </Text>
                    </View>
                    <TextInput 
                        style = {styles.inputField}
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                        textContentType = "emailAddress"
                        keyboardType = "email-address"
                        placeholder = "Email Address"
                        placeholderTextColor = "gray"
                        value = {emailAddress}
                        onChangeText = { validateEmailAddress }
                    />

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Password: 
                        </Text>
                        <Text style={styles.asteriskStyle}>
                            {validatePasswordText}
                        </Text>
                    </View>
                    
                    {
                        showHidePassword == true
                        ?   <TextInput style = {styles.inputField}
                                secureTextEntry = {true}
                                autoCapitalize = 'none'
                                autoCorrect = {false}
                                placeholder = "Password (Min: 8 AlphaNumerics)"
                                placeholderTextColor = "gray"
                                value = {password}
                                onChangeText = { validatePassword }
                            />
                        :   <TextInput style = {styles.inputField}
                                secureTextEntry = {false}
                                autoCapitalize = 'none'
                                autoCorrect = {false}
                                placeholder = "Password (Min: 8 AlphaNumerics)"
                                placeholderTextColor = "gray"
                                value = {password}
                                onChangeText = { validatePassword }
                            />
                    }
                    <TouchableOpacity style={styles.showHidePasswordButtonStyle} onPress={showHidePasswordFunction}>
                        {
                            showHidePassword == true
                            ?   <Feather style={styles.showHidePasswordStyle} name="eye" />
                            :   <Feather style={styles.showHidePasswordStyle} name="eye-off" />
                        }
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity 
                        style = {styles.signupButtonStyle}
                        onPress = { SignupFunction }
                    >
                        <Text style={styles.signupButtonTextStyle}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.alternateLinkContainer}>
                        <Text style={styles.alternateLinkText}>
                            Already Have An Account?  
                        </Text>
                        <TouchableOpacity 
                            style = {styles.alternateLinkButtonStyle}
                            onPress = {()=>navigation.navigate('Login')}
                        >
                            <Text style={styles.alternateLinkButtonText}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

//  CSS StyleSheet of SignupScreen
const styles =StyleSheet.create(
{
    containerStyle:
    {
        backgroundColor: "white",
        flex: 1,
        padding: 20,
    },

    signupFormStyle:
    {
        backgroundColor: "white",
        flex: 1,
    },

    signupFormTitleStyle:
    {
        fontFamily: "sans-serif",
        fontSize: 32,
        fontWeight: "bold",
        color: "black",
        alignSelf: "center",
        marginBottom: 20,
    },

    inputContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },

    inputLabel: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        flex: 1,
    },

    inputField: {
        color: "black",
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        fontSize: 16,
    },

    signupFailedTextStyle:
    {
        color: "red",
        fontWeight: "bold",
        marginVertical: 10,
    },

    asteriskStyle:
    {
        color: "red",
        fontWeight: "bold",
        marginLeft: 5,
    },

    showHidePasswordButtonStyle:
    {
        marginTop: -30,
        marginRight: 10,
        alignSelf: "flex-end",
    },

    showHidePasswordStyle:
    {
        color: "black",
        fontSize: 22,
    },

    signupButtonStyle:
    {
        backgroundColor: "rgb(168, 4, 7)",
        marginVertical: 20,
        borderRadius: 25,
        paddingVertical: 12,
    },

    signupButtonTextStyle:
    {
        color: "white",
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
    },

    alternateLinkContainer:
    {
        flexDirection: "row",
        alignSelf: "center",
    },

    alternateLinkText:
    {
        color: "black",
        alignSelf: "center",
        marginVertical: 10,
    },

    alternateLinkButtonStyle:
    {
        backgroundColor: "black",
        borderRadius: 25,
        width: "18%",
        height: "50%",
        marginVertical: 10,
        marginHorizontal: 5,
        paddingVertical: 5,
    },

    alternateLinkButtonText:
    {
        color: "white",
        alignSelf: "center",
    }
});