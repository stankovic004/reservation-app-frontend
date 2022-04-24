import React , {useEffect, useState }from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Popup(props) {

    const [hours, setHours] = useState([])

    useEffect(()=> {
        let hours = [];
        for (let i = 7; i < 23; i+=0.5 ) {
          hours.push({hours: Math.floor(i), min: i % 1 == 0 ? '00' : '30', reserved: false})
        }
        setHours(hours)
      }, [])
    
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
                        <div className="calendarContainer">
                            <Calendar onChange={setDate} value={date} next2Label='' prev2Label={''} />
                        </div>
                        <div className="hourContainer">
                            { hours.map(h => {
                                return (<div className="hourClickable">{h.hours}:{h.min}</div>)
                            })}

                        </div>
                    </div>
                
                </div>    
            </div>

    )
}

export default Popup;