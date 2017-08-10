const order = [
  { product_id: 1, quantity: 1, price: 100, discount: 10 },
  { product_id: 2, quantity: 1, price: 100, discount: 20 },
  { product_id: 3, quantity: 1, price: 100, discount: 30 },
]

const applyingDiscount = ( obj, i ) => {
  let product_id = obj.product_id
  let quantity = obj.quantity
  let price = ( obj.price ) - ( obj.price * ( obj.discount / 100 ) )

  return {
    product_id,
    quantity,
    price
  }
  
}

const createOrder = ( list ) => list.map( applyingDiscount ) 

console.log( "createOrder: ", createOrder( order ) )

/**
 
createOrder:  [ { product_id: 1, quantity: 1, price: 90 },
  { product_id: 2, quantity: 1, price: 80 },
  { product_id: 3, quantity: 1, price: 70 } ]

*/