import {
  createContext,
  useState,
  useEffect,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { usePlayback } from "./PlaybackProvider";

export type ZoomContextType = {
  startTime: number;
  endTime: number;
  zoomedDuration: number;
  isZoomed: boolean;
  setStartTime: Dispatch<SetStateAction<number>>;
  setEndTime: Dispatch<SetStateAction<number>>;
  setCenterTime: (centerTime: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

export const ZoomContext = createContext<ZoomContextType>({
  startTime: 0,
  endTime: 1,
  zoomedDuration: 1,
  isZoomed: false,
  setStartTime: () => {},
  setEndTime: () => {},
  setCenterTime: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
});

export function useZoom() {
  return useContext(ZoomContext);
}

export type ZoomProviderProps = {
  children: JSX.Element | JSX.Element[];
  startTimeInitial?: number;
  endTimeInitial?: number;
};

function ZoomProvider(props: ZoomProviderProps) {
  const { children, startTimeInitial, endTimeInitial } = props;
  const { duration, currentTime, mode, pause, setCurrentTime } = usePlayback();
  const [startTime, setStartTime] = useState(startTimeInitial ?? 0);
  const [endTime, setEndTime] = useState(endTimeInitial ?? duration ?? 1);

  useEffect(() => {
    if (duration !== null) {
      setStartTime(startTimeInitial ?? 0);
      setEndTime(endTimeInitial ?? duration);
      setCurrentTime(startTimeInitial ?? 0);
    }
  }, [duration, startTimeInitial, endTimeInitial]);

  const zoomedDuration = endTime - startTime;

  const setCenterTime = (centerTime: number) => {
    setStartTime(centerTime - zoomedDuration / 2);
    setEndTime(centerTime + zoomedDuration / 2);
  };

  useEffect(() => {
    if (mode === "stop") {
      if (currentTime >= endTime && currentTime <= endTime + 0.1) {
        pause();
        setCurrentTime(startTime);
      } else if (currentTime > endTime + 0.1) {
        const newStartTime = endTime;
        const newEndTime = endTime + zoomedDuration;
        setStartTime(newStartTime);
        setEndTime(newEndTime);
      } else if (currentTime < startTime - 0.1) {
        const newStartTime = startTime - zoomedDuration;
        const newEndTime = startTime;
        setStartTime(newStartTime);
        setEndTime(newEndTime);
      }
    } else if (mode === "loop") {
      if (currentTime >= endTime && currentTime <= endTime + 0.1) {
        setCurrentTime(startTime);
      } else if (currentTime > endTime + 0.1) {
        const newStartTime = endTime;
        const newEndTime = endTime + zoomedDuration;
        setStartTime(newStartTime);
        setEndTime(newEndTime);
      } else if (currentTime < startTime - 0.1) {
        const newStartTime = startTime - zoomedDuration;
        const newEndTime = startTime;
        setStartTime(newStartTime);
        setEndTime(newEndTime);
      }
    } else if (mode === "page") {
      if (currentTime >= endTime && currentTime <= endTime + 0.1) {
        nextPage();
      } else if (currentTime > endTime + 0.1) {
        const newStartTime = endTime;
        const newEndTime = endTime + zoomedDuration;
        setStartTime(newStartTime);
        setEndTime(newEndTime);
      } else if (currentTime < startTime - 0.1) {
        const newStartTime = startTime - zoomedDuration;
        const newEndTime = startTime;
        setStartTime(newStartTime);
        setEndTime(newEndTime);
      }
    } else if (mode === "continue") {
      // do nothings
    }
  }, [currentTime, mode]);

  const zoomIn = () => {
    if (duration === null) return;
    const newStartTime = Math.max(0, startTime + 0.2 * zoomedDuration);
    const newEndTime = Math.min(duration, endTime - 0.2 * zoomedDuration);
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setCurrentTime(newStartTime);
  };

  const zoomOut = () => {
    if (duration === null) return;
    const newStartTime = Math.max(0, startTime - (1 / 3) * zoomedDuration);
    const newEndTime = Math.min(duration, endTime + (1 / 3) * zoomedDuration);
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setCurrentTime(newStartTime);
  };

  const nextPage = () => {
    if (duration === null) return;
    const newEndTime = Math.min(duration, endTime + zoomedDuration);
    const newStartTime = Math.max(0, newEndTime - zoomedDuration);
    setStartTime(newStartTime);
    setEndTime(newEndTime);
  };

  const previousPage = () => {
    if (duration === null) return;
    const newStartTime = Math.max(0, startTime - zoomedDuration);
    const newEndTime = Math.min(duration, newStartTime + zoomedDuration);
    setStartTime(newStartTime);
    setEndTime(newEndTime);
  };

  const isZoomed = duration !== null && (startTime > 0 || endTime < duration);

  return (
    <ZoomContext.Provider
      value={{
        startTime,
        endTime,
        zoomedDuration,
        isZoomed,
        setStartTime,
        setEndTime,
        setCenterTime,
        zoomIn,
        zoomOut,
      }}
    >
      {children}
    </ZoomContext.Provider>
  );
}

export default ZoomProvider;
