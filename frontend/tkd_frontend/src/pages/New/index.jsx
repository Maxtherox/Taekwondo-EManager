import { Header} from '../../components/Header'
import { useState } from 'react'
import { Container, Form } from './styles'
import { api } from '../../services/api'
import { Input } from '../../components/input'
import { Section} from '../../components/Section'
import { Button } from '../../components/button'
import { useNavigate } from 'react-router-dom'
import { ButtonText } from '../../components/ButtonText'

export function New(){
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1)
      }


    async function handleNewNote(){
        
        if (!name){
            return alert("Digite o titulo do campeonato")
        }

        await api.post("/championships",{
            name,
            location,
            date
        });

        alert("Campeonado criada com sucesso!")
        navigate(-1)
    }


    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar campeonato</h1>
                        <ButtonText title="voltar" onClick={handleBack}/>
                    </header>

                   
                    <Section title="Dados obrigatórios">
                         <Input 
                        placeholder="Nome do campeonato"
                        onChange={e => setName(e.target.value)}
                    />
                    </Section>

                    <Section title="Endereço">    
                    <Input 
                        placeholder="Localização"
                        onChange={e => setLocation(e.target.value)}
                    />
                    <Input 
                        placeholder="Data"
                        onChange={e => setDate(e.target.value)}
                        type="date"
                    />
                    </Section>
                    <Button 
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}