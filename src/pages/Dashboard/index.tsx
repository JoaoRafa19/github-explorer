import React, { useEffect, useState } from "react";
import { Title, Form, Repositories, Error } from './styles'
import { FiChevronRight } from 'react-icons/fi';
import {Link} from 'react-router-dom';

import logoImage from '../../assets/logo.svg';
import api from "../../services/api";

interface Repository {
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string,
    },
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem("@GithubExplorer:repositories");
        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        }
        return [];
    });


    async function handleAddRepository(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        if (!newRepo) {
            setInputError(`Digite um 'autor/repositório' válido`);
            return;
        }
        // Adicionar repositorio
        // Ir na api e consumir o repositorio
        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)
            const repository = response.data;
            setRepositories([
                ...repositories,
                repository
            ])
            setNewRepo("");
            setInputError(``);
            //adicionar o novo repositório do local storage
        } catch (error) {
            setInputError(`Erro: Digite um 'autor/repositório' válido`);
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        localStorage.setItem("@GithubExplorer:repositories", JSON.stringify(repositories))

    }, [repositories]);

    return <>
        <img src={logoImage} alt="Github Explorer" />
        <Title>Explore repositórios no Github</Title>
        <Form $haserror={!!inputError} onSubmit={handleAddRepository}>
            <input placeholder="Digite o nome do repositório" value={newRepo} onChange={(e) => setNewRepo(e.target.value)} ></input>
            <button type="submit">Pesquisar</button>
        </Form>
        {
            inputError && <Error>
                {inputError}
            </Error>
        }
        <Repositories>
            {repositories.map(repo => (
                <Link key={repo.full_name} to={`/repository/${repo.full_name}`}>
                    <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                    <div>
                        <strong>{repo.full_name}</strong>
                        <p>{repo.description}</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>))}
        </Repositories>
    </>
}


export default Dashboard
