import { Header } from '../../components/Header'
import { useState } from 'react'
import { Container, Form } from './styles'
import { api } from '../../services/api'
import { Input } from '../../components/input'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/button'
import { Link } from 'react-router-dom'
import { Note } from '../../components/Note'
import { useNavigate } from 'react-router-dom'
import { ButtonText } from '../../components/ButtonText'

export function NewCompetitor() {

    const [loading, setLoading] = useState(false);

    

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        weight: '',
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1)
    }



    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        // Implementar lógica de registro
        const {...dataToSend } = formData;
        console.log(dataToSend)
        api.post("/competitors", dataToSend)
            .then(() => {
                alert("Conta criada com sucesso!");
                navigate("/");  // Redireciona para a página inicial ou outra página desejada
                window.location.reload(); // Recarrega a página
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Houve um problema ao criar a conta.");
                }
            })

    };


    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Registrar participante</h1>
                        <ButtonText title="voltar" onClick={handleBack} />
                    </header>


                    <Section title="Dados obrigatórios">
                        <Input
                            placeholder="Nome compleo"
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Section>
                    <Section title="Outras informações">
                        <Input
                            placeholder="Idade"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder="peso"
                            id="weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />
                        <select name="gender" id="gender" defaultValue={'default'} onChange={handleChange} >
                            <option value="default" disabled>Selecione gênero</option>
                            <option value="masculino">masculino</option>
                            <option value="feminino">feminino</option>
                        </select>
                    </Section>



                    <Section title="Graduação">

                        <select name="belt" id="belt" defaultValue={'default'} onChange={handleChange} >
                            <option value="default" disabled>Selecione uma faixa</option>
                            <option value="branca">branca</option>
                            <option value="amarela">amarela</option>
                            <option value="ponta verde">ponta verde</option>
                            <option value="verde">verde</option>
                            <option value="ponta azul">ponta azul</option>
                            <option value="azul">azul</option>
                            <option value="ponta vermelha">ponta vermelha</option>
                            <option value="vermelha"> vermelha</option>
                            <option value="ponta preta"> ponta preta</option>
                            <option value="candidato"> candidato</option>
                            <option value="preta"> preta</option>
                        </select>
                    </Section>
                    <Button
                        title="Salvar"
                        onClick={handleRegister}
                    />
                </Form>
            </main>
        </Container>
    )
}