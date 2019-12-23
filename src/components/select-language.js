import React from 'react';
import { siteMetadata } from '../../gatsby-config';
import { useIntl, changeLocale } from 'gatsby-plugin-intl';

const { supportedLanguages } = siteMetadata;

const SelectLanguage = () => {
  const intl = useIntl();
  const { messages } = intl;
  const setLocale = loc => ev => changeLocale(loc);

  return (
    <ul>
      {supportedLanguages.map(lang => (
        <li key={lang} onClick={setLocale(lang)} style={{cursor: 'pointer'}}>
          {messages[lang]}
        </li>
      ))}
    </ul>
  );
}

export default SelectLanguage;