import React, { useEffect, useState } from 'react';
import { Keyboard, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, SafeAreaView, ToastAndroid } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [passWord, setpassWord] = useState('')
    const [repassWord, setRepassWord] = useState('')
    const [username, setusername] = useState('')

    const [isShow, setShow] = useState(false)
    const handleRegister = async () => {
        if ( email == "" || passWord == "" ||repassWord==""||username=="") {
            ToastAndroid.show('Vui lòng không bỏ trống', ToastAndroid.SHORT);

            return;
        }
        if (passWord.length < 6) {
            ToastAndroid.show('Mật khẩu phải có hơn 6 kí tự', ToastAndroid.SHORT);

            return;
        }
        if (passWord !== repassWord) {
            Alert.alert('Mật khẩu không trùng khớp.');
            return;
        }
        try {
            let obj_user = {
                email: email,
                password: passWord,
                // repassword: rePassWord,
                username: username,
                
            }
            const res = await fetch("http://10.0.2.2:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj_user)
            })
            const data = res.json();
            console.log(data);
            ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);

            navigation.navigate('Login')
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
        }
    }
    const handleForgotPass=()=>{
        navigation.navigate("forget")
      }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setShow(true)
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setShow(false)
        });
    }, [])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            enabled={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={[styles.container, { marginBottom: isShow ? 50 : 0 }]}>
                    <View style={styles.content}>
                        <View style={{ width: '100%', justifyContent: 'center', height: 730, alignItems: 'center' }}>
                            <View style={styles.hinhTron1} />
                            <View style={styles.hinhTron2} />

                            <View style={styles.inputContainer}>
                                {
                                    isShow == true ? <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Nhập thông tin của bạn</Text>
                                    </View> : <View style={{ width: '80%' }}>
                                        <Text style={{ fontSize: 25 }}>REGISTER FOR</Text>
                                        <Text style={{ fontSize: 40 }}>Bee Shoes</Text>
                                    </View>
                                }
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor={"#8391A1"}
                                    keyboardType="email-address"
                                    onChangeText={txt=>setusername(txt)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor={"#8391A1"}
                                    keyboardType="email-address"
                                    onChangeText={(txt) => setemail(txt)}
                                /><TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={"#8391A1"}
                                    secureTextEntry
                                    onChangeText={(txt) => setpassWord(txt)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm password"
                                    placeholderTextColor={"#8391A1"}
                                    secureTextEntry
                                    onChangeText={txt=>setRepassWord(txt)}
                                />
                                <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                                    <Text style={styles.loginButtonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleForgotPass}>
                                    <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                                <View style={styles.orRegisterWithContainer}>
                                    <View style={styles.line} />
                                    <Text style={styles.orRegisterWithText}>Or Register with</Text>
                                </View>
                                <View style={styles.methodLogin}>
                                    <TouchableOpacity style={styles.loginMethodButton}>
                                        <Image source={require('../img/facebook.png')} style={styles.iconLogin} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.loginMethodButton}>
                                        <Image source={require('../img/google.png')} style={styles.iconLogin} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.loginMethodButton}>
                                        <Image source={require('../img/apple.png')} style={styles.iconLogin} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                                <Text style={{ color: '#9775FA' }}> Login Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
        backgroundColor: '#9775FA',
    },
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    inputContainer: {
        width: '90%',
        height: 550,
        marginTop: 70,
        justifyContent: 'space-evenly'
    },
    input: {
        borderColor: '#E8ECF4',
        borderWidth: 1,
        paddingLeft: 15,
        borderRadius: 8,
        height: 50
    },
    loginButton: {
        backgroundColor: "#9775FA",
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
        fontSize: 14
    },
    orRegisterWithContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8ECF4',
    },
    orRegisterWithText: {
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
        justifyContent: 'space-between',
        width: '100%'
    },
    loginMethodButton: {
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
        padding: 15,
        bottom: 15,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center'
    }
});
