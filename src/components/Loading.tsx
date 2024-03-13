import { defineComponent } from "vue";
import styles from "../styles/components/loading/Loading.module.scss";

export default defineComponent({
  name: "Loading",
  setup() {
    return () => <div class={styles.loading}></div>;
  },
});
