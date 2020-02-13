import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { mergeClasses } from '../utils/misc';
import SvgIcon from '@material-ui/core/SvgIcon';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    "& button": {
      marginLeft: '-0.7rem',
    }
  },
  twitter: {
    color: '#01acee',
  },
  facebook: {
    color: '#3c5a98',
  },
  telegram: {
    color: '#37aee2',
  },
  whatsapp: {
    color: '#2cb842',
  },
  pinterest: {
    color: '#cb2128',
  },
  email: {
    color: '#0a5191',
  },
}));


export const GMailIcon = () =>
  <SvgIcon viewBox="0 0 48 48">
    <path d="M5.5 40.5h37A3.5 3.5 0 0046 37V11a3.5 3.5 0 00-3.5-3.5h-37A3.5 3.5 0 002 11v26a3.5 3.5 0 003.5 3.5z" fill="#e0e0e0" />
    <path d="M26 40.5h16.5A3.5 3.5 0 0046 37V11a3.5 3.5 0 00-3.5-3.5h-37A3.5 3.5 0 002 11l24 29.5z" fill="#d9d9d9" />
    <path d="M6.745 40.5H42.5A3.5 3.5 0 0046 37V11.5l-39.255 29z" fill="#eee" />
    <path d="M25.745 40.5H42.5A3.5 3.5 0 0046 37V11.5L18.771 31.616l6.974 8.884z" fill="#e0e0e0" />
    <path d="M42.5 9.5h-37C3.567 9.5 2 9.067 2 11v26a3.5 3.5 0 003.5 3.5H7V12h34v28.5h1.5A3.5 3.5 0 0046 37V11c0-1.933-1.567-1.5-3.5-1.5z" fill="#ca3737" />
    <path d="M42.5 7.5h-37A3.48 3.48 0 002 11c0 1.206 1.518 2.258 1.518 2.258L24 27.756l20.482-14.497S46 12.206 46 11.001A3.48 3.48 0 0042.5 7.5z" fill="#f5f5f5" />
    <path d="M43.246 7.582L24 21 4.754 7.582A3.474 3.474 0 002 11c0 1.206 1.518 2.258 1.518 2.258L24 27.756l20.482-14.497S46 12.206 46 11.001a3.474 3.474 0 00-2.754-3.419z" fill="#e84f4b" />
  </SvgIcon>;

export const GClassRoomIcon = () =>
  <SvgIcon viewBox="0 0 48 48">
    <path d="M41 42H7c-2.207 0-4-1.793-4-4V10c0-2.207 1.793-4 4-4h34c2.207 0 4 1.793 4 4v28c0 2.207-1.793 4-4 4z" fill="#FFC107" />
    <path d="M7 10h34v28H7z" fill="#388E3C" /><path d="M28 36h8v2h-8zM27 20a3 3 0 11-6.002-.002A3 3 0 0127 20z" fill="#FFF" />
    <path d="M18 23a1.999 1.999 0 11-4 0 1.999 1.999 0 114 0z" fill="#A5D6A7" />
    <path d="M7 10h34v2H7z" fill="#2E7D32" /><path d="M36 38h-8l4 4h8z" fill="#FFAB00" />
    <path d="M34 23a1.999 1.999 0 11-4 0 1.999 1.999 0 114 0zM37 28.688c0-.446-.164-.875-.469-1.2C35.84 26.75 34.363 26 32 26c-2.363 0-3.84.75-4.531 1.488a1.747 1.747 0 00-.469 1.2V30h10zM21 28.688c0-.446-.164-.875-.469-1.2C19.84 26.75 18.363 26 16 26c-2.363 0-3.84.75-4.531 1.488a1.747 1.747 0 00-.469 1.2V30h10z" fill="#A5D6A7" />
    <path d="M30 27.742c0-.535-.195-1.047-.563-1.437C28.605 25.418 26.837 24 24 24c-2.836 0-4.605 1.418-5.438 2.305A2.08 2.08 0 0018 27.742V30h12z" fill="#FFF" />
  </SvgIcon>;

export const MoodleIcon = () =>
  <SvgIcon viewBox="0 0 48 48">
    <path fill="#ffab40" d="M33.5 16c-2.5 0-4.8 1-6.5 2.6-1.7-1.6-4-2.6-6.5-2.6-5.2 0-9.5 4.3-9.5 9.5V37h6V24.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5V37h6V24.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5V37h6V25.5c0-5.2-4.3-9.5-9.5-9.5z" />
    <path d="M5.5 16.2h1V32h-1z" />
    <path fill="#424242" d="M22 13c1.1.4 2.6 2 3 3-1.8 1.7-2.6 2.9-3 6-.1 1.1-.9 1.7-2 1-3.1-1.9-6-2-8-2-1-1-.5-3.7 0-5l6 1 4-4z" />
    <path fill="#616161" d="M18 17H4l11-7h14l-11 7z" />
    <path fill="#424242" d="M7.5 30c0-2.2-.7-4-1.5-4s-1.5 1.8-1.5 4 .7 4 1.5 4 1.5-1.8 1.5-4z" />
  </SvgIcon>;


export default function ShareButtons({ intl, link, title, hash = '', via = '', shareOn = {}, ...props }) {

  const { twitter, facebook, telegram, whatsapp, pinterest, email, classroom, moodle } = shareOn;
  const classes = mergeClasses(props, useStyles());
  const { messages } = intl;
  const twitterLink = `https://twitter.com/intent/tweet?text=${title}&url=${link}${hash ? `&hashtags=${hash}` : ''}${via ? `&via=${via}` : ''}`;

  return (
    <div className={classes.root}>
      {twitter &&
        <a href={twitterLink} target="_blank" rel="noopener noreferrer">
          <IconButton className={classes.twitter} aria-label="Twitter" title={messages['share-twitter']} >
            <TwitterIcon />
          </IconButton>
        </a>
      }
      {facebook &&
        <IconButton className={classes.facebook} aria-label="Facebook" title={messages['share-facebook']}>
          <FacebookIcon />
        </IconButton>}
      {telegram &&
        <IconButton className={classes.telegram} aria-label="Telegram" title={messages['share-telegram']}>
          <TelegramIcon />
        </IconButton>}
      {whatsapp &&
        <IconButton className={classes.whatsapp} aria-label="WhatsApp" title={messages['share-whatsapp']}>
          <WhatsAppIcon />
        </IconButton>}
      {pinterest &&
        <IconButton className={classes.pinterest} aria-label="Pinterest" title={messages['share-pinterest']}>
          <PinterestIcon />
        </IconButton>}
      {email &&
        <IconButton className={classes.email} aria-label="E-mail" title={messages['share-email']} >
          <EmailIcon />
        </IconButton>}
      {classroom &&
        <IconButton aria-label="Google Classroom" title={messages['share-classroom']} >
          <GClassRoomIcon />
        </IconButton>}
      {moodle &&
        <IconButton aria-label="Moodle" title={messages['share-moodle']}>
          <MoodleIcon />
        </IconButton>}
    </div>
  );


}