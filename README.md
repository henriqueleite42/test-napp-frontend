# Teste para FrontEnd Developer - NappSolutions

Sistema de CRUD de Produtos, Clientes e Vendas

## Regras de Negócio

Regras de Negócio para Cadastro e Edição

### Produtos

* SKU - Tem mais que 3 caracteres e menos de 20
* SKU - Não existe nenhum Produto cadastrado com o mesmo SKU
* Name - Tem mais que 3 caracteres e menos de 50
* Price - É maior do que zero
* Minimum Purchase Quantity - Maior ou igual a 1

### Clientes

* CPF - Possui 11 caracteres
* CPF - Não existe nenhum Cliente cadastrado com o mesmo CPF
* First Name - Tem mais que 3 caracteres e menos de 50
* Last Name - Tem mais que 3 caracteres e menos de 50

### Vendas

* Customer - Possui um cliente preenchido
* Produtos - Possui ao menos 1 produto
* Produtos.Quantidade - É maior ou igual a 1 ou a Minimum Purchase Quantity do Produto
* Produtos.Quantidade - É multiplo da Minimum Purchase Quantity do Produto
* Produtos.Price - É maior do que Zero
* Produtos.Price - É no maximo, 10% a menos do Valor do Produto
