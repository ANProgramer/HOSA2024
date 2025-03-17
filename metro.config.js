const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure these are included in the config
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];
config.resolver.extraNodeModules = {
  'react': require.resolve('react'),
  'react-native': require.resolve('react-native')
};

module.exports = config;