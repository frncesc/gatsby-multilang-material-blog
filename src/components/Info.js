/**
 * Info component
 */

import React from 'react';
import { useStaticQuery, graphql, withPrefix } from 'gatsby';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';

export default function Info({ intl: { messages } }) {
  const data = useStaticQuery(graphql`
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
  `);

  return (
    <Box marginTop={6}>
      <hr />
      <Box display="flex" flexDirection="row">
        <Image
          fixed={data.logo.childImageSharp.fixed}
          alt="Dmitri Mendeleev"
          title="Dmitri Mendeleev"
        />
        <Box flexGrow={1} alignSelf="center" p={1} textAlign="center" color="secondary.main" fontStyle="italic">
          {messages['site-description']}<br />
          v. {data.site.siteMetadata.version}
        </Box>
        <div><img src={withPrefix('/img/lavoisier.jpg')} alt="Antoine de Lavoisier" title="Antoine de Lavoisier" /></div>
      </Box>
    </Box>
  );
};
