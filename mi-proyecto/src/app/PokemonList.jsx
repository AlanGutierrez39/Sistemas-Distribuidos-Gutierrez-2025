"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Componente PokemonItem
function PokemonItem({ name, url, onClick, count }) {
    return (
        <button
            style={{
                display: 'block',
                width: '100%',
                margin: '8px 0',
                padding: '12px',
                textAlign: 'left',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: '#f9f9f9',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
            <div style={{ fontSize: '0.9em', color: '#555' }}>URL: {url}</div>
            <div style={{ fontSize: '0.9em', color: '#007bff' }}>
                Usado: {count} {count === 1 ? 'vez' : 'veces'}
            </div>
        </button>
    );
}

// Componente principal PokemonList
function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [usageCounts, setUsageCounts] = useState({});

    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((res) => {
                setPokemons(res.data.results);
                // Inicializar los contadores en 0
                const initialCounts = {};
                res.data.results.forEach((p) => {
                    initialCounts[p.name] = 0;
                });
                setUsageCounts(initialCounts);
            })
            .catch((err) => {
                console.error('Error fetching pokemons:', err);
            });
    }, []);

    const handleItemClick = (name) => {
        setUsageCounts((prev) => ({
            ...prev,
            [name]: prev[name] + 1,
        }));
    };

    return (
        <div>
            <h2>Lista de Pokémons</h2>
            {pokemons.map((pokemon) => (
                <PokemonItem
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                    count={usageCounts[pokemon.name] || 0}
                    onClick={() => handleItemClick(pokemon.name)}
                />
            ))}
        </div>
    );
}

export default PokemonList;