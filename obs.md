
Interfaces declarativas: para onde as aplicações do futuro estão indo, quando podemos definir a estilização diretamente na tag html

elemento Chackra pra div = Flex, uma div com flex automatico {
  <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
}

as vezes alguns elementos podem dar problema ao serem carregados antes pelo next, quebrando a aplicação, uma forma de resolver isso é usar a exibição dinamica, carregando o tal componente seguindo alguma regra. (aula pagina dashboard): {
  const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
}

PassHref = vai forçar o atributo a ter o comportamento de uma ancora;

Trabalhando com Forms: {
  - Controlled Components: Forma que você tá acostumado, não é uma forma ruim, é apenas bem trabalhosa comparada a outras soluções, vale dizer que um ponto positivo de usar essa estratégia é poder usar alguns tipos de ações, como validações;

  - Uncontrolled Components: Acessar o valor do input apenas no momento em que precisarmos, não armazenamos em uma variavel no estado, acessamos o valor no momento: {
    usamos com const searchInputRef = useRef<HTMLInputElement>(null); // ele guarda uma referência ao elemento dentro da DOM, dizendo qual o tipo do elemento, coloando como valor inicial o null, pois no momento em que a interface montar, não vai ter nada, só quando o Input renderizar.

    element: prop ref={searchInputRef}

    E ao fazer o submit, só precisa acessar o valor com searchInputRef.current.value

    e aqui dá pra acessar todas as props do elemento, como a do focus, ao clicar em algo podemos colocar searchInputRef.current.focus;

    vale dizer que isso é uma forma *Imperativa* de lidar com o código, estamos dizendo exatamente o que ele deve fazer;

    Também temos o código declarativo, em que você declara de alguma forma as ações do código, como por exemplo, colocar focus no elemento quando uma variavel se tornar true.
  }

  - usar blibiotecas para lidar com os formulários: {
    podemos usar mensagens de erro, validações mais fáceis, melhor para lidar com mais quantidade de código e de estados, de informações;

    - FORMIK React: no mercado de trabalho é muito utilizado, mas é engessada, sua forma talvez seja mais trabalhosa e menos adaptada aos códigos atuais;
    - ReactHook Form: criada com advento dos hooks;
    - Unform: criada pela Rocketseat por alguns problemas que os outros tinham, essa é recomendada para formulários que precisam de um cuidado maior na parte de performance pelas informações.
  }
}

No search é bom pesquisar sobre Debounce, ele ajuda na busca, fazendo chamadas ao ela parar de digitar ou algo assim;

O BAGULHO DE LOADING FODA

------------

[`Cache da App`]


Data Fetching React: uma app normalmente vai precisar buscar alguns dados em algum lugar no mundo: {
  - axios e fetch: buscamos os dados, armazenamos em um estado para trabalhar com eles, e a partir do momento em que não estiverem em tela, ela não guarda em nenhum lugar. Isso não é ruim, mas tem como trabalhar de forma melhor.

  - Cache Local de Dados: Imagine uma lista, ela vai pra segunda parte da lista e depois volta pra primeira, só ai são 3 chamadas backend, mesmo sendo os mesmos dados. Ao usar esse método, podemos guardar os dados das requisições em um cache na aplicação, e quando a pessoa precisar dos dados, ele pega de lá, uma melhor usuabilidade.

  - vamos usar o MIRAGE! Para fornecer dados falsos.
}

React Query: {
  - controlar o estado - a comunicação entre servidor e browser - da aplicação;

  - cache local;
  - usa uma estratégia chamada stale while revalidate: quando os dados estão em cache, a bibli vai mostrar os dados mais recentes mostrados anteriormente, mesmo que os dados estejam obsoletos de certa forma. Ele vai monitorar esses dados, e a partir do momento em que perceber uma mudança, ele vai atualizar em tela;
  - ele vai fazer a chamada, da mesma forma, mas não vai precisar esperar ela aparecer para renderizar em tela, e só vai renderizar novamente se perceber uma mudança nos dados;

  - revalidate onFocus: ele vai refazer uma chamada a api quando a janela receber foco, ou seja, o usuário muda a pagina mas deixa o app ali, e quando visitar a janela novamente, vai recarregar os dados;

  - console do react query: {
    - ao clicar nos dados que você quer ver recebe algum tipo: {
      slate: obsoletos, o react query vai buscar os dados quando puder novamente;
      fetcing: em processo ainda de carregar;
      fresh: dado recente, mas ele assume que todos os dados que são trazidos, já estão obsoletos
    }
  }

  - É bom ter dois tipos de loading, um para a primeira requisição e outro para atualizações visuais dos componentes;

  - Prefetch Data: {
    carregar os dados antes e deixar eles em cache para se precisar, vir muito rápido;
  }

  - Mutations: {
    - formas de criar, alterar ou deletar coisas da api do mirage;

    - criando o usuário atraves de useMutation = podemos monitorar o estado da chamada, tipo em Loading pro botão;
  }
}

- No frontend é melhor perceber aquilo que tá dificultando a manutenção do código e então trabalhar na arquitetura e não tentar deixar tudo bonitinho logo no começo;

- Funções são para propositos, se o codigo que está na função tive um proposito unico, é por separar em outra função;

- Paaaginação!!: {
  é aqui onde dá pra perceber o poder do react query, e como ele pode ser bem suado para gerar resultados ótimos, pois quando muda de página, é uma nova conslta, que demora um tempo, e se isso estiver em cache, é instantaneo;
}

- Mirage: {
  Serialização: forma de os dados passarem por esse processo para o mirage ter controle deles e usar;
}

_______________________________


[`Autenticação `]

Formas: {
  - Next Auth: solução simples, mas não tem uma boa integração quando você já tem seu proprio backend, então é bom usar para quando você quer adicionar logins com redes sociais e ter seu proprio backend;

  - Estrutura de Auth: {
    1° Frontend -> Sign In -> envio POST / sessions {email, password};
    2° Backend -> Geraçaõde JWT;
    3° Armazenamento do JWT: LocalStorage, SessionStorage, Cookies;
    4° Em outras requisições ao backend, podemos enviar com o JWT através do header;
    5° Backend vai conseguir validar o acesso do usuário as outras rotas por esse JWT;
    6° É recomendado configurar o tempo de expiração, pois esse é um token StateLess, não é armazenado no backend para não deixar rastros, e o backend apenas consegue validar ele através da Secret Signature;
    7° Junto com a Geração do JWT, deve ser gerado um RefreshToken que é armazenado no back-end, que é responsavel, no momento em que o frontend perceber a expiração do token, enviar o refresh token e o backend valida ele automaticamente e devolve um novo JWT e um novo RefreshToken e assim o ciclo continua;
    8° Porque usar isso, é simples, como o RefreshToken é armazenado no backend, temos um controle muito fácil dele, podemos revogar, diferente de apenas um jwt em que é impossível retirar o acesso.
  }

  - A questão é que tem muita coisa em volta de usar um JWT e Autenticar, por isso o módulo.
}