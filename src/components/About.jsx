import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.25 * index, 0.6)}
      className="xs:w-[250px] sm:w-[280px] w-full max-w-[95vw] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}>
      
      {/* Outer glow layer */}
      <motion.div
        className="absolute inset-0 rounded-[20px] blur-md transition-opacity duration-500 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(145,124,120,0.45), rgba(176,152,139,0.25), rgba(145,124,120,0.45))',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Animated border wrapper */}
      <div className="relative rounded-[20px] p-[1px] xs:p-[1.5px] overflow-hidden shadow-card w-full">
        {/* Rotating conic-gradient border animation */}
        <motion.div
          className="absolute inset-0 rounded-[20px]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, transparent 40%, rgba(176,152,139,0.9) 50%, transparent 60%, transparent 100%)',
            backgroundSize: '100% 100%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Static soft border underneath so it looks clean when not spinning */}
        <div className="absolute inset-0 rounded-[20px]"
          style={{
            background: 'linear-gradient(135deg, rgba(176,152,139,0.35), rgba(208,197,189,0.2), rgba(176,152,139,0.35))',
          }}
        />

        {/* Card body */}
        <div className="relative z-10 bg-jetLight rounded-[19px] py-5 xs:py-7 px-4 xs:px-8 min-h-[220px] xs:min-h-[260px] flex flex-col justify-center items-center gap-3 xs:gap-5 w-full">
          
          {/* Icon with light burst on hover */}
          <div className="relative flex justify-center items-center w-16 h-16 xs:w-20 xs:h-20">
            {/* Glow behind icon */}
            <motion.div
              className="absolute rounded-full blur-lg -z-10"
              style={{ background: 'rgba(176,152,139,0.35)', width: 56, height: 56 }}
              animate={{ scale: isHovered ? 1.45 : 1, opacity: isHovered ? 0.7 : 0.25 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src={icon}
              alt={title}
              className="relative z-10 w-12 h-12 xs:w-16 xs:h-16 object-contain drop-shadow-md"
              animate={{ scale: isHovered ? 1.12 : 1, y: isHovered ? -3 : 0 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
            />
          </div>

          <h3 className="text-taupe text-[15px] xs:text-[17px] font-bold text-center tracking-[0.5px] px-2 leading-tight line-clamp-2">
            {title}
          </h3>

          <motion.div
            className="rounded-full mx-auto"
            style={{
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(176,152,139,0.7), transparent)',
            }}
            animate={{ width: isHovered ? 56 : 28 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="-mt-[6rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <motion.div variants={textVariant()} className="relative">
        <div className="absolute -top-6 -left-4 w-20 h-20 xs:w-24 xs:h-24 bg-taupe/15 rounded-full blur-3xl animate-blob hidden lg:block" />
        <div className="absolute -top-4 -right-6 w-16 h-16 xs:w-20 xs:h-20 bg-battleGray/15 rounded-full blur-3xl animate-blob animation-delay-2000 hidden lg:block" />

        <p className={`${styles.sectionSubText} relative z-10`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} relative z-10`}>Overview.</h2>

        <motion.div
          className="mt-3 h-0.5 bg-gradient-to-r from-battleGray via-taupe to-silver rounded-full"
          style={{ width: 0 }}
          whileInView={{ width: '64px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-5 text-taupe text-[15px] sm:text-[16px] max-w-2xl leading-[26px] sm:leading-[28px] px-2 sm:px-0">
        I am a Full Stack Developer with expertise in MERN technology and an
        Android Developer using React Native. I excel in designing and developing
        efficient, user-friendly applications. Committed to delivering 100%
        problem-solving solutions, I manage databases effectively and create
        seamless, optimized user experiences across web and mobile platforms.
      </motion.p>

      <div className="mt-12 sm:mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          25%     { transform: translate(12px,-18px) scale(1.08); }
          50%     { transform: translate(-12px,12px) scale(0.93); }
          75%     { transform: translate(18px,18px) scale(1.04); }
        }
        .animate-blob            { animation: blob 7s infinite; }
        .animation-delay-2000    { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default SectionWrapper(About, 'about');
