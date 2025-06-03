import "./styles/loader.css";

function Loader() {
  return (
    <section className="h-screen w-full bg-[#f1f1f1] flex justify-center items-center">
      <div className="">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div>
    </section>
  );
}

export default Loader;
