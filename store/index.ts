import type { MutationTree, ActionTree } from 'vuex';

// Định nghĩa kiểu của state
export interface State {
    theme: string;
    menuKey: number;
    menuDptKey: number;
    listDpt: any[];
    pageState: string;
    missionDraft: any | null;
    draftTypeIdSelections: any[];
    missionDraftTaskId: number | null;
    isAdmin: boolean;
    roleData: any[];
}

// Khởi tạo state
export const state = (): State => ({
    theme: 'light',
    menuKey: 11335577,
    menuDptKey: 22446688,
    listDpt: [],
    pageState: 'default',
    missionDraft: null,
    draftTypeIdSelections: [],
    missionDraftTaskId: null,
    isAdmin: false,
    roleData: [],
});

// Định nghĩa mutations với kiểu dữ liệu của state và payload
export const mutations: MutationTree<State> = {
    setRole(state, newValue: any[]) {
        state.roleData = newValue;
    },
    setAdmin(state, isAdmin: boolean) {
        state.isAdmin = isAdmin;
    },
    setDraftTypeIdSelections(state, newValue: any[]) {
        state.draftTypeIdSelections = newValue;
    },
    setMissionDraftTaskId(state, newValue: number | null) {
        state.missionDraftTaskId = newValue;
    },
    setMissionDraft(state, newValue: any) {
        state.missionDraft = newValue;
    },
    setPageState(state, newValue: string) {
        state.pageState = newValue;
    },
    setTheme(state, newValue: string) {
        state.theme = newValue;
    },
    setMenuKey(state, newValue: number) {
        state.menuKey = newValue;
    },
    increaseMenuKey(state) {
        state.menuKey++;
    },
    setDptMenuKey(state, newValue: number) {
        state.menuDptKey = newValue;
    },
    increaseDptMenuKey(state) {
        state.menuDptKey++;
    },
    setListDpt(state, newValue: any[]) {
        state.listDpt = newValue;
    },
};

// Định nghĩa actions với kiểu dữ liệu của state, mutations và payload
export const actions: ActionTree<State, State> = {
    updateRole({ commit }, newValue: any[]) {
        commit('setRole', newValue);
    },
    updateDraftTypeIdSelections({ commit }, newValue: any[]) {
        commit('setDraftTypeIdSelections', newValue);
    },
    updateMissionDraftTaskId({ commit }, newValue: number | null) {
        commit('setMissionDraftTaskId', newValue);
    },
    updateMissionDraft({ commit }, newValue: any) {
        commit('setMissionDraft', newValue);
    },
    updatePageState({ commit }, newValue: string) {
        commit('setPageState', newValue);
    },
    updateTheme({ commit }, newValue: string) {
        commit('setTheme', newValue);
    },
    updateMenuKey({ commit }, newValue: number) {
        commit('setMenuKey', newValue);
    },
    updateIncreMenuKey({ commit }) {
        commit('increaseMenuKey');
    },
    updateDptMenuKey({ commit }, newValue: number) {
        commit('setDptMenuKey', newValue);
    },
    updateIncreDptMenuKey({ commit }) {
        commit('increaseDptMenuKey');
    },
    updateListDpt({ commit }, newValue: any[]) {
        commit('setListDpt', newValue);
    },
};
