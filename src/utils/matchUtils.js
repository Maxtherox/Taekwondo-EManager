function generateMatchups(competitors, maxWeightDifference = 9, maxAgeDifference = 20) {
  const grouped = competitors.reduce((acc, competitor) => {
      const { gender, age, belt, belt_category } = competitor;

      // Classificação por idade
      let ageCategory = "";
      if (age >= 5 && age <= 10) ageCategory = "Infantil";
      else if (age >= 11 && age <= 17) ageCategory = "Adolescente";
      else if (age >= 18) ageCategory = "Adulto";

      // Classificação por categoria de faixa (belt_category)
      let beltCategory = belt_category === "profissional"
          ? "profissional"
          : belt_category === "avançado"
              ? "avançado"
              : "regular";

      // Criando a chave única para agrupamento
      const key = `${gender} ${ageCategory} ${beltCategory}`;

      // Agrupando competidores
      if (!acc[key]) acc[key] = [];
      acc[key].push(competitor);

      return acc;
  }, {});

  // Criando chaveamentos
  const matchups = {};
  for (const group in grouped) {
      const competitors = grouped[group];

      // Ordena os competidores por peso e idade para facilitar o pareamento justo
      const sorted = competitors.sort((a, b) => a.age - b.age || a.weight - b.weight);

      matchups[group] = [];
      while (sorted.length > 1) {
          const competitor1 = sorted.shift();
          // Encontrar o melhor adversário
          let bestMatchIndex = -1;
          for (let i = 0; i < sorted.length; i++) {
              const competitor2 = sorted[i];
              const ageDifference = Math.abs(competitor1.age - competitor2.age);
              const weightDifference = Math.abs(competitor1.weight - competitor2.weight);
              if (ageDifference <= maxAgeDifference && weightDifference <= maxWeightDifference) {
                  bestMatchIndex = i;
                  break;
              }
          }

          if (bestMatchIndex !== -1) {
              const [competitor2] = sorted.splice(bestMatchIndex, 1);
              matchups[group].push({ competitor1, competitor2 });
          } else {
              // Se não encontrar adversário compatível, deixar sozinho
              matchups[group].push({ competitor1, competitor2: null });
          }
      }

      // Caso sobre um competidor
      if (sorted.length === 1) {
          matchups[group].push({ competitor1: sorted[0], competitor2: null });
      }
  }

  return matchups;
}

module.exports = { generateMatchups };
