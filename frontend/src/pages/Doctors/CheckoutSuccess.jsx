import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='bg-gray-100'>
        <div className="bg-white p-6 md:mx-auto">
        <svg className='text-green-600 w-16 h-16 mx-auto my-6' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 50 50" xmlSpace="preserve">
       <circle
                style={{
                    fill: '#25AE88'
                }}
                cx="25"
                cy="25"
                r="25"
            />

        <polyline
                style={{
                    fill: 'none',
                    stroke: '#FFFFFF',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeMiterlimit: 10
                }}
                points="38,15 22,33 12,25"
            />

        </svg>
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
            </h3>
            <p className="text-gray-600 mt-2">
                Thank you for completing your secure online payment.
            </p>
            <p>Have a great day!</p>
            <div className="py-10 text-center">
            <Link to={"/home"} className='px-12 bg-[#25ae88] text-white py-3 font-semibold'>
            Go Back To Home Page
            </Link>
            </div>
        </div>

        </div>
      
    </div>
  )
}

export default CheckoutSuccess
