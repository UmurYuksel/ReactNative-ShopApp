import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

//Custom Components
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';






//Present the list of all the products =>
const ProductsOverviewScreen = props => {

    //ERROR HANDLING
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isRefreshing,setIsRefreshing]=useState(false);
    //
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    //When we get back to this componet, this function will be triggered to fetch the data from the server.
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts);
        return () => {
            unsubscribe();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });

    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({ routeName: 'ProductDetail', params: { productId: id, productTitle: title } })
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>
                    An error occured. Details: {error}
                </Text>
                <Button title='Try again' onPress={loadProducts} color={Colors.primary} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>
                    No Products Found.
                </Text>
            </View>
        )
    }

    return (

        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}>
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => { dispatch(cartActions.addToCart(itemData.item)) }}
                    />
                </ProductItem>
            }
        />

    );
};

//Static Nav Options
export const screenOptions = navData => {
    return {
        headerTitle: 'Products',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='card' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => { navData.navigation.toggleDrawer(); }} /></HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='card' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => { navData.navigation.navigate('Cart') }} /></HeaderButtons>)
    }

}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProductsOverviewScreen;