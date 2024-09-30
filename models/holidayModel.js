
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, '../database/holidays.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to the database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS holidays (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            month TEXT NOT NULL,
            name TEXT NOT NULL
        )
    `);
});


const addHoliday = (holiday, callback) => {
    const { date, month, name } = holiday;
    const query = `INSERT INTO holidays (date, month, name) VALUES (?, ?, ?)`;
    db.run(query, [date, month, name], function (err) {
        callback(err, this.lastID);
    });
};


const getHolidays = (callback) => {
    const query = `SELECT * FROM holidays`;
    db.all(query, (err, rows) => {
        callback(err, rows);
    });
};

module.exports = {
    addHoliday,
    getHolidays,
};
