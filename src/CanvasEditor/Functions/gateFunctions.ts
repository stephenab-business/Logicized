import { Position } from "inputs-and-outputs-renderer";

export const getInputPosition = (sourcePosition: Position) => {
    if (sourcePosition === Position.LeftTop || sourcePosition === Position.LeftBottom) {
        if (sourcePosition === Position.LeftTop) {
            return Position.LeftBottom;
        } else {
            return Position.LeftTop;
        }
    } else if (sourcePosition === Position.RightTop || sourcePosition === Position.RightBottom) {
        if (sourcePosition === Position.RightTop) {
            return Position.RightBottom;
        } else {
            return Position.RightTop;
        }
    } else if (sourcePosition === Position.BottomLeft || sourcePosition === Position.BottomRight) {
        if (sourcePosition === Position.BottomLeft) {
            return Position.BottomRight;
        } else {
            return Position.BottomLeft;
        }
    } else if (sourcePosition === Position.TopLeft || sourcePosition === Position.TopRight) {
        if (sourcePosition === Position.TopLeft) {
            return Position.TopRight;
        } else {
            return Position.TopLeft;
        }
    } else {
        return Position.Left;
    }
}

export const getOutputPosition = (sourcePosition: Position) => {
    if (sourcePosition === Position.LeftTop || sourcePosition === Position.Left || sourcePosition === Position.LeftBottom) {
        return Position.Right;
    } else if (sourcePosition === Position.RightTop || sourcePosition === Position.Right || sourcePosition === Position.RightBottom) {
        return Position.Left;
    } else if (sourcePosition === Position.TopLeft || sourcePosition === Position.Top || sourcePosition === Position.TopRight) {
        return Position.Bottom;
    } else {
        return Position.Top;
    }
}