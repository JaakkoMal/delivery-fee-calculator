import styles from "./calculator.module.css"
import { checkInvalidCharacters } from "../utils/functions"

type Props = {
    fieldName: string
    floatValue: number
    onChangeFloatValue: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export function FloatInput({ fieldName, floatValue, onChangeFloatValue }: Props) {
    return (
        <>
            <label className={styles.label}>{fieldName}</label>
            <div className={styles.inputBox}>
                <input 
                    className={styles.inputField}
                    type="number"
                    value={floatValue > 0 ? floatValue : ""}
                    onKeyDown={checkInvalidCharacters}
                    onChange={onChangeFloatValue}
                />
                <div className={styles.inputFieldIcon}>€</div>
            </div>
        </>
    )
}