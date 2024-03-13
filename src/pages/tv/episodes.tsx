import { defineComponent, ref } from "vue";
import useInfScroll from "../../helpers/useInfScroll";
import InfScroll from "../../components/InfScroll";
import Loading from "../../components/Loading";
import EpisodeItem from "@/components/tv/EpisodeItem";
import { cant } from "@/helpers/permissions";
import { TvEpisodeType } from "@/helpers/types";

type IsActiveType = boolean | undefined;

export default defineComponent({
  name: "EpisodesPage",
  beforeRouteEnter() {
    if (cant("manage_tv_episodes")) return "/";
  },
  setup() {
    const apiParams = ref({
      is_active: undefined as IsActiveType,
      data_start: "",
      date_end: "",
      show_id: [] as number[],
    });
    const { items, pending, busy, fetch } = useInfScroll<TvEpisodeType>(
      "tv/episodes",
      apiParams
    );
    const modalVisible = ref(false);

    return () => (
      <div>
        <div>
          <select
            onChange={(e) => {
              let is_active: IsActiveType = undefined;
              const value = (e.target as HTMLSelectElement).value;
              if (value === "1") is_active = true;
              if (value === "0") is_active = false;
              apiParams.value.is_active = is_active;
              fetch(true);
            }}
          >
            <option value="any">Любая активность</option>
            <option value="1">Эпизод активен</option>
            <option value="0">Эпизод неактивен</option>
          </select>
          <button onClick={() => (modalVisible.value = true)}>
            add_circle
          </button>
        </div>
        <div>
          <table>
            <tr>
              <th>Эпизод</th>
              <th>Слаг</th>
              <th>Шоу</th>
              <th>Дата публикации</th>
              <th>Действия</th>
            </tr>
            {items.value.map((el) => (
              <EpisodeItem
                item={el}
                key={el.id}
                onRemove={() => items.value.splice(items.value.indexOf(el), 1)}
              />
            ))}
          </table>
        </div>

        {pending.value && <Loading />}
        <InfScroll onLoad={() => fetch()} busy={busy.value} />
      </div>
    );
  },
});
