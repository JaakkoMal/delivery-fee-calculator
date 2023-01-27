import { useState } from 'react'
import { Calculator } from '../components/Calculator'
import { OrderInfo } from '../types/Types'


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

    const onChangeCartValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newCartValue = e.target.value
        setOrderInfo(prev => { return {...prev, cartValue: Number(newCartValue)}})
        console.log(newCartValue)
    }

    const onChangeDeliveryDistance = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newDeliveryDistance = Number(e.target.value)
        if(!Number.isNaN(newDeliveryDistance)){
            setOrderInfo(prev => { return {...prev, deliveryDistance: newDeliveryDistance}})
        } else {
            console.log("Not a number (delivery distance).")
        }
    }

    const onChangeAmountItems = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newAmountItems = Number(e.target.value)
        if(!Number.isNaN(newAmountItems)){
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


    const calculateDeliveryCost = () => {
        // Check if user has made any inputs
        if(orderInfo.cartValue === 0 && orderInfo.amountItems === 0 && orderInfo.deliveryDistance === 0) return
        if(orderInfo.cartValue >= 100) {
            setOrderInfo(prev => {return {...prev, deliveryCost: 0}})
            return
        }
        // Delivery cost with first 1000m base cost
        let totalDeliveryCost: number = 2
        // Add subcharge if needed
        if(orderInfo.cartValue < 10) totalDeliveryCost += 10 - orderInfo.cartValue
        // Add additional 1€ for each beginning 500m after the first 1000m
        if(orderInfo.deliveryDistance > 1000){
            const deliveryDistanceAfterOneKilometer = orderInfo.deliveryDistance - 1000
            const costToAdd = Math.ceil(deliveryDistanceAfterOneKilometer / 500)
            totalDeliveryCost += costToAdd
        }
        // See if more than 12 items
        if(orderInfo.amountItems > 12 && totalDeliveryCost < 15) totalDeliveryCost += 1.2
        if(orderInfo.amountItems >= 5 && totalDeliveryCost < 15) totalDeliveryCost += (orderInfo.amountItems - 4) * 0.5  
        if(totalDeliveryCost < 15 && orderInfo.orderDate.getDay() === 5 && (orderInfo.orderTime.getUTCHours() >= 15 && orderInfo.orderTime.getUTCHours() < 19)) totalDeliveryCost *= 1.2
        if(totalDeliveryCost > 15) {
            setOrderInfo(prev => { return {...prev, deliveryCost: 15} })
        } else {
            setOrderInfo(prev => { return {...prev, deliveryCost: totalDeliveryCost} })
        }
    }

    return (
        <Calculator 
        orderInfo={orderInfo} 
        onChangeCartValue={onChangeCartValue}
        onChangeDeliveryDistance={onChangeDeliveryDistance}
        onChangeAmountItems={onChangeAmountItems}
        onChangeOrderDate={onChangeOrderDate}
        onChangeOrderTime={onChangeOrderTime}
        calculateDeliveryCost={calculateDeliveryCost}
        />
    )
}