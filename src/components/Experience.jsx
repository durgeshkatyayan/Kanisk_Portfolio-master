import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { download, downloadHover, resume } from '../assets';
import { textVariant } from '../utils/motion';
import { useState } from 'react';

const ExperienceCard = ({ experience, index }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'linear-gradient(135deg, rgba(234, 234, 236, 0.95) 0%, rgba(208, 197, 189, 0.95) 100%)',
        color: '#292929',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(176, 152, 139, 0.2)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        backdropFilter: 'blur(10px)',
      }}
      contentArrowStyle={{
        borderRight: '8px solid rgba(176, 152, 139, 0.8)',
      }}
      date={
        <motion.div
          // FIXED: Reduced X offset and added opacity handling to prevent overflow
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          viewport={{ once: true }}>
          <h3 className="text-taupe text-[14px] font-bold font-beckman uppercase tracking-wider">
            {experience.date}
          </h3>
        </motion.div>
      }
      iconStyle={{
        background: experience.iconBg,
        boxShadow: '0 0 0 3px rgba(176, 152, 139, 0.3), 0 6px 16px rgba(0, 0, 0, 0.18)',
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}>

        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 mb-1.5">
          <h3 className="text-jetLight text-[16px] sm:text-[18px] font-bold font-beckman tracking-[1.5px] uppercase
            bg-gradient-to-r from-night to-jetLight bg-clip-text text-transparent">
            {experience.title}
          </h3>
          <p className="text-battleGray text-[12px] sm:text-[14px] font-bold font-overcameBold">
            {experience.company_name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-taupe text-[11px] sm:text-[12px] mb-3">
          {experience.location && (
            <span>📍 {experience.location}</span>
          )}
          {experience.employmentType && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-battleGray/15 rounded-full border border-battleGray/25">
              💼 {experience.employmentType}
            </span>
          )}
        </div>

        {experience.points && experience.points.length > 0 && (
          <ul className="list-none space-y-1.5">
            {experience.points.map((point, idx) => (
              <motion.li
                key={`experience-point-${idx}`}
                className="text-jetLight text-[12px] sm:text-[13px] leading-[18px] sm:leading-[20px] font-poppins flex items-start gap-1.5 group"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}>
                <span className="text-battleGray text-[14px] mt-0.5 group-hover:scale-125 transition-transform">▹</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gradient-to-r from-battleGray/15 to-taupe/15
                  text-jetLight text-[10px] sm:text-[11px] rounded-full font-medium
                  border border-battleGray/25 hover:border-battleGray/50
                  transition-all duration-200 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [downloadHovered, setDownloadHovered] = useState(false);

  return (
    // FIXED: Added overflow-x-hidden to the main container
    <div className="overflow-x-hidden w-full">
      <motion.div variants={textVariant()} className="relative">
        <div className="absolute -top-6 -left-6 w-28 h-28 bg-taupe/15 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-battleGray/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <p className={`${styles.sectionSubText} sm:pl-16 pl-6 relative z-10`}>
          What I've done so far
        </p>
        <h2 className={`${styles.sectionHeadText} sm:pl-16 pl-6 relative z-10`}>
          Work Experience.
        </h2>

        <motion.div
          className="mt-3 sm:ml-16 ml-6 h-0.5 bg-gradient-to-r from-battleGray via-taupe to-silver rounded-full"
          style={{ width: 0 }}
          whileInView={{ width: 72 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Stats - Responsive Grid */}
      <motion.div
        className="mt-8 sm:px-16 px-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}>
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
          {[
            { icon: '💼', label: 'Years Exp.', value: '2+' },
            { icon: '🏢', label: 'Companies', value: new Set(experiences.map(e => e.company_name)).size },
            { icon: '🚀', label: 'Projects', value: '8+' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-timberWolf/70 to-silver/50 rounded-xl p-3
                border border-taupe/25 backdrop-blur-sm text-center">
              <div className="text-xl mb-0.5">{stat.icon}</div>
              <div className="text-lg font-bold text-jetLight">{stat.value}</div>
              <div className="text-[10px] text-taupe uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-14 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line" animate={true}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} index={index} />
          ))}

          {/* Download Card */}
          <VerticalTimelineElement
            contentStyle={{
              background: 'linear-gradient(135deg, rgba(234, 234, 236, 0.95) 0%, rgba(208, 197, 189, 0.95) 100%)',
              color: '#292929',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
            }}
            iconStyle={{ background: 'linear-gradient(135deg, #917C78 0%, #B0988B 100%)' }}
            icon={<div className="flex justify-center items-center w-full h-full">📄</div>}
          >
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-jetLight text-[18px] font-bold text-center uppercase">
                Want to know more?
              </h3>
              <button 
                onClick={() => window.open('YOUR_LINK', '_blank')}
                className="bg-battleGray text-white px-6 py-2 rounded-lg font-bold text-[14px]">
                DOWNLOAD RESUME
              </button>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>

      <style jsx>{`
        .vertical-timeline-custom-line::before {
          background: #B0988B !important;
          opacity: 0.4;
        }
        /* FIXED: Ensures the timeline doesn't push the screen width on mobile */
        @media (max-width: 1170px) {
          .vertical-timeline--two-columns .vertical-timeline-element-content {
            margin-left: 60px !important;
            width: auto !important;
          }
          .vertical-timeline--two-columns .vertical-timeline-element-icon {
            left: 0 !important;
          }
          .vertical-timeline-custom-line::before {
            left: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Experience, 'work');