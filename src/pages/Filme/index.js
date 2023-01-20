import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api'

import './filme-info.css'


function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmes(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "9f4669b483ff6e34169981a24564f287",
                    languege: "pt-BR",
                    
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado")
                navigation("/", { replace: true});
                return;
            })
        }
        loadFilmes();

        return() => {
           console.log("componente desmontado") 
        }

    },[navigation, id]);

    function salvarFilmes() { 
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Este filme já está na lista");
            return

        }
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")


    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    return(
    <div className="filme-info">
    <h1>{filme.title}</h1>
         <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

         <h3>Sinopse</h3>
         <span>{filme.overview}</span>
         <strong>Avaliação: {filme.vote_average} /10</strong>


        <div className="area-button">
        <button onClick={salvarFilmes}>Salvar</button>
        <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
        </div>

    </div>
    )}


export default Filme;