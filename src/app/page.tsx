'use client';
import { useState } from 'react';
import { getWeather } from './lib/weather';
import SearchBar from './components/SearchBar';


interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    uv: number;
    air_quality?: {
      "us-epa-index"?: number;
    };
    condition: {
      text: string;
      icon: string;
    };
  };
}

export default function Home() {
  const [cities, setCities] = useState<WeatherData[]>([]);
  
  const handleSearch = async (city: string) => {
    const wData = await getWeather(city);
    if (wData) {
      setCities((prev) => [...prev, wData]);
    }
  };

  const handleRemoveCity = (cityName: string) => {
    setCities((prev) => prev.filter((c) => c.location.name !== cityName));
  };

  /*
  const fetchWeather = async (city: string) => {
    const apiKey = 'a0c6764eea434cf5888133734252702';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Ciudad no encontrada');
      const data = await response.json();
      return {
        name: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  */
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black gap-4 p-4">
      <h1 className="text-4xl font-bold text-white">Clima</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {cities.map((cityData) => (
          <div
            key={cityData.location.name}
            className="p-4 bg-white rounded-md shadow relative"
          >
            <button
              onClick={() => handleRemoveCity(cityData.location.name)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {cityData.location.name}, {cityData.location.country}
            </h2>
            <p className="text-gray-800">Temperatura: {cityData.current.temp_c}°C</p>
            <p className="text-gray-800">{cityData.current.condition.text}</p>
            <img src={`https:${cityData.current.condition.icon}`} alt="Weather icon" />
            <p className="text-gray-800">Humedad: {cityData.current.humidity}%</p>
            <p className="text-gray-800">Índice UV: {cityData.current.uv}</p>
            {cityData.current.air_quality && (
              <p className="text-gray-800">
                Calidad del Aire (US-EPA): {cityData.current.air_quality["us-epa-index"]}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
