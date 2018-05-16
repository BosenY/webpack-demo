import _ from 'lodash'
import printMe from './print.js'
import './style.css'
import Dva from './dva.jpg'
import Data from './data.xml'
function component() {
  var element = document.getElementById('app')

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['hello', 'dva11'], ' ')
  element.classList.add('hello')

  let mydva = new Image()
  mydva.src = Dva

  element.appendChild(mydva)

  var btn = document.createElement('button')
  btn.innerHTML = 'Click me and check the c213131onsole!'
  btn.onclick = printMe

  element.appendChild(btn)
  console.log(Data)
  return element
}
var app = document.getElementById('vue');
app.style.display = 'table-cell';
app.style.width = '400px';
app.style.height = '40px';
app.style.border = '3px solid #339';
app.style.background = '#99d';
app.style.color = '#333';
app.style.textAlign = 'center';
app.style.verticalAlign = 'middle';

component()
if (module.hot) {
    module.hot.accept();
    // module.hot.dispose(function() {
    //   clearInterval(timer);
    // });
}
