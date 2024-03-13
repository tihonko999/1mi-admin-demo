import { ref, computed, ComputedRef, Ref } from "vue";
import { error } from "@/helpers/notifications";
import api from "@/helpers/api";
import { MatterType } from "./types";

interface ReturnType<T = MatterType> {
  items: Ref<T[]>;
  pending: ComputedRef<boolean>;
  busy: Ref<boolean>;
  fetch: (reset?: boolean) => void;
}

type ApiParamsType = {
  [key: string]: unknown;
};

export default function useInfScroll<T = MatterType>(
  endpoint = "matters",
  apiParams: Ref<ApiParamsType> = ref({})
): ReturnType<T> {
  // https://github.com/vuejs/vue-next/issues/2136
  const items = ref<T[]>([]) as Ref<T[]>;
  const busy = ref(false);
  const allLoaded = ref(false);
  const page = ref(1);
  const pending = computed(() => busy.value && !allLoaded.value);

  async function getItems() {
    if (busy.value) return;
    busy.value = true;
    try {
      const params = {
        ...apiParams.value,
        page: page.value,
      };
      const { data } = await api.get<T[]>(endpoint, { params });
      data.forEach((el) => items.value.push(el));
      busy.value = false;
      page.value += 1;
      if (!data.length) {
        allLoaded.value = busy.value = true;
      }
    } catch (e) {
      error(e);
    }
  }

  async function fetch(reset = false) {
    if (reset) {
      items.value = [];
      page.value = 1;
      busy.value = false;
      allLoaded.value = false;
    }
    await getItems();
  }

  return { items, pending, busy, fetch };
}
