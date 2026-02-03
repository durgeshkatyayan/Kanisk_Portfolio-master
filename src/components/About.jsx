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
      className="xs:w-[250px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}>

      {/* Outer glow layer */}
      <motion.div
        className="absolute inset-0 rounded-[20px] blur-md transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(145,124,120,0.45), rgba(176,152,139,0.25), rgba(145,124,120,0.45))',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Animated border wrapper */}
      <div className="relative rounded-[20px] p-[1.5px] overflow-hidden shadow-card">

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
        <div className="relative z-10 bg-jetLight rounded-[19px] py-7 px-8 min-h-[260px] flex flex-col justify-center items-center gap-5">

          {/* Icon with light burst on hover */}
          <div className="relative flex justify-center items-center">
            {/* Glow behind icon */}
            <motion.div
              className="absolute rounded-full blur-lg"
              style={{ background: 'rgba(176,152,139,0.35)', width: 64, height: 64 }}
              animate={{ scale: isHovered ? 1.45 : 1, opacity: isHovered ? 0.7 : 0.25 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src={icon}
              alt={title}
              className="relative z-10 w-16 h-16 object-contain drop-shadow-md"
              animate={{ scale: isHovered ? 1.12 : 1, y: isHovered ? -3 : 0 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
            />
          </div>

          <h3 className="text-taupe text-[17px] font-bold text-center tracking-[0.5px]">
            {title}
          </h3>

          <motion.div
            className="rounded-full"
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
    <div className="-mt-[6rem]">

      <motion.div variants={textVariant()} className="relative">

        <div className="absolute -top-6 -left-4 w-24 h-24 bg-taupe/15 rounded-full blur-3xl animate-blob" />
        <div className="absolute -top-4 -right-6 w-20 h-20 bg-battleGray/15 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <p className={`${styles.sectionSubText} relative z-10`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} relative z-10`}>Overview.</h2>

        <motion.div
          className="mt-3 h-0.5 bg-gradient-to-r from-battleGray via-taupe to-silver rounded-full"
          style={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-5 text-taupe text-[16px] max-w-2xl leading-[28px]">
        I am a Full Stack Developer with expertise in MERN technology and an
        Android Developer using React Native. I excel in designing and developing
        efficient, user-friendly applications. Committed to delivering 100%
        problem-solving solutions, I manage databases effectively and create
        seamless, optimized user experiences across web and mobile platforms.
      </motion.p>

      <div className="mt-16 flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

  
      <style>{`
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