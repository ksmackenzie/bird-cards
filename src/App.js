import './App.css'

import Card from './Card'
import { useState, useEffect } from 'react'

function App() {
  const getWikiContent = (topic) => {
    fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts|pageimages&piprop=original&exintro&redirects=1&titles=${topic}`
    )
      .then((res) => res.json())
      .then((res) => {
        const card = Object.values(res.query.pages)[0]
        console.log(res)
        setnewCard({
          heading: card.title,
          description: card.extract,
          image: card.original.source,
          id: card.pageid,
        })
        setquery('')
      })
      .catch((e) => {
        alert(`Oh no! Couldn't find anything on ${topic}`)
      })
  }

  const [cards, setcards] = useState([])
  const [newCard, setnewCard] = useState()
  const [query, setquery] = useState('')

  async function addNewCard(topic) {
    getWikiContent(topic)
  }

  useEffect(() => {
    newCard && setcards((cards) => [newCard, ...cards])
  }, [newCard])

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewCard(query)
  }

  return (
    <div className='App'>
      <nav>Bird Cards</nav>
      <main>
        <div className='card card-container'>
          <form onSubmit={handleSubmit}>
            <label>
              Add new bird:&nbsp;
              <input type='text' value={query} onChange={(e) => setquery(e.target.value)} />
            </label>
            <input type='submit' value='Submit' />
          </form>
          {cards.map((data) => (
            <Card
              heading={data.heading}
              description={data.description}
              image={data.image}
              id={data.id}
              key={data.id}
            />
          ))}
        </div>
      </main>
      <footer>&copy;KM 2020</footer>
    </div>
  )
}

export default App
