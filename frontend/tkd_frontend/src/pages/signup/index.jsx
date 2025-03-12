import { Container, Form, Main, Wallpaper, WallpaperContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

import { api } from "../../services/api";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
    const navigate = useNavigate()

    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: "",
        belt: ''
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        // Implementar lógica de registro
        const { confirmPassword, ...dataToSend } = formData;
        console.log(dataToSend)
        api.post("/users", dataToSend)
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
            <Main>
                <Form>
                    <h1>Taekwondo - Liga nacional</h1>
                    <fieldset>
                        <legend>Formulário de cadastro</legend>
                        <label htmlFor="name">Nome completo</label>
                        <Input
                            placeholder="Insira seu nome completo"
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">E-mail</label>
                        <Input
                            placeholder="exemplo@exemplo.com"
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Senha</label>
                        <Input
                            placeholder="Insira sua senha"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label htmlFor="age">Idade</label>
                        <Input
                            placeholder="Insira sua idade"
                            type="number"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                        <label htmlFor="belt" >Graduação de faixa</label>
                        <select name="belt" id="belt" defaultValue={'default'} onChange={handleChange} >
                            <option value="default" disabled>Selecione uma faixa</option>
                            <option value="ponta vermelha">ponta vermelha</option>
                            <option value="vermelha"> vermelha</option>
                            <option value="ponta preta"> ponta preta</option>
                            <option value="candidato"> candidato</option>
                            <option value="preta"> preta</option>
                        </select>
                        <Button
                            title={"Cadastrar"}
                            onClick={handleRegister}
                            loading={loading}
                        />
                        <Link to="/">Voltar</Link>
                    </fieldset>
                </Form>
                <Wallpaper>
                    <WallpaperContainer>
                       


                    </WallpaperContainer>

                </Wallpaper>
            </Main>

        </Container>
    )
}
