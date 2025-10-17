'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Clock, CheckCircle, PlayCircle } from 'lucide-react';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Vintage Embroidered Blouse",
      description: "A delicate hand-embroidered blouse with floral patterns inspired by vintage designs",
      status: "completed",
      category: "embroidery",
      startDate: "2024-09-15",
      completionDate: "2024-10-01",
      materials: ["Cotton fabric", "Embroidery floss", "Buttons"],
      difficulty: "intermediate",
      etsyLink: "https://etsy.com/shop/craftsyrph/item1"
    },
    {
      id: 2,
      title: "Knitted Winter Scarf",
      description: "Cozy cable-knit scarf in merino wool perfect for cold winter days",
      status: "in-progress",
      category: "knitting",
      startDate: "2024-10-10",
      completionDate: null,
      materials: ["Merino wool", "Knitting needles", "Stitch markers"],
      difficulty: "beginner",
      progress: 65
    },
    {
      id: 3,
      title: "Quilted Throw Pillow",
      description: "Modern geometric quilt pattern throw pillow with contemporary colors",
      status: "completed",
      category: "quilting",
      startDate: "2024-08-20",
      completionDate: "2024-09-05",
      materials: ["Cotton batting", "Fabric squares", "Thread"],
      difficulty: "advanced",
      etsyLink: "https://etsy.com/shop/craftsyrph/item3"
    },
    {
      id: 4,
      title: "Macrame Wall Hanging",
      description: "Bohemian-style macrame wall hanging with natural cotton rope",
      status: "planning",
      category: "macrame",
      startDate: null,
      completionDate: null,
      materials: ["Cotton rope", "Wooden dowel", "Beads"],
      difficulty: "intermediate"
    },
    {
      id: 5,
      title: "Cross-Stitch Sampler",
      description: "Traditional cross-stitch sampler with alphabet and decorative borders",
      status: "in-progress",
      category: "cross-stitch",
      startDate: "2024-09-01",
      completionDate: null,
      materials: ["Aida cloth", "DMC floss", "Embroidery hoop"],
      difficulty: "beginner",
      progress: 30
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      case 'planning':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Textile Projects</h1>
          <p className="text-gray-600 text-lg">
            Explore my collection of textile craft projects, from completed masterpieces to works in progress.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FunnelIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planning">Planning</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="embroidery">Embroidery</option>
                <option value="knitting">Knitting</option>
                <option value="quilting">Quilting</option>
                <option value="macrame">Macrame</option>
                <option value="cross-stitch">Cross Stitch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gray-200 relative">
                <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Project Image
                </span>
                {project.status === 'in-progress' && project.progress && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 px-4 py-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1">{project.title}</h3>
                  {getStatusIcon(project.status)}
                </div>

                <p className="text-gray-600 mb-4 text-sm">{project.description}</p>

                {/* Status and Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                    {project.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>

                {/* Materials Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Key Materials:</p>
                  <p className="text-sm text-gray-700">{project.materials.join(', ')}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-amber-700 hover:text-orange-700 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                  {project.etsyLink && (
                    <a
                      href={project.etsyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors"
                    >
                      View on Etsy
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;