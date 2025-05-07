import { Link } from 'react-router'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primaryFg : theme.colors.primary};

  border: ${({ theme }) => theme.colors.primary} 2px solid;

  padding: 0.5rem 1rem;
  border-radius: 0.175rem;
  width: 100%;
  text-align: center;

  font-weight: bold;
  font-size: 1.25rem;
`
function LinkButton({ children, variant = 'primary', ...props }) {
  return (
    <StyledLink variant={variant} {...props}>
      {children}
    </StyledLink>
  )
}

export default LinkButton
