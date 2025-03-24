import React, { useState, useEffect } from 'react';
import { Container, Content, NewNote } from './styles';
import { Button } from '../../components/button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { MatchupModal } from '../../components/MatchupModal';
import { Competitor } from '../../components/Competitor';



export function DetailsCompetitors() {
  const [data, setData] = useState(null);
  const [competitorsData, setCompetitorsData] = useState([]);
  const [matchups, setMatchups] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  console.log("Id recebido: ", id); //Adicione essa linha

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/competitors/${params.id}`);
      console.log(response)
      setData(response.data);
    }

    fetchNote();
  }, [params.id]);
  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText className="delete" title="Excluir campeonato" onClick={() => handleRemove()} />
            <h1>Nome: {data.name}</h1>
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}
