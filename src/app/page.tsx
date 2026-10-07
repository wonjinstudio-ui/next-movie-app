"use client";

import { useCounterStore } from "@/stores/counterStore";

export default function Home() {
  // 저장소의 숫자를 읽고, 숫자가 바뀌면 화면에도 반영합니다.
  const count = useCounterStore((state) => state.count);

  // 버튼을 눌렀을 때 사용할 기능을 저장소에서 가져옵니다.
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const reset = useCounterStore((state) => state.reset);

  return (
    <main className="container">
      <section className="card">
        <h1>Counter</h1>

        <p className="count">{count}</p>

        <div className="buttons">
          <button className="button" type="button" onClick={decrease}>
            -1
          </button>
          <button className="button" type="button" onClick={reset}>
            Reset
          </button>
          <button className="button" type="button" onClick={increase}>
            +1
          </button>
        </div>
      </section>
    </main>
  );
}
