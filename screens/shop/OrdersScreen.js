import React, { useEffect, useState } from 'react';
import { FlatList, Platform, ActivityIndicator, StyleSheet,View,Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);


    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();



    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(() => {
            setIsLoading(false);
        })
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (orders.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    No orders found, maybe start ordering some products ?
                </Text>

            </View>
        )
    }

    return <FlatList keyExtractor={item => item.id} data={orders} renderItem={itemData =>
        <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
        />}
    />
};

export const screenOptions = navData => {

    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='card' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => { navData.navigation.toggleDrawer(); }} /></HeaderButtons>)
    }

}
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});


export default OrdersScreen;