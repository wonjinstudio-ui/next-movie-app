"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main>
      <h2>문제가 발생했습니다.</h2>
      <p>영화 정보를 불러오지 못했습니다.</p>
      <button type="button" onClick={() => reset()}>다시 시도</button>
    </main>
  );
}
