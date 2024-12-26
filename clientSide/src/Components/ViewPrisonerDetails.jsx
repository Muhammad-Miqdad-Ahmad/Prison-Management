import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ViewPrisonerDetails = () => {
  const location = useLocation();
  const prisonerData = location.state?.visitorData;

  if (!prisonerData || !prisonerData.success || prisonerData.data.length === 0) {
    return (
      <div className="bg-[#333333] text-white flex flex-col items-center justify-start pt-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Prisoner Details Not Found</h1>
        <p className="text-lg text-gray-300">Please go back and try again.</p>
      </div>
    );
  }

  const prisoner = prisonerData.data[0];
  const personDetails = prisoner.person.replace('(', '').replace(')', '').split(',');
  const [firstName, lastName, dob, age, nationality, gender] = personDetails;

  return (
    <div className="bg-[#333333] text-white flex flex-col items-center justify-start pt-8 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-8">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Prisoner Details
        </motion.h1>
      </header>

      {/* Prisoner Details Section */}
      <motion.div
        className="max-w-3xl px-8 md:px-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{`${firstName.trim()} ${lastName.trim()}`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Basic Information</h3>
              <p className="text-gray-300 mb-2">Prisoner ID: {prisoner.prisoner_id}</p>
              <p className="text-gray-300 mb-2">Age: {age.trim()}</p>
              <p className="text-gray-300 mb-2">Gender: {gender.trim()}</p>
              <p className="text-gray-300 mb-2">Nationality: {nationality.trim()}</p>
              <p className="text-gray-300 mb-2">Date of Birth: {dob.trim()}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Legal Information</h3>
              <p className="text-gray-300 mb-2">Crime: {prisoner.crime}</p>
              <p className="text-gray-300 mb-2">Sentence: {prisoner.sentence}</p>
              <p className="text-gray-300 mb-2">Sentence Start Date: {new Date(prisoner.sentence_start_date).toLocaleDateString()}</p>
              <p className="text-gray-300 mb-2">Sentence End Date: {prisoner.sentence_end_date ? new Date(prisoner.sentence_end_date).toLocaleDateString() : 'N/A'}</p>
              <p className="text-gray-300 mb-2">Status: {prisoner.prisoner_status}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Visitor Information</h3>
              <p className="text-gray-300 mb-2">Visitor 1: {prisoner.visitor_1}</p>
              <p className="text-gray-300 mb-2">Visitor 2: {prisoner.visitor_2}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewPrisonerDetails;
