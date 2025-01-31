interface ErrorMessageProps {
  message?: string;
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="my-1 h-1 text-xs text-red-500">{message ? message : ""}</p>
);
