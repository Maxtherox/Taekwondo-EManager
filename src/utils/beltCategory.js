// utils/beltCategory.js

const getBeltCategory = (belt) => {
    const regularBelts = ['branca', 'amarela', 'ponta verde', 'verde', 'ponta azul'];
    const advancedBelts = ['azul', 'ponta vermelha', 'vermelha', 'ponta preta', 'candidato'];
    const professionalBelts = ['preta'];

    if (regularBelts.includes(belt)) {
        return 'regular';
    } else if (advancedBelts.includes(belt)) {
        return 'avançado';
    } else if (professionalBelts.includes(belt)) {
        return 'profissional';
    } else {
        return null; // Caso a faixa não seja reconhecida
    }
};

module.exports = getBeltCategory;
