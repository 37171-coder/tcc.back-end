const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'tcc-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(authRoutes);
app.use(viewRoutes);
app.use(userRoutes);

app.listen(port, host, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Acesse também pela rede usando http://<SEU_IP>:${port}`);
});
