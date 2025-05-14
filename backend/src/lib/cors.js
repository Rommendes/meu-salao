import cors from 'cors';

export default cors({
  origin: '*',
  methods: ['GET', 'POST'],
});

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // ou a URL do seu frontend
};

app.use(cors(corsOptions));
