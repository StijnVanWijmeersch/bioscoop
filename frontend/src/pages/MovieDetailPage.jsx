import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchById } from "../api";
import SelectBox from "../components/SelectBox";
import Loading from "../components/Loading";
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast";

const MovieDetailPage = () => {

  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState({genres: [], actors: []});
  const [presentations, setPresentations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [presentationsOnSelectedDate, setPresentationsOnSelectedDate] = useState([]);
  const { notifyFailure } = useToast();

  const { id } = useParams();
  
  useEffect(() => {
    fetchMovieAndPresentations();
  }, [])

  const fetchMovieAndPresentations = async () => {
    try {
      const movieResponse = await fetchById('/movies', id);
      const presentationResponse = await fetchById('/presentations/movie', id);
      const { data: movieData } = movieResponse;
      const { data: presentationData } = presentationResponse;
      
      setCurrentMovie(movieData);
      setPresentations(presentationData);

    } catch(err) {
      notifyFailure(err.response.data)
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleClick = (e) => {

    const { value: date } = e.target;
    const presentationsOnDate = presentations.filter(current => new Date(current.date).toLocaleDateString("nl-BE") === date);

    setPresentationsOnSelectedDate(presentationsOnDate);
    setHasSelectedDate(true);

  }

  const handleTimeClick = (presId) => {
    navigate(`/reservation/${presId}`);
  }

  if(isLoading) {
    return <Loading />
  }
 
  return (
    <div className="w-full h-[calc(100vh-5rem)] relative">
      <Toaster />
      <img src={currentMovie.thumbNail} alt="Background picture" className="absolute -z-10 top-0 left-0 w-full h-full object-cover opacity-30" />
      <div className="bg backdrop-blur-[2px]">
        <div className="w-full h-fit p-6 flex flex-col justify-center gap-4">
          <h1 className="font-semibold text-4xl">{currentMovie.title}</h1>
          <p>{currentMovie.description}</p>
        </div>
        <div className="w-full h-fit p-6 flex flex-col gap-4">
          <div className="w-full">
            <h4 className="font-semibold text-sm">GENRE(S)</h4>
            {currentMovie.genres.map(gen => <span className="mr-2 text-sm" key={gen.id}>{gen.name}</span>)}
          </div>
          <div className="w-full">
            <h4 className="font-semibold text-sm">CAST</h4>
            {currentMovie.actors.map(actor => <span className={`mr-2 text-sm`} key={actor.id}>{actor.name}</span>)}
          </div>
        </div>
        <div className="w-full p-6 flex flex-col gap-2">
          <h4 className="font-semibold text-sm">SELECT DATE</h4>
          <div className="flex">
            {
              presentations
              .map(p => p.date)
              .filter((val, index, arr) => arr.indexOf(val) === index)
              .map((date, index) => <SelectBox key={index} value={new Date(date).toLocaleDateString("nl-BE")} onClick={handleClick} />)
            }
          </div>
        </div>
        {
          hasSelectedDate &&
          <div className="w-full p-6 pt-1 flex flex-col gap-2">
            <h4 className="font-semibold text-sm">TIME</h4>
            <div className="flex">
              {
                presentationsOnSelectedDate.map(pres => <SelectBox key={pres.id} value={pres.time} onClick={ () => handleTimeClick(pres.id) } />)
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default MovieDetailPage