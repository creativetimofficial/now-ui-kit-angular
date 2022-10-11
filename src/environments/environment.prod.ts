// import packageInfo from 'package.json';
import packageInfo from '../../package.json';

const __EMOTION_VERSION__ = packageInfo.version;

export const environment = {
    production: true,
    language: 'en-US',
    platformAndroid: 'Android',
    platformTest: 'Test',
    platformWeb: 'Web',
    platform: 'Test',
    version: __EMOTION_VERSION__,
};
