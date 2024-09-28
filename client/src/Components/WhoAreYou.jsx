import React from "react";
import { useNavigate } from "react-router-dom";

export default function WhoAreYou() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-gray-900 rounded-3xl shadow-lg p-8 text-center w-2/3 h-3/4">
        <h2 className="text-red-500 text-3xl mb-4 ">Prison Cell</h2>
        <p className="text-gray-400 text-lg mb-6">
          Select your role within the prison system:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4  h-3/4">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
            <div className="flex justify-center content-center items-center">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-1/2 h-1/2"
                onClick={() => {
                  navigate("/login", {
                    state: {
                      login: "user",
                      first: "name",
                      second: "relative's prisoner ID",
                    },
                  });
                }}
              >
                User
              </button>
            </div>
            <div className="flex justify-center content-center items-center">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-1/2 h-1/2"
                onClick={() => {
                  navigate("/login", {
                    state: {
                      login: "prisoner",
                      first: "name",
                      second: "prisoner's ID",
                    },
                  });
                }}
              >
                Prisoner
              </button>
            </div>
            <div className="flex justify-center content-center items-center">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-1/2 h-1/2"
                onClick={() => {
                  navigate("/login", {
                    state: {
                      login: "guard",
                      first: "email",
                      second: "password",
                    },
                  });
                }}
              >
                Guard
              </button>
            </div>
            <div className="flex justify-center content-center items-center">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-1/2 h-1/2"
                onClick={() => {
                  navigate("/login", {
                    state: {
                      login: "admin",
                      first: "email",
                      second: "password",
                    },
                  });
                }}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
