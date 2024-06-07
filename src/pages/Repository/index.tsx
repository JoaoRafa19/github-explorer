import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logoImage from '../../assets/logo.svg';

import { Header, Issues, RepositoryInfo, } from './styles';
import { FiChevronRight, FiChevronsLeft } from "react-icons/fi";
import api from "../../services/api";

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    title: string;
    id: number;
    html_url: string;
    user: {
        login: string;
    }
}


const Repository: React.FC = () => {
    let { org, "*": repositoryName } = useParams()
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function loadData(): Promise<void> {
            const [repo, issues] = await Promise.all([
                api.get(`repos/${repositoryName}`),
                api.get(`repos/${repositoryName}/issues`),
            ])
            setRepository(repo.data);
            setIssues(issues.data);
        };
        loadData();
    }, []);

    return (
        <>
            <Header>
                <img src={logoImage} alt="Github Explorer" />
                <Link to="/">
                    Voltar
                    <FiChevronsLeft size={16} />
                </Link>
            </Header>

            {repository && <RepositoryInfo>
                <header>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} ></img>
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>}

            <Issues>
                {issues.map(i => (
                    <a href={i.html_url} target="blank">
                        <div>
                            <strong>{i.title}</strong>
                            <p>{i.user.login}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                )
                )}
            </Issues>
        </>


    )



}


export default Repository;
