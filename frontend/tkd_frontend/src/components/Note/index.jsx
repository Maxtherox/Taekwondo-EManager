import { Container } from "./styles";


export function Note({data, ...rest}){
    return(
        <Container {...rest}>
            <h2>{data.name}</h2>
            <div>
            <h2>{data.location}</h2>
            <p>{data.date}</p> 
            </div>      
        </Container>
    );
}