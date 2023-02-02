import styles from "./calculator.module.css"
import { isValidForFloatValue, checkDecimalCount } from "../utils/functions"
import { useState } from 'react'

type Props = {
    fieldName: string
    onChangeFloatValue: (value: number) => void
    icon?: string
}

export function FloatInput({ fieldName, onChangeFloatValue, icon }: Props) {

    const [formattedFloat, setFormattedFloat] = useState<string>('')
    const handleFloatValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let currentFloat = e.target.value
        if (checkDecimalCount(currentFloat)) return
        setFormattedFloat(currentFloat)
        onChangeFloatValue(Number(currentFloat))     
    }

    const checkInputValidity = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (!isValidForFloatValue(e.key, formattedFloat)) e.preventDefault()
    }
    
    return (
        <>
            <label className={styles.label}>{fieldName}</label>
            <div className={styles.inputBox}>
                <input 
                    className={styles.inputField}
                    type="number"
                    data-testid='floatInput'
                    value={formattedFloat}
                    onKeyDown={checkInputValidity}
                    onChange={handleFloatValueChange}
                />
                {icon && <div className={styles.inputFieldIcon}>{icon}</div> }
            </div>
        </>
    )
}