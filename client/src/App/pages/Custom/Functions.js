const makeId = (chars = 25) => {
  let id = '';
  for (let index = 0; index < chars; index++) {
    id += String(Math.floor(Math.random() * 10));
  }
  return id;
}

const month = (dt) => {
  let m = dt.getMonth() + 1;
  return m;
}
const day = (dt) => {
  let d = dt.getDate() + 1;
  return d;
}

const makeDate = (date, time) => {
  let dt = new Date();
  if (time) {
    dt = new Date(String(date.slice(0, 10) + 'T' + time));
  } else {
    dt = new Date(String(date));
  }

  let txt =  dt.getFullYear() + '.' + month(dt) + '.' + day(dt) + ' at ';
  txt += dt.getHours() + ':' + dt.getMinutes();

  return {
    dt: dt,
    txt: txt
  };
}

const countDown = (date, time) => {
  let st = makeDate(date, time).dt.getTime() / 1000;
  let td = new Date();
  let ts = st - (td.getTime() / 1000);
  //let s = Math.floor(ts);
  //let rs = s % 60;
  let tm = ts / 60;
  //let m = Math.floor(tm);
  //let rm = m % 60;
  let th = tm / 60;
  let h = Math.floor(th);
  let rh = h % 24;
  let tdd = th / 24;
  let d = Math.floor(tdd);
  return d + " days " + rh + " hours to Go";
}

const getImage=(image, category='events')=>{
  return process.env.PUBLIC_URL + '/images/' + category + '/' + image;
} 

const get =(url, call)=>{
  let items = [];
  fetch('/api/' + url)
    .then(res => res.json()).then(res => {
      items = res[url];
      call(items);
    })
    .catch(error => console.log(error));
}

const getEvents = (callBack)=> {
  get('events', callBack);
}
const getAbout = (setNewState) => {
  let about = [];
  fetch('/api/about')
    .then(res => res.json()).then(res => {
      about = res.about[0];
      setNewState(about);
    })
    .catch(error => console.log(error));
}
const getBookings =(callBack)=>{
  get('bookings', callBack);
}
const getUsers = (callBack) => {
  get('users', callBack);
}
const getMaillist = (callBack) => {
  get('maillist', callBack);
}
const getMessages = (callBack) => {
  get('messages', callBack);
}
const getPayment = (callBack) => {
  get('payment', callBack);
}
const getPartners = (callBack) => {
  get('partners', callBack);
}

const checkDate = (date) => {
  return (new Date(date)) > (new Date());
}

export {
  checkDate,
  getImage,
  makeId,
  makeDate, 
  getEvents, 
  countDown, 
  getAbout,
  getBookings,
  getUsers,
  getMaillist,
  getMessages,
  getPayment,
  getPartners,
};