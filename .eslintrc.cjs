/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['./node_modules/@tkvlnk/configs/eslint/base.js'],
  parserOptions: {
    project: './tsconfig.json'
  }
};
