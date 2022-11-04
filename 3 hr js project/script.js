const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const text3 = document.getElementById('text3')
const submit = document.getElementById('submit')
const itemList = document.getElementById('items')

submit.addEventListener('click', submitHandler)

async function submitHandler(e) {
  const expenseAmount = text1.value
  const description = text2.value
  const category = text3.value
  userDetails = {
    expenseAmount: expenseAmount,
    description: description,
    category: category,
  }
  try {
    if (expenseAmount && description) {
      const res = await axios.post(
        'https://crudcrud.com/api/7e1b94409e8749538445f8fdb845dfeb/expenses',
        userDetails
      )
      addItemToDom(
        res.data.expenseAmount,
        res.data.description,
        res.data.category
      )
      console.log(res)
      text1.value = ''
      text2.value = ''
      text3.value = ''
    }
  } catch (error) {
    console.log(error)
  }
}

itemList.addEventListener('click', removeItem)
itemList.addEventListener('click', editItem)

async function editItem(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement
    const desc = li.innerHTML.split(' - ')[2].split('<button')[0].trim()
    // console.log(desc)
    try {
      const res = await axios.get(
        'https://crudcrud.com/api/7e1b94409e8749538445f8fdb845dfeb/expenses'
      )
      res.data.forEach((item) => {
        if (item.description === desc) {
          text1.value = item.expenseAmount
          text2.value = item.description
          text3.value = item.category
          deleteDetail(item._id)
        }
      })
    } catch (error) {
      console.log(error)
    }

    itemList.removeChild(li)
  }
}

async function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement
    const desc = li.innerHTML.split(' - ')[2].split('<button')[0].trim()
    try {
      const res = await axios.get(
        'https://crudcrud.com/api/7e1b94409e8749538445f8fdb845dfeb/expenses'
      )
      res.data.forEach((item) => {
        if (item.description === desc) {
          deleteDetail(item._id)
          console.log(item._id)
          itemList.removeChild(li)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

async function deleteDetail(_id) {
  // localStorage.removeItem(desc)
  try {
    await axios.delete(
      `https://crudcrud.com/api/7e1b94409e8749538445f8fdb845dfeb/expenses/${_id}`
    )
  } catch (error) {
    console.log(error)
  }
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
//       'https://crudcrud.com/api/7e1b94409e8749538445f8fdb845dfeb/expenses'
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
window.addEventListener('DOMContentLoaded', async function () {
  itemList.innerHTML = ''
  try {
    const res = await axios.get(
      'https://crudcrud.com/api/7e1b94409e8749538445f8fdb845dfeb/expenses'
    )
    const data = res.data
    data.forEach((item) => {
      addItemToDom(item.expenseAmount, item.description, item.category)
    })
  } catch (error) {
    console.log(error)
  }
})
