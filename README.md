### KarmaReactNativeUI
Test suite for Karma React Native App

#### [Required Software]

[Node.js](https://nodejs.org/en/),

[Appium Studio](https://docs.experitest.com/display/TC/Appium+Studio+Installation) (Recommended),

[Appium](https://github.com/appium/appium-desktop/releases/tag/v1.15.0-1)


#### [Project Setup]

##### 1.) Take a latest code from Developer branch.
    git clone https://github.com/chaitanyaamin/karmaReactNativeUITesting.git
    
##### 2.) After successfully clone the project and open terminal and install all dependencies.
     npm install


#### [Execute Tests]

##### 1.) Execution on Browser stack

   ##### A. How to run test suite in Browser Stack for android device

       1. Add the device list in config.js file under 'browserStackAndroidDeviceList' list.
       
          Steps for adding device list: 1. open the config.js file and Go to the 'browserStackAndroidDeviceList' list
          
                                        2. Update the device name value and platform version value.
                                        
                                        eg. {  
                                              it: 'device1',
                                                option: {
                                                  deviceName: '<deviceName>',        
                                                  platformVersion: '<platformVersion>'       
                                                }
                                             }

       2. Go to config.js file and update the configuration as below.
       
          Steps for updating configuration: 1. open the config.js file and update the configuration as below.
          
                                            eg. const configuration = {
                                                  runOn: browserStackAndroidCaps,           
                                                  runOs: 'android',                  
                                                  driverType: 'browserstack',              
                                                  }

       3. Open the terminal & open the project and Run the test with 'npm run test' command.

   ##### B. How to run test suite in Browser Stack for iOS device

       1. Add the device list in config.js file under 'browserStackiosCaps' list.
       
          Steps for adding device list: 1. open the config.js file and Go to the 'browserStackiosCaps' list
          
                                        2. Update the device name value and platform version value.
                                        
                                        eg. {  
                                              it: 'device1',
                                                option: {
                                                  deviceName: '<deviceName>',        
                                                  platformVersion: '<platformVersion>'       
                                                }
                                             }

       2. Go to config.js file and update the configuration as below.
       
          Steps for updating configuration: 1. open the config.js file and update the configuration as below.
         
                                           eg. const configuration = {
                                                  runOn: browserStackiosCaps,           
                                                  runOs: 'iOS',                  
                                                  driverType: 'browserstack',              
                                                  }

       3. Open the terminal & open the project and Run the test with 'npm run test' command.

#### 2.) Execution on Local

   ##### A. How to run test suite in Local for android device

       1. Add the device list in config.js file under 'androidLocalDeviceList' list.
       
          Steps for adding device list: 1. open the config.js file and Go to the 'androidLocalDeviceList' list
          
                                        2. Update the device name value and platform version value.
                                        
                                        eg. {  
                                              it: 'device1',
                                                option: {
                                                  deviceName: '<deviceName>',        
                                                  platformVersion: '<platformVersion>'       
                                                }
                                             }

       2. Go to config.js file and update the configuration as below.
       
          Steps for updating configuration: 1. open the config.js file and update the configuration as below.
         
                                           eg. const configuration = {
                                                  runOn: andoridCapslocal,           
                                                  runOs: 'android',                  
                                                  driverType: 'local',              
                                                  }

       3. Start Appium / Appium studio and connect your device with it.

       4. Open the terminal & open the project and Run the test with 'npm run test' command.
       
   ##### B. How to run test suite in Local for iOS device

       1. Add the device list in config.js file under 'iOSLocalDeviceList' list.
       
          Steps for adding device list: 1. open the config.js file and Go to the 'iOSLocalDeviceList' list
          
                                        2. Update the device name value and platform version value.
                                        
                                        eg. {  
                                              it: 'device1',
                                                option: {
                                                  deviceName: '<deviceName>',        
                                                  platformVersion: '<platformVersion>'       
                                                }
                                             }

       2. Go to config.js file and update the configuration as below.
       
          Steps for updating configuration: 1. open the config.js file and update the configuration as below.
         
                                             eg. const configuration = {
                                                  runOn: iosCapslocal,           
                                                  runOs: 'iOS',                  
                                                  driverType: 'local',              
                                                  }


       3. Start Appium / Appium Studio and connect your device with it.

       4. Open the terminal & open the project and Run the test with 'npm run test' command.