import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { success } from 'redux-saga-requests'
import * as projectService from '../../../services/project-card'

import * as types from './types'
import * as actions from './actions'
import * as selectors from './selectors'

/*It takes Project ID from loaded project, and loads tabs array on it*/
const loadTabs = function*() {
  const projectId = yield select(selectors.projectIdSelector)
  yield put(projectService.actions.loadTabs(projectId.projectId))
}
/*it loads sections based on current selected tab id*/
const loadSections = function*() {
  const tabId = yield select(selectors.selectedTabsSelector)
  yield put(projectService.actions.loadSections(tabId))
}

/*it loads section fields based on current selected section id*/
const loadFields = function*() {
  const sectionId = yield select(selectors.selectedSectionSelector)
  yield put(projectService.actions.loadFields(sectionId))
}

/*It preselects a tab first time project loaded*/
const preSelectTab = function*() {
  const TABS = yield select(selectors.tabsSelector)
  const selectedTab = yield select(selectors.selectedTabsSelector)
  yield put(actions.preselectTab(TABS, selectedTab))
}

/*It preselects a section based on current tab selected - always first one*/
const preSelectSection = function*() {
  const sections = yield select(selectors.sectionsSelector)
  yield put(actions.preselectSection(sections))
}

export default function*() {
  yield all([
    takeLatest(success(projectService.types.LOAD_PROJECT), loadTabs),
    takeLatest(success(projectService.types.LOAD_TABS), preSelectTab),
    takeLatest(types.PRESELECT_TAB, loadSections),
    takeEvery(success(projectService.types.LOAD_SECTIONS), preSelectSection),
    takeEvery(types.SELECT_TAB, loadSections),
    takeLatest(types.PRESELECT_SECTION, loadFields),
    takeEvery(types.SELECT_SECTION, loadFields),
  ])
}
