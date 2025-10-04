import './Spinner.css'

const Spinner = ({ size = 'md', className = '' }) => {
  return (
    <div className={`spinner spinner-${size} ${className}`}>
      <div className="spinner-inner"></div>
    </div>
  )
}

export default Spinner
