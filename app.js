
const express = require('express');
const app = express();
const holidayRoutes = require('./routes/holidayRoutes');
const bodyParser = require('body-parser');


app.use(bodyParser.json());


app.use('/api/holidays', holidayRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
