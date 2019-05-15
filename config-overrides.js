const {
  override, useBabelRc, addWebpackAlias,
  addLessLoader,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@static': path.resolve(__dirname, 'src/static/'),
    '@lib': path.resolve(__dirname, 'src/lib/'),
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#ff5b0a' }
  }),
);
