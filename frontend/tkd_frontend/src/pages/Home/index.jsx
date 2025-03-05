import {FiPlus, FiSearch} from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import { useState, useEffect } from 'react'
import { Header} from '../../components/Header'
import { Input} from '../../components/input'
import { Note } from '../../components/Note'
import { useNavigate } from 'react-router-dom'
import { Section} from '../../components/Section'
import { ButtonText} from '../../components/ButtonText'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import { Button } from '../../components/button'
import { Competitor } from '../../components/Competitor'

export function Home(){
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [ notes, setNotes] = useState([]);
    const [ competitors, setCompetitors] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagsSelected([])
        }
        const alreadySelected = tagsSelected.includes(tagName);

        if (alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);

        }else{
            setTagsSelected(prevState => [...prevState, tagName]);
        }
        
    }

    async function handleClick() {
        navigate("/newcompetitor")
    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags")
            setTags(response.data)
        }
        fetchTags();
    },[])

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/championships?name=${search}`);
            setNotes(response.data);
        }
        fetchNotes();
        
    },[tagsSelected, search]);
    useEffect(() => {
        async function fetchCompetitors(){
            const response = await api.get(`/competitors?name=${search}`);
            setCompetitors(response.data);
        }
        fetchCompetitors();
        
    },[tagsSelected, search]);

    return(
        <Container>
            <Brand>
             <h1>Taekwondo WT</h1>
            </Brand>
            <Header/>

            <Menu>
            <li>
                <ButtonText 
                title="Campeonatos"
                 isActive={tagsSelected.length === 0}
                 onClick={() => handleTagSelected("all")}
                 />
            </li> 
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li> 
                    ))
                    
                }
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
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
                <Section title="Cadastros">
                    {
                        competitors.map(competitor => (
                            <Competitor 
                                key={String(competitor.id)}
                                data={competitor}
                                onClick={() => handleDetails(competitor.id)}
                            />
                        ))
                    }
                </Section>
                <Section title="Exames de faixa">

                </Section>
                
            </Content>
            <div className="botaoamarelo" >
               <Button onClick={handleClick} title="+ criar participantes"/> 
            </div>
                       
            <NewNote to="/new">
                +
                criar campeonato
            </NewNote>
            

        </Container>
    );
}