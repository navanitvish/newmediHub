import React from 'react';

const HealthConditionCard = ({ title, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
      <div className="w-16 h-16 mr-2 flex items-center justify- border border-gray-300 rounded-md p-2 ">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      <span className="text-lg font-medium text-gray-800">{title}</span>
    </div>
  );
};

export default function HealthConditionsBrowser() {
  const conditions = [
    { title: "Diabetes Care", image: "https://images.apollo247.in/pub/media/healtharea/247images/d/i/diabetic_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Cardiac Care", image: "https://images.apollo247.in/pub/media/healtharea/247images/d/i/diabetic_1.png?tr=q-80,f-webp,w-100,dpr-2,c-at_max" },
    { title: "Stomach Care", image: "https://images.apollo247.in/pub/media/healtharea/247images/g/r/group-10_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Pain Relief", image: "https://images.apollo247.in/pub/media/healtharea/247images/p/a/pain_relief_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Liver Care", image: "https://images.apollo247.in/pub/media/healtharea/247images/l/i/liver_care_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Oral Care", image: "https://images.apollo247.in/pub/media/healtharea/247images/g/r/group-5_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Respiratory", image: "https://images.apollo247.in/pub/media/healtharea/247images/g/r/group-68_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Sexual Health", image: "https://images.apollo247.in/pub/media/healtharea/247images/s/e/sexual_health_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Elderly Care", image: "https://images.apollo247.in/pub/media/healtharea/247images/e/l/elderly_care_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" },
    { title: "Cold & Immunity", image: "https://images.apollo247.in/pub/media/healtharea/247images/i/m/immunity_1.png?tr=q-80,f-webp,w-100,dpr-1,c-at_max" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Health Conditions</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {conditions.map((condition) => (
          <HealthConditionCard 
            key={condition.id} 
            title={condition.title} 
            image={condition.image}
          />
        ))}
      </div>
    </div>
  );
}