# Jogo de Memória

## Tabela de Conteúdo

* [Instruções](#instruções_do_jogo)
* [Contribuições](#Contribuições_ao_repositório)

## Instruções do jogo
Esta documentação traz instruções sobre como rodar e jogar o **Jogo da Memória**.

### Como executar o jogo
- Dentro do diretório, localize o arquivo **index.html**.
- Para abrir o arquivo em um navegador:
-- faça um duplo clique sobre o nome do arquivo, ou
-- faça um clique direito com o mouse ou notepad, e selecione _Abrir_ no menu suspenso, ou
-- selecione o arquivo com um clique esquerdo e clique em _Abrir_ no menu da janela.

## Sobre o Jogo

### Baralho de cartas
Dentro do jogo serão exibidas dezesseis cartas dispostas aleatoriamente e viradas para baixo. Este baralho é composto por oito pares de cartas, e cada par tem um símbolo diferente dos demais.

### Objetivo do jogo
Em cada jogada, o jogador deve virar duas cartas para cima e localizar aquelas que combinam entre si. **Quando os oito pares de cartas sejam combinados, vencerá o jogo.**

### Como jogar
Para virar uma carta e revelar o símbolo, clique sobre ela fazendo uso do mouse, notepad ou tocando em ela caso utilize dispositivos com função _touch_ habilitada.
Logo depois, vire outra carta, para encontrar a correspondente.

Quando existam duas cartas viradas no tabuleiro:
- se elas forem iguais é um **_match_** e ficarão viradas para cima;
- se elas forem diferentes, ficarão viradas para baixo ocultando seu símbolo.

### Contador de Movimentos
A área superior do tabuleiro exibe o contador de movimentos ou jogadas. Sendo que, a cada duas cartas viradas para cima, é considerada uma jogada.

### Rating
A área superior do tabuleiro exibe um rating ou nível de desempenho do jogador em função da quantidade de movimentos utilizados para vencer o jogo.

Confira o detalhe do rating:
- **3 Estrelas**: resolveu o jogo utilizando até 12 movimentos;
- **2 Estrelas**: resolveu o jogo utilizando até 16 movimentos;
- **1 Estrela**: resolveu o jogo utilizando até 20 movimentos;

### Cronômetro
A área superior do tabuleiro exibe um cronômetro que começa a medir o tempo a partir da primeira carta virada, e para quando o último par de cartas é revelado.

### Botão Reiniciar
A área superior do tabuleiro exibe um botão de reiniciar, caso o jogador deseje começar um outro jogo, no meio de uma partida. Esta funcionalidade, embaralha novamente os pares e restabelece o contador de movimentos, o rating e o cronômetro.

Para executar a função, clique ou toque no botão de reiniciar que possui o seguinte símbolo **⟳**.

### Jogo concluído
Quando todos os pares de cartas sejam achados, o jogador vencerá o jogo e será exibida uma mensagem parabenizando-o e mostrando seu desempenho no tempo utilizado para concluir o jogo, na quantidade de movimentos feitos para encontrar todos os pares e o seu rating.

A tela também mostra a opção de jogar uma nova partida. Para acessar esta funcionalidade, clique ou toque no botão com o texto **_Play again!_** e um novo jogo será mostrado.

## Contribuições ao repositório

Este repositório é parte do projeto final do Nanodegree Fundamentos Web Front-End da Udacity, sujeito a avaliação.
Portanto, é muito provável que não sejam aceitas pull requests.

Para mais detalhes, confira [CONTRIBUTING.md](CONTRIBUTING.md).
