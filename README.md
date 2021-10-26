<a href="#"><img src="https://user-images.githubusercontent.com/34067572/132998471-b4fea8a1-4aa6-4000-b496-1c82ff66438d.png" height="50"></img></a>
# CRM 

Bem vindo! Este projeto implementa um sistema gerenciador de recursos para uma empresa fictícia. Inpirado em https://demo.inertiajs.com/login. 

Você pode acessar o estado atual do produto aqui ->  https://crm-test-123.herokuapp.com/  

login: johndoe@example.com  
password: 12345678  

Stack:

- [Laravel 8](https://laravel.com/) 
- [InertiaJS](https://inertiajs.com/)
- [ReactJS](https://reactjs.org/)
- [Bumbag UI](https://bumbag.style/)
- SQLite 

O banco de dados é resetado a cada 30 min de inatividade, quando o container dorme.
Então, sinta-se à vontade para criar e editar os dados existentes.

### 🖥 Configuração local

Clone o repositório
```
git clone https://github.com/Dhayvison/crm.git
```

#### Com Docker 🐋

Execute o build up dos containers
```
./vendor/bin/sail up
```
