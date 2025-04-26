import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importar ReactQuill e seus estilos
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilo padrão 'snow'

import { Container, Form, QuillWrapper } from './styles'; // Estilos que criaremos
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ButtonText } from '../../components/ButtonText';
import { Section } from '../../components/Section'; // Para agrupar
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth'; // Para verificar se é admin (opcional aqui, rota já protege)

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Estado para guardar o HTML do editor
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth(); // Pode usar para alguma lógica extra se necessário

  // Módulos para configurar a barra de ferramentas do Quill
  // Veja a documentação do ReactQuill para mais opções: https://github.com/zenoamaro/react-quill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'], // Adicionar imagem pode exigir configuração extra no backend/upload
      [{ 'color': [] }, { 'background': [] }], // Seletores de cor
      [{ 'font': [] }], // Seletores de fonte (pode precisar importar fontes)
      [{ 'align': [] }], // Seletores de alinhamento
      ['clean'] // Botão para remover formatação
    ],
  };

  // Formatos permitidos pelo Quill (deve alinhar com sua sanitização backend)
  const quillFormats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background', 'align'
  ];


  function handleBack() {
    navigate(-1); // Volta para a página anterior
  }

  async function handleSavePost() {
    if (!title) {
      return alert('Por favor, preencha o título do post.');
    }
    if (!content || content === '<p><br></p>') { // Verifica se o conteúdo não está vazio
      return alert('Por favor, escreva o conteúdo do post.');
    }

    setLoading(true);

    try {
      await api.post('/posts', { title, content });
      alert('Post criado com sucesso!');
      navigate('/'); // Volta para a Home após salvar
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possível salvar o post.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar Novo Post</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Section title="Título do Post">
            <Input
              placeholder="Insira o título aqui"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Section>

          <Section title="Conteúdo do Post">
            {/* Usamos um wrapper para poder estilizar o container do Quill */}
            <QuillWrapper>
              <ReactQuill
                theme="snow" // Tema padrão
                value={content}
                onChange={setContent} // Atualiza o estado com o HTML gerado
                modules={quillModules}
                formats={quillFormats}
                placeholder="Escreva o conteúdo do artigo aqui..."
              />
            </QuillWrapper>
          </Section>

          <Button
            title={loading ? 'Salvando...' : 'Salvar Post'}
            onClick={handleSavePost}
            disabled={loading}
            style={{ marginTop: '16px' }} // Adiciona um espaçamento
          />
        </Form>
      </main>
    </Container>
  );
}