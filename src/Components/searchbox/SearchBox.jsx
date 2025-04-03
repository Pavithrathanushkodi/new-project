import React from 'react'
import { IoSearch } from "react-icons/io5";

const Searchbox = () => {
  return (
    <div className='SearchBox position-ralative d-flex align-items-center'>
        <IoSearch className='mr-2'/>
        <input type="text" placeholder='Search here...' />
     
    </div>
  )
}

export default Searchbox;