
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.lineCap = "round";
ctx.lineJoin = "round";

////my
var gr=0;
var gg=0;
var gb=0;
// var gh=0;
// var gs=0;
// var gl=0;
var now;
var pencil = document.getElementById("pencil");
var eraser = document.getElementById("eraser");
var text = document.getElementById("text");
var circle = document.getElementById("circle");
var triangle = document.getElementById("triangle");
var rectangle = document.getElementById("rectangle");
var last = document.getElementById("last");
var next = document.getElementById("next");
var refresh = document.getElementById("refresh");
var download = document.getElementById("download");
var upload = document.getElementById("upload");
var line = document.getElementById("line");
var fill = document.getElementById("fill");
var rainbow = document.getElementById("rainbow");
var arc = document.getElementById("arc");
var big = document.getElementById("big");
initcanvas = canvas.toDataURL();
var f=0;
var changingColor=0;
var direction=0;
function time_for(tmp)
{
  if(tmp=="pencil"||tmp=="eraser"||tmp=="text"||tmp=="circle"||tmp=="triangle"||tmp=="rectangle"||tmp=="line"||tmp=="rainbow"||tmp=="arc")
  {
    canvas.style.cursor = "url('nnn/" + tmp + ".png'), auto";
    now=tmp;
  }
  
}
canvas.addEventListener('mousedown', moused);
canvas.addEventListener('mousemove', mousev);
canvas.addEventListener('mouseup', mouseu);
canvas.addEventListener('mouseout', mouseo);
var step = -1;
var px;
var py;
var using_pencil;
var using_eraser;
var using_circle;
var using_rectangle;
var using_triangle;
var using_line;
var using_rainbow;
var using_arc;
var max_redo=0;
var textbox_exist = false;
var hasInput = false;
var mdx,mdy;
var gr,gg,gb;
var style = window.getComputedStyle(canvas, null);
var cssWidth = parseFloat(style["width"]);
var cssHeight = parseFloat(style["height"]);
var scaleX = canvas.width / cssWidth; // 水平方向的缩放因子
var scaleY = canvas.height / cssHeight; // 垂直方向的缩放因子
canvas.addEventListener("click", function __handler__(evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    x *= scaleX; // 修正水平方向的坐标
    y *= scaleY; // 修正垂直方向的坐标
    // console.log(x, y); // (x, y) canvas 里的坐标
    px=x;
    py=y;
});
last.addEventListener("click",lastclick);
next.addEventListener("click",nextclick);
refresh.addEventListener("click",refreshclick);
download.addEventListener("click",downloadclick);
upload.addEventListener("click",uploadclick);
fill.addEventListener("click",fillclick);
function lastclick(e)
{
  console.log(step);
  if(step>max_redo)
  {
    max_redo=step;
  }
  if(step>=0)
  {
    step--;
    let memory = new Image();
    if(step>=0) memory.src = l[step];
    memory.onload = function () {
    // console.log(step);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(step>=0)
    {
      ctx.drawImage(memory, 0, 0);
    }
    ctx.beginPath();
    ctx.stroke();
    ctx.closePath();
    }
  }
  if(step==-1) ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function nextclick(e)
{
  console.log(step);
  if(step<max_redo)
  {
    step++;
    let memory = new Image();
    memory.src = l[step];
    memory.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(step!=-1)
    {
      ctx.drawImage(memory, 0, 0);
    }
    ctx.beginPath();
    ctx.stroke();
    ctx.closePath();
    }
  }
}
function refreshclick(e)
{
  step=-1;
  max_redo=0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function downloadclick(e)
{
  const link = document.createElement("a");
  const image = canvas.toDataURL();
  link.href = image;
  link.download = "image.png";
  link.click();
}
function uploadclick(e)
{
  const link = document.createElement("input");
  link.type = "file";
  link.accept = "image/*";
  link.addEventListener("change", function (e) {
    var reader = new FileReader();
    reader.onload = function(e){
        var img2 = new Image();
        img2.onload = function(){
            // canvas.width = img2.width;
            // canvas.height = img2.height;
            ctx.drawImage(img2,0,0,img2.width/5,img2.height/5);
        }
        img2.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
        });
  iter();
  link.click();
  link.remove();
}
function fillclick(e)
{
  if(f==0)
  {
    f=1;
    fill.style.backgroundImage = "url('nnn/fill2.png')";
    document.body.style.backgroundImage = "url('nnn/fill2.png')";
  }
  else
  {
    f=0;
    fill.style.backgroundImage = "url('nnn/fill.png')";
    document.body.style.backgroundImage = "url('nnn/fill.png')";
  } 
}
l=[];
function iter()
{
  console.log(step);
  max_redo=0;
  step++;
  if (step < l.length) l.length = step;
  l.push(canvas.toDataURL());
  // l.push(ctx.getImageData(0,0,canvas.width,canvas.height));
}
//mousedown
function moused(e)
{
    var x = e.clientX;
    var y = e.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    x *= scaleX; // 修正水平方向的坐标
    y *= scaleY; // 修正垂直方向的坐标
    // console.log(x, y); // (x, y) canvas 里的坐标
    px=x;
    py=y;
    mdx=x;
    mdy=y;
  if(now=="pencil")
  {
    // pencil.backgroundColor=nowcolor(gr,gg,gb);
    using_pencil = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, py);
    ctx.stroke();
  }
  else if(now=="eraser")
  {
    using_eraser = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, py);
    ctx.stroke();
  }
  else if(now=="text"&&textbox_exist == false)
  {
    if (!hasInput) addInput(e.clientX, e.clientY);
  }
  else if(now=="circle")
  {
    using_circle = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "source-over";
  }
  else if(now=="triangle")
  {
    using_triangle = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "source-over";
  }
  else if(now=="rectangle")
  {
    using_rectangle = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "source-over";
  }
  else if(now=="line")
  {
    using_line = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "source-over";
  }
  else if(now=="rainbow")
  {
    using_rainbow = true;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, py);
    ctx.stroke();
  }
  else if(now=="arc")
  {
    using_arc = true;
    ctx.lineWidth = document.getElementById("rangee").value;
    ctx.strokeStyle = nowcolor(gr,gg,gb);
    ctx.fillStyle = nowcolor(gr,gg,gb);
    ctx.globalCompositeOperation = "source-over";
  }
}

//mouse move
function mousev(e)
{
  var x = e.clientX;
    var y = e.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    x *= scaleX; // 修正水平方向的坐标
    y *= scaleY; // 修正垂直方向的坐标
    // console.log(x, y); // (x, y) canvas 里的坐标
    px=x;
    py=y;
  if(now=="pencil")
  {
    if(using_pencil==true)
    {
      ctx.lineWidth = document.getElementById("rangee").value;
      ctx.strokeStyle = nowcolor(gr,gg,gb);
      ctx.fillStyle = nowcolor(gr,gg,gb);
      console.log(gr,gg,gb);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineTo(px, py);
      ctx.stroke();
    }
  }
  else if(now=="eraser")
  {
    if(using_eraser==true)
    {
      ctx.lineWidth = document.getElementById("rangee").value;
      ctx.strokeStyle = nowcolor(gr,gg,gb);
      ctx.fillStyle = nowcolor(gr,gg,gb);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineTo(px, py);
      ctx.stroke();
    }
  }
  else if(now=="circle")
  {
    if(using_circle==true)
    {
      // ctx.putImageData(img,0,0);
      let memory = new Image();
      if(step==-1) memory.src = initcanvas;
      else memory.src = l[step];
      // console.log(step);
      memory.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(memory, 0, 0);
      ctx.beginPath();
      // ctx.arc(Math.abs(px+mdx)/2,Math.abs(py+mdy)/2,Math.sqrt(Math.pow(px-mdx,2)+Math.pow(py-mdy,2))/2, 0, Math.PI*2);
      ctx.moveTo(mdx, mdy + (py-mdy)/2);
      ctx.bezierCurveTo(mdx, mdy, px, mdy, px, mdy + (py-mdy)/2);
      ctx.bezierCurveTo(px, py, mdx, py, mdx, mdy + (py-mdy)/2);
      ctx.stroke();
      if(f==1){ctx.fill();}
      ctx.closePath();
      }
    }
  }
  else if(now=="triangle")
  {
    if(using_triangle==true)
    {
      // ctx.putImageData(img,0,0);
      var twidth = Math.abs(px - mdx);
      let memory = new Image();
      if(step==-1) memory.src = initcanvas;
      else memory.src = l[step];
      memory.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(memory, 0, 0);
      ctx.beginPath();

      if (px >= mdx) {
        ctx.moveTo(mdx, mdy);
        ctx.lineTo(px, py);
        ctx.lineTo(px - (2 * twidth), py);
        ctx.closePath();
    
      } else {
        ctx.moveTo(mdx, mdy);
        ctx.lineTo(px, py);
        ctx.lineTo(px + (2 * twidth), py);
        ctx.closePath();
      }

      ctx.stroke();
       if(f==1){ctx.fill();}
      ctx.closePath();
      }
    }
  }
  else if(now=="rectangle")
  {
    if(using_rectangle==true)
    {
      // ctx.putImageData(img,0,0);
      let memory = new Image();
      if(step==-1) memory.src = initcanvas;
      else memory.src = l[step];
      memory.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(memory, 0, 0);
      ctx.beginPath();
      if(f==1){ctx.fillRect(mdx,mdy,px-mdx,py-mdy);}
      else ctx.strokeRect(mdx,mdy,px-mdx,py-mdy);
      ctx.stroke();
      ctx.closePath();
      }
    }
  }
  else if(now=="line")
  {
    if(using_line==true)
    {
      let memory = new Image();
      if(step==-1) memory.src = initcanvas;
      else memory.src = l[step];
      memory.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(memory, 0, 0);
      ctx.beginPath();
      ctx.moveTo(mdx, mdy);
      ctx.lineTo(px, py);
      ctx.stroke();
      // if(f==1){c.fill();}
      // ctx.closePath();
      }
      
      }
  }
  else if(now=="rainbow")
  {
    if(using_rainbow==true)
    {
      ctx.strokeStyle = `hsl(${changingColor}, 100%, 50%)`;
      ctx.fillStyle = `hsl(${changingColor}, 100%, 50%)`;
      ctx.beginPath();
    
      changingColor++;
      if (changingColor >= 360) changingColor = 0;
    
      if (direction) {
        ctx.lineWidth++;
      } else {
        ctx.lineWidth--;
      }
    
      if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction; //if true then it goes false, same goes for false
      }
      big.style.backgroundColor = `hsl(${changingColor}, 100%, 50%)`;


      console.log(gr,gg,gb);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineTo(px, py);
      ctx.stroke();
    }
  }
  else if(now=="arc")
  {
    if(using_arc==true)
    {
      let memory = new Image();
      if(step==-1) memory.src = initcanvas;
      else memory.src = l[step];
      memory.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(memory, 0, 0);
      ctx.beginPath();
      // ctx.arc(Math.abs(px+mdx)/2,Math.abs(py+mdy)/2,Math.sqrt(Math.pow(px-mdx,2)+Math.pow(py-mdy,2))/2, 0, Math.PI*2);
      ctx.moveTo(mdx, mdy + (py-mdy)/2);
      ctx.bezierCurveTo(mdx, mdy, px, mdy, px, mdy + (py-mdy)/2);
      ctx.moveTo(mdx, py);
      ctx.lineTo(mdx+1, py);
      ctx.moveTo(px, py);
      ctx.lineTo(px+1, py);
      // ctx.bezierCurveTo(px, py, mdx, py, mdx, mdy + (py-mdy)/2);
      ctx.stroke();
      if(f==1){ctx.fill();}
      ctx.closePath();
      }
    }
  }
}
function mouseu(e)
{
  if(using_pencil==true)
  {
    iter();
    using_pencil=false;
  }
  if(using_eraser==true)
  {
    iter();
    using_eraser=false;
    ctx.globalCompositeOperation = "source-over";
  }
  if(using_circle==true)
  {
    iter();
    using_circle=false;
  }
  if(using_triangle==true)
  {
    iter();
    using_triangle=false;
  }
  if(using_rectangle==true)
  {
    iter();
    using_rectangle=false;
  }
  if(using_line==true)
  {
    iter();
    using_line=false;
  }
  if(using_rainbow==true)
  {
    iter();
    using_rainbow=false;
  }
  if(using_arc==true)
  {
    iter();
    using_arc=false;
  }
  
}
function mouseo(e)
{
}
function addInput(x, y) {

  var input = document.createElement('input');
  input.type = 'text';
  input.style.position = 'fixed';
  input.style.left = (x - 4) + 'px';
  input.style.top = (y - 4) + 'px';
  input.onkeydown = handleEnter;

  document.body.appendChild(input);

  input.focus();

  hasInput = true;
}
function handleEnter(e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
      // console.log(this.value);
      drawText(this.value, px, py);
      document.body.removeChild(this);
      hasInput = false;
  }
}
function drawText(txt, x, y) {
  let fontsize = document.getElementById("big2").value;
  let typeface = document.getElementById("type").value;
  ctx.fillStyle = nowcolor(gr,gg,gb);
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  // ctx.font = '14px sans-serif';
  ctx.font = `${fontsize}px ${typeface}`;
  ctx.fillText(txt, px, py);
  iter();
  // console.log(fontsize);
  // console.log(typeface);
}



//color

const container = document.querySelector('.color-picker');
const canvas2 = document.createElement('canvas');
const circle2 = document.createElement('div');
container.appendChild(canvas2);
container.appendChild(circle2);

container.style.position = 'relative';
circle2.style.cssText = `border: 2px solid; border-radius: 50%; width: 12px; height: 12px; position: absolute; top:0; left: 0; pointer-events: none; box-sizing: border-box;`;

const [width, height] = [container.offsetWidth, container.offsetHeight];
[canvas2.width, canvas2.height] = [width, height];

drawColors(canvas2);
canvas2.addEventListener('click', e => pickColor(e, canvas2, circle2));

function pickColor(event, canvas2, circle2) {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left; //x position within the element.
  const y = event.clientY - rect.top;  //y position within the element.

  const context = canvas2.getContext('2d');
  const imgData = context.getImageData(x, y, 1, 1);
  const [r, g, b] = imgData.data;
  gr=Math.round(r);
  gg=Math.round(g);
  gb=Math.round(b);
  circle2.style.top = (y - 6) + 'px';
  circle2.style.left = (x - 6) + 'px';
  gr=r;
  gb=b;
  gg=g;
  document.body.style.backgroundColor = nowcolor(gr,gg,gb);
  big.style.backgroundColor = nowcolor(255-gr,255-gg,255-gb);
}

function drawColors(canvas2) {
  const context = canvas2.getContext('2d');
  const {width, height} = canvas2;

  const gradientH = context.createLinearGradient(0, 0, width, 0);
  gradientH.addColorStop(0, "rgb(255, 0, 0)");
  gradientH.addColorStop(1/6, "rgb(255, 255, 0)");
  gradientH.addColorStop(2/6, "rgb(0, 255, 0)");
  gradientH.addColorStop(3/6, "rgb(0, 255, 255)");
  gradientH.addColorStop(4/6, "rgb(0, 0, 255)");
  gradientH.addColorStop(5/6, "rgb(255, 0, 255)");
  gradientH.addColorStop(1, "rgb(255, 0, 0)");
  context.fillStyle = gradientH;
  context.fillRect(0, 0, width, height);
  
  const gradientV = context.createLinearGradient(0, 0, 0, height);
  gradientV.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradientV.addColorStop(0.5, "rgba(255, 255, 255, 0)");
  gradientV.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  gradientV.addColorStop(1, "rgba(0, 0, 0, 1)");
  context.fillStyle = gradientV;
  context.fillRect(0, 0, width, height);
}

function nowcolor(r, g, b) {
  const i2h = num => 
    (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
  return `#${i2h(r)}${i2h(g)}${i2h(b)}`
}


