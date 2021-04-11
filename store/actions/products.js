import Product from "../../models/product";

export const fetchProducts = () => {
    return async (dispatch,getState) => {
        //here I can use any async code I want.
        const userId = getState().auth.userId;
        try {
            const response = await fetch('https://[your database url]]/products.json');

            if (!response.ok) {
                throw new Error('Something is Wrong');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    ));
            }

            //This will be triggered after finishing the above code blocks.
            dispatch({
                type: 'SET_PRODUCTS',
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod=>prod.ownerId===userId)
            })
        }
        catch (error) {
            //Can log here
            throw error;
        }

    }
};

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        //here I can use any async code I want.
        const token = getState().auth.token;


        const response = await fetch(`https://[your database url]]/products/${productId}.json?auth=${token}`,
            {
                method: 'DELETE'
            }
        );


        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        dispatch({
            type: 'DELETE_PRODUCT',
            pid: productId
        });
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        //here I can use any async code I want.
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://[your database url]]/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        });

        //Side Note: returns the Id of the data.
        const resData = await response.json();
        
        //This will be triggered after finishing the above code blocks.
        dispatch({
            type: 'CREATE_PRODUCT',
            productData: {
                //Id comes as name property from the firebase
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        try {

            //redux-thunk allows us to get the redux store
            const token = getState().auth.token;

            //****IMPORTANT. */
            //PUT will replace the hole object while PATCH will only replace the specified properties of the object.
            const response = await fetch(`https://[your database url]]/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            });

            if (!response.ok) {
                throw new Error('Something is Wrong');
            }

            dispatch(
                {
                    type: 'UPDATE_PRODUCT',
                    pid: id,
                    productData: {
                        title,
                        description,
                        imageUrl
                    }
                });
        } catch (error) {
            throw error;
        }

    }



}