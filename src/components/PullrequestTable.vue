<template>
    <div>
        <div v-if="bounty" ref="bounty">
            <Bounty :dev="dev"/>
            <div class="mt-5 w-full">
                <button @click="closeBounty" type="button" class="px-4 py-1 rounded-md font-semibold bg-red-600 text-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 m-auto fill-current text-red-900">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
        <table class="border-collapse w-full text-left rounded-lg border-b border-opacity-50">
            <thead>
                <tr class="dark:text-gray-400 text-black">
                    <th class="font-normal p-3 border-b dark:border-gray-800 hidden lg:table-cell">
                        Repository</th>
                    <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                        Title</th>
                    <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                        Requested reviewers</th>
                    <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                        Labels</th>
                    <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                        Opened by</th>
                    <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                        Actions</th>
                </tr>
            </thead>
            <tbody class="text-black dark:text-gray-100">
                <tr v-for="r in pullrequests" :key="r.html_url"
                    class="dark:bg-gray-900 lg:hover:bg-gray-600 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 cursor-pointer">
                    <td
                        class="w-full lg:w-auto p-3 text-left font-bold border-b border-gray-200 dark:border-gray-800 block lg:table-cell relative lg:static">
                        <div class="flex items-center">
                            {{ r.base.repo.full_name }}
                        </div>
                    </td>
                    <td
                        class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800 block lg:table-cell relative lg:static"
                        v-on:click="openPage(r.html_url)">
                        {{ r.title }}
                    </td>
                    <td
                        :class="{ 'hidden' : r.requested_reviewers.length == 0 }"
                        class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800  block lg:table-cell relative lg:static">
                        <div v-for="l in r.requested_reviewers" v-bind:key="l.login" class="mt-1">
                            <span class="rounded bg-blue-400 py-1 px-3 text-xs font-bold">{{ l.login }}</span>
                        </div>
                    </td>
                    <td
                        class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800  block lg:table-cell relative lg:static"
                        :class="{ 'hidden' : r.labels.length == 0 }">
                        <div v-for="l in r.labels" v-bind:key="l.name" class="mt-1">
                            <span class="rounded bg-blue-400 py-1 px-3 text-xs font-bold">{{ l.name }}</span>
                        </div>
                    </td>
                    <td
                        class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800  block lg:table-cell relative lg:static">
                        <div class="flex items-center">
                            <img :src="r.user.avatar_url" class="w-7 h-7 p-1 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                            {{ r.user.login }}
                        </div>
                    </td>
                    <td
                        class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800  block lg:table-cell relative lg:static">
                        <button @click="openBounty(r.user.login)" class="h-10 px-3 rounded-md shadow text-blue-400 hover:text-blue-600 bg-black">Bounty ⚡</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Bounty from './Bounty'
    import devs from '@/dev'
    
    export default {
        name: 'PullrequestTable',

        components: {
            Bounty
        },

        data () {
            return {
                bounty: false,
                dev: ""
            }
        },

        computed: {
            pullrequests() {
                return this.$store.state.pullrequests
            }
        },

        methods: {
            openPage(url) {
                window.open(url, '_blank')
            },
            openBounty(dev) {
                if (devs.filter(x => x.user === dev).length > 0) {
                    this.dev = dev
                    this.bounty = true
                } else {
                    alert("This dev hasn't set LN yet")
                    this.bounty = false
                }
            },
            closeBounty() {
                this.bounty = false
            }
        },

        mounted () {
            this.$store.dispatch("getPullrequests")
        }
    }
</script>