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
        "require-jsdoc": "warn",
        "valid-jsdoc": "warn"
    }
};