/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

export default function Component() {

  async function handleSubmit(event) {
    event.preventDefault();
    //alert('A name was submitted: ' + this.state.value);
    console.log("test");

    console.log(event.target.firstname.value);
    console.log(event.target.lastname.value);
    console.log(event.target.email.value);

    const res = await fetch('/api/contact',{
      method: 'POST',
      //headers: {
        //'Content-Type': 'application/json'
      //},
      body: JSON.stringify({
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        email: event.target.email.value
      })
    });
    const result = await res.json();
    // result.user => 'Ada Lovelace'
    console.log(result);
  }

  return (<>
    <label> Add contact: </label>
    <form onSubmit={handleSubmit}>
      <label> First Name: </label> <input id="firstname" name="firstname"></input>
      <br/>
      <label> Last Name: </label><input name="lastname"></input>
      <br/>
      <label> Email: </label><input name="email"></input>
      <br/>
      <button type="submit">Register</button>
    </form>
  </>);
}