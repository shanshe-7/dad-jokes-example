import { useRoute } from "vue-router";
import { computed } from "vue";

function usePage() {
  const route = useRoute();
  const page = computed(() => Number(route.query?.page) || 1);
  return { page };
}

export { usePage };
