'use client';

import { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon, ClockIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

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

interface ProjectEditorProps {
  project?: Project;
  categories?: string[];
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectEditor = ({ project, categories = [], onSave, onCancel }: ProjectEditorProps) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Date.now(),
      title: '',
      description: '',
      status: 'planning',
      category: '',
      difficulty: 'beginner',
      startDate: '',
      estimatedHours: 0,
      etsyEnabled: false,
      isSold: false,
      isFeatured: false,
      images: [],
      videos: [],
      materials: [],
      equipment: [],
      techniques: [],
      updates: []
    }
  );

  const [activeTab, setActiveTab] = useState('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update form data when project prop changes
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        // Ensure all required fields exist with defaults
        actualHours: project.actualHours || undefined,
        completionDate: project.completionDate || undefined,
        etsyLink: project.etsyLink || undefined,
        images: project.images || [],
        videos: project.videos || [],
        materials: project.materials || [],
        equipment: project.equipment || [],
        techniques: project.techniques || [],
        updates: project.updates || []
      });
    } else {
      setFormData({
        id: Date.now(),
        title: '',
        description: '',
        status: 'planning',
        category: '',
        difficulty: 'beginner',
        startDate: '',
        estimatedHours: 0,
        etsyEnabled: false,
        isSold: false,
        isFeatured: false,
        images: [],
        videos: [],
        materials: [],
        equipment: [],
        techniques: [],
        updates: []
      });
    }
    // Reset to first tab when project changes
    setActiveTab('basic');
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving project:', formData);
    console.log('Is editing existing project:', !!project);
    onSave(formData);
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, { name: '', quantity: '', cost: 0, supplier: '' }]
    }));
  };

  const updateMaterial = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.map((material, i) => 
        i === index ? { ...material, [field]: value } : material
      )
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const addEquipment = () => {
    setFormData(prev => ({
      ...prev,
      equipment: [...prev.equipment, { name: '', description: '' }]
    }));
  };

  const updateEquipment = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeEquipment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  const addTechnique = () => {
    const technique = prompt('Enter technique name:');
    if (technique) {
      setFormData(prev => ({
        ...prev,
        techniques: [...prev.techniques, technique]
      }));
    }
  };

  const removeTechnique = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techniques: prev.techniques.filter((_, i) => i !== index)
    }));
  };

  const addProgressUpdate = () => {
    setFormData(prev => ({
      ...prev,
      updates: [...prev.updates, {
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: '',
        timeSpent: 0,
        photos: [],
        videos: []
      }]
    }));
  };

  const updateProgressUpdate = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      updates: prev.updates.map((update, i) => 
        i === index ? { ...update, [field]: value } : update
      )
    }));
  };

  const removeProgressUpdate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      updates: prev.updates.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, updateIndex?: number) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            if (updateIndex !== undefined) {
              // Add to progress update
              setFormData(prev => ({
                ...prev,
                updates: prev.updates.map((update, i) => 
                  i === updateIndex 
                    ? { ...update, photos: [...(update.photos || []), imageUrl] }
                    : update
                )
              }));
            } else {
              // Add to main project images
              setFormData(prev => ({
                ...prev,
                images: [...prev.images, imageUrl]
              }));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'materials', label: 'Materials & Equipment' },
    { id: 'progress', label: 'Progress Updates' },
    { id: 'media', label: 'Images & Videos' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {project ? 'Edit Project' : 'New Project'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Tabs */}
          <div className="border-b border-gray-200 flex-shrink-0">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-amber-700 text-amber-700'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                    >
                      <option value="-">-</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      value={formData.estimatedHours}
                      onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={formData.completionDate || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, completionDate: e.target.value || undefined }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm font-bold text-gray-700">
                    Feature this project on homepage
                  </label>
                </div>

                {/* Etsy Management Section */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Etsy Store Integration</h3>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="etsyEnabled"
                      checked={formData.etsyEnabled}
                      onChange={(e) => setFormData(prev => ({ ...prev, etsyEnabled: e.target.checked, etsyLink: e.target.checked ? prev.etsyLink : '' }))}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="etsyEnabled" className="ml-2 block text-sm font-bold text-gray-700">
                      List this project on Etsy
                    </label>
                  </div>

                  {formData.etsyEnabled && (
                    <div className="space-y-4 pl-6 border-l-2 border-amber-200">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Etsy Product URL
                        </label>
                        <input
                          type="url"
                          value={formData.etsyLink || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, etsyLink: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                          placeholder="https://www.etsy.com/listing/..."
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isSold"
                          checked={formData.isSold}
                          onChange={(e) => setFormData(prev => ({ ...prev, isSold: e.target.checked }))}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isSold" className="ml-2 block text-sm font-bold text-gray-700">
                          Mark as sold
                        </label>
                      </div>

                      {formData.isSold && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-800">
                            🎉 This item has been marked as sold! The Etsy link will show "SOLD" status to visitors.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-8">
                {/* Materials Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Materials</h3>
                    <button
                      type="button"
                      onClick={addMaterial}
                      className="bg-amber-700 text-white px-3 py-1 rounded-lg hover:bg-amber-800 transition-colors text-sm flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Material
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.materials.map((material, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="text"
                          placeholder="Material name"
                          value={material.name}
                          onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                        />
                        <input
                          type="text"
                          placeholder="Quantity"
                          value={material.quantity}
                          onChange={(e) => updateMaterial(index, 'quantity', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                        />
                        <input
                          type="number"
                          placeholder="Cost"
                          value={material.cost}
                          onChange={(e) => updateMaterial(index, 'cost', parseFloat(e.target.value) || 0)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                          step="0.01"
                        />
                        <input
                          type="text"
                          placeholder="Supplier"
                          value={material.supplier}
                          onChange={(e) => updateMaterial(index, 'supplier', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeMaterial(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Equipment</h3>
                    <button
                      type="button"
                      onClick={addEquipment}
                      className="bg-amber-700 text-white px-3 py-1 rounded-lg hover:bg-amber-800 transition-colors text-sm flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Equipment
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.equipment.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="text"
                          placeholder="Equipment name"
                          value={item.name}
                          onChange={(e) => updateEquipment(index, 'name', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                        />
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateEquipment(index, 'description', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeEquipment(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Techniques Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Techniques</h3>
                    <button
                      type="button"
                      onClick={addTechnique}
                      className="bg-amber-700 text-white px-3 py-1 rounded-lg hover:bg-amber-800 transition-colors text-sm flex items-center gap-1"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Technique
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.techniques.map((technique, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                      >
                        {technique}
                        <button
                          type="button"
                          onClick={() => removeTechnique(index)}
                          className="text-amber-600 hover:text-amber-800"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Progress Updates</h3>
                  <button
                    type="button"
                    onClick={addProgressUpdate}
                    className="bg-amber-700 text-white px-3 py-1 rounded-lg hover:bg-amber-800 transition-colors text-sm flex items-center gap-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Update
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.updates.map((update, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-gray-800">Update #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeProgressUpdate(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={update.date}
                            onChange={(e) => updateProgressUpdate(index, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">
                            Time Spent (hours)
                          </label>
                          <input
                            type="number"
                            value={update.timeSpent}
                            onChange={(e) => updateProgressUpdate(index, 'timeSpent', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800"
                            step="0.5"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={update.title}
                          onChange={(e) => updateProgressUpdate(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                          placeholder="What did you work on?"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                        <textarea
                          value={update.content}
                          onChange={(e) => updateProgressUpdate(index, 'content', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-600"
                          placeholder="Describe your progress..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Photos</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleImageUpload(e, index)}
                            accept="image/*"
                            multiple
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <PhotoIcon className="h-4 w-4" />
                            Add Photos
                          </button>
                          {update.photos && update.photos.length > 0 && (
                            <span className="text-sm text-gray-700">
                              {update.photos.length} photo(s) uploaded
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="p-6 border-t border-gray-200 flex-shrink-0 bg-white">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
              >
                {project ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditor;