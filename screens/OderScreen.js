import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const OrderScreen = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchOrderItems();
    
  }, []);

  const fetchOrderItems = async () => {
    try {
      // Fetch orders from your backend API
      const response = await fetch('http://10.0.2.2:3000/orders');
      const data = await response.json();
      setOrderItems(data);
    console.log(data[0].products[1].id_product);
      
      let total = 0;
      data.forEach(order => {
        total += order.total;
      });
      setTotalPrice(total);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
    const layData=()=>{
        try {
            fetch('http://10.0.2.2:3000/products')
        } catch (error) {
            
        }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.products.map(product => (
        <View key={product.id} style={styles.productContainer}>
          <Image source={{ uri: product.images }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{product.name}</Text>
            <Text style={styles.itemPrice}>Price: ${product.price}</Text>
            <Text style={styles.itemQuantity}>Quantity: {product.quantity}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {orderItems.length > 0 ? (
        <FlatList
          data={orderItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderScreen;
