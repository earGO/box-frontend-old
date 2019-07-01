import React from 'react'
import PropTypes from 'prop-types'
import ContentBox from '../common/ContentBox'
import { Flex } from '@ursip/design-system'
import styled from 'styled-components'
import FieldsItem from './FieldsItem'

const Bordered = styled(Flex)`
  border: 1px solid red;
`

function Fields({ projectFields }) {
  console.log(projectFields)
  if (projectFields !== undefined) {
    return (
      <ContentBox
        contentwidth={736}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        alignSelf={'flex-start'}
        flexDirection={'column'}
      >
        {projectFields.map((field, key) => {
          return <FieldsItem key={key} field={field} />
        })}
      </ContentBox>
    )
  } else {
    return null
  }
}

Fields.propTypes = {
  projectFields: PropTypes.array,
}

Fields.defaultProps = {
  projectFields: [
    [
      {
        id: 'common-info-is-it-dangerous-id-65',
        sectionId: 'tech-params-id',
        name: "Something wrong - data didn't come",
        nick: 'is-it-dangerous',
        value: "Something wrong - data didn't come",
        author: 'Barney Stinson',
        dateCreated: '03-02-2019',
        type: 'project_manager.project_user_element.type',
        version: 'project_manager.project_user_element.version',
        sort: 'project_manager.project_user_element.sort',
        idFile: 'project_manager.project_user_element.idFile',
        useElement: 'user_element BOOLEAN',
      },
    ],
  ],
}

export default Fields
