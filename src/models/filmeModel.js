const db = require('../config/db');

// Função para listar todos os filmes
const getAllFilmes = (callback) => {
  db.query('SELECT * FROM tbl_filme', callback);
};

// Função para buscar filme por ID
const getFilmeById = (id, callback) => {
  db.query('SELECT * FROM tbl_filme WHERE id = ?', [id], callback);
};

// Função para filtrar filmes por nome ou sinopse
const getFilmesByFiltro = (nome, callback) => {
  const query = `SELECT * FROM tbl_filme WHERE nome LIKE ? OR sinopse LIKE ?`;
  const search = `%${nome}%`;
  db.query(query, [search, search], callback);
};

// Função para inserir filme
const inserirFilme = (dados, callback) => {
  const { nome, sinopse, data_lancamento, foto_capa, duracao } = dados;
  
  const query = 'INSERT INTO tbl_filme (nome, sinopse, data_lancamento, foto_capa, duracao) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome, sinopse, data_lancamento, foto_capa || null, duracao], (err, results) => {
    if (err) {
      console.error('Erro ao inserir filme no banco:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para atualizar filme
const atualizarFilme = (dados, callback) => {
  const query = 'UPDATE tbl_filme SET nome = ?, sinopse = ?, data_lancamento = ?, foto_capa = ?, duracao = ? WHERE id = ?';
  db.query(query, dados, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar filme no banco:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Função para deletar filme
const deletarFilme = (id, callback) => {
  const query = 'DELETE FROM tbl_filme WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar filme no banco:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  getAllFilmes,
  getFilmeById,
  getFilmesByFiltro,
  inserirFilme,
  atualizarFilme,  
  deletarFilme    
};
