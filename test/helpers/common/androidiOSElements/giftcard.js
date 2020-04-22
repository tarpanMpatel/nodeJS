import {configuration} from '../../../helpers/config'

let giftCardAccessibilityId
let giftCardXPath

if (configuration.runOs === 'android') {

    console.log("GiftCard android element")

    giftCardAccessibilityId = {
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
        addaGIFTMsg: 'addCardMsg-testId',
        footerText: 'footerTxt-testId',
    }
    giftCardXPath = {
        logo: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.ImageView',
        logo1: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.widget.ImageView',
        InviteSpender: '//android.widget.TextView[@text=\'INVITE SPENDER\']',
        tickMark: '//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView',
        logo3: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.support.v4.view.ViewPager/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ImageView',
        mobileError: '//android.widget.TextView[@text=\'Not a valid phone number.\']'
    }

} else {

    console.log("GiftCard iOS element")

    giftCardAccessibilityId = {
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
        addaGIFTMsg: 'addCardMsg-testId',
        footerText: 'footerTxt-testId',
    }
    giftCardXPath = {
        logo: '//*[@class=\'UIAImage\']',
        logo1: '//*[@class=\'UIAImage\' ]',
        InviteSpender: '//*[@text=\'INVITE SPENDER\']',
        tickMark: '//android.view.ViewGroup[@content-desc="phoneContainer-testId"]/android.widget.TextView',
        logo3: '//*[@class=\'UIAImage\']',
        mobileError: '//*[@text=\'Not a valid phone number.\']',
        done: '//*[@accessibilityLabel=\'doneBtn-testId\']',
    }

}

export
{
    giftCardAccessibilityId, giftCardXPath
}