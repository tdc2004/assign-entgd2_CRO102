import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import ItemClothe from '../components/ItemClothe';
import CartContext from '../components/CartContext ';

const HomeScreen = ({ navigation }) => {
    const [data2, setdata2] = useState(null);
    const data = [
        { id: 1, name: 'H&M', image: require('../img/adidas.png') },
        { id: 2, name: 'Zara', image: require('../img/adidas.png') },
        { id: 3, name: 'Nike', image: require('../img/adidas.png') },
        { id: 4, name: 'Nike', image: require('../img/adidas.png') },
        { id: 5, name: 'Nike', image: require('../img/adidas.png') },
        { id: 6, name: 'Nike', image: require('../img/adidas.png') },
    ];

    const getData = async () => {
        try {
            await fetch("http://10.0.2.2:3000/products")
                .then(res => res.json())
                .then(data => setdata2(data))

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [data])
    // "name": "Men's Printed Pullover Hoodie",
    // "images": "https://cafebiz.cafebizcdn.vn/162123310254002176/2023/10/25/z4813277701687-510933581a70b464516d3e146ac34edc-4735-1698218519720-16982185198431013731516.jpg",
    // "id": "fe96",
    // "product_id": "1",
    // "productSize": [
    //   {
    //     "size": "S",
    //     "price": "1.38",
    //     "quantity": 1
    //   }
    // ],
    // "price": "1.38"
    const handleItemPress = (itemId) => {
        navigation.navigate('Details', { itemId: itemId });
    };
    const addToFavourite = async (itemId) => {
        try {
            // Lấy danh sách các sản phẩm yêu thích từ máy chủ
            const response = await fetch("http://10.0.2.2:3000/favourite");
            const favouriteList = await response.json();
            // Kiểm tra xem sản phẩm có trong danh sách yêu thích không
            const isAlreadyInFavourite = favouriteList.some(item => item.productId.id === itemId);
            console.log(isAlreadyInFavourite);
            if(isAlreadyInFavourite == false){
                ToastAndroid.show("Lỗi sản phẩm đã tồn tại !!",ToastAndroid.SHORT);
                return;
            }
    
            await fetch("http://10.0.2.2:3000/favourite", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: itemId
                    })
                });

            //     ToastAndroid.show("Thêm thành công",ToastAndroid.SHORT);
            // if (isAlreadyInFavourite) {
            //     ToastAndroid.show("Sản phẩm đã có trong danh sách yêu thích",ToastAndroid.SHORT);
            // } else {
            //     // Thêm sản phẩm vào danh sách yêu thích nếu chưa tồn tại
            //     await fetch("http://10.0.2.2:3000/favourite", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({
            //             productId: itemId
            //         })
            //     });

            //     ToastAndroid.show("Thêm thành công",ToastAndroid.SHORT);
            // }
        } catch (error) {
            console.error("Error adding item to favourite:", error);
        }
    };




    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Hemendra</Text>
                <Text style={styles.subHeaderText}>Welcome to BeeFashion</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Search...' />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../img/mic.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Choose Brand</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>New Arrival</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data2}
                    renderItem={({ item }) => <ItemClothe item={item} onPress={handleItemPress} onFavourite={addToFavourite} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>New Arrival</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data2}
                    renderItem={({ item }) => <ItemClothe item={item} onPress={handleItemPress} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>New Arrival</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data2}
                    renderItem={({ item }) => <ItemClothe item={item} onPress={handleItemPress} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#555',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: '#F5F6FA',
        flex: 1,
        marginRight: 10,
        borderRadius: 5,
    },
    input: {
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#9775FA',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    icon: {
        height: 20,
        width: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAllText: {
        color: '#9775FA',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#F5F6FA',
        borderRadius: 5,
    },
    image: {
        width: 25,
        height: 20,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    name: {
        fontSize: 16,
    },
});

export default HomeScreen;
