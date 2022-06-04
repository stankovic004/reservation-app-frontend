import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GetLocations } from "../services/backendCalls";

function PopupTimePicking(props) {
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [isActive, setActive] = useState("false");
  const [reservations, setReservations] = useState(props.reservations);
  const [resByDay, setResByDay] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const initSchedules = () => {
    let schedules = [];
    for (let i = 7; i < 23; i += 0.5) {
      schedules.push({
        hours: Math.floor(i),
        min: i % 1 === 0 ? "00" : "30",
        reserved: false,
        isClicked: false,
      });
    }
    return schedules;
  };

  const compareLocations = (res) => {
    console.log(res);
    let newLocations = locations.filter((elem) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].location == elem.name) {
          return false;
        }
      }
      return true;
    });
    setFilteredLocations(newLocations);
  };

  useEffect(() => {
    setSchedules(initSchedules());
    let resHolder = [];
    props.reservations.forEach((res) => {
      let oneReservation = {
        user: res.user,
        location: res.location,
        date: new Date(res.dates),
      };
      resHolder.push(oneReservation);
    });
    setReservations(resHolder);

    GetLocations().then((loc) => {
      setLocations(loc);
      setFilteredLocations(loc);
    });
  }, []);

  let closeSearchPopup = () => {
    props.setSearchPopupShown(false);
  };

  let onDateChange = (newDate) => {
    setDate(newDate);
    setSchedules(initSchedules());

    let filteredRes = reservations.filter(
      (el) =>
        el.date.getYear() == newDate.getYear() &&
        el.date.getMonth() == newDate.getMonth() &&
        el.date.getDate() == newDate.getDate()
    );
    setResByDay(filteredRes);
  };

  let dontCloseSearchPopup = (e) => {
    e.stopPropagation();
  };

  let handleClick = (hoursClicked, minutes, e) => {
    // whichClass.stopPropagation();
    for (let i = 0; i < schedules.length; i++) {
      if (
        schedules[i].hours === hoursClicked &&
        schedules[i].min === minutes &&
        schedules[i].reserved == false
      ) {
        schedules[i].isClicked = !schedules[i].isClicked;
      }
    }

    let filteredRes = resByDay.filter(
      (el) =>
        el.date.getUTCHours() == hoursClicked &&
        el.date.getUTCMinutes() == minutes
    );
    compareLocations(filteredRes);
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="searchPopup" onClick={closeSearchPopup}>
      <div className="visibleSearchPopup" onClick={dontCloseSearchPopup}>
        <div className="searchPopupContainer">
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
          <br></br>
          <br></br>
          <div className="info">Dvorane sa slobodnim terminima:</div>
          {filteredLocations.map((loc) => {
            return <span className="location">{loc.name + ", "}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PopupTimePicking;
