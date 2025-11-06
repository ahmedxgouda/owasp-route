import { nest } from "@/api/root";


export default async function Home() {
  const chapters = await nest.chapters.listChapters();
  console.log("Chapters:", chapters);
  return (
    <>
      <h1>Welcome to OWASP Route</h1>
      <p>Your route to the nearest OWASP chapter and events.</p>
    </>
  );
}
