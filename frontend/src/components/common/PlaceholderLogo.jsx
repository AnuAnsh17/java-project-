import React from 'react';
import collegeLogoSvg from '../../assets/college-logo/college-logo-placeholder.svg';
import ccLogoSvg from '../../assets/campus-connect-logo/campus-connect-logo-placeholder.svg';

export const CollegeLogo = ({ className = 'brand-logo-img', alt = 'TSDCEM College Crest' }) => {
  return (
    <img
      src={collegeLogoSvg}
      alt={alt}
      className={className}
    />
  );
};

export const CampusConnectLogo = ({ className = 'brand-logo-img', alt = 'Campus Connect Logo' }) => {
  return (
    <img
      src={ccLogoSvg}
      alt={alt}
      className={className}
    />
  );
};
