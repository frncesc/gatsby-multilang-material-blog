import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { changeLocale } from 'gatsby-plugin-intl';
import { siteMetadata } from '../../gatsby-config';

const { supportedLanguages, langNames } = siteMetadata;

const useStyles = makeStyles(theme => ({
  select: {
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    color: 'var(--topbar-color)',
  },
  icon: {
    color: 'var(--topbar-color)',
  },
}));

export default function ({ intl: { locale, messages } }) {

  const classes = useStyles();

  const handleChange = ev => changeLocale(ev.target.value);

  return (
    <FormControl
      variant="outlined"
      title={messages['change-language']}
    >
      <Select
        classes={{ root: classes.select, icon: classes.icon }}
        value={locale}
        onChange={handleChange}
        renderValue={value => value}
      >
        {supportedLanguages.map(lang => (
          <MenuItem key={lang} value={lang}>
            {langNames[lang]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
