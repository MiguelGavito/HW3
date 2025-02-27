'use client';
import { useState } from 'react';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [items, setItems] = useState<{ name: string; temperature: number; condition: string }[]>([]);

  const handleSearch = async (city: string) => {
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      setItems((prevItems) => [...prevItems, weatherData]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

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
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-800">
      <h1 className="text-4xl font-bold text-white">Buscador de Clima</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 bg-white rounded shadow text-gray-800 w-48"
        >
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p>{item.temperature}°C</p>
          <p>{item.condition}</p>
          <button
            onClick={() => handleRemoveItem(index)}
            className="mt-2 text-red-500"
          >
            X
          </button>
        </div>
      ))}

      </div>
    </main>
  );
}
