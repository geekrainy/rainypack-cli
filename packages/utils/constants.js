const CORE_PATH_PREFIX = {
  default: 'lib',
  ts: 'ts'
}
const CORE_IGNORE_LIST = [
  '.DS_Store',
  '.git',
  'node_modules',
  'package.json',
  '*.bak',
  '*.*.bak',
  '*.tmp',
  '*.swp'
]
const TS_CORE_IGNORE_LIST = [
  'src',
  '.eslintrc.js',
  'yarn.lock',
  'webpack.common.js',
]
const CORE_NAME = {
  webpack: 'rainypack-webpack',
  rollup: 'rainypack-rollup'
}
const CORE_TYPE = {
  default: 'default',
  ts: 'ts',
}

module.exports = {
  CORE_PATH_PREFIX,
  CORE_IGNORE_LIST,
  TS_CORE_IGNORE_LIST,
  CORE_NAME,
  CORE_TYPE
}
