The folder 'vonWebsmann' is a demo of how a javascript can access a memory allocated in the WASM module. 
This demo should be run in the http server. Python's http.server is good for testing purposes and can be run with 
a command
          <strong>$python -m http.server -b 127.0.0.1</strong>
that you launch, for example, from this folder for a convenient access from your browser 
(<span>http://127.0.0.1:8000/index.html</span>).

The page 'dataView.html' shows some intricacies of storing javascript strings to a WebAssembly memory.

The page 'cfJsWaPerf.html' examines performance of data exchange with DataView methods.
