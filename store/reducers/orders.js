import Order from '../../models/order';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ('ADD_ORDER'):
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );
            return { ...state, orders: state.orders.concat(newOrder) }
        case ('SET_ORDERS'):
            return {
                orders: action.orders
            }
    }
    return state;
}

//Side note every react actions reach every reducer.