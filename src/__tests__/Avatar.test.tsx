import { render, screen } from '@testing-library/react';
import { Pagination, listElement } from '../components/interfaces/interfaces';
import { Avatar } from '../components/modals/Avatar'

test('renders table correctly', () => {
    const user:listElement = {
        index: 2,
        filename: '',
        fileUrl: '',
        description: '',
        username: 'User Name Test',
        avatar: 'http://www.rw-designer.com/icon-image/22109-256x256x32.png'
    }

    render(<Avatar user={user} isModalOpen={true} openModal={()=>{}} closeModal={()=>{}}/>);
    expect(screen.getByText(user.username)).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toBeInTheDocument();

    const closeButton = screen.getAllByText("zamknij");
    expect(closeButton[0].tagName).toBe("BUTTON");
});
