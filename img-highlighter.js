{
    //make a function  to create rectangles on every img by creating an SVG element 

    function componentHighlighter() {
    
      // Get all of the img elements on the page
      const images = document.getElementsByTagName('img');
    
      // create an SVG element as viewport size to draw rectangles
      let svgElement = document.createElementNS('http://www.w3.org/2000/svg','svg');
    
      // get the height and the width of the document to make sure that SVG is covering the whole page
      let body = document.body, html = document.documentElement;
      let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
      let width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
    
      // Set attributes for SVG element
      svgElement.setAttribute('style', `width: ${width}; height: ${height}; position: absolute; top: 0; background-size: cover;`);
      svgElement.setAttribute('class', 'highlighter');
    
      // Create an array of required position attributes to create rectangles
      const rectAttributes = ['bottom', 'height', 'left', 'right', 'top', 'width', 'x', 'y'];
    
      // retrieve the positions of img elements and set them as rect attributes
      [...images].forEach((image) => {
        const imageRectAttributes = image.getBoundingClientRect();
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('style', 'fill: pink; fill-opacity: 0.8; stroke: cadetblue; stroke-width: 2; position: relative;');
        for (const key in imageRectAttributes) {
          if (rectAttributes.includes(key)) {
            rect.setAttribute(key, imageRectAttributes[key]);
          }
        }
        svgElement.appendChild(rect);
      }
      );
      document.body.append(svgElement);
    }
    
    componentHighlighter();
    
    function componentHighlightRemove(document) {
        const svgElement = document.getElementsByClassName('highlighter')[0];
        document.body.removeChild(svgElement);
      }
      
      function cleanup() {
        componentHighlightRemove();
      }
    }
    
