'use client';

import { useState } from 'react';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysToAdd, setDaysToAdd] = useState('');
  const [dateToAdd, setDateToAdd] = useState('');
  const [result, setResult] = useState<{
    days: number;
    months: number;
    years: number;
    totalDays: number;
  } | null>(null);
  const [addedDateResult, setAddedDateResult] = useState<string | null>(null);

  const calculateDateDifference = () => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(totalDays / 365);
    const remainingDays = totalDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    setResult({
      years,
      months,
      days,
      totalDays
    });
  };

  const calculateAddedDate = () => {
    if (!dateToAdd || !daysToAdd) {
      setAddedDateResult(null);
      return;
    }

    const date = new Date(dateToAdd);
    const days = parseInt(daysToAdd);

    if (isNaN(date.getTime()) || isNaN(days)) {
      setAddedDateResult(null);
      return;
    }

    date.setDate(date.getDate() + days);
    setAddedDateResult(date.toLocaleDateString('tr-TR'));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Tarih Farkı Hesaplama</h3>
        <div className="space-y-4">
          <div>
            <label className="date-label block text-sm font-medium mb-2">
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input w-full p-2 rounded-lg border"
            />
          </div>
          <div>
            <label className="date-label block text-sm font-medium mb-2">
              Bitiş Tarihi
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="date-input w-full p-2 rounded-lg border"
            />
          </div>
          <button
            onClick={calculateDateDifference}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Farkı Hesapla
          </button>
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-medium">Sonuç:</p>
              <p className="text-gray-700">
                {result.years > 0 && `${result.years} yıl `}
                {result.months > 0 && `${result.months} ay `}
                {result.days > 0 && `${result.days} gün`}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Toplam: {result.totalDays} gün
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Tarihe Gün Ekleme</h3>
        <div className="space-y-4">
          <div>
            <label className="date-label block text-sm font-medium mb-2">
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              value={dateToAdd}
              onChange={(e) => setDateToAdd(e.target.value)}
              className="date-input w-full p-2 rounded-lg border"
            />
          </div>
          <div>
            <label className="date-label block text-sm font-medium mb-2">
              Eklenecek Gün Sayısı
            </label>
            <input
              type="number"
              value={daysToAdd}
              onChange={(e) => setDaysToAdd(e.target.value)}
              className="date-input w-full p-2 rounded-lg border"
              placeholder="Gün sayısını girin"
            />
          </div>
          <button
            onClick={calculateAddedDate}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tarihi Hesapla
          </button>
          {addedDateResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-medium">Sonuç:</p>
              <p className="text-gray-700">{addedDateResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 