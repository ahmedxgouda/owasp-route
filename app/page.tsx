import MapArea from '@/components/MapArea';

export default function Home() {
  return (
    <>
      <main className="px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to OWASP Route</h1>
        <section className="mb-12">
          <p className="text-gray-700 mb-4">
            OWASP Route is a tool to help you find and connect with OWASP chapters and events around
            you.
          </p>
        </section>
        <MapArea />
      </main>
    </>
  );
}
