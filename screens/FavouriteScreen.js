import { Alert, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemClothe from '../components/ItemClothe'
import ItemFavourite from '../components/ItemFavourite'

const FavouriteScreen = ({navigation}) => {
  const [data, setData] = useState([])
  const handleItemPress = (itemId) => {
    navigation.navigate('Details', { itemId: itemId });
};
  const createTwoButtonAlert = (itemId) =>
        Alert.alert('Cảnh cáo', 'Bạn có chắc chắn muốn xóa sản phẩm này không ?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Xác nhận', onPress: () => deleteData(itemId) },
        ]);

  const getData = async () => {
    try {
      await fetch("http://10.0.2.2:3000/favourite")
        .then(res => res.json())
        .then(data => setData(data));
    } catch (error) {
      console.log(error);
    }
  }
  const deleteData = async (itemID) => {
    try {
    await fetch(`http://10.0.2.2:3000/favourite/${itemID}`,{
      method:"DELETE"
    }).then(res=>res.json())
    .then(data=>{
      ToastAndroid.show("Xóa thành công",ToastAndroid.SHORT);
      getData();
    })
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>365 Items</Text>
          <Text style={styles.subHeaderText}>in wishlist</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={data}
        renderItem={({ item }) => <ItemFavourite item={item} onFavourite={()=>createTwoButtonAlert(item.id)} onPress={handleItemPress}/>}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  subHeaderText: {
    fontSize: 14,
    color: 'gray',
  },
  editButton: {
    backgroundColor: '#F5F6FA',
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'center',
    borderRadius: 5,
  },
  editButtonText: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  flatList: {
    flex: 1,
    marginTop: 10,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
