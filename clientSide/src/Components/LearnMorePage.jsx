import React from 'react';
import { motion } from 'framer-motion';

const LearnMorePage = () => {
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
          Learn More
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Understand our system and how it keeps you connected.
        </motion.p>
      </header>

      {/* Content Section */}
      <motion.div
        className="max-w-3xl px-8 md:px-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-300 mb-6">
          Our Police Management System is designed to facilitate communication and connection between families and their loved ones who are incarcerated. We understand the importance of staying connected, and our system aims to make this process as seamless as possible.
        </p>

        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          <li>Access to up-to-date prisoner information.</li>
          <li>Easy and efficient appointment booking for visits.</li>
          <li>Secure and reliable communication channels.</li>
          <li>User-friendly interface for a smooth experience.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-300 mb-6">
          Our system allows families to view detailed information about their loved ones, book appointments for visits, and stay informed about any updates or changes. We ensure that all data is securely handled and that the communication process is straightforward and hassle-free.
        </p>

        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-6">
          Our mission is to bridge the gap between families and their incarcerated loved ones. We believe that maintaining strong family ties is crucial for the well-being of both the prisoners and their families. By providing a reliable and efficient system, we aim to make a positive impact on their lives.
        </p>
      </motion.div>
    </div>
  );
};

export default LearnMorePage;
