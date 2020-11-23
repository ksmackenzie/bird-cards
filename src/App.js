import './App.css'

import Card from './Card'
import { useState, useEffect } from 'react'

const sampleCardData = [
  {
    heading: 'Super-spangled Drongo',
    description: "Much like the vaunted Spangled Drongo, only even more super-duper cool, y'know?",
  },
  {
    heading: 'New Zealand Moa',
    description:
      'Much like the vaunted emu, only like twice as big and from New Zealand. The Moa were hunted to extinciton hundreds of years ago by the Maori.',
  },
]

function App() {
  const [cards, setcards] = useState(sampleCardData)
  const [newCard, setnewCard] = useState()

  function addNewCard() {
    setnewCard({
      heading: 'Dragon',
      description: 'Not actually even a bird, but a dragon is pretty cool and it flies, so...',
    })
  }

  useEffect(() => {
    newCard && setcards((cards) => [newCard, ...cards])
  }, [newCard])

  return (
    <div className='App'>
      <nav>Bird Cards</nav>
      <main>
        <button onClick={() => addNewCard()}>Add Dragon</button>
        <div className='card card-container'>
          {cards.map((data, idx) => (
            <Card heading={data.heading} description={data.description} key={idx} />
          ))}
        </div>
      </main>
      <footer>&copy;KM 2020</footer>
    </div>
  )
}

export default App
