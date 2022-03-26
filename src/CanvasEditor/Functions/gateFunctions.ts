import { Position } from "inputs-and-outputs-renderer";

export const getInputPosition = (sourcePosition: Position, num?: number) => {
    switch (sourcePosition) {
        case (Position.LeftTop):
            if (num) {
                return [Position.LeftBottom, Position.Left];
            }
            else {
                return Position.LeftBottom;
            }
        case (Position.RightTop):
            if (num) {
                return [Position.RightBottom, Position.Right];
            }
            else {
                return Position.RightBottom;
            }
        case (Position.BottomLeft):
            if (num) {
                return [Position.BottomRight, Position.Bottom]; 
            }
            else {
                return Position.BottomRight;
            }
        case (Position.TopLeft):
            if (num) {
                return [Position.TopRight, Position.Top];
            }
            else {
                return Position.Top;
            }
        default:
            return Position.Left;
    }
}

export const getOutputPosition = (sourcePosition: Position, numOfOut?: number): Position | Position[] => {
    if (numOfOut) {
        if (sourcePosition === Position.LeftTop || sourcePosition === Position.Left || sourcePosition === Position.LeftBottom) {
            return [Position.RightTop, Position.RightBottom];
        } else if (sourcePosition === Position.RightTop || sourcePosition === Position.Right || sourcePosition === Position.RightBottom) {
            return [Position.LeftTop, Position.LeftBottom];
        } else if (sourcePosition === Position.TopLeft || sourcePosition === Position.Top || sourcePosition === Position.TopRight) {
            return [Position.BottomLeft, Position.BottomRight];
        } else {
            return [Position.TopLeft, Position.TopRight];
        }
    }
    else {
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
}