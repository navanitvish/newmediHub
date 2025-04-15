//File: src/data/testData.js
export const healthChecks = [
  { id: 1, name: 'Full Body Checkup', icon: '👤' },
  { id: 2, name: 'Diabetes', icon: '💉' },
  { id: 3, name: 'Women\'s Health', icon: '👩' },
  { id: 4, name: 'Thyroid', icon: '🦋' },
  { id: 5, name: 'Vitamin', icon: '💊' },
  { id: 6, name: 'Blood Studies', icon: '🩸' },
  { id: 7, name: 'Heart', icon: '❤️' },
  { id: 8, name: 'Kidney', icon: '🫘' },
  { id: 9, name: 'Liver', icon: '🫁' },
  { id: 10, name: 'Hairfall', icon: '💇' },
  { id: 11, name: 'Fever', icon: '🤒' },
  { id: 12, name: 'Senior Citizen', icon: '👵' },
];

export const topBookedTests = [
  { 
    id: 1, 
    name: 'CBC Test (Complete Blood Count)', 
    icon: '🔬',
    testsIncluded: 30,
    price: 424,
    originalPrice: 565,
    discount: 25,
    memberPrice: 339
  },
  { 
    id: 2, 
    name: 'HbA1c Test (Hemoglobin A1c)', 
    icon: '📊',
    testsIncluded: 3,
    price: 550,
    originalPrice: 733,
    discount: 25,
    memberPrice: 440
  },
  { 
    id: 3, 
    name: 'FBS (Fasting Blood Sugar) Test', 
    icon: '📈',
    testsIncluded: 1,
    price: 100,
    originalPrice: 133,
    discount: 25,
    memberPrice: 80
  },
  { 
    id: 4, 
    name: 'Lipid Profile Test', 
    icon: '🫀',
    testsIncluded: 8,
    price: 962,
    originalPrice: 1283,
    discount: 25,
    memberPrice: 770
  },
  { 
    id: 5, 
    name: 'Liver Function Test', 
    icon: '🫁',
    testsIncluded: 12,
    price: 750,
    originalPrice: 1000,
    discount: 25,
    memberPrice: 600
  },
  { 
    id: 6, 
    name: 'Kidney Function Test', 
    icon: '🫘',
    testsIncluded: 10,
    price: 850,
    originalPrice: 1133,
    discount: 25,
    memberPrice: 680
  }
];

export const popularPackages = [
  {
    id: 1,
    name: 'Apollo Prime Health Plan',
    description: '68 Tests: GLUCOSE, FASTING...',
    tag: 'TOP SELLING',
    price: 1700,
    originalPrice: 2833,
    discount: 40,
    icon: '👤',
    reportHours: 10
  },
  {
    id: 2,
    name: 'Apollo Fever Panel Complete',
    description: '58 Tests: ERYTHROCYTE SE...',
    price: 2177,
    originalPrice: 2903,
    discount: 25,
    memberPrice: 1742,
    icon: '🤒',
    reportHours: 36
  },
  {
    id: 3,
    name: 'Apollo Thyroid Assessment - Basic',
    description: '33 Tests: Thyroxine (T4, Total...',
    tag: 'TOP SELLING',
    price: 543,
    originalPrice: 724,
    discount: 25,
    memberPrice: 434,
    icon: '🦋',
    reportHours: 10
  },
  {
    id: 4,
    name: 'Apollo Vitamin Check - Basic',
    description: '3 Tests: Calcium, Serum, VITA...',
    tag: 'TOP SELLING VALUE FOR...',
    price: 1814,
    originalPrice: 2419,
    discount: 25,
    memberPrice: 1451,
    icon: '💊',
    reportHours: 10
  },
  {
    id: 5,
    name: 'Apollo Complete Health Checkup',
    description: '87 Tests: Full Body Assessment...',
    tag: 'BEST SELLER',
    price: 3200,
    originalPrice: 4000,
    discount: 20,
    memberPrice: 2560,
    icon: '🏥',
    reportHours: 24
  },
  {
    id: 6,
    name: 'Apollo Senior Citizen Package',
    description: '72 Tests: Comprehensive Senior Care...',
    tag: 'RECOMMENDED',
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    memberPrice: 2240,
    icon: '👵',
    reportHours: 24
  }
];