import PropTypes from "prop-types"
import GenreTag from "./GenreTag";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {

    const { id, title, releaseDate, genres, thumbNail, description } = movie;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`movie/${id}`);
    }

    return (
        <div className="w-80 h-[34rem] flex flex-col rounded-lg shadow-xl pb-8 shadow-gray-700 overflow-hidden relative group hover:cursor-pointer hover:pb-0" onClick={handleClick}>
            <div className="w-full h-3/4 group-hover:h-full">
                <img src={thumbNail} className="w-full h-full object-cover group-hover:opacity-20"/>
            </div>
            <div className="w-full flex justify-between p-2 group-hover:hidden">
                <h2 className="font-bold text-xl text-amber-900">{title}</h2>
                <p className="font-medium text-lg text-amber-900">{new Date(releaseDate).getFullYear()}</p>
            </div>
            <div className="w-full flex pl-2 flex-wrap group-hover:hidden">
                {
                    genres.map((gen) => <GenreTag key={gen.id}>{gen.name}</GenreTag>)
                }
            </div>
            {/* SHOW DESCRIPTION ON hover */}
            <div className="w-full h-full absolute left-0 top-0 hidden group-hover:flex group-hover:justify-center group-hover:items-center">
                <p className="text-sm m-1 font-medium">{description}</p>
            </div>
        </div>
    )
}


MovieCard.propTypes = {
    movie: PropTypes.object
}

export default MovieCard