import { atom } from "nanostores";
import { supabase } from "@/lib/supabaseClient";

export async function submitEntry(
  first: string,
  second: string,
  third: string,
  sentence: string,
) {
  $submitError.set("");
  $isSubmitSuccessful.set(false);
  try {
    const { error } = await supabase.from("entries").insert({
      first_word: first,
      second_word: second,
      third_word: third,
      sentence: sentence,
    });
    if (error !== null) {
      throw new Error(error.message);
    } else {
      $isSubmitSuccessful.set(true);
    }
  } catch (e) {
    $submitError.set((e as Error).message);
  }
}

export const $submitError = atom<string>("");
export const $isSubmitSuccessful = atom<boolean>(false);
