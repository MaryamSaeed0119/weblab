// ALI HASSAN: Import React-Native Library Packages
import { StyleSheet, View, Image } from 'react-native';

// ALI HASSAN: Default Export Function of LoggedHeaderScreen
export default function LoggedHeaderScreen ()
{
    return (
        <View style={styles.logoContainerStyle}>
            <Image
                style = {styles.logoStyle}
                source = {require('./../images/Logo.png')}
            />
        </View>
    );
}

// ALI HASSAN: CSS StyleSheet of LoggedHeaderScreen
const styles = StyleSheet.create(
{
    logoContainerStyle:
    {
        width: "40%",
        height: "20%",
        marginHorizontal: "30%",
    },

    logoStyle:
    {
        width: "100%",
        height: "100%",
    },
});