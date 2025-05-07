import { Link } from 'react-router'
import styled from 'styled-components'
import LinkButton from '../components/ui/LinkButton'

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 70ch;

  @media (max-width: 768px) {
    flex: 1;
    justify-content: space-between;
  }
`

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const StyledHeading = styled.h1`
  font-size: 5rem;
  font-weight: bold;

  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const StyledParagraph = styled.p`
  font-size: 1.125rem;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.fg};
  text-wrap: pretty;
`

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  width: 100%;
  margin-top: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 100%;
  }
`

function Home() {
  return (
    <StyledHome>
      <StyledTitleContainer>
        <StyledHeading>Where's Waldo?</StyledHeading>
        <StyledParagraph>
          When you start the game, you'll receive a list of characters to find as you race against
          the clock. Find everyone, and your time will be added to the leaderboard!
        </StyledParagraph>
      </StyledTitleContainer>
      <StyledButtonContainer>
        <LinkButton to="/game">Start Game</LinkButton>
        <LinkButton to="/leaderboard" variant="secondary">
          Leaderboard
        </LinkButton>
      </StyledButtonContainer>
    </StyledHome>
  )
}

export default Home
