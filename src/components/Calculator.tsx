import { useState } from 'react'
import styles from "./calculator.module.css"

export function Calculator() {


    return (
        <div className={styles.mainContainer}>
            <nav className={styles.banner}>
                <h1>Wolt summer trainee 2023 pre-assignment</h1>
            </nav>
            <h1 className={styles.heading}>Calculate the total cost of your order and delivery!</h1>
            <div className={styles.container}>
                <div className={styles.inputBox}>
                    <label className={styles.label}>Cart Value</label>
                    <input className={styles.inputField} />
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>Delivery distance</label>
                    <input className={styles.inputField} />
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>Amount of items</label>
                    <input className={styles.inputField} />
                </div>
                <div className={styles.inputBox}>
                    <label className={styles.label}>Time</label>
                    <input className={styles.inputField} />
                </div>
                    <button className={styles["calculate-btn"]}>Calculate</button>
                <p className={styles.total}>Total price: 20€</p>
            </div>
        </div>
    )
}