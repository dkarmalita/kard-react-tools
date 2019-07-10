const fs = require('fs');
const path = require('path');

/**
 * looking for a path which contains ifFile upward of the file path. Returns the path found or '/'
 * othercase.
 * @param  {String} ifFile - file name to look for (package.json, .git are the good ides of such)
 * @return {String} fully qualified path of the root directory (which contains ifFile) or '/'
 */
const findRootFile = (ifFile = 'package.json') => {
  const els = __dirname.split('/');
  for (let i = els.length - 1; i >= 0; i -= 1) {
    const candidate = path.join(els.join('/'), ifFile);
    if (fs.existsSync(candidate)) {
      return els.join('/');
    }
    els.splice(-1, 1);
  }
  return '/';
};
const toolsRoot = findRootFile('package.json');

/**
 * builds a list of directories to resolve node module (upward from the given base)
 * @param  {Array of String} els - elements of the base path (use path.split('/') to get it)
 * @param  {Array}  acc - accumulator of recursive results
 * @return {Array}  array of paths to resolve a package
 */
const makeResolveList = (els, acc = []) => {
  if (els.length === 0) { return acc; }
  acc.push(`${els.join('/')}/node_modules`);
  els.splice(-1, 1);
  return makeResolveList(els, acc);
};

/**
 * combined resolve paths set based on the current project location (as tools, only the project
 * root and bellow are used) and the execution root (process.env.PWD as target)
 * @type {Array}
 */
const paths = [
  toolsRoot,
  ...require.main.paths.filter(el => el.indexOf(toolsRoot) === 0),
  ...makeResolveList(process.env.PWD.split('/')), // of target project
];

// Resolves any module w/o patching the global require.main.paths
const resolve = (fName) => {
  const foundPath = paths.find(tPath => fs.existsSync(path.join(tPath, fName)));
  if (!foundPath) { return require.resolve(fName); }
  return require.resolve(path.join(foundPath, fName));
};

// require.main.paths = paths
// console.log(require.main.paths);
// console.log(paths);
console.log(resolve('webpack'));
console.log(require.resolve('webpack'));
process.exit(0);


// console.log(paths)

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
  const { tools } = global.context;

  // const getConfig = tools.require('utils/getConfig')
  // console.log(getConfig)
  // getConfig()
};
