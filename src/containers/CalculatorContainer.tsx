import { useState } from 'react'
import { Calculator } from '../components/Calculator'

type CalculatorProps = {
    total: number
}


export function CalculatorContainer() {

    const [cartValue, setCartValue] = useState<number>(0)
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0)
    const [amountItems, setAmountItems] = useState<number>(0)
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")


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
            />
    )
}