import { useState } from 'react'
import { Calculator } from '../components/Calculator'
import { OrderInfo } from '../types/Types'
import { 
    isCartValueHundredOrMore,
    addSmallOrderSurchargeIfNeeded,
    addFeeForEveryBeginning500m,
    isDeliveryCostAtMaximum,
    addFeeForMultipleItems,
    isFridayRush,
    addRushTimeFee
} from '../utils/functions'

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
        if(!Number.isNaN(newDeliveryDistance)){
            console.log(newDeliveryDistance)
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

    const calculateDeliveryCost = (fullOrderInfo: OrderInfo) => {
        let totalDeliveryCost: number = 2
        const isFreeDelivery = isCartValueHundredOrMore(fullOrderInfo.cartValue)

        if (isFreeDelivery) {
            setOrderInfo(prev => { return {...prev, deliveryCost: 0}})
            return
        }
        
        totalDeliveryCost += addSmallOrderSurchargeIfNeeded(fullOrderInfo.cartValue)
        totalDeliveryCost += addFeeForEveryBeginning500m(fullOrderInfo.deliveryDistance)

        if (!isDeliveryCostAtMaximum(totalDeliveryCost)) {
            totalDeliveryCost += addFeeForMultipleItems(fullOrderInfo.amountItems)
        }

        if (!isDeliveryCostAtMaximum(totalDeliveryCost)) {
            if (isFridayRush(fullOrderInfo.orderDate, fullOrderInfo.orderTime)) {
                totalDeliveryCost = addRushTimeFee(totalDeliveryCost)
            }
        }

        if (!isDeliveryCostAtMaximum(totalDeliveryCost)) {
            setOrderInfo(prev => { return {...prev, deliveryCost: totalDeliveryCost}})
        } else {
            setOrderInfo(prev => { return {...prev, deliveryCost: 15}})
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