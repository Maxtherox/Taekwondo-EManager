import { Container, BeltIndicator } from "./styles";

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
    const gradient = beltGradients[data.belt] || "#FFFFFF"; // Fallback para faixa branca

    return (
        <Container {...rest}>
            <BeltIndicator style={{ background: gradient }} />
            <h4>{data.name}</h4>
            <div>
                <p>
                    <strong>Graduação:</strong> faixa {data.belt}
                </p>
                <p>
                    <strong>Gênero:</strong> {data.gender}
                </p>
            </div>
        </Container>
    );
}
