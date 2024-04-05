import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView, ToastAndroid, } from 'react-native';
const CreatPassScreen = ({navigation,route}) => {
    const [password, setpassword] = useState('')
    const [repassword, setrepassword] = useState('')
    const { userId } = route.params;
    const [user, setuser] = useState(null)
    const handleCreate = async () => {
        if (password === repassword) {
            if(password.length>=6){
                console.log("Thanh cong");
            try {
                const response = await fetch(`http://10.0.2.2:3000/users/${userId}`);
                const getUser = await response.json();
                // user vẫn giữ giá trị cũ ở đây
                fetch(`http://10.0.2.2:3000/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...getUser, password: password }), // Sử dụng toán tử spread để thêm mật khẩu mới
                }).then(res => res.json()).then(data => {
                    ToastAndroid.show("Thay đổi mật khẩu thành công", ToastAndroid.SHORT);
                    navigation.navigate("Login")
                }).catch(err => console.log(err))
            } catch (error) {
                console.log(error);
            }
            }else{
                ToastAndroid.show("Mật khẩu phải có trên 6 kí tự", ToastAndroid.SHORT);
            }
        } else {
            console.log("Loi roi");
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
                    <Text style={{ fontSize: 35 }}>Create new password</Text>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Your new password must be unique from those previously used.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        placeholderTextColor={"#8391A1"}
                        secureTextEntry
                        onChangeText={txt=>setpassword(txt)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#8391A1"}
                        secureTextEntry
                        onChangeText={txt=>setrepassword(txt)}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleCreate}>
                        <Text style={styles.loginButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                <Text>Remember Password?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                    <Text style={{ color: '#9775FA' }}> Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreatPassScreen;

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
        backgroundColor: '#9775FA',
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
        backgroundColor: '#9775FA',
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
