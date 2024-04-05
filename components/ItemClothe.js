import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const ItemClothe = ({ item, onPress, onFavourite }) => {

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: item.images }} style={styles.image} />
                <TouchableOpacity onPress={() => onFavourite(item)}>
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
