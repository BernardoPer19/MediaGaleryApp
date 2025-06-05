import PhotoLists from "../components/PhotoLists";
import Hero from "../components/UI/Hero";

function Home() {
  return (
    <>
      <main>
        <Hero />
        <PhotoLists currentQuery="featured" />;
      </main>
    </>
  );
}

export default Home;
