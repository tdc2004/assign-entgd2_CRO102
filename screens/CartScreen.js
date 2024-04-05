import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Modal, ToastAndroid, Alert } from 'react-native';
import ItemCart from '../components/ItemCart';
import CartContext from '../components/CartContext ';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = ({ route,navigation }) => {
    const witdhWindow = Dimensions.get('screen').width;
    const [totalPrice, setTotalPrice] = useState(0);
    const [data, setData] = useState([]);
    const [carts, setCarts] = useState([])

    


    const deleteItem = async (itemId) => {
        try {
            await fetch(`http://10.0.2.2:3000/carts/${itemId}`, {
                method: "DELETE",
            }).then(res => res.json())
                .then(data => {
                    ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
                    // Sau khi xóa thành công, cần cập nhật lại dữ liệu giỏ hàng
                    getData();
                })
        } catch (error) {
            console.log(error);
            // Xử lý lỗi khi xảy ra trong quá trình xóa sản phẩm
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.');
        }
    }
    


    const getData = async () => {
        try {
            fetch('http://10.0.2.2:3000/carts').then(res => res.json()).then(data => {
                setCarts(data)
                console.log(data);
            }).catch(err => console.log(err))

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
        calculateTotalPrice()
    }, [data]);
    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen is focused. Do something here.');
            getData();

            return () => {
                console.log('Screen is unfocused. Clean up here if needed.');
            };
        }, [])
    );

    const calculateTotalPrice = () => {
        let total = 0;
        carts.forEach(item => {
            if (item.price) { // Kiểm tra nếu có giá sản phẩm
                total += item.price * item.quantity; // Tính tổng giá sản phẩm
            }
        });
        return total;
    };

    useEffect(() => {
        const total = calculateTotalPrice();
        setTotalPrice(total);
    }, [carts]);

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: carts, // Danh sách các sản phẩm trong giỏ hàng
                    total: totalPrice, // Tổng giá trị đơn hàng
                }),
            });
    
            if (response.ok) {
                navigation.navigate('oder');
            } else {
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.log(error);
            // Xử lý khi có lỗi xảy ra trong quá trình gửi thông tin đơn hàng lên server
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi thông tin đơn hàng. Vui lòng thử lại sau.');
        }
    };
    return (
        <View style={styles.container}>

            {carts.length > 0 ? (
                <View>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={carts}
                            renderItem={({ item }) => (
                                <ItemCart
                                    productID={item.id_product} onDelete={()=>deleteItem(item.id_product)}
                                />
                            )}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Không có sản phẩm nào</Text>
                </View>
            )}
            <View style={styles.deliveryAddressContainer}>
                <Text style={styles.deliveryAddressTitle}>Delivery Address</Text>
                <View style={styles.addressRow}>
                    <Image source={require('../img/map.png')} style={styles.mapIcon} />
                    <TouchableOpacity onPress={()=>navigation.navigate("address")}>
                        <Text style={styles.addressText}>43, Electronics City Phase 1, Electronic City</Text>
                    </TouchableOpacity>
                    <Image source={require('../img/Check.png')} style={styles.checkIcon} />
                </View>
            </View>
            <View style={styles.deliveryAddressContainer}>
                <Text style={styles.deliveryAddressTitle}>Payment Method</Text>
                <View style={styles.addressRow}>
                    <Image source={require('../img/map.png')} style={styles.mapIcon} />
                    <TouchableOpacity>
                        <Text style={styles.addressText}>43, Electronics City Phase 1, Electronic City</Text>
                    </TouchableOpacity>
                    <Image source={require('../img/Check.png')} style={styles.checkIcon} />
                </View>
            </View>
            <View style={styles.deliveryAddressContainer}>
                <Text style={styles.deliveryAddressTitle}>Order Information</Text>
                <View style={styles.orderInfoRow}>
                    <Text style={styles.orderInfoLeft}>Subtotal:</Text>
                    <Text style={styles.orderInfoRight}>${totalPrice}</Text>
                </View>
                <View style={styles.orderInfoRow}>
                    <Text style={styles.orderInfoLeft}>Delivery Charge:</Text>
                    <Text style={styles.orderInfoRight}>$10</Text>
                </View>
                <View style={styles.orderInfoRow}>
                    <Text style={styles.orderInfoLeft}>Total:</Text>
                    <Text style={styles.orderInfoRight}>${totalPrice + 10}</Text>
                </View>
            </View>
            <TouchableOpacity style={{ width: witdhWindow, backgroundColor: '#9775FA', position: 'absolute', bottom: 49, height: '8%', justifyContent: 'center', alignItems: 'center' }}
                            onPress={handleCheckout}>
                <Text style={{ fontSize: 17, color: 'white' }}>
                    Checkout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

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
        textAlign: 'center',
        color: 'black'
    },
    flatListContainer: {
        height: 250,
    },
    deliveryAddressContainer: {
        marginTop: 20,
    },
    deliveryAddressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    addressText: {
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 15,
        width: 250
    },

    orderInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    orderInfoContainer: {
        marginTop: 20,
    },
    orderInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    orderInfoLeft: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderInfoRight: {
        fontSize: 16,
    },
    emptyCartContainer: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
    },

});

export default CartScreen;
