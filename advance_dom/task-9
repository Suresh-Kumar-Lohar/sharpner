/*   CALL AND APPLY  */
const luftthansa = {
  airline: 'Luftana',
  iataCode: 'LH',
  bookings: [],
  // book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked on ${this.airline} and flight
      ${this.iataCode} ${flightNum}`
    )
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name })
  },
}

luftthansa.book(239, 'Suresh')
luftthansa.book(635, 'Lohar')
console.log(luftthansa)

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
}

const book = luftthansa.book

book(23, 'Sarah willim') does not work

// CALL METHOD here this key set to eurowings
book.call(eurowings, 23, 'Sarah William')
console.log(eurowings)

// book.call(luftthansa, 555, 'Mery cuppor')
// console.log(luftthansa)

// // APPLY METHOD it take array of argument
const flightData = [999, 'Yash']
book.apply(eurowings, flightData)
console.log(eurowings)

// // also by call
book.call(luftthansa, ...flightData)
console.log(luftthansa)

// BIND METHOD manually set this keyword it returns a new func where this bind not call immidiate
// also this means bind used to create special function for special param
const bookEW = book.bind(eurowings)
bookEW(74, 'Pushakar')
console.log(eurowings)

// // also can preset args
const bookEW2 = book.bind(eurowings, 888)
bookEW2('Pushakar')
console.log(eurowings)

// // BIND with event listener
luftthansa.planes = 300
luftthansa.buyPlane = function () {
  console.log(this)
  this.planes++
  console.log(this.planes)
}
