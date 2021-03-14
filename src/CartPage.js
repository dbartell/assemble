import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table';

import MinusIcon from './assets/Minus.svg';
import AddIcon from './assets/Add.svg';

import RedShirt1x from './assets/red-shirt.png'
import RedShirt2x from './assets/red-shirt@2x.png'
import RedShirt3x from './assets/red-shirt@3x.png'
import BlueShirt1x from './assets/blue-shirt.png'
import BlueShirt2x from './assets/blue-shirt@2x.png'
import BlueShirt3x from './assets/blue-shirt@3x.png'
import BlueSocks1x from './assets/blue-socks.png'
import BlueSocks2x from './assets/blue-socks@2x.png'
import BlueSocks3x from './assets/blue-socks@3x.png'

const RedShirt = [RedShirt1x, RedShirt2x, RedShirt3x]
const BlueShirt = [BlueShirt1x, BlueShirt2x, BlueShirt3x]
const BlueSocks = [BlueSocks1x, BlueSocks2x, BlueSocks3x]

const lightGray = 'rgb(163,166,169)';

const TableLargeHeader = styled.th`
    font-weight: 400;
    font-size: 2rem;
    width: 20%;
    border-top: none!important;
`
const TableSmallHeader = styled.th`
    color: ${lightGray};
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
    border-top: none!important;
    @media only screen and (max-width: 768px) {
        display: none;
    }
`
const ItemData = styled.td`
    vertical-align: middle!important;
`
const ItemTitle = styled.h3`
    font-size: 1rem;
    line-height: 1;
`
const Sku = styled.p`
    color: ${lightGray};
    font-size: 0.85rem;
    line-height: 1;
`
const ProductImage = styled.img`
    width: 50%;
`
const IncrementPlus = styled.img`
    margin: 0 0 0 10px;
`
const IncrementMinus = styled.img`
    margin: 0 10px 0 0;
`
const TableSmallFooter = styled.td`
    color: ${lightGray};
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
`
const BorderTopRow = styled.tr`
    border-top: 1px solid #dee2e6;
`
const BorderLessData = styled.td`
    border-top: none!important;
`
const StyledButton = styled.button`
    float: right;
    background-color: rgb(3,75,189);
    border-radius: 0;
    border: none;
    padding: 11px 22px;
    color: white;
    text-transform: uppercase;
    font-size: 0.75rem;
    margin-top: 25%;
`

export default function CartPage({cart, cartActions}) {

    const increment = (listItem, value) => {
        const currentItem = cart.find(item => {
            return item.sku === listItem.sku
        })

        currentItem.quantity = currentItem.quantity + value
        cartActions.setCart(cart)

        cartActions.setCartTotal(calculateCart)

        const newCartValue = cartActions.cartNum + value
        cartActions.setCartNum(newCartValue)
    }

    const calculateCart = function() {
        const newTotal = cart.reduce((acc, item) => {
            return acc + (item.unitPrice * item.quantity)
        }, 0)
        return newTotal
    }

    return (
        <Table style={{width: '90%', margin: '5% auto 0', maxWidth: '1440px'}}>
            <thead>
                <tr>
                    <TableLargeHeader>
                        <h2>
                            Your Cart
                        </h2>
                    </TableLargeHeader>
                    <TableSmallHeader></TableSmallHeader>
                    <TableSmallHeader>Quantity</TableSmallHeader>
                    <TableSmallHeader>Price</TableSmallHeader>
                </tr>
            </thead>
            <tbody>
                {cart.map(item => {
                    let productImages = [];
                    switch(item.sku) {
                        case 38094374:
                            productImages = RedShirt
                            break;
                        case 38094375:
                            productImages = BlueShirt
                            break;
                        case 38094321:
                            productImages = BlueSocks
                            break;
                        default:
                            break;
                    }
                    return (
                        <tr key={item.sku}>
                            <ItemData>
                                <ProductImage
                                    src={productImages[0]}
                                    srcSet={`${productImages[1]} 1024w, ${productImages[2]} 1440w`}
                                    alt="Item image"
                                />
                            </ItemData>
                            <ItemData>
                                <ItemTitle>{item.name}</ItemTitle>
                                <Sku>SKU# {item.sku}</Sku>
                            </ItemData>
                            <ItemData>
                                <div>
                                    <IncrementMinus src={MinusIcon} onClick={() => increment(item, -1)}></IncrementMinus>
                                    <span>{item.quantity}</span>
                                    <IncrementPlus src={AddIcon} onClick={() => increment(item, 1)}></IncrementPlus>
                                </div>
                            </ItemData>
                            <ItemData>${item.unitPrice.formatMoney(2)}</ItemData>
                        </tr>
                    )
                })}
                <BorderTopRow>
                    <ItemData></ItemData>
                    <ItemData></ItemData>
                    <TableSmallFooter>Subtotal</TableSmallFooter>
                    <ItemData>${cartActions.cartTotal.formatMoney(2)}</ItemData>
                </BorderTopRow>
                <tr>
                    <BorderLessData></BorderLessData>
                    <BorderLessData></BorderLessData>
                    <BorderLessData></BorderLessData>
                    <BorderLessData style={{width: '20%'}}>
                        <Link to="/checkout">
                            <StyledButton>Check out</StyledButton>
                        </Link>
                    </BorderLessData>
                </tr>
            </tbody>
        </Table>
    )
}

Number.prototype.formatMoney = function(e, t, a) {
    var n = this,
        e = isNaN(e = Math.abs(e)) ? 2 : e,
        t = void 0 === t ? "." : t,
        a = void 0 === a ? "," : a,
        o = 0 > n ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(e)) + "",
        r = (r = i.length) > 3 ? r % 3 : 0;
    return o + (r ? i.substr(0, r) + a : "") + i.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + a) + (e ? t + Math.abs(n - i).toFixed(e).slice(2) : "")
};