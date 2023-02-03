import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { FloatInput } from '../../src/components/FloatInput'

describe('Float input component', () => {

    it ('calls onChange when input is valid', () => {
        const mockOnChange = vi.fn()
        render(<FloatInput fieldName='test-name' onChangeFloatValue={mockOnChange} />)

        const inputField = screen.getByTestId('test-name') as HTMLInputElement
        fireEvent.input(inputField, {target: { value : '1'}})
        expect(mockOnChange).toHaveBeenCalledTimes(1)
        fireEvent.input(inputField, {target: { value : ','}})
        expect(mockOnChange).toHaveBeenCalledTimes(2)
        fireEvent.input(inputField, {target: { value : '2'}})
        expect(mockOnChange).toHaveBeenCalledTimes(3)
    })

    it ('does not call onChange when input is invalid', () => {
        const mockOnChange = vi.fn()
        render(<FloatInput fieldName='test-name' onChangeFloatValue={mockOnChange} />)

        const inputField = screen.getByTestId('test-name') as HTMLInputElement
        fireEvent.input(inputField, {target: { value : 'e'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
        fireEvent.input(inputField, {target: { value : '-'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
        fireEvent.input(inputField, {target: { value : '+'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
        fireEvent.input(inputField, {target: { value : 'E'}})
        expect(mockOnChange).toHaveBeenCalledTimes(0)
    })
})