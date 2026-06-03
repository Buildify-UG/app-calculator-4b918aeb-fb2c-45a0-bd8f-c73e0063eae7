import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Delete, RotateCcw } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const performCalculation = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current !== 0 ? prev / current : 0;
      case '%':
        return prev % current;
      case '^':
        return Math.pow(prev, current);
      default:
        return current;
    }
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = value * value * value;
        break;
      case 'sin':
        result = Math.sin((value * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos((value * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan((value * Math.PI) / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'factorial':
        result = factorial(Math.floor(value));
        break;
      case 'reciprocal':
        result = value !== 0 ? 1 / value : 0;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleAddToHistory = () => {
    const entry = `${previousValue} ${operation} ${display} = ${display}`;
    setHistory([entry, ...history]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setHistory(history.slice(1));
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const buttonClass = "h-16 text-lg font-semibold rounded-lg transition-all hover:scale-105 active:scale-95";
  const numberButtonClass = `${buttonClass} bg-muted text-foreground hover:bg-muted/80`;
  const operationButtonClass = `${buttonClass} bg-primary text-primary-foreground hover:bg-primary/90`;
  const equalsButtonClass = `${buttonClass} bg-accent text-accent-foreground hover:bg-accent/90`;
  const functionButtonClass = `${buttonClass} bg-secondary text-secondary-foreground hover:bg-secondary/80`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator */}
          <div className="lg:col-span-2 p-6 bg-card rounded-2xl shadow-2xl border border-border">
            <h1 className="text-3xl font-bold text-foreground mb-6 text-center">Calculator</h1>
            
            {/* Display */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <div className="text-right text-foreground/60 text-sm h-6">
                {previousValue !== null && operation && `${previousValue} ${operation}`}
              </div>
              <div className="text-right text-5xl font-bold text-foreground break-words">
                {display}
              </div>
            </div>

            {/* Basic Operations */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground/70 mb-3">Basic</h3>
              <div className="grid grid-cols-4 gap-3">
                <Button className={functionButtonClass} onClick={handleClear}>
                  AC
                </Button>
                <Button className={functionButtonClass} onClick={handleToggleSign}>
                  +/-
                </Button>
                <Button className={functionButtonClass} onClick={handlePercentage}>
                  %
                </Button>
                <Button className={operationButtonClass} onClick={() => handleOperation('÷')}>
                  ÷
                </Button>

                <Button className={numberButtonClass} onClick={() => handleNumber('7')}>
                  7
                </Button>
                <Button className={numberButtonClass} onClick={() => handleNumber('8')}>
                  8
                </Button>
                <Button className={numberButtonClass} onClick={() => handleNumber('9')}>
                  9
                </Button>
                <Button className={operationButtonClass} onClick={() => handleOperation('×')}>
                  ×
                </Button>

                <Button className={numberButtonClass} onClick={() => handleNumber('4')}>
                  4
                </Button>
                <Button className={numberButtonClass} onClick={() => handleNumber('5')}>
                  5
                </Button>
                <Button className={numberButtonClass} onClick={() => handleNumber('6')}>
                  6
                </Button>
                <Button className={operationButtonClass} onClick={() => handleOperation('-')}>
                  −
                </Button>

                <Button className={numberButtonClass} onClick={() => handleNumber('1')}>
                  1
                </Button>
                <Button className={numberButtonClass} onClick={() => handleNumber('2')}>
                  2
                </Button>
                <Button className={numberButtonClass} onClick={() => handleNumber('3')}>
                  3
                </Button>
                <Button className={operationButtonClass} onClick={() => handleOperation('+')}>
                  +
                </Button>

                <Button className={`${numberButtonClass} col-span-2`} onClick={() => handleNumber('0')}>
                  0
                </Button>
                <Button className={numberButtonClass} onClick={handleDecimal}>
                  .
                </Button>
                <Button className={equalsButtonClass} onClick={handleEquals}>
                  =
                </Button>
              </div>
            </div>

            {/* Advanced Operations */}
            <div>
              <h3 className="text-sm font-semibold text-foreground/70 mb-3">Advanced</h3>
              <div className="grid grid-cols-4 gap-3">
                <Button className={functionButtonClass} onClick={() => handleScientific('sqrt')}>
                  √
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('square')}>
                  x²
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('cube')}>
                  x³
                </Button>
                <Button className={operationButtonClass} onClick={() => handleOperation('^')}>
                  x^y
                </Button>

                <Button className={functionButtonClass} onClick={() => handleScientific('sin')}>
                  sin
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('cos')}>
                  cos
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('tan')}>
                  tan
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('reciprocal')}>
                  1/x
                </Button>

                <Button className={functionButtonClass} onClick={() => handleScientific('log')}>
                  log
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('ln')}>
                  ln
                </Button>
                <Button className={functionButtonClass} onClick={() => handleScientific('factorial')}>
                  n!
                </Button>
                <Button className={`${functionButtonClass} col-span-1`} onClick={handleBackspace}>
                  <Delete className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* History Panel */}
          <div className="p-6 bg-card rounded-2xl shadow-2xl border border-border h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">History</h2>
              <Button
                size="sm"
                variant="outline"
                onClick={handleUndo}
                disabled={history.length === 0}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-foreground/50 text-sm">No history yet</p>
              ) : (
                history.map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-muted rounded text-sm text-foreground/80 break-words"
                  >
                    {entry}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
