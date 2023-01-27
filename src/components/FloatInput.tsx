import styles from "./calculator.module.css"
import { checkInvalidCharactersForFloat } from "../utils/functions"
import { useState } from 'react'

type Props = {
    fieldName: string
    onChangeFloatValue: (value: number) => void
    icon: string
}

export function FloatInput({ fieldName, onChangeFloatValue, icon }: Props) {

    const [formattedFloat, setFormattedFloat] = useState<string>('')
    const handleFloatValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let currentFloat = e.target.value
        setFormattedFloat(currentFloat)
        onChangeFloatValue(Number(currentFloat))     
    }
    
    return (
        <>
            <label className={styles.label}>{fieldName}</label>
            <div className={styles.inputBox}>
                <input 
                    className={styles.inputField}
                    type="number"
                    value={formattedFloat}
                    onKeyDown={e => checkInvalidCharactersForFloat(e, formattedFloat)}
                    onChange={handleFloatValueChange}
                />
                {icon && <div className={styles.inputFieldIcon}>{icon}</div> }
            </div>
        </>
    )
}