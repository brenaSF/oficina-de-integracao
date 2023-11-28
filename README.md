# Oficina-de-integracao

O ELLP (Ensino Lúdico de Lógica de Programação) é uma iniciativa da Universidade Tecnológica Federal do Paraná, dedicada a ensinar programação a jovens da rede pública de Cornélio Procópio. Para organizar as oficinas semanais, foi desenvolvido um sistema de gestão. Esse sistema desempenha um papel crucial na coordenação de voluntários e agendamento de oficinas.

### Funcionalidades
- CRUD de Voluntários: cadastro, leitura, atualização e exclusão.
- CRUD de Departamentos: cadastro, leitura, atualização e exclusão.
- CRUD de Oficinas: cadastro, leitura, atualização e exclusão.
- Termo de voluntário : leitura.
- Relatório de voluntário : consultar por ID.
- Consultar voluntário , oficina e departamento por ID.

### Para rodar o backend :

1) Instale a extensão Spring Boot  'Spring Boot Extension Pack'
2) Abrir o terminal e navegar até a pasta 'ellp_oficina'
3) Executar o comando 'mvnw.cmd spring-boot:run'

### Para rodar o frontend :
1) Executar a extensão Go live para visualizar a aplicação web

### Para visualizar o SQL : 
1) Na aba lateral , navegar 'ellp_oficina\src\main\resources\db\migrations'
2)Observação : Não mudar o script SQL das migrations, caso queira alterar , adicone uma nova migration. 
Caso contrário, podem haver problemas de inconsistência no banco, devido ao FLyway.



