import React, { useState } from 'react';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, people }),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Booking failed, please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </label>
      <label>
        Number of People:
        <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} required />
      </label>
      <button type="submit">Book Table</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default BookingForm;
