
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const host = '0.0.0.0';
const port = Number(process.env.PORT) || 3000;

// Troque pela URL exata do seu frontend na Vercel
const frontendUrl = 'https://SEU-FRONTEND.vercel.app';

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'troque-esta-chave',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  }
}));

app.use(authRoutes);
app.use(viewRoutes);
app.use(userRoutes);

function startServer(currentPort) {
  const server = app.listen(currentPort, host, () => {
    console.log(`Servidor rodando na porta ${currentPort}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Porta ${currentPort} em uso. Tentando ${currentPort + 1}...`);
      server.close(() => startServer(currentPort + 1));
      return;
    }

    console.error(err);
    process.exit(1);
  });
}

startServer(port);
