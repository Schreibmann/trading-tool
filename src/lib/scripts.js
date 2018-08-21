function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();

  if (a.length < 2) {
    a = `0${a}`;
  }

  const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return time;
}

export function now() {
  const now = new Date();
  return timeConverter(now);
}

export function initCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let cw = (canvas.width = window.innerWidth);

  let ch = (canvas.height = window.innerHeight);

  ctx.fillStyle = '#000';
  const linesNum = 42;
  const linesRy = [];
  let requestId = null;

  function Line(flag) {
    this.flag = flag;
    this.a = {};
    this.b = {};
    if (flag === 'v') {
      this.a.y = 0;
      this.b.y = ch;
      this.a.x = randomIntFromInterval(0, ch);
      this.b.x = randomIntFromInterval(0, ch);
    } else if (flag === 'h') {
      this.a.x = 0;
      this.b.x = cw;
      this.a.y = randomIntFromInterval(0, cw);
      this.b.y = randomIntFromInterval(0, cw);
    }
    this.va = randomIntFromInterval(25, 100) / 100;
    this.vb = randomIntFromInterval(25, 100) / 100;

    this.draw = function () {
      ctx.strokeStyle = 'lightblue';
      ctx.beginPath();
      ctx.moveTo(this.a.x, this.a.y);
      ctx.lineTo(this.b.x, this.b.y);
      ctx.stroke();
    };

    this.update = function () {
      if (this.flag === 'v') {
        this.a.x += this.va;
        this.b.x += this.vb;
      } else if (flag === 'h') {
        this.a.y += this.va;
        this.b.y += this.vb;
      }

      this.edges();
    };

    this.edges = function () {
      if (this.flag === 'v') {
        if (this.a.x < 0 || this.a.x > cw) {
          this.va *= -1;
        }
        if (this.b.x < 0 || this.b.x > cw) {
          this.vb *= -1;
        }
      } else if (this.flag === 'h') {
        if (this.a.y < 0 || this.a.y > ch) {
          this.va *= -1;
        }
        if (this.b.y < 0 || this.b.y > ch) {
          this.vb *= -1;
        }
      }
    };
  }

  for (let i = 0; i < linesNum; i++) {
    const flag = i % 2 === 0 ? 'h' : 'v';
    const l = new Line(flag);
    linesRy.push(l);
  }

  function Draw() {
    requestId = window.requestAnimationFrame(Draw);
    ctx.clearRect(0, 0, cw, ch);

    for (let i = 0; i < linesRy.length; i++) {
      const l = linesRy[i];
      l.draw();
      l.update();
    }
    for (let i = 0; i < linesRy.length; i++) {
      const l = linesRy[i];
      for (let j = i + 1; j < linesRy.length; j++) {
        const l1 = linesRy[j];
        Intersect2lines(l, l1);
      }
    }
  }

  function Init() {
    linesRy.length = 0;
    for (let i = 0; i < linesNum; i++) {
      const flag = i % 2 === 0 ? 'h' : 'v';
      const l = new Line(flag);
      linesRy.push(l);
    }

    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = null;
    }

    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;

    Draw();
  }

  setTimeout(() => {
    Init();
  }, 15);

  function Intersect2lines(l1, l2) {
    const p1 = l1.a;


    const p2 = l1.b;


    const p3 = l2.a;


    const p4 = l2.b;
    const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
    const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x))
      / denominator;
    const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x))
      / denominator;
    const x = p1.x + ua * (p2.x - p1.x);
    const y = p1.y + ua * (p2.y - p1.y);
    if (ua > 0 && ub > 0) {
      markPoint({
        x,
        y,
      });
    }
  }

  function markPoint(p) {
    ctx.fillStyle = 'whitesmoke';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  function randomIntFromInterval(mn, mx) {
    return ~~(Math.random() * (mx - mn + 1) + mn);
  }
}
