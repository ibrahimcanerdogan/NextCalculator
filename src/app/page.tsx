'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import UnitConverter from './components/UnitConverter';
import DateCalculator from './components/DateCalculator';
import PercentageCalculator from './components/PercentageCalculator';

interface HistoryItem {
  equation: string;
  result: string;
}

type CalculatorMode = 'standard' | 'scientific' | 'converter' | 'date' | 'percentage' | 'history';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [_showHistory, _setShowHistory] = useState(false);
  const [isRetroTheme, setIsRetroTheme] = useState(false);
  const [currentMode, setCurrentMode] = useState<CalculatorMode>('standard');

  const handleNumber = useCallback((num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, isNewNumber]);

  const handleOperator = useCallback((operator: string) => {
    setEquation(display + ' ' + operator + ' ');
    setIsNewNumber(true);
  }, [display]);

  const handleEqual = useCallback(() => {
    try {
      const result = eval(equation + display);
      const newHistoryItem = {
        equation: equation + display,
        result: String(result)
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
      setDisplay(String(result));
      setEquation('');
      setIsNewNumber(true);
    } catch {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  }, [equation, display]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  }, []);

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handlePlusMinus = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const handleBackspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  }, [display]);

  const handleScientific = (operation: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (operation) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = Math.pow(value, 2);
        break;
      case 'cube':
        result = Math.pow(value, 3);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setIsNewNumber(true);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderCalculator = () => {
    switch (currentMode) {
      case 'scientific':
        return (
          <>
            <div className="calculator-display">
              <div className="text-gray-500 text-sm font-mono">{equation}</div>
              <div 
                className="text-gray-800 font-mono tracking-tight"
                data-length={display.length > 10 ? "long" : "normal"}
              >
                {display}
              </div>
            </div>
            <div className="calculator-grid">
              <button onClick={() => handleScientific('sin')} className="calculator-button text-gray-700">
                sin
              </button>
              <button onClick={() => handleScientific('cos')} className="calculator-button text-gray-700">
                cos
              </button>
              <button onClick={() => handleScientific('tan')} className="calculator-button text-gray-700">
                tan
              </button>
              <button onClick={() => handleScientific('log')} className="calculator-button text-gray-700">
                log
              </button>
              <button onClick={() => handleScientific('ln')} className="calculator-button text-gray-700">
                ln
              </button>
              <button onClick={() => handleScientific('sqrt')} className="calculator-button text-gray-700">
                √
              </button>
              <button onClick={() => handleScientific('square')} className="calculator-button text-gray-700">
                x²
              </button>
              <button onClick={() => handleScientific('cube')} className="calculator-button text-gray-700">
                x³
              </button>
              <button onClick={() => handleScientific('pi')} className="calculator-button text-gray-700">
                π
              </button>
              <button onClick={() => handleScientific('e')} className="calculator-button text-gray-700">
                e
              </button>
              <button onClick={handleClear} className="calculator-button text-gray-700">
                AC
              </button>
              <button onClick={handlePlusMinus} className="calculator-button text-gray-700">
                +/-
              </button>
              <button onClick={handlePercentage} className="calculator-button text-gray-700">
                %
              </button>
              <button onClick={() => handleOperator('/')} className="calculator-button operator-button">
                ÷
              </button>
              <button onClick={() => handleNumber('7')} className="calculator-button text-gray-700">
                7
              </button>
              <button onClick={() => handleNumber('8')} className="calculator-button text-gray-700">
                8
              </button>
              <button onClick={() => handleNumber('9')} className="calculator-button text-gray-700">
                9
              </button>
              <button onClick={() => handleOperator('*')} className="calculator-button operator-button">
                ×
              </button>
              <button onClick={() => handleNumber('4')} className="calculator-button text-gray-700">
                4
              </button>
              <button onClick={() => handleNumber('5')} className="calculator-button text-gray-700">
                5
              </button>
              <button onClick={() => handleNumber('6')} className="calculator-button text-gray-700">
                6
              </button>
              <button onClick={() => handleOperator('-')} className="calculator-button operator-button">
                -
              </button>
              <button onClick={() => handleNumber('1')} className="calculator-button text-gray-700">
                1
              </button>
              <button onClick={() => handleNumber('2')} className="calculator-button text-gray-700">
                2
              </button>
              <button onClick={() => handleNumber('3')} className="calculator-button text-gray-700">
                3
              </button>
              <button onClick={() => handleOperator('+')} className="calculator-button operator-button">
                +
              </button>
              <button onClick={() => handleNumber('0')} className="calculator-button text-gray-700 col-span-2">
                0
              </button>
              <button onClick={handleDecimal} className="calculator-button text-gray-700">
                .
              </button>
              <button onClick={handleEqual} className="calculator-button operator-button">
                =
              </button>
            </div>
          </>
        );
      case 'standard':
        return (
          <>
            <div className="calculator-display">
              <div className="text-gray-500 text-sm font-mono">{equation}</div>
              <div 
                className="text-gray-800 font-mono tracking-tight"
                data-length={display.length > 10 ? "long" : "normal"}
              >
                {display}
              </div>
            </div>
            <div className="calculator-grid">
              <button onClick={handleClear} className="calculator-button text-gray-700">
                AC
              </button>
              <button onClick={handlePlusMinus} className="calculator-button text-gray-700">
                +/-
              </button>
              <button onClick={handlePercentage} className="calculator-button text-gray-700">
                %
              </button>
              <button onClick={() => handleOperator('/')} className="calculator-button operator-button">
                ÷
              </button>
              <button onClick={() => handleNumber('7')} className="calculator-button text-gray-700">
                7
              </button>
              <button onClick={() => handleNumber('8')} className="calculator-button text-gray-700">
                8
              </button>
              <button onClick={() => handleNumber('9')} className="calculator-button text-gray-700">
                9
              </button>
              <button onClick={() => handleOperator('*')} className="calculator-button operator-button">
                ×
              </button>
              <button onClick={() => handleNumber('4')} className="calculator-button text-gray-700">
                4
              </button>
              <button onClick={() => handleNumber('5')} className="calculator-button text-gray-700">
                5
              </button>
              <button onClick={() => handleNumber('6')} className="calculator-button text-gray-700">
                6
              </button>
              <button onClick={() => handleOperator('-')} className="calculator-button operator-button">
                -
              </button>
              <button onClick={() => handleNumber('1')} className="calculator-button text-gray-700">
                1
              </button>
              <button onClick={() => handleNumber('2')} className="calculator-button text-gray-700">
                2
              </button>
              <button onClick={() => handleNumber('3')} className="calculator-button text-gray-700">
                3
              </button>
              <button onClick={() => handleOperator('+')} className="calculator-button operator-button">
                +
              </button>
              <button onClick={() => handleNumber('0')} className="calculator-button text-gray-700 col-span-2">
                0
              </button>
              <button onClick={handleDecimal} className="calculator-button text-gray-700">
                .
              </button>
              <button onClick={handleEqual} className="calculator-button operator-button">
                =
              </button>
            </div>
          </>
        );
      case 'converter':
        return <UnitConverter />;
      case 'date':
        return <DateCalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'history':
        return (
          <div className="history-display">
            {history.length === 0 ? (
              <div className="empty-message">
                <div className="title">Henüz işlem yapılmadı</div>
                <div className="subtitle">Hesaplama yaptıkça geçmişiniz burada görünecek</div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 text-sm">Son İşlemler</span>
                  <button 
                    onClick={clearHistory}
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Temizle
                  </button>
                </div>
                {history.map((item, index) => (
                  <div key={index} className="mb-2 last:mb-0 p-2 hover:bg-gray-100 rounded-md transition-colors">
                    <div className="text-gray-500 text-sm">{item.equation}</div>
                    <div 
                      className="text-gray-700 text-lg"
                      data-length={item.result.length > 10 ? "long" : "normal"}
                    >
                      {item.result}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        );
    }
  };

  useEffect(() => {
    if (isRetroTheme) {
      document.body.classList.add('retro-theme');
    } else {
      document.body.classList.remove('retro-theme');
    }
  }, [isRetroTheme]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (/^[0-9.]$/.test(event.key)) {
        handleNumber(event.key);
      }
      else if (['+', '-', '*', '/'].includes(event.key)) {
        handleOperator(event.key);
      }
      else if (event.key === 'Enter') {
        handleEqual();
      }
      else if (event.key === 'Escape') {
        handleClear();
      }
      else if (event.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNumber, handleOperator, handleEqual, handleClear, handleBackspace]);

  return (
    <>
      <Head>
        <title>NextCalculator | Modern & Nostalgic Calculator</title>
        <meta name="description" content="A beautiful calculator app with modern and nostalgic themes. Perform calculations with style using our sleek and user-friendly interface." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://nextcalculator.vercel.app" />
      </Head>
      <div className="relative min-h-screen">
        <button
          onClick={() => setIsRetroTheme(!isRetroTheme)}
          className="theme-switch fixed top-4 left-4 z-50"
          aria-label="Tema değiştir"
        >
          <span className="theme-switch-handle" />
        </button>
        <main className="main-container">
          <div className="calculator-container">
            <div className="flex gap-3 mb-8">
              <button 
                onClick={() => setCurrentMode('standard')}
                className={`flex-1 mode-button ${currentMode === 'standard' ? 'active' : ''}`}
              >
                Standart
              </button>
              <button 
                onClick={() => setCurrentMode('scientific')}
                className={`flex-1 mode-button ${currentMode === 'scientific' ? 'active' : ''}`}
              >
                Bilimsel
              </button>
              <button 
                onClick={() => setCurrentMode('converter')}
                className={`flex-1 mode-button ${currentMode === 'converter' ? 'active' : ''}`}
              >
                Birim Dönüştürücü
              </button>
              <button 
                onClick={() => setCurrentMode('date')}
                className={`flex-1 mode-button ${currentMode === 'date' ? 'active' : ''}`}
              >
                Tarih Hesaplayıcı
              </button>
              <button 
                onClick={() => setCurrentMode('percentage')}
                className={`flex-1 mode-button ${currentMode === 'percentage' ? 'active' : ''}`}
              >
                Yüzde Hesaplayıcı
              </button>
              <button 
                onClick={() => setCurrentMode('history')}
                className={`flex-1 mode-button history ${currentMode === 'history' ? 'active' : ''}`}
              >
                Geçmiş
              </button>
            </div>

            {renderCalculator()}
          </div>
        </main>
      </div>
    </>
  );
}
