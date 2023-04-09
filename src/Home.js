import React from 'react'
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im';
import { MdMeetingRoom } from 'react-icons/md';

const Home = () => {
  return (
    <div className='py-5  row w-100 justify-content-center'>
     <header className="app-header py-5 w-100">
        <h1 className="page-header">MVP Play And Gain </h1>
     </header>
     <Row className='justify-content-center mt-5'>
      <Link to='./rooms' className='col-lg-3 col-8 p-0 m-3' >
        <Button className='rooms-btn w-100 p-3 border-0 fs-4'><MdMeetingRoom/> Rooms</Button> 
      </Link>
     </Row>
     <Row className='justify-content-center mt-5'>
      <Link to='./search' className='col-lg-3 col-8 p-0 m-3'>
        <Button className='search-btn w-100 p-3 border-0 fs-4'><ImSearch/> Search</Button> 
      </Link>
     </Row>
 

    </div>
  )
}

export default Home
