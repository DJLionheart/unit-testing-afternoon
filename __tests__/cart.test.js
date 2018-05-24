let cart = require('../cart');
let cars = require('../data/cars');

afterEach( () => {
    cart.cart = [];
    cart.total = 0;
})


describe('Cart Properties', () => {
    test('Cart should be an empty array', () => {
        let flag = true;
        let arr = Array.isArray(cart.cart);

        if(!arr || cart.cart.length > 0) {
            flag = false;
        }
        expect(flag).toBeTruthy();
    })

    test('Total should be 0', () => {
        expect(cart.total).toEqual(0);
    })
})

describe('Cart Methods', () => {
    test('addToCart method should add one car object to the end of the cart array', () => {
        let flag = true;
        cart.addToCart(cars[0]);
        cart.addToCart(cars[5]);
        if(cart.cart[0] !== cars[0] || cart.cart[1] !== cars[5] || cart.cart.length !== 2) {
            flag = false;
        }
        expect(flag).toBeTruthy();
    })

    test('addToCart method should increase total by the price of the selected car', () => {
        cart.addToCart(cars[7]);
        cart.addToCart(cars[3]);
        cart.addToCart(cars[10]);
        
        expect(cart.total).toEqual(cars[7].price + cars[3].price + cars[10].price);
    })

    test('removeFromCart method should remove one car from the array and maintain object order', () => {
        let flag = true;
        cart.addToCart(cars[19]);
        cart.addToCart(cars[14]);
        cart.addToCart(cars[12]);
        cart.addToCart(cars[5]);
        cart.removeFromCart(1, cart.cart[1].price);

        expect(cart.cart).toEqual([cars[19], cars[12], cars[5]]);
    })

    test('removeFromCart method should decrease total property by the price of selected car', () => {
        cart.addToCart(cars[1]);
        cart.addToCart(cars[13]);
        cart.addToCart(cars[9]);
        cart.removeFromCart(2, cars[9].price);
        cart.removeFromCart(0, cars[1].price);

        expect(cart.total).toEqual(cars[13].price);
    })

    test('checkout method should return cart length and total to 0', () => {
        let flag = true;
        cart.addToCart(cars[18]);
        cart.addToCart(cars[6]);
        cart.addToCart(cars[14]);
        cart.checkout()

        if(cart.cart.length > 0 || cart.total > 0) {
            flag = false;
        }

        expect(flag).toBeTruthy();
    })
})