const { Pool } = require('pg')

const pool = new Pool({
    host:'ec2-34-193-101-0.compute-1.amazonaws.com',
    user:'uqwknidmyhzlqq',
    password:'b2a21af35956852614f45115b121c2f9ddded5f2b956f40673ef50a87096389e',
    database:'da0cifse97h7a',
    port:5432,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool