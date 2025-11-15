const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bebidasRoutes = require('./routes/bebidasRoutes');
const docesRoutes = require('./routes/docesRoutes');
const salgadosRoutes = require('./routes/salgadosRoutes');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bebidasRoutes);
app.use('/api', docesRoutes);
app.use('/api', salgadosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
