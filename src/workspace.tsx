"use client";
import {useEffect,useRef,useState} from 'react';

export default function Workspace({playing}:{playing:boolean}){
 const container=useRef<HTMLDivElement>(null),play=useRef(playing);
 const [error,setError]=useState(false),[ready,setReady]=useState(false);
 useEffect(()=>{play.current=playing},[playing]);
 useEffect(()=>{
  let dispose=()=>{},cancelled=false;
  async function create(){
   try{
    const THREE=await import('three');const {RoundedBoxGeometry}=await import('three/addons/geometries/RoundedBoxGeometry.js');
    if(cancelled||!container.current)return;
    const host=container.current,scene=new THREE.Scene();
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
    host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
    const camera=new THREE.OrthographicCamera(-5,5,4,-4,.1,100);camera.position.set(8,6.1,9);camera.lookAt(0,1.65,0);
    const room=new THREE.Group();scene.add(room);
    const mats:InstanceType<typeof THREE.Material>[]=[];const textures:InstanceType<typeof THREE.Texture>[]=[];
    function mat(color:string,roughness=.6,metalness=0){const m=new THREE.MeshStandardMaterial({color,roughness,metalness});mats.push(m);return m}
    const cream=mat('#e5d7c3'),edge=mat('#b4a18a'),dark=mat('#292c2a'),black=mat('#191b1a'),silver=mat('#8a8c83',.3,.6),clay=mat('#d8c6ad'),leaf=mat('#354b26'),leafLight=mat('#647444');
    function texture(kind:string){const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d')!;
      if(kind==='wood'){x.fillStyle='#9c6b3f';x.fillRect(0,0,512,512);for(let i=0;i<1000;i++){const y=Math.random()*512;x.strokeStyle=`rgba(${Math.random()>.4?'55,27,11':'238,200,148'},${Math.random()*.12})`;x.lineWidth=Math.random()*2;x.beginPath();x.moveTo(0,y);x.bezierCurveTo(130,y+Math.random()*6,380,y-3,512,y+Math.random()*4);x.stroke()}}
      else if(kind==='rug'){x.fillStyle='#d2c2a9';x.fillRect(0,0,512,512);for(let i=0;i<512;i+=3){x.strokeStyle=i%2?'#bdad94':'#e0d1b9';x.lineWidth=.8;x.beginPath();x.moveTo(i,0);x.lineTo(i,512);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(512,i);x.stroke()}}
      else if(kind==='screen'){x.fillStyle='#241d1b';x.fillRect(0,0,512,512);for(let i=0;i<12;i++){x.beginPath();x.moveTo(0,310+i*12);for(let j=0;j<=512;j+=4)x.lineTo(j,280+i*13+Math.sin(j/120+i*.15)*75);x.lineTo(512,512);x.lineTo(0,512);x.closePath();x.fillStyle=`hsl(${21+i},${60+i*2}%,${24+i*3}%)`;x.fill()}x.fillStyle='#ffefd5';x.font='18px sans-serif';x.fillText('MAKE SOMETHING MEANINGFUL.',28,52);x.font='bold 68px Georgia';x.fillText('hello.',28,135)}
      else{ x.fillStyle='#ece2d3';x.fillRect(0,0,512,512);x.fillStyle='#ba552a';x.beginPath();x.arc(245,220,175,0,Math.PI*2);x.fill();x.fillStyle='#dfcbb3';x.fillRect(250,0,280,512);x.fillStyle='#3e4034';x.beginPath();x.arc(160,475,160,Math.PI,Math.PI*2);x.fill()}
      const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.push(t);return t;
    }
    const wood=new THREE.MeshStandardMaterial({map:texture('wood'),roughness:.47});mats.push(wood);
    const rug=new THREE.MeshStandardMaterial({map:texture('rug'),roughness:1});mats.push(rug);
    function box(w:number,h:number,d:number,m:InstanceType<typeof THREE.Material>,x:number,y:number,z:number,r=.025){const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;room.add(o);return o}
    function cylinder(top:number,bottom:number,h:number,m:InstanceType<typeof THREE.Material>,x:number,y:number,z:number){const o=new THREE.Mesh(new THREE.CylinderGeometry(top,bottom,h,24),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;room.add(o);return o}
    function sphere(r:number,m:InstanceType<typeof THREE.Material>,x:number,y:number,z:number){const o=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),m);o.position.set(x,y,z);o.castShadow=true;room.add(o);return o}
    function rod(a:number[],b:number[],r:number,m:InstanceType<typeof THREE.Material>){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),dir=end.clone().sub(start);const o=cylinder(r,r,dir.length(),m,0,0,0);o.position.copy(start.add(end).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());return o}
    // Floating architectural base, softly textured rug and warm plaster backdrop.
    box(7.2,.22,4.9,edge,0,0,0,.06);box(7.12,.045,4.82,cream,0,.13,0,.02);
    box(7.1,3.7,.12,cream,0,2,-2.38,.015);box(.12,1.6,1.6,cream,-3.5,.96,-1.55,.015);
    box(4.1,.045,2.35,rug,.15,.18,.8,.09);
    // Desk and cabinet.
    box(4.8,.15,1.55,wood,.45,1.55,-.78,.045);
    for(const x of [-1.7,2.6])for(const z of [-1.4,-.16])box(.075,1.36,.075,dark,x,.8,z,.012);
    box(1.05,1.23,1.25,wood,2, .88,-.78,.04);
    for(let i=0;i<3;i++){box(.99,.36,.035,wood,2,.47+i*.4,-.135,.009);box(.28,.025,.025,dark,2,.53+i*.4,-.1,.008)}
    // Monitor with original animated-screen artwork.
    box(.65,.045,.42,dark,.3,1.655,-1.04);box(.10,.4,.08,dark,.3,1.87,-1.12);
    const monitor=box(1.85,1.13,.10,black,.3,2.38,-1.15,.055);
    const screenMat=new THREE.MeshBasicMaterial({map:texture('screen')});mats.push(screenMat);
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(1.74,.99),screenMat);screen.position.set(.3,2.4,-1.091);room.add(screen);
    sphere(.018,mat('#d98b4b'),.3,1.855,-1.087);
    // Keyboard with individual keys, mouse, notebook and cup.
    box(1.03,.045,.36,silver,.2,1.66,-.37,.035);
    const keyMat=mat('#d2d1c2');for(let r=0;r<4;r++)for(let c=0;c<12;c++)box(.061,.015,.047,keyMat,-.235+c*.077,1.689,-.485+r*.073,.006);
    box(.16,.07,.25,clay,1.02,1.685,-.37,.06);box(.55,.05,.37,mat('#4b5140'),-1.14,1.664,-.32,.012);box(.51,.014,.34,clay,-1.14,1.698,-.32,.007);
    cylinder(.115,.10,.23,mat('#efe3ce'),1.66,1.75,-.37);cylinder(.094,.094,.006,mat('#463321'),1.66,1.868,-.37);
    const handle=new THREE.Mesh(new THREE.TorusGeometry(.085,.025,10,20),clay);handle.position.set(1.79,1.77,-.37);room.add(handle);
    // Articulated black desk lamp.
    cylinder(.18,.21,.045,dark,-1.62,1.65,-1.11);rod([-1.62,1.68,-1.11],[-1.62,2.38,-1.2],.025,dark);rod([-1.62,2.38,-1.2],[-1.05,2.64,-1.03],.026,dark);
    sphere(.065,dark,-1.62,2.38,-1.2);const shade=cylinder(.10,.27,.25,dark,-1.04,2.57,-1.03);shade.rotation.z=-.35;
    const lampGlow=new THREE.PointLight('#ffd2a0',2.3,3,2);lampGlow.position.set(-1.03,2.4,-1);room.add(lampGlow);
    // Two shelves, books, rounded ceramic and a glowing globe.
    for(const y of [3.06,3.78]){box(4.4,.08,.48,wood,.78,y,-2.04,.02);for(const x of [-.7,2.2])box(.035,.23,.27,dark,x,y-.13,-2.16,.006)}
    const colors=['#d7c4a5','#74735a','#a6734c','#464c40','#e8dbbe'];
    function books(x:number,y:number,count:number){for(let i=0;i<count;i++){const h=.26+(i%3)*.08;box(.1,h,.26,mat(colors[i%colors.length]),x+i*.125,y+h/2,-2.02,.006)}}
    books(-.5,3.11,7);books(.25,3.83,6);box(.53,.085,.29,clay,1.3,3.16,-2.03);box(.45,.08,.29,mat('#a97851'),1.31,3.24,-2.03);
    cylinder(.12,.1,.29,mat('#8b8c7b'),1.28,3.96,-2.04);sphere(.16,mat('#77786d'),2.45,3.29,-2.03);
    const glowMat=new THREE.MeshStandardMaterial({color:'#ffe9bf',emissive:'#f6b454',emissiveIntensity:1.1,roughness:.4});mats.push(glowMat);sphere(.24,glowMat,2.35,4.06,-2.03);cylinder(.18,.18,.07,wood,2.35,3.85,-2.03);const glow=new THREE.PointLight('#ffc575',1.5,3);glow.position.set(2.35,4.12,-1.9);room.add(glow);
    // Framed abstract art.
    box(1.18,1.57,.06,wood,-2.3,2.78,-2.27,.012);box(1.09,1.48,.025,clay,-2.3,2.78,-2.23,.008);
    const artMat=new THREE.MeshStandardMaterial({map:texture('art'),roughness:.8});mats.push(artMat);const art=new THREE.Mesh(new THREE.PlaneGeometry(.95,1.32),artMat);art.position.set(-2.3,2.78,-2.21);room.add(art);
    // Ergonomic desk chair, facing the monitor.
    cylinder(.055,.055,.52,silver,.2,.51,.86);
    for(let i=0;i<5;i++){const a=i*Math.PI*2/5;rod([.2,.28,.86],[.2+Math.cos(a)*.52,.22,.86+Math.sin(a)*.52],.035,dark);sphere(.075,black,.2+Math.cos(a)*.52,.19,.86+Math.sin(a)*.52)}
    box(.92,.16,.87,dark,.2,.89,.86,.10);const back=box(.88,.99,.12,dark,.2,1.48,1.18,.10);back.rotation.x=.13;
    const mesh=mat('#41453d');for(let i=0;i<11;i++)box(.72,.018,.014,mesh,.2,1.08+i*.074,1.25,.002);
    for(const x of [-.32,.72]){rod([x,.87,.9],[x,1.17,.9],.028,silver);box(.13,.065,.54,black,x,1.19,.87,.025)}
    // Plants: individually modelled stems and broad, curved-looking leaves.
    const leaves:InstanceType<typeof THREE.Mesh>[]=[];
    function plant(x:number,y:number,z:number,scale:number){cylinder(.25*scale,.19*scale,.55*scale,clay,x,y+.275*scale,z);cylinder(.225*scale,.225*scale,.025*scale,mat('#4c4030'),x,y+.56*scale,z);for(let i=0;i<9;i++){const a=i*2.4,r=(.25+(i%3)*.12)*scale,height=(.65+(i%4)*.17)*scale;const ex=x+Math.cos(a)*r,ez=z+Math.sin(a)*r;rod([x,y+.48*scale,z],[ex,y+height,ez],.014*scale,leaf);const l=sphere(.32*scale,i%2?leaf:leafLight,ex,y+height,ez);l.scale.set(.65,1.35,.12);l.rotation.set(.3, -a, -.6+Math.sin(a)*.6);leaves.push(l)}}
    plant(-2.75,.17,.4,1.3);plant(-1.15,3.82,-2.02,.48);plant(2.37,3.11,-2.02,.38);
    // Plant tendrils spill down from the upper shelf.
    for(let i=0;i<9;i++){const yy=3.7-i*.075,xx=-1.1+Math.sin(i*.6)*.12;rod([xx,yy,-1.78],[xx,yy-.1,-1.77],.008,leaf);const l=sphere(.065,leaf,xx+.07,yy,-1.77);l.scale.set(1.2,.7,.2)}
    // Soft light cube on the floor.
    box(.46,.47,.46,glowMat,2.85,.42,1.2,.025);
    const ambient=new THREE.HemisphereLight('#fff3de','#97826a',2.4);scene.add(ambient);
    const key=new THREE.DirectionalLight('#ffe5c2',4.4);key.position.set(-3,8,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-6;key.shadow.camera.right=6;key.shadow.camera.top=6;key.shadow.camera.bottom=-6;key.shadow.normalBias=.025;key.shadow.bias=-.0001;key.shadow.radius=4;scene.add(key);
    const fill=new THREE.DirectionalLight('#ffffff',1.3);fill.position.set(5,5,-3);scene.add(fill);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.12}));ground.rotation.x=-Math.PI/2;ground.position.y=-.13;ground.receiveShadow=true;scene.add(ground);
    let px=0,py=0,inView=true,raf=0;const clock=new THREE.Clock();
    function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);const aspect=w/h,view=8.3;camera.left=-view*aspect/2;camera.right=view*aspect/2;camera.top=view/2;camera.bottom=-view/2;camera.updateProjectionMatrix()}
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
    const visibility=new IntersectionObserver(([e])=>inView=e.isIntersecting);visibility.observe(host);
    function pointer(e:PointerEvent){const r=host.getBoundingClientRect();px=((e.clientX-r.left)/r.width-.5)*2;py=((e.clientY-r.top)/r.height-.5)*2}
    function reset(){px=0;py=0}host.addEventListener('pointermove',pointer);host.addEventListener('pointerleave',reset);
    function animate(){raf=requestAnimationFrame(animate);if(!inView||document.hidden)return;const t=clock.getElapsedTime();const target=play.current?-.1+px*.12:-.1;room.rotation.y+=(target-room.rotation.y)*.035;room.position.y+=( (play.current?Math.sin(t*.6)*.025:0)-room.position.y)*.04;if(play.current){leaves.forEach((l,i)=>{l.rotation.z=-.6+Math.sin(i*2.4)*.6+Math.sin(t*.8+i)*.025});glow.intensity=1.5+Math.sin(t*1.4)*.1}camera.position.y+=(6.1+(play.current?py*.12:0)-camera.position.y)*.03;renderer.render(scene,camera)}animate();setReady(true);
    dispose=()=>{cancelAnimationFrame(raf);resizeObserver.disconnect();visibility.disconnect();host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',reset);scene.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose()});mats.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove()};
   }catch(e){if(!cancelled)setError(true);console.error('Workspace rendering unavailable',e)}
  }create();return()=>{cancelled=true;dispose()};
 },[]);
 return <div className={`workspace ${ready?'ready':''} ${playing?'is-playing':'is-paused'}`} ref={container} role="img" aria-label={error?'Animated studio illustration with a wooden desk, monitor, plants and warm lighting':'Interactive 3D studio with a wooden desk, monitor, plants, shelves and warm lighting'} onPointerMove={e=>{if(!error||!playing)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--tilt-x',`${((e.clientY-r.top)/r.height-.5)*-4}deg`);e.currentTarget.style.setProperty('--tilt-y',`${((e.clientX-r.left)/r.width-.5)*5}deg`)}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--tilt-x','0deg');e.currentTarget.style.setProperty('--tilt-y','0deg')}}>{!ready&&!error&&<div className="scene-loading"><span/>Setting up the studio</div>}{error&&<div className="studio-fallback"><div className="studio-float"><img src={`${import.meta.env.BASE_URL}studio-preview.webp`} alt="" width="1536" height="1024" fetchPriority="high"/></div></div>}</div>
}
