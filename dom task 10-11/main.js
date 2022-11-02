// Put DOM elements into variables
const myForm = document.querySelector('#my-form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const msg = document.querySelector('.msg')
const userList = document.querySelector('#users')

const userData = []
// Listen for form submit
myForm.addEventListener('submit', onSubmit)

function onSubmit(e) {
  e.preventDefault()

  if (nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error')
    msg.innerHTML = 'Please enter all fields'

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000)
  } else {
    // Create new list item with user
    const li = document.createElement('li')

    // Add text node with input values
    li.appendChild(
      document.createTextNode(`${nameInput.value}: ${emailInput.value}`)
    )
    // adding to localStorage
    var data = {
      name: nameInput.value,
      email: emailInput.value,
    }
    userData.push(data)
    // console.log(userData)
    localStorage.setItem('userData', JSON.stringify(userData))

    userList.appendChild(li)

    // Clear fields
    nameInput.value = ''
    emailInput.value = ''
  }
}
