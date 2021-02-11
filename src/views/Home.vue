<template>
  <div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
    <div class="flex-grow overflow-hidden h-full flex flex-col">
      <div class="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 px-10">
        <div class="flex h-full text-gray-600 dark:text-gray-400">
          <a v-on:click="issue = true"
            :class="{ 'cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center' : issue, 
                      'cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8' : !issue }">Issues</a>
          <a v-on:click="pullrequest = true"
            :class="{ 'cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center' : pullrequest, 
                      'cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8' : !pullrequest }">Pull Requests</a>
        </div>
        <div class="ml-auto flex items-center space-x-7">
          <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Bounty</button>
          <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Deposit</button>
        </div>
      </div>
      <div class="flex-grow flex overflow-x-hidden">
        <SidebarProjects :projects="projects" :categories="categories" />
        <div class="flex-grow bg-white dark:bg-gray-900 overflow-y-auto scroll">
          <div v-if="pullrequest">
            <PullrequestTable />
          </div>
          <div v-else>
            <IssueTable />
          </div>
          <div class="flex w-full mt-5 space-x-2 justify-end">
            <button
              class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
              <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">1</button>
            <button
              class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-white leading-none">2</button>
            <button
              class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">3</button>
            <button
              class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">4</button>
            <button
              class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
              <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>

#scroll::-webkit-scrollbar {
  width: 4px;
  cursor: pointer;
}

#scroll::-webkit-scrollbar-track {
  background-color: rgba(229, 231, 235, var(--bg-opacity));
  cursor: pointer;
}

#scroll::-webkit-scrollbar-thumb {
  cursor: pointer;
  background-color: #a0aec0;
}

</style>

<script>
  import PullrequestTable from '@/components/PullrequestTable'
  import IssueTable from '@/components/IssueTable'
  import SidebarProjects from '@/components/SidebarProjects'
  import projects_json from '@/projects'
  import categories from '@/categories'

  export default {
    name: 'Home',

    components: {
      PullrequestTable,
      IssueTable,
      SidebarProjects
    },

    data () {
      return {
        pullrequest: true,
        issue: false,
        projects: projects_json,
        categories: categories
      }
    },

    watch: {
      pullrequest(event) {
        if (event) {
          this.issue = false
        }
      },
      issue(event) {
        if (event) {
          this.pullrequest = false
        }
      }
    }
  }
</script>