import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@ursip/design-system'

/*other import goes here*/

function FiedlItemLine({ fieldline }) {
  if (fieldline.type === 'group') {
    return (
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <Box>{fieldline.name}</Box>
      </Flex>
    )
  } else {
    return (
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
        <Box>{fieldline.name}</Box>
        <Box>{fieldline.value}</Box>
      </Flex>
    )
  }
}

FiedlItemLine.propTypes = {}

FiedlItemLine.defaultProps = {}

export default FiedlItemLine
