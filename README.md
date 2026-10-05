# Easy Têxtil

MVP estático do Easy Têxtil baseado nos arquivos fornecidos.

## Rodar localmente

Como o projeto usa apenas HTML/CSS/JS e localStorage, pode ser aberto em um navegador. Para evitar restrições de módulos/arquivos locais em futuras evoluções, é recomendado usar um servidor estático local:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Publicação sem hospedagem paga

Pode ser publicado como site estático em GitHub Pages ou Cloudflare Pages. Assim, não há custo de hospedagem no plano gratuito; o domínio personalizado é o custo que você escolheu assumir.

## Importante sobre o login

O login desta versão é de demonstração e fica no `localStorage` do navegador. A senha não deve ser considerada segura e os dados não são sincronizados entre dispositivos.

Para transformar o Easy Têxtil em SaaS real, será necessário trocar essa camada por autenticação + banco de dados/backend. A interface e o modelo de dados já estão separados o suficiente para essa evolução.

## Funcionalidades

- Cadastro e login local
- Dashboard
- Cadastro/edição/exclusão de produtos
- Calculadora de custo total / quantidade
- Preço mínimo sem margem de lucro
- Tamanhos por letras, números e idade
- Upload de imagem do modelo
- Busca de produtos
- Exportação/importação JSON
- Cadastro de facções
- Cadastro de acabamentos
- Layout responsivo
