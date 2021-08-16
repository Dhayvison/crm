<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Role;
use App\Models\Team;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => Hash::make('12345678'),
        ]);
        User::factory(15)->create();

        $DEPARTMENTS = [
            ['Tecnologia da Informação (TI)', 'Responsável por gerenciar as informações em uma organização, criando e distribuindo-as em redes de computadores, além de lidar com processamento de dados, engenharia de software, informática, hardwares e softwares.'],
            ['Atendimento ao Cliente', 'Responsável por receber e solucionar as demandas e solicitações apresentadas pelos clientes atuais e futuros da empresa.'],
            ['Administrativo', 'Tem a responsabilidade de elaborar as estratégias da empresa, gerenciar as tarefas, fiscalizar as atividades dos demais departamentos e tomar decisões importantes.'],
            ['Financeiro', 'Exerce controle no fluxo de caixa, garantindo uma boa gestão sobre as despesas, receitas, repasse de recursos e demais movimentações financeiras.'],
            ['Recursos Humanos (RH)', 'Responsável por espalhar a cultura organizacional, capacitar e estimular os funcionários, realizar a comunicação interna, garantir a segurança no trabalho etc.'],
            ['Comercial', 'Responsável pelas atividades de venda da empresa, desde as estratégias de divulgação dos produtos ou serviços até a prospecção e fidelização de clientes.'],

        ];

        foreach ($DEPARTMENTS as $department) {
            Department::factory()->create([
                'name' => $department[0],
                'description' => $department[1],
            ]);
        }
        Department::factory(5)->create();

        Role::factory(15)->create();
        Team::factory(10)->create();
    }
}
