
export type Point = { x: number; y: number };

// Solves for the 3x3 homography matrix that maps the unit square to the given 4 points
// Unit square: (0,0), (1,0), (1,1), (0,1)
// Returns array of 16 elements for CSS matrix3d
function solveHomography(pts: [Point, Point, Point, Point]): number[] {
  const x0 = pts[0].x, y0 = pts[0].y;
  const x1 = pts[1].x, y1 = pts[1].y;
  const x2 = pts[2].x, y2 = pts[2].y;
  const x3 = pts[3].x, y3 = pts[3].y;

  // Compute the homography matrix H that maps unit square to (x0,y0)...(x3,y3)
  
  let dx1 = x1 - x2;
  let dy1 = y1 - y2;
  let dx2 = x3 - x2;
  let dy2 = y3 - y2;
  let sx = x0 - x1 + x2 - x3;
  let sy = y0 - y1 + y2 - y3;
  
  let g = (sx * dy2 - dx2 * sy) / (dx1 * dy2 - dx2 * dy1);
  let h = (dx1 * sy - sx * dy1) / (dx1 * dy2 - dx2 * dy1);
  
  let a = x1 - x0 + g * x1;
  let b = x3 - x0 + h * x3;
  let c = x0;
  let d = y1 - y0 + g * y1;
  let e = y3 - y0 + h * y3;
  let f = y0;
  
  return [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1];
}

export function getCssMatrix3d(
  // Destination points in percentages (0-100)
  // Order: TopLeft, TopRight, BottomRight, BottomLeft
  pts: [Point, Point, Point, Point],
  // Container dimensions in pixels
  widthPx: number,
  heightPx: number
): string {
  if (widthPx === 0 || heightPx === 0) return 'scale(0)'; // Hide until dimensions are available

  // 1. Convert destination points from percentages to pixels
  const dstPx: [Point, Point, Point, Point] = [
    { x: pts[0].x * widthPx / 100, y: pts[0].y * heightPx / 100 },
    { x: pts[1].x * widthPx / 100, y: pts[1].y * heightPx / 100 },
    { x: pts[2].x * widthPx / 100, y: pts[2].y * heightPx / 100 },
    { x: pts[3].x * widthPx / 100, y: pts[3].y * heightPx / 100 }
  ];

  // 2. Get matrix H that maps unit square (0,0)-(1,1) to dstPx
  const H = solveHomography(dstPx);

  // 3. We are applying this to an element of size (widthPx, heightPx).
  // The element's internal coordinates are (0,0) to (widthPx, heightPx).
  // We need to pre-scale the input coordinates so that (widthPx, heightPx) becomes (1,1).
  // S = scale(1/widthPx, 1/heightPx)
  // M = H * S
  
  // H is [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1]
  // Corresponds to:
  // | a b 0 c |
  // | d e 0 f |
  // | 0 0 1 0 |
  // | g h 0 1 |
  // (Note: CSS matrix3d is column-major, so the array is [m11, m12, m13, m14, ...])
  // My solveHomography returns [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1]
  // which is:
  // m11=a, m12=d, m13=0, m14=g
  // m21=b, m22=e, m23=0, m24=h
  // m31=0, m32=0, m33=1, m34=0
  // m41=c, m42=f, m43=0, m44=1
  
  // So the matrix is:
  // | a b 0 c |
  // | d e 0 f |
  // | 0 0 1 0 |
  // | g h 0 1 |
  
  // We want to multiply by S:
  // | 1/w 0   0 0 |
  // | 0   1/h 0 0 |
  // | 0   0   1 0 |
  // | 0   0   0 1 |
  
  // Result M = H * S
  // | a/w b/h 0 c |
  // | d/w e/h 0 f |
  // | 0   0   1 0 |
  // | g/w h/h 0 1 |
  
  // So we just divide the first column by w and second column by h.
  
  const [a, d, _0a, g, b, e, _0b, h, _0c, _0d, _1, _0e, c, f, _0f, _1b] = H;
  
  const M = [
    a / widthPx,      d / widthPx,      0, g / widthPx,
    b / heightPx,     e / heightPx,     0, h / heightPx,
    0,                0,                1, 0,
    c,                f,                0, 1
  ];

  return `matrix3d(${M.join(',')})`;
}
