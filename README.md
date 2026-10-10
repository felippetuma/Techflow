# TechFlow

O **TechFlow** é uma projeto desenvolvido para o checkpoint 05 de **Front-End Design** com o foco na criação de uma dashboard para o acompanhamento de projetos, equipes e indicadores.

### Tecnologias

Nesse projeto do **TechFlow** foi utilizando as seguintes tecnologias: 

- Html
- Tailwind CSS
- JavaScript
- Vite

### Integrantes

| Membros | RM |
| ------- | -- |
| Arthur Nepomuceno | 572626 |
| Felippe Tuma | 569459 |
| Felipe Motta | 570550 |


## Principais Recursos Implementados:
Dashboard de projetos: visualização de indicadores e cards com informações sobre os projetos, incluindo responsáveis, prioridades, prazos e progresso.

Indicadores visuais: cards com dados de projetos ativos, projetos concluídos, tarefas pendentes e equipe.

Layout responsivo: interface adaptável a diferentes tamanhos de tela, utilizando os breakpoints do Tailwind CSS.

Sidebar interativa: menu lateral que se adapta ao dispositivo, com abertura e fechamento em telas menores.

Cadastro de projetos: modal com campos para preenchimento das informações e validação visual dos dados.

Alternância de tema: opções de tema claro, escuro e System, com preferência armazenada no navegador.

Dropdown do usuário: menu interativo com suporte à navegação por teclado.

Feedback visual: efeitos de hover, foco e clique, transições e mensagens de validação para melhorar a interação com a interface.


## Link do Github:
https://github.com/felippetuma/Techflow/edit/main/README.md


## Dificuldades encontradas:
Durante o desenvolvimento, alguns pontos exigiram mais atenção, principalmente na sincronização dos estados da interface e no comportamento dos componentes em diferentes dispositivos.

Sidebar responsiva
Um dos desafios foi fazer a sidebar funcionar de maneiras diferentes conforme o tamanho da tela. No desktop, ela permanece na estrutura principal da página; em telas menores, pode ser aberta como um menu lateral.

Para controlar esse comportamento, foi utilizada a função setOpenSide(open), que atualiza o atributo data-open da sidebar e do overlay. Também foram considerados o bloqueio da rolagem da página, o fechamento pelo teclado e o gerenciamento do foco. O matchMedia permite ajustar o estado do menu quando a tela passa pelo breakpoint lg.

Dropdown do usuário
O dropdown precisava manter o botão e o menu sincronizados durante a abertura e o fechamento. Para isso, a função setOpenUserMenu(open) centraliza as alterações de estado.

Também foram implementados comportamentos para fechar o menu ao clicar fora dele ou pressionar Esc, além de recursos de navegação por teclado, como as setas, Home e End.




