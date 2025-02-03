import { atom, map, computed } from "nanostores";
import { supabase } from "@/lib/supabaseClient";

import type { WordStats } from "@/types/types";

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

const $success = atom<number>(0);
const $total = atom<number>(0);
export const $successRate = computed([$success, $total], () => {
  if ($total.get() === 0) {
    return 0;
  } else {
    const rate = $success.get() / $total.get();
    return Math.round((rate * 100 + Number.EPSILON) * 1) / 1;
  }
});

export async function getTotal() {
  const { data } = await supabase.from("total").select();
  if (data) {
    $total.set(data[0].count);
  }
}

export async function getSuccess() {
  const { data } = await supabase.from("success").select();
  if (data) {
    $success.set(data[0].count);
  }
}
