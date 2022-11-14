import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPokemons } from '../Interfaces/Pokemons';
import PokemonList from '../components/PokemonList';
import { Header } from '../components/Header';

import { useAplication } from "../provider/aplication";

import { HomeWrapper } from '../styles/globals';
import Loader from '../components/Utilities/Loader';
import React from 'react';

const Home = () => {

    const _qtd__ = 10
    const _offset__ = 0
    const _tot__ = 905

    const [pokemons, setPokemons] = useState<IPokemons[]>();
    const [pagina, setPagina] = useState<number>(1);
    const [offset, setOffset] = useState<number>(_offset__);
    const [total, setTotal] = useState<number>(_tot__);
    const [limit, setLimit] = useState<number>(_qtd__);

    const { aplication, setAplication } = useAplication();
   
    aplication.pageTitle = " - Home"

     function getPokemonList(type_pagination:string) {
    
        let offset_pagina = 0
        aplication.loader = true
        setAplication(aplication) 
        
        if(type_pagination === "avanc"){
            offset_pagina = offset + limit
            setOffset(() =>  offset_pagina)
            setPagina((prevState) => prevState + 1)
        }else if(type_pagination === "prev"){
            offset_pagina = offset - limit
            setOffset(() => offset_pagina)
            setPagina((prevState) => prevState - 1)
        }
       
        // 👇️ const data: GetPokemonListsResponse
         axios(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset_pagina}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Headers": "Authorization", 
                    // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
                    "Content-Type": "application/json;charset=UTF-8"
                },
            },
        ).then(function (response) {

            const { data, status } = response
            
            aplication.loader = false
            setAplication(aplication) 
            setPokemons([]);
            setPokemons(data.results);
           
        }).catch(function (error) {
            // handle error
            aplication.loader = false
            setAplication(aplication) 
            console.log('error message: ', error.message);
        }).finally(function () {
            // always executed
            aplication.loader = false
            setAplication(aplication) 
            console.log('nada')
            
        });
            
    }

    function getAvancPagina() {
        getPokemonList('avanc')
        return false
    }

    function getPrevPagina() {
        getPokemonList('prev')
        return false
    }

    useEffect(() => {   
     
        getPokemonList('')
        
    }, [])
   
    return (
        <HomeWrapper>
            <Header/>
           {(aplication.loader) && <Loader/>}
            <div id="poke_container" className="poke-container">
                
                {
                    pokemons?.map((data, i) => (
                        <PokemonList
                        key={i}
                        {...data}
                        />
                    ))
                }  
            </div>
            <nav>
                <ul className="pagination">
                    {
                        (pagina > 1) &&
                        <li className="pagination-item">
                            <a href="#" onClick={() => getPrevPagina()}>Anterior</a>
                        </li>
                    }
                        <li className="pagination-item">
                            <a href="#">{pagina}</a>
                        </li> 
                    {
                        (pagina < Math.ceil(total / limit)) &&
                        <li className="pagination-item">
                            <a href="#" onClick={() => getAvancPagina()}>Próximo</a>
                        </li>
                    }
                </ul>
            </nav>

        </HomeWrapper>
    );
};

export default Home;
