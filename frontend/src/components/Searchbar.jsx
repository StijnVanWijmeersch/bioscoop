import PropTypes from 'prop-types'

const Searchbar = (props) => {

  const { handleSearchChange } = props;

  return (
    <div className="flex items-center shadow-lg rounded-md">
        <button className="text-gray-100 p-1 px-2 w-24 rounded-l-md bg-gray-900 overflow-hidden flex items-center justify-between">
          Genre
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <input className="px-2 py-1 w-72 outline-none border-none text-gray-950" type="text" placeholder="Search movie" onChange={handleSearchChange} />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 bg-white p-1 rounded-r-md text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    </div>
  )
}

Searchbar.propTypes = {
  handleSearchChange: PropTypes.func,
  genres: PropTypes.array
}

export default Searchbar