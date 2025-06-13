import { useState } from "react";
import { Button } from "./ui/Button";

interface Props {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export function Counter({ min = 1, max = 10, value = 1, onChange }: Props) {
  const [count, setCount] = useState(value);

  const handleDecrement = () => {
    const newCount = Math.max(count - 1, min);
    setCount(newCount);
    onChange?.(newCount);
  };

  const handleIncrement = () => {
    const newCount = Math.min(count + 1, max);
    setCount(newCount);
    onChange?.(newCount);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        type="button"
        size="icon"
        onClick={handleDecrement}
        disabled={count === min}
      >
        −
      </Button>
      <div className="w-10 text-center text-lg">{count}</div>
      <Button
        variant="outline"
        type="button"
        size="icon"
        onClick={handleIncrement}
        disabled={count === max}
      >
        +
      </Button>
    </div>
  );
}
