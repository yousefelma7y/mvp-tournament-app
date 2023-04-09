import axios from 'axios';
import React from 'react'
import { useState } from "react";
import './Search.css';
import { BiSearch } from 'react-icons/bi';
import ErrorModal from '../LoadingSpinner/ErrorModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import goldMedal from "../images/medals/gold.png";
import silverMedal from "../images/medals/silver.png";
import bronzeMedal from "../images/medals/bronze.png";
import normalMedal from "../images/medals/normal.png";
import { Button, Row } from 'react-bootstrap';
import { ImHome } from 'react-icons/im';
import { TbArrowBigRightLineFilled } from 'react-icons/tb';


import { Link } from 'react-router-dom';

const medals = [goldMedal, silverMedal, bronzeMedal, normalMedal, normalMedal];

// today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth()+1)).slice(-2);
var currYear =  today.getFullYear();

const Search = () => {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState({
    "results": [
      {
        "_id": "63cc06801e2a5edff27f01e4",
        "startDate": "2022-03-17",
        "endDate": "2022-03-23",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "yousef": 80,
          "ziad": 70,
          "hamed": 40
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 1"
      },
      {
        "_id": "63cc06343e2a5edff27f01e3",
        "startDate": "2023-03-20",
        "endDate": "2023-03-30",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80,
          "yousef": 70,
          "hamed": 40
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 2"
      },
      {
        "_id": "63cc063345e2a5edff27f01e3",
        "startDate": "2022-09-09",
        "endDate": "2023-09-13",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80,
          "yousef": 70,
          "hamed": 40
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 3"
      },
      {
        "_id": "63cc06343e2asad5edff27f01e3",
        "startDate": "2022-09-09",
        "endDate": "2023-09-13",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad",
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80,
          "yousef": 70,
          "hamed": 40
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 4"
      }
    ]
  });
  // Arrange Array
  for (let i = 0; i < userData.results.length; i++) {
    for (var k1 in userData.results[i].players)
      for (var k2 in userData.results[i].players)
        if (userData.results[i].coinsSummary[userData.results[i].players[k1]] > userData.results[i].coinsSummary[userData.results[i].players[k2]])
          [userData.results[i].players[k1], userData.results[i].players[k2]] =
            [userData.results[i].players[k2], userData.results[i].players[k1]];
  }


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = "https://coral-app-35v54.ondigitalocean.app/rooms/assigned";
  const params = JSON.stringify({
    "username": name
  });
  const SearchRoom = async event => {
    setIsLoading(true);
    event.preventDefault();
    let resp = await axios.get(url, params, {
      "headers": {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        // setUserData(response.response.data)
        setError(response.response.data);
        setIsLoading(false);

      })
      .catch(function (er) {
        setError(er.response.data.error);
        console.log(er.response.data);
        setIsLoading(false);
      });
  };
  const errorHandler = () => {
    setError(null);
  }
  return (
    <div className='w-100 row p-1 justify-content-center m-0'>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Row className='w-100 justify-content-center p-0 m-0 mb-3 m-2'>
        <div className='col-2 p-0 mx-3'>
          <Link to='/'>
            <Button className='home-btn bg-success border-0 fs-3'><ImHome /> </Button>
          </Link>
        </div>
        <div className="row col-8 justify-content-center p-0 mx-1">
          <div className="form-outline col-md-6 col-9 p-0 ">
            <input
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              type="search"
              id="form1"
              placeholder="Search Rooms"
              className="form-control p-3 " />
          </div>
          <button onClick={SearchRoom} type="button" className="btn btn-primary col-md-1 col-3 ">
            <BiSearch className='fs-2' />
          </button>
        </div>
      </Row>

      {userData.results.length === 0 ? <h1>No Rooms</h1> : ''}
      {userData.results.map((data) => (
        <div  key={data._id} className="w-100 row justify-content-center ">
          {data.players.map((player, index) => (
            player == name &&
            <Link to={`/selectedroom/${data._id}`}
            key={player}
            className={
              data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
              data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
              data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
              'bg-success  my-3 p-1 rounded row col-md-10 col-12 text-white text-decoration-none':
              'bg-white  my-3 p-1 rounded row col-md-10 col-12 text-dark text-decoration-none' }>
              <h4 className="col-4 fw-bold py-3">{data.name}</h4>

              <div className={
                data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
                data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
                data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
                'row py-3 fw-bold col-8': 'row py-3 text-secondary fw-bold col-8' }
              >
                <span className='date'>
                  <span className='mx-1'> {data.startDate}</span>
                  <TbArrowBigRightLineFilled className='fs-6 ' />
                  <span className='mx-1'>{data.endDate}</span>
                </span>
              </div>
              <div className="single-score" key={player}>              
                <span className="username"> <span className="fw-bold">{index+1}-</span>{player}</span>
                <span className="score">
                  {index < 5 && (
                    <img
                      className="prize-icon"
                      src={medals[index]}
                      alt="medal"
                    />
                  )}
                  <span className='fw-bold'>{data.prizeRanges[index]} EGP</span>
                  <span className='px-2'>{data.coinsSummary[player]} pts</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Search
