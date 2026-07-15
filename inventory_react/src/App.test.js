import {render, screen} from '@testing-library/react'
import App from "./App"

test(`renders "Lab Inventory && Management header`, ()=>{
    render(<App/>)
    const headerElement=screen.getByText(/Lab Inventory & Management/i);
    expect(headerElement).toBeInTheDocument();
  });