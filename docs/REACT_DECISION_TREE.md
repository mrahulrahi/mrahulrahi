Need to store user input?

↓

YES

↓

useState

--------------------------------

Need data from server?

↓

YES

↓

TanStack Query

↓

No TanStack?

↓

useEffect + fetch()

--------------------------------

Need global data?

↓

Context

↓

Large application?

↓

Zustand

--------------------------------

Need to access DOM?

↓

useRef

--------------------------------

Expensive calculation?

↓

useMemo

--------------------------------

Passing callback to memoized child?

↓

useCallback