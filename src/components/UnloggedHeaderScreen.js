// ALI HASSAN: Import React-Native Library Packages
import { StyleSheet, View, Image } from 'react-native';

// ALI HASSAN: UnloggedHeaderScreen Export Function
export default function UnloggedHeaderScreen ()
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

// ALI HASSAN: CSS StyleSheet of UnloggedHeaderScreen
const styles = StyleSheet.create(
{
    logoContainerStyle:
    {
        width: "50%",
        height: "25%",
        marginHorizontal: "25%",
        marginTop: "25%",
    },

    logoStyle:
    {
        width: "100%",
        height: "100%",
    },
});