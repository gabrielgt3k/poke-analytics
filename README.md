# Oobj React Developer Test

Você deve criar uma interface web que siga as especificações disponibilizadas neste readme. A aplicação tem somente uma página mas deve ser responsiva e tolerante a falhas.

Imagine que você está construindo um sistema que gerencia as aventuras de um famoso treinador pokemon. Ele quer conseguir visualizar todas as suas capturas e ainda gerar alguns relatórios sobre as suas conquistas. O problema é que ele só anotou os dados básicos das suas aventuras e agora você precisa complementar as informações com ajuda da [PokeAPI](https://pokeapi.co/)

# Requisitos

* A página será composta por quatro componentes, dois gráficos, uma tabela e uma lista com os pokémons que serão usados em batalha.
    * Os gráficos tem os seus dados providos pela rota `/reports`.
    * A tabela deve ser preenchida com os dados de vendas em `/captures`.
    * O time de batalha deve ser montado com os dados da rota `/battle_team`.
* A tabela deve ser buscável e ordenável, fazendo requisições na API. (Para apoio basta consultar a documentação do [json-server](https://github.com/typicode/json-server))
    * Os filtros da tabela devem ser preenchidos com os dados disponibilizados pela PokeApi, deve ser possível filtrar tanto pelo tipo do pokémon quanto pela região da captura.
* Ao clickar em um item da tabela deve ser aberto um modal que mostra as informações básicas daquele pokémon:
    * Uma foto
    * O nome, peso e número no pokédex
    * Tipo e subtipo (chave `types` nos dados do pokémon na API)
    * E os golpes básicos que ele consegue executar em batalha (chave `abilities` nos dados do pokémon na API)

# Dicas

* Cuidado com a política de fair use da PokeAPI, afinal de contas eles são uma API aberta e nós não podemos sair abusando
* Você tem a liberdade para escolher qualquer biblioteca de componentes para construir a tela, aqui na Oobj nós usamos o [Carbon Design System](https://www.carbondesignsystem.com/), então usar ele seria um bônus, mas sinta-se à vontade com o que você tem mais conforto :)
* Nós disponibilizamos uma api simples com os dados que devem ser usados para construir a interface, basta entrar na pasta `mock-api` dentro deste repositório, instalar as dependências necessárias e executar o comando `yarn mock-api`.
    * O servidor sobe por padrão na porta `3001`
    * A rota raiz da API deixa você visualizar as rotas disponíveis, eles também são listados no terminal quando você sobe o servidor http.

# Entrega

Você deve criar um fork/clone desse repositório e nos disponibilizar, através de um merge/pull request ou via e-mail, uma maneira de acessar o seu código.