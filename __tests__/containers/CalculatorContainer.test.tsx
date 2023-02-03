import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { CalculatorContainer } from '../../src/containers/CalculatorContainer'

const mockDatePickerFormat = (date: Date): string => {
    return [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear().toString()
    ].join('/')
}
const mockTimePickerFormat = (date: Date): string => {
    return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
}

describe('Rendering initial values', () => {
    it ('renders text elements correctly with initial values', () => {
        render(<CalculatorContainer />)
        const infoBanner = screen.getByText('Wolt summer trainee 2023 pre-assignment')
        const mainHeading = screen.getByText('Calculate the cost of your delivery!')
        const cartValueLabel = screen.getByText('Cart Value')
        const deliveryDistanceLabel = screen.getByText('Delivery Distance')
        const amountItemsLabel = screen.getByText('Amount Of Items')
        const dateTimeLabel = screen.getByText('Date & Time')
        const calculateButton = screen.getByRole('button')
        const deliveryCostText = screen.getByText('Delivery Cost: 0.00 €')
        const footer = screen.getByText('By Jaakko Malmi')
        const euroIcon = screen.getByText('€')
        const meterIcon = screen.getByText('m')

        expect(infoBanner).toBeInTheDocument()
        expect(mainHeading).toBeInTheDocument()
        expect(cartValueLabel).toBeInTheDocument()
        expect(euroIcon).toBeInTheDocument()
        expect(deliveryDistanceLabel).toBeInTheDocument()
        expect(meterIcon).toBeInTheDocument()
        expect(amountItemsLabel).toBeInTheDocument()
        expect(dateTimeLabel).toBeInTheDocument()
        expect(calculateButton).toBeInTheDocument()
        expect(deliveryCostText).toBeInTheDocument()
        expect(calculateButton).toBeInTheDocument()
        expect(calculateButton).toBeDisabled()
        expect(footer).toBeInTheDocument()

    })

    it ('renders the correct initial input values', () => {
        render(<CalculatorContainer />)
        
        const cartValueInput = screen.getByTestId('Cart Value') as HTMLInputElement
        const deliveryDistanceInput = screen.getByTestId('Delivery Distance') as HTMLInputElement
        const amountItemsInput = screen.getByTestId('Amount Of Items') as HTMLInputElement
        const dateInput = screen.getByTitle('datePicker') as HTMLInputElement
        const timeInput = screen.getByTitle('timePicker') as HTMLInputElement

        expect(cartValueInput.value).toBe('')
        expect(deliveryDistanceInput.value).toBe('')
        expect(amountItemsInput.value).toBe('')
        expect(dateInput.value).toBe(mockDatePickerFormat(new Date()))
        expect(timeInput.value).toBe(mockTimePickerFormat(new Date()))
    })
})

describe('User inputs', () => {
    it('changes cart value when input is valid', () => {
        render(<CalculatorContainer/>)

        const cartValueInput = screen.getByTestId('Cart Value') as HTMLInputElement

        fireEvent.change(cartValueInput, { target: { value: '12.3'}})
        expect(cartValueInput.value).toBe('12.3')
        fireEvent.change(cartValueInput, { target: { value: '123.33'}})
        expect(cartValueInput.value).toBe('123.33')
    })

    it('does not change cart value when input is invalid', () => {
        render(<CalculatorContainer/>)

        const cartValueInput = screen.getByTestId('Cart Value') as HTMLInputElement

        fireEvent.change(cartValueInput, { target: { value: 'e'}})
        expect(cartValueInput.value).toBe('')
        fireEvent.change(cartValueInput, { target: { value: 'E'}})
        expect(cartValueInput.value).toBe('')
        fireEvent.change(cartValueInput, { target: { value: '+'}})
        expect(cartValueInput.value).toBe('')
        fireEvent.change(cartValueInput, { target: { value: '-'}})
        expect(cartValueInput.value).toBe('')
        fireEvent.change(cartValueInput, { target: { value: '12.333'}})
        expect(cartValueInput.value).toBe('')
    })

    it('changes delivery distance when input is valid', () => {
        render(<CalculatorContainer/>)

        const deliveryDistanceInput = screen.getByTestId('Delivery Distance') as HTMLInputElement

        fireEvent.change(deliveryDistanceInput, { target: { value: '1000'}})
        expect(deliveryDistanceInput.value).toBe('1000')
    })

    it('does not change delivery distance when input is invalid', () => {
        render(<CalculatorContainer/>)

        const deliveryDistanceInput = screen.getByTestId('Delivery Distance') as HTMLInputElement

        fireEvent.change(deliveryDistanceInput, { target: { value: 'e'}})
        expect(deliveryDistanceInput.value).toBe('')
        fireEvent.change(deliveryDistanceInput, { target: { value: 'E'}})
        expect(deliveryDistanceInput.value).toBe('')
        fireEvent.change(deliveryDistanceInput, { target: { value: '+'}})
        expect(deliveryDistanceInput.value).toBe('')
        fireEvent.change(deliveryDistanceInput, { target: { value: '-'}})
        expect(deliveryDistanceInput.value).toBe('')
    })

    it('changes amount of items when input is valid', () => {
        render(<CalculatorContainer/>)

        const amountItemsInput = screen.getByTestId('Amount Of Items') as HTMLInputElement

        fireEvent.change(amountItemsInput, { target: { value: '10'}})
        expect(amountItemsInput.value).toBe('10')
    })

    it('does not change amount of items when input is invalid', () => {
        render(<CalculatorContainer/>)

        const amountItemsInput = screen.getByTestId('Amount Of Items') as HTMLInputElement

        fireEvent.change(amountItemsInput, { target: { value: 'e'}})
        expect(amountItemsInput.value).toBe('')
        fireEvent.change(amountItemsInput, { target: { value: 'E'}})
        expect(amountItemsInput.value).toBe('')
        fireEvent.change(amountItemsInput, { target: { value: '+'}})
        expect(amountItemsInput.value).toBe('')
        fireEvent.change(amountItemsInput, { target: { value: '-'}})
        expect(amountItemsInput.value).toBe('')
    })

    it('changes delivery date and time', () => {
        render(<CalculatorContainer/>)

        const dateInput = screen.getByTitle('datePicker') as HTMLInputElement
        const timeInput = screen.getByTitle('timePicker') as HTMLInputElement

        fireEvent.change(dateInput, { target: { value: '04/02/2023'}})
        fireEvent.change(timeInput, { target: { value: '19:15'}})
        expect(dateInput.value).toBe('04/02/2023')
        expect(timeInput.value).toBe('19:15')
    })

    describe('Calculation', () => {
        it ('Shows delivery cost when calculate button has been clicked', () => {
            render(<CalculatorContainer/>)

            // Set up user inputs
            const cartValueInput = screen.getByTestId('Cart Value') as HTMLInputElement
            const deliveryDistanceInput = screen.getByTestId('Delivery Distance') as HTMLInputElement
            const amountItemsInput = screen.getByTestId('Amount Of Items') as HTMLInputElement
            const dateInput = screen.getByTitle('datePicker') as HTMLInputElement
            const timeInput = screen.getByTitle('timePicker') as HTMLInputElement
            const calculateButton = screen.getByRole('button')

            fireEvent.change(cartValueInput, {target: { value: '8'}})
            fireEvent.change(deliveryDistanceInput, {target: { value: '1000'}})
            fireEvent.change(amountItemsInput, {target: { value: '5'}})
            fireEvent.change(dateInput, {target: { value: '03/02/2023'}})
            fireEvent.change(timeInput, {target: { value: '20:00'}})

            // When calculate button is clicked
            fireEvent.click(calculateButton)
            expect(screen.getByText('Delivery Cost: 5.40 €')).toBeInTheDocument()
        })
    })
})