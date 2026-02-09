const fatores = {
    '10': { 
        1: { fatorTotal: 1.1354, fatorParcela: 1.13543 },
        2: { fatorTotal: 1.1485, fatorParcela: 0.57423 },
        3: { fatorTotal: 1.1558, fatorParcela: 0.38528 },
        4: { fatorTotal: 1.1633, fatorParcela: 0.29082 },
        5: { fatorTotal: 1.1708, fatorParcela: 0.23417 },
        6: { fatorTotal: 1.1782, fatorParcela: 0.19637 },
        7: { fatorTotal: 1.1859, fatorParcela: 0.16941 },
        8: { fatorTotal: 1.1933, fatorParcela: 0.14916 },
        9: { fatorTotal: 1.2010, fatorParcela: 0.13344 },
        10: { fatorTotal: 1.2115, fatorParcela: 0.12115 },
        11: { fatorTotal: 1.2190, fatorParcela: 0.11082 },
        12: { fatorTotal: 1.2330, fatorParcela: 0.10275 }
    },
    '15': { 
        1: { fatorTotal: 1.1870, fatorParcela: 1.18704 },
        2: { fatorTotal: 1.2007, fatorParcela: 0.60033 },
        3: { fatorTotal: 1.2084, fatorParcela: 0.40279 },
        4: { fatorTotal: 1.2162, fatorParcela: 0.30404 },
        5: { fatorTotal: 1.2241, fatorParcela: 0.24481 },
        6: { fatorTotal: 1.2318, fatorParcela: 0.20530 },
        7: { fatorTotal: 1.2398, fatorParcela: 0.17711 },
        8: { fatorTotal: 1.2476, fatorParcela: 0.15594 },
        9: { fatorTotal: 1.2556, fatorParcela: 0.13951 },
        10: { fatorTotal: 1.2665, fatorParcela: 0.12665 },
        11: { fatorTotal: 1.2744, fatorParcela: 0.11585 },
        12: { fatorTotal: 1.2891, fatorParcela: 0.10742 }
    },
    '20': { 
        1: { fatorTotal: 1.2386, fatorParcela: 1.23865 },
        2: { fatorTotal: 1.2529, fatorParcela: 0.62644 },
        3: { fatorTotal: 1.2609, fatorParcela: 0.42030 },
        4: { fatorTotal: 1.2690, fatorParcela: 0.31726 },
        5: { fatorTotal: 1.2773, fatorParcela: 0.25546 },
        6: { fatorTotal: 1.2853, fatorParcela: 0.21422 },
        7: { fatorTotal: 1.2937, fatorParcela: 0.18481 },
        8: { fatorTotal: 1.3018, fatorParcela: 0.16273 },
        9: { fatorTotal: 1.3102, fatorParcela: 0.14558 },
        10: { fatorTotal: 1.3216, fatorParcela: 0.13216 },
        11: { fatorTotal: 1.3298, fatorParcela: 0.12089 },
        12: { fatorTotal: 1.3451, fatorParcela: 0.11210 }
     },
    '25': { 
        1: { fatorTotal: 1.2903, fatorParcela: 1.29026 },
        2: { fatorTotal: 1.3051, fatorParcela: 0.65254 },
        3: { fatorTotal: 1.3134, fatorParcela: 0.43781 },
        4: { fatorTotal: 1.3219, fatorParcela: 0.33048 },
        5: { fatorTotal: 1.3305, fatorParcela: 0.26610 },
        6: { fatorTotal: 1.3389, fatorParcela: 0.22315 },
        7: { fatorTotal: 1.3476, fatorParcela: 0.19251 },
        8: { fatorTotal: 1.3560, fatorParcela: 0.16951 },
        9: { fatorTotal: 1.3648, fatorParcela: 0.15164 },
        10: { fatorTotal: 1.3767, fatorParcela: 0.13767 },
        11: { fatorTotal: 1.3852, fatorParcela: 0.12593 },
        12: { fatorTotal: 1.4012, fatorParcela: 0.11677 }
    }
};

const valorVendaInput = document.getElementById('valor');
const numParcelasInput = document.getElementById('numParcelas');
const valorParcelaInput = document.getElementById('valorParcela');
const prazoInput = document.getElementById('prazo');

const formatCurrency = (value) => {
    if (isNaN(value) || value === null) return '-';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarTabelas(valorVenda, numParcelas) {
    document.querySelectorAll('.result-row-4-cols').forEach(row => {
        const tableId = row.dataset.tableId;
        const tabelaFatores = fatores[tableId];

        const colClientePaga = row.querySelector('[data-col="cliente-paga"]');
        const colParcela = row.querySelector('[data-col="parcela"]');
        const colVoceRecebe = row.querySelector('[data-col="voce-recebe"]');

        if (valorVenda > 0 && numParcelas > 0 && tabelaFatores && tabelaFatores[numParcelas]) {
            const fator = tabelaFatores[numParcelas].fatorTotal;
            const totalClientePaga = valorVenda * fator;
            const valorDaParcela = totalClientePaga / numParcelas;

            colClientePaga.textContent = formatCurrency(totalClientePaga);
            colParcela.textContent = formatCurrency(valorDaParcela);
            colVoceRecebe.textContent = formatCurrency(valorVenda);
        } else {
            colClientePaga.textContent = '-';
            colParcela.textContent = '-';
            colVoceRecebe.textContent = '-';
        }
    });

    preencherTabelasOportunidades(valorVenda);
}

function calcularComValorVenda() {
    const valorVenda = parseFloat(valorVendaInput.value) || 0;
    const numParcelas = parseInt(numParcelasInput.value) || 0;
    
    // Se o usuário está digitando aqui, limpa os campos de baixo
    if (document.activeElement === valorVendaInput || document.activeElement === numParcelasInput) {
         valorParcelaInput.value = '';
    }

    atualizarTabelas(valorVenda, numParcelas);
}

function preencherTabelasOportunidades(valorVenda) {
    const tableIds = ['10', '15', '20', '25'];

    tableIds.forEach(id => {
        const resultsList = document.getElementById(`results-list-${id}`);
        resultsList.innerHTML = '';

        if (!valorVenda || valorVenda <= 0) {
            resultsList.innerHTML = '<div class="empty-state">Preencha o valor da venda.</div>';
            return;
        }

        const tabelaFatores = fatores[id];
        if (!tabelaFatores) return;

        for (let i = 1; i <= 12; i++) {
            if (tabelaFatores[i]) {
                const fator = tabelaFatores[i].fatorTotal;
                const totalClientePaga = valorVenda * fator;
                const valorDaParcela = totalClientePaga / i;

                const row = document.createElement('div');
                row.className = 'installment-row';
                row.innerHTML = `
                    <div>${i}x</div>
                    <div>${formatCurrency(valorDaParcela)}</div>
                    <div class="total-value">${formatCurrency(totalClientePaga)}</div>
                `;
                resultsList.appendChild(row);
            }
        }
    });
}

function calcularComValorParcela() {
    const valorParcela = parseFloat(valorParcelaInput.value) || 0;
    const prazo = parseInt(prazoInput.value) || 0;
    
    // Se digitou embaixo, limpa o valor da venda em cima
    valorVendaInput.value = '';
    
    if (valorParcela > 0 && prazo > 0) {
        const tabelaReferencia = fatores['10'];
        if (tabelaReferencia && tabelaReferencia[prazo]) {
            const fator = tabelaReferencia[prazo].fatorParcela;
            // Cálculo reverso usando o fator da parcela
            const valorVendaCalculado = valorParcela / fator;
            
            // Atualiza tabelas com o valor calculado, mas SEM preencher o input de cima
            atualizarTabelas(valorVendaCalculado, prazo);
            return;
        }
    }
    
    // Se não for válido, zera tabelas
    atualizarTabelas(0, 0);
}

valorVendaInput.addEventListener('input', calcularComValorVenda);
numParcelasInput.addEventListener('change', calcularComValorVenda);

valorParcelaInput.addEventListener('input', calcularComValorParcela);
prazoInput.addEventListener('change', calcularComValorParcela);

preencherTabelasOportunidades(0);
