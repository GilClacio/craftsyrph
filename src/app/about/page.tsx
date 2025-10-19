import Link from 'next/link';
import Image from 'next/image';
import { Heart, Scissors, Palette, Award, Users, Clock } from 'lucide-react';

// Types for skills and milestones
export type Skill = {
  name: string;
  level: number;
  years: number;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

// Trigger deployment for gh-pages branch
const AboutPage = () => {
  // Static data for GitHub Pages (no API calls)
  const skills: Skill[] = [
    { name: 'Hand Embroidery', level: 90, years: 8 },
    { name: 'Knitting', level: 85, years: 5 },
    { name: 'Quilting', level: 75, years: 3 },
    { name: 'Cross Stitch', level: 95, years: 10 },
    { name: 'Macrame', level: 60, years: 2 },
    { name: 'Pattern Design', level: 70, years: 4 }
  ];

  const milestones: Milestone[] = [
    {
      year: '2024',
      title: 'Launched CraftSyrph Website',
      description: 'Created this platform to share my textile journey and connect with fellow crafters around the world.'
    },
    {
      year: '2023',
      title: 'Empty Nester Crafting Era',
      description: 'With more time to dedicate to my passion, I expanded into new techniques and started my Etsy store.'
    },
    {
      year: '2022',
      title: 'Local Craft Fair Success',
      description: 'Won second place at the Midwest Regional Craft Fair—Smokie was my lucky charm that day!'
    }
  ];

  const myJourney = [
    "I'm a registered pharmacist in the Midwest who discovered the joy of textile crafts as a creative outlet from my professional life. What began as a simple hobby has blossomed into a passionate pursuit that brings me endless satisfaction.",
    "As an empty nester, I now have more time to dive deeper into my craft projects. My evenings are filled with the gentle rhythm of stitching, often with my beloved yorkie Smokie curled up beside me as my faithful crafting companion. She's the best little supervisor a crafter could ask for!",
    "Each project I create tells a story—from quiet Sunday afternoons perfecting embroidery techniques to experimenting with new patterns while Smokie keeps watch. Crafting has become my meditation and my joy, filling our peaceful home with handmade beauty.",
    "Through this website and my work, I love sharing the projects that bring me happiness, hoping they might inspire others to discover their own creative path."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/craftsyrph/logo.jpg"
              alt="CraftsyRPh Logo"
              width={128}
              height={128}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Hello, I&apos;m <span className="text-orange-700">Judi</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A registered pharmacist from the Midwest who finds balance between my healthcare career 
            and my passion for textile crafts. When I&apos;m not helping patients, you&apos;ll find me 
            creating beautiful handmade pieces that bring joy to everyday life.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/craftsyrph/projects/"
              className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors font-medium"
            >
              View My Work
            </Link>
            <Link
              href="/craftsyrph/contact/"
              className="border-2 border-amber-700 text-amber-700 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium"
            >
              Get In Touch
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-gray-600">Years Crafting</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-gray-600">Family & Friends Taught</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">∞</p>
            <p className="text-gray-600">Passion for Crafts</p>
          </div>
        </section>

        {/* Story */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-600">
                {myJourney.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
          </div>
          <div className="bg-gray-200 aspect-[4/3] rounded-lg flex items-center justify-center">
            <span className="text-gray-500">About Photo</span>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill: Skill) => (
                <div key={skill.name} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                    <span className="text-sm text-gray-500">{skill.years} years</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{skill.level}% proficiency</p>
                </div>
              ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone: Milestone, index: number) => (
                  <div key={milestone.year + index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-4 h-4 bg-amber-600 rounded-full mt-1"></div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-16 bg-amber-200 ml-1.5 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-amber-700 font-bold text-lg">{milestone.year}</span>
                        <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-amber-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">My Crafting Philosophy</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            &ldquo;There&apos;s something magical about creating beauty with your own hands. Whether 
            it&apos;s the peaceful rhythm of stitching on a quiet evening or watching Smokie&apos;s 
            curious eyes follow every movement of my needle, crafting brings such joy to my life. 
            Each project is a journey of patience and creativity, and I love sharing that journey 
            with others who appreciate the beauty of handmade treasures.&rdquo;
          </p>
          <div className="flex justify-center space-x-6">
            <Scissors className="h-8 w-8 text-amber-600" />
            <Heart className="h-8 w-8 text-orange-600" />
            <Palette className="h-8 w-8 text-red-600" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;