import React from 'react';
import { Link } from "react-router-dom";
import { CgEnter } from "react-icons/cg";

import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-ctn">
      <section className='grid'>
        <div className='grid__texts'>
          <h2 className='grid__title'> Welcome to</h2>
          <h2 className='grid__title title--transform'> WikiDogs 🐾​</h2>
          <Link className='link-btn' to='/home'>
            <CgEnter size={50} className='icon' />
            <span className="spn-lnd">Let's Go!</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage