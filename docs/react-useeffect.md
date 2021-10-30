
https://dmitripavlutin.com/react-useref-guide/

```js
import { useRef } from 'react';
function MyComponent() {
  const reference = useRef(initialValue);
  const someHandler = () => {
    // Access reference value:
    const value = reference.current;
    // Update reference value:
    reference.current = newValue;
  };
  // ...
}
```



```js
  // Keep latest props in a ref.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });


  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs




```