<script setup>
import { computed } from "vue";
import { usePage } from "../composables/usePage";
const props = defineProps(["total"]);
import { useRouter } from "vue-router";

const router = useRouter();

const { page } = usePage();

const pagination = computed(() => {
  if (!props.total) return;
  const num = Math.ceil(props.total / 5);
  let temp = [];
  if (typeof num === "number") {
    while (temp?.length < num) {
      temp.push(temp?.length + 1);
    }
  }
  return temp;
});

function onPageClick(page) {
  router.push({
    path: router.currentRoute.value.path,
    query: { page },
  });
}

function prevPage() {
  router.push({
    path: router.currentRoute.value.path,
    query: { page: Math.max(page.value - 1, 1) },
  });
}
function nextPage() {
  router.push({
    path: router.currentRoute.value.path,
    query: { page: page.value + 1 },
  });
}
</script>

<template>
  <div class="pagination">
    <button :disabled="page === 1" v-on:click="prevPage">previous</button>
    <div v-for="(el, index) in pagination" :key="index">
      <button
        :class="{ active: page === el }"
        key="page"
        :value="el"
        v-on:click="onPageClick(el)"
      >
        {{ el }}
      </button>
    </div>
    <button :disabled="pagination.length === page" v-on:click="nextPage">
      next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.active {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
