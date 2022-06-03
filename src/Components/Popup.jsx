import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GetLoggedInUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { makeReservation } from "../services/backendCalls";

function Popup(props) {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [isActive, setActive] = useState("false");
  const [schedulesTaken, setSchedulesTaken] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log(props.locationSelected);
    console.log(props.username);
    let schedules = [];
    for (let i = 7; i < 23; i += 0.5) {
      schedules.push({
        hours: Math.floor(i),
        min: i % 1 === 0 ? "00" : "30",
        reserved: false,
        isClicked: false,
      });
    }
    setSchedules(schedules);
  }, []);

  let handleClick = (hoursClicked, minutes, e) => {
    // whichClass.stopPropagation();
    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].hours === hoursClicked && schedules[i].min === minutes) {
        schedules[i].isClicked = !schedules[i].isClicked;
      }
    }
    //dodavanje u dolji info dio
    let schedulesTaken = [];

    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].isClicked) {
        schedulesTaken.push(schedules[i]);
      }
    }
    setSchedulesTaken(schedulesTaken);
  };

  let closePopup = () => {
    props.setPopupShown(false);
  };

  //premeni klasname
  const handleToggle = () => {
    setActive(!isActive);
  };

  const dontClose = (e) => {
    e.stopPropagation();
  };

  //datum se premenjo
  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = () => {
    let username = GetLoggedInUser();
    if (username == "") {
      alert("Niste logirani");
      navigate("/login");
      return;
    }
    let selectedDates = formatSelectedDates();
    makeReservation(username, props.locationSelected.name, selectedDates);
  };

  const formatSelectedDates = () => {
    let dates = [];
    schedulesTaken.forEach((s) => {
      let d = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: s.hours,
        min: +s.min,
      };
      dates.push(d);
    });
    return dates;
  };

  return (
    <div className="popup" onClick={closePopup}>
      <div className="innerPopup" onClick={dontClose}>
        <div className="innerPopupContainer">
          <div className="calendarContainer">
            <Calendar
              onChange={onDateChange}
              value={date}
              next2Label=""
              prev2Label={""}
            />
          </div>
          <div className="hourContainer">
            {schedules.map((h) => {
              return (
                <button
                  className={
                    h.reserved
                      ? "hourTaken"
                      : h.isClicked
                      ? "hourClicked"
                      : "hourAvailable "
                  }
                  onClick={() => {
                    handleClick(h.hours, h.min, h);
                    handleToggle();
                  }}
                >
                  {h.hours}:{h.min}
                </button>
              );
            })}
          </div>
          <div className="info">
            <br />
            <br />
            <p>Korisnik: {GetLoggedInUser()}</p>
            <p>Dvorana: {props.locationSelected.name} </p>
            <p>Datum: {date.toDateString()}</p>
            <p>
              Sati: ⠀
              {schedulesTaken.map((schedule) => {
                return (
                  (schedule.isClicked
                    ? schedule.hours + ":" + schedule.min
                    : "") + ", "
                );
              })}
            </p>
            <button onClick={handleSubmit}> Potvrdi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
