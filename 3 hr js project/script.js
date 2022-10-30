const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const text3 = document.getElementById('text3')
const submit = document.getElementById('submit')
const itemList = document.getElementById('items')

retrieveData()

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
  localStorage.setItem(`${description}`, JSON.stringify(userDetails))
  addNewItem(expenseAmount, description, category)
}

itemList.addEventListener('click', removeItem)
itemList.addEventListener('click', editItem)

function editItem(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement
    // console.log(li.innerHTML)
    const amount = li.innerHTML.split(' - ')[0].trim()
    // console.log(amount)
    const desc = li.innerHTML.split(' - ')[2].split('<button')[0].trim()
    // console.log(desc)
    deleteDetail(desc)
    itemList.removeChild(li)
    text1.value = amount
    text2.value = desc
  }
}

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement
    const desc = li.innerHTML.split(' - ')[2].split('<button')[0].trim()
    deleteDetail(desc)
    itemList.removeChild(li)
  }
}

function addNewItem(expenseAmount, description, category) {
  // for (var i = 0; i < localStorage.length; i++) {
  //   const key = localStorage[i]
  //   if (key === description) {
  //     deleteDetail(description)
  //     break
  //   }
  // }
  retrieveData()
}

function deleteDetail(desc) {
  localStorage.removeItem(desc)
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

function retrieveData() {
  itemList.innerHTML = ''
  for (x in localStorage) {
    // console.log(JSON.parse(localStorage.getItem(x)))
    var tmp = JSON.parse(localStorage.getItem(x))
    if (tmp) {
      // console.log(tmp)
      expenseAmount1 = tmp.expenseAmount
      description1 = tmp.description
      category1 = tmp.category
      addItemToDom(expenseAmount1, description1, category1)
    }
  }
}
