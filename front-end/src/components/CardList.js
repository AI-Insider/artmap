import React from 'react';
import Card from "./Card";




const CardList = ({art})=>{
  const cardComponent = art.map((art,i)=>{
    return <Card key={art.id} id={art.id} filename={art.filename} name={art.artname}/>
  })
  return(
    <div>
      {cardComponent}
    </div>
  )
}
export default CardList;
