window.CUSDIS = {};
const makeIframeContent = (target) => {
  const host = target.dataset.host || "https://cusdis.com";
  const iframeJsPath = target.dataset.iframe || `${host}/js/iframe.umd.js`;
  const cssPath = `${host}/js/style.css`;
  const customCSSPath = `/comments.css`;
  return `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="${cssPath}">
    <link rel="stylesheet" href="${customCSSPath}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

    <base target="_parent" />
    <link>
    <script>
      window.CUSDIS_LOCALE = ${JSON.stringify(window.CUSDIS_LOCALE)}
      window.__DATA__ = ${JSON.stringify(target.dataset)}

      let lastHeight = 0;
      let updateTimer;

      function updateParentHeight() {
        clearTimeout(updateTimer);
        updateTimer = setTimeout(() => {
          const height = Math.max(
            document.documentElement.offsetHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.body.scrollHeight
          );
          
          if (height !== lastHeight) {
            lastHeight = height;
            window.parent.postMessage(JSON.stringify({
              from: 'cusdis',
              event: 'resize',
              data: height
            }), '*');
          }
        }, 100);
      }

      const observer = new MutationObserver((mutations) => {
        const hasContentChange = mutations.some(mutation => 
          mutation.type === 'childList' || 
          (mutation.type === 'attributes' && mutation.target !== document.body)
        );
        
        if (hasContentChange) {
          updateParentHeight();
        }
      });

      window.addEventListener('load', () => {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true
        });
        updateParentHeight();
      });

      document.addEventListener('DOMContentLoaded', updateParentHeight);
      window.addEventListener('resize', updateParentHeight);
    <\/script>
    <style>
      :root { color-scheme: light; }
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100%;
      }
      #root {
        padding: 1rem;
      }
      .cusdis-textarea {
        min-height: 100px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script src="${iframeJsPath}" type="module"><\/script>
  </body>
</html>`;
};

function createIframe(target) {
  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.border = "0";
  iframe.style.overflow = "hidden";
  iframe.style.minHeight = "200px";

  window.addEventListener("message", (e) => {
    try {
      const msg = JSON.parse(e.data);

      if (msg.from === "cusdis") {
        switch (msg.event) {
          case "onload": {
            if (target.dataset.theme === "auto") {
              iframe.contentWindow.postMessage(
                JSON.stringify({
                  from: "cusdis",
                  event: "setTheme",
                  data: window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "light",
                }),
                "*"
              );
            }
            break;
          }
          case "resize": {
            iframe.style.height = msg.data + "px";
            break;
          }
        }
      }
    } catch (e2) {
      console.error("Error processing message:", e2);
    }
  });

  iframe.srcdoc = makeIframeContent(target);
  return iframe;
}

function render(target) {
  if (target) {
    target.innerHTML = "";
    const iframe = createIframe(target);
    target.appendChild(iframe);
  }
}

window.renderCusdis = render;
window.CUSDIS.renderTo = render;
window.CUSDIS.setTheme = function (theme) {
  // This function is no longer used in the new implementation
};

function initial() {
  let target;
  if (window.cusdisElementId) {
    target = document.querySelector(`#${window.cusdisElementId}`);
  } else if (document.querySelector("#cusdis_thread")) {
    target = document.querySelector("#cusdis_thread");
  } else if (document.querySelector("#cusdis")) {
    console.warn(
      "id `cusdis` is deprecated. Please use `cusdis_thread` instead"
    );
    target = document.querySelector("#cusdis");
  }
  if (window.CUSDIS_PREVENT_INITIAL_RENDER === true);
  else {
    if (target) {
      render(target);
    }
  }
}
window.CUSDIS.initial = initial;
initial();
