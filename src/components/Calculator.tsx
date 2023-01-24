import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from "./calculator.module.css"
import { OrderInfo } from '../types/Types'

type Props = {
    orderInfo: OrderInfo
    onChangeCartValue: (value: React.ChangeEvent<HTMLInputElement>) => void
    onChangeDeliveryDistance: (value: React.ChangeEvent<HTMLInputElement>) => void
    onChangeAmountItems: (value: React.ChangeEvent<HTMLInputElement>) => void
    onChangeOrderDate: (value: Date) => void
    onChangeOrderTime: (value: Date) => void
    calculateDeliveryCost: () => void
}


export function Calculator({ 
    orderInfo, 
    onChangeCartValue,
    onChangeDeliveryDistance,
    onChangeAmountItems,
    calculateDeliveryCost,
    onChangeOrderDate,
    onChangeOrderTime
}: Props) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        calculateDeliveryCost()
    }


    return (
        <div className={styles.mainContainer}>
            <nav className={styles.banner}>
                <h1>Wolt summer trainee 2023 pre-assignment</h1>
            </nav>
            <h1 className={styles.heading}>Calculate the total cost of your order and delivery!</h1>
            <form className={styles.container} onSubmit={handleSubmit}>
                <label className={styles.label}>Cart Value</label>
                <div className={styles.inputBox}>
                    <input className={styles.inputField}
                        type="number"
                        value={orderInfo.cartValue > 0 ? orderInfo.cartValue : ""}
                        onChange={e => onChangeCartValue(e)}
                    />
                    <div className={styles.inputFieldIcon}>€</div>
                </div>
                <label className={styles.label}>Delivery distance</label>
                <div className={styles.inputBox}>
                    <input className={styles.inputField} 
                        maxLength={15}
                        value={orderInfo.deliveryDistance > 0 ? orderInfo.deliveryDistance : ""}
                        onChange={e => onChangeDeliveryDistance(e)}
                    />
                    <div className={styles.inputFieldIcon}>m</div>
                </div>
                <label className={styles.label}>Amount of items</label>    
                <div className={styles.inputBox}>
                    <input className={styles.inputField}
                        maxLength={15}
                        value={orderInfo.amountItems > 0 ? orderInfo.amountItems : ""}
                        onChange={e => onChangeAmountItems(e)}
                    />
                </div>
                <label className={styles.label}>Date & Time</label>
                <div className={styles.reactDatePickerContainer}>
                    <DatePicker 
                        dateFormat="dd/MM/yyyy"
                        selected={orderInfo.orderDate}
                        onChange={onChangeOrderDate}
                    />
                    <DatePicker
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        selected={orderInfo.orderTime}
                        onChange={onChangeOrderTime}
                    />
                </div>    
                    <input type="submit" value="Calculate" className={styles["calculate-btn"]}/>
                <p className={styles.total}>Delivery cost: {orderInfo.deliveryCost.toFixed(2)} €</p>
                {/*<p>cart value: {cartValue}</p>
                <p>delivery distance: {deliveryDistance}</p>
                <p>amount of items: {amountItems}</p>
                <p>order date: {orderDate.toString()}</p>
                <p>order time: {orderTime.toString()}</p>
                <p>total: {deliveryCost}</p>*/}
            </form>
            <footer className={styles.footer}>
                <p>By Jaakko Malmi</p>
            </footer>
        </div>
    )
}