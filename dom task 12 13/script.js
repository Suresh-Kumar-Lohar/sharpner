const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const submit = document.getElementById('submit')
const itemList = document.getElementById('items')

retrieveData()

submit.addEventListener('click', submitHandler)

function submitHandler(e) {
  const name = text1.value
  const emailId = text2.value
  userDetails = {
    name: name,
    emailId: emailId,
  }
  localStorage.setItem(`${emailId}`, JSON.stringify(userDetails))
  addNewItem(name, emailId)
}

itemList.addEventListener('click', removeItem)
itemList.addEventListener('click', editItem)

function editItem(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement
    const name = li.innerHTML.split(',')[0]
    const emailId = li.innerHTML.split(',')[1].split('<button')[0].trim()
    deleteDetail(emailId)
    itemList.removeChild(li)
    text1.value = name
    text2.value = emailId
  }
}

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement
    const delId = li.innerHTML.split(',')[1].split('<button')[0].trim()
    deleteDetail(delId)
    itemList.removeChild(li)
  }
}

function addNewItem(name, emailId) {
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage[i]
    if (key === emailId) {
      deleteDetail(emailId)
      break
    }
  }
  retrieveData()
}

function deleteDetail(emailId) {
  localStorage.removeItem(emailId)
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

function retrieveData() {
  itemList.innerHTML = ''
  for (x in localStorage) {
    // console.log(JSON.parse(localStorage.getItem(x)))
    var tmp = JSON.parse(localStorage.getItem(x))
    if (tmp) {
      console.log(tmp)
      name1 = tmp.name
      emailId1 = tmp.emailId
      addItemToDom(name1, emailId1)
    }
  }
}