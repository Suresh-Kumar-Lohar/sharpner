const posts = [
  {
    title: 'Post one',
    body: 'This is post one ',
    createdAt: new Date().getTime(),
  },
  {
    title: 'Post Two',
    body: 'This is post two',
    createdAt: new Date().getTime(),
  },
]
let intervalId = 0
getPosts()
function getPosts() {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    let output = ''
    posts.forEach((post, index) => {
      output += `<li>${post.title} last updated at ${
        (new Date().getTime() - post.createdAt) / 1000
      } seconds ago</li>`
    })
    document.body.innerHTML = output
  }, 1000)
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push({ ...post, createdAt: new Date().getTime() })

      const error = false
      if (!error) {
        resolve()
      } else {
        reject('Error : Something went wrong')
      }
    }, 2000)
  })
}
function create4Post(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push({ ...post, createdAt: new Date().getTime() })

      const error = false
      if (!error) {
        resolve()
      } else {
        reject('Error : Something went wrong')
      }
    }, 6000)
  })
}
function deletePost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length === 0) {
        reject('Error : posts array is empty')
      } else {
        posts.pop()
        resolve()
      }
    }, 1000)
  })
}
createPost({ title: 'Post three', body: 'This is post three' })
  .then(getPosts())
  .catch((err) => console.log(err))
create4Post({ title: 'Post four', body: 'This is post four' })
  .then(() => {
    getPosts()
    deletePost().then(() => {
      getPosts()
      deletePost().then(() => {
        getPosts()
        deletePost().then(() => {
          getPosts()
          deletePost().then(() => {
            getPosts()
            deletePost()
              .then(() => {})
              .catch((err) => {
                console.log(err)
              })
          })
        })
      })
    })
  })
  .catch((err) => console.log(err))
