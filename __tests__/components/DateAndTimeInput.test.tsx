import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { DateAndTimeInput } from '../../src/components/DateAndTimeInput'

describe('Date and time input component', () => {
    it ('renders correctly with given props', () => {
        const date: Date = new Date('2023-01-28T03:00:00Z')
        const time: Date = new Date('2023-01-28T15:00:00Z')
        render(<DateAndTimeInput fieldName='test-name' date={date} time={time} onChangeDate={() => {}} onChangeTime={() => {}}/>)

        const labelTextElement = screen.getByText('test-name')
        const datePickerElement = screen.getByTitle('datePicker') as HTMLInputElement
        const timePickerElement = screen.getByTitle('timePicker') as HTMLInputElement

        expect(labelTextElement).toBeInTheDocument()
        expect(datePickerElement.value).toBe('28/01/2023')
        expect(timePickerElement.value).toBe('17:00') // local time, so this test probably won't pass anywhere but UTC+2 (winter) UTC+3 (summer)
    })

    it ('calls onChange functions', () => {
        const date: Date = new Date('2023-01-28T03:00:00Z')
        const time: Date = new Date('2023-01-28T15:00:00Z')
        const mockOnChangeDate = vi.fn()
        const mockOnChangeTime = vi.fn()
        render(<DateAndTimeInput fieldName='test-name' date={date} time={time} onChangeDate={mockOnChangeDate} onChangeTime={mockOnChangeTime}/>)

        const datePickerElement = screen.getByTitle('datePicker') as HTMLInputElement
        const timePickerElement = screen.getByTitle('timePicker') as HTMLInputElement
        
        fireEvent.change(datePickerElement, {target: {value: '29/01/2023'}})
        expect(mockOnChangeDate).toHaveBeenCalled()
        expect(datePickerElement.value).toBe('29/01/2023')

        fireEvent.change(timePickerElement, { target: { value : '21:00'}})
        expect(mockOnChangeTime).toHaveBeenCalled()
        expect(timePickerElement.value).toBe('21:00')
    })

    it ('does not accept manual input', () => {
        const date: Date = new Date('2023-01-28T03:00:00Z')
        const time: Date = new Date('2023-01-28T15:00:00Z')
        const mockOnChangeDate = vi.fn()
        const mockOnChangeTime = vi.fn()
        render(<DateAndTimeInput fieldName='test-name' date={date} time={time} onChangeDate={mockOnChangeDate} onChangeTime={mockOnChangeTime}/>)

        const datePickerElement = screen.getByTitle('datePicker') as HTMLInputElement
        const timePickerElement = screen.getByTitle('timePicker') as HTMLInputElement
        
        fireEvent.keyDown(datePickerElement, { key: 1, code: 'Digit1'})
        expect(mockOnChangeDate).not.toHaveBeenCalled()
        fireEvent.keyDown(timePickerElement, { key: 1, code: 'Digit1'})
        expect(mockOnChangeTime).not.toHaveBeenCalled()
    })

})