import React from 'react';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '10rem',
    backgroundColor: theme.palette.grey[500],
    padding: theme.spacing(5, 10),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const query = graphql`
  query InfoQuery {
    logo: file(absolutePath: { regex: "/mendeleev-2\\.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        description
        version
      }
    }
  }
`;

function Footer({ intl: { messages } }) {

  const data = useStaticQuery(query);
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Image
        fixed={data.logo.childImageSharp.fixed}
        alt="Dmitri Mendeleev"
        title="Dmitri Mendeleev"
      />
      <p>{messages['site-description']}<br />
        v. {data.site.siteMetadata.version}</p>
      <div><img src={withPrefix('/img/lavoisier.jpg')} alt="Antoine de Lavoisier" title="Antoine de Lavoisier" /></div>
    </footer>
  );
}

export default Footer;