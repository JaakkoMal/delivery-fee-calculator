import { OrderInfo } from '../types/Types'

export const isValidForIntegerCharacter = (inputValue: string): boolean => {
    const invalidCharacters: string[] = ['E','e','+','-',',','.']
    if (invalidCharacters.includes(inputValue)) return false
    return true
}

export const isValidForFloatValue = (inputValue: string, currentValue: string): boolean => {
    const invalidCharacters: string[] = ['E','e','+','-']
    const commaAndDot = /^[\.\,]/
    if (invalidCharacters.includes(inputValue)) return false
    if (commaAndDot.test(inputValue) && currentValue.includes('.' || ',')) return false
    return true
}

// Function to make sure user input never has more than 2 decimals
export const checkDecimalCount = (floatValueString: string): boolean => {
    const floatValueWithDecimalPoint: string = floatValueString.replace(',', '.')
    if ((floatValueWithDecimalPoint.includes('.') && floatValueWithDecimalPoint.split('.')[1].length > 2)) return true
    return false
}

// Delivery Cost calculation functions

export const isCartValueHundredOrMore = (cartValue: number): boolean => {
    const limitValueForFreeDelivery: number = 100
    if (cartValue >= limitValueForFreeDelivery) return true
    return false
}

export const addSmallOrderSurchargeIfNeeded = (cartValue: number): number => {
    // Use cents in calculations to prevent rounding errors. Multiplying cartValue by hundred is enough, 
    // since checkDecimalCount prevents more than 2 decimals in user input for cartValue
    const minValueForNoSurchargeInCents = 1000
    const cartValueInCents = cartValue * 100
    if (cartValueInCents < minValueForNoSurchargeInCents) {
        return (minValueForNoSurchargeInCents - cartValueInCents) / 100
    }
    return 0
}

export const addFeeForEveryBeginning500m = (deliveryDistance: number): number => {
    if (deliveryDistance > 1000) {
        const deliveryDistanceMinusFirstKilometer = deliveryDistance - 1000
        const feeToAdd = Math.ceil(deliveryDistanceMinusFirstKilometer / 500)
        return feeToAdd
    }
    return 0
}

export const isDeliveryCostAtMaximum = (currentDeliveryCost: number): boolean => {
    const maxDeliveryCost: number = 15
    return currentDeliveryCost >= maxDeliveryCost
}

export const addFeeForMultipleItems = (amountItems: number): number => {
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

export const isFridayRush = (orderDate: Date, orderTime: Date): boolean => {
    const friday: number = 5
    const rushBeginTime: number = 15
    const rushEndTime: number = 19

    if (orderDate.getDay() === friday && (orderTime.getUTCHours() >= rushBeginTime && orderTime.getUTCHours() < rushEndTime)) return true
    return false
}

export const addRushTimeFee = (currentDeliveryCost: number): number => {
    return currentDeliveryCost * 1.2
}

export const calculateDeliveryCost = (fullOrderInfo: OrderInfo): number => {
    if (fullOrderInfo.cartValue === 0 || fullOrderInfo.amountItems === 0) return 0
    let totalDeliveryCost: number = 2
    const isFreeDelivery = isCartValueHundredOrMore(fullOrderInfo.cartValue)

    if (isFreeDelivery) {
        return 0
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
