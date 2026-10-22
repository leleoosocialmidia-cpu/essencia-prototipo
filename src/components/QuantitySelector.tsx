import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  max: number;
  min?: number;
  onChange: (value: number) => void;
  label: string;
  size?: "sm" | "md";
}

export function QuantitySelector({ value, max, min = 1, onChange, label, size = "md" }: Props) {
  const box = size === "sm" ? "h-10 w-10" : "h-11 w-11";
  return (
    <div className="inline-flex items-center rounded-soft border border-sand-dark" role="group" aria-label={label}>
      <button type="button" className={`${box} flex items-center justify-center text-ink hover:bg-cream disabled:opacity-35`} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Diminuir quantidade">
        <Minus size={16} strokeWidth={1.5} />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={`${box} flex items-center justify-center text-ink hover:bg-cream disabled:opacity-35`} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Aumentar quantidade">
        <Plus size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
