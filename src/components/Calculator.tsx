import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

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
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
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
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm p-6 bg-card rounded-2xl shadow-2xl border border-border">
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

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
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

          {/* Row 2 */}
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

          {/* Row 3 */}
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

          {/* Row 4 */}
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

          {/* Row 5 */}
          <Button className={`${numberButtonClass} col-span-2`} onClick={() => handleNumber('0')}>
            0
          </Button>
          <Button className={numberButtonClass} onClick={handleDecimal}>
            .
          </Button>
          <Button className={equalsButtonClass} onClick={handleEquals}>
            =
          </Button>

          {/* Row 6 - Backspace */}
          <Button className={`${functionButtonClass} col-span-4`} onClick={handleBackspace}>
            <Delete className="mr-2 h-5 w-5" />
            Backspace
          </Button>
        </div>
      </div>
    </div>
  );
}
