import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { Calculator } from '../../src/components/Calculator'
import { OrderInfo } from '../../src/types/Types'

const orderInfo: OrderInfo[] = [
    {
        cartValue: 20,
        deliveryDistance: 900,
        amountItems: 1,
        orderDate: new Date('2023-02-03T03:00:00Z'),
        orderTime: new Date('2023-02-03T15:00:00Z'),
        deliveryCost: 2.40
    },
    {
        cartValue: 20,
        deliveryDistance: 900,
        amountItems: 1,
        orderDate: new Date('2023-02-03T03:00:00Z'),
        orderTime: new Date('2023-02-03T15:00:00Z'),
        deliveryCost: 0
    }
]

describe('Calculator', () => {
    it ('renders correctly with given props, calculate button enabled', () => {
        render(<Calculator 
                orderInfo={orderInfo[0]} 
                onChangeCartValue={() => {}}
                onChangeDeliveryDistance={() => {}}
                onChangeAmountItems={() => {}}
                onChangeOrderDate={() => {}}
                onChangeOrderTime={() => {}}
                onChangeDeliveryCost={() => {}}
                isCalculationDisabled={false}
                />)
        const infoBarElement = screen.getByText('Wolt summer trainee 2023 pre-assignment')
        const mainHeadingElement = screen.getByText('Calculate the cost of your delivery!')
        const cartValueLabelElement = screen.getByText('Cart Value')
        const deliveryDistanceLabelElement = screen.getByText('Delivery Distance')
        const amountItemsLabelElement = screen.getByText('Amount Of Items')
        const dateAndTimeLabelElement = screen.getByText('Date & Time')
        const calculateButtonElement = screen.getByRole('button')
        const deliveryCostElement = screen.getByText('Delivery Cost: 2.40 €')
        const footerElement = screen.getByText('By Jaakko Malmi')

        expect(infoBarElement).toBeInTheDocument()
        expect(mainHeadingElement).toBeInTheDocument()
        expect(cartValueLabelElement).toBeInTheDocument()
        expect(deliveryDistanceLabelElement).toBeInTheDocument()
        expect(amountItemsLabelElement).toBeInTheDocument()
        expect(dateAndTimeLabelElement).toBeInTheDocument()
        expect(calculateButtonElement).toBeInTheDocument()
        expect(calculateButtonElement).toHaveDisplayValue('Calculate')
        expect(calculateButtonElement).not.toBeDisabled()
        expect(deliveryCostElement).toBeInTheDocument()
        expect(footerElement).toBeInTheDocument()
    })

    it ('', () => {
        const mockOnChangeDeliveryCost = vi.fn()
        render(<Calculator 
                orderInfo={orderInfo[1]} 
                onChangeCartValue={() => {}}
                onChangeDeliveryDistance={() => {}}
                onChangeAmountItems={() => {}}
                onChangeOrderDate={() => {}}
                onChangeOrderTime={() => {}}
                onChangeDeliveryCost={mockOnChangeDeliveryCost}
                isCalculationDisabled={false}
                />)
        
        const calculateButton = screen.getByRole('button')
        
        fireEvent.click(calculateButton)
        expect(mockOnChangeDeliveryCost).toHaveBeenCalledTimes(1)     
    })
})