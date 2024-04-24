import Image from "next/image";
import Link from "next/link";
import Experiences from "./Experiences";
const About = () => {
  const logos = [
    {
      src: "/logo-javascript.svg",
      alt: "JavaScript",
      width: 59,
      height: 59,
      href: "https://www.w3schools.com/js/",
    },
    {
      src: "/logo-cshap.svg",
      alt: "C#",
      width: 59,
      height: 59,
      href: "https://www.w3schools.com/cs/index.php",
    },
    {
      src: "/logo-python.svg",
      alt: "Python",
      width: 59,
      height: 59,
      href: "https://www.python.org/",
    },
    {
      src: "/logo-github.svg",
      alt: "GitHub",
      width: 59,
      height: 59,
      href: "https://github.com/",
    },
    {
      src: "/logo-react.svg",
      alt: "React",
      width: 59,
      height: 59,
      href: "https://reactjs.org/",
    },
    {
      src: "/logo-postgresql.svg",
      alt: "PostgreSQL",
      width: 59,
      height: 59,
      href: "https://www.postgresql.org/",
    },
    {
      src: "/logo-revit.svg",
      alt: "Revit",
      width: 59,
      height: 59,
      href: "https://www.autodesk.com/products/revit/overview",
    },
    {
      src: "/logo-dynamo.svg",
      alt: "Dynamo",
      width: 59,
      height: 59,
      href: "https://www.autodesk.com/products/dynamo-studio/overview",
    },
    {
      src: "/logo-enscape.svg",
      alt: "Enscape",
      width: 59,
      height: 59,
      href: "https://enscape3d.com/",
    },
    {
      src: "/logo-naviswork.svg",
      alt: "Navisworks",
      width: 59,
      height: 59,
      href: "https://www.autodesk.com/products/navisworks/overview",
    },
    {
      src: "/logo-CAD.svg",
      alt: "CAD",
      width: 59,
      height: 59,
      href: "https://www.autodesk.com/products/autocad/overview",
    },
    {
      src: "/logo-nodejs.svg",
      alt: "Node.js",
      width: 219,
      height: 59,
      href: "https://nodejs.org/",
    },
    {
      src: "/logo-nextjs.svg",
      alt: "Next.js",
      width: 219,
      height: 59,
      href: "https://nextjs.org/",
    },
    {
      src: "/logo-mongodb.svg",
      alt: "MongoDB",
      width: 219,
      height: 59,
      href: "https://www.mongodb.com/",
    },
  ];

  return (
    <>
      <section id="about-me" className="lg:mt-44 lg:mb-16 ">
        <div className="flex flex-col  gap-4 mx-auto max-w-screen-xl px-4 ">
          {/* <div className="flex flex-row items-center">
            <div className="relative my-4">
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={120}
                height={120}
                className="rounded-full object-cover w-auto h-auto"
              />
            </div>
            <div className="ml-10">
              <h1 className="max-w-2xl font-bold md:text-lg lg:text-5xl text-green-800 dark:text-green-500">
                Tam Chau
              </h1>
              <div className="lg:text-2xl dark:text-content-color">
                ACE Software Developer
              </div>
            </div>
          </div> */}

          <div className="max-w-4xl lg:max-w-7xl font-light  md:text-lg lg:text-xl ">
            <div className="max-w-4xl lg:max-w-7xl  lg:mb-8">
              <div className=" md:text-lg lg:text-xl text-slate-600 dark:text-content-color  ">
                {/* <span className="block font-light">
                  My name is{" "}
                  <span className="text-content-green-light dark:text-content-green-dark  font-semibold">
                    Tam
                  </span>
                  . I'm passionate about technology, programming, and creating
                  products for the construction industry.
                </span> */}

                {/* <span className="block mt-3 ">
									When I'm coding, I can lose track of time completely. With this intense passion,
									coupled with a solid background in construction, I achieved a perfect score in my
									graduation project by putting in 100% effort. My relentless pursuit of knowledge and
									immediate application during my studies has given me the strength of perseverance,
									shaping my value. I ventured into Building Information Modeling (BIM) as a Revit
									drafter. Within just one year of dedicated work and learning, I was fortunate to be
									appointed as a structural model team leader in a Japanese company. This opportunity
									honed my project management skills and the ability to organize and allocate tasks
									within the team to fulfill our objectives.
								</span>
								<span className="block mt-3">
									Moving forward, I sought new horizons by joining an outsourcing company. Here, I
									experienced working independently as a freelancer, coordinating with engineers to
									ensure maximum project efficiency. Working in an English-speaking environment has
									further developed my communication skills. However, my true passion lies in coding.
									I am constantly learning, aiming to expand my knowledge and create more value.
								</span>
								<span className="block mt-3">
									Thank you for being here, and I hope you find knowledge that brings you joy. Please
									help me share it with your friends; perhaps they might benefit too. Let's build a
									community where we can connect, share, and succeed together in this passion.
								</span> */}
                <div className="ml-10 lg:text-2xl dark:text-content-color ">
                  Tam is familiar with:
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto max-w-screen-xl px-4">
            <div className="grid grid-cols-2 gap-8  sm:gap-12 md:grid-cols-3 lg:grid-cols-7  left-0">
              {logos.map((logo, index) => (
                <Link
                  key={index}
                  href={logo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-center items-center "
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Experiences />
      </section>
    </>
  );
};

export default About;
