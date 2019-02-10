import axios from 'axios'

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('helloWorld')

  const theQuote = document.getElementById('text')
  const theAuthor = document.getElementById('author')
  const btnNewQuote = document.getElementById('new-quote')
  const btnTweetQuote = document.getElementById('tweet-quote')
  let num = 0

  //créer un num Random
  function randomNum() {
    const myRandomNum = Math.floor(Math.random() * 20)
    if (myRandomNum === num) {
      return randomNum()
    }
    num = myRandomNum
  }

  function getQuote() {
    let myRandomNum = randomNum()
    axios
      .get(
        'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=20'
      )
      .then(function(reponse) {
        console.log(reponse)
        theQuote.innerHTML = reponse.data[num].content
        theAuthor.innerHTML = reponse.data[num].title
      })
      .catch(error => console.log('error =>', error))
  }

  getQuote()

  btnNewQuote.onclick = () => {
    getQuote()
  }

  btnTweetQuote.onclick = e => {
    const citation = document.querySelector('.title p').innerHTML
    console.log('citation => ', citation)
    console.log(e)
    const btnJS = document
      .getElementById('tweet-quote')
      .setAttribute(
        'href',
        `https://www.twitter.com/intent/tweet?text=${citation}`
      )
    console.log(btnJS)
  }
})
