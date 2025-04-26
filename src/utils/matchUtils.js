const {calculateAge} = require("./calcAge")

function generateMatchups(competitorsRaw, maxWeightDifference = 9, maxAgeDifference = 20) {

    // 1. Calcula a idade para cada competidor ANTES de agrupar/ordenar
    const competitors = competitorsRaw.map(c => ({
      ...c,
      calculated_age: calculateAge(c.birth_date) // Calcula e armazena temporariamente
    }));
  
    // 2. Agrupamento (usa a idade calculada para ageCategory)
    const grouped = competitors.reduce((acc, competitor) => {
      const { gender, calculated_age, belt, belt_category } = competitor; // Usa calculated_age
  
      let ageCategory = "";
      // ----> USA calculated_age AQUI <----
      if (calculated_age >= 5 && calculated_age <= 10) ageCategory = "Infantil";
      else if (calculated_age >= 11 && calculated_age <= 17) ageCategory = "Adolescente";
      else if (calculated_age >= 18) ageCategory = "Adulto";
      else ageCategory = "Desconhecida"; // Lidar com idades nulas/inválidas
  
      let beltCategory = belt_category === "profissional" ? "profissional" : belt_category === "avançado" ? "avançado" : "regular";
      const key = `${gender} ${ageCategory} ${beltCategory}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(competitor); // Adiciona o objeto competidor completo (com calculated_age)
      return acc;
    }, {});
  
    // 3. Chaveamentos (usa a idade calculada para ordenar e comparar)
    const matchups = {};
    for (const group in grouped) {
      const competitorsInGroup = grouped[group];
  
      // ----> USA calculated_age para ordenar <----
      const sorted = competitorsInGroup.sort((a, b) => a.calculated_age - b.calculated_age || a.weight - b.weight);
  
      matchups[group] = [];
      while (sorted.length > 1) {
        const competitor1 = sorted.shift();
        let bestMatchIndex = -1;
        for (let i = 0; i < sorted.length; i++) {
          const competitor2 = sorted[i];
          // ----> USA calculated_age para comparar <----
          const ageDifference = Math.abs(competitor1.calculated_age - competitor2.calculated_age);
          const weightDifference = Math.abs(competitor1.weight - competitor2.weight);
          if (ageDifference <= maxAgeDifference && weightDifference <= maxWeightDifference) {
            bestMatchIndex = i;
            break;
          }
        }
         // ... resto da lógica de pareamento ...
         if (bestMatchIndex !== -1) {
              const [competitor2] = sorted.splice(bestMatchIndex, 1);
              // Remove a idade calculada se não quiser expor no resultado final
              // delete competitor1.calculated_age;
              // delete competitor2.calculated_age;
              matchups[group].push({ competitor1, competitor2 });
          } else {
               // delete competitor1.calculated_age;
              matchups[group].push({ competitor1, competitor2: null });
          }
      }
       if (sorted.length === 1) {
          // delete sorted[0].calculated_age;
          matchups[group].push({ competitor1: sorted[0], competitor2: null });
      }
    }
  
    return matchups;
  }
  
  module.exports = { generateMatchups };