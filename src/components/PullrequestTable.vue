<template>
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
                class="dark:bg-gray-900 lg:hover:bg-gray-600 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 cursor-pointer"
                v-on:click="openPage(r.html_url)">
                <td
                    class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800 block lg:table-cell relative lg:static">
                    <div class="flex items-center">
                        {{ r.base.repo.full_name }}
                    </div>
                </td>
                <td
                    class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800 block lg:table-cell relative lg:static">
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
                    <a href="#" class="text-blue-400 hover:text-blue-600 underline">Edit</a>
                    <a href="#" class="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'PullrequestTable',

        computed: {
            pullrequests() {
                return this.$store.state.pullrequests
            }
        },

        methods: {
            openPage(url) {
                window.open(url, '_blank')
            },
        },

        mounted () {
            this.$store.dispatch("getPullrequests")
        }
    }
</script>