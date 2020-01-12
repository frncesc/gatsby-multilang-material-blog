import React from 'react';
import clsx from 'clsx';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { getAllResolvedVersionsForLanguage } from '../utils/node';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function ({ intl, drawerOpen, setDrawerOpen }) {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          supportedLanguages
        }
      }
      allMdx(filter: {fields: {slug: {regex: "/^(?!\\/blog\\/)/"}}}, sort: {fields: frontmatter___order, order: ASC}) {
        edges {
          node {
            excerpt
            fields {
              lang
              slug
            }
            frontmatter {
              title
              order
              date
              description
            }
          }
        }
      }
    }
  `);

  const pages = getAllResolvedVersionsForLanguage(data, intl);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          {theme.direction === 'rtl' ? (drawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />) : (drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
        </IconButton>
      </div>
      <Divider />
      <List>
        {pages.map(node => (
          <ListItem button key={node.fields.slug}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={node.frontmatter.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {pages.map(node => (
          <ListItem button key={node.fields.slug}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={node.frontmatter.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem button >
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>
    </Drawer>
  );
}