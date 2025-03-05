import React from 'react';
import { ModalContainer, ModalContent, CloseButton, MatchupCard, MatchupHeader, CompetitorInfo, Matchupbox } from './styles';
import { FaTimes } from 'react-icons/fa';
import { Competitor } from '../Competitor';
import vs from '../../assets/vs4.png'

export function MatchupModal({ matchups, onClose }) {
  if (!matchups) return null;
/*
  <Competitor 
      key={String(competitor.id)}
      data={competitor}
      onClick={() => handleDetails(competitor.id)}
  /> */
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <h2>Chaveamentos</h2>
        {Object.entries(matchups).map(([round, matches]) => (
          <MatchupCard key={round}>
            
            <MatchupHeader>{round}</MatchupHeader>
            
            {matches.map((match, index) => (
              <div key={index}>

                <CompetitorInfo>

                <p><strong>Competidor 1: </strong></p>

                  <Competitor 
                    key={String(match.competitor1.id)}
                    data={match.competitor1}
                    onClick={() => handleDetails(match.competitor1.id)}
                /> 
                </CompetitorInfo>

                <img src={vs} alt="" />
                <CompetitorInfo>

                 <p> <strong>Competidor 2: </strong> 
</p>
                  {
                    match.competitor2 ?  
                    <Competitor 
                    key={String(match.competitor2.id)}
                    data={match.competitor2}
                    onClick={() => handleDetails(match.competitor2.id)} 
                    /> : <em>Aguardando competidor...</em>
                  }
                </CompetitorInfo>
                {index < matches.length - 1}
                
              </div>
              
            ))}
           
          </MatchupCard>
        ))}
      </ModalContent>
    </ModalContainer>
  );
}
