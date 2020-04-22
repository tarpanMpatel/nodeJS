let homePageXpath
let businessMenuXpath

    homePageXpath = {
        businessMenu: '//span[contains(text(),\'Business\')]',
        appsMenu: '//span[contains(text(),\'Apps\')]',
        tutorials: '//span[contains(text(),\'Tutorial\')]',
        changeEmployer: 'changeEmployerBtn-testId'
    },

        businessMenuXpath = {
        closeIcon: '//span[contains(text(),\'Close\')]/..',
        apps: '//business-applications/div',
        shopAppIcon: '//business-applications//div[7]/div[1]',
        changeEmployer: 'changeEmployerBtn-testId'
    }

export {homePageXpath,businessMenuXpath}