import { MapPin, Clock, Phone, AlertTriangle, ChevronRight } from "lucide-react";

export default function PharmaciesNearYou() {
  const pharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy:",
      location: "CONNAUGHT PLACE",
      distance: "0.3 km",
      address: "Shop No.-G-8, Marina Arcade, Connaught Place, New Delhi-110001",
      hours: "0:00 AM - 12:00 PM",
      status: "Open Now",
      phone: "8826992200"
    },
    {
      id: 2,
      name: "Apollo Pharmacy:",
      location: "GOLE MARKET",
      distance: "1.1 km",
      address: "Shop No.-121, Plot No.-I, Block-88, Lady Harding Road (Bangla Sahib Marg) Gole Market, New Delhi-01",
      hours: "7:00 AM - 10:00 PM",
      status: "Open Now",
      phone: "8826992201"
    }
  ];

  const handleGetDirections = (pharmacy) => {
    console.log(`Getting directions to ${pharmacy.name} ${pharmacy.location}`);
    // In a real app, this would integrate with maps API
  };

  const handleCallPharmacy = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleReportIssue = (pharmacy) => {
    console.log(`Reporting issue with ${pharmacy.name} ${pharmacy.location}`);
    // In a real app, this would open a report form
  };

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pharmacies Near You</h1>
        <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View More
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      {/* Pharmacy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {pharmacies.map((pharmacy) => (
          <div key={pharmacy.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header with name and distance */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {pharmacy.name}
                </h2>
                <p className="text-lg font-medium text-gray-700 mt-1">
                  {pharmacy.location}
                </p>
              </div>
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {pharmacy.distance}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-start mb-3">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {pharmacy.address}
              </p>
            </div>

            {/* Hours and Status */}
            <div className="flex items-center mb-4">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 mr-3">
                {pharmacy.hours}
              </span>
              <span className="text-sm font-medium text-green-600">
                {pharmacy.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-3">
              <button
                onClick={() => handleGetDirections(pharmacy)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get Directions
              </button>
              <button
                onClick={() => handleCallPharmacy(pharmacy.phone)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <Phone className="h-4 w-4 mr-1" />
                {pharmacy.phone}
              </button>
            </div>

            {/* Report Issue */}
            <button
              onClick={() => handleReportIssue(pharmacy)}
              className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Report an issue with this pharmacy
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {/* <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Load More Pharmacies
        </button>
      </div> */}
    </div>
  );
}