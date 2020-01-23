import React from 'react';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
import Image from 'gatsby-image';
import { Link } from 'gatsby-plugin-intl';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses } from '../utils/misc';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up(`sm`)]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
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

const footers = [
  {
    title: `Company`,
    description: [`Team`, `History`, `Contact us`, `Locations`],
  },
  {
    title: `Features`,
    description: [
      `Cool stuff`,
      `Random feature`,
      `Team feature`,
      `Developer stuff`,
      `Another one`,
    ],
  },
  {
    title: `Resources`,
    description: [
      `Resource`,
      `Resource name`,
      `Another resource`,
      `Final resource`,
    ],
  },
  {
    title: `Legal`,
    description: [`Privacy policy`, `Terms of use`],
  },
];


function Footer({ intl: { messages }, ...props }) {

  const data = useStaticQuery(query);
  const classes = mergeClasses(props, useStyles());

  return (
    <Container {...props} component="footer" className={classes.root} maxWidth={false}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer, n) => (
            <Grid item xs={6} md={3} key={n}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5} display="flex" flexDirection="row" justifyContent="space-around">
          <Image
            fixed={data.logo.childImageSharp.fixed}
            alt="Dmitri Mendeleev"
            title="Dmitri Mendeleev"
          />
          <Typography variant="body2" color="textSecondary" align="center">
            {messages['site-description']}<br />{`v. ${data.site.siteMetadata.version}`}
          </Typography>
          <img src={withPrefix('/img/lavoisier.jpg')} alt="Antoine de Lavoisier" title="Antoine de Lavoisier" />
        </Box>
      </Container>
    </Container>
  );
}

export default Footer;