'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PencilIcon, TrashIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import ProjectEditor from '../../components/ProjectEditor';

// Type definitions
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
export type SiteContent = {
  myJourney: string[];
  skills: Skill[];
  milestones: Milestone[];
};

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  category: string;
  difficulty: string;
  startDate: string;
  completionDate?: string;
  estimatedHours: number;
  actualHours?: number;
  etsyLink?: string;
  etsyEnabled: boolean;
  isSold: boolean;
  isFeatured: boolean;
  images: string[];
  videos: { title: string; url: string }[];
  materials: { name: string; quantity: string; cost: number; supplier: string }[];
  equipment: { name: string; description: string }[];
  techniques: string[];
  updates: {
    date: string;
    title: string;
    content: string;
    timeSpent: number;
    photos?: string[];
    videos?: { title: string; url: string }[];
  }[];
}

const AdminDashboard = () => {
  // About markdown state
  const [aboutMarkdown, setAboutMarkdown] = useState('');
  const [aboutLoading, setAboutLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showProjectEditor, setShowProjectEditor] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([
    'embroidery', 'knitting', 'quilting', 'macrame', 'cross-stitch', 'crochet', 'weaving', 'sewing', 'other'
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ index: number; value: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Autumn Leaves Embroidery',
      description: 'A beautiful autumn-themed embroidery piece featuring colorful leaves and intricate stitching patterns.',
      status: 'completed',
      category: 'embroidery',
      difficulty: 'intermediate',
      startDate: '2024-09-01',
      completionDate: '2024-10-15',
      estimatedHours: 25,
      actualHours: 28,
      etsyLink: 'https://www.etsy.com/listing/123456789/autumn-leaves-embroidery',
      etsyEnabled: true,
      isSold: true,
      isFeatured: true,
      images: [],
      videos: [],
      materials: [
        { name: 'Embroidery Thread', quantity: '12 skeins', cost: 24.99, supplier: 'DMC' },
        { name: 'Linen Fabric', quantity: '1 yard', cost: 15.50, supplier: 'Joann Fabrics' }
      ],
      equipment: [
        { name: 'Embroidery Hoop', description: '8-inch wooden hoop' },
        { name: 'Embroidery Needles', description: 'Size 22-26 crewel needles' }
      ],
      techniques: ['French knots', 'Satin stitch', 'Back stitch'],
      updates: [
        {
          date: '2024-09-01',
          title: 'Started sketching design',
          content: 'Created initial leaf pattern sketches and transferred to fabric.',
          timeSpent: 2,
          photos: []
        },
        {
          date: '2024-09-15',
          title: 'Completed first leaf',
          content: 'Finished embroidering the maple leaf using satin stitch.',
          timeSpent: 6,
          photos: []
        }
      ]
    },
    {
      id: 2,
      title: 'Cozy Winter Scarf',
      description: 'Hand-knitted wool scarf with cable pattern perfect for cold winter days.',
      status: 'in-progress',
      category: 'knitting',
      difficulty: 'beginner',
      startDate: '2024-11-01',
      estimatedHours: 20,
      etsyEnabled: false,
      isSold: false,
      isFeatured: false,
      images: [],
      videos: [],
      materials: [
        { name: 'Wool Yarn', quantity: '4 skeins', cost: 32.00, supplier: 'Lion Brand' }
      ],
      equipment: [
        { name: 'Knitting Needles', description: 'Size 8 circular needles' }
      ],
      techniques: ['Cable knit', 'Ribbing'],
      updates: [
        {
          date: '2024-11-01',
          title: 'Cast on stitches',
          content: 'Started with 40 stitches and began ribbing pattern.',
          timeSpent: 1,
          photos: []
        }
      ]
    },
    {
      id: 3,
      title: 'Spring Garden Quilt',
      description: 'Colorful quilt featuring spring flowers and garden motifs.',
      status: 'planning',
      category: 'quilting',
      difficulty: 'advanced',
      startDate: '2024-12-01',
      estimatedHours: 60,
      etsyEnabled: false,
      isSold: false,
      isFeatured: true,
      images: [],
      videos: [],
      materials: [],
      equipment: [],
      techniques: ['Appliqué', 'Piecing', 'Machine quilting'],
      updates: []
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'judi' && loginData.password === 'craftsyrph2024') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Site content state for About page
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);

  const toggleFeatured = (id: number) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, isFeatured: !project.isFeatured } : project
    ));
  };

  // Load site content
  useEffect(() => {
    let mounted = true;
    fetch('/data/siteContent.json')
      .then(r => r.json())
      .then(data => { if (mounted) setSiteContent(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setContentLoading(false); });
    // Fetch About markdown
    fetch('/content/about.md')
      .then(res => res.text())
      .then(md => { if (mounted) setAboutMarkdown(md); })
      .catch(() => {})
      .finally(() => { if (mounted) setAboutLoading(false); });
    return () => { mounted = false; };
  }, []);

  // Removed saveSiteContent: Netlify CMS will handle content updates via Git Gateway

  const deleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== id));
    }
  };

  const editProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectEditor(true);
  };

  const createNewProject = () => {
    setEditingProject(undefined);
    setShowProjectEditor(true);
  };

  const handleSaveProject = (project: Project) => {
    console.log('handleSaveProject called with:', project);
    console.log('editingProject:', editingProject);
    
    if (editingProject) {
      // Update existing project
      console.log('Updating existing project with ID:', project.id);
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    } else {
      // Create new project
      console.log('Creating new project');
      setProjects(prev => [...prev, project]);
    }
    setShowProjectEditor(false);
    setEditingProject(undefined);
  };

  const handleCancelEdit = () => {
    setShowProjectEditor(false);
    setEditingProject(undefined);
  };

  const getTotalHours = () => {
    return projects.reduce((total, project) => total + (project.actualHours || project.estimatedHours), 0);
  };

  const getTotalCost = () => {
    return projects.reduce((total, project) => 
      total + project.materials.reduce((materialTotal, material) => materialTotal + material.cost, 0), 0
    );
  };

  // Category management functions
  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim().toLowerCase())) {
      setCategories(prev => [...prev, newCategory.trim().toLowerCase()]);
      setNewCategory('');
    }
  };

  const deleteCategory = (index: number) => {
    const categoryToDelete = categories[index];
    const hasProjects = projects.some(project => project.category === categoryToDelete);
    
    if (hasProjects) {
      alert(`Cannot delete category "${categoryToDelete}" because it's being used by one or more projects.`);
      return;
    }
    
    if (confirm(`Are you sure you want to delete the category "${categoryToDelete}"?`)) {
      setCategories(prev => prev.filter((_, i) => i !== index));
    }
  };

  const startEditingCategory = (index: number) => {
    setEditingCategory({ index, value: categories[index] });
  };

  const saveEditingCategory = () => {
    if (editingCategory && editingCategory.value.trim()) {
      const newValue = editingCategory.value.trim().toLowerCase();
      if (!categories.includes(newValue) || categories[editingCategory.index] === newValue) {
        setCategories(prev => prev.map((cat, i) => i === editingCategory.index ? newValue : cat));
        setEditingCategory(null);
      } else {
        alert('This category already exists!');
      }
    }
  };

  const cancelEditingCategory = () => {
    setEditingCategory(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-700">Sign in to manage your craft projects</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 text-white py-2 px-4 rounded-lg hover:bg-amber-800 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-700">Manage your craft projects and content</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-700">Total Projects</div>
            <div className="text-2xl font-bold text-gray-800">{projects.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-700">Featured Projects</div>
            <div className="text-2xl font-bold text-amber-700">{projects.filter(p => p.isFeatured).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-700">Total Hours</div>
            <div className="text-2xl font-bold text-gray-800">{getTotalHours()}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-700">Total Material Cost</div>
            <div className="text-2xl font-bold text-green-600">${getTotalCost().toFixed(2)}</div>
          </div>
        </div>

        {/* Categories Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Manage Categories</h2>
            <p className="text-sm text-gray-600">Add, edit, or remove project categories</p>
          </div>

          <div className="p-6">
            {/* Add New Category */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                placeholder="Enter new category name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
              />
              <button
                onClick={addCategory}
                className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add Category
              </button>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                  {editingCategory && editingCategory.index === index ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editingCategory.value}
                        onChange={(e) => setEditingCategory({ ...editingCategory, value: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && saveEditingCategory()}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500 text-gray-800"
                        autoFocus
                      />
                      <button
                        onClick={saveEditingCategory}
                        className="text-green-600 hover:text-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditingCategory}
                        className="text-gray-600 hover:text-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-800 capitalize">{category}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEditingCategory(index)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit category"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete category"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Page Content Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Edit About Page</h2>
            <p className="text-sm text-gray-600">Edit the &apos;My Journey&apos; paragraphs and Skills & Expertise</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Show current About markdown from Netlify CMS */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Current About Page Content</h3>
              {aboutLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <div className="prose">
                  <ReactMarkdown>{aboutMarkdown}</ReactMarkdown>
                </div>
              )}
            </div>
            {/* My Journey editor (existing custom content) */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">My Journey (Custom)</h3>
              {contentLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {(siteContent?.myJourney || []).map((para: string, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <textarea
                        value={para}
                        onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                          if (!prev) return prev;
                          const next = { ...prev };
                          next.myJourney = [...(next.myJourney || [])];
                          next.myJourney[idx] = e.target.value;
                          return next;
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                        rows={3}
                      />
                      <button
                        onClick={() => setSiteContent(prev => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            myJourney: prev.myJourney.filter((_, i) => i !== idx),
                            skills: prev.skills,
                            milestones: prev.milestones,
                          };
                        })}
                        className="text-red-600 hover:text-red-700"
                        title="Delete paragraph"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setSiteContent(prev => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        myJourney: [...prev.myJourney, ''],
                        skills: prev.skills,
                        milestones: prev.milestones,
                      };
                    })}
                    className="mt-2 bg-amber-700 text-white px-3 py-1 rounded-md hover:bg-amber-800"
                  >
                    Add Paragraph
                  </button>
                </div>
              )}
            </div>

            {/* Skills editor */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Skills & Expertise</h3>
              {contentLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {(siteContent?.skills || []).map((skill: Skill, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input
                        value={skill.name}
                        onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                          if (!prev) return prev;
                          const next = { ...prev };
                          next.skills = [...(next.skills || [])];
                          next.skills[idx] = { ...next.skills[idx], name: e.target.value };
                          return next;
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      />
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                          if (!prev) return prev;
                          const next = { ...prev };
                          next.skills = [...(next.skills || [])];
                          next.skills[idx] = { ...next.skills[idx], level: parseInt(e.target.value) || 0 };
                          return next;
                        })}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      />
                      <input
                        type="number"
                        value={skill.years}
                        onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                          if (!prev) return prev;
                          const next = { ...prev };
                          next.skills = [...(next.skills || [])];
                          next.skills[idx] = { ...next.skills[idx], years: parseInt(e.target.value) || 0 };
                          return next;
                        })}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                      />
                      <div className="flex gap-1 ml-auto">
                        <button
                          onClick={() => setSiteContent(prev => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              skills: prev.skills.filter((_, i) => i !== idx),
                              myJourney: prev.myJourney,
                              milestones: prev.milestones,
                            };
                          })}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setSiteContent(prev => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        skills: [...prev.skills, { name: 'New Skill', level: 50, years: 0 }],
                        myJourney: prev.myJourney,
                        milestones: prev.milestones,
                      };
                    })}
                    className="mt-2 bg-amber-700 text-white px-3 py-1 rounded-md hover:bg-amber-800"
                  >
                    Add Skill
                  </button>
                </div>
              )}
            </div>

            {/* Timeline editor */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">My Journey Timeline</h3>
              {contentLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <div className="space-y-4">
                  {(siteContent?.milestones || []).map((milestone: Milestone, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <input
                            value={milestone.year}
                            onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                              if (!prev) return prev;
                              const next = { ...prev };
                              next.milestones = [...(next.milestones || [])];
                              next.milestones[idx] = { ...next.milestones[idx], year: e.target.value };
                              return next;
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                            placeholder="2024"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            value={milestone.title}
                            onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                              if (!prev) return prev;
                              const next = { ...prev };
                              next.milestones = [...(next.milestones || [])];
                              next.milestones[idx] = { ...next.milestones[idx], title: e.target.value };
                              return next;
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                            placeholder="Timeline event title"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={milestone.description}
                          onChange={(e) => setSiteContent((prev: SiteContent | null) => {
                            if (!prev) return prev;
                            const next = { ...prev };
                            next.milestones = [...(next.milestones || [])];
                            next.milestones[idx] = { ...next.milestones[idx], description: e.target.value };
                            return next;
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
                          rows={3}
                          placeholder="Describe this milestone..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSiteContent((prev: SiteContent | null) => {
                            if (!prev) return prev;
                            const newMilestones = [...(prev.milestones || [])];
                            if (idx > 0) {
                              [newMilestones[idx], newMilestones[idx - 1]] = [newMilestones[idx - 1], newMilestones[idx]];
                            }
                            return { ...prev, milestones: newMilestones };
                          })}
                          disabled={idx === 0}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Move Up
                        </button>
                        <button
                          onClick={() => setSiteContent((prev: SiteContent | null) => {
                            if (!prev) return prev;
                            const newMilestones = [...(prev.milestones || [])];
                            if (idx < newMilestones.length - 1) {
                              [newMilestones[idx], newMilestones[idx + 1]] = [newMilestones[idx + 1], newMilestones[idx]];
                            }
                            return { ...prev, milestones: newMilestones };
                          })}
                          disabled={idx === (siteContent?.milestones || []).length - 1}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Move Down
                        </button>
                        <button
                          onClick={() => setSiteContent(prev => {
                            if (!prev) return prev;
                            return {
                              ...prev,
                              milestones: prev.milestones.filter((_, i) => i !== idx),
                              myJourney: prev.myJourney,
                              skills: prev.skills,
                            };
                          })}
                          className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setSiteContent(prev => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        milestones: [
                          ...prev.milestones,
                          {
                            year: new Date().getFullYear().toString(),
                            title: 'New Milestone',
                            description: 'Add description here...'
                          }
                        ],
                        myJourney: prev.myJourney,
                        skills: prev.skills,
                      };
                    })}
                    className="mt-2 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 flex items-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Timeline Event
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md font-medium">
                Saving is now handled by Netlify CMS (Git Gateway). Use the admin panel at <a href="/admin" className="underline text-amber-700">/admin</a> to edit and save content.
              </div>
              <button
                onClick={() => {
                  // reload content from static JSON file
                  setContentLoading(true);
                  fetch('/data/siteContent.json').then(r => r.json()).then(data => setSiteContent(data)).finally(() => setContentLoading(false));
                }}
                className="px-4 py-2 rounded-md border border-gray-300"
              >
                Reload
              </button>
            </div>
          </div>
        </div>

        {/* Projects Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Projects</h2>
              <button
                onClick={createNewProject}
                className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                New Project
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800">{project.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                        {project.isFeatured && (
                          <StarIcon className="h-4 w-4 text-amber-500 fill-current" />
                        )}
                        {project.etsyEnabled && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.isSold ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {project.isSold ? 'SOLD' : 'On Etsy'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span>Category: {project.category}</span>
                        <span>Difficulty: {project.difficulty}</span>
                        <span>Estimated: {project.estimatedHours}h</span>
                        {project.actualHours && <span>Actual: {project.actualHours}h</span>}
                        <span>Updates: {project.updates.length}</span>
                        {project.etsyEnabled && project.etsyLink && (
                          <span className="text-purple-600">
                            <a href={project.etsyLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              View on Etsy
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleFeatured(project.id)}
                        className={`p-2 rounded ${project.isFeatured ? 'text-amber-600 bg-amber-50' : 'text-gray-400 hover:text-amber-600'}`}
                        title={project.isFeatured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <StarIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => editProject(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit project"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete project"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Editor Modal */}
      {showProjectEditor && (
        <ProjectEditor
          project={editingProject}
          categories={categories}
          onSave={handleSaveProject}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;