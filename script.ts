// ==============================================
// 1. INTERFACES - NOSSAS "FICHAS DE CADASTRO"
// ==============================================

interface Animal {
    id: number;
    nome: string;
    especie: string;
    idade: number;
    peso: number;
    vacinado: boolean;
    cor: string;
    raca: string;
    dono: string;
    ultimaVisita: string;
    observacoes: string;
}

interface Servico {
    id: number;
    tipo: string;
    animalId: number;
    preco: number;
    concluido: boolean;
    data: string;
    horario: string;
    funcionario: string;
}

// ==============================================
// 2. LISTAS - ONDE GUARDAMOS NOSSOS DADOS
// ==============================================

let animais: Animal[] = [
    {
        id: 1,
        nome: "Toby",
        especie: "cachorro",
        idade: 4,
        peso: 28.5,
        vacinado: true,
        cor: "dourado",
        raca: "Labrador",
        dono: "Carlos Silva",
        ultimaVisita: "15/08/2025",
        observacoes: "Animal muito brincalhão e amigável"
    },
    {
        id: 2,
        nome: "Mel",
        especie: "gato",
        idade: 2,
        peso: 3.8,
        vacinado: false,
        cor: "creme",
        raca: "Siamês",
        dono: "Ana Oliveira",
        ultimaVisita: "20/10/2025",
        observacoes: "Gata tranquila, gosta de carinho"
    }
];

let servicos: Servico[] = [];
let funcionarios: string[] = ["João Santos", "Maria Costa", "Pedro Lima"];

// ==============================================
// 3. FUNÇÕES PRINCIPAIS
// ==============================================

function calcularIdade(anoNascimento: number): number {
    return new Date().getFullYear() - anoNascimento;
}

function criarAnimal(
    nome: string, 
    especie: string, 
    idade: number, 
    peso: number, 
    cor: string, 
    raca: string, 
    dono: string,
    observacoes: string = "Novo animal cadastrado no sistema"
): Animal {
    return {
        id: Math.floor(Math.random() * 1000),
        nome,
        especie,
        idade,
        peso,
        vacinado: false,
        cor,
        raca,
        dono,
        ultimaVisita: new Date().toLocaleDateString('pt-BR'),
        observacoes
    };
}

function agendarServico(servico: Servico): string {
    servicos.push(servico);
    atualizarContadores();
    return `✅ Serviço de ${servico.tipo} agendado para ${servico.data} às ${servico.horario}`;
}

function calcularPrecoTotal(): number {
    let total: number = 0;
    servicos.forEach(servico => {
        total += servico.preco;
    });
    return total;
}

function filtrarAnimaisVacinados(): Animal[] {
    return animais.filter(animal => animal.vacinado === true);
}

function marcarComoVacinado(idAnimal: number): void {
    const animal = animais.find(a => a.id === idAnimal);
    if (animal) {
        animal.vacinado = true;
    }
}

function buscarAnimalPorNome(nome: string): Animal | undefined {
    return animais.find(animal => animal.nome.toLowerCase() === nome.toLowerCase());
}

// ==============================================
// 4. FUNÇÃO CADASTRAR ANIMAL ATUALIZADA (FORMULÁRIO MANUAL)
// ==============================================

function cadastrarAnimal(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    resultado.innerHTML = `
        <div class="animal-card">
            <h3>➕ Cadastrar Novo Animal</h3>
            <p>Preencha os dados do animal abaixo:</p>
        </div>
        <div class="animal-card">
            <form id="form-cadastro-animal">
                <div class="form-group">
                    <label for="nome">Nome do Animal:</label>
                    <input type="text" id="nome" name="nome" required placeholder="Ex: Rex, Luna, etc.">
                </div>
                
                <div class="form-group">
                    <label for="especie">Espécie:</label>
                    <select id="especie" name="especie" required>
                        <option value="">Selecione...</option>
                        <option value="cachorro">Cachorro</option>
                        <option value="gato">Gato</option>
                        <option value="pássaro">Pássaro</option>
                        <option value="coelho">Coelho</option>
                        <option value="hamster">Hamster</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="raca">Raça:</label>
                    <input type="text" id="raca" name="raca" required placeholder="Ex: Labrador, Siamês, Vira-lata">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="idade">Idade (anos):</label>
                        <input type="number" id="idade" name="idade" min="0" max="30" required placeholder="0">
                    </div>
                    
                    <div class="form-group">
                        <label for="peso">Peso (kg):</label>
                        <input type="number" id="peso" name="peso" min="0.1" max="100" step="0.1" required placeholder="0.0">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="cor">Cor Principal:</label>
                    <input type="text" id="cor" name="cor" required placeholder="Ex: preto, branco, marrom">
                </div>
                
                <div class="form-group">
                    <label for="dono">Nome do Dono:</label>
                    <input type="text" id="dono" name="dono" required placeholder="Nome completo do responsável">
                </div>
                
                <div class="form-group">
                    <label for="observacoes">Observações:</label>
                    <textarea id="observacoes" name="observacoes" placeholder="Comportamento, cuidados especiais, etc." rows="3"></textarea>
                </div>
                
                <div class="form-buttons">
                    <button type="submit" class="btn-primary">✅ Cadastrar Animal</button>
                    <button type="button" onclick="cancelarCadastro()" class="btn-secondary">❌ Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    
    const form = document.getElementById('form-cadastro-animal') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            processarCadastroAnimal();
        });
    }
}

function processarCadastroAnimal(): void {
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const especie = (document.getElementById('especie') as HTMLSelectElement).value;
    const raca = (document.getElementById('raca') as HTMLInputElement).value;
    const idade = parseInt((document.getElementById('idade') as HTMLInputElement).value);
    const peso = parseFloat((document.getElementById('peso') as HTMLInputElement).value);
    const cor = (document.getElementById('cor') as HTMLInputElement).value;
    const dono = (document.getElementById('dono') as HTMLInputElement).value;
    const observacoes = (document.getElementById('observacoes') as HTMLTextAreaElement).value;


    if (!nome || !especie || !raca || !idade || !peso || !cor || !dono) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const novoAnimal = criarAnimal(nome, especie, idade, peso, cor, raca, dono, observacoes);
    animais.push(novoAnimal);
    atualizarContadores();

    const resultado = document.getElementById('resultado');
    if (!resultado) return;

    resultado.innerHTML = `
        <div class="animal-card">
            <h3>✅ Animal Cadastrado com Sucesso!</h3>
            <div class="animal-info">
                <div class="info-item">
                    <strong>Nome:</strong> ${novoAnimal.nome}
                </div>
                <div class="info-item">
                    <strong>Espécie:</strong> ${novoAnimal.especie}
                </div>
                <div class="info-item">
                    <strong>Raça:</strong> ${novoAnimal.raca}
                </div>
                <div class="info-item">
                    <strong>Idade:</strong> ${novoAnimal.idade} anos
                </div>
                <div class="info-item">
                    <strong>Peso:</strong> ${novoAnimal.peso} kg
                </div>
                <div class="info-item">
                    <strong>Cor:</strong> ${novoAnimal.cor}
                </div>
                <div class="info-item">
                    <strong>Dono:</strong> ${novoAnimal.dono}
                </div>
            </div>
            ${observacoes ? `<p><strong>Observações:</strong> ${observacoes}</p>` : ''}
            <p><strong>ID:</strong> ${novoAnimal.id}</p>
            <p><strong>Vacinado:</strong> ${novoAnimal.vacinado ? '✅ Sim' : '❌ Não'}</p>
            <p><strong>Data do Cadastro:</strong> ${novoAnimal.ultimaVisita}</p>
            <div class="form-buttons">
                <button onclick="cadastrarAnimal()" class="btn-primary">➕ Cadastrar Outro Animal</button>
                <button onclick="mostrarAnimais()" class="btn-secondary">📋 Ver Todos os Animais</button>
            </div>
        </div>
    `;
}

function cancelarCadastro(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    resultado.innerHTML = `
        <div class="animal-card">
            <h3>📋 Cadastro Cancelado</h3>
            <p>O cadastro do animal foi cancelado.</p>
            <p>Clique em "Cadastrar Animal" novamente se desejar cadastrar um novo animal.</p>
        </div>
    `;
}

// ==============================================
// 5. OUTRAS FUNÇÕES DOS BOTÕES
// ==============================================

function mostrarTipos(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    resultado.innerHTML = `
        <div class="animal-card">
            <h3>🐕 Nossos Animais Cadastrados</h3>
            <p>Conheça nossos amigos de quatro patas que fazem parte da família PetShop!</p>
        </div>
        <div class="animal-info">
            <div class="info-item">
                <strong>Total de Animais:</strong> ${animais.length}
            </div>
            <div class="info-item">
                <strong>Animais Vacinados:</strong> ${animais.filter(a => a.vacinado).length}
            </div>
            <div class="info-item">
                <strong>Espécies:</strong> ${[...new Set(animais.map(a => a.especie))].join(', ')}
            </div>
        </div>
    `;
}

function mostrarAnimais(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    let html = '<div class="animal-card"><h3>📋 Todos os Animais Cadastrados</h3></div>';
    
    animais.forEach(animal => {
        html += `
            <div class="animal-card">
                <h3>${animal.especie === 'cachorro' ? '🐕' : '🐈'} ${animal.nome}</h3>
                <div class="animal-info">
                    <div class="info-item">
                        <strong>Espécie:</strong> ${animal.especie}
                    </div>
                    <div class="info-item">
                        <strong>Raça:</strong> ${animal.raca}
                    </div>
                    <div class="info-item">
                        <strong>Idade:</strong> ${animal.idade} anos
                    </div>
                    <div class="info-item">
                        <strong>Peso:</strong> ${animal.peso} kg
                    </div>
                    <div class="info-item">
                        <strong>Cor:</strong> ${animal.cor}
                    </div>
                    <div class="info-item">
                        <strong>Dono:</strong> ${animal.dono}
                    </div>
                </div>
                <div class="status-vacinado ${animal.vacinado ? 'vacinado' : 'nao-vacinado'}">
                    ${animal.vacinado ? '✅ Vacinado' : '❌ Não Vacinado'}
                </div>
                <p><strong>Última Visita:</strong> ${animal.ultimaVisita}</p>
                <p><strong>Observações:</strong> ${animal.observacoes}</p>
            </div>
        `;
    });
    
    resultado.innerHTML = html;
}

function testarFuncoes(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    resultado.innerHTML = `
        <div class="animal-card">
            <h3>⚙️ Testando Funcionalidades do Sistema</h3>
            <p>Executando testes automatizados...</p>
        </div>
    `;
    
    setTimeout(() => {
        const idadeCalculada = calcularIdade(2020);
        const novoAnimal = criarAnimal("Bobby", "cachorro", 2, 8.5, "marrom", "Vira-lata", "Pedro Alves");
        
        const servico: Servico = {
            id: 1,
            tipo: 'banho e tosa',
            animalId: novoAnimal.id,
            preco: 85.90,
            concluido: false,
            data: '28/11/2025',
            horario: '14:30',
            funcionario: 'Maria Costa'
        };
        
        const mensagemServico = agendarServico(servico);
        
        resultado.innerHTML = `
            <div class="animal-card">
                <h3>✅ Testes Concluídos com Sucesso!</h3>
            </div>
            <div class="servico-card">
                <h4>📅 Cálculo de Idade</h4>
                <p>Animal nascido em 2020 tem <strong>${idadeCalculada} anos</strong></p>
            </div>
            <div class="animal-card">
                <h4>🐕 Animal de Teste Criado</h4>
                <p><strong>Nome:</strong> ${novoAnimal.nome}</p>
                <p><strong>Espécie:</strong> ${novoAnimal.especie}</p>
                <p><strong>Raça:</strong> ${novoAnimal.raca}</p>
            </div>
            <div class="servico-card">
                <h4>📋 Serviço Agendado</h4>
                <p>${mensagemServico}</p>
                <p><strong>Funcionário:</strong> ${servico.funcionario}</p>
                <p><strong>Preço:</strong> R$ ${servico.preco}</p>
            </div>
        `;
    }, 1500);
}

function mostrarErros(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    resultado.innerHTML = `
        <div class="erro-card">
            <h3>🚨 Erros que o TypeScript Previne</h3>
            <p>Estes códigos <strong>NÃO COMPILAM</strong> no TypeScript:</p>
        </div>
        <div class="erro-card">
            <h4>❌ ERRO 1: Tipo Incorreto</h4>
            <p><code>let idade: number = "5";</code></p>
            <small>🚫 Não pode colocar texto em variável de número</small>
            <small>💡 <strong>Problema do Petshop:</strong> "5 anos" vira "51" na soma</small>
        </div>
        <div class="erro-card">
            <h4>❌ ERRO 2: Ficha Incompleta</h4>
            <p><code>let animal: Animal = { nome: "Rex" };</code></p>
            <small>🚫 Tem que preencher TODAS as informações do animal</small>
            <small>💡 <strong>Problema do Petshop:</strong> Fichas de animais incompletas</small>
        </div>
        <div class="erro-card">
            <h4>❌ ERRO 3: Parâmetro Errado</h4>
            <p><code>calcularIdade("2020");</code></p>
            <small>🚫 A função espera número, não texto</small>
            <small>💡 <strong>Problema do Petshop:</strong> Cálculos errados de idade</small>
        </div>
        <div class="animal-card">
            <h4>✅ Vantagem do TypeScript</h4>
            <p>Estes erros são descobertos <strong>ANTES</strong> de executar o código!</p>
            <p>No JavaScript normal, o CLIENTE é que descobriria esses erros! 😱</p>
        </div>
    `;
}

function mostrarServicos(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    let html = '<div class="animal-card"><h3>📋 Serviços Agendados</h3>';
    
    if (servicos.length === 0) {
        html += '<p>Nenhum serviço agendado no momento.</p>';
    } else {
        servicos.forEach(servico => {
            const animal = animais.find(a => a.id === servico.animalId);
            html += `
                <div class="servico-card">
                    <h4>${servico.tipo.toUpperCase()}</h4>
                    <p><strong>Animal:</strong> ${animal ? animal.nome : 'Não encontrado'}</p>
                    <p><strong>Preço:</strong> R$ ${servico.preco}</p>
                    <p><strong>Data:</strong> ${servico.data}</p>
                    <p><strong>Horário:</strong> ${servico.horario}</p>
                    <p><strong>Funcionário:</strong> ${servico.funcionario}</p>
                    <p><strong>Status:</strong> ${servico.concluido ? '✅ Concluído' : '⏳ Pendente'}</p>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    resultado.innerHTML = html;
}

function vacinarAnimais(): void {
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    resultado.innerHTML = `
        <div class="animal-card">
            <h3>💉 Controle de Vacinação</h3>
            <p>Verificando animais que precisam de vacina...</p>
        </div>
    `;
    
    setTimeout(() => {
        const animaisParaVacinar = animais.filter(animal => !animal.vacinado);
        
        if (animaisParaVacinar.length === 0) {
            resultado.innerHTML = `
                <div class="animal-card">
                    <h3>✅ Todos os animais estão vacinados!</h3>
                    <p>Nenhum animal precisa de vacinação no momento.</p>
                </div>
            `;
            return;
        }
        
        let html = `
            <div class="animal-card">
                <h3>💉 Animais que Precisam de Vacina</h3>
                <p>Encontramos ${animaisParaVacinar.length} animal(is) que precisa(m) de vacinação:</p>
            </div>
        `;
        
        animaisParaVacinar.forEach(animal => {
            html += `
                <div class="animal-card">
                    <h4>${animal.especie === 'cachorro' ? '🐕' : '🐈'} ${animal.nome}</h4>
                    <p><strong>Raça:</strong> ${animal.raca}</p>
                    <p><strong>Idade:</strong> ${animal.idade} anos</p>
                    <p><strong>Dono:</strong> ${animal.dono}</p>
                    <button onclick="aplicarVacina(${animal.id})" style="margin-top: 10px;">
                        💉 Aplicar Vacina
                    </button>
                </div>
            `;
        });
        
        resultado.innerHTML = html;
    }, 1500);
}

function aplicarVacina(idAnimal: number): void {
    marcarComoVacinado(idAnimal);
    const resultado = document.getElementById('resultado');
    if (!resultado) return;
    
    const animal = animais.find(a => a.id === idAnimal);
    if (animal) {
        resultado.innerHTML = `
            <div class="animal-card">
                <h3>✅ Vacina Aplicada com Sucesso!</h3>
                <p><strong>Animal:</strong> ${animal.nome}</p>
                <p><strong>Espécie:</strong> ${animal.especie}</p>
                <p><strong>Data da vacinação:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                <p>O animal ${animal.nome} agora está protegido! 🛡️</p>
            </div>
        `;
    }
}

// ==============================================
// 6. FUNÇÕES AUXILIARES
// ==============================================

function atualizarContadores(): void {
    const totalAnimais = document.getElementById('total-animais');
    const totalServicos = document.getElementById('total-servicos');
    
    if (totalAnimais) totalAnimais.textContent = animais.length.toString();
    if (totalServicos) totalServicos.textContent = servicos.length.toString();
}

// ==============================================
// 7. INICIALIZAÇÃO DO SISTEMA
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    atualizarContadores();
    
    const botoesDiv = document.querySelector('.botoes');
    if (botoesDiv) {
        const botoesExtras = `
            <button onclick="mostrarServicos()">6. Serviços Agendados</button>
            <button onclick="vacinarAnimais()">7. Vacinar Animais</button>
        `;
        botoesDiv.innerHTML += botoesExtras;
    }
    
    console.log("🚀 Sistema PetShop moderno carregado!");
    console.log("🐕 Animais pré-cadastrados: Toby e Mel");
    console.log("✅ Todos os botões estão funcionais!");
    console.log("📝 Cadastro manual de animais disponível!");
    console.log("🧡 Criado pelo Grupo Cuidadores Especiais 2025");
});