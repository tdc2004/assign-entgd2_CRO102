import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const OrderSuccessScreen = ({ navigation }) => {
    const witdhWindow = Dimensions.get('screen').width;

    return (
        <View style={styles.container}>
            <Image source={require('../img/successful.png')} style={styles.successImage} />
            <Text style={styles.successText}>Order Successful!</Text>
            <Text style={styles.messageText}>Thank you for your order.</Text>
            <TouchableOpacity  onPress={()=>navigation.navigate("HomeTabs")} style={{ width: witdhWindow, backgroundColor: '#9775FA', position: 'absolute', bottom: 0, height: '8%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, color: 'white' }}>
                Continue Shopping
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    successImage: {
        width: 280,
        height: 232,
        marginBottom: 20,
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        position:'absolute',
        bottom:0,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});
