import express from 'express';
import CartItems from './cartitems';
const routes = express.Router();

const cartItems: CartItems[] = [
    { id: 1, product: "milk", price: 1.89, quantity: 3 },
    { id: 2, product: "eggs", price: 2.48, quantity: 1 },
    { id: 3, product: "bread", price: 2.99, quantity: 2 },
    { id: 4, product: "juice", price: 1.99, quantity: 1 },
];

let nextId: number = 5;

routes.get("./cartitems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const cartItem: CartItems|undefined = cartItems.find(cartItem => cartItem.id === id);
    if (cartItem) {
        res.json(cartItem);
    } else {
        res.status(404);
        res.send(`No Cart Item found with ID: ${id}`);
    }
});

routes.post("./cartitems/:id", (req, res) => {
    let cartItem: CartItems = req.body;
    cartItem.id = nextId;
    nextId++;
    cartItems.push(cartItem);
    res.status(201);
    res.json(cartItem);
});

routes.put("./cartitems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    let cartItem: CartItems = req.body;
    cartItem.id = id;
    const index: number = cartItems.findIndex(cartItem => cartItem.id === id);
    if (index !== -1) {
        cartItems[index] = cartItem;
        res.json(cartItem);
    } else {
        res.status(404);
        res.send(`No Cart Item found with ID: ${id}`);
    }
});

routes.delete("./cartiems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const index: number = cartItems.findIndex(cartItem => cartItem.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    res.status(204);
    res.send();
});


export default routes;