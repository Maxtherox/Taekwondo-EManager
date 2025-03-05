const knex = require("../database/knex");
const { generateMatchups } = require("../utils/matchUtils");

class MatchupsController {
  async generate(req, res) {
    const { championshipId } = req.params;

    console.log(req.params)

    try {
      // Buscar competidores confirmados no campeonato
      const competitors = await knex("subscriptions")
        .join("competitors", "subscriptions.competitor_id", "=", "competitors.id")
        .select(
          "competitors.id",
          "competitors.name",
          "competitors.gender",
          "competitors.age",
          "competitors.belt",
          "competitors.weight",
          "subscriptions.status",
          "competitors.belt_category"
        )
        .where({
          "subscriptions.championship_id": championshipId,
          //"subscriptions.status": true,
        });

      if (!competitors || competitors.length < 2) {
        throw new Error("Não há competidores suficientes para gerar o chaveamento.");
      }

      // Gerar o chaveamento usando a função utilitária
      const matchups = generateMatchups(competitors);

      return res.status(200).json({ success: true, matchups });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = MatchupsController;
