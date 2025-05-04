/*
  Warnings:

  - A unique constraint covering the columns `[game_id,character_id]` on the table `found_characters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "found_characters_game_id_character_id_key" ON "found_characters"("game_id", "character_id");
