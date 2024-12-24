import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router";

import './Reservation.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { getApartment } from '../../utils/api';

const Reservation = () => {
    const {id} = useParams()
    function handleClick() {
      {}
    }
    const [listing, setListing] = useState([])
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();
    useEffect(()=>{
      console.log('test')
      getApartment(id).then((data) => {
       // console.log(data.apartments)
        setListing(data.apartments);
        setLoading(false)
      }
      )
    }, [])
  return (
    <>{!loading?
      <div className="reservation">
        <div className='info'>
            <div className='title'>
            <div className='back-icone'><IoMdArrowRoundBack style={{'color':'red'}}onClick={()=>{navigate(-1)}}/></div>
                {listing.address}
              
             
            </div>
            <img src={listing.image} />
        </div>
        <div className='details'>
            <p>Renter: {listing.user.name}</p>
            <p>Number Of Rooms: {listing.rooms}</p>
            <p>Phone Number: {listing.user.phone}</p>
            <p id='price'>Price: {listing.price} MAD</p>
            <button onClick={handleClick}>Reserve</button>
        </div>
       
      </div>
    :
    <div></div>
    }
    </>
    
  )
}

export default Reservation