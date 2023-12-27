// ALI HASSAN: Import React & React-Native Library Packages
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// ALI HASSAN: IMPORT FIREBASE Authentication and Database
import { Database} from './../firebase-config/Firebase';
import {collection, getDocs } from "firebase/firestore";
// ALI HASSAN: Import Manually Created Components
import ProductScreen from './ProductScreen';

// ALI HASSAN: Export Function of RenterProductsScreen
export default function RenterProductsScreen (props) 
{
    // ALI HASSAN: useState Variables Declaration and Initialization
    const [products, setProducts] = useState([]);

    // ALI HASSAN: useEffect Hook to Call getAllProducts Function on Page Load
    useEffect ( () =>
    {
        getAllProducts();
    }, []);

    // ALI HASSAN: getAllProducts Function to Fetch All User's Posted Products
    const getAllProducts = () =>
    {
        getDocs(collection(Database, "products"))
        .then( (results) =>
        {
            results.forEach( (result) => 
            {
                let newResult = result.data();

                const product = {
                    "renteeUserID": newResult.renteeUserID,
                    "productTitle": newResult.productTitle,
                    "productDescription": newResult.productDescription,
                    "productCategory": newResult.productCategory,
                    "productPrice": newResult.productPrice,
                    "productImage": newResult.productImage,
                    "productPriceDuration": newResult.productPriceDuration,
                };

                // ALI HASSAN: Push All Fetched Productsto products useState Array
                if (products != null)
                {
                    setProducts(products => [...products, product]);
                }
                else
                {
                    setProducts(product);
                }
            });
        })
        .catch( (error) =>
        {
            alert(error);
        });
    }

    // ALI HASSAN: Return Value of RenterProductsScreen
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.userTypeTitleText}>
                All Products
            </Text>

            {
                (products != null) 
                ? <FlatList 
                        data = {products}
                        
                        renderItem = { ({item}) => 
                        {
                            return (
                                <ProductScreen
                                    renteeUserID = {item.renteeUserID}
                                    productTitle = {item.productTitle}
                                    productDescription = {item.productDescription}
                                    productCategory = {item.productCategory}
                                    productPrice = {item.productPrice}
                                    productImage = {item.productImage}
                                    productPriceDuration = {item.productPriceDuration}
                                />
                            );
                        }}
                    /> 
                : null
            }
        </View>
    );
}

// ALI HASSAN: CSS StyleSheet of RenterProductsScreen
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

    scrollViewStyle:
    {
        paddingTop: "2%",
    }
});