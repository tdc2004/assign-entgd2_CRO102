import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView, Platform, ToastAndroid, } from 'react-native';

const SendOTPScreen = ({navigation,route}) => {
    const [otp, setOtp] = useState('');
    const [maOTP, setMaOTP] = useState('');
    const { userId } = route.params;
    const generateOTP = () => {
        const min = 10000;
        const max = 99999;
        const randomOTP = Math.floor(Math.random() * (max - min + 1)) + min;
        setOtp(randomOTP.toString());
    };
    const handleCheckCode = () => {
        if(otp === maOTP){
            navigation.navigate("create",{userId: userId})
        }else{
            ToastAndroid.show("Vui lòng nhập đúng mã OTP",ToastAndroid.SHORT);
            generateOTP();
        }
    }

    useEffect(() => {
        generateOTP();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}>
                <View style={styles.hinhTron1} />
                <View style={styles.hinhTron2} />
                <View style={{ width: '85%' }}>
                    <Text style={styles.title}>OTP Verification</Text>
                    <Text style={styles.subtitle}>Enter the verification code we just sent to your email address.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.otpText}>{otp}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your code"
                        placeholderTextColor={"#8391A1"}
                        keyboardType="numeric"
                        onChangeText={(text) => setMaOTP(text)}
                    />
                    <TouchableOpacity style={styles.verifyButton} onPress={handleCheckCode}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <Text>Remember Password?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SendOTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '85%',
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    inputContainer: {
        width: '85%',
        alignItems: 'center',
    },
    input: {
        borderColor: '#E8ECF4',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 15,
        borderRadius: 8,
        padding: 15,
        width: '100%',
    },
    otpText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    verifyButton: {
        backgroundColor: '#9775FA',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    verifyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    hinhTron1: {
        height: 543,
        width: 543,
        borderRadius: 543,
        opacity: 0.5,
        backgroundColor: "#9775FA",
        position: 'absolute',
        top: -400,
        alignSelf: 'flex-end',
        left: -100,
    },
    hinhTron2: {
        height: 392,
        width: 392,
        opacity: 0.5,
        borderRadius: 392,
        backgroundColor: "#9775FA",
        position: 'absolute',
        top: -190,
        right: -200,
    },
    footer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    loginLink: {
        color: '#9775FA',
        fontWeight: 'bold',
    },
});
