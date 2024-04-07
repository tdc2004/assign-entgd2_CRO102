import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';

const ItemClothe = ({ item, onPress }) => {
    const addToFavourite = async (itemId) => {
        try {
            fetch('http://10.0.2.2:3000/favourite').then(res => res.json()).then(data => {
                const sp = data.some(item => item.productId.id == itemId.id)
                if (sp) {
                    ToastAndroid.show("Sản phẩm đã có trong danh sách yêu thích!", ToastAndroid.SHORT);
                } else {
                    fetch('http://10.0.2.2:3000/favourite',{
                        method:"POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            productId:itemId,
                          }),
                    }).then(res => res.json()).then(data => {
                        ToastAndroid.show("Đã thêm vào danh sách yêu thích!", ToastAndroid.SHORT);

                    }).catch(err => console.log(err))
                }
            })
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm vào danh sách yêu thích:", error);
        }
    };

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: item.images }} style={styles.image} />
                <TouchableOpacity onPress={() => addToFavourite(item)}>
                    <Image source={require('../img/heart.png')} style={{ height: 25, width: 25, position: "absolute", top: 0, right: 0 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>$ {item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ItemClothe;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        margin: 5
    },
    image: {
        width: 160,
        height: 200,
        borderRadius: 8,
    },
    textContainer: {
        width: 160
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: 'black',
    },
});
