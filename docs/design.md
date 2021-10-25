



```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

<ul>{listItems}</ul>
```

https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating

Please note that all these solutions will fail with a stack overflow error if array b is too long (trouble starts at about 100,000 elements, depending on the browser).
If you cannot guarantee that b is short enough, you should use a standard loop-based technique described in the other answer.