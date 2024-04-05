import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView, ToastAndroid, } from 'react-native';
const ForgotPassScreen = ({ navigation }) => {
    const [email, setemail] = useState('');
    const handleCheckEmail = async () => {
        try {
            await fetch('http://10.0.2.2:3000/users')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const emailExists = data.some(item => item.email == email);
                    if (emailExists) {
                        const user = data.find(item => item.email == email);
                        navigation.navigate('send', { userId: user.id }); // Truyền id của user vào màn hình "send"
                        console.log('thanh cong');
                        console.log(user.id);
                    } else {
                        ToastAndroid.show("Email không tồn tại", ToastAndroid.SHORT);
                    }
                })
        } catch (error) {
            console.error('Lỗi:', error);
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}>
                <View style={styles.hinhTron1} />
                <View style={styles.hinhTron2} />
                <View style={{ width: '85%' }}>
                    <Text style={{ fontSize: 35 }}>Forgot Password?</Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor={"#8391A1"}
                        keyboardType="email-address"
                        onChangeText={txt => setemail(txt)}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleCheckEmail}>
                        <Text style={styles.loginButtonText}>Send Code</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <Text>Remember Password?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text style={{ color: '#9775FA' }}> Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '85%',
    },
    input: {
        borderColor: '#E8ECF4',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 15,
        borderRadius: 8,
        padding: 15
    },
    loginButton: {
        backgroundColor: '#9775FA',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    forgetPasswordText: {
        color: '#6A707C',
        textAlign: 'right',
        marginTop: 10,
        fontSize: 14
    },
    orLoginWithContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8ECF4',
    },
    orLoginWithText: {
        color: '#6A707C',
        fontSize: 14,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10
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
        left: -100
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
    methodLogin: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        width: '100%'
    },
    loginMethodButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
        width: '32%',
        borderColor: '#E8ECF4',
        borderWidth: 1
    },
    iconLogin: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20 // Khoảng cách giữa footer và bottom của màn hình
    }
});
