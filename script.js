// Users
let users=[
  {username:'Admin',password:'DraytonTav2025',isAdmin:true},
  {username:'User1',password:'password1',isAdmin:false},
  {username:'User2',password:'password2',isAdmin:false}
];

let shifts=[], dayOffs=[], currentUser=null;

// Render Login
function renderLogin(){
  document.getElementById('app').innerHTML=
    `<h2>Login</h2>
     <input id="u" placeholder="Username">
     <input id="p" type="password" placeholder="Password">
     <button onclick="login()">Login</button>`;
}

// Login function
function login(){
  let u=document.getElementById('u').value;
  let p=document.getElementById('p').value;
  let user=users.find(x=>x.username===u&&x.password===p);
  if(user){ currentUser=user; renderApp(); }
  else alert('Invalid login');
}

// Render App
function renderApp(){
  document.getElementById('app').innerHTML=
    `<h2>Welcome ${currentUser.username}</h2>
     <button onclick="signIn()">Sign In</button>
     <button onclick="signOut()">Sign Out</button>
     <button onclick="requestDayOff()">Request Day Off</button>
     <button onclick="generateRota()">Generate Rota</button>
     <div id="calendar"></div>`;
  renderCalendar();
}

// Render calendar
function renderCalendar(){
  let cal=document.getElementById('calendar');
  cal.innerHTML='<h3>Shifts</h3>'+
    shifts.map(s=>'<div>'+s+'</div>').join('')+
    '<h3>Day Off Requests</h3>'+
    dayOffs.map(d=>'<div>'+d+'</div>').join('');
}

// Sign in/out
function signIn(){
  let d=new Date().toLocaleDateString();
  shifts.push(currentUser.username+' signed in '+d);
  renderCalendar();
}
function signOut(){
  let d=new Date().toLocaleDateString();
  shifts.push(currentUser.username+' signed out '+d);
  renderCalendar();
}

// Request day off
function requestDayOff(){
  let d=prompt('Enter date for day off (YYYY-MM-DD)');
  if(d) dayOffs.push(currentUser.username+' requested '+d);
  renderCalendar();
}

// Generate Rota
function generateRota(){
  shifts=[];
  let days=30;
  for(let i=1;i<=days;i++){
    let date='2025-08-'+i;
    users.filter(u=>!u.isAdmin).forEach(u=>{
      shifts.push(u.username+' shift '+date);
    });
  }
  renderCalendar();
}

// Start app
renderLogin();
