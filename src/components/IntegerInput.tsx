import styles from "./calculator.module.css"
import { isValidForIntegerCharacter } from "../utils/functions"

type Props = {
    fieldName: string
    integerValue: number
    icon?: string
    onChangeIntegerValue: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export function IntegerInput({ fieldName, integerValue, onChangeIntegerValue, icon }: Props) {

    const checkInputValidity = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (!isValidForIntegerCharacter(e.key)) e.preventDefault()
    }

    return (
        <>
            <label className={styles.label}>{fieldName}</label>
            <div className={styles.inputBox}>
                <input 
                    className={styles.inputField}
                    type="number"
                    data-testid={fieldName}
                    value={integerValue > 0 ? integerValue : ""}
                    onKeyDown={checkInputValidity}
                    onChange={onChangeIntegerValue}
                />
                {icon && <div className={styles.inputFieldIcon}>{icon}</div>}
            </div>
        </>
    )
}