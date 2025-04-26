import React, { useState, useEffect, useMemo } from 'react'; // Adicionado useMemo
import { Container, Content, NewNote } from './styles';
import { Button } from '../../components/button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { MatchupModal } from '../../components/MatchupModal';
import { Competitor } from '../../components/Competitor';
import Select from 'react-select'; // <<< Importar react-select

export function Details() {
  // Estados existentes
  const [data, setData] = useState(null); // Detalhes do campeonato
  const [competitorsData, setCompetitorsData] = useState([]); // Competidores JÁ inscritos
  const [matchups, setMatchups] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---> Novos Estados para adicionar competidores <---
  const [allCompetitors, setAllCompetitors] = useState([]); // Guarda TODOS os competidores do sistema
  const [selectedCompetitors, setSelectedCompetitors] = useState([]); // Guarda os selecionados no dropdown { value: id, label: name }
  const [isLoadingAdd, setIsLoadingAdd] = useState(false); // Estado de loading do botão "Adicionar"
  const [isLoadingAllCompetitors, setIsLoadingAllCompetitors] = useState(true); // Estado de loading para busca inicial

  const params = useParams();
  const navigate = useNavigate();

  // Função para buscar detalhes do campeonato (você já tinha)
  async function fetchChampionshipDetails() {
    try {
      const response = await api.get(`/championships/${params.id}`);
      setData(response.data.championship);
      // Note: A lista de competidores inscritos vem aqui também
      setCompetitorsData(response.data.competitors || []); // Garante que seja um array
    } catch(error) {
        console.error("Erro ao buscar detalhes do campeonato:", error);
        // Adicionar tratamento de erro, talvez redirecionar ou mostrar mensagem
        setData(null); // Limpa dados em caso de erro
        setCompetitorsData([]);
    }
  }

   // Função para buscar TODOS os competidores cadastrados
   async function fetchAllCompetitors() {
    setIsLoadingAllCompetitors(true);
    try {
      const response = await api.get('/competitors'); // Endpoint que lista todos
      setAllCompetitors(response.data || []); // Garante que seja um array
    } catch (error) {
      console.error("Erro ao buscar todos os competidores:", error);
      setAllCompetitors([]); // Limpa em caso de erro
      // Adicionar feedback ao usuário, se necessário
    } finally {
        setIsLoadingAllCompetitors(false);
    }
  }

  // Efeito para buscar detalhes do campeonato e inscritos ao montar/mudar ID
  useEffect(() => {
    fetchChampionshipDetails();
  }, [params.id]);

  // Efeito para buscar TODOS os competidores ao montar o componente
  useEffect(() => {
    fetchAllCompetitors();
  }, []); // Executa apenas uma vez

  // --- Lógica para filtrar competidores disponíveis ---
  // Memoize para evitar recálculos desnecessários
  const subscribedCompetitorIds = useMemo(() => {
      // Certifica que competitorsData existe e tem IDs antes de mapear
      return new Set(competitorsData?.map(c => c.id) || []);
  }, [competitorsData]);

  const availableCompetitorsOptions = useMemo(() => {
      return allCompetitors
          .filter(competitor => !subscribedCompetitorIds.has(competitor.id)) // Filtra quem JÁ está inscrito
          .map(competitor => ({ // Formata para o react-select
              value: competitor.id,
              label: `${competitor.name} (${competitor.belt})` // Exibe nome e faixa
          }));
  }, [allCompetitors, subscribedCompetitorIds]);
  // --- Fim da lógica de filtro ---

  // --- Funções de Ação ---
  function handleBack() {
    navigate(-1);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleOpenModal() {
    // Seu código existente para buscar e abrir o modal de chaveamento...
     try {
      const response = await api.get(`/matchups/${params.id}`);
      const priorityOrder = ['profissional', 'avançado', 'regular'];
      const sortedMatchups = Object.entries(response.data.matchups).sort(([keyA], [keyB]) => {
        const groupA = priorityOrder.indexOf(keyA.toLowerCase());
        const groupB = priorityOrder.indexOf(keyB.toLowerCase());
        return groupA - groupB;
      });
      setMatchups(Object.fromEntries(sortedMatchups));
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar matchups:', error);
       alert('Não foi possível gerar o chaveamento. Verifique se há competidores suficientes.');
    }
  }

  // Função para adicionar os competidores selecionados
  async function handleAddSelectedCompetitors() {
    if (selectedCompetitors.length === 0) {
        alert("Selecione pelo menos um competidor para adicionar.");
        return;
    }
    setIsLoadingAdd(true);

    // Cria um array de Promises, uma para cada POST na API
    const addPromises = selectedCompetitors.map(selected =>
        api.post('/subscriptions', {
            competitor_id: selected.value, // ID do competidor
            championship_id: params.id      // ID do campeonato atual
        }).catch(err => {
            // Captura erros individuais para informar qual falhou (opcional)
            console.error(`Erro ao adicionar ${selected.label}:`, err);
            return { error: true, label: selected.label }; // Retorna um objeto de erro
        })
    );

    try {
        const results = await Promise.all(addPromises); // Espera todas as requisições terminarem

        const failed = results.filter(r => r?.error); // Filtra os que falharam

        if (failed.length > 0) {
            alert(`Erro ao adicionar os seguintes competidores: ${failed.map(f => f.label).join(', ')}`);
        } else {
            alert('Competidores adicionados com sucesso!');
        }

        setSelectedCompetitors([]); // Limpa a seleção no dropdown
        fetchChampionshipDetails(); // RECARREGA os dados do campeonato (incluindo a lista de inscritos)

    } catch (error) {
        // Este catch geral é menos provável de ser atingido com o .catch individual, mas é bom ter
        console.error("Erro geral ao adicionar competidores:", error);
        alert('Ocorreu um erro inesperado ao adicionar competidores.');
    } finally {
        setIsLoadingAdd(false);
    }
  }

  // ATENÇÃO: A função handleRemove para o botão "Excluir campeonato" não está definida.
  // Você precisará implementá-la se quiser que o botão funcione.
  async function handleRemoveChampionship() {
      if(window.confirm("Tem certeza que deseja excluir este campeonato e todas as suas inscrições?")) {
          try {
              await api.delete(`/championships/${params.id}`);
              alert('Campeonato excluído com sucesso!');
              navigate('/'); // Volta para home
          } catch (error) {
              console.error("Erro ao excluir campeonato:", error);
              alert('Não foi possível excluir o campeonato.');
          }
      }
  }
   // Função para navegar para detalhes do competidor (se necessário)
   function handleDetailsCompetitors(id) {
    navigate(`/detailscompetitors/${id}`);
    }

  // --- JSX ---
  return (
    <Container>
      <Header />
      {/* Verifica se 'data' (detalhes do camp.) carregou */}
      {data ? (
        <main>
          <Content>
            {/* Botão Excluir Campeonato */}
            <ButtonText
                className="delete"
                title="Excluir campeonato"
                onClick={handleRemoveChampionship} // <<< Usar a função correta
                style={{ alignSelf: 'flex-end', color: '#e40c17' }} // Exemplo de estilo direto
             />

            {/* Informações do Campeonato */}
            <h1>Nome: {data.name}</h1>
            <p><strong>Endereço:</strong> {data.location}</p>
            <p><strong>Data:</strong> {new Date(data.date).toLocaleDateString()}</p> {/* Formatar data */}
            <p><strong>Inscritos:</strong> {competitorsData?.length || 0}</p> {/* Mostra contagem atual */}

            {/* Seção para Adicionar Participantes */}
            <Section title="Adicionar Participantes ao Campeonato">
                <Select
                    isMulti // Permite selecionar múltiplos
                    options={availableCompetitorsOptions} // Lista de competidores disponíveis
                    value={selectedCompetitors} // Estado que guarda os selecionados
                    onChange={setSelectedCompetitors} // Função para atualizar o estado ao selecionar/deselecionar
                    placeholder="Buscar competidores..."
                    isLoading={isLoadingAllCompetitors} // Mostra indicador de loading enquanto busca todos
                    noOptionsMessage={() => availableCompetitorsOptions.length === 0 && !isLoadingAllCompetitors ? 'Nenhum competidor disponível ou todos já inscritos.' : 'Carregando...'}
                    styles={{ // Estilização básica (opcional, pode fazer via CSS global/wrapper)
                        container: (base) => ({ ...base, marginBottom: '1rem' }),
                        // Pode adicionar mais customizações aqui
                    }}
                />
                <Button
                    title={isLoadingAdd ? "Adicionando..." : "Confirmar Inscrições"}
                    onClick={handleAddSelectedCompetitors}
                    disabled={selectedCompetitors.length === 0 || isLoadingAdd}
                    style={{ width: 'auto', padding: '10px 20px', marginLeft: 'auto', display: 'block' }} // Ajuste de estilo
                />
            </Section>
             {/* Botões Inferiores */}
             <NewNote onClick={handleOpenModal} style={{marginTop: '1rem'}}>Gerar chaveamento</NewNote>
             <Button title="Voltar" onClick={handleBack} style={{marginTop: '2rem'}}/>
            {/* Seção de Participantes Inscritos */}
            <Section title="Participantes Inscritos">
              {/* Verifica se competitorsData existe e tem itens */}
              {competitorsData && competitorsData.length > 0 ? (
                  competitorsData.map((competitor) => (
                    <div key={competitor.id}> {/* Chave no elemento externo do map */}
                      <Competitor
                        // key={competitor.id} // Chave já está no div pai
                        data={competitor}
                        // Removido o onClick para detalhes aqui, pode adicionar se quiser
                         onClick={() => handleDetailsCompetitors(competitor.id)} // Leva para detalhes do competidor
                      />
                      {/* Adicionar botão de REMOVER aqui se/quando implementar */}
                    </div>
                  ))
              ) : (
                  <p>Nenhum participante inscrito neste campeonato.</p>
              )}
            </Section>


             


          </Content>
        </main>
      ) : (
          // Mostra uma mensagem de carregamento enquanto busca detalhes do campeonato
          <p style={{textAlign: 'center', marginTop: '50px'}}>Carregando detalhes do campeonato...</p>
      )}

      {/* Modal de Chaveamento */}
      {isModalOpen && <MatchupModal matchups={matchups} onClose={handleCloseModal} />}
    </Container>
  );
}