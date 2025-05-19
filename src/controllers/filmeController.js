const Filme = require('../models/filmeModel');

// Função para listar todos os filmes
const listarTodos = (req, res) => {
  Filme.getAllFilmes((err, results) => {
    if (err) {
      console.error('Erro ao listar filmes:', err);
      return res.status(500).json({ error: 'Erro ao recuperar filmes', details: err });
    }
    res.status(200).json(results);
  });
};

// Função para buscar filme por ID
const buscarPorId = (req, res) => {
  const id = req.params.id;
  Filme.getFilmeById(id, (err, results) => {
    if (err) {
      console.error('Erro ao buscar filme:', err);
      return res.status(500).json({ error: 'Erro ao buscar filme', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.status(200).json(results[0]);
  });
};

// Função para filtrar filmes por nome
const filtrarPorNome = (req, res) => {
  const nome = req.query.nome;
  if (!nome) {
    return res.status(400).json({ error: 'Parâmetro nome é obrigatório' });
  }

  Filme.getFilmesByFiltro(nome, (err, results) => {
    if (err) {
      console.error('Erro ao filtrar filmes:', err);
      return res.status(500).json({ error: 'Erro ao filtrar filmes', details: err });
    }
    res.status(200).json(results);
  });
};

// Função para inserir um novo filme
const inserirFilme = (req, res) => {
  const { nome, sinopse, data_lancamento, foto_capa, duracao } = req.body;

  if (!nome || !sinopse || !data_lancamento || !duracao) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios são necessários: nome, sinopse, data_lancamento e duracao' });
  }

  // Certifique-se de que a duração está no formato correto
  const duracaoRegex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
  if (!duracaoRegex.test(duracao)) {
    return res.status(400).json({ error: 'A duração precisa estar no formato HH:MM:SS' });
  }

  const dados = { nome, sinopse, data_lancamento, foto_capa, duracao };

  Filme.inserirFilme(dados, (err, results) => {
    if (err) {
      console.error('Erro ao inserir filme no banco:', err);
      return res.status(500).json({ error: 'Erro ao inserir filme', details: err });
    }
    res.status(201).json({ message: 'Filme inserido com sucesso', id: results.insertId });
  });
};

// Função para atualizar filme
const atualizarFilme = (req, res) => {
  const { id } = req.params;
  const { nome, sinopse, data_lancamento, foto_capa, duracao } = req.body;

  if (!nome || !sinopse || !data_lancamento || !duracao) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios são necessários: nome, sinopse, data_lancamento e duracao' });
  }

  // Certifique-se de que a duração está no formato correto
  const duracaoRegex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
  if (!duracaoRegex.test(duracao)) {
    return res.status(400).json({ error: 'A duração precisa estar no formato HH:MM:SS' });
  }

  const dados = [nome, sinopse, data_lancamento, foto_capa || null, duracao, id];

  Filme.atualizarFilme(dados, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar filme:', err);
      return res.status(500).json({ error: 'Erro ao atualizar filme', details: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.status(200).json({ message: 'Filme atualizado com sucesso' });
  });
};

// Função para deletar filme
const deletarFilme = (req, res) => {
  const { id } = req.params;

  Filme.deletarFilme(id, (err, results) => {
    if (err) {
      console.error('Erro ao deletar filme:', err);
      return res.status(500).json({ error: 'Erro ao deletar filme', details: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.status(200).json({ message: 'Filme deletado com sucesso' });
  });
};

module.exports = {
  listarTodos,
  buscarPorId,
  filtrarPorNome,
  inserirFilme,
  atualizarFilme,
  deletarFilme
};
