import { createRef, useEffect, useRef, useState, FC } from 'react';
import clsx from 'clsx';

import { videos } from './data/videos';
import cls from './ComplexComponent.module.scss';

const ComplexComponent: FC = () => {
  // Refs
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const activeCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoRefs = videos.map((_) => createRef<HTMLVideoElement>());

  // State
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  // Stream active video source to canvas elements
  useEffect(() => {
    const src = videoRefs[activeVideoIndex].current!;
    const canvases = [
      { el: bgCanvasRef.current, ctx: bgCanvasRef.current?.getContext(`2d`) },
      {
        el: activeCanvasRef.current,
        ctx: activeCanvasRef.current?.getContext(`2d`),
      },
    ];

    let frameReq: any;

    function drawVideoFrame() {
      canvases.forEach((canvas) => {
        const el = canvas.el!;
        const ctx = canvas.ctx!;
        const vRatio = (el.height / src.videoHeight) * src.videoWidth;
        ctx.drawImage(src, 0, 0, vRatio, el.height);

        const hRatio = (el.width / src.videoWidth) * src.videoHeight;
        ctx.drawImage(src, 0, 0, el.width, hRatio);
      });

      frameReq = window.requestAnimationFrame(drawVideoFrame);
    }

    frameReq = window.requestAnimationFrame(drawVideoFrame);

    return () => cancelAnimationFrame(frameReq);
  }, [activeVideoIndex, videoRefs]);

  return (
    <div className={cls.container}>
      <div className={cls.showcase}>
        <div className={cls.videos}>
          {videos.map((video, index) => (
            <div
              className={clsx(
                cls.videoContainer,
                index === activeVideoIndex && cls.videoContainerActive
              )}
              onClick={() => setActiveVideoIndex(index)}
            >
              <video
                src={video.url}
                ref={videoRefs[index]}
                className={cls.htmlVideoEl}
                data-type="video/mp4"
                loop
                muted
                autoPlay
              />
            </div>
          ))}
        </div>
        <div className={cls.activeContainer}>
          <canvas
            className={cls.activeCanvas}
            ref={activeCanvasRef}
            width="596"
            height="336"
          />
        </div>
      </div>

      <canvas
        className={cls.bgCanvas}
        ref={bgCanvasRef}
        width="596"
        height="336"
      />
    </div>
  );
};

export default ComplexComponent;
