// Configuração das Taxas de Juros (Simulando sua planilha)
// Formato: Número de Parcelas -> Taxa de Juros Total (%) a ser aplicada
// Exemplo: 10% de juros => valor * 1.10
const taxas = {
    master: {
        1: 0,       // À vista (0% de acréscimo)
        2: 4.59,    // 2x 
        3: 5.97,    // 3x
        4: 7.33,
        5: 8.66,
        6: 9.96,
        10: 13.99,
        12: 15.90
    },
    visa: { // Exemplo de taxas levemente diferentes para outra bandeira
        1: 0,
        2: 4.99,
        3: 6.50,
        4: 7.90,
        5: 8.90,
        6: 10.50,
        10: 14.50,
        12: 16.50
    },
    elo: {
        1: 0,
        2: 5.00,
        3: 6.80,
        4: 8.00,
        5: 9.50,
        6: 11.00,
        10: 15.00,
        12: 17.00
    }
};

/* 
NOTA SOBRE GOOGLE SHEETS:
Se você quiser usar uma planilha, substituiria a const 'taxas' acima por uma função que busca os dados:

async function buscarTaxasDoGoogleSheets() {
    const url = 'URL_DO_SEU_CSV_PUBLICADO';
    const response = await fetch(url);
    const dados = await response.text();
    // Lógica para transformar CSV em Objeto JSON aqui
}
*/

const amountInput = document.getElementById('amount');
const brandSelect = document.getElementById('brand');
const resultsList = document.getElementById('results-list');

// Função principal de cálculo
function calculateInstallments() {
    const amount = parseFloat(amountInput.value);
    const brand = brandSelect.value;
    
    // Limpa a lista anterior
    resultsList.innerHTML = '';

    if (!amount || amount <= 0) {
        resultsList.innerHTML = '<div class="empty-state">Digite um valor maior que zero para simular.</div>';
        return;
    }

    const currentRates = taxas[brand];

    // Se não tiver taxas cadastradas para essa bandeira
    if (!currentRates) return;

    // Loop para gerar linhas de 1x até 12x (ou conforme as chaves definidas no objeto taxas)
    // Aqui estou forçando um loop de 1 a 12, verificando se existe taxa para aquele prazo.
    for (let i = 1; i <= 12; i++) {
        
        // Se a parcela 'i' existe na configuração de taxas
        if (currentRates.hasOwnProperty(i)) {
            const rate = currentRates[i];
            
            // Cálculo do Acréscimo
            // Fórmula Simples: Valor Original + (Valor Original * (Taxa / 100))
            const totalWithTax = amount * (1 + (rate / 100));
            const installmentValue = totalWithTax / i;

            createResultRow(i, installmentValue, totalWithTax, rate);
        }
    }
}

// Cria o HTML de cada linha
function createResultRow(installments, installmentValue, totalValue, rate) {
    const row = document.createElement('div');
    row.className = 'installment-row';

    const installmentText = installments === 1 ? '1x (À vista)' : `${installments}x`;
    
    // Formatação de moeda BRL
    const fmtInstallment = installmentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const fmtTotal = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const rateText = rate > 0 ? `(${rate}% juros)` : '(Sem juros)';

    row.innerHTML = `
        <div class="col-parc">${installmentText}</div>
        <div class="col-value">${fmtInstallment}</div>
        <div class="col-total total-value">
            ${fmtTotal} 
            <small style="display:block; font-size: 0.7em; color: #666; font-weight: normal;">${rateText}</small>
        </div>
    `;

    resultsList.appendChild(row);
}

// Adiciona os "ouvintes" de evento para recalcular sempre que mudar algo
amountInput.addEventListener('input', calculateInstallments);
brandSelect.addEventListener('change', calculateInstallments);
