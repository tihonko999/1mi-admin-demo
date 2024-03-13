import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import Topline from "./components/Topline";
import useStore from "./helpers/useStore";

export default defineComponent({
  setup() {
    const { state } = useStore();

    return () => (
      <div>
        {state.loggedIn && <Topline />}
        <RouterView />
      </div>
    );
  },
});
