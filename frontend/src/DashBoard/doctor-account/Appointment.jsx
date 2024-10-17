import React from 'react'
import { formData } from '../../utils/fromData'

const Appointment = ({Appointment}) => {
    
  return (
    <table className='w-full text-left text-sm text-gray-500 '>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope='col' className='px-6 py-3' >Name</th>
          <th scope='col' className='px-6 py-3' >Gender</th>
          <th scope='col' className='px-6 py-3' >Payment</th>
          <th scope='col' className='px-6 py-3' >Price</th>
          <th scope='col' className='px-6 py-3' >Booked on</th>
        </tr>
      </thead>

      <tbody>
      {Appointment.map(appointment => (
          <tr key={appointment._id}>
            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
              <img src={appointment.user.photo} alt="" className="w-10 h-10 rounded-full" />
              <div className="pl-3">
                <div className="text-base font-semibold">{appointment.user.name}</div>
                <div className="text-normal text-gray-500">{appointment.user.email}</div>
              </div>
            </td>
            <td className="px-6 py-4">{appointment.user.gender}</td>
            <td className="px-6 py-4">
              {appointment.isPaid ? (
                <div className='flex items-center'>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Paid
                </div>
              ) : (
                <div className='flex items-center'>
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  Unpaid
                </div>
              )}
            </td>
            <td className="px-6 py-4">{appointment.ticketPrice}</td>
            <td className="px-6 py-4">{formData(appointment.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Appointment
