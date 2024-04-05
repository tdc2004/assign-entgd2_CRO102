import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import CartContext from './CartContext ';

const ItemDetails = ({ route, navigation }) => {
    const [data, setdata] = useState(null);
    const { itemId } = route.params;
    const url = "http://10.0.2.2:3000/carts"

    const getData = async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/products");
            const data = await response.json();
            setdata(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizePress = (size) => {
        setSelectedSize(size);
    };

    const handleaddToCart = async () => {
        if (!selectedSize) {
            ToastAndroid.show("Vui lòng chọn size để thêm vào giỏ hàng", ToastAndroid.SHORT);
            return;
        }
        try {
            fetch(url).then(res => res.json()).then(data => {
                let check = false;
                console.log(data)
                data.forEach(item => {
                    if (item.id_product == itemId.id) {
                        check = true;
                        return
                    }
                });
                if (check) {
                    //Tồn tại
                    try {
                        fetch(`http://10.0.2.2:3000/carts?id_product=${itemId.id}`).then(res => res.json()).then((data) => {
                            console.log(data)
                            fetch(`${url}/${data[0].id}`, {
                                method: 'PUT',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ...data[0],
                                    quantity: data[0].quantity + 1
                                }),
                            }).then(res => res.json()).then((data) => {
                                console.log(data)
                                ToastAndroid.show("Sản phẩm đã được cập nhật trong giỏ hàng", ToastAndroid.SHORT);
                            }).catch()
                        }).catch(error => console.log(error))
                    } catch (error) {
                        console.log("Err : " + error)
                    }
                } else {
                    //Chưa tòn tại thì thêm vào mảng
                    fetch("http://10.0.2.2:3000/carts", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_product: itemId.id,
                            size: selectedSize,
                            price: itemId.price,
                            quantity: 1,

                        })
                    }).then(res => res.json()).then(data => {
                        ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT);
                    })
                }
            })
            // if () {

            //     ToastAndroid.show("Sản phẩm đã được cập nhật trong giỏ hàng", ToastAndroid.SHORT);
            // } else {
            //     // Nếu sản phẩm chưa có trong giỏ hàng, bạn có thể thêm nó vào đây
            //     // Ví dụ: Gửi yêu cầu POST để thêm sản phẩm mới vào giỏ hàng
            //     // fetch("http://10.0.2.2:3000/carts", {
            //     //     method: "POST",
            //     //     headers: {
            //     //         'Content-Type': 'application/json',
            //     //     },
            //     //     body: JSON.stringify({
            //     //         id_product: itemId.id,
            //     //         productSize: [{
            //     //             size: selectedSize,
            //     //             price: itemId.price,
            //     //             quantity: 1,
            //     //         }]
            //     //     })
            //     // });

            //     ToastAndroid.show("Sản phẩm đã được thêm vào giỏ hàng", ToastAndroid.SHORT);
            // }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            ToastAndroid.show("Đã xảy ra lỗi khi thêm vào giỏ hàng", ToastAndroid.SHORT);
        }

        setSelectedSize(null);
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <Image source={{ uri: itemId.images }} style={styles.image} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                            <Image source={require('../img/bac.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed favorite')}>
                            <Image source={require('../img/heart.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{itemId.name}</Text>
                        <Text style={styles.price}>$ {itemId.price}</Text>
                    </View>
                    <View style={styles.thumbnailContainer}>
                        <TouchableOpacity>
                            <Image source={require('../img/img1.png')} style={styles.thumbnail} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../img/img2.png')} style={styles.thumbnail} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../img/img3.png')} style={styles.thumbnail} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../img/img4.png')} style={styles.thumbnail} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sizeContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.sizeLabel}>Size</Text>
                            <Text style={styles.sizeGuide}>Size Guide</Text>
                        </View>
                        <View style={styles.sizeButtonsContainer}>
                            {itemId.sizes.map((size, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.sizeButton, selectedSize === size ? styles.selectedSizeButton : null]}
                                    onPress={() => handleSizePress(size)}
                                >
                                    <Text style={{ textAlign: 'center' }}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.descriptionLabel}>Description</Text>
                        <Text style={styles.descriptionText}>{itemId.description}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.priceContainer}>
                <View>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.priceValue}>${itemId.price}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleaddToCart}>
                    <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 350,
    },
    detailsContainer: {
        padding: 20,
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        top: 20,
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
    infoContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: '#888',
    },
    thumbnailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sizeContainer: {
        marginBottom: 20,
    },
    sizeLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sizeGuide: {
        color: 'blue',
    },
    sizeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    sizeButton: {
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        paddingVertical: 15,
        width: '18%',
    },
    descriptionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
    },
    priceContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    priceLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceValue: {
        fontSize: 18,
    },
    addToCartButton: {
        backgroundColor: '#9775FA',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8,
    },
    addToCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    selectedSizeButton: {
        borderColor: 'gray',
        borderWidth: 2,
    },
});
