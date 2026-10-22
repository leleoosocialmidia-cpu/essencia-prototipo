import type { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children?: ReactNode; // permite usar um <select> no lugar do <input>
}

/** Campo de formulário com rótulo e mensagem de erro acessíveis. */
export function Field({ id, label, error, optional, className = "", children, ...input }: Props) {
  const errorId = `${id}-erro`;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label} {optional && <span className="text-muted">(opcional)</span>}
      </label>
      {children ?? <input id={id} name={id} className="input" aria-invalid={!!error} aria-describedby={error ? errorId : undefined} {...input} />}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
