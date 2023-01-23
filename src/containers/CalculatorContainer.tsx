import { useState } from 'react'
import { Calculator } from '../components/Calculator'

export type CalculationTypes = {
    cartValue: number
    deliveryDistance: number
    amountItems: number
    orderDate: Date
    orderTime: Date
}

export function CalculatorContainer() {

    const [cartValue, setCartValue] = useState<number>(0)
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0)
    const [amountItems, setAmountItems] = useState<number>(0)
    const [orderDate, setOrderDate] = useState<Date>(new Date())
    const [orderTime, setOrderTime] = useState<Date>(new Date())
    const [deliveryCost, setDeliveryCost] = useState<number>(0)


    const onChangeCartValue = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        // EI NÄIN
        const newCartValue = e.target.value
        const regex = /^[0-9\b]/
        if(regex.test(newCartValue) || newCartValue === ''){
            setCartValue(Number(newCartValue))
        } else {
            return
        }
        
    }

    const onChangeDeliveryDistance = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newDeliveryDistance = Number(e.target.value)
        if(!Number.isNaN(newDeliveryDistance)){
            setDeliveryDistance(newDeliveryDistance)
        } else {
            console.log("Not a number (delivery distance).")
        }

        console.log(orderDate)
    }

    const onChangeAmountItems = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newAmountItems = Number(e.target.value)
        if(!Number.isNaN(newAmountItems)){
            setAmountItems(newAmountItems)
        } else {
            console.log("Not a number (amount items).")
        }
    }


    const calculateDeliveryCost = (variables: CalculationTypes) => {
        if(cartValue >= 100) {
            setDeliveryCost(0)
            return
        }
        // Delivery cost with first 1000m base cost
        let totalDeliveryCost: number = 2
        console.log(`Delivery base charge: `, totalDeliveryCost)
        // Add subcharge if needed
        if(cartValue < 10) totalDeliveryCost += 10 - cartValue
        console.log(`Delivery, cart value ${cartValue} with surcharge: `, totalDeliveryCost)
        // Add additional 1€ for each beginning 500m after the first 1000m
        if(deliveryDistance > 1000){
            const deliveryDistanceAfterOneKilometer = deliveryDistance - 1000
            const costToAdd = Math.ceil(deliveryDistanceAfterOneKilometer / 500)
            totalDeliveryCost += costToAdd
            console.log(`Delivery after km charge for ${deliveryDistanceAfterOneKilometer}km`, totalDeliveryCost)
        }
        // See if more than 12 items
        if(amountItems > 12 && totalDeliveryCost < 15) totalDeliveryCost += 1.2
        console.log(`Delivery with bulk for over 12 items ${amountItems}: `, totalDeliveryCost)
        if(amountItems >= 5 && totalDeliveryCost < 15) totalDeliveryCost += (amountItems - 4) * 0.5  
        console.log(`For ${amountItems - 4} items added 0.5€: `, totalDeliveryCost)
        if(totalDeliveryCost < 15 && orderDate.getDay() === 5 && (orderTime.getUTCHours() >= 15 && orderTime.getUTCHours() < 19)) totalDeliveryCost *= 1.2
        console.log(`For friday rush time ${orderTime.getUTCHours()} multiplied 1.2€ to ${totalDeliveryCost}`, totalDeliveryCost)
        if(totalDeliveryCost > 15) {
            console.log("over 15")
            setDeliveryCost(15)
        } else {
            setDeliveryCost(totalDeliveryCost)
        }
    }

    return (
        <Calculator 
            onChangeCartValue={onChangeCartValue} 
            cartValue={cartValue}
            onChangeDeliveryDistance={onChangeDeliveryDistance}
            deliveryDistance={deliveryDistance}
            onChangeAmountItems={onChangeAmountItems}
            amountItems={amountItems}
            setOrderDate={(date: Date) => setOrderDate(date)}
            orderDate={orderDate}
            setOrderTime={(time: Date) => setOrderTime(time)}
            orderTime={orderTime}
            calculateDeliveryCost={calculateDeliveryCost}
            deliveryCost={deliveryCost}
            />
    )
}