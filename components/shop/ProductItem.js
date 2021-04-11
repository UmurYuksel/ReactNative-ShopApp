import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Card from '../UI/Card';

//My Cart example !!!
const ProductItem = props => {

    const TouchableComponent = TouchableOpacity;

    //To fix ripple effect on android =>
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    //useForeground to show the effect only on the container.
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    );
};


const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        marginVertical: 1
    },
    price: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: '#888',
        marginVertical: 5
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
});

export default ProductItem;