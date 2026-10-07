import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>요청한 주소를 다시 확인해 주세요.</p>
      <Link href="/movies">영화 목록으로 돌아가기</Link>
    </main>
  );
}
