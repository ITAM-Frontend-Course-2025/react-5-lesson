import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../../_shared/test-utils'
import userEvent from '@testing-library/user-event'

import Task from '/src/tasks/routing/NavLink/task-4/issue'

describe('/src/tasks/routing/NavLink/task-4', () => {
  it('renders and works', async () => {
    renderWithRouter(<Task />)
  const u = userEvent.setup()
  await u.click(screen.getByTestId('act'))
  expect(screen.getByText(/updated/i)).toBeTruthy()
  })
})
