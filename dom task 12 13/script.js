const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const text3 = document.getElementById('text3')
const submit = document.getElementById('submit')
const itemList = document.getElementById('items')

submit.addEventListener('click', submitHandler)

function submitHandler(e) {
  const name = text1.value
  const emailId = text2.value
  const phoneNo = text3.value
  userDetails = {
    name: name,
    emailId: emailId,
    phoneNo: phoneNo,
  }
  axios
    .post(
      'https://crudcrud.com/api/52383d932dd4479ebbdc5b1546de9b80/appointmentData',
      userDetails
    )
    .then((res) => {
      addItemToDom(res.data.name, res.data.emailId)
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

itemList.addEventListener('click', removeItem)
itemList.addEventListener('click', editItem)

function editItem(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement
    const editId = li.innerHTML.split(',')[1].split('<button')[0].trim()
    axios
      .get(
        'https://crudcrud.com/api/52383d932dd4479ebbdc5b1546de9b80/appointmentData'
      )
      .then((res) => {
        res.data.forEach((item) => {
          if (item.emailId === editId) {
            text1.value = item.name
            text2.value = item.emailId
            text3.value = item.phoneNo
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
    const delId = li.innerHTML.split(',')[1].split('<button')[0].trim()
    console.log(delId)
    axios
      .get(
        'https://crudcrud.com/api/52383d932dd4479ebbdc5b1546de9b80/appointmentData'
      )
      .then((res) => {
        res.data.forEach((item) => {
          if (item.emailId === delId) {
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
  // localStorage.removeItem(emailId)
  axios.delete(
    `https://crudcrud.com/api/52383d932dd4479ebbdc5b1546de9b80/appointmentData/${_id}`
  )
}

function addItemToDom(name1, emailId1) {
  var li = document.createElement('li')

  // Add text node with input value
  li.appendChild(document.createTextNode(`${name1}, ${emailId1}`))

  // Create del button element
  var deleteBtn = document.createElement('button')
  var editBtn = document.createElement('button')

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm delete'
  editBtn.className = 'editBtn btn edit'

  // Append text node
  deleteBtn.appendChild(document.createTextNode('delete'))
  editBtn.appendChild(document.createTextNode('edit'))

  // Append button to li
  li.appendChild(deleteBtn)
  li.appendChild(editBtn)

  // Append li to list
  itemList.appendChild(li)
}

// retrieveData()

// function retrieveData() {
//   itemList.innerHTML = ''
// for (x in localStorage) {
//   // console.log(JSON.parse(localStorage.getItem(x)))
//   var tmp = JSON.parse(localStorage.getItem(x))
//   if (tmp) {
//     console.log(tmp)
//     name1 = tmp.name
//     emailId1 = tmp.emailId
//     addItemToDom(name1, emailId1)
//   }
// }
//   axios
//     .get(
//       'https://crudcrud.com/api/cd5fb8e3f3a04894943d824d12293114/appointmentData'
//     )
//     .then((res) => {
//       fetchedData = res.data
//       fetchedData.forEach((item) => {
//         addItemToDom(item.name, item.emailId)
//       })
//     })
//     .catch((err) => console.log(err))
// }

// Also by window is loaded
window.addEventListener('DOMContentLoaded', function () {
  itemList.innerHTML = ''
  axios
    .get(
      'https://crudcrud.com/api/52383d932dd4479ebbdc5b1546de9b80/appointmentData'
    )
    .then((res) => {
      const data = res.data
      data.forEach((item) => {
        addItemToDom(item.name, item.emailId)
      })
    })
    .catch((err) => console.log(err))
})
