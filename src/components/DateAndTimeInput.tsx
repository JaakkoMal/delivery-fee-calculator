import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from "./calculator.module.css"

type Props = {
    fieldName: string
    date: Date
    time: Date
    onChangeDate: (value: Date) => void
    onChangeTime: (value: Date) => void
}


export function DateAndTimeInput({ fieldName, date, time, onChangeDate, onChangeTime }: Props) {

    return (
        <>
            <label className={styles.label}>{fieldName}</label>
            <div className={styles.reactDatePickerContainer}>
                <DatePicker 
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onKeyDown={e => e.preventDefault()}
                    onChange={onChangeDate}
                />
                <DatePicker
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={5}
                    selected={time}
                    strictParsing
                    onChange={onChangeTime}
                />
            </div>
        </>
    )
}