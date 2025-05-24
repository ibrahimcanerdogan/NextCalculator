'use client';

import { useState } from 'react';

type UnitType = 'length' | 'weight' | 'currency' | 'temperature';

interface Unit {
  label: string;
  value: string;
  convert: (value: number, toUnit: string) => number;
}

const units: Record<UnitType, Unit[]> = {
  length: [
    { label: 'Milimetre (mm)', value: 'mm', convert: (v, to) => {
      const toMeter = v / 1000;
      switch(to) {
        case 'cm': return toMeter * 100;
        case 'm': return toMeter;
        case 'km': return toMeter / 1000;
        case 'in': return toMeter * 39.3701;
        case 'ft': return toMeter * 3.28084;
        case 'yd': return toMeter * 1.09361;
        default: return v;
      }
    }},
    { label: 'Santimetre (cm)', value: 'cm', convert: (v, to) => {
      const toMeter = v / 100;
      switch(to) {
        case 'mm': return toMeter * 1000;
        case 'm': return toMeter;
        case 'km': return toMeter / 1000;
        case 'in': return toMeter * 39.3701;
        case 'ft': return toMeter * 3.28084;
        case 'yd': return toMeter * 1.09361;
        default: return v;
      }
    }},
    { label: 'Metre (m)', value: 'm', convert: (v, to) => {
      switch(to) {
        case 'mm': return v * 1000;
        case 'cm': return v * 100;
        case 'km': return v / 1000;
        case 'in': return v * 39.3701;
        case 'ft': return v * 3.28084;
        case 'yd': return v * 1.09361;
        default: return v;
      }
    }},
    { label: 'Kilometre (km)', value: 'km', convert: (v, to) => {
      const toMeter = v * 1000;
      switch(to) {
        case 'mm': return toMeter * 1000;
        case 'cm': return toMeter * 100;
        case 'm': return toMeter;
        case 'in': return toMeter * 39.3701;
        case 'ft': return toMeter * 3.28084;
        case 'yd': return toMeter * 1.09361;
        default: return v;
      }
    }},
    { label: 'İnç (in)', value: 'in', convert: (v, to) => {
      const toMeter = v / 39.3701;
      switch(to) {
        case 'mm': return toMeter * 1000;
        case 'cm': return toMeter * 100;
        case 'm': return toMeter;
        case 'km': return toMeter / 1000;
        case 'ft': return toMeter * 3.28084;
        case 'yd': return toMeter * 1.09361;
        default: return v;
      }
    }},
    { label: 'Fit (ft)', value: 'ft', convert: (v, to) => {
      const toMeter = v / 3.28084;
      switch(to) {
        case 'mm': return toMeter * 1000;
        case 'cm': return toMeter * 100;
        case 'm': return toMeter;
        case 'km': return toMeter / 1000;
        case 'in': return toMeter * 39.3701;
        case 'yd': return toMeter * 1.09361;
        default: return v;
      }
    }},
    { label: 'Yarda (yd)', value: 'yd', convert: (v, to) => {
      const toMeter = v / 1.09361;
      switch(to) {
        case 'mm': return toMeter * 1000;
        case 'cm': return toMeter * 100;
        case 'm': return toMeter;
        case 'km': return toMeter / 1000;
        case 'in': return toMeter * 39.3701;
        case 'ft': return toMeter * 3.28084;
        default: return v;
      }
    }},
  ],
  weight: [
    { label: 'Miligram (mg)', value: 'mg', convert: (v, to) => {
      const toGram = v / 1000;
      switch(to) {
        case 'g': return toGram;
        case 'kg': return toGram / 1000;
        case 'oz': return toGram * 0.035274;
        case 'lb': return toGram * 0.00220462;
        default: return v;
      }
    }},
    { label: 'Gram (g)', value: 'g', convert: (v, to) => {
      switch(to) {
        case 'mg': return v * 1000;
        case 'kg': return v / 1000;
        case 'oz': return v * 0.035274;
        case 'lb': return v * 0.00220462;
        default: return v;
      }
    }},
    { label: 'Kilogram (kg)', value: 'kg', convert: (v, to) => {
      const toGram = v * 1000;
      switch(to) {
        case 'mg': return toGram * 1000;
        case 'g': return toGram;
        case 'oz': return toGram * 0.035274;
        case 'lb': return toGram * 0.00220462;
        default: return v;
      }
    }},
    { label: 'Ons (oz)', value: 'oz', convert: (v, to) => {
      const toGram = v / 0.035274;
      switch(to) {
        case 'mg': return toGram * 1000;
        case 'g': return toGram;
        case 'kg': return toGram / 1000;
        case 'lb': return toGram * 0.00220462;
        default: return v;
      }
    }},
    { label: 'Pound (lb)', value: 'lb', convert: (v, to) => {
      const toGram = v / 0.00220462;
      switch(to) {
        case 'mg': return toGram * 1000;
        case 'g': return toGram;
        case 'kg': return toGram / 1000;
        case 'oz': return toGram * 0.035274;
        default: return v;
      }
    }},
  ],
  temperature: [
    { label: 'Celsius (°C)', value: 'c', convert: (v, to) => {
      switch(to) {
        case 'f': return (v * 9/5) + 32;
        case 'k': return v + 273.15;
        default: return v;
      }
    }},
    { label: 'Fahrenheit (°F)', value: 'f', convert: (v, to) => {
      switch(to) {
        case 'c': return (v - 32) * 5/9;
        case 'k': return (v - 32) * 5/9 + 273.15;
        default: return v;
      }
    }},
    { label: 'Kelvin (K)', value: 'k', convert: (v, to) => {
      switch(to) {
        case 'c': return v - 273.15;
        case 'f': return (v - 273.15) * 9/5 + 32;
        default: return v;
      }
    }},
  ],
  currency: [
    { label: 'Türk Lirası (TRY)', value: 'try', convert: (v, to) => {
      // Not: Gerçek uygulamada API'den güncel kurları çekmelisiniz
      const rates: Record<string, number> = {
        usd: 0.031,
        eur: 0.029,
        gbp: 0.025,
        jpy: 4.67,
        cny: 0.22,
        try: 1
      };
      return v * rates[to];
    }},
    { label: 'Amerikan Doları (USD)', value: 'usd', convert: (v, to) => {
      const rates: Record<string, number> = {
        try: 32.26,
        eur: 0.93,
        gbp: 0.80,
        jpy: 150.65,
        cny: 7.10,
        usd: 1
      };
      return v * rates[to];
    }},
    { label: 'Euro (EUR)', value: 'eur', convert: (v, to) => {
      const rates: Record<string, number> = {
        try: 34.69,
        usd: 1.08,
        gbp: 0.86,
        jpy: 162.01,
        cny: 7.63,
        eur: 1
      };
      return v * rates[to];
    }},
    { label: 'İngiliz Sterlini (GBP)', value: 'gbp', convert: (v, to) => {
      const rates: Record<string, number> = {
        try: 40.33,
        usd: 1.25,
        eur: 1.16,
        jpy: 188.31,
        cny: 8.88,
        gbp: 1
      };
      return v * rates[to];
    }},
    { label: 'Japon Yeni (JPY)', value: 'jpy', convert: (v, to) => {
      const rates: Record<string, number> = {
        try: 0.21,
        usd: 0.0066,
        eur: 0.0062,
        gbp: 0.0053,
        cny: 0.047,
        jpy: 1
      };
      return v * rates[to];
    }},
    { label: 'Çin Yuanı (CNY)', value: 'cny', convert: (v, to) => {
      const rates: Record<string, number> = {
        try: 4.55,
        usd: 0.14,
        eur: 0.13,
        gbp: 0.11,
        jpy: 21.22,
        cny: 1
      };
      return v * rates[to];
    }}
  ],
};

export default function UnitConverter() {
  const [conversionType, setConversionType] = useState<UnitType>('length');
  const [fromUnit, setFromUnit] = useState(units[conversionType][0].value);
  const [toUnit, setToUnit] = useState(units[conversionType][1].value);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    if (!value) {
      setResult('');
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('Geçersiz değer');
      return;
    }

    const fromUnitObj = units[conversionType].find(u => u.value === fromUnit);
    if (!fromUnitObj) {
      setResult('Birim bulunamadı');
      return;
    }

    try {
      const converted = fromUnitObj.convert(numValue, toUnit);
      if (typeof converted !== 'number' || isNaN(converted)) {
        setResult('Dönüştürme hatası');
        return;
      }
      setResult(converted.toFixed(4));
    } catch (error) {
      console.error('Unit conversion error:', error);
      setResult('Dönüştürme hatası');
    }
  };

  const handleTypeChange = (newType: UnitType) => {
    setConversionType(newType);
    setFromUnit(units[newType][0].value);
    setToUnit(units[newType][1].value);
    setValue('');
    setResult('');
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="converter-label block text-sm font-medium mb-2">
            Dönüştürme Tipi
          </label>
          <select
            value={conversionType}
            onChange={(e) => handleTypeChange(e.target.value as UnitType)}
            className="converter-select w-full p-2 rounded-lg border"
          >
            <option value="length">Uzunluk</option>
            <option value="weight">Ağırlık</option>
            <option value="temperature">Sıcaklık</option>
            <option value="currency">Para Birimi</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="converter-label block text-sm font-medium mb-2">
              Kaynak Birim
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="converter-select w-full p-2 rounded-lg border"
            >
              {units[conversionType].map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="converter-label block text-sm font-medium mb-2">
              Hedef Birim
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="converter-select w-full p-2 rounded-lg border"
            >
              {units[conversionType].map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="converter-label block text-sm font-medium mb-2">
            Değer
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="converter-select w-full p-2 rounded-lg border"
            placeholder="Dönüştürülecek değeri girin"
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Dönüştür
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="text-gray-500 text-sm">Sonuç</div>
            <div className="text-gray-800 text-lg">
              {value} {fromUnit} = {result} {toUnit}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 