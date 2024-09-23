import { CSSProperties, FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import useWatermark from "./useWatermark";

export interface WatermarkProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
    zIndex?: string | number;
    width?: number;
    height?: number;
    rotate?: number;
    image?: string;
    content?: string | string[];
    fontStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: number | string;
        fontWeight?: number | string;
    };
    gap?: [number, number]; // 两个水印之间的空白距离
    offset?: [number, number]; // 水印相对于container的偏移量 左上角的空白距离
    getContainer?: () => HTMLElement;
}

const Watermark: FC<WatermarkProps> = (props) => {
    const {
        className,
        style,
        zIndex,
        width,
        height,
        rotate,
        image,
        content,
        fontStyle,
        gap,
        offset
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    const getContainer = useCallback(() => {
        return props.getContainer ? props.getContainer() : containerRef.current!;
    }, [props]);

    const { generateWatermark } = useWatermark({
        zIndex,
        width,
        height,
        rotate,
        image,
        content,
        fontStyle,
        gap,
        offset,
        getContainer,
    });

    useEffect(() => {
        generateWatermark({
            zIndex,
            width,
            height,
            rotate,
            image,
            content,
            fontStyle,
            gap,
            offset,
            getContainer,
        });
    }, [zIndex, width, height, rotate, image, content, getContainer, generateWatermark, fontStyle, gap, offset]);


    return props.children ? (
        <div
            className={className}
            style={style}
            ref={containerRef}
        >{props.children}</div>
    ) : null
}

export default Watermark;