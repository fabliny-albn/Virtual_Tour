# Guia de Contribuição — Tour Virtual do Museu

Guia rápido para enviar código ao repositório sem perder trabalho. Vale para qualquer sprint — troque `<nome-da-sua-branch>` pelo nome real.

## ⚠️ Regra de ouro

**Nunca dê push direto na `main`.** Todo código passa por uma branch + Pull Request revisado pela coordenadora.

## Situação atual do repositório

Enquanto o acesso ao repositório oficial não chega, a equipe trabalha em cima do **fork da coordenadora**. Pegue o link do fork com ela — é ele que entra no `git clone` abaixo. Quando o acesso oficial chegar, a coordenadora avisa e só muda a URL (comandos no final deste guia).

**Já clonou o repositório original por engano e já tem código feito?** Não precisa refazer nada:
```bash
git remote rename origin upstream
git remote add origin <link-do-fork-da-coordenadora>
git push -u origin <nome-da-sua-branch>
```

---

## 1. Primeira vez no projeto

Instale o Git: https://git-scm.com/downloads (depois disso, o comando `git` funciona em qualquer terminal — o do VS Code, PowerShell, Terminal do Mac/Linux).

Crie uma pasta pros projetos e abra o terminal nela (mais fácil: abra a pasta no VS Code e use `Terminal → Novo Terminal`):
```bash
mkdir projetos-ifsc
cd projetos-ifsc
```

Clone o repositório e entre na pasta:
```bash
git clone <link-do-fork-da-coordenadora>
cd Virtual_Tour
```

Instale as dependências e teste:
```bash
npm install
npx vite
```
Abra o link que aparecer no terminal (ex: `http://localhost:5173`). Se o tour carregar, está tudo certo.

---

## 2. Toda vez que for começar uma tarefa nova

**Passo 1 — Atualize sua main local.** Garante que você vai partir do código mais recente já aprovado:
```bash
git checkout main
git pull origin main
```
- `git checkout main` troca você para a branch `main`.
- `git pull origin main` baixa as atualizações mais recentes que estão no GitHub.

**Passo 2 — Crie sua branch:**
```bash
git checkout -b <nome-da-sua-branch>
```
O `-b` já cria a branch nova **e** troca para ela ao mesmo tempo. Nome de branch: `sprint<numero>-<descrição-curta>` — ex: `sprint2-botoes-navegacao`.

**Passo 3 — Trabalhe e salve aos poucos.** Não espere terminar tudo pra fazer o primeiro commit — salve sempre que finalizar uma parte pequena:
```bash
git add .
git commit -m "Descreva o que voce fez"
```
- `git add .` seleciona todos os arquivos que você mudou.
- `git commit -m "..."` cria um "ponto de salvamento" com uma mensagem explicando o que mudou. Repita esse passo várias vezes ao longo do trabalho.

**Passo 4 — Suba a branch pro GitHub:**
```bash
git push -u origin <nome-da-sua-branch>
```
Isso cria a branch lá no GitHub (com o mesmo nome) e liga ela à sua branch local — é o que o `-u` faz. **Só é preciso usar `-u` na primeira vez** que você sobe essa branch específica; das próximas vezes, basta `git push`.

---

## 3. Trabalhando em dupla na mesma branch

Quando duas pessoas trabalham na mesma tarefa (ex: Gabriela no HTML/CSS, Isaac no JS), o mais simples é os dois usarem a **mesma branch**, em vez de branches separadas.

**Passo 1 — Uma pessoa cria a branch.** Segue o passo 2 da seção anterior (checkout, commit, push) normalmente.

**Passo 2 — A outra pessoa "pega" essa branch já existente.** Ela **não** cria a branch de novo — busca a que já foi criada:
```bash
git fetch origin
git checkout <nome-da-branch>
```
- `git fetch origin` atualiza a lista de branches que existem no GitHub, sem mudar nenhum arquivo seu ainda.
- `git checkout <nome-da-branch>` entra nessa branch — o Git já entende que ela deve seguir a versão do GitHub.

**Passo 3 — Antes de trabalhar, sempre puxe o que o colega já enviou.** Isso vale toda vez que for continuar a tarefa, principalmente em dias diferentes:
```bash
git pull origin <nome-da-branch>
```
Esse é o passo que evita perder código: sem ele, seu trabalho pode acabar sobrescrevendo (ou entrando em conflito com) o que o colega já mandou, sem você perceber.

**Passo 4 — Trabalhe, salve e envie normalmente** (add, commit, push — passo 3 e 4 da seção anterior).

**Dica:** avisem um ao outro no grupo quando subir uma mudança grande, assim o colega sabe que precisa dar `pull` antes de continuar.

### Se der conflito

O Git avisa `CONFLICT`. Abra o arquivo indicado, você vai ver algo assim:
```
<<<<<<< HEAD
seu código
=======
código do colega
>>>>>>> origin/<nome-da-branch>
```
Decida o que fica, apague as marcações (`<<<<<<<`, `=======`, `>>>>>>>`) e finalize:
```bash
git add .
git commit -m "Resolve conflito"
git push origin <nome-da-branch>
```

---

## 4. Abrindo o Pull Request

No GitHub, dentro do fork da coordenadora: clique em **Compare & pull request** (ou Pull Requests → New Pull Request). Confirme `base: main` e `compare: <nome-da-sua-branch>`, escreva um resumo curto, adicione a coordenadora em **Reviewers** e clique em **Create Pull Request**.

Depois de aprovado:
```bash
git checkout main
git pull origin main
```

---

## 5. Quando o acesso ao repositório oficial chegar

A coordenadora avisa no grupo. Troque a URL remota:
```bash
git remote set-url origin <link-do-repositorio-oficial>
```
Depois disso, o fluxo (passos 2, 3 e 4) continua exatamente igual.

---

## Glossário rápido

| Termo | Significado |
|---|---|
| Branch | Linha de trabalho separada da `main` |
| Commit | Ponto de salvamento com uma mensagem |
| Push / Pull | Enviar / baixar mudanças do GitHub |
| Fork | Cópia do repositório numa outra conta |
| Pull Request (PR) | Pedido de revisão pra trazer sua branch pra `main` |
