// ALI HASSAN: Import React & React-Native Library Packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import Modal from "react-native-modal";
// ALI HASSAN: Import Feather Icons
import { Feather } from '@expo/vector-icons';
// ALI HASSAN: IMPORT FIREBASE Authentication and Database
import {Auth, Database} from './../firebase-config/Firebase';
import {collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
// ALI HASSAN: Import Axios for API Call
import axios from 'axios';
// ALI HASSAN: Import Manually Created Components
import LoggedHeaderScreen from './../components/LoggedHeaderScreen';
import RenteeProductsScreen from './../components/RenteeProductsScreen';
import RenterProductsScreen from './../components/RenterProductsScreen';

export default function UserDashboardScreen ({navigation}) 
{
    // ALI HASSAN: LoggedIn User Credentials
    const [loggedInUserID, setLoggedInUserID] = useState("");
    const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
    // ALI HASSAN: Frontend Handling Variables
    const [renterRenteeSwitch, setRenterRenteeSwitch] = useState(false);
    const [profileDataModalVisibility, setProfileDataModalVisibility] = useState(false);
    // ALI HASSAN: User Profile Data Variables for Hold Values During Editing
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // ALI HASSAN: User Profile Data Variables for Original Values
    const [userProfileDataFirstName, setUserProfileDataFirstName] = useState("");
    const [userProfileDataLastName, setUserProfileDataLastName] = useState("");

    // ALI HASSAN: Array to Declare and Initialize Price Durations
    const priceDuration = ["Hourly", "Daily", "Weekly", "Monthly"];

    // ALI HASSAN: Get and Save Logged-In User Credentials on Screen Load using useEffect Hook
    useEffect ( () =>
    {
		const Session = Auth.onAuthStateChanged( (user) => 
        {
			if (user)
			{
                setLoggedInUserID(user.uid);
                setLoggedInUserEmail(user.email);
			}
            else
            {
                navigation.navigate("Login");
            }
		});

		return Session;
    }, []);

    // ALI HASSAN: useEffect Hook to Call getUserProfileData and get API's Data when Usser-Credentials Received
    useEffect ( () =>
    {
        if (!(loggedInUserID == null || loggedInUserID == ""))
        {
            getLoggedInUserProfileData();

            // ALI HASSAN: Commented Following API's Calls for Testing
            menClothesApiData();
            womenClothesApiData();
        }

    }, [loggedInUserID]);

    // ALI HASSAN: menClothesApiData Function to Get Men's Clothes Data through API
    const menClothesApiData = async () =>
    {
        axios.get("https://fakestoreapi.com/products/category/men's%20clothing")
        .then( (response) =>
        {
            response.data.forEach( (result) => 
            {
                storeApiDataToFirestore(result);
            });
        })
        .catch( (error) =>
        {
            alert("Error Occured While Getting Men's Clothes Data from API");
        });
    }

    // ALI HASSAN: womenClothesApiData Function to Get Women's Clothes Data through API
    const womenClothesApiData = async () =>
    {
        axios.get("https://fakestoreapi.com/products/category/women's%20clothing")
        .then( (response) =>
        {
            response.data.forEach( (result) => 
            {
                storeApiDataToFirestore(result);
            });
        })
        .catch( (error) =>
        {
            alert("Error Occured While Getting Women's Clothes Data from API");
        });
    }

    // ALI HASSAN: storeApiDataToFirestore Function to Store API Fetched Data to Firebase Database Individually
    const storeApiDataToFirestore = (data) =>
    {
        // ALI HASSAN: Check if Product Already Exists
        getDocs(collection(Database, "products"))
        .then( (results) =>
        {
            var productFound = false;

            results.forEach( (result) => 
            {
                let currentIterationProduct = result.data();

                if (currentIterationProduct.renteeUserID == loggedInUserID && currentIterationProduct.productTitle == data.title)
                {
                    productFound = true;
                }
            });

            if (!(productFound))
            {
                const productPriceDuration = priceDuration[Math.floor(Math.random()*4)];

                // ALI HASSAN: Store Data to Database If Not Stored Before
                setDoc(doc(collection(Database, "products")),
                    {
                        "renteeUserID": loggedInUserID,
                        "productTitle": data.title,
                        "productDescription": data.description,
                        "productCategory": data.category,
                        "productPrice": data.price,
                        "productImage": data.image,
                        "productPriceDuration": productPriceDuration,
                    })
                .then( () =>
                {
                    alert("Product Updated Successfully...!!!");
                })
                .catch( (error) =>
                {
                    alert(error);
                })
            }
        })
        .catch( (error) =>
        {
            alert(error);
        });
    }

    // ALI HASSAN: getLoggedInUserProfileData Function to Get First-Last Name of User if Exists
    const getLoggedInUserProfileData = async () =>
    {
        getDocs(collection(Database, "user-profiles"))
        .then( (results) =>
        {
            results.forEach( (result) => 
            {
                let currentIterationUser = result.data();

                if (currentIterationUser.userID == loggedInUserID)
                {
                    setFirstName(currentIterationUser.firstName);
                    setUserProfileDataFirstName(currentIterationUser.firstName);

                    setLastName(currentIterationUser.lastName);
                    setUserProfileDataLastName(currentIterationUser.lastName);
                }
            });
        })
        .catch( (error) =>
        {
            alert(error);
        });
    }

    // ALI HASSAN: profileDataModalCancelButtonFunction Function to Dismiss the Modal
    // ALI HASSAN: Restore the First Last Name useStates to their Original Values
    const profileDataModalCancelButtonFunction = () =>
    {
        setFirstName(userProfileDataFirstName);
        setLastName(userProfileDataLastName);
        setProfileDataModalVisibility(!(profileDataModalVisibility));
    }

    // ALI HASSAN: profileDataModalUpdateButtonFunction Function to Update First-Last Name and Dismiss the Modal
    const profileDataModalUpdateButtonFunction = () =>
    {        
        // ALI HASSAN: Check whether to Edit or Update the First-Last Name
        getDocs(collection(Database, "user-profiles"))
        .then( (results) =>
        {
            var userProfileDataFound = false;

            results.forEach( (result) => 
            {
                let currentIterationUser = result.data();

                if (currentIterationUser.userID == loggedInUserID)
                {
                    userProfileDataFound = true;

                    // ALI HASSAN: Update First-Last Name if it was Already Present
                    updateDoc(doc(Database, "user-profiles", result.id), 
                        {     
                            "firstName": firstName,
                            "lastName": lastName,
                        })
                    .then( () =>
                    {
                        setUserProfileDataFirstName(firstName);
                        setUserProfileDataLastName(lastName);

                        alert("User Profile Data Updated...!!!");
                    })
                    .catch( (error) =>
                    {
                        alert(error);
                    })
                }
            });

            if (!(userProfileDataFound))
            {
                // ALI HASSAN: Add First-Last Name as New Doc in Database Collection if it was Empty Before
                setDoc(doc(collection(Database, "user-profiles")),
                    {
                        "userID": loggedInUserID,
                        "firstName": firstName,
                        "lastName": lastName
                    })
                .then( () =>
                {
                    setUserProfileDataFirstName(firstName);
                    setUserProfileDataLastName(lastName);

                    alert("User Profile Data Updated...!!!");
                })
                .catch( (error) =>
                {
                    alert(error);
                })
            }
        })
        .catch( (error) =>
        {
            alert(error);
        });

        setProfileDataModalVisibility(!(profileDataModalVisibility));
    }

    // ALI HASSAN: LogoutFunction to Logout Current LoggedIn User and End the Session
    const LogoutFunction = () => 
    {
        setProfileDataModalVisibility(!(profileDataModalVisibility));
        navigation.navigate("Logout");
    }

    // ALI HASSAN: ProfileDataModel Function Contains the Modal for First-Last Name and Logout
    const ProfileDataModal = () =>
    {
        return(
            <View>
                <Modal
                    isVisible = { profileDataModalVisibility }
                    animationIn = "slideInRight"
                    animationInTiming = {1500}
                    onRequestClose = {profileDataModalCancelButtonFunction}
                    transparent = {true}
                >
                    <View style={styles.profileDataModalContainerStyle}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.profileDataModalTitleStyle}>
                                Email
                            </Text>
                            <TextInput 
                                style = {[styles.profileDataModalInputFieldStyle, {width: "71%", color: "black"}]}
                                placeholder = "Email Address"
                                value = { loggedInUserEmail }
                                editable = {false}
                            />
                        </View>

                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.profileDataModalTitleStyle}>
                                First Name
                            </Text>
                            <TextInput 
                                style = {styles.profileDataModalInputFieldStyle}
                                placeholder = "First Name"
                                value = {firstName}
                                onChangeText = { (newValue) => { setFirstName(newValue); } }
                                editable = {true}
                            />
                        </View>
                        
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.profileDataModalTitleStyle}>
                                Last Name
                            </Text>
                            <TextInput 
                                style = {styles.profileDataModalInputFieldStyle}
                                placeholder = "Last Name"
                                value = {lastName}
                                onChangeText = { (newValue) => { setLastName(newValue); } }
                                editable = {true}
                            />
                        </View>

                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity 
                                style = {[styles.profileDataModalButtonStyle, {backgroundColor: "rgb(168, 4, 7)", borderColor: "black"}]}
                                onPress = {profileDataModalCancelButtonFunction}
                            >
                                <Text style={styles.profileDataModalButtonTextStyle}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style = {[styles.profileDataModalButtonStyle, {backgroundColor: "black", borderColor: "rgb(168, 4, 7)"}]}
                                onPress = {profileDataModalUpdateButtonFunction}    
                            >
                                <Text style={styles.profileDataModalButtonTextStyle}>
                                    Update
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style = {styles.profileDataModalLogoutButtonStyle}
                                onPress = { LogoutFunction }
                            >
                                <Text style={[styles.profileDataModalButtonTextStyle, {color: "black"}]}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    // ALI HASSAN: Return Value of UserDashboardScreen
    return (
        <View style={styles.containerStyle}>
            <LoggedHeaderScreen />

            <View style={styles.navbarStyle}>
                <View style={styles.navbarRightSideStyle}>
                    <Text style={styles.switchToRenteeTextStyle}>
                        Switch to Rentee
                    </Text>
                    <View style={styles.renterRenteeSwitchStyle}>
                        <Switch
                            trackColor = {{ false: "white", true: "black" }}
                            thumbColor = {renterRenteeSwitch ? "white" : "black"}
                            onValueChange = { () => { setRenterRenteeSwitch(!(renterRenteeSwitch)); } }
                            value = {renterRenteeSwitch}
                        />
                    </View>

                    <TouchableOpacity 
                        style = {styles.profileDataIconButtonStyle} 
                        onPress={ () => { setProfileDataModalVisibility(!(profileDataModalVisibility)); } }
                    >
                        <Feather style={styles.profileDataIconStyle} name="user" />
                    </TouchableOpacity>
                </View>
            </View>

            <ProfileDataModal />

            {(renterRenteeSwitch == true) 
                ? <RenteeProductsScreen loggedInUserID={loggedInUserID} /> 
                : <RenterProductsScreen loggedInUserID={loggedInUserID} /> }
        </View>
    );
}

// ALI HASSAN: CSS StyleSheet for UserDashboardScreen
const styles = StyleSheet.create(
{
    containerStyle:
    {
        backgroundColor: "black",
        flex: 1,
    },

    navbarStyle:
    {
        backgroundColor: "rgb(168, 4, 7)",
        borderRadius: 25,
        height: "5%",
    },

    navbarRightSideStyle:
    {
        flexDirection: "row",
        width: "52%",
        alignSelf: "flex-end",
        marginTop: "-1%",
        marginRight: "5%",
    },

    switchToRenteeTextStyle:
    {
        color: "white",
        marginTop: "7%",
        fontWeight: "bold",
    },

    renterRenteeSwitchStyle:
    {

    },

    profileDataIconButtonStyle:
    {
        marginTop: "5%",
        marginLeft: "3%",
    },

    profileDataIconStyle:
    {
        color: "white",
        fontSize: 30,
    },

    profileDataModalContainerStyle:
    {
        backgroundColor: "white",
        flex: 1,
        marginTop: "50%",
        marginLeft: "25%",
        marginRight: "-5%",
        borderRadius: 25,
    },

    profileDataModalTitleStyle:
    {
        fontWeight: "bold",
        marginTop: "30%",
        marginLeft: "7%",
        fontSize: 16,
    },

    profileDataModalInputFieldStyle:
    {
        borderWidth: 3,
        width: "55%",
        height: "50%",
        alignSelf: "flex-end",
        marginTop: "30%",
        marginLeft: "2%",
        paddingHorizontal: "5%",
        borderRadius: 25,
    },

    profileDataModalButtonStyle:
    {
        borderWidth: 3,
        width: "35%",
        height: "15%",
        marginHorizontal: "7%",
        marginVertical: "30%",
        borderRadius: 25,
    },

    profileDataModalLogoutButtonStyle:
    {
        borderWidth: 3,
        width: "35%",
        height: "15%",
        marginHorizontal: "-70%",
        marginVertical: "60%",
        borderRadius: 25,
    },

    profileDataModalButtonTextStyle:
    {
        padding: "15%",
        alignSelf: "center",
        fontWeight: "bold",
        color: "white",
    }
});