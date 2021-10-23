



import Script from 'next/script';

function Page() {

  return (<>
    <head>
      <Script 
        src="/socket.io/socket.io.js"
        strategy="beforeInteractive" // lazyOnload, afterInteractive
        onLoad={() => {
          console.log("Loaded");
          // If loaded successfully, then you can load other scripts in sequence
        }}
      />
    </head>
    <div>About</div>
    </>);
}

export default Page