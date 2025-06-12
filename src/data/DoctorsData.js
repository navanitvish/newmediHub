// Complete doctors data organized by specialty
export const doctorsBySpecialty = {
  "general-physician": [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialtyId: 1,
      specialtySlug: "general-physician",
      specialty: "General Physician",
      experience: 15,
      rating: 4.8,
      reviews: 1250,
      consultationFee: 500,
      location: "Apollo Hospital, Delhi",
      availability: "Available Today",
      nextSlot: "2:30 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Internal Medicine"],
      languages: ["English", "Hindi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Diabetes, Hypertension, General Health",
      about: "Dr. Sarah Johnson is a highly experienced general physician with over 15 years of practice. She specializes in preventive care and chronic disease management.",
      education: [
        "MBBS - All India Institute of Medical Sciences, Delhi (2008)",
        "MD Internal Medicine - AIIMS, Delhi (2012)"
      ],
      awards: ["Best Doctor Award 2023", "Excellence in Patient Care 2022"]
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialtyId: 1,
      specialtySlug: "general-physician",
      specialty: "General Physician",
      experience: 12,
      rating: 4.6,
      reviews: 980,
      consultationFee: 400,
      location: "Max Hospital, Gurgaon",
      availability: "Available Tomorrow",
      nextSlot: "10:00 AM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD General Medicine"],
      languages: ["English", "Hindi", "Punjabi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Preventive Medicine, Family Health",
      about: "Dr. Rajesh Kumar is a dedicated family physician with 12 years of experience in comprehensive healthcare. He focuses on preventive medicine and patient education.",
      education: [
        "MBBS - Government Medical College, Chandigarh (2010)",
        "MD General Medicine - PGIMER, Chandigarh (2014)"
      ],
      awards: ["Community Health Excellence Award 2022", "Patient Choice Award 2023"]
    }
  ],
  
  "cardiology": [
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialtyId: 2,
      specialtySlug: "cardiology",
      specialty: "Cardiology",
      experience: 18,
      rating: 4.9,
      reviews: 1560,
      consultationFee: 800,
      location: "Fortis Hospital, Mumbai",
      availability: "Available Today",
      nextSlot: "4:00 PM",
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Cardiology", "DM Cardiology"],
      languages: ["English", "Hindi", "Marathi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Heart Attack, Bypass Surgery, Angioplasty",
      about: "Dr. Priya Sharma is a renowned cardiologist with 18 years of expertise in interventional cardiology. She has performed over 2000 cardiac procedures with excellent outcomes.",
      education: [
        "MBBS - King Edward Memorial Hospital, Mumbai (2004)",
        "MD Cardiology - Seth GS Medical College, Mumbai (2008)",
        "DM Cardiology - All India Institute of Medical Sciences, Delhi (2011)"
      ],
      awards: ["Cardiac Excellence Award 2023", "Best Interventional Cardiologist 2022", "Medical Innovation Award 2021"]
    },
    {
      id: 8,
      name: "Dr. Karthik Reddy",
      specialtyId: 2,
      specialtySlug: "cardiology",
      specialty: "Cardiology",
      experience: 13,
      rating: 4.5,
      reviews: 678,
      consultationFee: 750,
      location: "Apollo Hospital, Chennai",
      availability: "Available Tomorrow",
      nextSlot: "11:00 AM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Cardiology"],
      languages: ["English", "Hindi", "Tamil"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Interventional Cardiology, Pacemaker",
      about: "Dr. Karthik Reddy is a skilled interventional cardiologist specializing in minimally invasive cardiac procedures. He has extensive experience in pacemaker implantation and cardiac catheterization.",
      education: [
        "MBBS - Stanley Medical College, Chennai (2009)",
        "MD Cardiology - Madras Medical College, Chennai (2013)"
      ],
      awards: ["Young Cardiologist Award 2022", "Innovation in Cardiac Care 2023"]
    }
  ],
  
  "neurology": [
    {
      id: 4,
      name: "Dr. Amit Patel",
      specialtyId: 3,
      specialtySlug: "neurology",
      specialty: "Neurology",
      experience: 20,
      rating: 4.7,
      reviews: 1340,
      consultationFee: 900,
      location: "AIIMS, Delhi",
      availability: "Available Today",
      nextSlot: "11:30 AM",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Neurology", "DM Neurology"],
      languages: ["English", "Hindi", "Gujarati"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Stroke, Epilepsy, Migraine, Parkinson's",
      about: "Dr. Amit Patel is a distinguished neurologist with two decades of experience in treating complex neurological disorders. He is particularly known for his expertise in stroke management and epilepsy treatment.",
      education: [
        "MBBS - B.J. Medical College, Ahmedabad (2002)",
        "MD Neurology - AIIMS, Delhi (2006)",
        "DM Neurology - NIMHANS, Bangalore (2009)"
      ],
      awards: ["Neurological Excellence Award 2023", "Best Stroke Specialist 2022", "Research Excellence Award 2021"]
    }
  ],
  
  "obstetrics-gynaecology": [
    {
      id: 5,
      name: "Dr. Meera Reddy",
      specialtyId: 4,
      specialtySlug: "obstetrics-gynaecology",
      specialty: "Obstetrics & Gynaecology",
      experience: 14,
      rating: 4.8,
      reviews: 1120,
      consultationFee: 600,
      location: "Apollo Hospital, Hyderabad",
      availability: "Available Tomorrow",
      nextSlot: "9:00 AM",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MS Obstetrics & Gynaecology"],
      languages: ["English", "Hindi", "Telugu"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "High-risk Pregnancy, Fertility, PCOS",
      about: "Dr. Meera Reddy is a compassionate obstetrician and gynecologist with 14 years of experience in women's healthcare. She specializes in high-risk pregnancies and reproductive health.",
      education: [
        "MBBS - Osmania Medical College, Hyderabad (2008)",
        "MS Obstetrics & Gynaecology - Gandhi Medical College, Hyderabad (2012)"
      ],
      awards: ["Women's Health Champion 2023", "Best Obstetrician Award 2022"]
    },
    {
      id: 7,
      name: "Dr. Anjali Gupta",
      specialtyId: 4,
      specialtySlug: "obstetrics-gynaecology",
      specialty: "Obstetrics & Gynaecology",
      experience: 11,
      rating: 4.7,
      reviews: 756,
      consultationFee: 550,
      location: "Medanta Hospital, Gurgaon",
      availability: "Available Today",
      nextSlot: "1:00 PM",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MS Obstetrics & Gynaecology"],
      languages: ["English", "Hindi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Laparoscopic Surgery, Menstrual Disorders",
      about: "Dr. Anjali Gupta is a skilled gynecologist specializing in minimally invasive laparoscopic procedures. She has extensive experience in treating menstrual disorders and reproductive health issues.",
      education: [
        "MBBS - Lady Hardinge Medical College, Delhi (2011)",
        "MS Obstetrics & Gynaecology - AIIMS, Delhi (2015)"
      ],
      awards: ["Laparoscopic Excellence Award 2023", "Young Gynecologist Award 2022"]
    }
  ],
  
  "orthopaedics": [
    {
      id: 6,
      name: "Dr. Vikram Singh",
      specialtyId: 5,
      specialtySlug: "orthopaedics",
      specialty: "Orthopaedics",
      experience: 16,
      rating: 4.6,
      reviews: 890,
      consultationFee: 700,
      location: "Max Hospital, Delhi",
      availability: "Available Today",
      nextSlot: "3:15 PM",
      image: "https://images.unsplash.com/photo-1601648764658-cf37e8c17ab1?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MS Orthopaedics"],
      languages: ["English", "Hindi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Joint Replacement, Sports Injury, Spine",
      about: "Dr. Vikram Singh is an accomplished orthopedic surgeon with 16 years of experience in joint replacement and sports medicine. He has performed over 1500 successful joint replacement surgeries.",
      education: [
        "MBBS - Maulana Azad Medical College, Delhi (2006)",
        "MS Orthopaedics - AIIMS, Delhi (2010)"
      ],
      awards: ["Excellence in Joint Replacement 2023", "Sports Medicine Award 2022", "Best Orthopedic Surgeon 2021"]
    }
  ],
  
  "urology": [
    {
      id: 9,
      name: "Dr. Suresh Nair",
      specialtyId: 6,
      specialtySlug: "urology",
      specialty: "Urology",
      experience: 17,
      rating: 4.7,
      reviews: 945,
      consultationFee: 650,
      location: "Kokilaben Hospital, Mumbai",
      availability: "Available Today",
      nextSlot: "2:00 PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MS Urology", "MCh Urology"],
      languages: ["English", "Hindi", "Malayalam"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Kidney Stones, Prostate Surgery, Urologic Cancer",
      about: "Dr. Suresh Nair is a renowned urologist with 17 years of expertise in minimally invasive urologic procedures. He specializes in robotic surgery and urologic oncology.",
      education: [
        "MBBS - Government Medical College, Kottayam (2005)",
        "MS Urology - Christian Medical College, Vellore (2009)",
        "MCh Urology - Postgraduate Institute, Chandigarh (2012)"
      ],
      awards: ["Excellence in Robotic Surgery 2023", "Best Urologist Award 2022"]
    }
  ],
  
  "gastroenterology": [
    {
      id: 10,
      name: "Dr. Ravi Agarwal",
      specialtyId: 7,
      specialtySlug: "gastroenterology",
      specialty: "Gastroenterology",
      experience: 19,
      rating: 4.8,
      reviews: 1180,
      consultationFee: 750,
      location: "Indraprastha Apollo, Delhi",
      availability: "Available Tomorrow",
      nextSlot: "10:30 AM",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Internal Medicine", "DM Gastroenterology"],
      languages: ["English", "Hindi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Liver Disease, Endoscopy, IBD",
      about: "Dr. Ravi Agarwal is a leading gastroenterologist with 19 years of experience in treating digestive disorders. He is particularly known for his expertise in liver diseases and therapeutic endoscopy.",
      education: [
        "MBBS - University College of Medical Sciences, Delhi (2003)",
        "MD Internal Medicine - AIIMS, Delhi (2007)",
        "DM Gastroenterology - AIIMS, Delhi (2010)"
      ],
      awards: ["Gastroenterology Excellence Award 2023", "Best Endoscopist 2022"]
    }
  ],
  
  "psychiatry": [
    {
      id: 11,
      name: "Dr. Kavita Sharma",
      specialtyId: 8,
      specialtySlug: "psychiatry",
      specialty: "Psychiatry",
      experience: 13,
      rating: 4.9,
      reviews: 867,
      consultationFee: 600,
      location: "Nimhans, Bangalore",
      availability: "Available Today",
      nextSlot: "5:00 PM",
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Psychiatry"],
      languages: ["English", "Hindi", "Kannada"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Depression, Anxiety, Bipolar Disorder",
      about: "Dr. Kavita Sharma is a compassionate psychiatrist with 13 years of experience in mental health care. She specializes in mood disorders and has helped thousands of patients achieve better mental wellness.",
      education: [
        "MBBS - Bangalore Medical College, Bangalore (2009)",
        "MD Psychiatry - NIMHANS, Bangalore (2013)"
      ],
      awards: ["Mental Health Advocate Award 2023", "Excellence in Patient Care 2022"]
    }
  ],
  
  "pulmonology": [
    {
      id: 12,
      name: "Dr. Ashok Gupta",
      specialtyId: 9,
      specialtySlug: "pulmonology",
      specialty: "Pulmonology",
      experience: 16,
      rating: 4.6,
      reviews: 723,
      consultationFee: 700,
      location: "Sir Ganga Ram Hospital, Delhi",
      availability: "Available Tomorrow",
      nextSlot: "12:00 PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      qualifications: ["MBBS", "MD Pulmonary Medicine"],
      languages: ["English", "Hindi"],
      consultationTypes: ["Video", "In-Person"],
      specialization: "Asthma, COPD, Sleep Disorders",
      about: "Dr. Ashok Gupta is an expert pulmonologist with 16 years of experience in respiratory medicine. He specializes in treating chronic lung diseases and sleep-related breathing disorders.",
      education: [
        "MBBS - Maulana Azad Medical College, Delhi (2006)",
        "MD Pulmonary Medicine - AIIMS, Delhi (2010)"
      ],
      awards: ["Respiratory Medicine Excellence 2023", "Best Pulmonologist 2022"]
    }
  ]
};

// Specialty mapping
export const specialties = [
  "General Physician", "Cardiology", "Neurology", "Obstetrics & Gynaecology", 
  "Orthopaedics", "Urology", "Gastroenterology", "Psychiatry", "Pulmonology", 
  "Endocrinology", "Nephrology", "Rheumatology"
];

// Map specialty names to slugs
export const specialtyToSlug = {
  "General Physician": "general-physician",
  "Cardiology": "cardiology",
  "Neurology": "neurology",
  "Obstetrics & Gynaecology": "obstetrics-gynaecology",
  "Orthopaedics": "orthopaedics",
  "Urology": "urology",
  "Gastroenterology": "gastroenterology",
  "Psychiatry": "psychiatry",
  "Pulmonology": "pulmonology"
};

// Flatten all doctors for searching
export const allDoctors = Object.values(doctorsBySpecialty).flat();