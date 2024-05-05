import React from 'react';
import "../css/ChannelRow.css";

const ChannelRow = ({image, channel, subs, noOfVideos, description}) => {
    return (
        <div className="channelRow">
            <div className="channelRow_logo">
                <img src={image} alt="" height="130px"/>
            </div>
            <div className="channelRow_info">
                <h3>{channel}</h3>
                <p>{subs} • {noOfVideos}</p>
                <p>{description}</p>
            </div>
        </div>
       
    )
}

export default ChannelRow;
