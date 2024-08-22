import { cookies } from "next/headers";

const ErrorPage = () => {
  const cookieStore = cookies();

  const errorMessage = cookieStore.get("X-Error-Message");

  return (
    <div>
      <h1>Error</h1>
      {errorMessage ? (
        <p>{errorMessage.value}</p>
      ) : (
        <p>An unknown error occurred.</p>
      )}
    </div>
  );
};

export default ErrorPage;
