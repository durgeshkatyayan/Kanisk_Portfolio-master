const styles = {
  // Container widths - responsive max-widths
  innerWidth: '2xl:max-w-[1280px] xl:max-w-[1140px] lg:max-w-[960px] w-full',
  interWidth: 'lg:w-[80%] md:w-[85%] sm:w-[90%] w-[95%]',

  // Padding utilities - mobile-first approach
  paddings: 'sm:p-16 xs:p-8 p-6 py-8 sm:py-12',
  yPaddings: 'sm:py-16 xs:py-12 py-8',
  xPaddings: 'sm:px-16 xs:px-8 px-4',
  topPaddings: 'sm:pt-16 xs:pt-12 pt-8',
  bottomPaddings: 'sm:pb-16 xs:pb-12 pb-8',

  // Flex utilities
  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-start items-start',
  flexEnd: 'flex justify-end items-end',
  flexBetween: 'flex justify-between items-center',
  
  // Navigation
  navPadding: 'pt-[98px] xs:pt-[88px]',
  
  // Standard padding sets
  paddingX: 'sm:px-16 xs:px-8 px-4',
  paddingY: 'sm:py-16 xs:py-12 py-8',
  padding: 'sm:px-16 xs:px-8 px-4 sm:py-16 xs:py-12 py-8',

  // Hero text - fully responsive scaling
  heroHeadText:
    'font-black text-eerieBlack 2xl:text-[90px] xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] xs:text-[42px] text-[36px] 2xl:leading-[100px] xl:leading-[90px] lg:leading-[80px] md:leading-[70px] sm:leading-[60px] leading-[44px] mt-2',
  
  heroSubText:
    'text-eerieBlack font-medium 2xl:text-[28px] xl:text-[26px] lg:text-[24px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[16px] 2xl:leading-[40px] xl:leading-[38px] lg:leading-[35px] md:leading-[32px] sm:leading-[28px] leading-[24px]',

  // Section headings - responsive hierarchy
  sectionHeadText:
    'text-eerieBlack font-black 2xl:text-[70px] xl:text-[64px] lg:text-[58px] md:text-[52px] sm:text-[44px] xs:text-[36px] text-[30px] font-poppins 2xl:leading-[80px] xl:leading-[74px] lg:leading-[68px] md:leading-[60px] sm:leading-[52px] leading-[38px]',
  
  sectionHeadTextLight:
    'text-timberWolf font-black 2xl:text-[70px] xl:text-[64px] lg:text-[58px] md:text-[52px] sm:text-[44px] xs:text-[36px] text-[30px] font-poppins 2xl:leading-[80px] xl:leading-[74px] lg:leading-[68px] md:leading-[60px] sm:leading-[52px] leading-[38px]',
  
  sectionSubText:
    'xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-[15px] text-taupe uppercase tracking-wider font-semibold font-poppins',
  
  sectionSubTextLight:
    'xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-[15px] text-taupe uppercase tracking-wider font-semibold font-poppins',

  // Additional responsive text utilities
  bodyText:
    'xl:text-[18px] lg:text-[17px] md:text-[16px] text-[15px] leading-relaxed',
  
  smallText:
    'lg:text-[14px] md:text-[13px] text-[12px]',

  // Card and component spacing
  cardPadding: 'xl:p-8 lg:p-6 md:p-5 p-4',
  cardGap: 'xl:gap-8 lg:gap-6 md:gap-5 gap-4',

  // Grid layouts
  grid2Cols: 'grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8',
  grid3Cols: 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8',
  grid4Cols: 'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8',

  // Button styles - responsive
  button:
    'px-6 py-3 sm:px-8 sm:py-4 text-[14px] sm:text-[16px] font-semibold rounded-lg transition-all duration-300',
  
  buttonLarge:
    'px-8 py-4 sm:px-10 sm:py-5 text-[16px] sm:text-[18px] font-bold rounded-xl transition-all duration-300',

  // Image containers
  imageWrapper: 'w-full h-auto object-cover',
  avatarSmall: 'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
  avatarMedium: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full',
  avatarLarge: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full',

  // Spacing utilities
  sectionSpacing: 'mb-12 sm:mb-16 md:mb-20 lg:mb-24',
  elementSpacing: 'mb-6 sm:mb-8 md:mb-10',
  
  // Container utilities
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerFluid: 'w-full px-4 sm:px-6 lg:px-8',
  
  // Responsive visibility utilities
  showMobile: 'block sm:hidden',
  showTablet: 'hidden sm:block lg:hidden',
  showDesktop: 'hidden lg:block',
  hideMobile: 'hidden sm:block',
  hideTablet: 'block lg:hidden',
  hideDesktop: 'block lg:hidden',
};

export { styles };