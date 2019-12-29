import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { changeLocale, useIntl } from 'gatsby-plugin-intl';
import { siteMetadata } from '../../gatsby-config';

const { supportedLanguages } = siteMetadata;

export default function () {
  const { locale, messages } = useIntl();
  const handleChange = ev => changeLocale(ev.target.value);
  return (
    <FormControl variant="outlined" className="select-language" title={messages['change-language']}>
      <Select
        value={locale}
        onChange={handleChange}
      >
        {supportedLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </Select>
    </FormControl>
  );
}