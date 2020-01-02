import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useIntl, navigate } from 'gatsby-plugin-intl';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

export default function () {

  const classes = useStyles();
  const intl = useIntl();
  const [query, setQuery] = React.useState('');
  const handleChange = ev => {
    setQuery(ev.target.value);
  };

  const search = ev => {
    ev.preventDefault();
    navigate(`/search/?query=${query}`);
    setQuery('');
  }

  return (
    <form className={classes.search} onSubmit={search}>
      <div className={classes.searchIcon}>
        <SearchIcon onClick={search} />
      </div>
      <InputBase
        placeholder={intl.messages['search']}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={query}
        onChange={handleChange}
      />
    </form>
  );
}
