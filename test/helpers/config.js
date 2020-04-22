import path from 'path'

const LOCAL_ASSET_BASE = path.resolve(__dirname, 'apps')

let iosTestApp = path.resolve(LOCAL_ASSET_BASE, 'TestApp.app.zip')
let androidTestApp = path.resolve(LOCAL_ASSET_BASE, 'karma-signed.apk')

let today = new Date()
const time = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear() + '(' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ')'
console.log('Build: -' + time)

const DEFAULT_ANDROID_DEVICE_NAME = 'Galaxy J8'
const DEFAULT_ANDROID_PLATFORM_VERSION = '9'

const bsCred = {
    bsUser: 'chaitanyaamin1',
    bsKey: 'sPixUWnqQTinpekcbLX4'
}
let bsapp = 'bs://8cf520a2964c2ac71d120fee18574e2df54918fa' //'bs://f2d807590909b62f8343e2319b982f8abf7d8037'     // 'bs://b0a50f518478f77e6e7edd8c6e745cdbba04a984'  for DEV , 'bs://cb5709f5933fc9906efb26e3d7e82db77129a5f0' for qa

const browserStackAndroidCaps = {
    'browserstack.user': bsCred.bsUser,
    'browserstack.key': bsCred.bsKey,
    'platformName': 'Android',
    'build': '[Android]',
    'name': 'Karma Test',
    'device': '',
    'realMobile': 'true',
    'platformVersion': '',
    'networkProfile': '4g-lte-good',
    'app': bsapp,
    'autoGrantPermissions': true,
    'browserstack.debug': true,
    'unicodeKeyboard': true
}

let bsUserios = 'chaitanyaamin1'
let bsKeyios = 'sPixUWnqQTinpekcbLX4'
let bsappios = 'bs://e9e5ef647411379616428d231166cc523c0f0158'

const browserStackiosCaps = {
    'browserstack.user': bsUserios,
    'browserstack.key': bsKeyios,
    'build': '[IOS] ARCHIVED CARD- ',
    'name': 'Karma Test',
    'device': '',
    'os_version': '',
    'realMobile': 'true',
    'wdaConnectionTimeout': '999999999',
    'wdaLaunchTimeout': '999999999',
    'restart': 'true',
    'useNewWDA': true,
    //'app' : 'https://testflight.apple.com/join/qOAYF3RJ',
    // 'app': 'https://testflight.apple.com/join/WIKOj31z',
    'app': bsappios,
    'bundleId': 'com.app.getKarma-qa',
    'browserstack.debug': true
}

const serverConfig = {
    host: process.env.APPIUM_HOST || '0.0.0.0',
    port: process.env.APPIUM_PORT || 4723
}

let setTestName = function (section, testName) {
    Object.assign(browserStackCaps, {
        'name': testName,
        'build': '[Android] Karma ' + section + ' - ' + time
    })
}

// defining Browser Stack Capibilities which in future will taken from the helpers / config
const browserStackCapsMarmik = {
    'browserstack.user': 'bjmmk1',
    'browserstack.key': 'nYtD4KkUPCRQxb5qDA7i',
    'device': 'Google Nexus 6',
    'platformVersion': '6.0',
    'app': 'bs://6991ff8c3be74f3bd71ea6f08ff5879172397914',
    'autoGrantPermissions': true,
    'browserstack.debug': true,
    'unicodeKeyboard': true,
    'browserstack.networkLogs': true
}

const andoridCapslocal = {
    platformName: 'Android',
    platformVersion: '',
    deviceName: '',
    autoGrantPermissions: true,
    app: androidTestApp
}

const iosCapslocal = {
    platformName: 'iOS',
    platformVersion: '',
    deviceName: '',
    bundleId: 'com.app.getKarma-qa',
    autoAcceptAlerts: true
}

let browserStackAndroidDeviceList = [
    {
        it: 'device1',
        option: {
            deviceName: 'Samsung Galaxy S9 Plus',//Samsung Galaxy Note 9, Samsung Galaxy S9 Plus, Samsung Galaxy S9,Samsung Galaxy Note 8
            platformVersion: '9.0'  //8.1, 8.0, 8.0, 7.1
        }
    },
    {
        it: 'device2',
        option: {
            deviceName: 'OnePlus 6T',
            platformVersion: '9.0'
        }
    },
    {
        it: 'device3',
        option: {
            deviceName: 'Google Pixel 3 XL',
            platformVersion: '9.0'
        }
    }
]

let browserStackiOSDeviceList = [
    {
        it: 'device1',
        option: {
            deviceName: 'iPhone 8 Plus',
            platformVersion: '12'
        }
    }
]

let androidLocalDeviceList = [
    {
        it: 'device1',
        option: {
            deviceName: 'Mi A2',              // Mi A2, Galaxy J8
            platformVersion: '9'           // 8.1.0, 9
        }
    }
]

let iOSLocalDeviceList = [
    {
        it: 'device1',
        option: {
            deviceName: 'iPhone 8',           // iPhone 6 Plus ,iPhone 7, iPhone 8
            platformVersion: '12.2'       // 12.3.1 ,13.1.2, 12.2
        }
    }
]

let runOs = process.argv[3]
let driverType = process.argv[4]
let runOn

if (driverType === 'local' && runOs === 'iOS') {
    runOn = iosCapslocal
} else if (driverType === 'local' && runOs === 'android') {
    runOn = andoridCapslocal
} else if (driverType === 'browserstack' && runOs === 'iOS') {
    runOn = browserStackiosCaps
} else if (driverType === 'browserstack' && runOs === 'android') {
    runOn = browserStackAndroidCaps
}else {
    console.log("Sorry..!!! Please provide valid Driver Type and Run Os.")
}

const configuration = {
    runOs: runOs,
    runOn: runOn,
    driverType: driverType,
}

exports.config = {
    // ...
    reporters: ['allure'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: false
        }
    }
}

export {
    iosTestApp, androidTestApp, browserStackAndroidCaps, serverConfig,
    setTestName, browserStackCapsMarmik, browserStackiosCaps, andoridCapslocal, iosCapslocal, configuration,
    bsCred, browserStackAndroidDeviceList, androidLocalDeviceList, iOSLocalDeviceList, browserStackiOSDeviceList
}