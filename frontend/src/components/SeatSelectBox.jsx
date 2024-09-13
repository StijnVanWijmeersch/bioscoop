import PropTypes from "prop-types"

const SeatSelectBox = (props) => {
  return (
    <div className="w-full flex justify-center">
        <label className="w-16 h-16 relative flex justify-center items-center hover:cursor-pointer" htmlFor={props.id}>
            <input type="checkbox" className="appearance-none peer" name="seat" {...props} />
            <span className="absolute shadow-lg w-full h-full bg-gray-400 rounded-lg peer-checked:bg-gray-100 peer-disabled:opacity-30"></span>
            <span className="relative z-10 text-lg text-gray-100 peer-checked:text-gray-400">{props.value}</span>
        </label>
    </div>
  )
}


SeatSelectBox.propTypes = {
    value: PropTypes.number,
    id: PropTypes.number
}

export default SeatSelectBox