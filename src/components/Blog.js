import React from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div`
  width: 100%;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const BlogCard = styled.div`
  background: rgba(10, 10, 40, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(65, 105, 225, 0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(65, 105, 225, 0.2);
  }
`;

const BlogImageContainer = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 20, 0.7));
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a1a4a;
  background-image: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px);
  background-size: 550px 550px;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  color: #4169E1;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const BlogDate = styled.p`
  color: #A0A0FF;
  font-size: 0.8rem;
  margin-bottom: 15px;
`;

const BlogExcerpt = styled.p`
  color: #E0E0FF;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ReadMoreLink = styled.a`
  color: #4169E1;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development',
      date: 'March 5, 2025',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from WebAssembly to AI-driven interfaces.',
      link: '#'
    },
    {
      id: 2,
      title: 'Mastering React Hooks',
      date: 'February 20, 2025',
      excerpt: 'A comprehensive guide to using React Hooks effectively in your projects, with practical examples and best practices.',
      link: '#'
    },
    {
      id: 3,
      title: 'The Art of UI Animation',
      date: 'January 15, 2025',
      excerpt: 'Learn how to create smooth, meaningful animations that enhance user experience without compromising performance.',
      link: '#'
    },
    {
      id: 4,
      title: 'Building Accessible Web Applications',
      date: 'December 10, 2024',
      excerpt: 'Why accessibility matters and how to implement it in your web projects to create inclusive experiences for all users.',
      link: '#'
    }
  ];

  return (
    <BlogContainer>
      <BlogGrid>
        {blogPosts.map(post => (
          <BlogCard key={post.id}>
            <BlogImageContainer>
              <BlogImage />
            </BlogImageContainer>
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogDate>{post.date}</BlogDate>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <ReadMoreLink href={post.link}>Read More</ReadMoreLink>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default Blog;
