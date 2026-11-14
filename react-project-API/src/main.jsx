import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import { StrictMode } from 'react'
import routes from './safe_routes/web_routes.jsx'
import Context_Provider from './safe_routes/context_provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context_Provider>
      <RouterProvider router={routes}>
      </RouterProvider>
    </Context_Provider>
  </StrictMode>
)

/*

// this could be done this way as well, but it is not recommended to use this way because it is not JSX syntax
//const heading = createElement('h1', {}, 'Hello, React!')
//createRoot(document.getElementById('root')).render(heading)

//********** Now we use JSX syntax **********
const heading = <h1>Hello, React!</h1>
createRoot(document.getElementById('root')).render(heading)

//********** Now we use JSX syntax with multiple elements this is called fragment **********
const name = "sohaila";
const flamingos = ["flamingo1", "flamingo2", "flamingo3"];
const logged = true;
const greet = (name) => {
  return "Hello " + name;
}
const count = (number) => {
  return <button>{number}</button>
}

const heading2 = <>
  <h1 className="heading">Hello, React!</h1>
  <h2>my name is {name}</h2>
  <h2>{alert ("you are a scientist! " + name)}</h2>
  <h2> did you know that 2 + 2 = {2+3}</h2>
  <h2> yes this is {true? "correct" : "incorrect"}</h2>
  <img src={Img} alt="scientist" />

  <ul>
    {
      flamingos.map((flamingo, index) => (
        <li key={index}>{flamingo}</li>
      ))
    }
  </ul>

  <h2>{logged? "Hello " + name : "you cant log in"}</h2>
  <h2>{greet(name)}</h2>
  <p>{count(5)}</p>
  <p>This is a paragraph.</p>
  

</>



createRoot(document.getElementById('root')).render(heading2)
*/