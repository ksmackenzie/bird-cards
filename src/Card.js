import React from 'react'

export default function Card(props) {
  const { heading, description, image } = props
  return (
    <div className='card'>
      <h1>{heading || 'Card Heading'}</h1>
      <img src={image} style={{ height: '100px', width: 'auto' }} alt=''></img>
      <p>
        {description ||
          "Card paragraph content. Content for cards goes here. Whatever you like, as long as it's something that should be card content."}
      </p>
    </div>
  )
}
