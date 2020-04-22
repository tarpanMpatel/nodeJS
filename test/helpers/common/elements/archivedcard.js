const archivedCardAccessibilityId = {
  archivebutton: 'circularArchiveBtn-testId',
  termsbutton: 'circularTermsBtn-testId',
  editbutton: 'editSpender-testId',
  menu: 'rightIconBtn-test',
  restoreButton: 'circularArchiveBtn-testId',

}
const archivedCardXPath = {
  card: '//android.view.ViewGroup[contains(@content-desc,"Tesco-testId")]',// //*[@accessibilityLabel='5d89df5e46e0fb0008d031c4-testId']
  logo: '//*[@class=\'UIAImage\' and ./parent::*[./parent::*[./parent::*[@text=\'INSTRUCTIONS Dummy Instruction circularTermsBtn-testId 5d89df5e46e0fb0008d031c4-testId DD editSpender-testId\']]]]',
  instructionsText: '//*[@text=\'INSTRUCTIONS\']',
  archivedOption: '//*[@text=\'Archived\']',
  rejectedOption: '//*[@text=\'Rejected\']',
  logo1: '//*[@text=\'assets/assets/images/HeaderLogo.png\']',
}

export { archivedCardAccessibilityId, archivedCardXPath }