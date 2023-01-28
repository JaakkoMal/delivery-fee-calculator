import { useState } from 'react'
import { Calculator } from '../components/Calculator'
import { OrderInfo } from '../types/Types'
import { calculateDeliveryCost } from '../utils/functions'

const initialOrderInfo: OrderInfo = {
    cartValue: 0,
    deliveryDistance: 0,
    amountItems: 0,
    orderDate: new Date(),
    orderTime: new Date(),
    deliveryCost: 0
}

export function CalculatorContainer() {

    const [orderInfo, setOrderInfo] = useState<OrderInfo>(initialOrderInfo)

    const onChangeCartValue = (cartValue: number) => {
        setOrderInfo(prev => { return {...prev, cartValue: Number(cartValue)}})
        console.log("Flotarilla: ", cartValue)
    }

    const onChangeDeliveryDistance = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newDeliveryDistance = Number(e.target.value)
        if (!Number.isNaN(newDeliveryDistance)) {
            console.log(newDeliveryDistance)
            setOrderInfo(prev => { return {...prev, deliveryDistance: newDeliveryDistance}})
        } else {
            console.log("Not a number (delivery distance).")
        }
    }

    const onChangeAmountItems = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newAmountItems = Number(e.target.value)
        if (!Number.isNaN(newAmountItems)) {
            setOrderInfo(prev => {return {...prev, amountItems: newAmountItems}})
        } else {
            console.log("Not a number (amount items).")
        }
    }

    const onChangeOrderDate = (newOrderDate: Date ) => {
        setOrderInfo(prev => { return {...prev, orderDate: newOrderDate}})
    }

    const onChangeOrderTime = (newOrderTime: Date) => {
        setOrderInfo(prev => { return {...prev, orderTime: newOrderTime}})
    }

    const onChangeDeliveryCost = (fullOrderInfo: OrderInfo) => {
        setOrderInfo(prev => { return {...prev, deliveryCost: calculateDeliveryCost(fullOrderInfo)}})
    }

    return (
        <Calculator 
        orderInfo={orderInfo} 
        onChangeCartValue={onChangeCartValue}
        onChangeDeliveryDistance={onChangeDeliveryDistance}
        onChangeAmountItems={onChangeAmountItems}
        onChangeOrderDate={onChangeOrderDate}
        onChangeOrderTime={onChangeOrderTime}
        onChangeDeliveryCost={onChangeDeliveryCost}
        />
    )
}