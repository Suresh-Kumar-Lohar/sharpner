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

async function createPost(post) {
  return await new Promise((resolve, reject) => {
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
async function create4Post(post) {
  return await new Promise((resolve, reject) => {
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
async function deletePost() {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length === 0) {
        reject('Error : posts array is empty')
      } else {
        // console.log('here')
        posts.pop()
        resolve()
      }
    }, 1000)
  })
}

async function printCreatePost() {
  getPosts()
  await createPost({ title: 'Post three', body: 'This is post three' })
  console.log('first')
  console.log('second')

  getPosts()
  await create4Post({ title: 'Post four', body: 'This is post four' })
  console.log('first')
  console.log('second')
  getPosts()
  await deletePost()
  await getPosts()
  await deletePost()
  await getPosts()
  await deletePost()
  await getPosts()
  await deletePost()
  await getPosts()
  try {
    await deletePost()
  } catch (error) {
    console.log(error)
  }
  await getPosts()
}

printCreatePost()

/******   YOUTUBE   *****/
// console.log('person1 shows ticket');
// console.log('person2 shows ticket');

// const preMovie = async () => {

//   const person3PromiseToShowTicketWhenWifeArrives = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('ticket'), 3000);
//   });
//   const getPopcorn =  new Promise((resolve, reject) => {
// 		setTimeout(() => resolve('popcorn'), 3000);
//   });

//   const getCandy =  new Promise((resolve, reject) => {
// 		setTimeout(() => resolve('candy'), 3000);
//   });

//    const getCoke =  new Promise((resolve, reject) => {
// 		setTimeout(() => resolve('coke'), 3000);
//   });

// const getColdDrinks = new Promise((resolve, reject) => {
//   setTimeout(() => resolve('cold drinks'), 3000)
// })

//   let ticket = await person3PromiseToShowTicketWhenWifeArrives;

//     let [ popcorn, candy, coke ] =
//     await Promise.all([ getPopcorn, getColdDrinks, getCandy, getCoke  ]);

//     console.log(`got ${popcorn}, ${candy}, ${coke}`);

//   return ticket;

// };

// preMovie().then((t) => console.log(`person4 shows ${t}`));

// console.log('person4 shows ticket');
