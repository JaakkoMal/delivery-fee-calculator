import styles from "./calculator.module.css"
import { checkInvalidCharacters } from "../utils/functions"

type Props = {
    fieldName: string
    integerValue: number
    onChangeIntegerValue: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export function IntegerInput({ fieldName, integerValue, onChangeIntegerValue }: Props) {
    return (
        <>
            <label className={styles.label}>{fieldName}</label>
            <div className={styles.inputBox}>
                <input 
                    className={styles.inputField}
                    type="number"
                    value={integerValue > 0 ? integerValue : ""}
                    onKeyDown={checkInvalidCharacters}
                    onChange={onChangeIntegerValue}
                />
                <div className={styles.inputFieldIcon}>€</div>
            </div>
        </>
    )
}