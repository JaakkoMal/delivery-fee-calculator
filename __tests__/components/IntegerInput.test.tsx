import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { IntegerInput } from '../../src/components/IntegerInput'

describe('Integer input component', () => {
    it ('renders correctly with given props', () => {
        render(<IntegerInput fieldName='test-name' integerValue={0} onChangeIntegerValue={() => {}} icon='£' />)
        
        const labelTextElement = screen.getByText('test-name')
        const iconElement = screen.getByText('£')
        const inputField = screen.getByTestId('integerInput') as HTMLInputElement

        expect(labelTextElement).toBeInTheDocument()
        expect(iconElement).toBeInTheDocument()
        expect(inputField.value).toBe('')
    })

    it ('calls onChange', () => {
        const mockOnChange = vi.fn()
        render(<IntegerInput fieldName='test-name' integerValue={0} onChangeIntegerValue={mockOnChange} />)

        const inputField = screen.getByTestId('integerInput') as HTMLInputElement
        fireEvent.input(inputField, {target: { value : '1'}})
        expect(mockOnChange).toHaveBeenCalledTimes(1)
        fireEvent.input(inputField, {target: { value : '2'}})
        expect(mockOnChange).toHaveBeenCalledTimes(2)
        fireEvent.input(inputField, {target: { value : '3'}})
        expect(mockOnChange).toHaveBeenCalledTimes(3)
    })

    it ('does not accept non-numeric input, including e, + and - signs', () => {
        const mockOnChange = vi.fn()
        render(<IntegerInput fieldName='test-name' integerValue={0} onChangeIntegerValue={mockOnChange} />)

        const inputField = screen.getByTestId('integerInput') as HTMLInputElement
        fireEvent.input(inputField, {target: { value : 'e'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
        fireEvent.input(inputField, {target: { value : '-'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
        fireEvent.input(inputField, {target: { value : '+'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
    })
})