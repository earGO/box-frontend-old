import { success, error } from 'redux-saga-requests'

export const name = 'project-card'

export const api = 'http://localhost:3000/'

/*Types*/

const LOAD_PROJECT = `${name}/LOAD_PROJECT`
const LOAD_TABS = `${name}/LOAD_TABS`

const LOAD_SECTIONS = `${name}/LOAD_SECTIONS`

const LOAD_FIELDS = `${name}/LOAD_FIELDS`

export const types = {
  LOAD_PROJECT,
  LOAD_TABS,
  LOAD_SECTIONS,
  LOAD_FIELDS,
}

/*Endpoints*/
const project = api + 'project'
const tabs = api + 'tabs'
const sections = api + 'sections'
const fields = api + 'fields'

export const endpoints = {
  project,
  tabs,
  sections,
  fields,
}

/* Action creators */
export const actions = {
  loadProject() {
    return {
      type: types.LOAD_PROJECT,
      payload: {
        request: {
          url: `${project}`,
        },
      },
    }
  },
  loadSections() {
    return {
      type: types.LOAD_SECTIONS,
      payload: {
        request: {
          url: `${endpoints.sections}`,
        },
      },
    }
  },
  loadTabs() {
    return {
      type: types.LOAD_TABS,
      payload: {
        request: {
          url: `${endpoints.tabs}`,
        },
      },
    }
  },
  loadFields() {
    return {
      type: types.LOAD_FIELDS,
      payload: {
        request: {
          url: `${endpoints.fields}`,
        },
      },
    }
  },
}

export default function projectCardReducer(state = {}, { type, payload }) {
  switch (type) {
    case success(types.LOAD_PROJECT):
      return {
        ...state,
        project: payload.data,
      }
    case success(types.LOAD_TABS):
      return {
        ...state,
        tabs: payload.data,
      }
    case success(types.LOAD_SECTIONS):
      return {
        ...state,
        sections: payload.data,
      }
    case success(types.LOAD_FIELDS):
      return {
        ...state,
        fields: payload.data,
      }
    default:
      return state
  }
}
