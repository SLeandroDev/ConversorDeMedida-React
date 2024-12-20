import React, { useState } from 'react';

const Conversor = () => {
    const [valorComprimento, setvalorComprimento] = useState(0);
    const [valorPeso, setvalorPeso] = useState(0);
    const [valorLiquido, setvalorLiquido] = useState(0);
    const [unidadeOrigem, setUnidadeOrigem] = useState('Selecione');
    const [unidadeDestino, setUnidadeDestino] = useState('Selecione');

    const [resultadoComprimento, setResultadoComprimento] = useState(null);
    const [erroComprimento, setErroComprimento] = useState('');
    
    const [resultadoPeso, setResultadoPeso] = useState(null);
    const [erroPeso, setErroPeso] = useState('');

    const [resultadoLiquidos, setResultadoLiquidos] = useState(null);
    const [erroLiquido, setErroLiquidos] = useState('');

    const [erro, setErro] = useState(null); // Estado para armazenar erros

    const handleValorComprimentoChange = (e) => {
        setvalorComprimento(e.target.value);
        setResultadoComprimento(null); // Limpa o resultado específico
        setErroComprimento('');
    };
    const handleValorPesoChange = (e) => {
        setvalorPeso(e.target.value);
        setResultadoPeso(null); // Limpa o resultado específico
        setErroPeso('');
    };
    const handleValorLiquidoChange = (e) => {
        setvalorLiquido(e.target.value);
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
                    url = `https://localhost:7084/api/conversorComprimento/comprimento?valor=${valorComprimento}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`;
                    break;
                case 'peso':
                    url = `https://localhost:7084/api/ConversorPeso/peso?valor=${valorPeso}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`;
                    break;
                case 'liquidos':
                    url = `https://localhost:7084/api/ConversorLiquido/liquido?valor=${valorLiquido}&unidadeOrigem=${unidadeOrigem}&unidadeDestino=${unidadeDestino}`;
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
            <h1 className="text-4xl font-bold text-blue-500 mb-6">Convertendo Medidas</h1>

            {/* Contêiner dos cards */}
            <div className="flex flex-wrap justify-between gap-4 w-full max-w-5xl">
                {/* Conversor de Comprimento */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1 min-w-[250px] max-w-[300px]">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Conversor de Comprimento</h2>

                    <div className="flex items-center mb-4">
                        <label htmlFor="valorComprimento" className="mr-2 text-lg">Valor:</label>
                        <input
                            id="valorComprimento"
                            type="number"
                            placeholder="Digite o valor"
                            value={valorComprimento}
                            onChange={handleValorComprimentoChange}
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
                                <option value="Selecione">Selecione...</option>
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
                                <option value="Selecione">Selecione...</option>
                                <option value="Metros">Metros</option>
                                <option value="centimetros">Centímetros</option>
                                <option value="Polegadas">Polegadas</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => converter('comprimento')} className="bg-blue-500 text-white p-2 m-2 rounded w-full hover:bg-blue-600 transition duration-300">Converter</button>

                    {resultadoComprimento !== null && (
                        <div role="alert" className="mt-4 p-2 text-green-700 bg-green-200 border border-green-300 rounded">
                            {valorComprimento} {unidadeOrigem} é o mesmo que {resultadoComprimento} {unidadeDestino}
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
                        <label htmlFor="valorPeso" className="mr-2 text-lg">Peso:</label>
                        <input
                            id="valorPeso"
                            type="number"
                            placeholder="Digite o valor"
                            value={valorPeso}
                            onChange={handleValorPesoChange}
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
                                <option value="Selecione">Selecione...</option>
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
                                <option value="Selecione">Selecione...</option>
                                <option value="Kg">Kg</option>
                                <option value="Gramas">Gramas</option>
                                <option value="Toneladas">Toneladas</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => converter('peso')} className="bg-blue-500 text-white p-2 m-2 rounded w-full hover:bg-blue-600 transition duration-300">Converter</button>

                    {resultadoPeso !== null && (
                        <div role="alert" className="mt-4 p-2 text-green-700 bg-green-200 border border-green-300 rounded">
                            {valorPeso} {unidadeOrigem} é o mesmo que {resultadoPeso} {unidadeDestino}
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
                            value={valorLiquido}
                            onChange={handleValorLiquidoChange}
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
                                <option value="Selecione">Selecione...</option>
                                <option value="Litros">Litros</option>
                                <option value="Mililitros">Mililitros</option>
                                <option value="MetrosCubicos">Metros Cubicos</option>
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
                                <option value="Selecione">Selecione...</option>
                                <option value="Litros">Litros</option>
                                <option value="Mililitros">Mililitros</option>
                                <option value="MetrosCubicos">Metros Cubicos</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => converter('liquidos')} className="bg-blue-500 text-white p-2 m-2 rounded w-full hover:bg-blue-600 transition duration-300">Converter</button>
                    
                    {resultadoLiquidos !== null && (
                        <div role="alert" className="mt-4 p-2 text-green-700 bg-green-200 border border-green-300 rounded">
                            {valorLiquido} {unidadeOrigem} é o mesmo que {resultadoLiquidos} {unidadeDestino}
                        </div>
                    )}

                    {erroLiquido && (
                        <div role="alert" className="mt-4 p-2 text-red-700 bg-red-200 border border-red-300 rounded">
                            {erroLiquido}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Conversor;
