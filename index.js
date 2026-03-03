const express = require('express');
const app = express();
app.use(express.json());

// Arrays de dados
let produtos = [
    { id: 1, nome: 'Pastel de Queijo', preco: 35.50, categoria: 'Pastel' },
    { id: 2, nome: 'Pastel Artesanal de catupiry', preco: 85.00, categoria: 'Pastel Artesanal' },
    { id: 3, nome: "Coca-Cola", preco: 28.00, categoria: "Bebidas" },
    { id: 4, nome: "Mousse", preco: 25.00, categoria: "Sobremesas" },
];


// --- ROTAS DE PRODUTOS ---

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// NOVO: Rota para filtrar produtos por nome da categoria
app.get('/produtos/categoria/:nomeCategoia', (req, res) => {
    const { nomeCategoria } = req.params;
    const produtosFiltrados = produtos.filter(
        p => p.categoria.toLowerCase() === nomeCategoria.toLowerCase()
    );
    res.json(produtosFiltrados);
});

app.post('/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;
    const novoProduto = { id: produtos.length + 1, nome, preco, categoria };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria } = req.body;
    const index = produtos.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    produtos[index] = { id: parseInt(id), nome, preco, categoria };
    res.json(produtos[index]);
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const listaOriginalLength = produtos.length;
    produtos = produtos.filter(p => p.id !== parseInt(id));

    if (produtos.length === listaOriginalLength) {
        return res.status(404).json({ mensagem: "Produto não encontrado para exclusão." });
    }
    res.status(204).send(); 
});

// --- ROTAS DE CATEGORIAS ---

// NOVO: Listar categorias
app.get('/categorias', (req, res) => {
    res.json(categorias);
});

// NOVO: Criar categoria
app.post('/categorias', (req, res) => {
    const { nome } = req.body;
    const novaCategoria = { id: categorias.length + 1, nome };
    categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));