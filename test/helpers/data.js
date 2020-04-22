const registrationDS = {
  mobileNumber: Math.floor(Math.random() * 9000000000) + 1000000000, // generate random 10 number of mobile number
  password: 'pk91india',
  invalidMobile: Math.floor(Math.random() * 90000) + 300000, // generate random 6 number of invalid mobile number
  invalipassword: Math.random().toString(36).substring(10),
  invalidOTP: Math.floor(Math.random() * 900) + 3000, // generate random 4 number of invalid OTP
  invalidOTP1: Math.floor(Math.random() * 90000) + 300000, // generate random 6 number of invalid OTP
  validOTP: '998877',
  firstname: 'testFName',
  oneCharacterFLName: 'L',
  specialCharacterFLName: '4@#',
  lastname: 'testLName',
  email: 'test@yop.com',
  postalCode: 'SW100AB',
  inValidEmailadd1: 'tarpan',
  inValidEmailadd2: 'tarpan@gmail',
  inValidEmailadd3: '@gmail.com',
  inValidPostalCode: '67GE',
  inValidPostalCode1: Math.floor(Math.random() * 90000) + 300000,// generate random 6 number of invalid postal code
  buildingName: 'TestBuilding',
  cityName: 'TestCity',
  countryName: 'TestCountry',
  DOBMonth :'September'
}

const applycardDS = {
  mobileNo: '1236547890',//1122334455, 9876543210, 1236547890, 9632587410, 8585696958
  password: '123456',
  requiredDuration: 'two', //one,two,three
  requiredDurationios: 'twoMonthDuration',
}

const kycDS = {
  housingDetail: 'rent',   //rent or mortgage
  validMonthlyIncome: '70',
  invalidMonthlyIncome: '5',
  validMonthlyRentMortgage: '60',
  validNumberOfDependants: '3',
  invalidMonthlyRent: '4',
}

const loginDS1 = {
  countrySearchText: 'in',
  selectedCountryText: 'India',
  mobileNumberPlaceholder: '10 digit mobile number',
  passwordPlaceholder: 'Password',
  mobileNumber: '9323824722',
  password: '1abc23456d',
  invalidMobileNumber: Math.floor(Math.random() * 9000000) + 1000000,
  validRandomMobileNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
  expectedMobileErrormsg: 'Not a valid phone number.',
  expectedResetMobileErrormsg: 'Please enter valid mobile number',
  expectedPasswordErrormsg: 'Should be 6 characters or more',
  resetExpectedPasswordErrormsg: 'GraphQL error: Password Reset Code Mismatch.',
  otpText: '998877',
  newPasswordText: '123456',
  newPasswordConfirmText: '123456',
}

const giftcardDS = {
  InviteType: 'whatsapp',  // whatsapp, sms
  firstName: 'testName',
  registredMobileNumber: '1234567890',
  password: '123456',
  invalidName1: '....',
  invalidName2: 'T',
  invalidMobileNumber1: '...',
  invalidMobileNumber2: '9933333',
  mobileNo: '9632587410'//1122334455, 9876543210

}

const archivedCardDS = {
  mobileNumberforArchived: '1236547890'//'9632587410',//9998887776,9876543210
}

const networkSet = {
  slowInternet: '2g-gprs-good',     // 2g-gprs-good, 2g-gprs-lossy, 3g-umts-good, 3.5g-hspa-plus-good, 4g-lte-good
  highInternet: '4g-lte-good'
}

var spendersDS = {
  mobileNumber: '1234567893',
  password: '123456',
  newRegister: {
    mobileNumber: null,
    password: '123456',
    validOTP: '998877',
    firstname: null,
    lastname: null,
    email: 'zxcv@gmail.com',
    expectedPostalCodeValue: 'SW100ab'
  }
}


let today = new Date()
const month = today.getMonth() + 1

const currentTime = {
  time: today.getDate() + '-' + month + '-' + today.getFullYear()
}

export {
  registrationDS,
  applycardDS,
  kycDS,
  loginDS1,
  networkSet,
  giftcardDS,
  archivedCardDS,
  spendersDS,
  currentTime
}