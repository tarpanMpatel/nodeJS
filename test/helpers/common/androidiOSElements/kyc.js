import {configuration} from '../../../helpers/config'

let kycAccessibilityId
let kycXPath

if (configuration.runOs === 'android') {

    console.log("KYC android element")

    kycAccessibilityId = {

        monthlyIncome: 'monthlyIncome-testId',
        monthlyRent: 'rent-testId',
        numberOfDependants: 'dependants-testId',
        mortgageRadiobutton: 'mortgageRadioBtn-testId',
        rentRadiobutton: 'rentRadioBtn-testId',
        selectEmployer: 'selectEmployerBtn-testId',
        cityName: 'cityName-testId',
        countryName: 'countryName-testId',
        changeEmployee: 'changeEmployerBtn-testId',
        letsStartButton: 'verifyIdBtn-testId',
        recordVideo: 'startVideoBtn-testId',
        captureVideo: 'captureVideoBtn-testId',
        replayVideoButton: 'replayBtn=testId',    //'replayBtn-testId',
        monthlyIncomeMsg: 'monthlyNet-testId',
        tickMark: 'incomeTick-testId',
        tickMarkformonthlyRent: 'rentCheckMark-testId',
        tickMarkfornumberOfDependants: 'dependantCheckmark-testId',
        headerMessageOfEmployerDetails: 'address-testId',

    }
    kycXPath = {

        headerMessage: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]',
        monthlyRentMsg: '//android.widget.TextView[@text=\'Monthly spend on housing rent\']',
        employer: '//android.widget.TextView[@text=\'Karma Inc - Karma International\']',
        employerName: '//android.widget.TextView[@text=\'Karma Inc\']',
        address: '//android.widget.TextView[@text=\'18 Finsbury Square, , London, UK, EC2A 1AH\']',
        employerName1: '(//android.widget.EditText[@content-desc="buildingLane-testId"])[1]',
        buildingName: '(//android.widget.EditText[@content-desc="buildingLane-testId"])[2]',
        IDCardImage: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.ImageView',
        IDCardText2: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[2]',
        IDCardText3: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[3]',
        IDCardText: '//android.widget.TextView[@text=\'ID MADE SIMPLE\']',
        stepText: '//android.widget.TextView[@text=\'Step 3 of 4: Quick ID check\']',
        IDCardText1OfVerifyYourIdentity: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[1]',
        IDCardText2OfVerifyYourIdentity: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]',
        IDCardImageOfVerifyYourIdentity: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ImageView',
        takeaPictureText: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView',
        sayKarmaText: '//android.widget.TextView[@text=\'SAY KARMA\']',
        sayKarmaText1: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]',
        captureVideoText: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView',
        retakeButton: '//android.widget.TextView[@text=\'RETAKE\']',
        nextButton: '//android.widget.TextView[@text=\'NEXT\']',
        congratulationText: '//android.widget.TextView[@text=\'CONGRATULATIONS\']',
        approvedText: '//android.widget.TextView[@text=\'Your credit limit is approved.\']',

    }

} else {

    console.log("KYC iOS element")

    kycAccessibilityId = {

        monthlyIncome: 'monthlyIncome-testId',
        monthlyRent: 'rent-testId',
        numberOfDependants: 'dependants-testId',
        mortgageRadiobutton: 'mortgageRadioBtn-testId',
        rentRadiobutton: 'rentRadioBtn-testId',
        selectEmployer: 'selectEmployerBtn-testId',
        cityName: 'cityName-testId',
        countryName: 'countryName-testId',
        changeEmployee: 'changeEmployerBtn-testId',
        letsStartButton: 'verifyIdBtn-testId',
        recordVideo: 'startVideoBtn-testId',
        captureVideo: 'captureVideoBtn-testId',
        replayVideoButton: 'replayBtn=testId',    //'replayBtn-testId',
        monthlyIncomeMsg: 'monthlyNet-testId',
        tickMark: 'incomeTick-testId',
        tickMarkformonthlyRent: 'rentCheckMark-testId',
        tickMarkfornumberOfDependants: 'dependantCheckmark-testId',
        headerMessageOfEmployerDetails: 'address-testId',

    }
    kycXPath = {
        headerMessage: '//*[@id=\'What is your housing payment situation?\']',
        monthlyRentMsg: '//*[@text=\'Monthly spend on housing rent\']',
        employer: '//*[@accessibilityLabel=\'[object Object]-selectEmployer-testId\']',
        employerName: '//*[@text=\'Karma Inc\']',
        address: '//*[@text=\'18 Finsbury Square, , London, UK, EC2A 1AH\']',
        employerName1: '//*[@placeholder=\'Building No./Lane name\' and ./parent::*[./parent::*[@text=\'buildingLaneContainer-testId\' and ./parent::*[@text=\'Where do you currently work? CHANGE EMPLOYER Selected Address Building No./Lane name\']]]]',
        buildingName: '(//*/*/*/*[@placeholder=\'Building No./Lane name\'])[2]',
        IDCardImage: '//*[@text=\'assets/assets/images/kyc_id.png\']',
        IDCardText2: '//*[@id=\'Two simple steps to get all the\\ninformation we need to protect you\\nand your information.\']',
        IDCardText3: '//*[@text=\'You only have to grab your passport,\\ndrivier’s licence or national ID\\nand record a 3 second selfie video.\']',
        IDCardText: '//*[@text=\'ID MADE SIMPLE\']',
        stepText: '//*[@text=\'Step 3 of 4: Quick ID check\']',
        IDCardText1OfVerifyYourIdentity: '//*[@text=\'PHOTO ID\']',
        IDCardText2OfVerifyYourIdentity: '//*[@text=\'Take a picture of your photo id and\\n check your information.\']',
        IDCardImageOfVerifyYourIdentity: '//*[@text=\'assets/assets/images/kyc_picture_start.png\']',
        takeaPictureText: '//*[@id=\'Take a photo of your passport inside\\nthe frame. This can’t be a copy.\' and @class=\'UIAStaticText\']',
        sayKarmaText: '//*[@text=\'SAY KARMA\']',
        sayKarmaText1: '//*[@id=\'Record a 3 second video so we know\\nyou’re human.\']',
        captureVideoText: '//*[@text=\'Please say aloud (or sign) the\nyellow text and press the red button\nwhen your done.\' and @class=\'UIAStaticText\']',
        retakeButton: '//*[@accessibilityLabel=\'retakeLink-testId\']',
        nextButton: '//*[@accessibilityLabel=\'nextLink-testId\']',
        congratulationText: '//*[@text=\'CONGRATULATIONS\']',
        approvedText: '//*[@text=\'Your credit limit is approved.\']',

    }

}

export {kycAccessibilityId, kycXPath}


