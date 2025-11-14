"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <main>
      <div>
        <h2>
          <p>Could not fetch the list of notes.</p>
        </h2>
        <p>{error.message}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    </main>
  );
};

export default Error;