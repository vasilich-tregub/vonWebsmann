The folder 'vonWebsmann' is a demo of how a javascript can access a memory allocated in the WASM module. 
This demo should be run in the http server. Python's http.server is good for testing purposes and can be run with 
a command
          <pre>py -m http.server -b 127.0.0.1</pre>      
that you launch, for example, from this folder for a convenient access from your browser 
(`http://127.0.0.1:8000/index.html``).

The page 'dataView.html' shows some intricacies of storing javascript strings to a WebAssembly memory.