import Image from "next/image";

const AboutUsHero = () => {
  return (
    <section className="relative w-full">
      <div className="relative h-[300px] w-full small:h-[400px] medium:h-[500px] large:h-[600px]">
        <Image
          src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/aboutus.png"
          alt="Fashion model on couch with designer bag"
          fill
          priority
          quality={100}
          className="object-cover object-[center_55%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[80%] p-4 text-black small:max-w-[60%] small:p-8 medium:max-w-[50%] medium:p-12 large:p-16">
            <h1 className="large:text-6xl text-3xl font-semibold leading-tight small:text-4xl medium:text-5xl">
              Dajemy drugie życie
              <br />
              luksusowym produktom
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
