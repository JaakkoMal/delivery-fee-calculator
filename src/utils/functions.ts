import { OrderInfo } from '../types/Types'

export const checkInvalidCharacters = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const invalidCharacters: string[] = ['e','+','-',',','.']
    if (invalidCharacters.includes(e.key)) e.preventDefault()
}

export const checkInvalidCharactersForFloat = (e: React.KeyboardEvent<HTMLInputElement>, currentValue: string): void => {
    const invalidCharacters: string[] = ['e','+','-']
    if (invalidCharacters.includes(e.key)) e.preventDefault()

    const commaAndDot = /^[\.\,]/
    if (commaAndDot.test(e.key) && currentValue.includes('.')) e.preventDefault()
}

// Delivery Cost calculation functions

const isCartValueHundredOrMore = (cartValue: number): boolean => {
    const limitValueForFreeDelivery: number = 100
    if (cartValue >= limitValueForFreeDelivery) return true
    return false
}

const addSmallOrderSurchargeIfNeeded = (cartValue: number): number => {
    const minValueForNoSurcharge = 10
    if (cartValue < minValueForNoSurcharge) return minValueForNoSurcharge - cartValue
    return 0
}

const addFeeForEveryBeginning500m = (deliveryDistance: number): number => {
    if (deliveryDistance > 1000) {
        const deliveryDistanceMinusFirstKilometer = deliveryDistance - 1000
        const feeToAdd = Math.ceil(deliveryDistanceMinusFirstKilometer / 500)
        return feeToAdd
    }
    return 0
}

const isDeliveryCostAtMaximum = (currentDeliveryCost: number): boolean => {
    const maxDeliveryCost: number = 15
    return currentDeliveryCost >= maxDeliveryCost
}

const addFeeForMultipleItems = (amountItems: number): number => {
    let multipleItemFee: number = 0
    const bulkFee: number = 1.2
    const itemLimitForBulkFee: number = 12
    const extraItemFee: number = 0.5
    const limitForExtraItemFee: number = 5
    
    if (amountItems >= limitForExtraItemFee) {
        multipleItemFee += (amountItems - 4) * extraItemFee  
        if (amountItems > itemLimitForBulkFee) multipleItemFee += bulkFee
    }
    return multipleItemFee
} 

const isFridayRush = (orderDate: Date, orderTime: Date): boolean => {
    const friday: number = 5
    const rushBeginTime: number = 15
    const rushEndTime: number = 19

    if (orderDate.getDay() === friday && (orderTime.getUTCHours() >= rushBeginTime && orderTime.getUTCHours() < rushEndTime)) return true
    return false
}

const addRushTimeFee = (currentDeliveryCost: number): number => {
    return currentDeliveryCost * 1.2
}

export const calculateDeliveryCost = (fullOrderInfo: OrderInfo): number => {
    let totalDeliveryCost: number = 2
    const isFreeDelivery = isCartValueHundredOrMore(fullOrderInfo.cartValue)

    if (isFreeDelivery) {
        return totalDeliveryCost
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

    if (isDeliveryCostAtMaximum(totalDeliveryCost)) return 15

    return totalDeliveryCost
}

