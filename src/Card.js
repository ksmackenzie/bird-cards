import React from 'react'

export default function Card(props) {
  const { heading, description, image, id } = props

  return (
    <div className='card' onClick={() => window.open(`http://en.wikipedia.org/?curid=${id}`)}>
      <h1>{heading || 'Card Heading'}</h1>
      <img src={image} style={{ height: 'auto', maxHeight: '150px', width: 'auto' }} alt=''></img>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}
