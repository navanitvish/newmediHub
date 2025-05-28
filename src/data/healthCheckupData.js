// All data for the health checkup application

// Data for health categories
export const healthCategories = [
  {
    id: 'full-body',
    name: 'Full Body Checkup',
    icon: '👤',
    color: 'bg-orange-100'
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    icon: '📊',
    color: 'bg-orange-100'
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    icon: '♀️',
    color: 'bg-orange-100'
  },
  {
    id: 'thyroid',
    name: 'Thyroid',
    icon: '🔬',
    color: 'bg-orange-100'
  },
  {
    id: 'vitamin',
    name: 'Vitamin',
    icon: '💊',
    color: 'bg-orange-100'
  },
  {
    id: 'blood-studies',
    name: 'Blood Studies',
    icon: '🩸',
    color: 'bg-orange-100'
  },
  {
    id: 'heart',
    name: 'Heart',
    icon: '❤️',
    color: 'bg-orange-100'
  },
  {
    id: 'kidney',
    name: 'Kidney',
    icon: '🫘',
    color: 'bg-orange-100'
  },
  {
    id: 'liver',
    name: 'Liver',
    icon: '🫓',
    color: 'bg-orange-100'
  },
  {
    id: 'hairfall',
    name: 'Hairfall',
    icon: '💇',
    color: 'bg-orange-100'
  },
  {
    id: 'fever',
    name: 'Fever',
    icon: '🤒',
    color: 'bg-orange-100'
  },
  {
    id: 'senior-citizen',
    name: 'Senior Citizen',
    icon: '👴',
    color: 'bg-orange-100'
  }
];

// Data for full body checkup packages 
 export const fullBodyPackages = [
  {
    id: 'apollo-prime-plus',
    name: 'Apollo Prime Plus Full Body Checkup',
    testsIncluded: 70,
    offer: 'BUY 2, GET EXTRA 15% OFF!',
    price: 2150,
    originalPrice: 5375,
    discount: '60% off'
  },
  {
    id: 'apollo-prime',
    name: 'Apollo Prime Full Body Checkup',
    testsIncluded: 67,
    offer: 'BUY 2, GET EXTRA 15% OFF!',
    price: 1828,
    originalPrice: 4570,
    discount: '60% off'
  },
  {
    id: 'apollo-regular',
    name: 'Apollo Regular Full Body Health Check',
    testsIncluded: 56,
    offer: 'BUY 2, GET EXTRA 15% OFF!',
    price: 1182,
    originalPrice: 2954,
    discount: '60% off'
  },
  {
    id: 'apollo-superior',
    name: 'Apollo Superior Full Body Checkup',
    testsIncluded: 88,
    offer: 'BUY 2 & GET ₹800 OFF',
    price: 3010,
    originalPrice: 7525,
    discount: '60% off'
  },
  {
    id: 'apollo-essential',
    name: 'Apollo Full Body Checkup - Essential',
    testsIncluded: 87,
    offer: 'BUY 2 & GET RS 1100 OFF',
    price: 4085,
    originalPrice: 10213,
    discount: '60% off'
  },
  {
    id: 'apollo-male-advance',
    name: 'Apollo Full Body Checkup Male - Advance',
    testsIncluded: 97,
    offer: 'BUY 2, GET EXTRA 15% OFF!',
    price: 5482,
    originalPrice: 13704,
    discount: '60% off'
  },
  {
    id: 'apollo-female-advance',
    name: 'Apollo Full Body Checkup Female - Advance',
    testsIncluded: 97,
    tags: ['TAX SAVER', "APOLLO'S CHOICE"],
    price: 5482,
    originalPrice: 13704,
    discount: '60% off'
  }
];


// Create package data for each category
export const categoryPackages = {
  'full-body': fullBodyPackages,
  'diabetes': createDummyPackages('Diabetes'),
  'womens-health': createDummyPackages('Women\'s Health'),
  'thyroid': createDummyPackages('Thyroid'),
  'vitamin': createDummyPackages('Vitamin'),
  'blood-studies': createDummyPackages('Blood Studies'),
  'heart': createDummyPackages('Heart'),
  'kidney': createDummyPackages('Kidney'),
  'liver': createDummyPackages('Liver'),
  'hairfall': createDummyPackages('Hairfall'),
  'fever': createDummyPackages('Fever'),
  'senior-citizen': createDummyPackages('Senior Citizen')
};

// Common must-have tests
export const mustHaveTests = [
  'CBC Test (Complete Blood Count)',
  'PPBS Test (Post-Prandial Blood Sugar)',
  'CRP Test (C - Reactive Protein)',
  'HIV Test',
  'Urine Routine Test',
  'Thyroid Profile (T3 T4 TSH) Test',
  'Lipid Profile Test',
  'LFT (Liver Function) Test',
  'Urine Culture Test'
];