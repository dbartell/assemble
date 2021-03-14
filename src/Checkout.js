import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const lightGray = 'rgb(163,166,169)';
const primaryBlue = 'rgb(3, 75, 189)';

const Form = styled.form`
    width: 90%;
    margin: 5% auto 0;
    max-width: 1440px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5%;
`
const Header = styled.h2`
    width: 100%;
    border-bottom: 1px solid #dee2e6;
    font-weight: 400;
    padding-bottom: 5px;
    grid-column-start: 1;
    grid-column-end: 3;
`
const LeftCheckout = styled.div``
const RightCheckout = styled.div``

const FormHeader = styled.h3`
    font-size: 18px;
    margin-top: 2rem;
    margin-bottom: 15px;
`
const FormField = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
`
const FormLabel = styled.div`
    font-size: 0.95rem;
`
const FormInput = styled.input`
    border: none;
    color: black;
    font-size: 0.95rem;
    padding: 5px 15px;
    width: 70%;
`
const FormSelect = styled.select`
    width: 100%;
    border: none;
    padding: 7px 10px;
`
const Footer = styled.div`
    padding-top: 2%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #dee2e6;
    grid-column-start: 1;
    grid-column-end: 3;
`
const DefaultButton = styled.button`
    border: none;
    padding: 11px 22px;
    color: white;
    font-size: 11px;
    text-transform: uppercase;
    background-color: ${lightGray};
`
const PrimaryButton = styled.button`
    border: none;
    padding: 11px 22px;
    color: white;
    font-size: 11px;
    text-transform: uppercase;
    background-color: ${primaryBlue};
`

const onSubmit = async (data) => {
    console.log('data: ', data)
    try {
        //SUBMIT FORM
        //REDIRECT USING REACT ROUTER DOM
    } catch (error) {
        console.err(error)
    }
}

export default function Checkout({cart, cartActions}) {

    const { register, handleSubmit, errors } = useForm()

    const tax = cartActions.cartTotal * 0.1

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>Check Out</Header>
            <LeftCheckout>
                <FormHeader>Payment Information</FormHeader>
                <FormField>
                    <FormLabel>Name on Card</FormLabel>
                    <FormInput name="nameOnCard" ref={register({required: true})} type="text" placeholder="Name on Card"></FormInput>
                </FormField>
                <FormField>
                    <FormLabel>Card Number</FormLabel>
                    <FormInput name="cardNumber" ref={register({required: true})} type="text" placeholder="XXXX XXXX XXXX XXXX"></FormInput>
                </FormField>
                <FormField>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormField style={{width: '70%', marginBottom: 0}}>
                        <FormSelect name="cardMonth" ref={register({required: true})} value="" style={{width: '49%'}}>
                            <option value="MM">MM</option>
                            <option value="Jan">01</option>
                        </FormSelect>
                        <FormSelect name="cardYear" ref={register({required: true})} style={{width: '49%'}}>
                            <option value="YYYY">YYYY</option>
                            <option value="2021">2021</option>
                        </FormSelect>
                    </FormField>
                </FormField>
                <FormField>
                    <FormLabel>CVV</FormLabel>
                    <FormInput name="cvv" ref={register({required: true})} type="text" placeholder="XXX"></FormInput>
                </FormField>
            </LeftCheckout>
            <RightCheckout>
                <FormHeader>Total</FormHeader>
                <div>Subtotal: ${cartActions.cartTotal.formatMoney(2)}</div>
                <div>Tax (10%): ${tax.formatMoney(2)}</div>
                <div>Total: ${(cartActions.cartTotal + tax).formatMoney(2)}</div>
            </RightCheckout>
            <Footer>
                <Link to="/"><DefaultButton>Continue shopping</DefaultButton></Link>
                <PrimaryButton type="submit">Place order</PrimaryButton>
            </Footer>
        </Form>
    );
}