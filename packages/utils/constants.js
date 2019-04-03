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
const CORE_NAME = {
  webpack: 'rainypack-webpack',
  rollup: 'rainypack-rollup'
}
const CORE_TYPE = {
  default: 'master',
  ts: 'ts',
}

module.exports = {
  CORE_IGNORE_LIST,
  CORE_NAME,
  CORE_TYPE
}
