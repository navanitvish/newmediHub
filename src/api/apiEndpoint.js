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
  },
  LAB: {
    GET_ALL: '/api/v1/users/lab',
    EDIT_LAB: '/api/v1/labs/update',
    ADD_LAB: '/api/v1/labs/add',
    LAB_REPORT: '/api/v1/labs/uploadReport/id',
    GET_TESTLIST: '/api/v1/labs/testList',
    GET_TEST: '/api/v1/labs/testList/id',
    
  },
  ADMIN: {
    GET_ALL_CATEGORIES: '/api/v1/categories/getAll',
    Single_CATEGORY: '/api/v1/categories/getOne',
    ADD_CATEGORY: '/api/v1/categories/add',
    DELETE_CATEGORY: '/api/v1/categories/delete',
    UPDATE_CATEGORY: 'api/v1/categories/update',
    PAGINATIONS_CATEGORY: '/api/v1/categories/pagination?page=1&limit=20',

    GET_ALL_SUBCATEGORIES: '/api/v1/subCategories/getAll',
    ADD_SUBCATEGORY: '/api/v1/subcategories/add',
    DELETE_SUBCATEGORY: '/api/v1/subcategories/delete',
    SINGLE_SUBCATEGORY: '/api/v1/subCategories/getOne',
    UPDATE_SUBCATEGORY: '/api/v1/subCategories/update', 
    PAGINATIONS_SUBCATEGORY: '/api/v1/subcategories/pagination',

    GET_ALL_BRANDS: '/api/v1/brands/getAll',
    ADD_BRAND: '/api/v1/brands/add',
    DELETE_BRAND: '/api/v1/brands/delete',
    SIGLE_BRAND: '/api/v1/brands/getOne',
    UPDATE_BRAND: '/api/v1/brands/update',

    PAGINATIONS_BRAND: '/api/v1/brands/pagination?page=1&limit=10',

    GET_ALL_BANNERS: '/api/v1/banners/getAll',
    ADD_BANNER: '/api/v1/banners/add',
    DELETE_BANNER: '/api/v1/banners/delete',
    SINGLE_BANNER: 'api/v1/banners/getOne',
    UPDATE_BANNER: '/api/v1/banners/update',
    PAGINATIONS_BANNER: '/api/v1/banners/pagination?page=1&limit=10',
 

    GET_ALL_MEDICINES: '/api/v1/medicines/getAll',
    ADD_MEDICINE: '/api/v1/medicines/add',
    DELETE_MEDICINE: '/api/v1/medicines/delete',
    SINGLE_MEDICINE: '/api/v1/medicines/getOne',
    UPDATE_MEDICINE: '/api/v1/medicines/update/id',
    PAGINATIONS_MEDICINE: '/api/v1/medicines/pagination?page=1&limit=10',


    GET_ALL_OFFERS: '/api/v1/offers/getAll',
    ADD_OFFER: '/api/v1/offers/add',
    DELETE_OFFER: '/api/v1/offers/delete',
    SINGLE_OFFER: '/api/v1/offers/getOne',
    UPDATE_OFFER: '/api/v1/offers/update',
    PAGINATIONS_OFFER: '/api/v1/offers/pagination?page=1&limit=10',
  },
};

export default API_ENDPOINTS;