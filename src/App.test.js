
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App'; // Adjust the import path according to your project structure

test('renders calculator title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Simple Calculator/i);
  expect(titleElement).toBeInTheDocument();
});

test('displays numbers when buttons are clicked', () => {
  const { getByText, getByRole } = render(<App />);
  const button1 = getByText('1');
  const button2 = getByText('2');
  const input = getByRole('textbox');
  
  fireEvent.click(button1);
  fireEvent.click(button2);
  
  expect(input.value).toBe('12');
});

test('clears the input when C is clicked', () => {
  const { getByText, getByRole } = render(<App />);
  const button1 = getByText('1');
  const clearButton = getByText('C');
  const input = getByRole('textbox');
  
  fireEvent.click(button1);
  fireEvent.click(clearButton);
  
  expect(input.value).toBe('');
});

test('performs addition correctly', async () => {
  const { getByText, getByRole } = render(<App />);
  const button1 = getByText('1');
  const button2 = getByText('2');
  const addButton = getByText('+');
  const equalsButton = getByText('=');
  const input = getByRole('textbox');
  
  fireEvent.click(button1);
  fireEvent.click(addButton);
  fireEvent.click(button2);
  fireEvent.click(equalsButton);
  
  await waitFor(() => {
    const resultElement = document.querySelector('.result');
    expect(resultElement.textContent).toBe('3');
  });
});

test('displays error on invalid input', async () => {
  const { getByText, getByRole } = render(<App />);
  const input = getByRole('textbox');
  const equalsButton = getByText('=');
  
  fireEvent.change(input, { target: { value: '1/0' } });
  fireEvent.click(equalsButton);
  
  await waitFor(() => {
    const resultElement = document.querySelector('.result');
    expect(resultElement.textContent).toBe('Error');
  });
});
