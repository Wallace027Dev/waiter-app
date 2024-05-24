<h1 align="center">waiterapp</h1>
<h4 align="center">Status: Concluído</h4>
<h2>🚀 Propósito</h2>

O waiterapp é um aplicativo móvel projetado para tablets ou celulares, permitindo que os clientes façam seus pedidos em um restaurante de forma simples e eficiente. Os clientes podem selecionar sua mesa, escolher os itens do menu, especificar a quantidade desejada e enviar seus pedidos diretamente para a cozinha ou o balcão. No lado do restaurante, os pedidos são recebidos em um site, onde a equipe pode visualizar as informações da mesa do cliente e gerenciar o status do pedido, que pode variar de "Esperando" para "Em Produção" e, finalmente, "Pronto" quando estiver concluído. Os produtos do menu são organizados em categorias e incluem título, descrição, preço e imagem para facilitar a seleção dos clientes.
<h2>⚙️ Tecnologias Utilizadas</h2>
Backend

    Express.js: Framework para construção de aplicativos web em Node.js.
    MongoDB: Banco de dados NoSQL para armazenamento dos dados do restaurante.
    Mongoose: Biblioteca do MongoDB para modelagem de objetos.
    Multer: Middleware para upload de arquivos.
    TypeScript: Linguagem de programação tipada.
    Nodemon: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.

Frontend (Aplicativo do Cliente)

    React Native: Framework para desenvolvimento de aplicativos móveis.
    Axios: Cliente HTTP para fazer requisições ao servidor backend.
    Styled-Components: Biblioteca para estilização de componentes com CSS em JavaScript.
    React Toastify: Biblioteca para exibição de notificações.

Frontend (Interface Web - Painel do Restaurante)

    React: Biblioteca para construção de interfaces de usuário.
    WebSocket: Protocolo para comunicação bidirecional em tempo real entre o cliente e o servidor.

<h2>🔧 Instalação e Execução</h2>

    Clone o repositório:

<code>git clone https://github.com/Wallace027Dev/waiterapp.git</code>

    Instale as dependências:

<code>cd waiterapp/api</code>
<code>npm install</code>

    Inicie o servidor:

<code>npm run build; npm run start</code>

Frontend (Aplicativo do Cliente)

    Instale o Expo globalmente (se ainda não o tiver):

<code>npm install -g expo-cli</code>

    Navegue até o diretório do cliente:

<code>cd ../app</code>

    Instale as dependências:

<code>npm install</code>

    Inicie o aplicativo:

<code>npm run start</code>

Frontend (Interface Web - Painel do Restaurante)

    Navegue até o diretório da interface web:

<code>cd ../fe</code>

    Instale as dependências:

<code>npm install</code>

    Inicie o servidor de desenvolvimento:

<code>npm run build</code>

<h2>📱 Acesso ao Aplicativo</h2>

Para acessar o aplicativo, você pode baixá-lo na loja de aplicativos do seu dispositivo (iOS ou Android) ou executá-lo através do Expo. Certifique-se de estar conectado à mesma rede do servidor.
<h2>💻 Acesso à Interface Web</h2>

Para acessar a interface web do painel do restaurante, abra seu navegador e vá para o seguinte endereço:

<code>http://localhost:3000</code>

<h2>🤝 Contribuição</h2>

Contribuições são bem-vindas! Siga estas etapas para contribuir para o projeto waiterapp:

    Faça um fork do projeto.
    Crie uma branch para sua feature (<code>git checkout -b feature/NomeDaSuaFeature</code>).
    Faça commit das suas alterações (<code>git commit -am 'Adicione sua feature'</code>).
    Faça push para a branch (<code>git push origin feature/NomeDaSuaFeature</code>).
    Abra um Pull Request.

<h2>📝 Licença</h2>

Este projeto está licenciado sob a [Nome da Licença]. Consulte o arquivo LICENSE para obter mais detalhes.
<h2>👨‍💻 Autor</h2>

Desenvolvido por Wallace Vieira.
