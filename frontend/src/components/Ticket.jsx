import { useState } from "react"
import PropTypes from 'prop-types'

const Ticket = ({ movie, date, time, room, seats }) => {
    
    const [seatsForTicket, setSeatsForTicket] = useState([...seats]);

    return (
        <div className="w-80 h-96 bg-white rounded-xl overflow-hidden shadow-2xl mb-6">
            <div className="w-full h-1/5 bg-gray-950 text-gray-100 py-2 px-4 flex flex-col justify-between shadow-lg">
                <h1 className="font-bold text-lg">{movie.title}</h1>
                <h3 className="text-sm font-bold">{new Date(date).toLocaleDateString("nl-BE")} AT {time}</h3>
            </div>
            <div className="w-full h-3/5">
                <img src={movie.thumbNail} alt="thumbnail" className="w-full h-full object-cover"/>
            </div>
            <div className="w-full h-1/5 py-2 px-4 bg-gray-950 text-gray-100 flex justify-between">
                <div className="h-full flex flex-col">
                    <p className="block text-sm font-bold">ROOM:</p>
                    <span className="text-lg font-bold">{room.name}</span>
                </div>
                <div className="h-full flex flex-col">
                    <p className="block text-sm font-bold">SEATS:</p>
                    <span className="text-lg font-bold">{seatsForTicket.map(s => s.number).join()}</span>
                </div>
            </div>
        </div>
    )
}

Ticket.propTypes = {
    movie: PropTypes.object,
    date: PropTypes.date,
    time: PropTypes.string,
    room: PropTypes.object,
    seats: PropTypes.array
}

export default Ticket