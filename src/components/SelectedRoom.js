import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'

import { TbArrowBigRightLineFilled } from 'react-icons/tb';

import goldMedal from "../images/medals/gold.png";
import silverMedal from "../images/medals/silver.png";
import bronzeMedal from "../images/medals/bronze.png";
import normalMedal from "../images/medals/normal.png";
import { Link, useParams } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';


const medals = [goldMedal, silverMedal, bronzeMedal, normalMedal, normalMedal];

// today date
var today = new Date();
var currDay = ('0' + today.getDate()).slice(-2);
var currMonth = ('0' + (today.getMonth() + 1)).slice(-2);
var currYear = today.getFullYear();

const SelectedRoom = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState({
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
                    "ziad"
                ],
                "coinsSummary": {
                    "fo2sh": 26.5,
                    "yassin": 59.5,
                    "ziad": 80,
                    "yousef": 70
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
    for (let i = 0; i < rooms.results.length; i++) {
        for (var k1 in rooms.results[i].players)
            for (var k2 in rooms.results[i].players)
                if (rooms.results[i].coinsSummary[rooms.results[i].players[k1]] > rooms.results[i].coinsSummary[rooms.results[i].players[k2]])
                    [rooms.results[i].players[k1], rooms.results[i].players[k2]] =
                        [rooms.results[i].players[k2], rooms.results[i].players[k1]];
    }

    return (
        <div className='row w-100 justify-content-center py-5 p-2 m-0'>
            <Row>
                <div className='m-3 rounded row col-2 row justify-content-start'>
                    <Link to='/search'>
                        <Button className='rooms-btn border-0 fs-3'><ImSearch /> </Button>
                    </Link>
                </div>
            </Row>

            {rooms.results.map((data) => (data._id === id ?
                <div key={data._id} className={
                    data.startDate.slice(-10, -6) <= currYear && data.startDate.slice(-10, -6) >= currYear &&
                        data.startDate.slice(-5, -3) <= currMonth && currMonth <= data.endDate.slice(-5, -3) &&
                        data.startDate.slice(-2) <= currDay && currDay <= data.endDate.slice(-2) ?
                        'bg-success  my-3 p-1 rounded row  col-10 text-white text-decoration-none' :
                        'bg-white  my-3 p-1 rounded row  col-10 text-dark text-decoration-none'} >
                    <h4 className={
                        data.startDate.slice(-10, -6) <= currYear && data.startDate.slice(-10, -6) >= currYear &&
                            data.startDate.slice(-5, -3) <= currMonth && currMonth <= data.endDate.slice(-5, -3) &&
                            data.startDate.slice(-2) <= currDay && currDay <= data.endDate.slice(-2) ?
                            "col-md-6 col-12 py-md-4 py-2  fw-bold" : 'col-md-6 col-12 py-md-4 py-2 fw-bold'} >{data.name}</h4>
                    <div className={
                        data.startDate.slice(-10, -6) <= currYear && data.startDate.slice(-10, -6) >= currYear &&
                            data.startDate.slice(-5, -3) <= currMonth && currMonth <= data.endDate.slice(-5, -3) &&
                            data.startDate.slice(-2) <= currDay && currDay <= data.endDate.slice(-2) ?
                            'row col-md-6 col-12 py-md-4 py-2  fw-bold m-0' : 'row col-md-6 col-12 py-md-4 py-2 text-secondary fw-bold m-0'}>
                        <span className=' date'>
                            <span className='mx-1'> {data.startDate}</span>
                            <TbArrowBigRightLineFilled className='fs-1 ' />
                            <span className='mx-1'>{data.endDate}</span>
                        </span>
                    </div>
                    {data.players.map((player, index) => (
                        <div className="single-score" key={player}>
                            <span className="fw-bold">{player}</span>
                            <span className="">
                                {index < 5 && (
                                    <img
                                        className="prize-icon"
                                        src={medals[index]}
                                        alt="medal"
                                    />
                                )}
                                <span className={
                                    data.startDate.slice(-10, -6) <= currYear && data.startDate.slice(-10, -6) >= currYear &&
                                        data.startDate.slice(-5, -3) <= currMonth && currMonth <= data.endDate.slice(-5, -3) &&
                                        data.startDate.slice(-2) <= currDay && currDay <= data.endDate.slice(-2) ?
                                        'fw-bold text-warning' : 'fw-bold text-danger'}>
                                    {data.prizeRanges[index]} EGP</span>
                                <span className='px-2'>{data.coinsSummary[player]} pts</span>
                            </span>
                        </div>
                    ))}
                </div> : ''
            ))}
        </div>
    )
}

export default SelectedRoom