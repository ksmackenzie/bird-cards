import './App.css'

import Card from './Card'
import { useState, useEffect } from 'react'

const baseUrl = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts|pageimages&piprop=thumbnail&pithumbsize=500&exintro&redirects=1&titles=`

function App() {
  function showErrorModal(message) {
    const app = document.querySelector('.App')
    const modal = `<div class='modal-bg'><div class='modal'><h3>Failed :(</h3><p>${message}</p></div></div>`
    app.insertAdjacentHTML('afterbegin', modal)
  }

  function clearModal() {
    const modal = document.querySelector('.modal-bg')
    modal?.parentNode && modal.parentNode.removeChild(modal)
  }

  const getWikiContent = async (topic) => {
    try {
      const response = await fetch(`${baseUrl}${topic}`)
      const result = await response.json()

      const pageKey = Object.keys(result.query.pages)[0]
      if (pageKey === '-1') throw new Error(`Oh no! Couldn't find anything on ${topic}`)

      const page = Object.values(result.query.pages)[0]

      const existingIds = cards.map((c) => c.id)
      if (!existingIds.includes(page.pageid)) {
        setnewCard({
          heading: page.title,
          description: page.extract,
          image: page.thumbnail?.source || null,
          id: page.pageid,
        })
        setquery('')
      }
    } catch (error) {
      showErrorModal(error.message)
    }
  }

  const storedCards = JSON.parse(localStorage.getItem('bird-cards'))
  const [cards, setcards] = useState(storedCards || [])
  const [newCard, setnewCard] = useState()
  const [query, setquery] = useState('')

  async function addNewCard(topic) {
    getWikiContent(topic)
  }

  useEffect(() => {
    localStorage.setItem('bird-cards', JSON.stringify(cards))
  }, [cards])

  useEffect(() => {
    newCard && setcards((cards) => [newCard, ...cards])
    return () => {
      setnewCard(null)
    }
  }, [newCard])

  useEffect(() => {
    // MODAL HANDLING
    const clickListener = document.addEventListener('click', (e) => {
      e.target.className === 'modal-bg' && clearModal()
    })
    const clearModalKeyListener = document.addEventListener(
      'keydown',
      (e) => e.key === 'Escape' && clearModal(),
      false
    )

    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keydown', clearModalKeyListener)
      localStorage.removeItem('bird-cards')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    query && addNewCard(query)
  }

  const deleteCard = (id) => {
    setcards(cards.filter((card) => card.id !== id))
  }

  return (
    <div className='App v-fill-screen grid-burger'>
      <nav>Bird Cards</nav>
      <main>
        <div className='card card-container'>
          <div className='controls'>
            <form className='flex w-100pc' onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Add new card'
                value={query}
                onChange={(e) => setquery(e.target.value)}
                autoFocus
              />
              <input type='submit' value='Submit' />
              <button className='flex-item-right' onClick={() => setcards([])}>
                Clear
              </button>
            </form>
          </div>
          {cards.length > 0 && (
            <div className='cards-grid'>
              {cards.map((data, idx) => (
                <Card {...data} deleteCard={deleteCard} key={idx} />
              ))}
            </div>
          )}
        </div>
      </main>
      <footer>&copy;KM 2020</footer>
    </div>
  )
}

export default App
