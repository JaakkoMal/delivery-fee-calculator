import { useState } from 'react'
import styles from "./calculator.module.css"

type CalculatorProps = {
    cartValue: number
    onChangeCartValue: (value: React.ChangeEvent<HTMLInputElement>) => void
    deliveryDistance: number
    onChangeDeliveryDistance: (distance: React.ChangeEvent<HTMLInputElement>) => void
    amountItems: number
    onChangeAmountItems: (amount: React.ChangeEvent<HTMLInputElement>) => void
}


export function Calculator({ 
    cartValue, onChangeCartValue, 
    deliveryDistance, onChangeDeliveryDistance,
    amountItems, onChangeAmountItems 
}: CalculatorProps) {


    return (
        <div className={styles.mainContainer}>
            <nav className={styles.banner}>
                <h1>Wolt summer trainee 2023 pre-assignment</h1>
            </nav>
            <h1 className={styles.heading}>Calculate the total cost of your order and delivery!</h1>
            <div className={styles.container}>
                <label className={styles.label}>Cart Value</label>
                <div className={styles.inputBox}>
                    <input className={styles.inputField}
                        type="number"
                        value={cartValue > 0 ? cartValue : ""}
                        onChange={e => onChangeCartValue(e)}
                    />
                    <div className={styles.inputFieldIcon}>€</div>
                </div>
                <label className={styles.label}>Delivery distance</label>
                <div className={styles.inputBox}>
                    <input className={styles.inputField} 
                        value={deliveryDistance > 0 ? deliveryDistance : ""}
                        onChange={e => onChangeDeliveryDistance(e)}
                    />
                    <div className={styles.inputFieldIcon}>m</div>
                </div>
                <label className={styles.label}>Amount of items</label>    
                <div className={styles.inputBox}>
                    <input className={styles.inputField}
                        value={amountItems > 0 ? amountItems : ""}
                        onChange={e => onChangeAmountItems(e)}
                    />
                </div>
                <label className={styles.label}>Time</label>
                <div className={styles.inputBox}>
                    <input className={styles.inputField} placeholder="dd/mm/yy    hh/mm" />
                </div>
                    <button className={styles["calculate-btn"]}>Calculate</button>
                <p className={styles.total}>Total price: 20€</p>
                <p>cart value: {cartValue}</p>
                <p>delivery distance: {deliveryDistance}</p>
                <p>amount of items: {amountItems}</p>
            </div>
            <footer className={styles.footer}>
                <p>By Jaakko Malmi</p>
            </footer>
        </div>
    )
}