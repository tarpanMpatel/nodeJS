import { configuration} from '../../../helpers/config'
let registerAccessibilityId
let registerXPath

if (configuration.runOs === 'android') {

  console.log("Registration android element")

  registerAccessibilityId = {
    register: 'registerBtn-testId',
    login: 'loginBtn-testId',
    phone: 'phone-testId',
    password: 'password-testId',
    aggrementCheckbox: 'aggrementCheckbox-testId',
    otp: 'otp-testId',
    nextButton: 'nextBtn-testId',
    firstname: 'firstName-testId',
    lastname: 'lastName-testId',
    birthdate: 'birthDateContainer-testId',//birthDate-testId
    okbutton: 'android:id/button1',
    email: 'emailId-testId',
    backButton: 'leftIconBtn-testId',
    postalcode: 'postalCode-testId',
    search: 'searchIcon-testId',
    signmeup: 'signMeUpBtn-testId',
    allow: 'allowBtn-testId',
    takeaselfie: 'startPictureBtn-testId',
    capture: 'captureSelfie-testId',
    done: 'doneBtn-testId',
    apply: 'Apply, tab, 1 of 5',
    dashboard: 'Dashboard, tab, 2 of 5',
    card: 'Cards, tab, 3 of 5',
    profile: 'Profile, tab, 4 of 5',
    more: 'More, tab, 5 of 5',
    terms: 'termsLink-testId',
    headerTitle: 'headerTitle-testId',
    privacyPolicy: 'privacyPolicyLink-testId',
    otpErrorMsg: 'android:id/message',
    resendlink: 'resendCodeLink-testId',
    building: 'buildingLane-testId',
    city: 'cityName-testId',
    country: 'countryName-testId',
    countdowntext: 'countDownTxt-testId',
    tickMark: 'otpCheckmark-testId',
    mobileNoError: 'phoneErrorTxt-testId',
    otpError: 'otpWarning-testId',
    passwordEroor: 'passwordErrorTxt-testId',
    firstNameError: 'firstNameError-testId',
    lastNameError: 'lnameError-testId',
   // invalidemailError: 'emailErrorTxt-testID',
    fiveCharactersError: 'codeLengthErrorTxt-testId',
    postalCodeMsg: 'searchMessage-testId',
    actualAddressList: 'noAddress-testId',
    actualmobileNo: 'phoneNumber-testId',
    addressDetailsText: 'addressSteps-testId',
    selectAddress: 'selectHomeAddressTxtResp-testId',
    skip: 'skipLink-testId',
    step3and4Text: 'kycPicStartStepTxt-testId',
    loginlink: 'loginLink-testId'
  }

  registerXPath = {
    login: '//android.widget.TextView[@text=\'Login\']',
    invalidemailError:'//android.widget.TextView[@content-desc="emailErrorTxt-testId"]'

  }

} else {

  console.log("Registration iOS element")

  registerAccessibilityId = {
    register: 'registerBtn-testId',
    login: 'loginBtn-testId',
    phone: 'phone-testId',
    password: 'password-testId',
    aggrementCheckbox: 'aggrementCheckbox-testId',
    otp: 'otp-testId',
    nextButton: 'nextBtn-testId',
    firstname: 'firstName-testId',
    lastname: 'lastName-testId',
    birthdate: 'birthDateContainer-testId',//birthDate-testId
    okbutton: 'OK',
    email: 'emailId-testId',
    backButton: 'leftIconBtn-testId',
    postalcode: 'postalCode-testId',
    search: 'searchIcon-testId',
    signmeup: 'signMeUpBtn-testId',
    allow: 'allowBtn-testId',
    takeaselfie: 'startPictureBtn-testId',
    capture: 'captureSelfie-testId',
    done: 'doneBtn-testId',
    apply: 'applyScreen-testId',
    dashboard: 'dashboardScreen-testId',
    card: 'cardsScreen-testId',
    profile: 'profileScreen-testId',
    more: 'moreScreen-testId',
    terms: 'termsLink-testId',
    headerTitle: 'headerTitle-testId',
    privacyPolicy: 'privacyPolicyLink-testId',
    resendlink: 'resendCodeLink-testId',
    building: 'buildingLane-testId',
    city: 'cityName-testId',
    country: 'countryName-testId',
    countdowntext: 'countDownTxt-testId',
    tickMark: 'otpCheckmark-testId',
    mobileNoError: 'phoneErrorTxt-testId',
    otpError: 'otpWarning-testId',
    passwordEroor: 'passwordErrorTxt-testId',
    firstNameError: 'firstNameError-testId',
    lastNameError: 'lnameError-testId',
    fiveCharactersError: 'codeLengthErrorTxt-testId',
    postalCodeMsg: 'searchMessage-testId',
    actualAddressList: 'noAddress-testId',
    actualmobileNo: 'phoneNumber-testId',
    addressDetailsText: 'addressSteps-testId',
    selectAddress: 'selectHomeAddressTxtResp-testId',
    skip: 'skipLink-testId',
    step3and4Text: 'kycPicStartStepTxt-testId',
    loginlink: 'loginLink-testId'
  }

  registerXPath = {
    login: '//*[@text=\'Login\']',
    sport: '//*[@id=\'Sports\']',
    done:'//*[@accessibilityLabel=\'doneBtn-testId\']',
    firstName:'//*[@accessibilityLabel=\'firstName-testId\']',
    lastName:'//*[@accessibilityLabel=\'lastName-testId\']',
    email:'//*[@accessibilityLabel=\'emailId-testId\']',
    phone:'//*[@accessibilityLabel=\'phoneNumber-testId\']',
    dobmonth:'(//*[@class=\'UIAPicker\']/*[@class=\'UIAPickerWheel\'])[1]',
    dobmonth1:'(//*[@class=\'UIAView\' and ./parent::*[@class=\'UIAView\']]/*[@class=\'UIAPickerWheel\'])[1]',
    blankSpace:'//*[@class=\'UIAStaticText\']',
    okbutton:'//*[@id=\'OK\']',
    otpErrorMsg: '//*[@text=\'Error\']',
    invalidemailError:'//*[@accessibilityLabel=\'emailErrorTxt-testId\']'
  }

}

export { registerAccessibilityId, registerXPath }