const order = [
  { product_id: 1, quantity: 2, price: 100, discount: 10 },
  { product_id: 2, quantity: 2, price: 100, discount: 20 },
  { product_id: 3, quantity: 10, price: 100, discount: 30 },
]

const applyingDiscount = ( obj, i ) => {
  const product_id = obj.product_id
  const quantity = obj.quantity
  const price = ( obj.price ) - ( obj.price * ( obj.discount / 100 ) )

  return {
    product_id,
    quantity,
    price
  }
  
}

const multiplyByQuantity = ( obj, i ) => {
  const product_id = obj.product_id
  const price = obj.price * obj.quantity

  return {
    product_id,
    price
  }
  
}

const createOrder = ( list ) => 
  list.map( applyingDiscount )
      .map( multiplyByQuantity )

console.log( "createOrder: ", createOrder( order ) )

/**
 
createOrder:  [ { product_id: 1, price: 180 },
  { product_id: 2, price: 160 },
  { product_id: 3, price: 700 } ]

*/