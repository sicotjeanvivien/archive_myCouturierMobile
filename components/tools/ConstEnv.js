

export const ConstEnv = {
    // host: 'https://127.0.0.1:8000',
    host: 'https://mycouturierapi.sicot-development.fr',
    //USER
    signIn: '/login_check',
    signUp: '/userapp_create',
    passwordForgotten:'/passwordForgotten',
    updateUser: '/api/userapp/update',
    deleteAccount: '/api/userapp/delete',
    updatePassword: '/api/userapp/password',
    privateMode:'/api/userapp/privateMode',
    activeCouturier: '/api/userapp/activeCouturier',
    imageProfil : '/api/userapp/imageProfil',
    searchPrestation:'/api/userapp/searchPrestation',
    //UserPriceRetouching
    retouching: '/api/userPriceRetouching/',
    //Prestations
    prestation: '/api/prestation/',
    prestationDetail: '/api/prestation/detail/',
    //MangoPay
    createToken: '/api/mangopay/createToken',
    listCard: '/api/mangopay/listCard',
    payInCardDirect:'/api/mangopay/payInCardDirect',
    //Other
    cgv:'/cgv',
    api: '/api',
    commentary: '/api/commentary',
    message: '/api/message/',
    contactUsCreate: '/api/ContactUs/create',
    imageProfilDefault: '/assets/default-profile.svg',
};
