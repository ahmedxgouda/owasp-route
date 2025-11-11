import Header from "@/components/Header";
import LocationButton from "@/components/LocationButton";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to OWASP Route</h1>
        <section className="mb-12">
          <p className="text-gray-700 mb-4">
            OWASP Route is a tool to help you find and connect with OWASP chapters and events around the world.
          </p>
        </section>
        <LocationButton />
      </main>
    </>
  );
}
