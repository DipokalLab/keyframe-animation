let tension = .5;
let poly = document.querySelector("polyline");
let path = document.querySelector("path");
let points = [
    [0,0]
];

const addPoint = (e) => {
    console.log("A", e.offsetX, e.offsetY)
    points.push([e.offsetX, e.offsetY])
    document.querySelector("#graph").insertAdjacentHTML("beforeend", `<div class="position-absolute point" style="top: ${e.offsetY-4}; left: ${e.offsetX-4};"></div>`)
    path.setAttribute("d", drawPath(points, tension));
}


const drawPath = (points, tension) => {
    if (tension == null) tension = 1;
    let size = points.length * 2;
    let last = size - 4;    
    let path = "M" + [points[0][0], points[0][1]];
    let now = 0
  
    for (let i = 0; i < size - 2; i +=2) {
        let x0 = now ? points[now-1][0] : points[0][0];
        let y0 = now ? points[now-1][1] : points[0][1];
        let x1 = points[now][0];
        let y1 = points[now][1];
        let x2 = points[now+1][0];
        let y2 = points[now+1][1];
        let x3 = i !== last ? points[now+2][0] : x2;
        let y3 = i !== last ? points[now+2][1] : y2;
        let cp1x = x1 + (x2 - x0) / 6 * tension;
        let cp1y = y1 + (y2 - y0) / 6 * tension;
        let cp2x = x2 - (x3 - x1) / 6 * tension;
        let cp2y = y2 - (y3 - y1) / 6 * tension;
        now += 1
        path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
    } 
    return path;
}

poly.setAttribute("points", points);
path.setAttribute("d", drawPath(points, tension));

document.querySelector("#graph").addEventListener("mousedown", addPoint)