import { useState } from 'react'
import { Calculator } from '../components/Calculator'

type CalculatorProps = {
    total: number
}

/*const day = '11-01-2023'
        const time = '17:00'
        const daytime = day + ' ' + time
        const newDate = new Date(daytime)
        console.log(newDate)*/

export function CalculatorContainer() {

    const [cartValue, setCartValue] = useState<number>(0)
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0)
    const [amountItems, setAmountItems] = useState<number>(0)
    const [orderDate, setOrderDate] = useState<Date>(new Date())
    const [orderTime, setOrderTime] = useState<Date>(new Date())


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
            />
    )
}