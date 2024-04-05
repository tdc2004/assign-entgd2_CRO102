import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const Profile = ({navigation}) => {
  const userData = useSelector(state => state.user.userData);
  const createTwoButtonAlert = () =>
  Alert.alert('Log out', 
  'Are you sure you want to Log out?',
  [
      {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
      { text: 'Yes', onPress: () => navigation.navigate("Login") },
  ]);


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginTop: 30, alignItems: 'center' }}>
        <Text style={{ fontSize: 22, color: '#333333' }}>PROFILE</Text>
      </View>
      <View style={{ marginTop: 40, marginLeft: 15, marginBottom: 20, flexDirection: 'row' }}>
        <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={{uri:userData.image}} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444444' }}>{userData ? userData.username : ''}</Text>
          <Text style={{ marginTop: 5, fontSize: 17 }}>{userData.email}</Text>
        </View>
      </View>
      <View >
        <View style={{ marginTop: 20, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, color: '#555555', marginBottom: 5 }}>General</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PersonalInformation')}>
          <Text style={styles.text}>Edit personal information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.text}>Order history</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.text}>Payment</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 50, borderBottomColor: "#444444", borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, color: '#555555', marginBottom: 5 }}>Security and Terms</Text>
        </View>
        <Text style={styles.text}>Terms and conditions</Text>
        <Text style={styles.text}>Privacy policy</Text>
        <TouchableOpacity
          onPress={ createTwoButtonAlert}>
          <Text style={{ marginTop: 25, fontSize: 20, fontWeight: 'bold', color: 'red' }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#333333',
    marginTop: 20,
    fontWeight: 'bold'
  }
});
