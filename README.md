# Mazhoy-Ingressos-BackEnd


## Rondando a aplicação

Baixar uma imagem do postgres e rodar um container:
```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Iniciar aplicação em ambiente de desenvolvimento:
```bash
yarn start:dev
```

## Como verificar se o banco está rodando no container com todas as tabelas criadas normalmente:

No seu terminal:
```bash
docker exec -it postgres 
```
Depois o comando abaixo
```bash
psql -U postgres
```

Após o comando acima, você estará dentro do CLI do postgres.

## Os próximos passos são:

conectar com a banco chamado postgres: 
```bash
\c postgres
```

listar suas relações:
```bash
\dt
```

exibir as entradas de uma tabela específica (tabela de 'users' usada como exemplo'):
```sql
select * from users;
```
