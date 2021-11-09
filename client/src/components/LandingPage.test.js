import LandingPage from "./LandingPage";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";



describe('Landing Page component test', () => {

    test('renders content', () => {

        const component = render(<BrowserRouter><LandingPage /></BrowserRouter>);   
        expect(component.container).toHaveTextContent('You like to cook? This is your place!');
    });

    test(`'Let´s go' button should de working`, () => {
        const component = render(<BrowserRouter><LandingPage /></BrowserRouter>);   
        // const button = component.getByText('Let´s go')
        // fireEvent.click(button)

        expect(component.getByRole('button')).not.toBeDisabled()
    });   

});

// test(`When clicking 'Let´s go' button should take you to Home`, () => {
//     let component = shallowEqual(<BrowserRouter><LandingPage /></BrowserRouter>)
//         // expect(component.getByRole('link')).toHaveAttribute('to', '/home')
//         expect(component).toContainReact(<Link to="/home">Let's go</Link>) ;
// });

test(`When clicking 'Let´s go' button should take you to Home`, () => {
    let component = render(<BrowserRouter><LandingPage /></BrowserRouter>)

    const link = component.getByRole('link', { name: `Let's go` });
    expect(link.getAttribute('href')).toBe('/home');
    // userEvent.click(link);
    // expect(component.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

// test(`When clicking 'Let´s go' button should take you to Home`, () => {
//     let component = render(<BrowserRouter><LandingPage /></BrowserRouter>)
//     const button = document.querySelector('#click')
          
//     userEvent.click(button);
//     expect(button).toHaveTextContent(`Let's do it!`);
//   });

// it(`When clicking 'Let´s go' button should take you to Home`, () => {
//     in a real test a renderer like "@testing-library/react"
//     would take care of setting up the DOM elements
//     const root = document.createElement('div');
//     document.body.appendChild(root);
  
//     Render app
//     let component = render(<BrowserRouter><LandingPage /></BrowserRouter>, root)
//     render(
//       <MemoryRouter initialEntries={['/dashboard']}>
//         <App />
//       </MemoryRouter>,
//       root
//     );
  
//     Interact with page
//     act(() => {
//       // Find the link (perhaps using the text content)
//       const button = component.getByRole('button')
//     //   const button = document.querySelector('#click');
//       //Click it
//       button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     });
  
//     // Check correct page content showed up
//     expect(document.body.textContent).toBe(`Let's do it!`);
//   });