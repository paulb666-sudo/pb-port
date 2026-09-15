// Loft circular cross-sections through the original curved silhouette.
// The front view retains its taper and root flare; every side has a continuous round surface.
export function createRoundedTrunkGeometry(THREE,profile,{heightSegments=144,radialSegments=48}={}) {
  const bottom=Math.min(...profile.map(p=>p.y)),top=Math.max(...profile.map(p=>p.y));
  const positions=[],indices=[];
  for(let row=0;row<=heightSegments;row++) {
    const y=bottom+(top-bottom)*row/heightSegments;
    const scan=Math.max(bottom+.0001,Math.min(top-.0001,y));
    const intersections=[];
    for(let i=0;i<profile.length;i++) {
      const a=profile[i],b=profile[(i+1)%profile.length];
      if((a.y<=scan && b.y>scan)||(b.y<=scan && a.y>scan)) {
        intersections.push(a.x+(b.x-a.x)*(scan-a.y)/(b.y-a.y));
      }
    }
    if(intersections.length<2) throw new Error('The trunk profile must enclose every cross-section.');
    const left=Math.min(...intersections),right=Math.max(...intersections);
    const center=(left+right)/2,radius=Math.max(.01,(right-left)/2);
    for(let column=0;column<radialSegments;column++) {
      const angle=column/radialSegments*Math.PI*2;
      positions.push(center+Math.cos(angle)*radius,y,Math.sin(angle)*radius);
      if(row<heightSegments) {
        const a=row*radialSegments+column,c=row*radialSegments+(column+1)%radialSegments;
        indices.push(a,a+radialSegments,c,a+radialSegments,c+radialSegments,c);
      }
    }
  }
  // Separate cap vertices preserve the smooth bark normals at the ends.
  for(const row of [0,heightSegments]) {
    const first=row*radialSegments*3,cap=positions.length/3;
    const centerX=(positions[first]+positions[first+radialSegments/2*3])/2;
    positions.push(centerX,positions[first+1],0);
    for(let column=0;column<radialSegments;column++) {
      positions.push(...positions.slice(first+column*3,first+column*3+3));
    }
    for(let column=0;column<radialSegments;column++) {
      const a=cap+1+column,b=cap+1+(column+1)%radialSegments;
      indices.push(...(row===0?[cap,a,b]:[cap,b,a]));
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}
