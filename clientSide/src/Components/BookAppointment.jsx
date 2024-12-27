import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const visitorId = location.state?.cnic;
  const [prisoners, setPrisoners] = useState([]);
  const [visitingSlots, setVisitingSlots] = useState([]);
  const [selectedPrisoner, setSelectedPrisoner] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch prisoners, visiting slots, and appointments from the backend
    const fetchData = async () => {
      try {
        const prisonersResponse = await axios.get(`http://localhost:9000/visitor/getPrisonerData?visitorId=${visitorId}`);
        const slotsResponse = await axios.get('http://localhost:9000/visitor/visitingSlots');
        const appointmentsResponse = await axios.get(`http://localhost:9000/visitor/appointments?visitorId=${visitorId}`);

        // Parse the person string for prisoners
        const parsedPrisoners = prisonersResponse.data.map(prisoner => {
          const personString = prisoner.person.replace('(', '').replace(')', '');
          const [firstName, lastName, dob, age, nationality, gender] = personString.split(',');
          return {
            ...prisoner,
            person: {
              first_name: firstName,
              last_name: lastName,
              dob,
              age,
              nationality,
              gender
            }
          };
        });

        // Parse the person string for appointments
        const parsedAppointments = appointmentsResponse.data.map(appointment => {
          const personString = appointment.person.replace('(', '').replace(')', '');
          const [firstName, lastName, dob, age, nationality, gender] = personString.split(',');
          return {
            ...appointment,
            person: {
              first_name: firstName,
              last_name: lastName,
              dob,
              age,
              nationality,
              gender
            }
          };
        });

        setPrisoners(parsedPrisoners);
        setVisitingSlots(slotsResponse.data);
        setAppointments(parsedAppointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [visitorId]);

  const handleBookAppointment = async () => {
    if (!selectedPrisoner || !selectedSlot) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/visitor/bookAppointment', {
        prisoner_id: selectedPrisoner,
        slot_id: selectedSlot,
        visitor_id: visitorId,
      });

      if (response.data.success) {
        alert('Appointment booked successfully!');
        navigate('/');
      } else {
        setError(response.data.message || 'Failed to book appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('An error occurred while booking the appointment.');
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-[#333333] text-white flex flex-col items-center justify-start pt-8 min-h-screen">
      <header className="text-center mb-8">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Book an Appointment
        </motion.h1>
      </header>

      <motion.div
        className="max-w-3xl px-8 md:px-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Select Prisoner</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPrisoner}
              onChange={(e) => setSelectedPrisoner(e.target.value)}
            >
              <option value="">Select a prisoner</option>
              {prisoners.map((prisoner) => (
                <option key={prisoner.prisoner_id} value={prisoner.prisoner_id}>
                  {`${prisoner.person.first_name} ${prisoner.person.last_name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Select Visiting Slot</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="">Select a visiting slot</option>
              {visitingSlots.map((slot) => (
                <option key={slot.slot_id} value={slot.slot_id}>
                  {`${slot.day_of_week} - ${slot.start_time} to ${slot.end_time} - Capacity: ${slot.capacity}`}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </div>

        {/* Display Existing Appointments */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Your Appointments</h2>
          {appointments.length > 0 ? (
            <ul className="list-disc list-inside text-gray-300">
              {appointments.map((appointment) => (
                <li key={appointment.reservation_id} className="mb-2">
                  <strong>Prisoner:</strong> {`${appointment.person.first_name} ${appointment.person.last_name}`}<br />
                  <strong>Slot Time:</strong> {appointment.slot_time}<br />
                  <strong>Visit Date:</strong> {new Date(appointment.visit_date).toLocaleDateString()}<br />
                  <strong>Reservation Time:</strong> {formatTime(appointment.reservation_time)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No appointments found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BookAppointment;
