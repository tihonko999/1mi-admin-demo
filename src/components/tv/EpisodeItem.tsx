import { defineComponent, PropType } from "vue";
import api from "../../helpers/api";
import { error } from "../../helpers/notifications";
import { TvEpisodeType } from "@/helpers/types";
import date from "@/helpers/date";

export default defineComponent({
  name: "EpisodeItem",
  props: {
    item: { type: Object as PropType<TvEpisodeType>, required: true },
    onRemove: { type: Function, default: null },
  },
  setup(props) {
    let busy = false;
    async function removeItem() {
      if (busy || !confirm("Подтвердите удаление эпизода")) return;
      busy = true;
      try {
        await api.delete(`/tv/episodes/${props.item.id}`);
        if (props.onRemove) props.onRemove();
      } catch (e) {
        error(e);
      }
      busy = false;
    }

    return () => (
      <tr>
        <td>{props.item.title}</td>
        <td>{props.item.slug}</td>
        <td>{props.item.show_title}</td>
        <td>{date(props.item.published_at)}</td>
        <td>
          <div>
            <a
              href={props.item.path}
              class="m-icon"
              title="Открыть на сайте"
              target="_blank"
            >
              open_in_new
            </a>
            <button onClick={removeItem} class="m-icon">
              delete
            </button>
          </div>
        </td>
      </tr>
    );
  },
});
