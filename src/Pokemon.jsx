import './index.css';
import { useEffect, useState } from 'react';
import { PokemonCards } from './PokemonCards';

export const Pokemon = () =>{

    const [pokemon,setPokemon] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [search,setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?offset=3&limit=1000";
    const fetchPokemon = async () =>{
        try{
            const res = await fetch(API);
            const data = await res.json();
        
            const detailedPokemonData = data.results.map(async (curPokemon) =>{
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });
            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };
    useEffect(() =>{
        fetchPokemon();
    },[]);

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
);
    if(loading){
        return (
        <div>
            <h1>Loading...</h1>
        </div>
        );
    }
    if(error){
        return (
        <div>
            <h1>[error.message]</h1>
        </div>
        );
    }
    return (
      <>
      <section className="container">
        <header>
            <h1> Gotta Catch 'Em All</h1>
        </header>
    <div className="search-page-center">
        <div classname="pokemon-search">
            <input type="text" placeholder="Search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
    </div>
        <div>
            <ul className="cards">
                {searchData.map((curPokemon) => {
                     return (
                     <PokemonCards key={curPokemon.id} pokemonData = 
                     {curPokemon}/>
                    );
                })}
            </ul>
        </div>
      </section>
      </>  
    );
};