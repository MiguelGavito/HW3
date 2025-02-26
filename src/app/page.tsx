'use client';
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-800">
      <h1 className="text-4xl font-bold text-white">Buscador de Nombres</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un nombre y presiona Enter"
        className="p-2 rounded-md text-gray-800"
      />
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded shadow text-gray-800"
            style={{ width: '150px' }}
          >
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="ml-2 text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}