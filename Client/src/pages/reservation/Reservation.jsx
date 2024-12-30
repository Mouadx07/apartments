import React, { useEffect,useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router";

import './Reservation.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { getApartment, book } from '../../utils/api';
import { GrResume } from 'react-icons/gr';
import { AuthContext } from '../../context/AuthContext';

const Reservation = () => {
    
    const {id} = useParams()
    const {userId} = useContext(AuthContext)
    const [nights, setNights] = useState(1);
    const [price, setPrice] = useState(0);
    async function handleClick() {
    const data = {
      nights,
      price,
      userId,
      apartmentId: id,
      
    }
    console.log(data)
    const response = await book(data);
      console.log(response);
      if (response.success) {
        alert("Apartment Booked Successfuly");
        navigate(-1)
      }
    }
    
    const [listing, setListing] = useState([])
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();
    useEffect(()=>{
      console.log('test')
      getApartment(id).then((data) => {
       // console.log(data.apartments)
        setListing(data.apartments);
        setPrice(data.apartments.price)
        setLoading(false)
      }
      )
    }, [])
  function handleChange(e){
    if (e.target.value>=1){
      setNights(e.target.value);
    setPrice(listing.price*e.target.value);
    }
    
  }
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
            <div className="book">
              <div className="nights">
              <label htmlFor="nights" >Nights: </label>
              <input type="number" id="nights" name="nights" value={nights} onChange={handleChange}/>
              </div>
              
              <p id='price'>{price} MAD</p>
            </div>
            
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