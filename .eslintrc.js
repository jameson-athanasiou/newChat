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
        "max-len": [2, 100],
        "no-alert": "error",
        "no-debugger": "error",
        "require-jsdoc": "warn",
        "valid-jsdoc": "warn"
    }
};