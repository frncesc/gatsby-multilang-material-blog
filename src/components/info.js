/**
 * Info component
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';

const Info = () => {
  const data = useStaticQuery(graphql`
    query InfoQuery {
      logo: file(absolutePath: { regex: "/park.png/" }) {
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
        }
      }
    }
  `);

  const { author, description } = data.site.siteMetadata;
  return (
    <Box>
      <Image
        fixed={data.logo.childImageSharp.fixed}
        alt={author}
      />
      <p>{description}</p>
      <img src="/img/park.png" />
    </Box>
  );
};

export default Info;
