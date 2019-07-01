import { namespace } from './types'
import * as projectCard from '../../../services/project-card'
import reducers, { initialState } from './reducers'

import sagas from './sagas'

export const baseRoute = '/project-card'

export default {
  id: namespace,
  reducerMap: {
    [projectCard.name]: projectCard.default,
    [namespace]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [sagas],
  initialActions: [projectCard.actions.loadProject()],
}
