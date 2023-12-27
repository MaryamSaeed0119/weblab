// ALI HASSAN: Import React and React-Native Library Packages
import { StyleSheet, Text, View, Image } from 'react-native';

// ALI HASSAN: ProductScreen Function to Display the Product Details Individually
export default function ProductScreen (props) 
{
    return (
        <View style={styles.containerStyle}>
            <View style={styles.productContainerLeftSideStyle}>
                <Image
                    style = {styles.productImageStyle}
                    source={{uri: props.productImage}}
                />
            </View>

            <View style={styles.productContainerRightSideStyle}>
                <Text style={styles.productTitleStyle}>
                    {props.productTitle}
                </Text>

                <Text style={[styles.productDetailsStyle, {fontWeight: "bold", color: "rgb(168, 4, 7)"}]}>
                    {props.productCategory}
                </Text>

                <Text style={styles.productDetailsStyle}>
                    $ {props.productPrice} / {props.productPriceDuration}
                </Text>
            </View>
        </View>
    );
}

// CSS Stylesheet of ProductScreen
const styles = StyleSheet.create(
{
    containerStyle:
    {
        flexDirection: "row",
        flex: 1,
        borderRadius: 25,
        marginTop: "12%",
        padding: "2%",
        borderWidth: 3,
        borderColor: "rgb(168, 4, 7)",
    },

    productContainerLeftSideStyle:
    {
        alignSelf: "flex-start",
    },

    productContainerRightSideStyle:
    {
        alignSelf: "flex-end",
        flex: 1,
        paddingHorizontal: "2%",
        paddingVertical: "2%",
    },

    productImageStyle:
    {
        width: 120,
        height: 120,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },

    productTitleStyle:
    {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
        flex: 1,
    },

    productDetailsStyle:
    {
        color: "white",
    }
});