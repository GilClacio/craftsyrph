
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, CurrencyDollarIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { CheckCircle, PlayCircle, Clock, ExternalLink, Video, Image as ImageIcon, X } from 'lucide-react';

interface TimelineUpdate {
  date: string;
  title: string;
  content: string;
  photos?: string[];
  videos?: { title: string; url: string }[];
}

interface TimelineUpdateProps {
  update: TimelineUpdate;
  index: number;
  onAddPhoto: (updateIndex: number, file: File) => void;
  onAddVideo: (updateIndex: number, videoUrl: string, title: string) => void;
  onRemovePhoto: (updateIndex: number, photoIndex: number) => void;
}

const TimelineUpdateComponent = ({ update, index, onAddPhoto, onAddVideo, onRemovePhoto }: TimelineUpdateProps) => {
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onAddPhoto(index, file);
    }
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl && videoTitle) {
      onAddVideo(index, videoUrl, videoTitle);
      setVideoUrl('');
      setVideoTitle('');
      setShowVideoForm(false);
    }
  };

  return (
    <div className="flex gap-6">
      {/* Timeline line and dot */}
      <div className="flex-shrink-0">
        <div className="w-3 h-3 bg-amber-600 rounded-full mt-2"></div>
        <div className="w-0.5 h-full bg-amber-200 ml-1 mt-2"></div>
      </div>
      {/* Main content */}
      <div className="flex-1 grid lg:grid-cols-3 gap-6">
        {/* Text content - takes 2/3 on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-gray-900">{update.title}</h4>
                <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => photoInputRef.current?.click()}
                  className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Add photo"
                >
                  <PhotoIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowVideoForm(true)}
                  className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Add video"
                >
                  <Video className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">{update.content}</p>
            {/* Video Form */}
            {showVideoForm && (
              <form onSubmit={handleVideoSubmit} className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-bold text-gray-900 mb-3">Add Video</h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Video title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium text-gray-800 placeholder-gray-600"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Video URL (YouTube, Vimeo, etc.)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium text-gray-800 placeholder-gray-600"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      Add Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVideoForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        {/* Media sidebar - takes 1/3 on large screens */}
        <div className="lg:col-span-1 space-y-4">
          {/* Photos */}
          {update.photos && update.photos.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <PhotoIcon className="h-4 w-4" />
                Photos ({update.photos.length})
              </h5>
              <div className="grid grid-cols-1 gap-3">
                {update.photos.map((photo: string, photoIndex: number) => (
                  <div key={photoIndex} className="relative group">
                    <img
                      src={photo}
                      alt={`Progress photo ${photoIndex + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => onRemovePhoto(index, photoIndex)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Videos */}
          {update.videos && update.videos.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos ({update.videos.length})
              </h5>
              <div className="space-y-3">
                {update.videos.map((video: { title: string; url: string }, videoIndex: number) => (
                  <div key={videoIndex} className="p-3 bg-gray-50 rounded-lg">
                    <h6 className="text-sm font-bold text-gray-900 mb-1">{video.title}</h6>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Watch Video
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Empty state for media */}
          {(!update.photos || update.photos.length === 0) && (!update.videos || update.videos.length === 0) && (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-sm font-medium">No photos or videos yet</p>
              <p className="text-gray-500 text-xs mt-1">Use the buttons above to add media</p>
            </div>
          )}
        </div>
      </div>
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
    </div>
  );
};

export default function ProjectDetailClient({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectData, setProjectData] = useState(() => {
    // Mock project data - in a real app, this would be fetched based on params.id
    return {
      id: parseInt(params.id),
      title: "Vintage Embroidered Blouse",
      description: "A delicate hand-embroidered blouse with floral patterns inspired by vintage designs from the 1920s. This piece combines traditional techniques with contemporary styling.",
      status: "completed",
      category: "embroidery",
      difficulty: "intermediate",
      startDate: "2024-09-15",
      completionDate: "2024-10-01",
      estimatedHours: 25,
      actualHours: 28,
      etsyLink: "https://etsy.com/shop/craftsyrph/item1",
      images: [
        "/api/placeholder/600/400",
        "/api/placeholder/600/400",
        "/api/placeholder/600/400"
      ],
      videos: [
        { title: "Embroidery Technique Demo", url: "https://youtube.com/watch?v=example" }
      ],
      materials: [
        { name: "Cotton fabric", quantity: "1 yard", cost: 15.00, supplier: "Local fabric store" },
        { name: "DMC Embroidery floss", quantity: "12 skeins", cost: 18.00, supplier: "Michaels" },
        { name: "Pearl buttons", quantity: "8 pieces", cost: 6.50, supplier: "Etsy" },
        { name: "Interfacing", quantity: "0.5 yard", cost: 4.00, supplier: "Joann Fabrics" }
      ],
      equipment: [
        { name: "Embroidery hoops", description: "Various sizes (4\", 6\", 8\")" },
        { name: "Embroidery needles", description: "Size 22-26" },
        { name: "Fabric scissors", description: "Sharp cutting scissors" },
        { name: "Seam ripper", description: "For corrections" }
      ],
      techniques: [
        "French knots",
        "Satin stitch",
        "Chain stitch",
        "Lazy daisy",
        "Blanket stitch"
      ],
      updates: [
        {
          date: "2024-10-01",
          title: "Project Completed!",
          content: "Finished the final touches and added to Etsy store. Very happy with how the floral pattern turned out.",
          photos: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
          videos: []
        },
        {
          date: "2024-09-28",
          title: "Nearing Completion",
          content: "Almost done with the embroidery work. Just need to finish the collar details and attach buttons.",
          photos: ["/api/placeholder/300/200"],
          videos: []
        },
        {
          date: "2024-09-22",
          title: "Progress Update",
          content: "Completed the main floral motif on the front panel. Moving on to the sleeve details next.",
          photos: ["/api/placeholder/300/200", "/api/placeholder/300/200"],
          videos: [{ title: "Embroidery technique demo", url: "https://youtube.com/watch?v=example" }]
        },
        {
          date: "2024-09-15",
          title: "Project Started",
          content: "Cut the fabric pieces and transferred the embroidery pattern. Excited to begin stitching!",
          photos: ["/api/placeholder/300/200"],
          videos: []
        }
      ]
    };
  });

  const project = projectData;
  
  const handleAddPhoto = (updateIndex: number, file: File) => {
    // In a real app, you would upload the file to a server and get back a URL
    const newPhotoUrl = URL.createObjectURL(file);
    setProjectData(prev => ({
      ...prev,
      updates: prev.updates.map((update, idx) =>
        idx === updateIndex
          ? { ...update, photos: [...(update.photos || []), newPhotoUrl] }
          : update
      )
    }));
  };

  const handleAddVideo = (updateIndex: number, videoUrl: string, title: string) => {
    setProjectData(prev => ({
      ...prev,
      updates: prev.updates.map((update, idx) =>
        idx === updateIndex
          ? { ...update, videos: [...(update.videos || []), { title, url: videoUrl }] }
          : update
      )
    }));
  };

  const handleRemovePhoto = (updateIndex: number, photoIndex: number) => {
    setProjectData(prev => ({
      ...prev,
      updates: prev.updates.map((update, idx) =>
        idx === updateIndex
          ? { ...update, photos: update.photos?.filter((_, i) => i !== photoIndex) || [] }
          : update
      )
    }));
  };

  const totalMaterialCost = project.materials.reduce((sum, material) => sum + material.cost, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-6 w-6 text-amber-600" />;
      case 'planning':
        return <Clock className="h-6 w-6 text-orange-600" />;
      default:
        return null;
    }
  };

  // ...existing code for rendering the full page...
  // For brevity, you may want to copy the full JSX from the original file here.
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-amber-700 hover:text-orange-700 font-medium">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Projects
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            {getStatusIcon(project.status)}
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          </div>
          <p className="text-gray-600 text-lg">{project.description}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">{project.category}</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">{project.difficulty}</span>
            {project.etsyLink && (
              <a href={project.etsyLink} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-flex items-center gap-1">
                <ExternalLink className="h-4 w-4" /> Etsy Store
              </a>
            )}
          </div>
        </div>
        <div className="mb-8">
          <nav className="flex gap-6 border-b border-gray-200 mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'materials', label: 'Materials & Equipment' },
              { id: 'progress', label: 'Progress Updates' },
              { id: 'gallery', label: 'Gallery' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-orange-700 hover:border-orange-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Project Details</h3>
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700">Started: {new Date(project.startDate).toLocaleDateString()}</p>
                    {project.completionDate && (
                      <p className="text-sm text-gray-700">Completed: {new Date(project.completionDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700">Estimated: {project.estimatedHours} hours</p>
                    {project.actualHours && (
                      <p className="text-sm text-gray-700">Actual: {project.actualHours} hours</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                  <p className="font-medium text-gray-700">Total Materials: ${totalMaterialCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Techniques Used</h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap gap-2">
                  {project.techniques.map((technique, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
                    >
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'materials' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Materials</h3>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {project.materials.map((material, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${material.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-6 py-3 text-right font-medium text-gray-900">Total:</td>
                      <td className="px-6 py-3 font-bold text-gray-900">${totalMaterialCost.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Equipment Used</h3>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {project.equipment.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'progress' && (
          <div className="max-w-4xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Progress Timeline</h3>
            <div className="space-y-6">
              {project.updates.map((update, index) => (
                <TimelineUpdateComponent
                  key={index}
                  update={update}
                  index={index}
                  onAddPhoto={handleAddPhoto}
                  onAddVideo={handleAddVideo}
                  onRemovePhoto={handleRemovePhoto}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'gallery' && (
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-800">Project Gallery</h3>
            {/* Images */}
            <div className="mb-8">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-700">
                <ImageIcon className="h-5 w-5" />
                Images
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="bg-gray-200 aspect-[4/3] rounded-lg flex items-center justify-center">
                    <span className="text-gray-700 font-medium">Project Image {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Videos */}
            <div>
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-700">
                <Video className="h-5 w-5" />
                Instructional Videos
              </h4>
              <div className="space-y-4">
                {project.videos.map((video, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-gray-700">{video.title}</h5>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Watch
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
