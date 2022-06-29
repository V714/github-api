import { render, screen, fireEvent, getByPlaceholderText } from "@testing-library/react";
import {
  Pagination,
  TableDataTypes,
} from "../components/interfaces/interfaces";
import SinglePage from "../components/SinglePage";

jest.mock("../components/Table", () => {
  const Table = () => <></>;
  return Table;
});

describe("renders filters correctly", () => {
  render(<SinglePage />);
  const phrase= screen.getByPlaceholderText("wyszukiwana fraza")
  const user = screen.getByPlaceholderText("nazwa użytkownika")
  const searchButton = screen.getByText("wyszukaj")
  
  it('renders title correctly', () =>{ 
    expect(
      screen.getByText("Wyszukaj frazę w repozytorium GitHub")
    ).toBeInTheDocument();
  })
  
  it('inputs are required', () =>{ 
    expect(phrase).toHaveAttribute('required');
    expect(user).toHaveAttribute('required');
  })
  
  fireEvent.change(phrase, {target: {value: "test"}})
  fireEvent.change(user, {target: {value: "v714"}})
  fireEvent.click(searchButton)
  
  it('filled input fields change query string', () =>{ 
    expect(window.location.href).toBe("http://localhost/?username=v714&phrase=test&lang=go&page=1&perPage=15")
  }) 


  
});
