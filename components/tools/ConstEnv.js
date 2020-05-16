

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
    confirmCode: '/api/prestation/congirmCode',
    prestationDetail: '/api/prestation/detail/',
    //MangoPay
    createToken: '/api/mangopay/createToken',
    listCard: '/api/mangopay/listCard',
    payInCardDirect:'/api/mangopay/payInCardDirect',
    mangopayWallet:'/api/mangopay/wallet',
    bankAccount:'/api/mangopay/bankAccounts',
    payOutBankWire: '/api/mangopay/payOutBankWire',
    //Other
    cgv:'/cgv',
    api: '/api',
    commentary: '/api/commentary',
    message: '/api/message/',
    contactUsCreate: '/api/contactUs/create',
    imageProfilDefault: '/assets/default-profile.svg',
};
