const order = [
  { product_id: 1, quantity: 1, price: 100, discount: 10 },
  { product_id: 2, quantity: 1, price: 100, discount: 20 },
  { product_id: 3, quantity: 1, price: 100, discount: 30 },
]

const orderWithDiscount = []

for ( let i = 0; i < order.length; i++ ) {
  let product_id = order[ i ].product_id
  let quantity = order[ i ].quantity
  let price = ( order[ i ].price ) - ( order[ i ].price * ( order[ i ].discount / 100 ) )

  let result = {
    product_id,
    quantity,
    price
  }

  orderWithDiscount.push( result )
  
}

console.log( "orderWithDiscount: ", orderWithDiscount )

/**
 
orderWithDiscount:  [ { product_id: 1, quantity: 1, price: 90 },
  { product_id: 2, quantity: 1, price: 80 },
  { product_id: 3, quantity: 1, price: 70 } ]

*/