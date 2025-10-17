'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Hand Embroidery: A Beginner's Guide",
      excerpt: "Learn the basic stitches and techniques to begin your embroidery journey. From choosing the right materials to mastering your first French knot.",
      content: "Embroidery is a wonderful craft that allows you to add beautiful details to fabric...",
      author: "CraftSyrph",
      publishedAt: "2024-10-15T10:00:00Z",
      updatedAt: "2024-10-15T10:00:00Z",
      category: "tutorials",
      tags: ["embroidery", "beginner", "tutorial", "stitches"],
      readTime: 8,
      featuredImage: "/api/placeholder/600/400",
      slug: "getting-started-with-hand-embroidery"
    },
    {
      id: 2,
      title: "My Vintage Embroidered Blouse Project Journey",
      excerpt: "Follow along as I document the complete process of creating a vintage-inspired embroidered blouse, from initial design to final touches.",
      content: "This project started when I found a beautiful vintage pattern...",
      author: "CraftSyrph",
      publishedAt: "2024-10-12T14:30:00Z",
      updatedAt: "2024-10-12T14:30:00Z",
      category: "project-stories",
      tags: ["embroidery", "vintage", "blouse", "project"],
      readTime: 12,
      featuredImage: "/api/placeholder/600/400",
      slug: "vintage-embroidered-blouse-journey"
    },
    {
      id: 3,
      title: "Essential Tools Every Textile Crafter Needs",
      excerpt: "A comprehensive guide to building your textile craft toolkit. From basic necessities to specialized equipment that can elevate your work.",
      content: "Having the right tools makes all the difference in textile crafts...",
      author: "CraftSyrph",
      publishedAt: "2024-10-08T09:15:00Z",
      updatedAt: "2024-10-08T09:15:00Z",
      category: "guides",
      tags: ["tools", "equipment", "essentials", "crafting"],
      readTime: 6,
      featuredImage: "/api/placeholder/600/400",
      slug: "essential-textile-craft-tools"
    },
    {
      id: 4,
      title: "Color Theory for Textile Artists",
      excerpt: "Understanding how colors work together can transform your textile projects. Learn the basics of color theory and how to apply them to your crafts.",
      content: "Color is one of the most powerful elements in textile design...",
      author: "CraftSyrph",
      publishedAt: "2024-10-05T16:45:00Z",
      updatedAt: "2024-10-05T16:45:00Z",
      category: "techniques",
      tags: ["color-theory", "design", "textile-art", "creativity"],
      readTime: 10,
      featuredImage: "/api/placeholder/600/400",
      slug: "color-theory-for-textile-artists"
    },
    {
      id: 5,
      title: "Sustainable Practices in Textile Crafts",
      excerpt: "Explore ways to make your crafting more environmentally friendly. From choosing sustainable materials to upcycling old textiles.",
      content: "As crafters, we have a responsibility to consider our environmental impact...",
      author: "CraftSyrph",
      publishedAt: "2024-10-01T11:20:00Z",
      updatedAt: "2024-10-01T11:20:00Z",
      category: "sustainability",
      tags: ["sustainability", "eco-friendly", "upcycling", "environment"],
      readTime: 7,
      featuredImage: "/api/placeholder/600/400",
      slug: "sustainable-textile-crafts"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'project-stories', label: 'Project Stories' },
    { value: 'guides', label: 'Guides' },
    { value: 'techniques', label: 'Techniques' },
    { value: 'sustainability', label: 'Sustainability' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Craft Stories & Tutorials</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join me on my creative journey through textile crafts. From step-by-step tutorials to 
            project stories and crafting insights.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Featured Image</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {featuredPost.category.replace('-', ' ')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-pink-600 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{formatDistanceToNow(new Date(featuredPost.publishedAt))} ago</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{featuredPost.readTime} min read</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-amber-700 hover:text-orange-700 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Post Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {post.readTime} min
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-pink-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                    >
                      <TagIcon className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDistanceToNow(new Date(post.publishedAt))} ago
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-amber-700 hover:text-orange-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found matching your criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-amber-50 rounded-lg p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Get notified when I publish new tutorials, project stories, and crafting tips.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
            />
            <button className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;