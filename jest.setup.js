// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-camera
jest.mock('expo-camera', () => ({
  CameraView: 'CameraView',
  useCameraPermissions: jest.fn(() => [{ granted: true }, jest.fn()]),
}));

// Mock react-native-qrcode-svg
jest.mock('react-native-qrcode-svg', () => 'QRCode');

// Mock Share
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Share = {
    share: jest.fn(() => Promise.resolve({ action: 'sharedAction' })),
  };
  return RN;
});
