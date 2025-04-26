import { FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/input';
import { Note } from '../../components/Note';
import { useNavigate } from 'react-router-dom';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { api } from '../../services/api';
import { Button } from '../../components/button';
import { Competitor } from '../../components/Competitor';
import { USER_ROLE } from '../../utils/roles';
import { useAuth } from '../../hooks/auth';


export function Home() {
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const [competitors, setCompetitors] = useState([]);
    // ---> Novo estado para armazenar os posts <---
    const [posts, setPosts] = useState([]);

    const { signOut, user } = useAuth()

    const navigate = useNavigate();

    async function handleClick() {
        navigate("/newcompetitor");
    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }

    function handleDetailsCompetitors(id) {
        navigate(`/detailscompetitors/${id}`);
    }
    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/championships?name=${search}`);
            setNotes(response.data);
        }
        fetchNotes();
    }, [search]);

    useEffect(() => {
        async function fetchCompetitors() {
            const response = await api.get(`/competitors?name=${search}`);
            setCompetitors(response.data);
        }
        fetchCompetitors();
    }, [search]);

     // ---> Novo useEffect para buscar os posts <---
    useEffect(() => {
        async function fetchPosts() {
            try {
                // Busca os posts da nova rota /posts
                const response = await api.get("/posts");
                // Define o estado com os posts recebidos
                // Ajuste 'response.data' se sua API retornar os posts dentro de outra chave
                setPosts(response.data);
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
                // Adicione feedback visual para o usuário se desejar
                // Ex: setPostsError("Não foi possível carregar os artigos.");
            }
        }

        // Chama a função para buscar os posts quando o componente montar
        fetchPosts();
    }, []); // Array de dependências vazio para executar apenas uma vez

    function handleSignOut() {
        navigate("/")
        signOut();
    }

    return (
        <Container>
            {user.role === USER_ROLE.CUSTOMER && (<>
                <h1 style=
                    {
                        {
                            fontSize: '32px',
                            textAlign: "center",
                            width: "100vw",
                            margin: "400px 0",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center"
                        }
                    }
                >
                    Faça login como administrador, rotas de usuários em construção...
                    <button onClick={handleSignOut} style=
                        {
                            {
                                width: "20rem",
                                padding: "10px",
                                margin: "10px auto",
                                borderRadius: "4px"
                            }
                        }
                    >
                        logout
                    </button>
                </h1>
            </>
            )}
            {user.role === USER_ROLE.ADMIN ? (<>
                <Brand>
                    <h1>Taekwondo WT                 <NewNote to="/newpost">
                    + criar campeonato
                </NewNote></h1>
                </Brand>
                <Header />
                <Menu>
                    <li>
                        <ButtonText
                            title="Campeonatos"
                            isActive={true}
                        />
                    </li>
                </Menu>
                <Search>
                    <Input
                        placeholder="Pesquisar pelo título"
                        icon={FiSearch}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Search>

                <Content>
                    <Section title="Campeonatos">
                        {notes.map(note => (
                            <Note
                                key={note.id}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))}
                    </Section>
                    <Section title="Cadastros">
                        {competitors.map(competitor => {
                            return (<Competitor
                                key={competitor.id}
                                data={competitor}
                                onClick={() => handleDetailsCompetitors(competitor.id)}
                            />)
                        })}
                    </Section>
                    <Section title="Exames de faixa">
                    </Section>
                    {/* ---> Nova Seção para exibir os Posts <--- */}
                    <Section title="Artigos e Ensino">
                        {posts && posts.length > 0 ? (
                            posts.map(post => (
                                <article className='post-content' key={post.id} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
                                    {/*
                                        ATENÇÃO: dangerouslySetInnerHTML é necessário para renderizar HTML.
                                        Use isso SOMENTE porque você está (ou deveria estar) SANITIZANDO
                                        o HTML no backend ANTES de salvar no banco.
                                        Se o HTML não for sanitizado no backend, isso é uma VULNERABILIDADE DE SEGURANÇA (XSS).
                                    */}
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                    <footer style={{ marginTop: '1rem', fontSize: '0.8em', color: '#555' }}>
                                        Autor: {post.author_name || 'Desconhecido'} | Publicado em: {new Date(post.created_at).toLocaleDateString()}
                                    </footer>
                                </article>
                            ))
                        ) : (
                            <p>Nenhum artigo encontrado.</p>
                            // Você pode adicionar um indicador de carregamento aqui enquanto busca os posts
                        )}
                    </Section>
                </Content>
                
                <NewNote to="/newposts">
                    + criar post
                </NewNote>
                <NewNote to="/new">
                    + criar campeonato
                </NewNote>
            </>
            ) : null}
        </Container>
    );
}
