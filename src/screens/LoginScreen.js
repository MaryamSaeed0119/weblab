//  Import React & React-Native Library Packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
//  Import Feather Icons
import { Feather } from '@expo/vector-icons';
//  IMPORT FIREBASE Authentication
import { Auth } from './../firebase-config/Firebase';
//  Import Manually Created Components
import UnloggedHeaderScreen from './../components/UnloggedHeaderScreen';

// Default Export Function of LoginScreen
export default function LoginScreen({ navigation }) {
    //  useState Variables Declaration and Initialization
    const [emailAddress, setEmailAddress] = useState("");
    const [validateEmailAddressText, setValidateEmailAddressText] = useState("*");
    const [password, setPassword] = useState("");
    const [validatePasswordText, setValidatePasswordText] = useState("*");
    const [showHidePassword, setShowHidePassword] = useState(true);
    const [authFailedText, setAuthFailedText] = useState("");

    //  validateEmailAddress Function to Check whether User Writes Correct Email or Not Syntactically
    const validateEmailAddress = (inputValue) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setAuthFailedText("");

        if (!reg.test(inputValue)) {
            setValidateEmailAddressText("Invalid Email Address");
        } else {
            setValidateEmailAddressText("");
        }

        setEmailAddress(inputValue);
    }

    //  validatePassword Function to Check whether User Input Minimum 8 Digit AlphaNumeric Password or Not
    const validatePassword = (inputValue) => {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        setAuthFailedText("");

        if (!reg.test(inputValue)) {
            setValidatePasswordText("Invalid Password");
        } else {
            setValidatePasswordText("");
        }

        setPassword(inputValue);
    }

    //  showHidePasswordFunction to Change the State of showHidePassword useState Variable
    const showHidePasswordFunction = () => {
        setShowHidePassword(!showHidePassword);
    }

    //  Login Function to Start Session of Registered and Authentic User
    const LoginFunction = () => {
        Auth.signInWithEmailAndPassword(emailAddress, password)
            .then((userCredentials) => {
                navigation.navigate("UserDashboard");
            })
            .catch((error) => {
                setAuthFailedText("Incorrect Email / Password");
            })
    }

    //  useEffect Hook to Check on ScreenLoad that is User has Session or Not. Navigate to Dashboard if User is LoggedIn
    useEffect(() => {
        const Session = Auth.onAuthStateChanged(
            user => {
                if (user) {
                    navigation.navigate("UserDashboard");
                }
            });

        return Session;
    }, []);

    //  Return Value of LoginScreen
    return (
        <View style={styles.container}>
            <View style={styles.loginForm}>
                <Text style={styles.loginFormTitle}>
                    LOGIN
                </Text>

                <Text style={styles.authFailedText}>
                    {authFailedText}
                </Text>

                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Email Address:
                        </Text>
                        <Text style={styles.asterisk}>
                            {validateEmailAddressText}
                        </Text>
                    </View>
                    <TextInput
                        style={styles.inputField}
                        autoCapitalize='none'
                        autoCorrect={false}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholder="Email Address"
                        placeholderTextColor="gray"
                        value={emailAddress}
                        onChangeText={validateEmailAddress}
                    />

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Password:
                        </Text>
                        <Text style={styles.asterisk}>
                            {validatePasswordText}
                        </Text>
                    </View>

                    {
                        showHidePassword
                            ? <TextInput
                                style={styles.inputField}
                                secureTextEntry={true}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder="Password (Min: 8 AlphaNumerics)"
                                placeholderTextColor="gray"
                                value={password}
                                onChangeText={validatePassword}
                            />
                            : <TextInput
                                style={styles.inputField}
                                secureTextEntry={false}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder="Password (Min: 8 AlphaNumerics)"
                                placeholderTextColor="gray"
                                value={password}
                                onChangeText={validatePassword}
                            />
                    }
                    <TouchableOpacity style={styles.showHidePasswordButton} onPress={showHidePasswordFunction}>
                        {
                            showHidePassword
                                ? <Feather style={styles.showHidePasswordIcon} name="eye" />
                                : <Feather style={styles.showHidePasswordIcon} name="eye-off" />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.forgetPasswordButton}
                        onPress={() => navigation.navigate('ForgetPassword')}
                    >
                        <Text style={styles.forgetPasswordText}>
                            Forget Password?
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={LoginFunction}
                    >
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.alternateContainer}>
                        <Text style={styles.alternateText}>
                            Don't Have An Account?
                        </Text>
                        <TouchableOpacity
                            style={styles.alternateLinkButton}
                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={styles.alternateLinkText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

//  CSS StyleSheet of LoginScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray",
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        
    },

    loginForm: {
        backgroundColor: "white",
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignContent: "center",
        width: "100%",
        alignItems: "center",
    },

    loginFormTitle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "black",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
    },

    inputContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },

    inputLabel: {
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
    },

    inputField: {
        color: "black",
        borderColor: 'lightgray',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        height: 40,
        fontSize: 16,
        borderRadius: 5,
    },

    authFailedText: {
        color: "red",
        fontWeight: "bold",
        marginHorizontal: 5,
        marginTop: 10,
    },

    asterisk: {
        color: "red",
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 5,
    },

    showHidePasswordButton: {
        marginTop: -30,
        marginRight: 10,
        alignSelf: "flex-end",
    },

    showHidePasswordIcon: {
        color: "black",
        fontSize: 22,
    },

    forgetPasswordButton: {
        backgroundColor: "lightblue",
        marginHorizontal: 5,
        padding: 5,
        width: "40%",
        alignSelf: "flex-end",
        borderRadius: 25,
        marginTop: 20,
    },

    forgetPasswordText: {
        fontSize: 16,
        color: "black",
        alignSelf: "flex-end",
    },

    loginButton: {
        backgroundColor: "black",
        marginHorizontal: 5,
        borderRadius: 25,
        marginTop: 20,
    },

    loginButtonText: {
        color: "white",
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        padding: 10,
    },

    alternateContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 20,
    },

    alternateText: {
        color: "black",
        alignSelf: "center",
        marginVertical: 5,
    },

    alternateLinkButton: {
        backgroundColor: "white",
        borderRadius: 25,
        width: "18%",
        height: "50%",
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5,
    },

    alternateLinkText: {
        color: "black",
        alignSelf: "center",
    }
});