import PropTypes from "prop-types"

const GenreTag = (props) => {
  return (
    <span className="text-sm px-2 py-1 border-[1px] border-gray-300 w-fit rounded-md mr-1 mb-1">{props.children}</span>
  )
}


GenreTag.propTypes = {
    children: PropTypes.string
}

export default GenreTag