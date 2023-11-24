import nodata from '../../../assets/images/nodata.png'

const Nodata = () => {
  return (
    <div className="text-center py-4">
            <img src={nodata} alt="no-data-img" />
            <h4>No data found!</h4>
    </div>
  )
}

export default Nodata