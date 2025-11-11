import { type ReactNode } from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

export function renderWithRouter(ui: ReactNode) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}
