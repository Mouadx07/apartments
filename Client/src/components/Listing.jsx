import React from 'react'
import './Listing.css'
function Listing({img, renter, price, address, available, onClick}){
  return (
    <div className="listing" onClick={onClick}>
        <img src={img} />
        <div className='listing-info'>
            <h3 className='listing-title'>{address}</h3>
            <div className='listing-desc'>
                <p id="renter">renter: {renter}</p>
                <p>{available?"Available":"Not Available"}</p>
            </div>
            
            
            <p id="price">{price} MAD</p>
        </div>
    </div>
  )
}

export default Listing