import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import projects from '../projects'

Vue.use(Vuex)


//to handle state
const state = {
    pullrequests: [],
    issues: [],
    projects: [],
    last_updated: {
        pull_request: 0,
        issue: 0,
        projects: 0
    }
}

//to handle state
const getters = {}

//to handle actions
const actions = {
    getPullrequests({ commit }) {
        if ((Math.round(+new Date()/1000) - state.last_updated.pull_request) > 300) {
            commit('SET_PR_TIME', Math.round(+new Date()/1000))

            let links = []

            projects.forEach((p) => {
                links.push('https://api.github.com/repos/' + p.owner + '/' + p.repo + '/pulls')
            })
    
            axios.all(links.map(l => axios.get(l)))
                .then(axios.spread((...res) => {
                    let pre_result = []
                    res.forEach((i) => {
                        pre_result = pre_result.concat(i.data)
                    })
                    pre_result.sort((a, b) => {
                        return new Date(a.created_at) - new Date(b.created_at)
                    })
                    commit('SET_PULLREQUEST', [].concat(pre_result).reverse())
                }))
        }
    },

    getIssues({ commit }) {
        if ((Math.round(+new Date()/1000) - state.last_updated.issue) > 300) {
            commit('SET_ISSUE_TIME', Math.round(+new Date()/1000))

            let links = []

            projects.forEach((p) => {
                links.push('https://api.github.com/repos/' + p.owner + '/' + p.repo + '/issues')
            })

            axios.all(links.map(l => axios.get(l)))
                .then(axios.spread((...res) => {
                    let pre_result = []
                    res.forEach((i) => {
                        pre_result = pre_result.concat(i.data)
                    })
                    pre_result.sort((a, b) => {
                        return new Date(a.created_at) - new Date(b.created_at)
                    })
                    pre_result = [].concat(pre_result).reverse()
                    commit('SET_ISSUES', pre_result.filter(item => !item.pull_request))
            }))
        }
    },

    getProjects({ commit }) {
        if ((Math.round(+new Date()/1000) - state.last_updated.projects) > 300) {
            commit('SET_PROJECT_TIME', Math.round(+new Date()/1000))
            let projects_details = []
            projects.forEach((p) => {
                axios.get('https://api.github.com/repos/' + p.owner + '/' + p.repo).then((res) => {
                projects_details.push(res.data)
                })
            })
            commit('SET_PROJECTS', projects_details)
        }
    }
}

//to handle mutations
const mutations = {
    SET_PULLREQUEST(state, prs) {
        state.pullrequests = prs
    },
    SET_ISSUES(state, issues) {
        state.issues = issues
    },
    SET_PR_TIME(state, time) {
        state.last_updated.pull_request = time
    },
    SET_ISSUE_TIME(state, time) {
        state.last_updated.issue = time
    },
    SET_PROJECTS(state, projects) {
        state.projects = projects
    },
    SET_PROJECT_TIME(state, time) {
        state.last_updated.projects = time
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
/*
export const store = new Vuex.Store({
    
    state: {
        _pullrequests: null
    },

    mutations: {
        SET_PULLREQUEST(state, data) {
            state._pullrequests = data
        }
    },

    getters: {
        pullRequests: state => state._pullrequests
    },

    actions: {
        getPullrequests({ context }) {
            if (context.state._pullrequests === null) {
                let links = []

                projects.forEach((p) => {
                    links.push('https://api.github.com/repos/' + p.owner + '/' + p.repo + '/pulls')
                })

                this.$api.all(links.map(l => this.$api.get(l)))
                    .then(this.$api.spread((...res) => {
                        let pre_result = []
                        res.forEach((i) => {
                            pre_result = pre_result.concat(i.data)
                        })
                        pre_result.sort((a, b) => {
                            return new Date(a.created_at) - new Date(b.created_at)
                        })
                        context.commit('SET_PULLREQUEST', [].concat(pre_result).reverse())
                    }))
            }
        }
    }
})*/