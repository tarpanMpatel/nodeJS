let loginPageXPath

    loginPageXPath = {
        logo:'//img[@class=\'logo-header\']',
        username:'//input[@name=\'UserName\']',
        password:'//input[@placeholder=\'Password\']',
        forgotPassword:'//div/a[contains(text(),\'Forgot your password\')]',
        loginBtn:'//button//div[contains(.,\'Login\')]'
    }

export
{
     loginPageXPath
}