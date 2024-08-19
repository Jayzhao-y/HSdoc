<template>
  <div class="home">
    <div class="flex h-full w-full">
      <div class="from-primary bg-gray-800 to-secondary flex flex-col" style="min-width: 12%">
        <div class="flex items-center mb-8">
          <img
            src="https://placehold.co/40x40"
            alt="Company Logo"
            class="rounded-full mr-3 ml-3 shadow-lg"
          />
          <span class="text-primary-foreground text-2xl font-bold p-4">上海交建</span>
        </div>
        <!-- <h2 class="text-primary-foreground text-xl font-semibold mb-6">Navigation</h2> -->
        <ul class="flex flex-col gap-3 w-auto">
          <li
            class="flex items-center py-3 px-5 rounded-lg hover:bg-primary/30 cursor-pointer transition-all duration-300"
          >
            <img
              aria-hidden="true"
              alt="dashboard-icon"
              src="https://placehold.co/24x24?text=📊"
              class="mr-3"
            />
            <span class="text-primary-foreground" @click="getRouterList(1)">单位工程台账管理</span>
          </li>
          <li
            class="flex items-center py-3 px-5 rounded-lg hover:bg-primary/30 cursor-pointer transition-all duration-300"
          >
            <img
              aria-hidden="true"
              alt="dashboard-icon"
              src="https://placehold.co/24x24?text=📊"
              class="mr-3"
            />
            <span class="text-primary-foreground" @click="getRouterList(2)">分部工程台账管理</span>
          </li>
          <li
            class="flex items-center py-3 px-5 rounded-lg hover:bg-primary/30 cursor-pointer transition-all duration-300"
          >
            <img
              aria-hidden="true"
              alt="dashboard-icon"
              src="https://placehold.co/24x24?text=📊"
              class="mr-3"
            />
            <span class="text-primary-foreground" @click="getRouterList(3)">单元工程台账管理</span>
          </li>
          <li
            class="flex items-center py-3 px-5 rounded-lg hover:bg-primary/30 cursor-pointer transition-all duration-300"
          >
            <img
              aria-hidden="true"
              alt="dashboard-icon"
              src="https://placehold.co/24x24?text=📊"
              class="mr-3"
            />
            <span class="text-primary-foreground" @click="getRouterList(4)">单元管理</span>
          </li>
          <li
            class="flex items-center py-3 px-5 rounded-lg hover:bg-primary/30 cursor-pointer transition-all duration-300"
          >
            <img
              aria-hidden="true"
              alt="dashboard-icon"
              src="https://placehold.co/24x24?text=📊"
              class="mr-3"
            />
            <span class="text-primary-foreground" @click="getRouterList(5)">分布管理</span>
          </li>
        </ul>
      </div>

      <div class="flex-1 bg-background p-6 flex flex-col" style="width: 88%">
        <router-view class="bg-card p-6 rounded-lg shadow-lg flex-1" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {}
  },
  methods: {
    routerProtect(path) {
      if (path == this.$router.currentRoute.fullPath) {
        return false
      } else {
        return true
      }
    },
    getRouterList(num) {
      if (num == 1 && this.routerProtect('/home/Taizhang')) {
        this.$router.push({
          path: '/home/Taizhang'
        })
      } else if (num == 2 && this.routerProtect('/home/Taizhang2')) {
        this.$router.push({
          path: '/home/Taizhang2'
        })
      } else if (num == 3 && this.routerProtect('/home/Taizhang3')) {
        this.$router.push({
          path: '/home/Taizhang3'
        })
      } else if (num == 4 && this.routerProtect('/home/Danyuan')) {
        this.$router.push({
          path: '/home/Danyuan'
        })
      } else if (num == 5 && this.routerProtect('/home/Fenbu')) {
        this.$router.push({
          path: '/home/Fenbu'
        })
      }
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
</style>
