import { useRef, useCallback, UIEvent } from "react";

interface IUseScrollProps {
  onScrollToBottom?: () => void;
  offset?: number;
}

interface IUseScrollReturn {
  ref: React.RefObject<HTMLDivElement>;
  handleScroll: (e: UIEvent<HTMLDivElement>) => void;
}

export const useScroll = ({
  onScrollToBottom,
  offset = 1,
}: IUseScrollProps = {}): IUseScrollReturn => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (ref.current && onScrollToBottom) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const isBottom = scrollHeight - scrollTop <= clientHeight + offset;

        if (isBottom) {
          onScrollToBottom();
        }
      }
    },
    [onScrollToBottom, offset]
  );

  return { ref, handleScroll };
};
