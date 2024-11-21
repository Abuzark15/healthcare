const express = require('express');
const sequelize = require('./db-config/dbconfig')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use('/uploads', express.static('uploads'));

app.use('/api/patients', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/common' ,loginRoutes);





sequelize.sync({alter : true}).then(() => {
    app.listen(2549, () => {
        console.log(`Server is running on http://localhost:`);
    });
}).catch(err => console.error('Unable to connect to the database:', err));