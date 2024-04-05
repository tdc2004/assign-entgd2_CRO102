import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ItemCart = ({ productID, onDelete }) => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(0);
  const [size, setSize] = useState('');

  useEffect(() => {
    fetch(`http://10.0.2.2:3000/products/${productID}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.log(error));
    getData();
  }, []);

  const getData = () => {
    try {
      fetch(`http://10.0.2.2:3000/carts?id_product=${productID}`)
        .then(res => res.json())
        .then(data => {
          setQty(data[0].quantity);
          setSize(data[0].size);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = () => {
    setQty(qty + 1);
  };

  const decreaseQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Cảnh cáo', 'Bạn có chắc chắn muốn xóa sản phẩm này không ?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Xác nhận', onPress: () => onDelete(productID) },
    ]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.price}>${product.price}</Text>
          <Text>Size: {size}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{qty}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={createTwoButtonAlert}>
        <Image source={require('../img/Delete.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#F5F6FA',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    marginRight: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default ItemCart;
