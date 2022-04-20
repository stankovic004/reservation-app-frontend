import React , { useState }from "react";
import DateTimePicker from 'react-datetime-picker'

function Popup(props) {


    let closePopup = () => {
        console.log("popup closed");
        props.setPopupShown(false);
      }

    const dontClose = (e) => {
        console.log(e)
        e.stopPropagation()
    }

    const [date, setDate] = useState(new Date());

    return (
        <div className="popup" onClick={closePopup}>
            <div className="innerPopup" onClick={dontClose}>
                    <div className="innerPopupContainer">
                        <DateTimePicker onChange={setDate} value={date} />
                    </div>
                
                </div>    
            </div>

    )
}

export default Popup;