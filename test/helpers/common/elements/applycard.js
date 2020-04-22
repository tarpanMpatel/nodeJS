import { applycardDS } from '../../data'

const applyCardAccessibilityId = {
  addToCard: 'addCard-testId',
  amountSliderBar: 'cardAmountSlider-testId',
  goToCards: 'cardSuccess-testId',
  changeEmployer: 'changeEmployerBtn-testId',
  closeButton: 'spenderCloseIcon-testId',

}
const applyCardXPath = {
  logo: '//*[@class=\'UIAImage\' and ./parent::*[./parent::*[@text=\'You can add, up to £100\non your Tesco card AMOUNT cardAmountSlider- testId £20 DURATION oneMonthDuration - testId twoMonthDuration - testId threeMonthDuration - testId addCard - testId Text and guidance on taking a new card, this\ntext will include a link to a faq landing page.\']]]',
  addcardMsg: '//*[@text=\'You can add, up to £100\non your Tesco card\']',
  amountText: '//*[@text=\'AMOUNT\']',
  durationText: '//*[@text=\'DURATION\']',
  footerText: '//*[@text=\'Text and guidance on taking a new card, this\ntext will include a link to a faq landing page.\']',
  OneMonthDuration: '//*[@text=\'oneMonthDuration- testId\']',
  twoMonthDuration: '//*[@text=\'twoMonthDuration- testId\']',
  threeMonthDuration: '//*[@text=\'threeMonthDuration- testId\']',
  amountValue: '//*[@text=\'£20\']',
  durationDynamic: '//android.widget.TextView[@text=\'' + applycardDS.requiredDuration + ' Months\']',
  logo1: '//*[@class=\'UIAImage\' and ./parent::*[./parent::*[@text=\'Success! Your card is added to your wallet and\nis ready to be used at Tesco’s BALANCE £20 cardSuccess - testId\']]]',
  Successtext1: '//*[@text=\'Success!\']',
  Successtext2: '//*[@text=\'Your card is added to your wallet and\nis ready to be used at Tesco’s\']',
  balancetext: '//*[@text=\'BALANCE\']',
  twentyPound: '//*[@text=\'£20\']',
  myGifts: '//*[@text=\'My Gifts\']',
  sports: '//*[@text=\'Sports\']',
  myCards: '//*[@text=\'My Cards\']',
  headerText: '//*[@text=\'To better help you get the right loan, we would\nlike to ask some share some income details.\']',
  logo2: '(//*/*/*/*/*[@class=\'UIAImage\' and ./parent::*[@id=\'APPLICATION IS SUBMITTED\']])[1]',
  cardStatus: '//*[@text=\'APPLICATION IS SUBMITTED\']',
  monthlyIncomeRentErrorMsg: '//*[@text=\'Entered amount should be between 50 - 99999\']',
  monthlyIncomeMsg: '//*[@text=\'Monthly net salary in pounds\']',
  tickMark: '//android.view.ViewGroup[@content-desc="monthlyIncomeContainer-testId"]/android.widget.TextView',
  headerMessage: '//*[@text=\'What is your housing payment situation?\']',
  monthlyRentMsg: '//*[@text=\'Monthly spend on housing rent\']',
  tickMarkformonthlyRent: '//android.view.ViewGroup[@content-desc="rentContainer-testId"]/android.widget.TextView',
  tickMarkfornumberOfDependants: '//android.view.ViewGroup[@content-desc="dependantsContainer-testId"]/android.widget.TextView',
  headerMessage1: '//*[@text=\'Where do you currently work?\']',
}

export { applyCardAccessibilityId, applyCardXPath }