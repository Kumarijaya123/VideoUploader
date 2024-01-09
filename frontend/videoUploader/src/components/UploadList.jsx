import React from "react";
import PropTypes from "prop-types";
import { BACKEND_URL } from "../config/constants";

const UploadsList = ({ medias }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered" >
          <thead >
            <tr>
              <th width="200" style={{backgroundColor: '#e8ecec'}}>Name</th>
              <th style={{backgroundColor: '#e9f4f4'}}>Videos</th>
            </tr>
          </thead >
          <tbody >
            {medias &&
              medias.map((media, index) => {
                return (
                  <tr key={index}>
                    <td style={{backgroundColor: '#eef1f1'}}>{media.name}</td>
                    <td style={{backgroundColor: '#eef1f1'}} >
                      {media.videos.map((video, videoIndex) => {
                        return (
                          <video
                            key={videoIndex}
                            preload="auto"
                            width="320"
                            height="250"
                            controls
                          >
                            <source src={`${BACKEND_URL}/public${video}`} type="video/mp4"/>
                            Your browser does not support the video tag.
                          </video>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

UploadsList.propTypes = {
  medias: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      videos: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default UploadsList;
