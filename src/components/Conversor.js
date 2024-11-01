import React, { useState } from 'react';

const Conversor = () => {
    const [valor, setValor] = useState(0);
    const [unidadeOrigem, setUnidadeOrigem] = useState('metros');
    const [unidadeDestino, setUnidadeDestino] = useState('centimetros');
    const [resultado, setResultado] = useState(null);
    const [erro, setErro] = useState(null); // Estado para armazenar erros

    const converter = async () => {
        setErro(null); // Limpa o erro antes de fazer a requisição
        try {
            const response = await fetch(`https://localhost:7084/api/conversor/convert?valor=${valor}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`);
            
            if (!response.ok) { // Se a resposta não for 200
                const errorText = await response.text(); // Captura a resposta como texto
                throw new Error(errorText); // Lança um erro com a mensagem
            }

            const data = await response.json();
            setResultado(data);
        } catch (error) {
            console.error("Erro ao converter:", error.message);
            setErro(error.message); // Armazena a mensagem de erro no estado
        }
    };
    return (
        <div className="p-4 flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-500 mb-6">Conversor de Medidas</h1>
            <div className="flex items-center mb-4">
                <label htmlFor="valor" className="mr-2 text-lg">Valor:</label>
                <input
                    id="valor"
                    type="number"
                    placeholder="Digite o valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="border p-2 rounded"
                />
            </div>
            <div className="flex items-center mb-4">
                <div className="flex flex-col mr-4">
                    <label htmlFor="unidadeOrigem" className="mb-2 text-lg">Unidade de Origem:</label>
                    <select
                        id="unidadeOrigem"
                        value={unidadeOrigem}
                        onChange={(e) => setUnidadeOrigem(e.target.value)}
                        className="border p-2 m-2 rounded"
                    >
                        <option value="metros">Metros</option>
                        <option value="centimetros">Centímetros</option>
                        <option value="polegadas">Polegadas</option>
                        {/* Adicione outras opções de unidades conforme necessário */}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="unidadeDestino" className="mb-2 text-lg">Unidade de Destino:</label>
                    <select
                        id="unidadeDestino"
                        value={unidadeDestino}
                        onChange={(e) => setUnidadeDestino(e.target.value)}
                        className="border p-2 m-2 rounded"
                    >
                        <option value="Centríme">Centímetros</option>
                        <option value="metros">Metros</option>
                        <option value="polegadas">Polegadas</option>
                        {/* Adicione outras opções de unidades conforme necessário */}
                    </select>
                </div>
            </div>
            <button onClick={converter} className="bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-600 transition duration-300">Converter</button>
            {resultado !== null && <p className="mt-4 text-lg">{valor} {unidadeOrigem}, é o mesmo que {resultado} {unidadeDestino}</p>}
            {erro && <p className="mt-4 text-red-500">Erro: {erro}</p>}
        </div>
    );
};

export default Conversor;