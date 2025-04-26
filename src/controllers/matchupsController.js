// src/controllers/matchupsController.js (Ajustado para birth_date)

const knex = require("../database/knex");
const { generateMatchups } = require("../utils/matchUtils"); // generateMatchups agora espera birth_date

class MatchupsController {
  async generate(req, res) {
    const { championshipId } = req.params;

    console.log("Generating matchups for championship ID:", championshipId); // Log melhorado

    try {
      // Buscar competidores confirmados no campeonato, selecionando birth_date
      const competitorsData = await knex("subscriptions") // Renomeado para clareza
        .join("competitors", "subscriptions.competitor_id", "=", "competitors.id")
        .select(
          "competitors.id",
          "competitors.name",
          "competitors.gender",
          "competitors.birth_date", // <<< Alterado de 'age' para 'birth_date'
          "competitors.belt",
          "competitors.weight",
          "subscriptions.status",
          "competitors.belt_category"
        )
        .where({
          "subscriptions.championship_id": championshipId,
          //"subscriptions.status": true, // Mantido comentado como no original
        });

      console.log("Competitors fetched:", competitorsData.length); // Log do número de competidores

      if (!competitorsData || competitorsData.length < 2) {
        // Mensagem de erro mais específica
        return res.status(404).json({ success: false, message: "Não há competidores suficientes (mínimo 2) inscritos ou encontrados para gerar o chaveamento." });
        // Usar status 404 (Not Found) ou 400 (Bad Request) pode ser apropriado aqui
        // throw new Error("Não há competidores suficientes para gerar o chaveamento."); // Original
      }

      // Gerar o chaveamento usando a função utilitária
      // A função generateMatchups agora recebe dados com birth_date
      // e deve calcular a idade internamente para sua lógica.
      const matchups = generateMatchups(competitorsData);

      console.log("Matchups generated successfully."); // Log de sucesso

      return res.status(200).json({ success: true, matchups });
    } catch (error) {
      // Log do erro no servidor para depuração
      console.error("Error generating matchups:", error);
      // Retorna uma mensagem genérica ou a mensagem do erro, dependendo da sua política
      return res.status(500).json({ success: false, message: "Erro ao gerar chaveamento: " + error.message }); // Alterado para 500 e inclui msg de erro
    }
  }
}

module.exports = MatchupsController;