// No inputs
export const mockOrderInfoZeroInputs = [
    {   // No cart value or amount items
        cartValue: 0,
        deliveryDistance: 0,
        amountItems: 0,
        orderDate: new Date(),
        orderTime: new Date(),
        deliveryCost: 0
    },
    {   // Amount items not entered
        cartValue: 2,
        deliveryDistance: 0,
        amountItems: 0,
        orderDate: new Date('2023-01-27T03:00:00Z'),
        orderTime: new Date('2023-01-27T15:00:00Z'),
        deliveryCost: 0
    },
    {   // Cart value not entered
        cartValue: 0,
        deliveryDistance: 0,
        amountItems: 2,
        orderDate: new Date(),
        orderTime: new Date(),
        deliveryCost: 0 
    }
]

// No surcharge, no km fee, no multiple item fee, not friday rush
export const mockOrderInfoBasic = [
    {
        cartValue: 20,
        deliveryDistance: 900,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    {
        cartValue: 11,
        deliveryDistance: 1000,
        amountItems: 4,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
]
// Only small order fee
export const mockOrderInfoSmallOrder = [
    {   
        cartValue: 8,
        deliveryDistance: 900,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    {   
        cartValue: 9.9,
        deliveryDistance: 900,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    {   
        cartValue: 9.85,
        deliveryDistance: 900,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
]
// Only km fee
export const mockOrderInfoKm = [
    { 
        cartValue: 20,
        deliveryDistance: 1001,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1499,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1501,
        amountItems: 1,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    }
]

export const mockOrderInfoItemAmount = [
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 4,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 5,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 12,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 13,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
]
// Only friday rush fee
export const mockOrderInfoFridayRush = [
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 4,
        orderDate: new Date('2023-01-27T03:00:00Z'),
        orderTime: new Date('2023-01-28T15:00:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 4,
        orderDate: new Date('2023-01-27T03:00:00Z'),
        orderTime: new Date('2023-01-28T18:59:00Z'),
        deliveryCost: 0
    },
    { 
        cartValue: 20,
        deliveryDistance: 1000,
        amountItems: 4,
        orderDate: new Date('2023-01-27T03:00:00Z'),
        orderTime: new Date('2023-01-28T17:30:00Z'),
        deliveryCost: 0
    },
]
    
export const mockOrderInfoMixedFees = [
    {   // Cart value over 100 and friday rush
        cartValue: 100.90,
        deliveryDistance: 1000,
        amountItems: 4,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T17:30:00Z'),
        deliveryCost: 0
    },
    {   // Cart value less than 10, delivery distance more than 1000, amount items more than 4, no friday rush
        cartValue: 8.90,
        deliveryDistance: 1450,
        amountItems: 5,
        orderDate: new Date('2023-01-28T03:00:00Z'),
        orderTime: new Date('2023-01-28T17:30:00Z'),
        deliveryCost: 0
    },
    {   // Cart value less than 10, delivery distance more than 1000, amount items more than 4, friday rush
        cartValue: 8.90,
        deliveryDistance: 1450,
        amountItems: 5,
        orderDate: new Date('2023-01-27T03:00:00Z'),
        orderTime: new Date('2023-01-28T17:30:00Z'),
        deliveryCost: 0
    },
    {   // Cart value less than 10, delivery distance more than 1000, amount items more than 12, friday rush
        cartValue: 8.90,
        deliveryDistance: 1501,
        amountItems: 13,
        orderDate: new Date('2023-01-27T03:00:00Z'),
        orderTime: new Date('2023-01-28T17:30:00Z'),
        deliveryCost: 0
    }
]

