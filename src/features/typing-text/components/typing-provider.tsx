import { useReducer, PropsWithChildren, useMemo } from "react";
import { useContextSelector, createContext } from "use-context-selector";
import { WordsWithIndices } from "../hooks/subhooks/useWordsWithIndices";
import { VISIBLE_WORDS_COUNT } from "../typing-test.constants";

// Тип
export type TypingStateType = {
  typedWords: string[];
  targetWords: string[];
  wpm: number;
  accuracy: number;
  animationOpacity: number;
  displayedWords: string[];
  startWordsIndex: number;
  endWordsIndex: number;
  completedWordsLength: number;
  wordsWithIndices: WordsWithIndices;
  isTestStarted: boolean;
  initialGlobalIndex: number;
};

// Начальное значение
const initialState: TypingStateType = {
  typedWords: [],
  targetWords: [],
  wpm: 0,
  accuracy: 0,
  animationOpacity: 1,
  displayedWords: [],
  startWordsIndex: 0,
  endWordsIndex: 0,
  completedWordsLength: 0,
  wordsWithIndices: [],
  isTestStarted: false,
  initialGlobalIndex: 0,
};

// Экшены
type Action =
  | { type: "SET_WPM"; payload: number }
  | { type: "SET_ACCURACY"; payload: number }
  | { type: "SET_TYPED_WORDS"; payload: string[] }
  | { type: "SET_TARGET_WORDS"; payload: string[] }
  | { type: "SET_IS_STARTED"; payload: boolean }
  | { type: "SET_DISPLAYED_WORDS"; payload: string[] }
  | { type: "SET_ANIMATION_OPACITY"; payload: number }
  | { type: "SET_START_WORDS_INDEX"; payload: number }
  | { type: "SET_COMPLETED_WORDS_LENGTH"; payload: number }
  | { type: "SET_WORDS_WITH_INDICES"; payload: WordsWithIndices }
  | { type: "SET_INITIAL_GLOBAL_INDEX"; payload: number }
  | { type: "SET_STATE"; payload: Partial<TypingStateType> };

// Редьюсер
const reducer = (state: TypingStateType, action: Action): TypingStateType => {
  console.log(action);
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "SET_WPM":
      return { ...state, wpm: action.payload };
    case "SET_ACCURACY":
      return { ...state, accuracy: action.payload };
    case "SET_TYPED_WORDS":
      return { ...state, typedWords: action.payload };
    case "SET_TARGET_WORDS":
      return { ...state, targetWords: action.payload };
    case "SET_IS_STARTED":
      return { ...state, isTestStarted: action.payload };
    case "SET_DISPLAYED_WORDS":
      return { ...state, displayedWords: action.payload };
    case "SET_ANIMATION_OPACITY":
      return { ...state, animationOpacity: action.payload };
    case "SET_START_WORDS_INDEX":
      return {
        ...state,
        startWordsIndex: action.payload,
        endWordsIndex: Math.min(
          state.startWordsIndex + VISIBLE_WORDS_COUNT * 2,
          state.targetWords.length - 1
        ),
      };
    case "SET_COMPLETED_WORDS_LENGTH":
      return { ...state, completedWordsLength: action.payload };
    case "SET_WORDS_WITH_INDICES":
      return { ...state, wordsWithIndices: action.payload };
    case "SET_INITIAL_GLOBAL_INDEX":
      return { ...state, initialGlobalIndex: action.payload };
    default:
      return state;
  }
};

const TypingStateContext = createContext<TypingStateType>(initialState);
const TypingDispatchContext = createContext<React.Dispatch<Action>>(() => {});
// Провайдер
export const TypingProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const memoizedState = useMemo(() => state, [state]);

  return (
    <TypingDispatchContext.Provider value={dispatch}>
      <TypingStateContext.Provider value={memoizedState}>
        {children}
      </TypingStateContext.Provider>
    </TypingDispatchContext.Provider>
  );
};

// Хуки для использования
export function useTypingState<T>(selector: (state: TypingStateType) => T): T {
  return useContextSelector(TypingStateContext, selector);
}
export const useTypingDispatch = () =>
  useContextSelector(TypingDispatchContext, (dispatch) => dispatch);

// Экшены для диспатча
export const setWpm = (dispatch: React.Dispatch<Action>, wpm: number) => {
  dispatch({ type: "SET_WPM", payload: wpm });
};

export const setAccuracy = (
  dispatch: React.Dispatch<Action>,
  accuracy: number
) => {
  dispatch({ type: "SET_ACCURACY", payload: accuracy });
};

export const setTypedWords = (
  dispatch: React.Dispatch<Action>,
  typedWords: string[]
) => {
  dispatch({ type: "SET_TYPED_WORDS", payload: typedWords });
};

export const setTargetWords = (
  dispatch: React.Dispatch<Action>,
  targetWords: string[]
) => {
  dispatch({ type: "SET_TARGET_WORDS", payload: targetWords });
};

export const setIsStarted = (
  dispatch: React.Dispatch<Action>,
  isTestStarted: boolean
) => {
  dispatch({ type: "SET_IS_STARTED", payload: isTestStarted });
};

export const setDisplayedWords = (
  dispatch: React.Dispatch<Action>,
  displayedWords: string[]
) => {
  dispatch({ type: "SET_DISPLAYED_WORDS", payload: displayedWords });
};

export const setAnimationOpacity = (
  dispatch: React.Dispatch<Action>,
  animationOpacity: number
) => {
  dispatch({ type: "SET_ANIMATION_OPACITY", payload: animationOpacity });
};

export const setStartWordsIndex = (
  dispatch: React.Dispatch<Action>,
  startWordsIndex: number
) => {
  dispatch({ type: "SET_START_WORDS_INDEX", payload: startWordsIndex });
};

export const setCompletedWordsLength = (
  dispatch: React.Dispatch<Action>,
  completedWordsLength: number
) => {
  dispatch({
    type: "SET_COMPLETED_WORDS_LENGTH",
    payload: completedWordsLength,
  });
};

export const setWordsWithIndices = (
  dispatch: React.Dispatch<Action>,
  wordsWithIndices: WordsWithIndices
) => {
  dispatch({ type: "SET_WORDS_WITH_INDICES", payload: wordsWithIndices });
};

export const setInitialGlobalIndex = (
  dispatch: React.Dispatch<Action>,
  initialGlobalIndex: number
) => {
  dispatch({ type: "SET_INITIAL_GLOBAL_INDEX", payload: initialGlobalIndex });
};

export const setState = (
  dispatch: React.Dispatch<Action>,
  partialState: Partial<TypingStateType>
) => {
  dispatch({ type: "SET_STATE", payload: partialState });
};
