import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions } from 'react-native';

const AddressScreen = ({ navigation }) => {
    const witdhWindow = Dimensions.get('screen').width;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Image source={require('../img/bac.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Address</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} placeholder='Name' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Country</Text>
                    <TextInput style={styles.input} placeholder='Country' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>City</Text>
                    <TextInput style={styles.input} placeholder='City' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} placeholder='Phone Number' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.input} placeholder='Address' />
                </View>
            </View>
            <TouchableOpacity style={{ width: witdhWindow, backgroundColor: '#9775FA', position: 'absolute', bottom: 0, height: '8%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, color: 'white' }}>
                    Save Address
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 17,
        marginLeft: 10,
        color: 'black',
        textAlign: 'center'
    },
    content: {
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 25,
        padding: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
});
