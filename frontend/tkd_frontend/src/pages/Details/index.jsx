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

export function Details() {
  const [data, setData] = useState(null);
  const [competitorsData, setCompetitorsData] = useState([]);
  const [matchups, setMatchups] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleOpenModal() {
    try {
      const response = await api.get(`/matchups/${params.id}`);

      // Define a ordem de prioridade dos grupos
      const priorityOrder = ['profissional', 'avançado', 'regular'];

      // Ordena os grupos com base na prioridade
      const sortedMatchups = Object.entries(response.data.matchups).sort(([keyA], [keyB]) => {
        const groupA = priorityOrder.indexOf(keyA.toLowerCase());
        const groupB = priorityOrder.indexOf(keyB.toLowerCase());
        return groupA - groupB;
      });

      // Converte de volta para objeto após ordenar
      setMatchups(Object.fromEntries(sortedMatchups));
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar matchups:', error);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/championships/${params.id}`);
      setData(response.data.championship);
    }

    fetchNote();
  }, [params.id]);

  useEffect(() => {
    async function fetchCompetitors() {
      const response = await api.get(`/championships/${params.id}`);
      setCompetitorsData(response.data.competitors);
    }

    fetchCompetitors();
  }, [params.id]);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText className="delete" title="Excluir campeonato" onClick={() => handleRemove()} />
            <h1>Nome: {data.name}</h1>
            <p>
              <strong>Endereço:</strong> {data.location}
            </p>
            <p>
              <strong>Inscrições:</strong> {data.total_subscriptions}
            </p>
            <NewNote onClick={handleOpenModal}>Gerar chaveamento</NewNote>
            <Button title="Voltar" onClick={handleBack} />
            <Section title="Participantes">
              {competitorsData.map((competitor) => (
                <div key={competitor.id}>
                  <Competitor
                    key={String(competitor.id)}
                    data={competitor}
                    onClick={() => handleDetails(competitor.id)}
                  />


                </div>
              ))}
            </Section>
          </Content>
        </main>
      )}
      {isModalOpen && <MatchupModal matchups={matchups} onClose={handleCloseModal} />}
    </Container>
  );
}
