import axios from 'axios'
import './App.css'
import UploadForm from './components/UploadForm'
import UploadList from './components/UploadList'
import { BACKEND_URL } from './config/constants'
import { useEffect, useState } from 'react'

function App() {
  const [medias, setMedias] = useState([])
  
  useEffect(() => {
    getAllMedias()
  }, [])
  const getAllMedias = () => {
    axios.get(`${BACKEND_URL}/api/v1/media/all`).then((result) => {
      setMedias(result.data)
    }).catch((error) => {
      setMedias([])
      console.log(error)
      alert('Error Occurred!')

    })
  }
  return (
    <>
    <div className="container" >
      VideoUploader
    </div>
     <div className="row">
      <div className="col">
        <div className="card" style={{
          height: 'auto',
          width: '750px',
          margin: '40px',
          border: '1px solid black',
          backgroundColor: '#abafaf'
        }}>
          <div className="card-body">
            <UploadForm getAllMedias = {getAllMedias}/>
            </div>
        </div>
      </div>
      <div className="col">
      <div className="card" style={{
          height: 'auto',
          width: '750px',
          margin: '40px',
          border: '1px solid black',
          backgroundColor: '#abafaf'
        }}>
          <div className="card-body">
            <UploadList medias={medias}/>
            </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
