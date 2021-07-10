const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  for (const element of blogs) {
    total += element.likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs) {return}
  let title = blogs[0].title
  let author = blogs[0].author
  let likes = blogs[0].likes
  for (const element of blogs) {
    if (element.likes > likes) {
      title = element.title
      author = element.author
      likes = element.likes
    }
  }
  return {title, author, likes}
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}