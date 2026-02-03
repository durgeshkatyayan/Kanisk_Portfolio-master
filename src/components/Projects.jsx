import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { github, pineapple, pineappleHover } from '../assets';
import { project, projects } from '../constants';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';

const ProjectCard = ({
  id,
  name,
  description,
  image,
  repo,
  demo,
  index,
  active,
  handleClick,
  tags,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        active === id ? 'lg:flex-[3.5] md:flex-[8] flex-[10]' : 'lg:flex-[0.75] md:flex-[3] flex-[2]'
      } flex items-center justify-center min-w-[170px] max-w-[95vw] 
      h-[420px] sm:h-[380px] xs:h-[340px] cursor-pointer card-shadow transition-all duration-500 ease-out
      hover:scale-[1.02] group overflow-hidden`}
      onClick={() => handleClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-battleGray via-taupe to-silver opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
      
      {/* Background overlay with gradient */}
      <div
        className={`absolute top-0 left-0 z-10 bg-gradient-to-br from-jetLight to-transparent
        h-full w-full rounded-[24px] transition-opacity duration-500
        ${active === id ? 'opacity-[0.3]' : 'opacity-[0.5]'}`}></div>

      {/* Image with zoom effect */}
      <motion.img
        src={image}
        alt={name}
        className="absolute w-full h-full object-cover rounded-[24px]"
        animate={{
          scale: isHovered && active !== id ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Inactive card - vertical text */}
      {active !== id ? (
        <motion.div 
          className="flex items-center justify-start pr-4 sm:pr-[4.5rem] w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}>
          <h3
            className="font-extrabold font-beckman uppercase w-full sm:w-[200px] h-[30px] 
            whitespace-nowrap sm:text-[27px] xs:text-[18px] text-[14px] text-timberWolf tracking-[1px]
            absolute z-20 lg:bottom-[7rem] lg:rotate-[-90deg] lg:origin-[0,0]
            leading-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
            {name}
          </h3>
          
          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity sm:block hidden"
            initial={{ x: -10 }}
            animate={{ x: isHovered ? 0 : -10 }}>
            <span className="text-timberWolf text-sm font-beckman">Click to expand →</span>
          </motion.div>
        </motion.div>
      ) : (
        <>
          {/* Active card - full details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 p-4 sm:p-8 justify-start w-full h-[60%] sm:h-[70%]
            flex flex-col bg-gradient-to-t from-[rgba(20,20,20,0.95)] via-[rgba(60,60,60,0.7)] to-transparent
            rounded-b-[24px] z-20 backdrop-blur-sm overflow-y-auto overscroll-contain">
            
            {/* Action buttons */}
            <div className="absolute inset-0 flex justify-end m-2 sm:m-3 gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(repo, '_blank');
                }}
                className="bg-gradient-to-br from-night to-battleGray xs:w-9 xs:h-9 sm:w-11 sm:h-11 w-10 h-10 rounded-full 
                flex justify-center items-center cursor-pointer
                shadow-lg hover:shadow-taupe/50 transition-shadow duration-300">
                <img
                  src={github}
                  alt="source code"
                  className="w-4/5 h-4/5 object-contain"
                />
              </motion.div>
              
              {/* Star/favorite button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-br from-yellow-500 to-orange-500 xs:w-9 xs:h-9 sm:w-11 sm:h-11 w-10 h-10 rounded-full 
                flex justify-center items-center cursor-pointer
                shadow-lg hover:shadow-yellow-500/50 transition-shadow duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            </div>

            {/* Project title with animated underline */}
            <motion.h2
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="font-bold xs:text-[20px] sm:text-[32px] text-[24px] 
              text-timberWolf uppercase font-beckman xs:mt-0 sm:-mt-[1rem] -mt-[0.5rem]
              relative inline-block w-full overflow-hidden">
              {name}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 bg-gradient-to-r from-battleGray via-taupe to-silver mt-1 sm:mt-2 rounded-full"></motion.div>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-silver xs:text-[11px] sm:text-[14px] text-[12px] 
              max-w-full xs:leading-[16px] sm:leading-[24px] leading-[18px]
              font-poppins tracking-[1px] mt-2 sm:mt-3 line-clamp-4">
              {description}
            </motion.p>

            {/* Technology tags */}
            {tags && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-4 max-h-[40px] overflow-y-auto">
                {tags.map((tag, idx) => {
                  const tagName = typeof tag === 'string' ? tag : tag.name;
                  const tagColor = typeof tag === 'object' && tag.color ? tag.color : '#B0B0B0';
                  return (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: typeof tag === 'object' && tag.color ? `${tag.color}20` : undefined,
                        borderColor: typeof tag === 'object' && tag.color ? `${tag.color}60` : undefined,
                      }}
                      className={`px-2 xs:px-3 py-1 text-[10px] xs:text-xs font-medium text-timberWolf ${
                        typeof tag === 'string' 
                          ? 'bg-battleGray/30 border border-taupe/40'
                          : 'border'
                      } rounded-full backdrop-blur-sm hover:bg-battleGray/50 transition-all duration-300`}>
                      #{tagName}
                    </span>
                  );
                })}
              </motion.div>
            )}

            {/* Live demo button with enhanced animation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="live-demo flex justify-between 
              xs:text-[12px] sm:text-[16px] text-[14px] text-timberWolf 
              font-bold font-beckman items-center py-3 xs:py-4 pl-2 pr-2 xs:pr-3 
              whitespace-nowrap gap-1 xs:w-[110px] sm:w-[138px] w-[125px] 
              h-[40px] xs:h-[46px] sm:h-[50px] rounded-[10px] 
              bg-gradient-to-r from-battleGray/40 to-taupe/40
              border border-silver/30 backdrop-blur-md
              xs:mt-[12px] sm:mt-[22px] mt-[16px] 
              hover:from-battleGray/60 hover:to-taupe/60
              hover:border-silver/50
              transition-all duration-300 ease-in-out
              shadow-lg hover:shadow-taupe/50 mt-auto"
              onClick={(e) => {
                e.stopPropagation();
                window.open(demo, '_blank');
              }}
              onMouseOver={() => {
                const icon = document.querySelector(`.btn-icon-${id}`);
                if (icon) icon.setAttribute('src', pineappleHover);
              }}
              onMouseOut={() => {
                const icon = document.querySelector(`.btn-icon-${id}`);
                if (icon) icon.setAttribute('src', pineapple);
              }}>
              <motion.img
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                src={pineapple}
                alt="pineapple"
                className={`btn-icon-${id} xs:w-[24px] xs:h-[24px] sm:w-[34px] sm:h-[34px] 
                  w-[30px] h-[30px] object-contain`}
              />
              LIVE DEMO
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [active, setActive] = useState('project-2');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); 

  // Combine all projects
  const allProjects = [...projects, ...project];

  // Custom tech stack categories with icons and colors
  const techCategories = [
    { name: 'all', icon: '🌐', color: 'from-blue-400 to-cyan-400', textColor: 'text-blue-300' },
    { name: 'React.js', icon: '⚛️', color: 'from-cyan-400 to-blue-500', textColor: 'text-cyan-300' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-600 to-gray-800', textColor: 'text-gray-300' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-600', textColor: 'text-green-300' },
    { name: 'Express.js', icon: '🚂', color: 'from-gray-500 to-gray-700', textColor: 'text-gray-300' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-600 to-green-800', textColor: 'text-green-400' },
    { name: 'MySQL', icon: '🐬', color: 'from-blue-500 to-blue-700', textColor: 'text-blue-300' },
    { name: 'Tailwind', icon: '💨', color: 'from-teal-400 to-cyan-500', textColor: 'text-teal-300' },
    { name: 'REST API', icon: '🔌', color: 'from-orange-500 to-red-600', textColor: 'text-orange-300' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-500 to-blue-700', textColor: 'text-blue-300' },
    { name: 'JavaScript', icon: '📜', color: 'from-yellow-400 to-yellow-600', textColor: 'text-yellow-300' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-700', textColor: 'text-blue-300' },
    { name: 'Redux', icon: '🔮', color: 'from-purple-500 to-purple-700', textColor: 'text-purple-300' },
    { name: 'GraphQL', icon: '🔷', color: 'from-pink-500 to-rose-600', textColor: 'text-pink-300' },
  ];

  // Get available categories from projects
  const projectTechNames = new Set(
    allProjects.flatMap(p => 
      (p.tags || []).map(tag => 
        typeof tag === 'string' ? tag : tag.name
      )
    )
  );

  // Filter tech categories to show only those present in projects, plus 'all'
  const categories = techCategories.filter(
    tech => tech.name === 'all' || projectTechNames.has(tech.name)
  );

  // Filter projects based on category and search
  const filteredProjects = allProjects.filter(proj => {
    const projectTags = (proj.tags || []).map(tag => 
      typeof tag === 'string' ? tag : tag.name
    );
    const matchesFilter = filter === 'all' || projectTags.includes(filter);
    const matchesSearch = proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="-mt-[6rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with animated gradient */}
      <motion.div 
        variants={textVariant()}
        className="relative">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-taupe/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob hidden lg:block"></div>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-battleGray/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 hidden lg:block"></div>
        
        <p className={`${styles.sectionSubText} relative z-10`}>Case Studies</p>
        <h2 className={`${styles.sectionHeadTextLight} relative z-10`}>
          Projects.
        </h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[16px] sm:text-[18px] max-w-3xl leading-[28px] sm:leading-[30px]">
          These projects demonstrate my expertise with practical examples of
          some of my work, including brief descriptions and links to code
          repositories and live demos. They showcase my ability to tackle
          intricate challenges, adapt to various technologies, and efficiently
          oversee projects.
        </motion.p>
      </div>

      {/* Filter and Search Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between w-full">
        
        {/* Category Filter with Icons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-thin scrollbar-thumb-battleGray/50 scrollbar-track-night/50 lg:overflow-visible">
          {categories.map((tech) => (
            <motion.button
              key={tech.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tech.name)}
              className={`px-3 xs:px-4 py-2 rounded-full font-beckman text-xs sm:text-sm uppercase tracking-wider
                whitespace-nowrap flex items-center gap-2 min-w-fit transition-all duration-300 flex-shrink-0 ${
                filter === tech.name
                  ? `bg-gradient-to-r ${tech.color} text-white shadow-lg shadow-${tech.color.split('-')[1] || 'blue'}/30 border-2 border-white/20`
                  : 'bg-night/50 text-taupe hover:text-timberWolf border-2 border-battleGray/30 hover:border-taupe/50 backdrop-blur-sm'
              }`}>
              <span className="text-base flex-shrink-0">{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Search and View Mode */}
        <div className="flex gap-3 items-center flex-shrink-0">
          {/* Search Bar */}
          <div className="relative flex-shrink-0">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-night/50 border-2 border-battleGray/30 text-timberWolf px-3 sm:px-4 py-2 rounded-full
                focus:outline-none focus:border-taupe/50 w-[160px] sm:w-[200px] md:w-[250px]
                placeholder-taupe/50 transition-all duration-300 backdrop-blur-sm text-sm"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-taupe/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* View Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(viewMode === 'grid' ? 'expanded' : 'grid')}
            className="bg-night/50 border-2 border-battleGray/30 p-2 rounded-full
              hover:border-taupe/50 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-timberWolf" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {viewMode === 'expanded' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Display */}
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'expanded' ? (
            <motion.div
              key="expanded"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className="mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 w-full">
              <div className="flex lg:flex-auto w-full overflow-x-auto pb-4 lg:pb-0 scrollbar-thin scrollbar-thumb-battleGray/50 scrollbar-track-night/50 lg:overflow-visible snap-x snap-mandatory">
                {filteredProjects.map((proj, index) => (
                  <div key={proj.id} className="w-full lg:w-auto flex-shrink-0 lg:flex-shrink snap-center px-2 lg:px-0">
                    <ProjectCard
                      index={index}
                      {...proj}
                      active={active}
                      handleClick={setActive}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {filteredProjects.map((proj, index) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-night to-jetLight rounded-[24px] overflow-hidden
                    border-2 border-battleGray/30 hover:border-taupe/50 transition-all duration-300
                    group hover:shadow-xl hover:shadow-taupe/20 w-full">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/90 to-transparent"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-timberWolf font-beckman text-lg sm:text-xl uppercase mb-2 line-clamp-1">{proj.name}</h3>
                    <p className="text-taupe text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{proj.description}</p>
                    {proj.tags && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {proj.tags.slice(0, 3).map((tag, idx) => {
                          const tagName = typeof tag === 'string' ? tag : tag.name;
                          const techMatch = techCategories.find(t => t.name === tagName);
                          return (
                            <span 
                              key={idx} 
                              className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${
                                techMatch ? techMatch.textColor : 'text-silver'
                              } bg-battleGray/30 border border-taupe/20 whitespace-nowrap`}>
                              {techMatch?.icon} #{tagName}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open(proj.repo, '_blank')}
                        className="flex-1 bg-battleGray/50 hover:bg-battleGray/70 text-timberWolf py-2 rounded-lg transition-colors border border-taupe/20 text-xs sm:text-sm">
                        Code
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open(proj.demo, '_blank')}
                        className="flex-1 bg-gradient-to-r from-battleGray to-taupe text-timberWolf py-2 rounded-lg
                          hover:from-taupe hover:to-battleGray transition-all border border-silver/30 text-xs sm:text-sm">
                        Demo
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 w-full">
          <p className="text-taupe text-lg sm:text-xl">No projects found matching your criteria.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
            className="mt-4 px-6 py-2 bg-battleGray/50 text-timberWolf rounded-full
              border border-taupe/30 hover:border-taupe/50 transition-all text-sm">
            Clear Filters
          </motion.button>
        </motion.div>
      )}

      {/* Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center py-12 relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-battleGray/20 via-taupe/20 to-silver/20 rounded-[24px] blur-2xl"></div>
        <h2 className="text-timberWolf font-beckman text-2xl sm:text-3xl lg:text-4xl uppercase relative z-10">
          More Exciting Projects Coming Soon...
        </h2>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0] 
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-4">
          <span className="text-5xl sm:text-6xl">🚀</span>
        </motion.div>
      </motion.div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.5);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Projects, 'projects');
