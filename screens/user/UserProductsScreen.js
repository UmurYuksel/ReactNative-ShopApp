import React from 'react';
import { FlatList, Button, Platform, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

//Custom
import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';


const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const distpatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    };

    //Alert example=>
    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'This item will be removed', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => { distpatch(productActions.deleteProduct(id)) } }
        ]);
    };

    if (userProducts.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    No Producst Found, maybe start creating some ?
                </Text>

            </View>
        )
    }

    return <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData =>
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => { editProductHandler(itemData.item.id); }}
        >
            <Button color={Colors.primary} title="Edit" onPress={() => { editProductHandler(itemData.item.id); }} />
            <Button color={Colors.primary} title="Delete" onPress={() => { deleteHandler(itemData.item.id) }} />
        </ProductItem>}
    />
}                                                                 //onPress={deleteHandler.bind(this, id)}  this is the second approach that can be used.

export const screenOptions = navData => {

    return {
        headerTitle: 'My Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='card' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => { navData.navigation.toggleDrawer(); }} /></HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='add' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => { navData.navigation.navigate('EditProduct'); }} /></HeaderButtons>)
    }
}
export default UserProductsScreen;