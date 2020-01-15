// Utilities for "Font Awesome" SVG icons
// See: https://fontawesome.com/
// See: https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMicroblog } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faStickyNote, faAtom, faRadiation, faBrain, faTable } from '@fortawesome/free-solid-svg-icons';
library.add(
  faMicroblog,
  faBlog, faStickyNote, faAtom, faRadiation, faBrain, faTable
);

/**
 * Gets a React element containing a Font Awesome SVG icon based on a declared name (or a default icon when no name is provided)
 * All used icons should be explicity added to `library` (see above)
 */
export const FontAwIcon = (props) => {
  const { icon } = props;
  const iconTag = icon ? icon.indexOf('|') > 0 ? icon.split('|') : icon : 'sticky-note';
  return <FontAwesomeIcon {...{ ...props, icon: iconTag }} />
}
