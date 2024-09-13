import PropTypes from "prop-types"
import Ticket from "./Ticket";
import StyledButton from "./StyledButton";
import { useEffect, useState } from "react";
import { sendDataToApi, setTicketPayed } from "../api";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast";

const PaymentWindow = ({ chosenSeats, ticket }) => {

    const navigate = useNavigate();
    const [seats, setSeats] = useState([...chosenSeats]);
    const [dataToSend, setDataToSend] = useState([])
    const { notifyFailure } = useToast();

    const { date, time, movie, room } = ticket.presentation;

    useEffect(() => {
        seedDataToSend();
    }, [])

    const seedDataToSend = () => {
        seats.forEach(s => 
            setDataToSend(prev => [...prev, { seatId: s.id, ticketId: ticket.id, presentationId: ticket.presentationId }])
        );
    }

    const handlePayment = async () => {
        try {
            const response = await sendDataToApi("/seats/reserve", { reservedSeats: dataToSend }, true);
            const { status } = response;

            if(status === 201) {
                await setTicketPayed(ticket.id);
                navigate('/user/tickets');
            }

        } catch(err) {
            notifyFailure(err.response.data)
        }
    }

    return (
        <div className="absolute left-0 top-0 z-10 w-full h-full flex flex-col justify-center items-center bg-white bg-opacity-80 backdrop-blur-[2px]">
            <Toaster />
            <Ticket movie={movie} room={room} date={date} time={time} seats={seats} />
            <StyledButton onClick={handlePayment}>Confirm payment</StyledButton>
        </div>
    )
}

PaymentWindow.propTypes = {
    chosenSeats: PropTypes.array,
    ticket: PropTypes.object
}

export default PaymentWindow