import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from "./calculator.module.css"
import { CalculationTypes } from '../containers/CalculatorContainer'

type CalculatorProps = {
    cartValue: number
    onChangeCartValue: (value: React.ChangeEvent<HTMLInputElement>) => void
    deliveryDistance: number
    onChangeDeliveryDistance: (distance: React.ChangeEvent<HTMLInputElement>) => void
    amountItems: number
    onChangeAmountItems: (amount: React.ChangeEvent<HTMLInputElement>) => void
    orderDate: Date
    setOrderDate: (date: Date) => void
    orderTime: Date
    setOrderTime: (time: Date) => void
    calculateDeliveryCost: (variables: CalculationTypes) => void
    deliveryCost: number
}


export function Calculator({ 
    cartValue, onChangeCartValue, 
    deliveryDistance, onChangeDeliveryDistance,
    amountItems, onChangeAmountItems,
    orderDate, setOrderDate,
    orderTime, setOrderTime,
    calculateDeliveryCost,
    deliveryCost
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
                        maxLength={15}
                        value={deliveryDistance > 0 ? deliveryDistance : ""}
                        onChange={e => onChangeDeliveryDistance(e)}
                    />
                    <div className={styles.inputFieldIcon}>m</div>
                </div>
                <label className={styles.label}>Amount of items</label>    
                <div className={styles.inputBox}>
                    <input className={styles.inputField}
                        maxLength={15}
                        value={amountItems > 0 ? amountItems : ""}
                        onChange={e => onChangeAmountItems(e)}
                    />
                </div>
                <label className={styles.label}>Date & Time</label>
                <div className={styles.reactDatePickerContainer}>
                    <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={orderDate}
                        onChange={setOrderDate}
                    />
                    <DatePicker
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        selected={orderTime}
                        onChange={setOrderTime}
                    />
                </div>    
                    <button className={styles["calculate-btn"]}
                        onClick={() => calculateDeliveryCost({cartValue, deliveryDistance, amountItems, orderDate, orderTime})}
                    >Calculate</button>
                <p className={styles.total}>Delivery cost: {deliveryCost.toFixed(2)} €</p>
                {/*<p>cart value: {cartValue}</p>
                <p>delivery distance: {deliveryDistance}</p>
                <p>amount of items: {amountItems}</p>
                <p>order date: {orderDate.toString()}</p>
                <p>order time: {orderTime.toString()}</p>
                <p>total: {deliveryCost}</p>*/}
            </div>
            <footer className={styles.footer}>
                <p>By Jaakko Malmi</p>
            </footer>
        </div>
    )
}