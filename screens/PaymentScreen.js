import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const PaymentScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Payment </Text>
            <TouchableOpacity style={styles.paymentOption}>
                <Image source={require('../img/card.png')} style={styles.paymentIcon} />
                <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentOption}>
                <Image source={require('../img/card.png')} style={styles.paymentIcon} />
                <Text style={styles.paymentText}>Credit Card</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    paymentIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    paymentText: {
        fontSize: 16,
    },
});
