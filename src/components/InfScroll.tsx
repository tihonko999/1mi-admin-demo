import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  PropType,
} from "vue";

export default defineComponent({
  name: "InfScroll",
  props: {
    parent: { type: Boolean, default: false },
    busy: { type: Boolean, default: false },
    onLoad: { type: Function as PropType<() => void>, required: true },
  },
  setup(props) {
    const el = ref<HTMLElement>();
    let observer: IntersectionObserver;

    onMounted(() => {
      if (!el.value) return;
      const callback = (e: IntersectionObserverEntry[]) => {
        if (e[0].isIntersecting && !props.busy && props.onLoad) props.onLoad();
      };
      observer = new IntersectionObserver(callback, {
        root: props.parent ? el.value?.parentElement : null,
        rootMargin: "100px",
      });
      observer.observe(el.value);
    });

    onBeforeUnmount(() => observer.disconnect());

    return () => <div ref={el}></div>;
  },
});
