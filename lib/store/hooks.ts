import { useEffect, useRef } from "react";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { store, type RootState, type AppDispatch } from "./redux";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./local-storage";
import { initialResumeState, setResume } from "./configs";
import {
  initialSettings,
  setSettings,
  type Settings,
} from "./settings";
import { deepMerge } from "@/lib/utils";
import type { Resume } from "./configs";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook to save store to local storage on store change
 */
export const useSaveStateToLocalStorageOnChange = () => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      saveStateToLocalStorage(store.getState());
    });
    return unsubscribe;
  }, []);
};

export const useSetInitialStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const state = loadStateFromLocalStorage();
    if (!state) return;
    if (state.resume) {
      // We merge the initial state with the stored state to ensure
      // backward compatibility, since new fields might be added to
      // the initial state over time.
      const mergedResumeState = deepMerge(
        initialResumeState,
        state.resume
      ) as Resume;
      dispatch(setResume(mergedResumeState));
    }
    if (state.settings) {
      const mergedSettingsState = deepMerge(
        initialSettings,
        state.settings
      ) as Settings;
      dispatch(setSettings(mergedSettingsState));
    }
  }, []);
};

/**
 * Hook to autosize textarea height.
 *
 * The trick to resize is to first set its height to 0 and then set it back to scroll height.
 * Reference: https://stackoverflow.com/a/25621277/7699841
 *
 * @example // Tailwind CSS
 * const textareaRef = useAutosizeTextareaHeight({ value });
 * <textarea ref={textareaRef} className="resize-none overflow-hidden"/>
 */
export const useAutosizeTextareaHeight = ({ value }: { value: string }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Resize height when value changes
  useEffect(() => {
    resizeHeight();
  }, [value]);

  // Resize height when viewport resizes
  useEffect(() => {
    window.addEventListener("resize", resizeHeight);
    return () => window.removeEventListener("resize", resizeHeight);
  }, []);

  return textareaRef;
};
