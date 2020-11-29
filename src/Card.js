import React from 'react'

function HeaderRow(props) {
  const { id, deleteCard, heading } = props
  return (
    <div className='flex'>
      <h1 onClick={() => window.open(`http://en.wikipedia.org/?curid=${id}`)}>
        {heading || 'Failed to get card heading :('}
      </h1>
      <span className='close flex-item-right' onClick={() => deleteCard(id)}>
        &times;
      </span>
    </div>
  )
}

const Thumbnail = (props) => {
  const { image, heading } = props
  return image ? <img src={image} alt={heading}></img> : <></>
}

const Description = (props) => {
  const description = props.description
  return description ? (
    <div dangerouslySetInnerHTML={{ __html: description }} />
  ) : (
    <div>Failed to get description :(</div>
  )
}

export default function Card(props) {
  const { heading, description, image, id, deleteCard } = props
  const headerProps = { id, deleteCard, heading }
  const thumbnailProps = { image, heading }

  return (
    <div className='card entry-card'>
      <div className='card-content ht-100pc'>
        <HeaderRow {...headerProps} />
        <Thumbnail {...thumbnailProps} />
        <Description description={description} />
      </div>
    </div>
  )
}
