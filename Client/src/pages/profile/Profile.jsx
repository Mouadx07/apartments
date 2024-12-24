import React, { useEffect, useState, useContext } from 'react'
import Listing  from '../../components/Listing'
import './Profile.css'
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {getUserApartments} from '../../utils/api'


const Profile = () => {
  const {userId} = useContext(AuthContext);
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  useEffect(()=>{
    console.log('tes')
    getUserApartments(userId).then(data=>{
      setListings(data.result.apartments);
      setUser(data.result.user)
      setLoading(false);
    })
  }, [])
  return (
    <>{!loading
    ?<div>
        <div className="profile-create">
            <h1>Profile.</h1>
            <Link to="create-listing">  <MdAdd style={{size: '2em'}}/> Create Listing
            </Link>
        </div>
        
        <h2>Your Listings</h2>
        <div className='listings-container'>
        {listings.map(listing => <Listing img={listing.image} renter={user.name} price={listing.price} available={listing.available} address={listing.address} onClick={() => {}}/>)}

        </div>
    </div>
    :<div></div>}
    </>
    
  )
}

export default Profile