import { useEffect } from "react";
import { useState } from "react"
import { fetchById } from "../api";
import useAuthentication from "../hooks/useAuthentication";
import Ticket from "../components/Ticket";
import Loading from "../components/Loading";
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast";

const TicketHistoryPage = () => {

    const [userTickets, setUserTickets] = useState([]);
    const { user, isLoading } = useAuthentication();
    const { notifyFailure } = useToast();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchById('/tickets/user', user.id, true);
                const { data } = response;
                
                setUserTickets(data);
            } catch(err) {
                notifyFailure(err.response.data)
            }
        })();
    }, [user]);


    if(isLoading) {
        return <Loading />
    }

    return (
        <>
            <Toaster />
            <div className="w-full px-8 py-2 pt-4 flex justify-center">
                <h1 className="font-bold text-4xl tracking-wider text-gray-800">My Tickets</h1>
            </div>       
            <div className="w-full h-fit flex flex-wrap justify-center p-8 gap-10">
                {userTickets.map(t => {
                    const { presentation: { movie, room, date, time } } = t;
                    return <Ticket key={t.id} movie={movie} room={room} date={date} time={time} seats={t.seatTickets.map(st => st.seat)}/>
                })}
            </div>
        </>    
    )
}

export default TicketHistoryPage