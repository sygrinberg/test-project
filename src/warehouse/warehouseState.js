const productsMap =  {
    Milk: {
        quantity: 10,
        location: [5, 6]
    },
    Bread: {
        quantity: 10,
        location: [1, 5]
    },
    Salt: {
        quantity: 10,
        location: [6, 5]
    },
    Soap: {
        quantity: 10,
        location: [8, 9]
    },
    Pasta: {
        quantity: 10,
        location: [9, 2]
    },
};

module.exports = {
    isProductExists: name => productsMap.hasOwnProperty(name),
    getProductLocation: name => productsMap[name] && productsMap[name].location,
    getStock: () => Object.keys(productsMap)
        .reduce((prev, product) => {
            return [...prev, {
                name: product,
                amount: productsMap[product].quantity
            }];
        }, []),

    // I made this section very quickly so its not written well at all.
    updateStock: (product, type) => {
        console.log('type')
        console.log(type)
        if (type === 'put_to_stock') {
            if (!productsMap[product]) {
                throw new Error('Product does not exist!');
            }
            productsMap[product].quantity = productsMap[product].quantity + 1;
        } else if (productsMap[product] && productsMap[product].quantity) {
            productsMap[product].quantity = productsMap[product].quantity - 1;
        } else {
            return false;
        }
        return true;
    }
};