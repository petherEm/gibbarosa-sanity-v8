import Image from "next/image";

const AboutUsSubHero = () => {
  return (
    <section className="mt-10 flex min-h-screen w-full flex-col p-8 small:min-h-0 small:flex-row">
      {/* Left Image Container */}
      <div className="flex w-full gap-4">
        <div className="relative aspect-[6/9] w-1/2">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/aboutus_2.png"
            alt="hero 1"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>
        <div className="relative aspect-[6/9] w-1/2">
          <Image
            src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/aboutus_3.png"
            alt="hero 2"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>
      </div>
      {/* Text & Images Container */}
      <div className="flex w-full flex-col justify-center p-6 small:w-1/2 small:px-12">
        <div className="flex max-w-[500px] flex-col items-start gap-6 large:max-w-[600px]">
          <h1 className="xl:text-6xl w-full text-3xl font-semibold small:text-4xl large:text-5xl">
            Wybieramy wyjątkowość
          </h1>
          <p className="w-full text-md font-light small:text-xl">
            Gibbarosa powstała z miłości do historii, dziedzictwa i savoir-faire
            luksusowych domów mody.
          </p>

          <p className="w-full text-md font-light small:text-xl">
            Dajemy drugie życie ponadczasowym produktom, które należy traktować
            jak prawdziwe inwestycje.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSubHero;
