// ALI HASSAN: Import React & React-Native Library Packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
// ALI HASSAN: Import Feather Icons
import { Feather } from '@expo/vector-icons';
// ALI HASSAN: IMPORT FIREBASE Authentication and Database
import { Database } from './../firebase-config/Firebase';
import {collection, doc, getDocs, deleteDoc} from "firebase/firestore";
// ALI HASSAN: Import Manually Created Components
import ProductScreen from './ProductScreen';

// ALI HASSAN: RenteeProductScreen Export Function
export default function RenteeProductsScreen (props) 
{
    // ALI HASSAN: useState Variables Declaration and Initialization
    const [products, setProducts] = useState([]);

    // ALI HASSAN: useEffect Hook to Call getRenteeProducts Function on Page Load
    useEffect ( () =>
    {
        getRenteeProducts();
    }, []);

    // ALI HASSAN: getRenteeProducts Function to Fetch LoggedIn User's Posted Products
    const getRenteeProducts = () =>
    {
        // ALI HASSAN: Get All Products First
        getDocs(collection(Database, "products"))
        .then( (results) =>
        {
            setProducts([]);

            results.forEach( (result) => 
            {
                let currentIterationProduct = result.data();

                // ALI HASSAN: If to Filter LoggedIn User's Specific Posted Products Only
                if (currentIterationProduct.renteeUserID == props.loggedInUserID)
                {
                    const product = {
                        "productID": result.id,
                        "renteeUserID": currentIterationProduct.renteeUserID,
                        "productTitle": currentIterationProduct.productTitle,
                        "productDescription": currentIterationProduct.productDescription,
                        "productCategory": currentIterationProduct.productCategory,
                        "productPrice": currentIterationProduct.productPrice,
                        "productImage": currentIterationProduct.productImage,
                        "productPriceDuration": currentIterationProduct.productPriceDuration,
                    };

                    if (products != null)
                    {
                        setProducts(products => [...products, product]);
                    }
                    else
                    {
                        setProducts(product);
                    }
                }
            });
        })
        .catch( (error) =>
        {
            alert(error);
        });
    }

    // ALI HASSAN: Return Value of RenteeProductsScreen
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.userTypeTitleText}>
                My Products
            </Text>

            {
                (products != null) 
                ? <FlatList 
                        data = {products}
                        
                        renderItem = { ({item, index}) => 
                        {
                            return (
                                <View>
                                    <ProductScreen
                                        renteeUserID = {item.renteeUserID}
                                        productTitle = {item.productTitle}
                                        productDescription = {item.productDescription}
                                        productCategory = {item.productCategory}
                                        productPrice = {item.productPrice}
                                        productImage = {item.productImage}
                                        productPriceDuration = {item.productPriceDuration}
                                    />

                                    <TouchableOpacity
                                        style = {styles.deleteProductButtonStyle}
                                        onPress = { () => 
                                            {
                                                console.log(products[index].productID);

                                                deleteDoc(doc(Database, "products", products[index].productID));
            
                                                setProducts([
                                                    ...products.slice(0, index),
                                                    ...products.slice(index + 1, products.length)
                                                ]);
                                            }}
                                    >
                                        <Feather style={styles.deleteProductIconStyle} name="trash-2" />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    /> 
                : null
            }
        </View>
    );
}

// ALI HASSAN: CSS StyleSheet for RenteeProductsScreen
const styles = StyleSheet.create(
{
    containerStyle:
    {
        flex: 1,
        borderRadius: 25,
        marginTop: "2%",
        padding: "5%",
        borderWidth: 2,
        borderColor: "white",
    },

    userTypeTitleText:
    {
        backgroundColor: "white",
        fontSize: 26,
        fontWeight: "bold",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        borderRadius: 25,
    },

    deleteProductButtonStyle:
    {
        marginRight: "5%",
        marginTop: "-12%",
        backgroundColor: "rgb(168, 4, 7)",
        alignSelf: "flex-end",
        width: "7%",
        borderRadius: 25,
    },

    deleteProductIconStyle:
    {
        color: "white",
        fontSize: 20,
        alignSelf: "center",
    },

    scrollViewStyle:
    {
        paddingTop: "2%",
    }
});