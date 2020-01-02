/**
 * Info component
 */

import React from 'react';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';

export default function Info() {
  const data = useStaticQuery(graphql`
    query InfoQuery {
      logo: file(absolutePath: { regex: "/moto.png/" }) {
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
      <img src={withPrefix('/img/park.png')} alt="A bank on the park" />
    </Box>
  );
};
