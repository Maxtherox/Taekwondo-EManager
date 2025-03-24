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
                    <h1>Taekwondo WT</h1>
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
                </Content>
                <div className="botaoamarelo">
                    <Button onClick={handleClick} title="+ criar participantes" />
                </div>

                <NewNote to="/new">
                    + criar campeonato
                </NewNote>
            </>
            ) : null}
        </Container>
    );
}
