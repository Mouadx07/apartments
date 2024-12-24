import React, { useState, useEffect, useRef, useContext  } from 'react';
import { Outlet } from 'react-router-dom';
import './Root.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const links = [
    {title: 'Home', path:'/'},
    {title: 'Apartments', path:'/apartments'},
    {title: 'Save List', path:'/savedlist'},
]
function  Root() {
    const {userId, token, logout} = useContext(AuthContext)
    // useEffect(()=>{
    //     console.log(userId + ' user')
    //     console.log(token)
    // })
    
    return (
        <>
            <nav>
                
                <div className="pages">
                   {links.map((link, i)=> {
                    return <NavLink className={({isActive})=>isActive?"activeNav":"inactiveNav"} key={i} id={i} to={link.path}>{link.title}</NavLink>
                   })}
                    
                </div>
                {/* <Link to="login">Login</Link>
                <Link to="signup">SignUp</Link> */}
                <div className="auth">
                     {/* <Link to="profile">Profile</Link> */}
                     {token?<div>
                        <Link to="profile">Profile</Link>
                        <Link to="" onClick={()=>{logout()}}>Logout</Link>
                     </div>
                     
                     :<div>
                    <Link to="login">Login</Link>
                     <Link to="signup">SignUp</Link>
                    </div>


                     }
                     
                   
                    

                </div>
                
            </nav>
            
            <Outlet/>
        </>
    )
}

export default Root;