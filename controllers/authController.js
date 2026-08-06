const bcrypt = require('bcryptjs');
const db = require('../db');

function registerUser(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.send('Preencha todos os campos.');
  }

  const hash = bcrypt.hashSync(senha, 10);
  db.run('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], (err) => {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.send('Este e-mail já está cadastrado.');
      }
      return res.send('Erro ao cadastrar usuário.');
    }
    res.redirect('/');
  });
}

function loginUser(req, res) {
  const { email, senha } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err || !row) {
      return res.send('Usuário não encontrado.');
    }

    const senhaValida = bcrypt.compareSync(senha, row.senha);
    if (!senhaValida) {
      return res.send('Senha incorreta.');
    }

    req.session.user = { id: row.id, nome: row.nome, email: row.email };
    res.redirect('/');
  });
}

function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

function deleteUser(req, res) {
  if (!req.session.user) {
    return res.redirect('/');
  }

  const userId = req.session.user.id;
  db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      return res.send('Erro ao excluir conta.');
    }

    req.session.destroy(() => {
      res.redirect('/');
    });
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
};
