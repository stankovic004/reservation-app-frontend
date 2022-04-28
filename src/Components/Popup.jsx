import React , {useEffect, useState }from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Popup(props) {

    const [hours, setHours] = useState([])
    const [isActive, setActive] = useState("false");

    const [date, setDate] = useState(new Date());

    useEffect(()=> {
        let hours = [];
        for (let i = 7; i < 23; i+=0.5 ) {
          hours.push({hours: Math.floor(i), min: i % 1 == 0 ? '00' : '30', reserved: false, clicked:false})
        }
        setHours(hours);
    }, [])

    let handleClick= (hours,minutes, e) =>{
        // whichClass.stopPropagation();
        console.log("pressed " + hours + ":" + minutes+ "  class:" + e.className);

    }
    
    let closePopup = () => {
        console.log("popup closed");
        props.setPopupShown(false);
      }


    //premeni klasname 
    const handleToggle = () => {
        console.log("handle toggle");
        setActive(!isActive);
    };


    const dontClose = (e) => {
        e.stopPropagation()
    }


    //datum se premenjo
    const onDateChange = (newDate) => {
        console.log(newDate);
        setDate(newDate);
    }

    

    return (
        <div className="popup" onClick={closePopup}>
            <div className="innerPopup" onClick={dontClose}>
                    <div className="innerPopupContainer">
                        <div className="calendarContainer">
                            <Calendar  onChange={onDateChange} value={date} next2Label='' prev2Label={''} />
                        </div>
                        <div className="hourContainer">
                            { hours.map(h => {
                                return (<button className={ h.reserved ? 'hourTaken' :  h.clicked ? 'hourClicked' : 'hourAvailable ' } onClick={() => {handleClick(h.hours, h.min, h); handleToggle()}}>{h.hours}:{h.min}</button>)
                            })}
                        </div>
                        <div className="info">
                            <br/><br/>
                            <p>Rezervirao: *korisnicko ime* </p>
                            <p>Dvorana: *goc* </p>
                            <p>Datum:  {date.toDateString()}</p> 
                            <p>Sati:  *poklikani divi*</p>
                            <button> Potvrdi</button>
                        </div>

                    </div>
                
                </div>    
            </div>

    )
}


export default Popup;