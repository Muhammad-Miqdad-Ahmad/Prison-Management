import React from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const location = useLocation();
  const visitorData = location.state?.visitorData;
  const cnic = location.state?.cnic;
  const navigate = useNavigate();
  // Define actions for each feature
  const handleViewPrisonerDetails = () => {
    alert('Navigating to View Prisoner Details...');
    navigate('/view-prisoner-details', { state: { visitorData } });
  };

  const handleBookAppointment = () => {
    alert('Navigating to Book Appointment...');
    navigate('/book-appointment', { state: { cnic } });
  };

  const handleLearnMore = () => {
    alert('Displaying More Information...');
    navigate('/learn-more');
  };

  return (
    <div className=" bg-[#333333] text-white flex flex-col items-center justify-start pt-8">
      {/* Header Section */}
      <header className="text-center mb-8">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Police Management System
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Helping families stay connected with their loved ones.
        </motion.p>
      </header>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-20 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, staggerChildren: 0.2 },
          },
        }}
      >
        {/* Feature 1 */}
        <motion.div
          className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleViewPrisonerDetails}
        >
          <FaUserFriends className="text-blue-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">View Prisoner Details</h3>
          <p className="text-gray-400">
            Access accurate and updated prisoner information with ease.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleBookAppointment}
        >
          <FaCalendarAlt className="text-green-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Book Appointments</h3>
          <p className="text-gray-400">
            Schedule visits quickly and efficiently for approved visitors.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleLearnMore}
        >
          <FaInfoCircle className="text-yellow-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Learn More</h3>
          <p className="text-gray-400">
            Understand our system and how it keeps you connected.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
