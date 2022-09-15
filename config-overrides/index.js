const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path')

module.exports = override(
  // alias
	addWebpackAlias({
    // 加载模块的时候，可以使用“@”符号来进行简写啦~
    '@': path.resolve(__dirname, '../src/')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);