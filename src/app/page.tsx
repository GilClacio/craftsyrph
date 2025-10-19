import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Scissors } from "lucide-react";

export default function Home() {
  const featuredProjects = [
    {
      id: 1,
      title: "Vintage Embroidered Blouse",
      description: "A delicate hand-embroidered blouse with floral patterns",
      status: "completed",
      category: "embroidery"
    },
    {
      id: 2,
      title: "Knitted Winter Scarf",
      description: "Cozy cable-knit scarf in merino wool",
      status: "in-progress",
      category: "knitting"
    },
    {
      id: 3,
      title: "Quilted Throw Pillow",
      description: "Modern geometric quilt pattern throw pillow",
      status: "completed",
      category: "quilting"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="CraftsyRPh Logo"
              width={80}
              height={80}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
            Welcome to <span className="text-orange-700">CraftsyRPh</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore my journey through textile crafts, from embroidery and knitting to quilting and beyond. 
            Each project tells a story of creativity, patience, and passion for handmade beauty.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/projects"
              className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors font-medium flex items-center justify-center"
            >
              View Projects
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600">Discover my latest and most beloved textile creations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Project Image
                  </span>
                  {project.status === 'in-progress' && (
                    <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  )}
                  {project.status === 'completed' && (
                    <span className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 capitalize">{project.category}</span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-amber-700 hover:text-orange-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center text-amber-700 hover:text-orange-700 font-medium"
            >
              View All Projects
              <ArrowRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About My Craft Journey</h2>
              <p className="text-gray-600 mb-6">
            Welcome to my creative space! I&apos;m passionate about textile crafts and love sharing 
            my projects, techniques, and the stories behind each handmade piece. From traditional 
            embroidery to modern quilting, each project is an adventure in creativity.
              </p>
              <p className="text-gray-600 mb-8">
                Here you&apos;ll find detailed project documentation, tutorials, and insights into my 
                creative process. I also share my completed works in my Etsy store for fellow 
                craft enthusiasts to enjoy.
              </p>
              <Link
                href="/about"
                className="text-amber-700 hover:text-orange-700 font-medium inline-flex items-center"
              >
                Learn More About Me
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="w-24 h-24 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Scissors className="h-12 w-12 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Crafting Between Shifts</h3>
                <p className="text-gray-600">
                  As a working pharmacist and homemaker, I find creativity in the quiet moments. 
                  Every stitch tells a story of stolen time and peaceful evenings spent creating beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
