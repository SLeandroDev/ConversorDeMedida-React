import React, { useState } from 'react';

const Conversor = () => {
    const [valor, setValor] = useState(0);
    const [unidadeOrigem, setUnidadeOrigem] = useState('metros');
    const [unidadeDestino, setUnidadeDestino] = useState('centimetros');
    const [resultadoComprimento, setResultadoComprimento] = useState(null);
    const [erroComprimento, setErroComprimento] = useState('');
    
    const [resultadoPeso, setResultadoPeso] = useState(null);
    const [erroPeso, setErroPeso] = useState('');

    const [resultadoLiquidos, setResultadoLiquidos] = useState(null);
    const [erroLiquidos, setErroLiquidos] = useState('');

    const [erro, setErro] = useState(null); // Estado para armazenar erros

    const handleValorChange = (e) => {
        setValor(e.target.value);
        setResultadoComprimento(null); // Limpa o resultado específico
        setResultadoPeso(null); // Limpa o resultado específico
        setResultadoLiquidos(null); // Limpa o resultado específico
        setErro('');
    };

    const handleUnidadeOrigemChange = (e) => {
        setUnidadeOrigem(e.target.value);
        setResultadoComprimento(null);
        setResultadoPeso(null);
        setResultadoLiquidos(null);
        setErro('');
    };

    const handleUnidadeDestinoChange = (e) => {
        setUnidadeDestino(e.target.value);
        setResultadoComprimento(null);
        setResultadoPeso(null);
        setResultadoLiquidos(null);
        setErro('');
    };

    const converter = async (tipoConversor) => {
        setErroComprimento('');
        setErroPeso('');
        setErroLiquidos('');
        try {
            let url = '';
            switch (tipoConversor) {
                case 'comprimento':
                    url = `https://localhost:7084/api/conversorComprimento/comprimento?valor=${valor}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`;
                    break;
                case 'peso':
                    url = `https://localhost:7084/api/conversorPeso/peso?valor=${valor}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`;
                    break;
                case 'liquidos':
                    url = `https://localhost:7084/api/conversorLiquido/liquidos?valor=${valor}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`;
                    break;
                default:
                    throw new Error("Tipo de conversor inválido");
            }

            const response = await fetch(url);
            
            if (!response.ok) { // Se a resposta não for 200
                const errorText = await response.text(); // Captura a resposta como texto
                throw new Error(errorText); // Lança um erro com a mensagem
            }

            const data = await response.json();

            // Atualiza o estado correto com base no tipoConversor
            if (tipoConversor === 'comprimento') {
                setResultadoComprimento(data);
            } else if (tipoConversor === 'peso') {
                setResultadoPeso(data);
            } else if (tipoConversor === 'liquidos') {
                setResultadoLiquidos(data);
            }
        } catch (error) {
            console.error("Erro ao converter:", error.message);

            if (tipoConversor === 'comprimento') {
                setErroComprimento(error.message);
            } else if (tipoConversor === 'peso') {
                setErroPeso(error.message);
            } else if (tipoConversor === 'liquidos') {
                setErroLiquidos(error.message);
            }
        }
    };

    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-500 mb-6">Conversor de Medidas</h1>

            {/* Contêiner dos cards */}
            <div className="flex flex-wrap justify-between gap-4 w-full max-w-5xl">
                {/* Conversor de Comprimento */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1 min-w-[250px] max-w-[300px]">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversor de Comprimento</h2>

            <div className="flex items-center mb-4">
                <label htmlFor="valor" className="mr-2 text-lg">Valor:</label>
                <input
                    id="valor"
                    type="number"
                    placeholder="Digite o valor"
                    value={valor}
                            onChange={handleValorChange}
                            className="border p-2 rounded w-full"
                />
            </div>
            <div className="flex items-center mb-4">
                        <div className="flex flex-col mr-4 w-full">
                    <label htmlFor="unidadeOrigem" className="mb-2 text-lg">Unidade de Origem:</label>
                    <select
                        id="unidadeOrigem"
                        value={unidadeOrigem}
                                onChange={handleUnidadeOrigemChange}
                                className="border p-2 rounded w-full"
                    >
                                <option value="Metros">Metros</option>
                        <option value="centimetros">Centímetros</option>
                                <option value="Polegadas">Polegadas</option>
                    </select>
                </div>
                        <div className="flex flex-col w-full">
                    <label htmlFor="unidadeDestino" className="mb-2 text-lg">Unidade de Destino:</label>
                    <select
                        id="unidadeDestino"
                        value={unidadeDestino}
                                onChange={handleUnidadeDestinoChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="Metros">Metros</option>
                                <option value="centimetros">Centímetros</option>
                                <option value="Polegadas">Polegadas</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => converter('comprimento')} className="bg-blue-500 text-white p-2 m-2 rounded w-full hover:bg-blue-600 transition duration-300">Converter</button>

                    {resultadoComprimento !== null && (
                        <div role="alert" className="mt-4 p-2 text-green-700 bg-green-200 border border-green-300 rounded">
                            {valor} {unidadeOrigem} é o mesmo que {resultadoComprimento} {unidadeDestino}
                        </div>
                    )}

                    {erroComprimento && (
                        <div role="alert" className="mt-4 p-2 text-red-700 bg-red-200 border border-red-300 rounded">
                            {erroComprimento}
                        </div>
                    )}
                </div>

                {/* Card 2 - Conversor de Peso */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1 min-w-[250px] max-w-[300px]">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversor de Peso</h2>
                    <div className="flex items-center mb-4">
                        <label htmlFor="peso" className="mr-2 text-lg">Peso:</label>
                        <input
                            id="peso"
                            type="number"
                            placeholder="Digite o valor"
                            value={valor}
                            onChange={handleValorChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="flex flex-col mr-4 w-full">
                            <label htmlFor="unidadeOrigemPeso" className="mb-2 text-lg">Unidade de Origem:</label>
                            <select
                                id="unidadeOrigemPeso"
                                value={unidadeOrigem}
                                onChange={handleUnidadeOrigemChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="Kg">Kg</option>
                                <option value="Gramas">Gramas</option>
                                <option value="Toneladas">Toneladas</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="unidadeDestinoPeso" className="mb-2 text-lg">Unidade de Destino:</label>
                            <select
                                id="unidadeDestinoPeso"
                                value={unidadeDestino}
                                onChange={handleUnidadeDestinoChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="Kg">Kg</option>
                                <option value="Gramas">Gramas</option>
                                <option value="Toneladas">Toneladas</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => converter('peso')} className="bg-blue-500 text-white p-2 m-2 rounded w-full hover:bg-blue-600 transition duration-300">Converter</button>

                    {resultadoPeso !== null && (
                        <div role="alert" className="mt-4 p-2 text-green-700 bg-green-200 border border-green-300 rounded">
                            {valor} {unidadeOrigem} é o mesmo que {resultadoPeso} {unidadeDestino}
                        </div>
                    )}

                    {erroPeso && (
                        <div role="alert" className="mt-4 p-2 text-red-700 bg-red-200 border border-red-300 rounded">
                            {erroPeso}
                        </div>
                    )}
                </div>

                {/* Card 3 - Conversor de Líquidos */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1 min-w-[250px] max-w-[300px]">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversor de Líquidos</h2>
                    <div className="flex items-center mb-4">
                        <label htmlFor="valorLiquido" className="mr-2 text-lg">Líquido:</label>
                        <input
                            id="valorLiquido"
                            type="number"
                            placeholder="Digite o valor"
                            value={valor}
                            onChange={handleValorChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="flex flex-col mr-4 w-full">
                            <label htmlFor="unidadeOrigemLiquido" className="mb-2 text-lg">Unidade de Origem:</label>
                            <select
                                id="unidadeOrigemLiquido"
                                value={unidadeOrigem}
                                onChange={handleUnidadeOrigemChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="Litros">Litros</option>
                                <option value="Mililitros">Mililitros</option>
                                <option value="Galões">Galões</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="unidadeDestinoLiquido" className="mb-2 text-lg">Unidade de Destino:</label>
                            <select
                                id="unidadeDestinoLiquido"
                                value={unidadeDestino}
                                onChange={handleUnidadeDestinoChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="Litros">Litros</option>
                                <option value="Mililitros">Mililitros</option>
                                <option value="Galões">Galões</option>
                    </select>
                </div>
            </div>
                    <button onClick={() => converter('liquidos')} className="bg-blue-500 text-white p-2 m-2 rounded w-full hover:bg-blue-600 transition duration-300">Converter</button>

                    {resultadoLiquidos !== null && <p className="mt-4 text-lg text-center">{valor} {unidadeOrigem} é o mesmo que {resultadoLiquidos} {unidadeDestino}</p>}
                </div>
            </div>

        </div>
    );
};

export default Conversor;
