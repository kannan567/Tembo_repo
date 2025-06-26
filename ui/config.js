#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Safely get environment variable with fallback
const getEnvVar = (name, defaultValue = '') => {
  const value = process.env[name] || defaultValue;
  // Basic validation - ensure it's a valid URL or empty string
  if (value && !value.match(/^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(:[0-9]+)?(\/[^/]*)*$/) && !value.match(/^(http:\/\/)?localhost(:[0-9]+)?(\/[^/]*)*$/)) {
    console.warn(`Warning: ${name} environment variable contains potentially unsafe value`);
    return defaultValue;
  }
  return value;
};

// Create config data
const configData = {
  baseURL: getEnvVar('SERVER_URL')
};

// Ensure target directory exists
const configPath = path.join(__dirname, 'src', 'config.json');

// Write config file
console.log('Creating src/config.json');
fs.writeFileSync(
  configPath,
  JSON.stringify(configData, null, 4),
  'utf8'
);

console.log('Configuration file created successfully');