import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { moduleDisabled } from "@/helpers/permissions";
import { can } from "@/helpers/permissions";

export default defineComponent({
  name: "TvPage",
  beforeRouteEnter() {
    if (moduleDisabled("tv")) return "/";
  },
  setup() {
    return () => (
      <div>
        <div>
          {can("manage_tv_episodes") && (
            <RouterLink to="/tv/episodes">Эпизоды</RouterLink>
          )}
        </div>
        <RouterView />
      </div>
    );
  },
});
