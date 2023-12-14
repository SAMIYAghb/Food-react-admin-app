import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (<>
  <div className=" d-flex justify-content-center align-content-center">
    <InfinitySpin
      width='200'
      color="#4fa94d"
/>
</div>
</>
  )
}

export default Loader