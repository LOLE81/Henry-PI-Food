import Recipe from "./Recipe";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('renders content', () => {
const recipe = {
    name: "Goulash",
    dietTypes: ["paleolithic", "primal"]
}
const component = render(<Recipe name={recipe.name} dietTypes={recipe.dietTypes}/>);   
expect(component.container).toHaveTextContent(recipe.name);
});



//App.test.js

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });