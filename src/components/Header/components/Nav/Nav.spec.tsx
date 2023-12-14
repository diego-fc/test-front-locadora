import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Menu from './index';
import { usePopupState } from 'material-ui-popup-state/hooks';

jest.mock('material-ui-popup-state/hooks');
jest.mock("react-router-dom", () => {
  return {
    useNavigate() {
      return {
        asPath: "",
      };
    },
  };
});

describe('Menu', () => {
  it('renderiza sem erros', () => {
    usePopupState.mockReturnValue({
      variant: 'popover',
      open: false,
      setOpen: jest.fn(),
    });

    render(<Menu user={{ claims: ['admin'] }} />);
  });

  it('manipula o clique em itens de menu desabilitados', async () => {
    const mockUsePopupState = jest.fn();
    usePopupState.mockReturnValue({
      variant: 'popover',
      open: false,
      setOpen: mockUsePopupState,
    });

    const { getByText } = render(<Menu user={{ claims: [] }} />);

    const disabledButton = getByText('Maintenance');
    fireEvent.click(disabledButton);

    await waitFor(() => expect(mockUsePopupState).not.toHaveBeenCalled());
  });
});
