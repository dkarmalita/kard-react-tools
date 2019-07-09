/* eslint-disable */
const path = require('path');

// require.main.paths = [
//   path.join(__dirname, '..'),
//   ...require.main.paths,
// ];

// function createResolver(basePath) {
//   return {
//     get basePath() { return basePath; },
//     fullPath(rPath = '', ...rest) { return path.join(this.basePath, rPath, ...rest); },
//     resolve(...params) { return require.resolve(this.fullPath(...params)); },
//     require(...params) { return require(this.fullPath(...params)); },
//   };
// }

// function createResolverA(basePath) {
//   return {
//     get basePath() { return basePath; },
//     fullPath(rPath = '', ...rest) { return path.join(this.basePath, rPath, ...rest); },
//     resolve(...params) {
//       try {
//         return require.resolve(this.fullPath(...params));
//       } catch (e) {
//         try {
//           return require.resolve(params[params.length - 1]);
//         } catch (e) {
//           console.log('resolve err >>>', params)
//         }
//       }
//       return null
//     },
//     require(...params) {
//       try {
//         return require(this.fullPath(...params));
//       } catch (e) {
//         try {
//           return require(params[params.length - 1]);
//         } catch (e) {
//           console.log('require err >>>', params)
//         }
//       }
//       return null
//     },
//   };
// }

// const target = createResolver(process.cwd());
// const tools = createResolverA(path.join(__dirname, '..'));

// module.exports = function ({ args } = { args: [] }) {
//   console.log('>>>>> DEV <<<<<<');
//   console.log('TARGET <<<<<<', target.fullPath());
//   console.log('TOOLS <<<<<<', tools.fullPath());
//   console.log(require.main.paths);
// };

module.exports = () => {
// TODO: [ ] add global config

// console.log(path.resolve('./')) // target project path
// console.log(path.join(__dirname, '..')) // tools.project.path
const { tools } = global.context

// const getConfig = tools.require('utils/getConfig')
// console.log(getConfig)
// getConfig()

}
