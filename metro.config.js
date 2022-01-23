const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.assetPlugins.push("expo-asset/tools/hashAssetFiles");
defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
defaultConfig.resolver.assetExts.push("svg"); // Maybe not quite right?
defaultConfig.resolver.sourceExts.push('svg');

module.exports = defaultConfig;
// -------------

// const { getDefaultConfig } = require("expo/metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig(__dirname);
//   return {
//     transformer: {
//       assetPlugins: ["expo-asset/tools/hashAssetFiles"],

//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//     },
//     resolver: {
//       assetExts: assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//     },
//   };
// })();
