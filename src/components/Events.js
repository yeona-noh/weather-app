import React from "react";
import './events.css';

const Events = (events) => {

    return (
        <div className="eventLists">
                <p style={{fontWeight: "bold"}}>When: </p><p>{events.date}</p>
                <p style={{fontWeight: "bold"}}>Where: </p><p>{events.place}</p>
                <p>{events.address}</p>
                <p style={{fontWeight: "bold"}}>What: </p><p>{events.performers}</p>
        </div>
    )
}

export default Events;