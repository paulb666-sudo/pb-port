// A smooth union of ellipsoids creates one continuous, genuinely volumetric cloud.
// Marching tetrahedra produces a closed surface without flat front/back caps.
export function createCloudGeometry(THREE) {
  const lobes=[
    [0,-4,0,87,29,40],[-73,-2,0,43,31,35],[73,-3,0,43,30,36],
    [-45,23,-2,42,39,39],[8,35,-8,46,40,44],[53,21,4,41,35,39],
    [3,9,-33,59,32,33],[-15,-3,26,55,27,31]
  ];
  function field(x,y,z) {
    let value=1e6;
    for(const [cx,cy,cz,rx,ry,rz] of lobes) {
      const distance=(Math.hypot((x-cx)/rx,(y-cy)/ry,(z-cz)/rz)-1)*Math.min(rx,ry,rz);
      const h=Math.max(8-Math.abs(value-distance),0)/8;
      value=Math.min(value,distance)-h*h*2;
    }
    return value;
  }
  const step=5,min=[-130,-45,-80],size=[52,27,32];
  const points=[],values=[];
  const index=(x,y,z)=>(z*(size[1]+1)+y)*(size[0]+1)+x;
  for(let z=0;z<=size[2];z++)for(let y=0;y<=size[1];y++)for(let x=0;x<=size[0];x++) {
    const point=[min[0]+x*step,min[1]+y*step,min[2]+z*step];
    points.push(point);values.push(field(...point));
  }
  const positions=[],normals=[];
  const normalAt=([x,y,z])=>new THREE.Vector3(
    field(x+.15,y,z)-field(x-.15,y,z),
    field(x,y+.15,z)-field(x,y-.15,z),
    field(x,y,z+.15)-field(x,y,z-.15)
  ).normalize();
  function edge(a,b) {
    const t=values[a]/(values[a]-values[b]);
    return points[a].map((v,i)=>v+(points[b][i]-v)*t);
  }
  function triangle(a,b,c) {
    const na=normalAt(a),nb=normalAt(b),nc=normalAt(c);
    const face=new THREE.Vector3().subVectors(new THREE.Vector3(...b),new THREE.Vector3(...a))
      .cross(new THREE.Vector3().subVectors(new THREE.Vector3(...c),new THREE.Vector3(...a)));
    if(face.lengthSq()<1e-22)return;
    if(face.dot(na)<0){[b,c]=[c,b];positions.push(...a,...b,...c);normals.push(...na.toArray(),...nc.toArray(),...nb.toArray());}
    else {positions.push(...a,...b,...c);normals.push(...na.toArray(),...nb.toArray(),...nc.toArray());}
  }
  // Consistent tetrahedra across shared cube faces prevent seams.
  const tetrahedra=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
  for(let z=0;z<size[2];z++)for(let y=0;y<size[1];y++)for(let x=0;x<size[0];x++) {
    const cube=[index(x,y,z),index(x+1,y,z),index(x+1,y+1,z),index(x,y+1,z),
      index(x,y,z+1),index(x+1,y,z+1),index(x+1,y+1,z+1),index(x,y+1,z+1)];
    if(cube.every(i=>values[i]>=0)||cube.every(i=>values[i]<0))continue;
    for(const tetra of tetrahedra) {
      const ids=tetra.map(i=>cube[i]),inside=ids.filter(i=>values[i]<0),outside=ids.filter(i=>values[i]>=0);
      if(!inside.length||!outside.length)continue;
      if(inside.length===1)triangle(...outside.map(i=>edge(inside[0],i)));
      else if(inside.length===3)triangle(...inside.map(i=>edge(outside[0],i)));
      else {
        const a=edge(inside[0],outside[0]),b=edge(inside[0],outside[1]);
        const c=edge(inside[1],outside[0]),d=edge(inside[1],outside[1]);
        triangle(a,b,c);triangle(b,d,c);
      }
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));
  geometry.computeBoundingSphere();geometry.computeBoundingBox();
  return geometry;
}
