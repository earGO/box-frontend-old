import React from 'react'
import { Table, Select, Input, Toggle, Icon, Box, Tooltip } from '@ursip/design-system'
import styled from 'styled-components'
import propTypes from 'prop-types'

const typeOptions = [
  { label: 'Строка', value: 'string' },
  { label: 'Дата', value: 'date' },
  { label: 'Целое число', value: 'number' },
  { label: 'Логическое', value: 'boolean' },
  { label: 'Другой справочник', value: 'ref_link' },
]

const CenteredHeaderCell = styled(Table.HeaderCell)`
  padding-left: 16px;
  justify-content: center;
`

const CenteredTableCell = styled(Table.Cell)`
  padding-left: 16px;
  justify-content: center;
`

const getCatalogsOptions = catalogs => {
  return catalogs.map(item => ({
    label: item.name,
    value: item.id,
  }))
}

const getAttributeOptions = (catalogs, catalogId) => {
  const catalog = catalogs.find(item => item.id === catalogId)
  return catalog.attributes.map(item => ({
    label: item.title,
    value: item.key,
  }))
}

const handleRowHeight = rowData => {
  if (rowData.type.value === 'ref_link' && rowData.type.catalogId) {
    return 72 + 48 + 48
  }
  if (rowData.type.value === 'ref_link') {
    return 72 + 48
  }
  return 72
}

const RefCatalogSelect = ({ refCatalogs, rowData, handleChange }) => {
  const options = getCatalogsOptions(refCatalogs)
  return (
    <Box mt={2}>
      <Select
        options={options}
        // temp
        value={options.find(item => item.value === rowData.type.catalogId)}
        // value={rowData.type}
        menuPortalTarget={document.getElementById('tableWrapper')}
        onChange={handleChange}
      />
    </Box>
  )
}

const RefCatalogAttributeSelect = ({ refCatalogs, catalogId, rowData, handleChange }) => {
  const options = getAttributeOptions(refCatalogs, catalogId)
  return (
    <Box key={catalogId} mt={2}>
      <Select
        options={options}
        // temp
        value={options.find(item => item.value === rowData.type.attributeId)}
        // value={rowData.type}
        menuPortalTarget={document.getElementById('tableWrapper')}
        onChange={handleChange}
      />
    </Box>
  )
}

const CatalogTable = ({ handleItemChange, handleItemDelete, handleRefLinkChange, attributes, refCatalogs }) => {
  return (
    <Table setRowHeight={handleRowHeight} data={attributes} minHeight={72 + 48} rowHeight={72} autoHeight rowKey="key">
      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Название</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px' }} dataKey="title">
          {rowData => {
            return (
              <Box flex="1">
                <Input value={rowData.title} onChange={handleItemChange('title', rowData.key)} />
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Тип</Table.HeaderCell>
        <Table.Cell style={{ paddingLeft: '16px' }} dataKey="type" flexGrow={1}>
          {rowData => {
            return (
              <Box flex="1">
                <Select
                  options={typeOptions}
                  // temp
                  value={typeOptions.find(item => item.value === rowData.type.value)}
                  // value={rowData.type}
                  menuPortalTarget={document.getElementById('tableWrapper')}
                  onChange={handleRefLinkChange(rowData.key, 'type')}
                />
                {rowData.type.value === 'ref_link' && (
                  <RefCatalogSelect
                    rowData={rowData}
                    refCatalogs={refCatalogs}
                    handleChange={handleRefLinkChange(rowData.key, 'catalogId')}
                  />
                )}
                {rowData.type.value === 'ref_link' && rowData.type.catalogId && (
                  <RefCatalogAttributeSelect
                    rowData={rowData}
                    refCatalogs={refCatalogs}
                    catalogId={rowData.type.catalogId}
                    handleChange={handleRefLinkChange(rowData.key, 'attributeId')}
                  />
                )}
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={128} sort>
        <CenteredTableCell>Обязательность</CenteredTableCell>
        <CenteredTableCell dataKey="required">
          {rowData => {
            return <Toggle checked={rowData.required} onChange={handleItemChange('required', rowData.key)} />
          }}
        </CenteredTableCell>
      </Table.Column>

      <Table.Column width={128} sort>
        <CenteredTableCell>Уникальность</CenteredTableCell>
        <CenteredTableCell dataKey="unique">
          {rowData => {
            return <Toggle checked={rowData.unique} onChange={handleItemChange('unique', rowData.key)} />
          }}
        </CenteredTableCell>
      </Table.Column>

      <Table.Column width={160} sort>
        <Table.HeaderCell style={{ paddingLeft: '16px' }}>Описание</Table.HeaderCell>
        <Table.Cell dataKey="description">
          {rowData => {
            return (
              <Box flex="1">
                <Input value={rowData.note} onChange={handleItemChange('note', rowData.key)} />
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={96}>
        <CenteredHeaderCell>Действия</CenteredHeaderCell>
        <CenteredTableCell>
          {rowData => (
            <Icon
              name="ellipsis-h"
              title="Удалить"
              onClick={() => {
                handleItemDelete(rowData.key)
              }}
            />
          )}
        </CenteredTableCell>
      </Table.Column>
    </Table>
  )
}

CatalogTable.propTypes = {
  attributes: propTypes.array,
  refCatalogs: propTypes.array,
  handleItemChange: propTypes.func,
  handleItemDelete: propTypes.func,
  handleRefLinkChange: propTypes.func,
}

export default CatalogTable
