// http://localhost:5000/api/v1/bookings/doctorBookings/679808d2b968bc06659315ac?date=2025-06-14
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, Filter, Search, Plus } from 'lucide-react';

const MyAppointments = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy appointment data
  const appointments = [
    {
      id: 1,
      title: "Annual Health Checkup",
      doctor: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      date: "2025-06-20",
      time: "10:30 AM",
      duration: "45 min",
      location: "City Medical Center",
      address: "123 Health St, Medical District",
      phone: "(555) 123-4567",
      status: "upcoming",
      type: "checkup",
      notes: "Bring previous test results"
    },
    {
      id: 2,
      title: "Dental Cleaning",
      doctor: "Dr. Michael Chen",
      specialty: "Dentistry",
      date: "2025-06-22",
      time: "2:00 PM",
      duration: "30 min",
      location: "Bright Smile Dental",
      address: "456 Dental Ave, Downtown",
      phone: "(555) 987-6543",
      status: "upcoming",
      type: "cleaning",
      notes: "Regular cleaning and examination"
    },
    {
      id: 3,
      title: "Eye Examination",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Ophthalmology",
      date: "2025-06-25",
      time: "11:15 AM",
      duration: "60 min",
      location: "Vision Care Clinic",
      address: "789 Eye Care Blvd, Uptown",
      phone: "(555) 456-7890",
      status: "upcoming",
      type: "examination",
      notes: "Bring current glasses"
    },
    {
      id: 4,
      title: "Physical Therapy",
      doctor: "Dr. James Wilson",
      specialty: "Physical Therapy",
      date: "2025-06-18",
      time: "3:30 PM",
      duration: "45 min",
      location: "Wellness Rehabilitation Center",
      address: "321 Recovery Rd, Westside",
      phone: "(555) 234-5678",
      status: "today",
      type: "therapy",
      notes: "Knee rehabilitation session"
    },
    {
      id: 5,
      title: "Cardiology Consultation",
      doctor: "Dr. Lisa Thompson",
      specialty: "Cardiology",
      date: "2025-06-15",
      time: "9:00 AM",
      duration: "30 min",
      location: "Heart & Vascular Institute",
      address: "654 Cardiac Way, Central City",
      phone: "(555) 345-6789",
      status: "completed",
      type: "consultation",
      notes: "Follow-up on stress test results"
    },
    {
      id: 6,
      title: "Dermatology Appointment",
      doctor: "Dr. Amanda Foster",
      specialty: "Dermatology",
      date: "2025-06-10",
      time: "1:45 PM",
      duration: "30 min",
      location: "Skin Health Clinic",
      address: "987 Derma Drive, Eastside",
      phone: "(555) 567-8901",
      status: "completed",
      type: "consultation",
      notes: "Skin cancer screening"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'today': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = selectedFilter === 'all' || appointment.status === selectedFilter;
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
            
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Appointments</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {appointments.filter(apt => apt.status === 'today').length}
              </div>
              <div className="text-orange-100">Today</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {appointments.filter(apt => apt.status === 'upcoming').length}
              </div>
              <div className="text-blue-100">Upcoming</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {appointments.filter(apt => apt.status === 'completed').length}
              </div>
              <div className="text-green-100">Completed</div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {appointment.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{appointment.doctor}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                          {appointment.specialty}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-purple-500" />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 lg:ml-6">
                  {appointment.status === 'upcoming' || appointment.status === 'today' ? (
                    <>
                      
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                        Reschedule
                      </button>
                      <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm transition-colors">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm transition-colors">
                        View Summary
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm transition-colors">
                        Book Follow-up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No appointments found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;