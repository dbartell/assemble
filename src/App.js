import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar';

import CartPage from './CartPage'
import Checkout from './Checkout'
import ThankYou from './ThankYou'
import NoMatch from './NoMatch'

import CartIcon from './assets/cart.svg';

const primaryBlue = 'rgb(3, 75, 189)';

const Body = styled.div`
    padding: 0;
`
const CartNum = styled.span`
    background: white;
    color: ${primaryBlue};
    border-radius: 100%;
    font-size: 9px;
    padding: 2px 4px;
    line-height: 1;
    position: absolute;
    bottom: -2px;
    right: -10px;
    border: 2px solid ${primaryBlue};
`
export default function App() {

    const [cart, setCart] = useState([
        { sku: 38094374, unitPrice: 24.0, name: "Red Shirt", quantity: 2 },
        { sku: 38094375, unitPrice: 24.0, name: "Blue Shirt", quantity: 1 },
        { sku: 38094321, unitPrice: 12.0, name: "Blue socks", quantity: 4 }
    ])

    const [cartNum, setCartNum] = useState(cart.reduce((acc, item) => {
        return acc + item.quantity
    }, 0))

    const [cartTotal, setCartTotal] = useState(cart.reduce((acc, item) => {
        return acc + (item.unitPrice * item.quantity)
    }, 0))

    return (
        <Router>
            <Body>
                <Navbar style={{backgroundColor: primaryBlue}} className="justify-content-between">
                    <Navbar.Brand style={{color: 'white', fontWeight: 500}} href="/">Assemble Store</Navbar.Brand>
                    <span style={{position: 'relative'}}>
                        <CartNum>{cartNum}</CartNum>
                        <img src={CartIcon} alt="Cart icon"/>
                    </span>
                </Navbar>
                <Switch>
                    <Route exact path="/">
                        <CartPage cart={cart} cartActions={{cartNum, setCartNum, cartTotal, setCartTotal, setCart}} />
                    </Route>
                    <Route path="/checkout">
                        <Checkout cart={cart} cartActions={{cartNum, setCartNum, cartTotal, setCartTotal, setCart}} />
                    </Route>
                    <Route path="/thank-you">
                        <ThankYou />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Body>
        </Router>
    );
}
