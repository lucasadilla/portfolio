/** Skip tilt / hover-only effects on phones and coarse-pointer touch UIs. */
export function shouldInitImageTilt() {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export function isFinePointer() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine)').matches;
}
