module.exports = {
    "extends": "google",
     "env": {
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
     },
    "rules": {
        "no-alert": "error",
        "no-debugger": "error",
        "require-jsdoc": "warn",
        "valid-jsdoc": "warn"
    }
};