<template>
    <table class="border-collapse w-full text-left rounded-lg border-b border-opacity-50">
        <thead>
            <tr class="dark:text-gray-400 text-black">
                <th class="font-normal p-3 border-b dark:border-gray-800 hidden lg:table-cell">
                    Repository</th>
                <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                    Title</th>
                <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                    Labels</th>
                <th class="font-normal p-3  border-b dark:border-gray-800 hidden lg:table-cell">
                    Opened by</th>
            </tr>
        </thead>
        <tbody class="text-black dark:text-gray-100">
            <tr v-for="r in issues" :key="r.html_url"
                class="dark:bg-gray-900 lg:hover:bg-gray-600 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 cursor-pointer"
                v-on:click="openPage(r.html_url)">
                <td
                    class="w-full lg:w-auto p-3 text-left font-bold border-b border-gray-200 dark:border-gray-800 block lg:table-cell relative lg:static">
                    <div class="flex items-center">
                        {{ r.repository_url.split('https://api.github.com/repos/')[1] }}
                    </div>
                </td>
                <td
                    class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800 block lg:table-cell relative lg:static">
                    {{ r.title }}
                </td>
                <td
                    class="w-full lg:w-auto p-3 text-left border-b border-gray-200 dark:border-gray-800  block lg:table-cell relative lg:static">
                    <div v-for="l in r.labels" v-bind:key="l.name" class="mt-1">
                        <span class="rounded bg-blue-400 py-1 px-3 text-xs font-bold">{{ l.name }}</span>
                    </div>
                </td>
                <td
                    class="w-full lg:w-auto p-3 text-left border-b md:border-gray-800 border-blue-800  block lg:table-cell relative lg:static">
                    <div class="flex items-center">
                        <img :src="r.user.avatar_url" class="w-7 h-7 p-1 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                        {{ r.user.login }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
    name: 'IssueTable',
        
    computed: {
        issues() {
            return this.$store.state.issues
        }
    },

    methods: {
        openPage(url) {
            window.open(url, '_blank')
        },
    },

    mounted () {
        this.$store.dispatch("getIssues")
    }     
}
</script>