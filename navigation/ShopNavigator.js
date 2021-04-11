import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

//Customs
import ProductsOverviewScreen, { screenOptions as productOverviewOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productDetailOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartOptions } from '../screens/shop/CardScreen';
import OrdersScreen, { screenOptions as OrdersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, { screenOptions as UserProductOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as EditProductOptions } from '../screens/user/EditProductsScreen';
import AuthScreen, {screenOptions as AuthOptions} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';

import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
};



const ProductsStackNavigator = createStackNavigator();

//since this is a function that returns something we could split these into seperate files.
export const ProductsNavigator = () => {
    return <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen name="ProductsOverview" component={ProductsOverviewScreen} options={productOverviewOptions} />
        <ProductsStackNavigator.Screen name="ProductDetail" component={ProductDetailScreen} options={productDetailOptions} />
        <ProductsStackNavigator.Screen name="Cart" component={CartScreen} options={cartOptions} />
    </ProductsStackNavigator.Navigator>
};

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen name="Orders" component={OrdersScreen} options={OrdersScreenOptions} />
    </OrdersStackNavigator.Navigator>
};


// const OrdersNavigator = createStackNavigator({
//     Orders: OrdersScreen
// }, {

//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });


const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen name="UserProducts" component={UserProductsScreen} options={UserProductOptions} />
        <AdminStackNavigator.Screen name="EditProduct" component={EditProductScreen} options={EditProductOptions} />
    </AdminStackNavigator.Navigator>
}


// const AdminNavigator = createStackNavigator({
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen

// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons
//             name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//             size={23}
//             color={drawerConfig.tintColor}
//         />
//     },
//     defaultNavigationOptions: defaultNavOptions
// });


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return <ShopDrawerNavigator.Navigator initialRouteName="Shop"
        drawerContent={props => {
            return (
                <View style={{ flex: 1 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItemList {...props} />
                        <Button title='Logout' color={Colors.primary} onPress={() => {
                            dispatch(authActions.logout());
                            //props.navigation.navigate('Auth');
                        }}
                        />
                    </SafeAreaView>
                </View>
            )
        }}
        drawerContentOptions={{
            activeTintColor: Colors.primary
        }}>
        <ShopDrawerNavigator.Screen
            name="Products"
            component={ProductsNavigator}
            options={{
                drawerIcon: drawerConfig => <Ionicons
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            }}
        />
        <ShopDrawerNavigator.Screen
            name="Orders"
            component={OrdersNavigator}
            options={{
                drawerIcon: props => <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={props.color}
                />
            }}
        />
        <ShopDrawerNavigator.Screen
            name="Admin"
            component={AdminNavigator}
            options={{
                drawerIcon: props => <Ionicons
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23}
                    color={props.color}
                />
            }}
        />
    </ShopDrawerNavigator.Navigator>
};

// const ShopNavigator = createDrawerNavigator({
//     Products: ProductsNavigator,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//         const dispatch = useDispatch();
//         return (
//             <View style={{ flex: 1 }}>
//                 <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//                     <DrawerItems {...props} />
//                     <Button title='Logout' color={Colors.primary} onPress={() => {
//                         dispatch(authActions.logout());
//                         //props.navigation.navigate('Auth');
//                     }}
//                     />
//                 </SafeAreaView>
//             </View>
//         )
//     }
// })

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions} >
        <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={AuthOptions} />
    </AuthStackNavigator.Navigator>
}

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions
// });





// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(ProductsNavigator);