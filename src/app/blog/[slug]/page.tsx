'use client';

import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon, ShareIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

export default function Page({ params }: { params: { slug: string } }) {
  // Mock blog post data - in a real app, this would be fetched based on params.slug
  console.log('Blog post slug:', params.slug);
  const post = {
    id: 1,
    title: "Getting Started with Hand Embroidery: A Beginner's Guide",
    excerpt: "Learn the basic stitches and techniques to begin your embroidery journey. From choosing the right materials to mastering your first French knot.",
    content: `
# Getting Started with Hand Embroidery: A Beginner's Guide

Embroidery is a wonderful craft that allows you to add beautiful details to fabric using just needle and thread. Whether you want to embellish clothing, create decorative pieces, or simply enjoy the meditative nature of stitching, this guide will help you get started.

## Essential Supplies

Before you begin your embroidery journey, you'll need a few basic supplies:

### Fabric
- **Cotton**: Great for beginners, easy to work with
- **Linen**: Provides a lovely texture and is durable
- **Muslin**: Affordable practice fabric

### Threads
- **DMC Cotton Floss**: Most popular and widely available
- **Madeira**: High-quality alternative
- **Silk Thread**: For special projects (more advanced)

### Needles
- **Embroidery Needles**: Sharp point, larger eye
- **Sizes 22-26**: Good range for different thread weights

### Hoops
- **4-6 inch hoops**: Perfect for small projects
- **Wood or plastic**: Both work well for beginners

## Basic Stitches to Master

### 1. Running Stitch
The most basic stitch - simply weave the needle in and out of the fabric in even intervals.

### 2. Backstitch
Great for outlines and text. Work from right to left, inserting the needle behind where you came up.

### 3. French Knots
Perfect for adding texture and dimension. Wrap the thread around the needle 1-3 times before pulling through.

### 4. Satin Stitch
Used to fill areas with solid color. Keep stitches parallel and close together.

### 5. Chain Stitch
Creates a linked effect, great for curves and decorative lines.

## Getting Started

1. **Choose a simple pattern**: Start with something small like a flower or geometric shape
2. **Transfer the design**: Use transfer paper or trace with a water-soluble pen
3. **Secure in hoop**: Keep fabric taut but not overly stretched
4. **Start stitching**: Begin with the outline, then fill in details
5. **Take your time**: Embroidery is meant to be relaxing!

## Tips for Success

- **Good lighting**: Essential for seeing your work clearly
- **Sharp needles**: Replace bent or dull needles promptly
- **Thread length**: Use 18-inch lengths to prevent tangling
- **Practice**: Try different stitches on scrap fabric first

## Common Mistakes to Avoid

- **Pulling too tight**: This can pucker the fabric
- **Knots on front**: Always start and end on the back
- **Mixing thread types**: Stick to one type per project for consistency

## Next Steps

Once you've mastered these basics, you can explore:
- **Crewel embroidery**: Using wool threads
- **Cross-stitch**: Working on counted fabric
- **Goldwork**: Adding metallic elements
- **Stumpwork**: Creating raised, dimensional effects

Remember, embroidery is a journey of continuous learning. Each project teaches you something new, and mistakes are just part of the process. The most important thing is to enjoy the meditative quality of stitching and take pride in creating something beautiful with your own hands.

Happy stitching! 🧵✨
    `,
    author: "CraftSyrph",
    publishedAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-15T10:00:00Z",
    category: "tutorials",
    tags: ["embroidery", "beginner", "tutorial", "stitches", "supplies"],
    readTime: 8,
    featuredImage: "/api/placeholder/800/400",
    slug: "getting-started-with-hand-embroidery"
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Essential Tools Every Textile Crafter Needs",
      slug: "essential-textile-craft-tools",
      category: "guides"
    },
    {
      id: 3,
      title: "My Vintage Embroidered Blouse Project Journey",
      slug: "vintage-embroidered-blouse-journey",
      category: "project-stories"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Navigation */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-amber-700 hover:text-orange-700 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Featured Image */}
          <div className="h-64 md:h-80 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Featured Image</span>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium capitalize">
                {post.category}
              </span>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {formatDistanceToNow(new Date(post.publishedAt))} ago
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
              <button className="flex items-center hover:text-pink-600 transition-colors">
                <ShareIcon className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-700 font-bold">S</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">Textile Artist & Educator</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
                      {paragraph.slice(2)}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                      {paragraph.slice(3)}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                      {paragraph.slice(4)}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- **')) {
                  const parts = paragraph.slice(4).split('**');
                  return (
                    <li key={index} className="mb-2">
                      <strong>{parts[0]}</strong>: {parts[1]?.slice(2)}
                    </li>
                  );
                }
                if (paragraph.trim() === '') {
                  return <div key={index} className="h-4" />;
                }
                return (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <TagIcon className="h-4 w-4 text-gray-500" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?search=${tag}`}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm hover:bg-amber-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group p-4 rounded-lg border border-gray-200 hover:border-amber-200 hover:bg-amber-50 transition-colors"
              >
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {relatedPost.category.replace('-', ' ')}
                </span>
                <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors mt-1">
                  {relatedPost.title}
                </h4>
                <p className="text-sm text-amber-700 font-medium mt-2">Read more →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="bg-amber-50 rounded-lg p-8 text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoyed this post?</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified of new tutorials and project updates.
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
}