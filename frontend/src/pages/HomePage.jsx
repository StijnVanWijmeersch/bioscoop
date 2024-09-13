import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import Searchbar from "../components/Searchbar";
import { fetchAll } from "../api";
import Loading from "../components/Loading";
import { Toaster } from "react-hot-toast";
import useToast from "../hooks/useToast";

const HomePage = () => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const { notifyFailure } = useToast();

  useEffect(() => {
    fetchMovies();
  }, [])

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  }


  const fetchMovies = async () => {
    try {
      const response = await fetchAll('/movies');
      const { data } = response;
      setMovies(data);
    } catch(err) {
      notifyFailure(err.response.data)
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

  };

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full h-min-screen flex flex-wrap justify-center gap-y-6 gap-x-4 p-5 bg-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Toaster />
      <div className="w-full h-12 flex justify-center items-center">
        <Searchbar handleSearchChange={handleSearch} />
      </div>
      {
        movies
        .filter((movie) => 
          movie.title.toLowerCase().includes(searchInput.toLowerCase()))
        .map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

export default HomePage