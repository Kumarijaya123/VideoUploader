import { useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../config/constants"

function UploadForm({getAllMedias}) {
    const [name, setName] = useState('')
    const [videos, setVideos] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let formdata = new FormData()
        for (let key in videos) {
            formdata.append("videos", videos[key]);
          }
        formdata.append('name', name)

        axios.post(`${BACKEND_URL}/api/v1/media/create`, formdata).then((success) => {
            getAllMedias()
            alert('Submitted videos successfully')
        })
        .catch((error) => {
            console.log(error)
            alert('Something wrong!')
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" style={{marginTop:'5px', color:'black', fontWeight:'bold', fontFamily:'sans-serif'}}>Name</label>
                <input type="text" name="name" id="name" style={{marginTop:'5px'}}
                className="form-control" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group" style={{marginTop:'15px', color:'black', fontWeight:'bold'}}>
                <label htmlFor="videos" >Upload Videos</label>
                <input type="file" name="videos" id="videos" multiple className="form-control" style={{marginTop: '8px'}}
                accept=".mp4, .mkv" onChange={(e) => {
                    setVideos(e.target.files)
                }}/>
            </div>
            <button type="submit" className="btn btn-primary mt-4" style={{ fontWeight: 'bold', fontSize: '16px', borderRadius: '5px' }} >
                Submit
            </button>
        </form>
    </div>
  )
}

export default UploadForm