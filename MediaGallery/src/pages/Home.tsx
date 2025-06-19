import PhotoLists from "../components/PhotoLists";
import Hero from "../components/UI/Hero";

function Home() {
  return (
    <>
      <main>
        <Hero />
        <h1 className="text-center text-4xl font-bold m-5 mb-10">Imagenes Destacadas</h1>
        <PhotoLists currentQuery="featured" />;
      </main>
    </>
  );
}

export default Home;
