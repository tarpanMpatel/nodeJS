
let shopAppXpath

    shopAppXpath = {
        shop: '//button//span[contains(text(),\'Shop\')]',
        themesMenu: '//span[contains(text(),\'Themes\')]',
        aqaMenu: '//span[contains(text(),\'AQA\')]',
        addTheme: '//mat-card-content[contains(text(),\' + Add Theme\')]',
        myTheme: '//div[contains(text(),\'My themes\')]',
        allThemes: '//div[contains(text(),\'All themes\')]',
        archivebutton: '//*[@text=\'ARCHIVE\']',
        termsbutton: '//*[@text=\'TERMS\']',
        editbutton: '//*[@content-desc=\'editSpender-testId\']',
        restoreButton: '//*[@content-desc[contains(.,\'-circularArchiveBtn-testId\')]]',

    }

export
{
    shopAppXpath
}