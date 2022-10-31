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

function createPost(post, callback) {
  setTimeout(() => {
    posts.push({ ...post, createdAt: new Date().getTime() })
    // console.log(posts)
    callback()
  }, 2000)
}
function create4thPost(post, callback) {
  setTimeout(() => {
    posts.push({ ...post, createdAt: new Date().getTime() })
    // console.log(posts)
    callback()
  }, 6000)
}

createPost({ title: 'Post three', body: 'This is post three' }, getPosts)
create4thPost({ title: 'Post four', body: 'This is post four' }, getPosts)
