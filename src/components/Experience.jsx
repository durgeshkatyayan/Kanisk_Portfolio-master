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
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
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

        {/* Title + Company Row */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 mb-1.5">
          <h3 className="text-jetLight text-[18px] font-bold font-beckman tracking-[1.5px] uppercase
            bg-gradient-to-r from-night to-jetLight bg-clip-text text-transparent">
            {experience.title}
          </h3>
          <p className="text-battleGray text-[14px] font-bold font-overcameBold">
            {experience.company_name}
          </p>
        </div>

        {/* Location + Employment Type — single compact row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-taupe text-[12px] mb-3">
          {experience.location && (
            <span>📍 {experience.location}</span>
          )}
          {experience.employmentType && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-battleGray/15 rounded-full border border-battleGray/25">
              💼 {experience.employmentType}
            </span>
          )}
        </div>

        {/* Description Points */}
        {experience.points && experience.points.length > 0 && (
          <ul className="list-none space-y-1.5">
            {experience.points.map((point, idx) => (
              <motion.li
                key={`experience-point-${idx}`}
                className="text-jetLight text-[13px] leading-[20px] font-poppins flex items-start gap-1.5 group"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}>
                <span className="text-battleGray text-[14px] mt-0.5 group-hover:scale-125 transition-transform">▹</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-2.5 py-0.5 bg-gradient-to-r from-battleGray/15 to-taupe/15
                  text-jetLight text-[11px] rounded-full font-medium
                  border border-battleGray/25 hover:border-battleGray/50
                  hover:shadow-sm transition-all duration-200 cursor-default"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                viewport={{ once: true }}>
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-taupe/25">
            <div className="space-y-1">
              {experience.achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-1.5 text-jetLight text-[12px]"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}>
                  <span className="text-yellow-600 text-[13px] leading-[18px]">★</span>
                  <span>{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [downloadHovered, setDownloadHovered] = useState(false);

  return (
    <>
      {/* Header */}
      <motion.div variants={textVariant()} className="relative">
        <div className="absolute -top-6 -left-6 w-28 h-28 bg-taupe/15 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-battleGray/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <p className={`${styles.sectionSubText} sm:pl-16 pl-[2rem] relative z-10`}>
          What I've done so far
        </p>
        <h2 className={`${styles.sectionHeadText} sm:pl-16 pl-[2rem] relative z-10`}>
          Work Experience.
        </h2>

        <motion.div
          className="mt-3 sm:ml-16 ml-[2rem] h-0.5 bg-gradient-to-r from-battleGray via-taupe to-silver rounded-full"
          style={{ width: 0 }}
          whileInView={{ width: 72 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Stats — compact 3-col strip */}
      <motion.div
        className="mt-8 sm:px-16 px-[2rem]"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '💼', label: 'Years Exp.', value: '2+' },
            { icon: '🏢', label: 'Companies', value: new Set(experiences.map(e => e.company_name)).size },
            { icon: '🚀', label: 'Projects', value: '8+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-timberWolf/70 to-silver/50 rounded-xl p-3
                border border-taupe/25 backdrop-blur-sm hover:border-battleGray/45
                transition-all duration-250 group cursor-default text-center"
              whileHover={{ scale: 1.04, y: -3 }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}>
              <div className="text-xl mb-0.5 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-xl font-bold text-jetLight font-beckman leading-tight">{stat.value}</div>
              <div className="text-[10px] text-taupe font-medium uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="mt-14 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line">
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} index={index} />
          ))}

          {/* Resume Download Card */}
          <VerticalTimelineElement
            contentStyle={{
              background: 'linear-gradient(135deg, rgba(234, 234, 236, 0.95) 0%, rgba(208, 197, 189, 0.95) 100%)',
              color: '#292929',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(176, 152, 139, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
            }}
            contentArrowStyle={{
              borderRight: '8px solid rgba(176, 152, 139, 0.8)',
            }}
            iconStyle={{
              background: 'linear-gradient(135deg, #917C78 0%, #B0988B 100%)',
              boxShadow: '0 0 0 3px rgba(176, 152, 139, 0.3), 0 6px 16px rgba(0, 0, 0, 0.18)',
            }}
            icon={
              <motion.div
                className="flex justify-center items-center w-full h-full"
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}>
                <img src={resume} alt="resume" className="w-[50%] h-[50%] object-contain" />
              </motion.div>
            }>
            <motion.div
              className="flex flex-col items-center gap-2.5"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}>

              <h3 className="text-jetLight text-[18px] font-bold font-beckman text-center uppercase tracking-wider">
                Want to know more?
              </h3>
              <p className="text-taupe text-[13px] text-center max-w-xs">
                Download my resume to see my full professional journey and achievements.
              </p>

              <motion.button
                className="flex justify-center items-center gap-2
                  text-[15px] text-timberWolf
                  font-bold font-beckman py-2.5 px-5
                  rounded-[10px] bg-gradient-to-r from-battleGray to-jetLight
                  hover:from-jetLight hover:to-battleGray
                  border border-silver/30 hover:border-silver/60
                  transition-all duration-300 ease-in-out
                  shadow-md hover:shadow-lg hover:shadow-battleGray/40
                  group"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  window.open(
                    'https://drive.google.com/file/d/1lxKVcfSuIFSz9ONs-dW_AdxnZc826Bdq/view?usp=drive_link',
                    '_blank'
                  )
                }
                onMouseEnter={() => setDownloadHovered(true)}
                onMouseLeave={() => setDownloadHovered(false)}>
                <span className="group-hover:tracking-wider transition-all duration-300">
                  DOWNLOAD RESUME
                </span>
                <motion.img
                  src={downloadHovered ? downloadHover : download}
                  alt="download"
                  className="w-5 h-5 object-contain"
                  animate={{ y: downloadHovered ? [0, -4, 0] : 0 }}
                  transition={{ repeat: downloadHovered ? Infinity : 0, duration: 0.9 }}
                />
              </motion.button>
            </motion.div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(14px, -20px) scale(1.08); }
          50% { transform: translate(-14px, 14px) scale(0.92); }
          75% { transform: translate(20px, 20px) scale(1.04); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        .vertical-timeline-custom-line::before {
          background: linear-gradient(to bottom,
            rgba(176, 152, 139, 0.4),
            rgba(145, 124, 120, 0.6),
            rgba(176, 152, 139, 0.4)) !important;
          width: 3px !important;
        }
        @media (max-width: 1170px) {
          .vertical-timeline-custom-line::before { left: 50px !important; }
        }
      `}</style>
    </>
  );
};

export default SectionWrapper(Experience, 'work');