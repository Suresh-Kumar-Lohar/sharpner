const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const text3 = document.getElementById('text3')
const submit = document.getElementById('submit')
const itemList = document.getElementById('items')

submit.addEventListener('click', submitHandler)

function submitHandler(e) {
  const expenseAmount = text1.value
  const description = text2.value
  const category = text3.value
  userDetails = {
    expenseAmount: expenseAmount,
    description: description,
    category: category,
  }
  axios
    .post(
      'https://crudcrud.com/api/f83156651d0a4f1798662f32ef29db4e/expenses',
      userDetails
    )
    .then((res) => {
      addItemToDom(
        res.data.expenseAmount,
        res.data.description,
        res.data.category
      )
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  text1.value = ''
  text2.value = ''
  text3.value = ''
}

itemList.addEventListener('click', removeItem)
itemList.addEventListener('click', editItem)

function editItem(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement
    const desc = li.innerHTML.split(' - ')[2].split('<button')[0].trim()
    // console.log(desc)
    axios
      .get('https://crudcrud.com/api/f83156651d0a4f1798662f32ef29db4e/expenses')
      .then((res) => {
        res.data.forEach((item) => {
          if (item.description === desc) {
            text1.value = item.expenseAmount
            text2.value = item.description
            text3.value = item.category
            deleteDetail(item._id)
          }
        })
      })
      .catch((err) => console.log(err))

    itemList.removeChild(li)
  }
}

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement
    const desc = li.innerHTML.split(' - ')[2].split('<button')[0].trim()
    axios
      .get('https://crudcrud.com/api/f83156651d0a4f1798662f32ef29db4e/expenses')
      .then((res) => {
        res.data.forEach((item) => {
          if (item.description === desc) {
            deleteDetail(item._id)
            console.log(item._id)
            itemList.removeChild(li)
          }
        })
      })
      .catch((err) => console.log(err))
  }
}

function deleteDetail(_id) {
  // localStorage.removeItem(desc)
  axios.delete(
    `https://crudcrud.com/api/f83156651d0a4f1798662f32ef29db4e/expenses/${_id}`
  )
}

function addItemToDom(expenseAmount1, description1, category1) {
  var li = document.createElement('li')

  // Add text node with input value
  li.appendChild(
    document.createTextNode(
      `${expenseAmount1} - ${category1} - ${description1}`
    )
  )

  // Create del button element
  var deleteBtn = document.createElement('button')
  var editBtn = document.createElement('button')

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm delete'
  editBtn.className = 'editBtn btn edit'

  // Append text node
  deleteBtn.appendChild(document.createTextNode('delete expense'))
  editBtn.appendChild(document.createTextNode('edit expense'))

  // Append button to li
  li.appendChild(deleteBtn)
  li.appendChild(editBtn)

  // Append li to list
  itemList.appendChild(li)
}

// retrieveData()
// function retrieveData() {
//   itemList.innerHTML = ''
//   axios
//     .get(
//       'https://crudcrud.com/api/f83156651d0a4f1798662f32ef29db4e/expenses'
//     )
//     .then((res) => {
//       fetchedData = res.data
//       fetchedData.forEach((item) => {
//         addItemToDom(item.expenseAmount, item.description, item.category)
//       })
//     })
//     .catch((err) => console.log(err))
// }

// Also by window is loaded
window.addEventListener('DOMContentLoaded', function () {
  itemList.innerHTML = ''
  axios
    .get('https://crudcrud.com/api/f83156651d0a4f1798662f32ef29db4e/expenses')
    .then((res) => {
      const data = res.data
      data.forEach((item) => {
        addItemToDom(item.expenseAmount, item.description, item.category)
      })
    })
    .catch((err) => console.log(err))
})
