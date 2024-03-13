import api from "@/helpers/api";
import useStore from "@/helpers/useStore";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { can, moduleEnabled } from "@/helpers/permissions";
import styles from "../../styles/components/Topline.module.scss";

export default defineComponent({
  name: "Topline",
  setup() {
    const store = useStore();

    async function logOut() {
      await api.delete("users/sign_out");
      store.commit({ type: "LOG_OUT" });
    }

    return () => (
      <div>
        <div class={styles.topline}>
          {moduleEnabled("tv") && can("manage_tv_episodes") && (
            <RouterLink class={styles.link} to="/tv">
              Телевидение
            </RouterLink>
          )}
          <button
            type="button"
            class={`m-icon ${styles.link}`}
            onClick={logOut}
          >
            exit_to_app
          </button>
        </div>
      </div>
    );
  },
});
