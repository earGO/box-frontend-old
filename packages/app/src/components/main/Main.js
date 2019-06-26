import React from 'react'
import Link from '../common/Link'
import { Box, Heading } from '@ursip/design-system'

function Main() {
  return (
    <Box m={3}>
      <Heading mb={2}>ursip frontend modules</Heading>
      <Box m={2}>
        <Link bordered to="/nsi">
          nsi
        </Link>
      </Box>
      <Box m={2}>
        <Link bordered to="/project-page">
          project-page
        </Link>
      </Box>
    </Box>
  )
}

export default Main
