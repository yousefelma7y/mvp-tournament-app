import React from 'react'
import "../App.css";
import { useEffect, useState } from "react";
import goldMedal from "../images/medals/gold.png";
import silverMedal from "../images/medals/silver.png";
import bronzeMedal from "../images/medals/bronze.png";
import normalMedal from "../images/medals/normal.png";
import { Button, Row } from 'react-bootstrap';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { TbArrowBigRightLineFilled } from 'react-icons/tb';

const url = "https://coral-app-35v54.ondigitalocean.app";

const medals = [goldMedal, silverMedal, bronzeMedal, normalMedal, normalMedal];

// today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth()+1)).slice(-2);
var currYear =  today.getFullYear();

const Rooms = () => {
  const [data, setData] = useState({
    "results": [
      {
        "_id": "63cc06801e2a5edff27f01e4",
        "startDate":"2022-03-17",
        "endDate": "2022-03-23",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad" ,
          "hamed"    
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "yousef": 80 ,
          "ziad" : 70 ,
          "hamed" : 40    
        },
        "prizeRanges": [
          200,
          100,
          50
        ],
        "name": "Room 1"
      } ,
      {
        "_id": "63cc06343e2a5edff27f01e3",
        "startDate":"2023-03-20",
        "endDate": "2023-03-30",
        "players": [
          "yassin",
          "fo2sh",
          "yousef",
          "ziad" ,
          "hamed"    
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80 ,
          "yousef": 70 ,
          "hamed" : 40    
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
          "ziad" ,
          "hamed"    
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80 ,
          "yousef": 70 ,
          "hamed" : 40    
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
          "ziad" ,
          "hamed"
        ],
        "coinsSummary": {
          "fo2sh": 26.5,
          "yassin": 59.5,
          "ziad": 80 ,
          "yousef": 70  ,
          "hamed" : 40  
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
  for(let i=0 ; i < data.results.length ; i++) {
    for (var k1 in data.results[i].players)
    for (var k2 in data.results[i].players)
    if (data.results[i].coinsSummary[data.results[i].players[k1]] > data.results[i].coinsSummary[data.results[i].players[k2]])
    [data.results[i].players[k1], data.results[i].players[k2]] =
    [data.results[i].players[k2], data.results[i].players[k1]];
  }


  useEffect(() => {
    fetch(`${url}/scores`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        // setData(body)
      });
  }, []);

  return (
    <div className="rooms-page w-100 row p-2 py-5">
      <Row>
        <div className='col-2'>
          <Link to='/'>
            <Button className='home-btn fs-3 bg-success border-0'><ImHome/> </Button>
          </Link>
        </div>
      <h1 className='col-8' >ROOMS</h1>
      </Row>
      {data.results.length === 0 ? <h1>no rooms</h1> : ''}
      {data.results.map((data) => (
        <div key={data._id} className={
        data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
        data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
        data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
        ' bg-success m-1 my-3 p-3 rounded row col-lg-5 col-12 text-white ':
        'bg-white m-1 my-3 p-3 rounded row col-lg-5 col-12 text-dark' } >
          <h2 className="col-12 fw-bold ">{data.name}</h2>
        <div
         className={
          data.startDate.slice(-10 ,-6)<=currYear && data.startDate.slice(-10 ,-6)>=currYear&&
          data.startDate.slice(-5 ,-3)<=currMonth && currMonth<=data.endDate.slice(-5 ,-3)&&
          data.startDate.slice(-2)<=currDay && currDay<=data.endDate.slice(-2)?
          'row py-3 fw-bold': 'row py-3 text-secondary fw-bold' }
        >
          <span className='date col-12'>
            <span className='mx-3'> {data.startDate}</span> 
             <TbArrowBigRightLineFilled className='fs-1'/> 
            <span className='mx-3'>{data.endDate}</span>
          </span>
        </div>
          {data.players.map((player, index) => (
            <div className="single-score" key={player}>
              <span className="username">{player}</span>
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
          ))}

        </div>
      ))}
  </div>
  )
}

export default Rooms
