import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@ursip/design-system'
import styled from 'styled-components'

const ContentBoxStyle = styled(Flex)`
  padding-top: ${props => props.padding + 'px'};
  padding-bottom: ${props => props.padding + 'px'};
  align-self: ${props => props.alignSelf};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  margin: 0 auto;
  width: ${props => props.contentwidth + 'px'};
`

function ContentBox({ children, padding, justifyContent, alignItems, contentwidth, alignSelf, ...props }) {
  /*some private methods*/
  return (
    <ContentBoxStyle
      padding={padding}
      justifyContent={justifyContent}
      contentwidth={contentwidth}
      alignItems={alignItems}
      alignSelf={alignSelf}
      {...props}
    >
      {children}
    </ContentBoxStyle>
  )
}

ContentBox.propTypes = {
  padding: PropTypes.number,
  justifyContent: PropTypes.string,
  contentwidth: PropTypes.number,
}

ContentBox.defaultProps = {
  padding: 0,
  justifyContent: 'flex-start',
  contentwidth: 1120,
  alignSelf: 'center',
}

export default ContentBox
