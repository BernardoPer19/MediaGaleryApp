import React from "react";
import PhotoLists from "../components/PhotoLists";

function Home() {
  return (
    <>
      <main >
        <PhotoLists currentQuery="featured" />;
      </main>
    </>
  );
}

export default Home;
