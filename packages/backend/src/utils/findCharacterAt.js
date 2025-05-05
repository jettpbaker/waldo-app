import DB from '../db/db'

const findCharacterAt = async (x, y) => {
  const characters = await DB.queries.getCharacters()

  const character = characters.find((character) => {
    return (
      x >= character.min_x && x <= character.max_x && y >= character.min_y && y <= character.max_y
    )
  })
  if (character) {
    return character
  }

  return null
}

export default findCharacterAt
