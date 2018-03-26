const {NativeModules} = require('react-native');

NativeModules.StatusBarManager = {getHeight: jest.fn()};
