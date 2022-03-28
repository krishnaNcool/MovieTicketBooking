import logo from "./logo.svg";
import "./App.css";
componentDidMount() {
   const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
  document.getElementsByClassName('wrapper2')[0].addEventListener('scroll', () => {
  document.getElementsByClassName('wrapper1')[0].scrollLeft = 
  document.getElementsByClassName('wrapper2')[0].scrollLeft;
})

document.getElementsByClassName('wrapper1')[0].addEventListener('scroll', () => {
  document.getElementsByClassName('wrapper2')[0].scrollLeft = 
  document.getElementsByClassName('wrapper1')[0].scrollLeft;
})
}
function App() {
  return (
    <div className="App">
      <div id="doublescroll">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div class="wrapper1">
        <div class="div1"></div>
      </div>
      <div class="wrapper2">
        <div class="div2">
          aaaa bbbb cccc dddd aaaa bbbb cccc dddd aaaa bbbb cccc dddd aaaa bbbb
          cccc dddd aaaa bbbb cccc dddd aaaa bbbb cccc dddd aaaa bbbb cccc dddd
        </div>
      </div>
    </div>
  );
}

export default App;
