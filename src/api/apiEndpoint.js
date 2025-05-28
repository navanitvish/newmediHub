const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'api/v1/users/login',
    PROFILE: 'api/v1/users/profile',
  },
  USER: {
    GET_PROFILE: '/api/v1/users/profile/id',
    UPDATE_PROFILE: '/user/profile/update',
  },
  DASHBOARD: {
    GET_DASHBOARD: '/api/v1/dashboard',
  },
  BOOKINGS: {
    BOOK_APPOINTMENT: 'api/v1/bookings/book/appointment/receptionist',
    GET_APPOINTMENTS: '/api/v1/bookings/booking',
    GET_SINGLE: '/api/v1/bookings/booking',
    GET_PRESCRIPTION: '/api/v1/bookings/getPrescriptions',
    CANCEL_APPOINTMENT: 'api/v1/bookings/cancel-appointment',
    VITAL_BOOKING: '/api/v1/receptionist/vitelPateint',
    
  },
  DOCTORS: {
    GET_ALL_DOCTOR: '/api/v1/doctors',
    GET_SINGLE_DOCTOR: '/api/v1/doctors/getOne',
    Get_TOP_DOCTORS: '/api/v1/doctors/topRatedDoctor',
 
  },
  LAB: {
    GET_ALL: '/api/v1/users/lab',
    EDIT_LAB: '/api/v1/labs/update',
    ADD_LAB: '/api/v1/labs/add',
    LAB_REPORT: '/api/v1/labs/uploadReport/id',
    GET_TESTLIST: '/api/v1/labs/testList',
    GET_TEST: '/api/v1/labs/testList/id',
    GET_TOP_BOOKED: '/api/v1/labs/topMustLab',
  },

  MEDICINE: {
    GET_ALL_MEDICINES: '/api/v1/medicines/getAll',
    SINGLE_MEDICINE: '/api/v1/medicines/getOne',
    GET_TOP_BOOKED: '/api/v1/medicines/topMustMedicine',
      CATEGORY_BAR:'/api/v1/categories/categoryWithSubscategories',
  },

  BRAND: {
    GET_ALL_BRANDS: '/api/v1/brands/getAll',
    SINGLE_BRAND: '/api/v1/brands/getOne',
    GET_TOP_BOOKED: '/api/v1/brands/topMustBrand',
  },


  ADMIN: {
    GET_ALL_CATEGORIES: '/api/v1/categories/getAll',
    Single_CATEGORY: '/api/v1/categories/getOne',
    PAGINATIONS_CATEGORY: '/api/v1/categories/pagination?page=1&limit=20',

    GET_ALL_SUBCATEGORIES: '/api/v1/subCategories/getAll',
    SINGLE_SUBCATEGORY: '/api/v1/subCategories/getOne',
    PAGINATIONS_SUBCATEGORY: '/api/v1/subcategories/pagination',
  


   
    PAGINATIONS_BRAND: '/api/v1/brands/pagination?page=1&limit=10',

    GET_ALL_BANNERS: '/api/v1/banners/getAll',
    PAGINATIONS_BANNER: '/api/v1/banners/pagination?page=1&limit=10',
 

    GET_ALL_MEDICINES: '/api/v1/medicines/getAll',
    SINGLE_MEDICINE: '/api/v1/medicines/getOne',
    PAGINATIONS_MEDICINE: '/api/v1/medicines/pagination?page=1&limit=10',
    MEDICINES_SEARCH:'/api/v1/medicines/search',


    GET_ALL_OFFERS: '/api/v1/offers/getAll',
    PAGINATIONS_OFFER: '/api/v1/offers/pagination?page=1&limit=10',
  },
};

export default API_ENDPOINTS;