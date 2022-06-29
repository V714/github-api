import { render, screen } from '@testing-library/react';
import { Pagination, TableDataTypes } from '../components/interfaces/interfaces';
import Table from '../components/Table';
import example_data from "./example_data.json"

test('renders table correctly', () => {
    const pagination:Pagination = {perPage:2,page:1}
    render(<Table data={example_data} pagination={pagination} goToPage={()=>{}} changePerPage={()=>{}}/>);
    expect(screen.getByText("server.js")).toBeInTheDocument();
    expect(screen.getByText("index.js")).toBeInTheDocument();

    const userButtons = screen.getAllByText("V714")
    expect(userButtons[1].tagName).toBe("BUTTON")
});
