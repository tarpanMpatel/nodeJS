const giftCardAccessibilityId = {
  sendVIA: 'addCard-testId',
  amountSliderBar: 'cardAmountSlider-testId',
  shareKARMA: 'shareCard-testId',
  whatsappInvite: 'whatsappInvite-testId',
  smsInvite: 'smsInvite-testId',
  closeButton: 'spenderCloseIcon-testId',
  shareKarma: 'shareKarma-testId',
  FAQ: 'faqBtn-testId',
  privacyPolicy: 'privacyPolicyBtn-testId',
  eula: 'eulaBtn-testId',
  termsOfServices: 'termsBtn-testId',
  GDRP: 'gdprBtn-testId',
  kgcp: 'kgcpBtn-testId',
  logout: 'logoutBtn-testId',
  registerlink: 'registerLink-testId',
}
const giftCardXPath = {
  logo: '//*[@class=\'UIAImage\' and ./parent::*[./parent::*[@text=\'You’re giving someone some good KARMA.How much would you like to give? AMOUNT cardAmountSlider- testId £20 addCard - testId Text and guidance on taking a new card, this\ntext will include a link to a faq landing page.\']]]',
  addaGIFTMsg: '//*[@text=\'You’re giving someone some good KARMA.How much would you like to give?\']',
  footerText: '//*[@text=\'Text and guidance on taking a new card, this\ntext will include a link to a faq landing page.\']',
  logo1: '//*[@class=\'UIAImage\' and ./parent::*[./parent::*[@text=\'Success! Who are you going to\nmake happy with £20? BALANCE £20 shareCard - testId\']]]',
  InviteSpender: '//*[@id=\'INVITE SPENDER\']',
  tickMark: '//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView',
  logo3: '(//*/*/*/*/*[@class=\'UIAImage\' and ./parent::*[@id=\'APPLICATION IS SUBMITTED\']])[1]',
  mobileError: '//*[@text=\'Not a valid phone number.\']'
}
export { giftCardAccessibilityId, giftCardXPath }