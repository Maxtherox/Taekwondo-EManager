import { Container, Form, Main, Wallpaper, WallpaperContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import {Input} from "../../components/input";

import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function Login(){
    const navigate = useNavigate()

    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        birth_date: '',
        cpf: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    function handleSignIn(e) {
        e.preventDefault();
        setLoading(true);
      
        const emailData = formData.email;
        const passwordData = formData.password;
      
        console.log(emailData, passwordData);
        console.log(typeof emailData, typeof passwordData);
      
        // Corrigindo o nome da chave de 'name' para 'email'
        const userLogin = {
          email: emailData,
          password: passwordData,
        };
      
        console.log(userLogin);
        console.log(typeof userLogin);
      
        // Passe o objeto userLogin diretamente para a função signIn
        signIn(userLogin)
          .finally(() => {
            setLoading(false);
          });
      }
    return(
        <Container>
            <Main>
            <Form>
                <h1>Taekwondo E-Manager</h1>
                <p>Site para gerenciar campeonatos e gerar pareamentos de lutas</p>
                <fieldset>
                    <legend>Faça seu login</legend>
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
                    <Button 
                        title={"Entrar"}
                        onClick={handleSignIn}
                        loading={loading}
                    />
                    <Link to="/signIn">Crie uma conta</Link>
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
