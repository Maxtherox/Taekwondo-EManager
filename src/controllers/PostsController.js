// src/controllers/postsController.js
const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const sanitizeHtml = require('sanitize-html'); // <--- Importar a biblioteca

// Configuração do sanitize-html (Exemplo - ajuste conforme necessário)
// Permite tags comuns de formatação, mas remove scripts, iframes, etc.
const sanitizeOptions = {
  allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br',
      'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
      'img', 'figure', 'figcaption', 'span' // Adicionado span
  ],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ],
    figure: [], // Permitir figure sem atributos específicos por padrão
    figcaption: [], // Permitir figcaption
    '*': [ 'style', 'class' ] // Permitir style e class em qualquer tag permitida (opcional, use com cautela)
    // Você pode ser mais restritivo aqui, ex: 'p': ['class']
  },
  // Permite iframes de fontes confiáveis (ex: YouTube, Vimeo) - opcional
  // allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  selfClosing: [ 'img', 'br', 'hr' ],
  // Permite esquemas de URL específicos
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src' ],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false, // false por padrão, mantém como está
  // Adiciona mais opções conforme sua necessidade...
};


class PostsController {
  // Criar um novo post (apenas admin)
  async create(request, response) {
    const { title, content } = request.body;
    const user_id = request.user.id;

    if (!title || typeof content !== 'string' ) { // Verifica se content é string
      throw new AppError("Título e conteúdo (como string) são obrigatórios.", 400);
    }

    // ---> SANITIZAR o HTML antes de salvar <---
    const sanitizedContent = sanitizeHtml(content, sanitizeOptions);

    const [postId] = await knex('posts').insert({
      title,
      content: sanitizedContent, // <<< Salva o conteúdo sanitizado
      user_id
    });

    // Retorna o conteúdo original ou sanitizado? Decida o padrão da sua API.
    // Geralmente retorna o que foi salvo.
    return response.status(201).json({ id: postId, title, content: sanitizedContent });
  }

  // Listar todos os posts
  async index(request, response) {
    const posts = await knex('posts')
      .select(
        'posts.id',
        'posts.title',
        'posts.content', // Omitir conteúdo na listagem pode ser bom para performance
         // Busca o conteúdo apenas na rota show/:id
        'posts.created_at',
        'posts.updated_at',
        'users.name as author_name'
      )
      .leftJoin('users', 'posts.user_id', 'users.id')
      .orderBy('posts.created_at', 'desc');

      // Adiciona uma versão truncada ou sem tags HTML para preview, se desejar
      const postsPreview = posts.map(post => {
          // Exemplo: remove todas as tags HTML para um preview simples de texto
          // const previewText = sanitizeHtml(post.content, { allowedTags: [], allowedAttributes: {} });
          // return { ...post, contentPreview: previewText.substring(0, 150) + '...' };
          // Por enquanto, vamos apenas retornar sem o conteúdo completo:
          return { ...post }; // Retorna sem 'content'
      });


    // O conteúdo já está sanitizado no banco. O frontend pode usar innerHTML com segurança.
    return response.json(postsPreview); // Retorna a lista (sem conteúdo completo talvez)
  }

  // Mostrar um post específico
  async show(request, response) {
    const { id } = request.params;

    const post = await knex('posts')
      .select(
        'posts.id',
        'posts.title',
        'posts.content', // <<< Busca o conteúdo completo aqui
        'posts.created_at',
        'posts.updated_at',
        'users.name as author_name'
      )
      .leftJoin('users', 'posts.user_id', 'users.id')
      .where('posts.id', id)
      .first();

    if (!post) {
      throw new AppError("Post não encontrado.", 404);
    }

    // O conteúdo já está sanitizado no banco. O frontend pode usar innerHTML com segurança.
    return response.json(post);
  }

  // Atualizar um post (apenas admin)
  async update(request, response) {
    const { title, content } = request.body;
    const { id } = request.params;

    const post = await knex('posts').where({ id }).first();

    if (!post) {
      throw new AppError("Post não encontrado.", 404);
    }

    let sanitizedContent = post.content; // Mantém o conteúdo existente por padrão
    if (typeof content === 'string') { // Só sanitiza se um novo conteúdo foi enviado
        // ---> SANITIZAR o HTML antes de salvar <---
        sanitizedContent = sanitizeHtml(content, sanitizeOptions);
    }

    const updatedTitle = title ?? post.title;

    await knex('posts').where({ id }).update({
      title: updatedTitle,
      content: sanitizedContent, // <<< Salva o conteúdo sanitizado
      updated_at: knex.fn.now()
    });

     // Retorna o conteúdo atualizado
    return response.json({ id, title: updatedTitle, content: sanitizedContent });
  }

  // Deletar um post (apenas admin)
  async delete(request, response) {
    const { id } = request.params;

    const post = await knex('posts').where({ id }).first();

    if (!post) {
      throw new AppError("Post não encontrado.", 404);
    }

    await knex('posts').where({ id }).delete();

    return response.status(204).send();
  }
}

module.exports = PostsController;