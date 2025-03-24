import { useState } from "react";
import { Container, BeltIndicator, CardFront, CardBack } from "./styles";

const beltGradients = {
    "branca": "#FFFFFF",
    "amarela": "#FFD700",
    "verde": "#008000",
    "azul": "#0000FF",
    "vermelha": "#FF0000",
    "preta": "#000000",
    "ponta verde": "linear-gradient(90deg, #FFD700 50%, #008000 50%)",
    "ponta azul": "linear-gradient(90deg, #008000 50%, #0000FF 50%)",
    "ponta vermelha": "linear-gradient(90deg, #0000FF 50%, #FF0000 50%)",
    "ponta preta": "linear-gradient(90deg, #FF0000 50%, #000000 50%)",
    "candidato": "linear-gradient(180deg, #000000 50%, #FF0000 50%)",
};

export function Competitor({ data, ...rest }) {
    const [ishovered, setIsHovered] = useState(false);
    const gradient = beltGradients[data.belt] || "#FFFFFF";

    return (
        <Container
            {...rest}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            $ishovered={ishovered} // Usando $ishovered aqui
        >
            <BeltIndicator style={{ background: gradient }} />
            <CardFront $ishovered={ishovered}> 
                <h4>{data.name}</h4>
                <div>
                    <p><strong>Graduação:</strong> faixa {data.belt}</p>
                    <p><strong>Gênero:</strong> {data.gender}</p>
                </div>
            </CardFront>
            <CardBack $ishovered={ishovered}> 
                <h4>Competidor</h4>
                <div>
                    <p><strong>Nome:</strong> {data.name}</p>
                    <p><strong>Idade:</strong> {data.age}</p>
                    <p><strong>Peso:</strong> {data.weight} kg</p>
                    <p><strong>Criado por:</strong> {data.created_by}</p>
                </div>
            </CardBack>
        </Container>
    );
}