const { Client } = require('pg');
require('dotenv').config();

// Define a custom type parser for converting snake_case to camelCase
const types = require('pg').types;
types.setTypeParser(types.builtins.NAME, (value) => {
  console.log('types', value);
  return value.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
});

// Create a new instance of the Client class
const client = new Client({
  // Configure the PostgreSQL connection details
  connectionString: process.env.DATABASE_URL,
  camelCase: true,
});

client.connect(() => {
  console.log('connected to the db');
});

module.exports = client;
