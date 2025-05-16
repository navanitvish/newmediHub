import { useState } from 'react';
import { ChevronRight, MessageCircle, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApolloHealthcareNav() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuCategories = [
    {
      id: 'apollo',
      title: 'SmartMedihub Products',
      submenu: [
        {
          title: 'Personal Care ',
          items: [
            { name: 'Skin Care', featured: true },
            { name: 'Oral Care', featured: true },
            { name: 'Adult Diapers', featured: false },
            { name: 'Sanitary Pads', featured: false },
            { name: 'Sexual Wellness', featured: false },
            { name: 'Pain Relief', featured: false },
            { name: 'Mens Grooming', featured: false },
          ]
        },

        {
          title: 'Body Care ',
          items: [
            { name: 'Diapers & Wipes', featured: false },
            { name: 'Skin & Oral Care', featured: false },
            { name: 'Feeding & Nursing', featured: false },
            { name: 'First Aid', featured: false },
          
          
          ]
        },
        {
          title: ' Otc Care ',
          items: [
            { name: 'Cold & Cough', featured: false },
            { name: 'Pain Relief', featured: false },
            { name: 'Eye & Ear Care', featured: false },
            { name: 'Indigestion', featured: false },
            { name: 'Apollo Hospitals', featured: false }
          ]
        },
        {
          title: 'Vitamins & Supplements ',
          items: [
            { name: 'Vitamins', featured: false },
            { name: 'Supplements', featured: false },
            { name: 'Juices', featured: false },
            { name: 'Nutrition Powders', featured: false },  
            { name: 'Honey', featured: false }
          ]
        },
        {
          title: 'Food & Drink ',
          items: [
            { name: 'Juices', featured: false },
            { name: 'ORS Drinks', featured: false },
            { name: 'Multi Grain Food', featured: true },
          ]
        }
        
      ]
    },
    {
      id: 'baby',
      title: 'Baby Care',
      submenu: [
        {
          title: 'Baby Care',
          items: [
            { name: 'Diapers & Wipes', featured: true },
            { name: 'Skin & Oral Care', featured: true },
            { name: 'Feeding & Nursing', featured: true },
            { name: 'Baby Food', featured: false },
            { name: 'Bath & Shampoo', featured: false },
            { name: 'Baby Accessories', featured: false }
          ]
        }
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutritional Drinks & Supplements',
      submenu: [
        {
          title: 'Nutritional Drinks',
          items: [
            { name: 'Protein Supplements', featured: true },
            { name: 'Energy Drinks', featured: true },
            { name: 'Health Drinks', featured: false },
            { name: 'Weight Management', featured: false },
            { name: 'Diabetic Supplements', featured: false },
            { name: 'Vitamin Drinks', featured: false }
          ]
        }
      ]
    },
    {
      id: 'women',
      title: 'Women Care',
      submenu: [
        {
          title: 'Women Care',
          items: [
            { name: 'Feminine Hygiene', featured: true },
            { name: 'Pregnancy Care', featured: true },
            { name: 'Menstrual Health', featured: false },
            { name: 'Womens Wellness', featured: false },
            { name: 'Cosmetics & Skincare', featured: false },
            { name: 'Hair Care Products', featured: false }
          ]
        }
      ]
    },
    {
      id: 'personal',
      title: 'Personal Care',
      submenu: [
        {
          title: 'Personal Care',
          items: [
            { name: 'Skin Care', featured: true },
            { name: 'Oral Care', featured: true },
            { name: 'Adult Diapers', featured: false },
            { name: 'Sanitary Pads', featured: false },
            { name: 'Sexual Wellness', featured: false },
            { name: 'Mens Grooming', featured: true }
          ]
        }
      ]
    },
    {
      id: 'ayurveda',
      title: 'Ayurveda',
      submenu: [
        {
          title: ' Health Concerns',
          items: [
            { name: 'Cold & Cough', featured: true },
            { name: 'Diabetic Care', featured: true },
            { name: 'Herbal Teas', featured: false },
            { name: 'Ayurvedic Oils', featured: false },
            { name: 'Chyawanprash', featured: false },
            { name: 'Natural Remedies', featured: false }
          ]
        },
        {
          title: 'Herbs',
          items: [
            { name: 'Amla', featured: true },
            { name: 'Abdomen Care', featured: true },
            { name: 'Tulsi', featured: false },
            { name: 'Ashwagandha ', featured: false },
            { name: 'Giloy', featured: false },
            { name: 'Triphala', featured: false },
            { name: 'Shilajit', featured: false },      

          ]
        },

        {
          title: 'Herbs',
          items: [
            { name: 'Haldi', featured: true },
            { name: 'Herbal Juices ', featured: true },
            { name: 'Honey', featured: false },
          

          ]
        }


      ]
    },
    {
      id: 'devices',
      title: 'Health Devices',
      submenu: [
        {
         title: 'Health Devices',
          items: [
            { name: 'BP Monitors', featured: true },
            { name: 'Glucose Meters', featured: true },
            { name: 'Thermometers', featured: false },
            { name: 'Oximeters', featured: false },
            { name: 'Nebulizers', featured: false },
            { name: 'Weighing Scales', featured: false }
          ]
        },
        {
          title: 'card Devices',
          items: [
            { name: 'BP Monitors', featured: true },
            { name: 'Glucose Meters', featured: true },
            { name: 'Thermometers', featured: false },
            { name: 'Oximeters', featured: false },
            { name: 'Nebulizers', featured: false },
            { name: 'Weighing Scales', featured: false }
          ]
        }
      ]
    },
    {
      id: 'home',
      title: 'Home Essentials',
      submenu: [
        {
          title: 'Home Essentials',
          items: [
            { name: 'Disinfectants', featured: true },
            { name: 'Hand Sanitizers', featured: true },
            { name: 'Face Masks', featured: false },
            { name: 'Cleaning Products', featured: false },
            { name: 'Home Medical Kits', featured: false },
            { name: 'Mosquito Repellents', featured: false }
          ]
        },
        
      ]
    },
    {
      id: 'health',
      title: 'Health Condition',
      submenu: [
        {
          title: 'Health Condition',
          items: [
            { name: 'Diabetes Care', featured: true },
            { name: 'Cardiac Care', featured: true },
            { name: 'Respiratory Health', featured: false },
            { name: 'Joint & Muscle Care', featured: false },
            { name: 'Digestive Health', featured: false },
            { name: 'Immunity Boosters', featured: false }
          ]
        }
      ]
    }
  ];

 

  return (
    <div className="flex flex-col w-full bg-white font-sans">
      {/* Top Navigation */}
      <div className="flex w-full bg-blue-600 text-black shadow-md fixed  z-10">
        <div className="max-w-7xl mx-auto flex">
          {menuCategories.map((category) => (
            <div 
              key={category.id}
              className="px-4 py-3 cursor-pointer hover:bg-blue-800 transition-colors relative group"
              onMouseEnter={() => setActiveDropdown(category.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to={`/${category.id}`} className="whitespace-nowrap text-white no-underline hover:text-white font-medium">
                {category.title}
              </Link>
              
              {/* Dropdown for all categories */}
              {activeDropdown === category.id && (
                <div className="absolute left-0 top-full mt-px z-50 bg-white shadow-xl rounded-b-lg flex w-max max-w-6xl border-t-2 border-blue-600">
                  {category.submenu.map((section, idx) => (
                    <div key={idx} className="p-6 min-w-48">
                      <h3 className="font-bold text-blue-700 text-lg mb-4 pb-2 border-b border-gray-200">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i}>
                            <Link 
                              to={`/${category.id}/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                              className={`hover:text-blue-700 transition-colors ${
                                item.featured ? 'text-gray-800 font-medium' : 'text-gray-600'
                              }`}
                            >
                              {item.name}
                              {item.featured && 
                                <span className="inline-block ml-2 text-xs text-white bg-blue-600 px-1.5 py-0.5 rounded">Popular</span>
                              }
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                
                </div>
              )}
            </div> 
          ))}
        </div>
      </div>
      
     
    </div>
  );
};