import React, { useState, useEffect } from 'react';
import { get, post } from '../../../http/api'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BsHours = ({id_card}) => {
  const [selectedDays, setSelectedDays] = useState({
    Lundi: false,
    Mardi: false,
    Mercredi: false,
    Jeudi: false,
    Vendredi: false,
    Samedi: false,
    Dimanche: false,
  });

  const [timesByDay, setTimesByDay] = useState({});
  const [hoursData, setHoursData] = useState({});

  const fetchData = async () => {
    try {
      const response = await get(`bs_hours/${id_card}`);
      const user = response.data;
      setHoursData(user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hoursData && Object.keys(hoursData).length > 0) {
      const initialSelectedDays = {
        Lundi: false,
        Mardi: false,
        Mercredi: false,
        Jeudi: false,
        Vendredi: false,
        Samedi: false,
        Dimanche: false,
      };
  
      const initialTimesByDay = {};

    hoursData.forEach((hours) => {
      initialSelectedDays[hours.day] = hours.status === 1;

      const startTime = hours.start_time ? hours.start_time.slice(0, 5) : '00:00';
      const endTime = hours.end_time ? hours.end_time.slice(0, 5) : '00:15';

      initialTimesByDay[hours.day] = {
        from: startTime,
        to: endTime,
      };
    });

  
      setSelectedDays(initialSelectedDays);
      setTimesByDay(initialTimesByDay);
    }
  }, [hoursData]);






  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const handleCheckboxChange = (day) => {
    console.log(day)
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));

    if (!timesByDay[day]) {
      setTimesByDay((prevTimes) => ({
        ...prevTimes,
        [day]: {
          from: '00:00',
          to: '00:15',
        },
      }));
    }
  };

  const handleFromTimeChange = (day, event) => {
    const newTimesByDay = {
      ...timesByDay,
      [day]: {
        ...timesByDay[day],
        from: event.target.value,
      },
    };
    setTimesByDay(newTimesByDay);
  };

  const handleToTimeChange = (day, event) => {
    const newTimesByDay = {
      ...timesByDay,
      [day]: {
        ...timesByDay[day],
        to: event.target.value,
      },
    };
    setTimesByDay(newTimesByDay);
  };

  const handleSave = async () => {
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([day, isChecked]) => isChecked)
      .map(([day]) => day);
  
    const id_user = localStorage.getItem('id_user');
  
    const data = selectedDaysArray.map((day) => ({
      day,
      start_time: timesByDay[day]?.from || '00:00',
      end_time: timesByDay[day]?.to || '00:15',
      id_card,
      id_user,
      status: 1,
    })).concat(
      Object.entries(selectedDays)
        .filter(([day, isChecked]) => !isChecked)
        .map(([day]) => ({
          day,
          start_time: '00:00',
          end_time: '00:15',
          id_card,
          id_user,
          status: 0,
        }))
    );
  
    console.log('Selected days and times:', data);
    console.log(id_card);
  
    try {
      const response = await fetch(`http://localhost:5000/api/bs_hours/${id_card}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        toast.success('Heures de travail ont été mis à jour');
        console.log('Data saved successfully');
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };
  


  // const handleSave = async () => {
  //   const selectedDaysArray = Object.entries(selectedDays)
  //     .filter(([day, isChecked]) => isChecked)
  //     .map(([day]) => day);

  //   const id_user = localStorage.getItem('id_user')

  //   const data = selectedDaysArray.map((day, isChecked) => ({
  //     day,
  //     start_time: timesByDay[day]?.from || '00:00',
  //     end_time: timesByDay[day]?.to || '00:15',
  //     id_card,
  //     id_user, 
  //     status: isChecked ? 1 : 0,
  //   }));

  //   console.log('Selected days . tiems:', data);
  //   console.log(id_card)
  //   try {
  //     const response = await fetch(` http://localhost:5000/api/bs_hours/${id_card} `, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       toast.success('Heures de travail ont été mis à jour')
  //       console.log('all is goof');
  //     } else {
  //       console.error('Error saving data:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error saving data:', error.message);
  //   }
  // };

  return (
    <div className="time-picker-container">
      <div className="time-picker-content">
        {Object.entries(selectedDays).map(([day, isChecked]) => (
          <div key={day} className="day-container">
            <label className="time-checkbox-label">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(day)}
                style={{ marginRight: '10px' }}
              />
              {/* {day.substring(0, 3)} */}
              {day}
            </label>
            <div className="time-range">
              <label className="time-label">
                de &nbsp;
                <select
                  className="time-select"
                  value={timesByDay[day]?.from || '00:00'}
                  onChange={(event) => handleFromTimeChange(day, event)}
                >
                  {generateTimeOptions().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
              <label className="time-label">
                à &nbsp;
                <select
                  className="time-select"
                  value={timesByDay[day]?.to || '00:15'}
                  onChange={(event) => handleToTimeChange(day, event)}
                >
                  {generateTimeOptions().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        ))}
        <button className='add-service-button' style={{ marginTop:'20px' }} onClick={handleSave}> Enregistrer </button>
      </div>
    </div>
  );
};

export default BsHours;
