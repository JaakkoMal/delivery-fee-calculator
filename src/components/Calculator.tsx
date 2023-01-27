import "react-datepicker/dist/react-datepicker.css"
import styles from "./calculator.module.css"
import { FloatInput } from './FloatInput'
import { IntegerInput } from './IntegerInput'
import { DateAndTimeInput } from './DateAndTimeInput'
import { OrderInfo } from '../types/Types'

type Props = {
    orderInfo: OrderInfo
    onChangeCartValue: (cartValue: number) => void
    onChangeDeliveryDistance: (value: React.ChangeEvent<HTMLInputElement>) => void
    onChangeAmountItems: (value: React.ChangeEvent<HTMLInputElement>) => void
    onChangeOrderDate: (value: Date) => void
    onChangeOrderTime: (value: Date) => void
    calculateDeliveryCost: (fullOrderInfo: OrderInfo) => void
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
        calculateDeliveryCost(orderInfo)
    }

    return (
        <div className={styles.mainContainer}>
            <nav className={styles.banner}>
                <h1>Wolt summer trainee 2023 pre-assignment</h1>
            </nav>
            <h1 className={styles.heading}>Calculate the total cost of your order and delivery!</h1>
            <form className={styles.container} onSubmit={handleSubmit}>
                <FloatInput 
                    fieldName='Cart Value'
                    onChangeFloatValue={onChangeCartValue}
                    icon="€"
                />
                <IntegerInput 
                    fieldName='Delivery Distance'
                    integerValue={orderInfo.deliveryDistance} 
                    onChangeIntegerValue={onChangeDeliveryDistance}
                    icon="m" 
                />
                <IntegerInput 
                    fieldName='Amount Of Items'
                    integerValue={orderInfo.amountItems} 
                    onChangeIntegerValue={onChangeAmountItems}  
                    icon=""
                />
                <DateAndTimeInput 
                    fieldName='Date & Time'
                    date={orderInfo.orderDate} 
                    time={orderInfo.orderTime}
                    onChangeDate={onChangeOrderDate} 
                    onChangeTime={onChangeOrderTime}
                /> 
                <input 
                    className={styles["calculate-btn"]}
                    type="submit" 
                    value="Calculate"
                />
                <p className={styles.total}>Delivery Cost: {orderInfo.deliveryCost.toFixed(2)} €</p>
            </form>
            <footer className={styles.footer}>
                <p>By Jaakko Malmi</p>
            </footer>
        </div>
    )
}