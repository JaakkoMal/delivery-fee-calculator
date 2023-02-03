import { useEffect, useState } from 'react'
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
/////////
export function CalculatorContainer() {

    const [orderInfo, setOrderInfo] = useState<OrderInfo>(initialOrderInfo)
    const [isCalculationDisabled, setIsCalculationDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (orderInfo.cartValue === 0 || orderInfo.deliveryDistance === 0 || orderInfo.amountItems === 0) {
            setIsCalculationDisabled(true)
        } else {
            setIsCalculationDisabled(false)
        }
    }, [orderInfo.cartValue, orderInfo.deliveryDistance, orderInfo.amountItems])

    const onChangeCartValue = (cartValue: number) => {
        setOrderInfo(prev => { return {...prev, cartValue: Number(cartValue)}})
    }

    const onChangeDeliveryDistance = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newDeliveryDistance = Number(e.target.value)
        if (!Number.isNaN(newDeliveryDistance)) {
            setOrderInfo(prev => { return {...prev, deliveryDistance: newDeliveryDistance}})
        }
    }

    const onChangeAmountItems = (e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault()
        const newAmountItems = Number(e.target.value)
        if (!Number.isNaN(newAmountItems)) {
            setOrderInfo(prev => {return {...prev, amountItems: newAmountItems}})
        } 
    }

    const onChangeOrderDate = (newOrderDate: Date ) => {
        console.log(newOrderDate)
        setOrderInfo(prev => { return {...prev, orderDate: newOrderDate}})
    }

    const onChangeOrderTime = (newOrderTime: Date) => {
        setOrderInfo(prev => { return {...prev, orderTime: newOrderTime}})
    }

    /*const isCalculationDisabled = (): boolean => {
        return (orderInfo.cartValue === 0 || orderInfo.deliveryDistance === 0 || orderInfo.amountItems === 0)
    }*/

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
        isCalculationDisabled={isCalculationDisabled}
        />
    )
}