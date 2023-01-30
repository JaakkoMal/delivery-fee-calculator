import { describe, expect, it } from 'vitest'
import { 
    calculateDeliveryCost,
    isCartValueHundredOrMore,
    addSmallOrderSurchargeIfNeeded,
    addFeeForEveryBeginning500m,
    isDeliveryCostAtMaximum,
    addFeeForMultipleItems,
    isFridayRush,
    addRushTimeFee,
    checkDecimalCount,
    isValidForIntegerCharacter,
    isValidForFloatValue
} from '../src/utils/functions'

import {
    mockOrderInfoZeroInputs,
    mockOrderInfoBasic,
    mockOrderInfoSmallOrder,
    mockOrderInfoKm,
    mockOrderInfoItemAmount,
    mockOrderInfoFridayRush,
    mockOrderInfoMixedFees
} from '../__mocks__/mockOrderInfo'

describe('isCartValueHundredOrMore', () => {
    it ('returns true if provided value is exactly 100', () => {
        expect(isCartValueHundredOrMore(100)).toBe(true)
    })
    it ('returns true if provided value is more than 100', () => {
        expect(isCartValueHundredOrMore(101)).toBe(true)
        expect(isCartValueHundredOrMore(100.1)).toBe(true)
    })
    it ('returns false if provided value is less than 100', () => {
        expect(isCartValueHundredOrMore(99)).toBe(false)
        expect(isCartValueHundredOrMore(99.99)).toBe(false)
    })
})

describe('addSmallOrderSurchargeIfNeeded', () => {
    it ('returns 0 if provided value is 10 or more', () => {
        expect(addSmallOrderSurchargeIfNeeded(10)).toBe(0)
        expect(addSmallOrderSurchargeIfNeeded(100)).toBe(0)
    })
    it ('returns 10 - provided value if the provided value is less than 10', () =>{
        expect(addSmallOrderSurchargeIfNeeded(1)).toBe(9)
        expect(addSmallOrderSurchargeIfNeeded(5)).toBe(5)
        expect(addSmallOrderSurchargeIfNeeded(3.50)).toBe(6.50)
        expect(addSmallOrderSurchargeIfNeeded(9.86)).toBe(0.14)
    })
})

describe('addFeeForEveryBeginning500m', () => {
    it ('returns 0 if provided value is 1000 or less', () => {
        expect(addFeeForEveryBeginning500m(1000)).toBe(0)
        expect(addFeeForEveryBeginning500m(999)).toBe(0)
    })
    it ('returns 1 * every beginning 500 meters after the first 1000 meters', () => {
        expect(addFeeForEveryBeginning500m(1001)).toBe(1)
        expect(addFeeForEveryBeginning500m(1499)).toBe(1)
        expect(addFeeForEveryBeginning500m(1500)).toBe(1)
        expect(addFeeForEveryBeginning500m(1501)).toBe(2)
        expect(addFeeForEveryBeginning500m(3001)).toBe(5)
    })
})

describe('isDeliveryCostAtMaximum', () => {
    it ('returns true if provided value is 15 or more', () => {
        expect(isDeliveryCostAtMaximum(15)).toBe(true)
        expect(isDeliveryCostAtMaximum(16)).toBe(true)
        expect(isDeliveryCostAtMaximum(100)).toBe(true)
    })
    it ('returns false if provided value is less than 15', () => {
        expect(isDeliveryCostAtMaximum(14)).toBe(false)
        expect(isDeliveryCostAtMaximum(14.99)).toBe(false)
    })
})

describe('addFeeForMultipleItems', () => {
    it ('returns 0 if provided value is less than 5', () => {
        expect(addFeeForMultipleItems(4)).toBe(0)
        expect(addFeeForMultipleItems(1)).toBe(0)
    })
    it ('returns provided value minus 4 times 0.5 if provided value less than 13', () => {
        expect(addFeeForMultipleItems(6)).toBe(1)
        expect(addFeeForMultipleItems(12)).toBe(4)
    })
    it ('returns the product of provided value - 4 and 0.5 plus a bulk fee of 1.2 if provided value is 13 or more', () => {
        expect(addFeeForMultipleItems(13)).toBe(5.7)
        expect(addFeeForMultipleItems(20)).toBe(9.2)
    })
})

describe('isFridayRush', () => {
    it ('returns true if provided date is friday and provided time is between 15 and 19 UTC', () => {
        expect(isFridayRush(new Date('2023-01-27T03:00:00Z'), new Date('2023-01-27T15:00:00Z'))).toBe(true)
        expect(isFridayRush(new Date('2023-01-27T03:00:00Z'), new Date('2023-01-27T18:59:00Z'))).toBe(true)
    })
    it ('returns false if either day is not friday or time is not between 15 and 19 UTC', () => {
        expect(isFridayRush(new Date('2023-01-28T03:00:00Z'), new Date('2023-01-27T15:00:00Z'))).toBe(false)
        expect(isFridayRush(new Date('2023-01-27T03:00:00Z'), new Date('2023-01-27T19:01:00Z'))).toBe(false)
        expect(isFridayRush(new Date('2023-01-27T03:00:00Z'), new Date('2023-01-27T14:59:00Z'))).toBe(false)
    })
})

describe('addRushTimeFee', () => {
    it ('returns the provided value times 1.2', () => {
        expect(addRushTimeFee(2)).toBe(2.4)
        expect(addRushTimeFee(5)).toBe(6)
        expect(addRushTimeFee(5.4)).toBe(6.48)
    })
})

describe('calculateDeliveryCost', () => {
    it ('returns 0 if cart value or amount of items are 0', () => {
        expect(calculateDeliveryCost(mockOrderInfoZeroInputs[0])).toBe(0)
        expect(calculateDeliveryCost(mockOrderInfoZeroInputs[1])).toBe(0)
        expect(calculateDeliveryCost(mockOrderInfoZeroInputs[2])).toBe(0)
    })
    it ('No surcharge, no km fee, no multiple item fee, not friday rush', () => {
        expect(calculateDeliveryCost(mockOrderInfoBasic[0])).toBe(2)
        expect(calculateDeliveryCost(mockOrderInfoBasic[1])).toBe(2)
    })
    it ('Only small order fee added', () => {
        expect(calculateDeliveryCost(mockOrderInfoSmallOrder[0])).toBe(4)
        expect(calculateDeliveryCost(mockOrderInfoSmallOrder[1])).toBe(2.1)
        expect(calculateDeliveryCost(mockOrderInfoSmallOrder[2])).toBe(2.15)
    })
    it ('Only kilometer fee added', () => {
        expect(calculateDeliveryCost(mockOrderInfoKm[0])).toBe(3)
        expect(calculateDeliveryCost(mockOrderInfoKm[1])).toBe(3)
        expect(calculateDeliveryCost(mockOrderInfoKm[2])).toBe(4)
    })
    it ('Only multiple item fee added', () => {
        expect(calculateDeliveryCost(mockOrderInfoItemAmount[0])).toBe(2)
        expect(calculateDeliveryCost(mockOrderInfoItemAmount[1])).toBe(2.5)
        expect(calculateDeliveryCost(mockOrderInfoItemAmount[2])).toBe(6)
        expect(calculateDeliveryCost(mockOrderInfoItemAmount[3])).toBe(7.7)
    })
    it ('Only friday rush fee added', () => {
        expect(calculateDeliveryCost(mockOrderInfoFridayRush[0])).toBe(2.4)
        expect(calculateDeliveryCost(mockOrderInfoFridayRush[1])).toBe(2.4)
        expect(calculateDeliveryCost(mockOrderInfoFridayRush[2])).toBe(2.4)
    })
    it ('Added mixed fees', () => {
        expect(calculateDeliveryCost(mockOrderInfoMixedFees[0])).toBe(0)
        expect(calculateDeliveryCost(mockOrderInfoMixedFees[1])).toBe(4.6)
        expect(calculateDeliveryCost(mockOrderInfoMixedFees[2])).toBe(5.52)
        expect(calculateDeliveryCost(mockOrderInfoMixedFees[3])).toBe(12.96)
        expect(calculateDeliveryCost(mockOrderInfoMixedFees[4])).toBe(15)
    })
})

// User inputs
describe('checkDecimalCount', () => {
    it ('returns true when provided number string has more than 2 decimals', () => {
        expect(checkDecimalCount('123')).toBe(false)
        expect(checkDecimalCount('123.45')).toBe(false)
        expect(checkDecimalCount('123,45')).toBe(false)
        expect(checkDecimalCount('123.123')).toBe(true)
        expect(checkDecimalCount('123,123')).toBe(true)
    })
})

describe('isValidForIntegerCharacter', () => {
    it ('returns true if character is a number and false if anything but number', () => {
        expect(isValidForIntegerCharacter('1')).toBe(true)
        expect(isValidForIntegerCharacter('0')).toBe(true)
        expect(isValidForIntegerCharacter('.')).toBe(false)
        expect(isValidForIntegerCharacter('e')).toBe(false)
        expect(isValidForIntegerCharacter('-')).toBe(false)
    })
})

describe('isValidForFloatValue', () => {
    it ("returns true if input is not '+', '-' or 'e'. In case input is ',' or '.' returns true if existing value does not already include a .", () => {
        expect(isValidForFloatValue('1', '')).toBe(true)
        expect(isValidForFloatValue('.', '12')).toBe(true)
        expect(isValidForFloatValue('.', '12.0')).toBe(false)
        expect(isValidForFloatValue(',', '12.0')).toBe(false)
        expect(isValidForFloatValue('+', '1')).toBe(false)
        expect(isValidForFloatValue('e', '144')).toBe(false)
    })
})


