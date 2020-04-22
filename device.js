import {
    androidLocalDeviceList,
    browserStackAndroidDeviceList,
    browserStackiOSDeviceList,
    configuration,
    iOSLocalDeviceList
} from './test/helpers/config'
import {currentTime} from './test/helpers/data'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let applycardmodule1 = require('./test/demo/demo.js')
let applycardmodule2 = require('./test/demo/TC_AC_02.applycard.test.js')
let applycardmodule3 = require('./test/demo/TC_AC_03.applycard.test.js')
let archivedcardmodule1 = require('./test/archivedcard/TC_AC_01.archivedcard.test.js')
let giftcardmodule1 = require('./test/giftcard/TC_GC_01.giftcard.test.js')
let giftcardmodule2 = require('./test/giftcard/TC_GC_02.giftcard.test.js')
let giftcardmodule3 = require('./test/giftcard/TC_GC_03.giftcard.test.js')
let giftcardmodule4 = require('./test/giftcard/TC_GC_04.giftcard.test.js')
let giftcardmodule5 = require('./test/giftcard/TC_GC_05.giftcard.test.js')
let networkdmodule1 = require('./test/networktest/TC_NW_01.network.test.js')
let networkdmodule2 = require('./test/networktest/TC_NW_02.network.test.js')
let registerdmodule1_2 = require('./test/registration/TC_Reg_01_02.registration.test.js')
let registerdmodule3 = require('./test/registration/TC_Reg_03.registration.test.js')
let registerdmodule4 = require('./test/registration/TC_Reg_04.registration.test.js')
let registerdmodule5 = require('./test/registration/TC_Reg_05.registration.test.js')
let registerdmodule6 = require('./test/registration/TC_Reg_06.registration.test.js')
let applycardrandomlymodule = require('./test/applycardrandomly/TC_AC_04.applycardrandomly.test')
let diffcategoryapplycardsmodule = require('./test/diffcategoryapplycard/TC_AC_05.diffcategoryapplycards.test')
let diffcategorycardsmodule = require('./test/diffcategorycards/TC_AC_06.diffcategorycards.test')

let DeviceName, PlatformVersion, buildName

if (configuration.driverType === 'browserstack') {

    console.log('------------------------------------------')
    console.log('      Running All Tests on Browserstack   ')
    console.log('------------------------------------------')

    if (configuration.runOs === 'android') {

        console.log('      Driver Type : ' + configuration.driverType)
        console.log('      Run Os      : ' + configuration.runOs)
        console.log('- -----------------------------------------')
        console.log('      Application Type = Android')
        console.log('------------------------------------------')
        console.log('      No of Devices : ' + browserStackAndroidDeviceList.length)
        console.log('------------------------------------------')

        for (let i = 0; i < browserStackAndroidDeviceList.length; i++) {

            DeviceName = browserStackAndroidDeviceList[i].option.deviceName
            PlatformVersion = browserStackAndroidDeviceList[i].option.platformVersion
            //buildName = DeviceName + '_' + currentTime.time
            buildName = DeviceName + ' : ' + '21st Nov 1-Test'

            console.log('Device Name : ' + DeviceName)
            console.log('platform Version : ' + PlatformVersion)
            console.log('Build Name : ' + buildName)

            registerdmodule1_2(DeviceName, PlatformVersion, buildName)
            registerdmodule3(DeviceName, PlatformVersion, buildName)
            registerdmodule4(DeviceName, PlatformVersion, buildName)
            registerdmodule5(DeviceName, PlatformVersion, buildName)
            registerdmodule6(DeviceName, PlatformVersion, buildName)
            applycardmodule1(DeviceName, PlatformVersion, buildName)
            applycardmodule2(DeviceName, PlatformVersion, buildName)
            applycardmodule3(DeviceName, PlatformVersion, buildName)
            giftcardmodule1(DeviceName, PlatformVersion, buildName)
            giftcardmodule2(DeviceName, PlatformVersion, buildName)
            giftcardmodule3(DeviceName, PlatformVersion, buildName)
            giftcardmodule4(DeviceName, PlatformVersion, buildName)
            giftcardmodule5(DeviceName, PlatformVersion, buildName)
            networkdmodule1(DeviceName, PlatformVersion, buildName)
            networkdmodule2(DeviceName, PlatformVersion, buildName)
            applycardrandomlymodule(DeviceName, PlatformVersion, buildName)
            diffcategoryapplycardsmodule(DeviceName, PlatformVersion, buildName)
            diffcategorycardsmodule(DeviceName, PlatformVersion, buildName)
            archivedcardmodule1(DeviceName, PlatformVersion, buildName)

            sleep(20000)
        }
    } else {

        console.log('      Driver Type : ' + configuration.driverType)
        console.log('      Run Os      : ' + configuration.runOs)
        console.log('------------------------------------------')
        console.log('      Application Type = iOS')
        console.log('------------------------------------------')
        console.log('      No of Devices : ' + browserStackiOSDeviceList.length)
        console.log('------------------------------------------')

        for (let i = 0; i < browserStackiOSDeviceList.length; i++) {

            DeviceName = browserStackiOSDeviceList[0].option.deviceName
            PlatformVersion = browserStackiOSDeviceList[0].option.platformVersion
            buildName = DeviceName + '_' + currentTime.time

            console.log('DeviceName : ' + DeviceName)
            console.log('platformVersion : ' + PlatformVersion)
            console.log('Build Name : ' + buildName)

            registerdmodule1_2(DeviceName, PlatformVersion, buildName)
            sleep(20000)
        }
    }
} else {

    console.log('------------------------------------------')
    console.log('      Running All Tests on Local Device   ')
    console.log('------------------------------------------')
    if (configuration.runOs === 'android') {

        console.log('      Driver Type : ' + configuration.driverType)
        console.log('      Run Os      : ' + configuration.runOs)
        console.log('------------------------------------------')
        console.log('      Application Type = Android')
        console.log('------------------------------------------')
        console.log('      No of Devices : ' + androidLocalDeviceList.length)
        console.log('------------------------------------------')

        for (let i = 0; i < androidLocalDeviceList.length; i++) {

            DeviceName = androidLocalDeviceList[i].option.deviceName
            PlatformVersion = androidLocalDeviceList[i].option.platformVersion
            buildName = DeviceName + '_' + currentTime.time

            console.log('DeviceName : ' + DeviceName)
            console.log('platformVersion : ' + PlatformVersion)
            console.log('Build Name : ' + buildName)

            registerdmodule1_2(DeviceName, PlatformVersion, buildName)
            registerdmodule3(DeviceName, PlatformVersion, buildName)
            registerdmodule4(DeviceName, PlatformVersion, buildName)
            registerdmodule5(DeviceName, PlatformVersion, buildName)
            registerdmodule6(DeviceName, PlatformVersion, buildName)
            applycardmodule1(DeviceName, PlatformVersion, buildName)
            applycardmodule2(DeviceName, PlatformVersion, buildName)
            applycardmodule3(DeviceName, PlatformVersion, buildName)
            giftcardmodule1(DeviceName, PlatformVersion, buildName)
            giftcardmodule2(DeviceName, PlatformVersion, buildName)
            giftcardmodule3(DeviceName, PlatformVersion, buildName)
            giftcardmodule4(DeviceName, PlatformVersion, buildName)
            giftcardmodule5(DeviceName, PlatformVersion, buildName)
            networkdmodule1(DeviceName, PlatformVersion, buildName)
            networkdmodule2(DeviceName, PlatformVersion, buildName)
            applycardrandomlymodule(DeviceName, PlatformVersion, buildName)
            diffcategoryapplycardsmodule(DeviceName, PlatformVersion, buildName)
            diffcategorycardsmodule(DeviceName, PlatformVersion, buildName)
            archivedcardmodule1(DeviceName, PlatformVersion, buildName)

            sleep(20000)
        }
    } else {

        console.log('      Driver Type : ' + configuration.driverType)
        console.log('      Run Os      : ' + configuration.runOs)
        console.log('------------------------------------------')
        console.log('      Application Type = iOS')
        console.log('------------------------------------------')
        console.log('      No of Device : ' + iOSLocalDeviceList.length)
        console.log('------------------------------------------')

        for (let i = 0; i < iOSLocalDeviceList.length; i++) {

            DeviceName = iOSLocalDeviceList[i].option.deviceName
            PlatformVersion = iOSLocalDeviceList[i].option.platformVersion
            buildName = DeviceName + '_' + currentTime.time

            console.log('DeviceName : ' + DeviceName)
            console.log('platformVersion : ' + PlatformVersion)
            console.log('Build Name : ' + buildName)

            /*registerdmodule1_2(DeviceName, PlatformVersion, buildName)
            registerdmodule3(DeviceName, PlatformVersion, buildName)
            registerdmodule4(DeviceName, PlatformVersion, buildName)
            registerdmodule5(DeviceName, PlatformVersion, buildName)
            registerdmodule6(DeviceName, PlatformVersion, buildName)
            applycardmodule1(DeviceName, PlatformVersion, buildName)
            applycardmodule2(DeviceName, PlatformVersion, buildName)
            applycardmodule3(DeviceName, PlatformVersion, buildName)
            giftcardmodule1(DeviceName, PlatformVersion, buildName)
            giftcardmodule2(DeviceName, PlatformVersion, buildName)
            giftcardmodule3(DeviceName, PlatformVersion, buildName)
            giftcardmodule4(DeviceName, PlatformVersion, buildName)
            giftcardmodule5(DeviceName, PlatformVersion, buildName)
            networkdmodule1(DeviceName, PlatformVersion, buildName)
            networkdmodule2(DeviceName, PlatformVersion, buildName)
            applycardrandomlymodule(DeviceName, PlatformVersion, buildName)
            diffcategoryapplycardsmodule(DeviceName, PlatformVersion, buildName)
            diffcategorycardsmodule(DeviceName, PlatformVersion, buildName)
            archivedcardmodule1(DeviceName, PlatformVersion, buildName)*/
            sleep(20000)
        }
    }
}





