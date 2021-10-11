const Joi = require("joi");

// Define validation for all the env vars
const envVarsSchema = Joi.object({
  // NODE
  REACT_APP_ENV: Joi.string()
    .allow("dev", "prod", "local", "test", "provision")
    .description("Current environment for API"),
  // FIREBASE
  REACT_APP_FIREBASE_API_KEY: Joi.string()
    .required()
    .description("API key required to use HACS firebase tools"),
  REACT_APP_FIREBASE_AUTH_DOMAIN: Joi.string()
    .required()
    .description("HACS firebase app"),
  REACT_APP_FIREBASE_DATABASE_URL: Joi.string()
    .required()
    .description("HACS firebase database (firestore)"),
  REACT_APP_FIREBASE_PROJECT_ID: Joi.string()
    .required()
    .description("HACS project ID"),
  REACT_APP_FIREBASE_STORAGE_BUCKET: Joi.string()
    .required()
    .description("HACS firebase storage bucket"),
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: Joi.number()
    .required()
    .description("HACS firebase storage bucket"),
  REACT_APP_FIREBASE_APP_ID: Joi.string()
    .required()
    .description("HACS firebase app ID"),
  REACT_APP_FIREBASE_MEASUREMENT_ID: Joi.string()
    .required()
    .description("HACS firebase measurement ID"),
})
  .unknown()
  .required();

// Validate env vars against schema
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

var url;
switch (envVars.REACT_APP_ENV) {
  case "dev":
    url = process.env.REACT_APP_DEV_URL;
    break;
  case "prod":
    url = process.env.REACT_APP_PROD_URL;
    break;
  default:
    url = process.env.REACT_APP_LOCAL_URL;
}

// Define config for backend
const config = {
  env: envVars.REACT_APP_ENV,
  url: url,
  firebaseConfig: {
    apiKey: envVars.REACT_APP_FIREBASE_API_KEY,
    authDomain: envVars.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: envVars.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: envVars.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: envVars.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.REACT_APP_FIREBASE_APP_ID,
    measurementId: envVars.REACT_APP_FIREBASE_MEASUREMENT_ID,
  },
};

module.exports = config;
