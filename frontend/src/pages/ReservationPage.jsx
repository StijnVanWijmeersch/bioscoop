import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchById, sendDataToApi } from "../api";
import SeatSelectBox from "../components/SeatSelectBox";
import PaymentWindow from "../components/PaymentWindow";
import StyledButton from "../components/StyledButton";
import Loading from "../components/Loading";
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast";

const ReservationPage = () => {

    const { presentationId } = useParams()
    const { notifyFailure } = useToast();

    const [presentation, setPresentation] = useState(null);
    const [seats, setSeats] = useState([]);
    const [chosenSeats, setChosenSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ticket, setTicket] = useState({});
    const [canPay, setCanPay] = useState(false);

    useEffect(() => { fetchPresentation() }, []);
    useEffect(() => { 
        if(presentation) {
            fetchSeats();
        }
    }, [presentation]);

    const fetchPresentation = async () => {

        try{

            const presRepsonse = await fetchById(`/presentations`, presentationId);
            const { data: presentationData } = presRepsonse;
            setPresentation(presentationData);

        } catch(err) {
            notifyFailure(err.response.data)
        }
    }

    const fetchSeats = async () => {

        try {
            const seatsResponse = await fetchById('/seats/room', presentation.roomId);
            const { data: seatsData } = seatsResponse;
            setSeats(seatsData);
        } catch(err) {
            notifyFailure(err.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e, seat) => {
        const { checked } = e.target;
        const { price } = seat;
        const priceAsInt = Number.parseInt(price);

        if(checked) {
            setTotalPrice(prev => prev+=priceAsInt);
            setChosenSeats(prev => [...prev, seat]);
        }
        else {
            setTotalPrice(prev => prev-=priceAsInt);
            setChosenSeats(prev => [...prev.filter(s => s.id !== seat.id)]);
        }

    }

    const handleCheckout = async () => {

        try {

            const response = await sendDataToApi('/tickets', {
                presentationId: presentation.id,
                totalPrice: totalPrice
            }, true);

            const { data: ticket, status } = response;

            if(status === 201) {
                setTicket(ticket);
                setCanPay(true);
            }

        } catch(err) {
            notifyFailure(err.response.data)
        }
    }

    const formatter = new Intl.NumberFormat('en-BE', {
        style: 'currency',
        currency: 'EUR',
    });

    if(isLoading) {
        return <Loading />
    }

    
    return (
        <div className="w-full h-[calc(100vh-5rem)] p-8 flex flex-col relative">
            <Toaster />
            <div className="flex mb-20 justify-between items-center">
                <div className="flex flex-col gap-y-4">
                    <h1 className="font-semibold text-4xl">{presentation.movie.title}</h1>
                    <h2 className="font-semibold text-2xl">Choose your seats</h2>
                </div>
                <div className="flex flex-col justify-center gap-y-4">
                    <h1 className="font-semibold text-2xl">Total Price: {formatter.format(totalPrice)}</h1>
                    <StyledButton onClick={handleCheckout}>Checkout</StyledButton>
                </div>
            </div>
            <div className="w-3/4 grid grid-rows-4 grid-cols-5 gap-y-8 self-center mb-8">
                {
                    
                    seats.map(seat => <SeatSelectBox key={seat.id} value={seat.number} id={seat.id} onChange={ (e) => handleChange(e, seat) } disabled={ 
                        //filter gereserveerde stoelen en disable die
                        presentation.seatTicker.map(st => st.seat.number).includes(seat.number) }
                    />)
                }
            </div>
            {
                canPay && <PaymentWindow chosenSeats={chosenSeats} ticket={ticket} />
            }
        </div>
    )
}

export default ReservationPage