import React from 'react'
import PropTypes from 'prop-types'
import SectionsItem from './SectionsItem'
import { Flex } from '@ursip/design-system'
import styled from 'styled-components'
import ContentBox from '../common/ContentBox'
import AddSection from './AddSection'
import { useDispatch } from 'react-redux'
import * as actions from './module/actions'

const Bordered = styled(Flex)``

function Sections({ projectSections }) {
  const dispatch = useDispatch()
  const selectSection = id => dispatch(actions.selectSection(id))
  if (projectSections !== undefined) {
    return (
      <ContentBox contentwidth={352} style={{ alignSelf: 'flex-start' }}>
        <Bordered flexDirection={'column'}>
          <AddSection />
          <Flex flexDirection={'column'}>
            {projectSections.map((section, key) => {
              return (
                <SectionsItem key={key} sectionId={section.id} selectSection={selectSection}>
                  {section.name}
                </SectionsItem>
              )
            })}
          </Flex>
        </Bordered>
      </ContentBox>
    )
  } else {
    return null
  }
}

Sections.propTypes = {
  projectSections: PropTypes.array,
}

Sections.defaultProps = {
  projectSections: [
    {
      author: 'Barney Stinson',
      dateCreated: '02-02-2019',
      id: 'm21n-solutions-id',
      name: "Something wrong, data haven't came",
      nick: 'someNick',
      sort: 'some-sort',
      tabId: 'someId',
      version: '1.0.0',
    },
  ],
}

SectionsItem.propTypes = {
  projectSections: PropTypes.array,
}

SectionsItem.defaultProps = {
  projectSections: [],
}

export default Sections
