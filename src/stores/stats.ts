import { atom, map } from "nanostores";
import { supabase } from "@/lib/supabaseClient";

import type { WordStats } from "@/types/types";

export const $total = map<{
  status: "empty" | "fetching" | "ready";
  count: 0;
}>({
  status: "empty",
  count: 0,
});

export const $first = map<WordStats>({
  et: 0,
  mais: 0,
});

export const $second = map<WordStats>({
  amor: 0,
  amour: 0,
  mort: 0,
});

export const $third = map<WordStats>({
  mathia: 0,
  mathias: 0,
  marcia: 0,
});

export async function fetchStats(word: number) {
  if ($total.get().status === "empty") {
    $total.setKey("status", "fetching");
    const { data } = await supabase.from("total").select();
    console.log(data);
    if (data) {
      $total.set({
        status: "ready",
        count: data[0].count,
      });
    } else {
      $total.setKey("status", "empty");
    }
  }
  if (word === 1) {
    const { data } = await supabase.from("first").select();
    if (data) {
      data.forEach((item) => {
        const key = item.first_word;
        const count = item.count;
        $first.setKey(key, count);
      });
    }
  } else if (word === 2) {
    const { data } = await supabase.from("second").select();
    if (data) {
      data.forEach((item) => {
        const key = item.second_word;
        const count = item.count;
        $second.setKey(key, count);
      });
    }
  } else if (word === 3) {
    const { data } = await supabase.from("third").select();
    if (data) {
      data.forEach((item) => {
        const key = item.third_word;
        const count = item.count;
        $third.setKey(key, count);
      });
    }
  }
}
