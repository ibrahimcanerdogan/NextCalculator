'use client';

import { useState } from 'react';

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<{
    amount: number;
    total: number;
    difference: number;
  } | null>(null);

  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [percentageChange, setPercentageChange] = useState<number | null>(null);

  const calculatePercentage = () => {
    if (!value || !percentage) {
      setResult(null);
      return;
    }

    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);

    if (isNaN(numValue) || isNaN(numPercentage)) {
      setResult(null);
      return;
    }

    const amount = (numValue * numPercentage) / 100;
    const total = numValue + amount;
    const difference = amount;

    setResult({
      amount,
      total,
      difference
    });
  };

  const calculatePercentageChange = () => {
    if (!originalValue || !newValue) {
      setPercentageChange(null);
      return;
    }

    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    if (isNaN(original) || isNaN(newVal)) {
      setPercentageChange(null);
      return;
    }

    const change = ((newVal - original) / original) * 100;
    setPercentageChange(change);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Yüzde Hesaplama</h3>
        <div className="space-y-4">
          <div>
            <label className="percentage-label block text-sm font-medium mb-2">
              Sayı
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="percentage-input w-full p-2 rounded-lg border"
              placeholder="Sayıyı girin"
            />
          </div>
          <div>
            <label className="percentage-label block text-sm font-medium mb-2">
              Yüzde
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="percentage-input w-full p-2 rounded-lg border"
              placeholder="Yüzdeyi girin"
            />
          </div>
          <button
            onClick={calculatePercentage}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Hesapla
          </button>
          {result && (
            <div className="percentage-result mt-4 p-4 rounded-lg">
              <div className="text-gray-500 text-sm">Sonuç</div>
              <div className="text-gray-800 text-lg">
                {value} sayısının %{percentage}&apos;i = {result.amount.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Yüzde Değişimi</h3>
        <div className="space-y-4">
          <div>
            <label className="percentage-label block text-sm font-medium mb-2">
              Orijinal Değer
            </label>
            <input
              type="number"
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value)}
              className="percentage-input w-full p-2 rounded-lg border"
              placeholder="Orijinal değeri girin"
            />
          </div>
          <div>
            <label className="percentage-label block text-sm font-medium mb-2">
              Yeni Değer
            </label>
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="percentage-input w-full p-2 rounded-lg border"
              placeholder="Yeni değeri girin"
            />
          </div>
          <button
            onClick={calculatePercentageChange}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Değişimi Hesapla
          </button>
          {percentageChange !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-medium">Sonuç:</p>
              <p className={`text-lg mt-2 ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 