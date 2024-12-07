"use client";
import React, { useState } from "react";

// import { Button } from "./ui/button";

function App() {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div>
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-h-[80vh] w-[90%] max-w-4xl overflow-y-auto bg-white text-black p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
              Features of the Website
            </h1>
            <hr />
            <ul className="list-disc list-inside mt-4 text-gray-600 ">
              <li>
                Frontend Development
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Designed and implemented an intuitive user interface for
                    registering, logging in, and booking doctor appointments.
                  </li>
                  <li>
                    Developed responsive design features using React to enhance
                    the user experience.
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                Backend Development
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Built robust APIs for authentication, appointment
                    scheduling, and doctor management using Node.js, Express,
                    JWT Authentication, Bcrypt, Cloudinary, Cors, Multer
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                Database Management
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Designed and managed a MongoDB database to store user data,
                    appointments, and doctor profiles.
                  </li>
                  <li>
                    Optimized database queries for real-time scheduling and
                    filtering functionalities.
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                Payment Integration
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Integrated Stripe for secure payment processing to support
                    seamless transactions.
                  </li>
                  <li>
                    Implemented payment confirmation and invoice generation
                    features.
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                Search and Filtering
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Added search functionality to allow users to find doctors by
                    specialization and availability.
                  </li>
                  <li>
                    Improved product discovery with advanced filtering options
                    based on categories.
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                User Authentication
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Developed secure login and registration workflows using JWT
                    for user authentication.
                  </li>
                  <li>Enabled role-based access for users and doctors.</li>
                </ul>
              </li>
            </ul>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                Real-Time Features
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Streamlined the appointment booking process with real-time
                    scheduling and availability tracking.
                  </li>
                 
                </ul>
              </li>
            </ul>

            <div className="flex items-center justify-center">
              <button
                className="btn mt-4 rounded-md"
                onClick={() => setShowNotification(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
