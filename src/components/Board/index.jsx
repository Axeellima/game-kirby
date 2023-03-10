import Piece from '../Piece'
import { StyledBoard } from './style'
import ActionBar from '../ActionBar'
import { useState } from 'react'
import { useMemo } from 'react'
import { grabPieceFunction } from '../../services/grabPieceFunction'
import musicTheme from '../../assets/music/musicTheme.mp3'

const grabPiece = (
  e,
  players,
  selectedPiece,
  setPlayers,
  turnGame,
  setTurnGame,
) => {
  const grab = grabPieceFunction(
    e,
    players,
    selectedPiece,
    setPlayers,
    turnGame,
    setTurnGame,
  )
  return grab
}

const verticalAxis = ['1', '2', '3', '4', '5', '6']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f']

const Board = ({
  select,
  players,
  setPlayers,
  turnGame,
  setTurnGame,
  setWinner,
  setGameOver,
}) => {
  let board = []

  const [actionBarActive, setActionBarActive] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [onMove, setOnMove] = useState(false)

  useMemo(() => {
    for (let v = verticalAxis.length - 1; v >= 0; v--) {
      for (let h = 0; h < horizontalAxis.length; h++) {
        let image = undefined
        let id = undefined
        let name = undefined
        let health = undefined
        let attackedPiece = undefined

        if (players.length > 0) {
          players.forEach((player) => {
            player.thiefs?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'thief'
                  attackedPiece = piece.attackedPiece
                }
              }
            })
            player.assassins?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'assassin'
                  attackedPiece = piece.attackedPiece
                }
              }
            })
            player.guardiansRogue?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'guardianRogue'
                  attackedPiece = piece.attackedPiece
                }
              }
            })
            player.guardiansMage?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'guardianMage'
                  attackedPiece = piece.attackedPiece
                }
              }
            })
            player.sorcerers?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'sorcerer'
                  attackedPiece = piece.attackedPiece
                }
              }
            })
            player.piromancers?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'piromancer'
                  attackedPiece = piece.attackedPiece
                }
              }
            })
            player.kingMage?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'kingMage'
                  attackedPiece = piece.attackedPiece
                } else if (piece.health <= 0) {
                  setTimeout(() => {
                    setWinner('Rogue')
                    setGameOver(true)
                  }, 1000)
                }
              }
            })
            player.kingRogue?.forEach((piece) => {
              if (
                piece.currentPosition ===
                `${horizontalAxis[v] + verticalAxis[h]}`
              ) {
                if (piece.health > 0) {
                  health = piece.health
                  image = piece.img
                  id = piece.initialPosition
                  name = 'kingRogue'
                  attackedPiece = piece.attackedPiece
                } else if (piece.health <= 0) {
                  setTimeout(() => {
                    setWinner('Mage')
                    setGameOver(true)
                  }, 1000)
                }
              }
            })
          })

          v < 3
            ? board.push(
                <div
                  key={horizontalAxis[v] + verticalAxis[h]}
                  className="home-white"
                  id={horizontalAxis[v] + verticalAxis[h]}
                >
                  <Piece
                    image={image}
                    i={id}
                    name={name}
                    health={health}
                    attackedPiece={attackedPiece}
                  />
                </div>,
              )
            : board.push(
                <div
                  key={horizontalAxis[v] + verticalAxis[h]}
                  className="home-black"
                  id={horizontalAxis[v] + verticalAxis[h]}
                >
                  <Piece
                    image={image}
                    i={id}
                    name={name}
                    health={health}
                    attackedPiece={attackedPiece}
                  />
                </div>,
              )
        }
      }
    }
  }, [board, players])

  return (
    <>
      {board.length > 0 ? (
        <StyledBoard>
          <div
            className="container"
            onMouseDown={(e) => {
              const grab = grabPiece(
                e,
                players,
                selectedPiece,
                setPlayers,
                turnGame,
                setTurnGame,
              )
              grab.grab ? setActionBarActive(true) : setActionBarActive(false)
              if (select === 1) {
                grab.activePiece
                  ? setSelectedPiece(grab.activePiece)
                  : setSelectedPiece(null)
              } else if (select === 2) {
                grab.activePiece
                  ? setSelectedPiece(grab.activePiece)
                  : setSelectedPiece(null)
              }
            }}
          >
            <audio src={musicTheme} id="music-theme" autoPlay />

            {board}
          </div>
          {actionBarActive && (
            <ActionBar
              players={players}
              setPlayers={setPlayers}
              board={board}
              selectedPiece={selectedPiece}
              select={select}
              setOnMove={setOnMove}
              onMove={onMove}
            />
          )}
        </StyledBoard>
      ) : (
        <StyledBoard></StyledBoard>
      )}
    </>
  )
}

export default Board
