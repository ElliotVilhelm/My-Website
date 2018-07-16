from positional_board_values import *
from constants import sq120, board_hash


def evaluate_state(state):
    board = list(state[0])
    board.append(state[1])
    hash_val = tuple(board)
    if hash_val in board_hash:
        return board_hash[hash_val]
    pos_values = {'K': 0.0, 'Q': 0.0, 'R': 0.0, 'N': 0.0,
                  'B': 0.0, 'P': 0.0, 'k': 0, 'q': 0.0,
                  'r': 0.0, 'n': 0.0, 'b': 0.0,
                  'p': 0.0}
    piece_counts = {'K': 0, 'Q': 0, 'R': 0, 'N': 0,
                    'B': 0, 'P': 0, 'k': 0, 'q': 0,
                    'r': 0, 'n': 0, 'b': 0,
                    'p': 0
                    }
    for i in range(21, 99):
        if board[i] == 'o' or board[i] == 'x':
            continue
        else:
            safe_i = sq120[i + 20] - 1
            pos_values[board[i]] += POS_VALUE_TABLES[board[i]][safe_i]
            piece_counts[board[i]] += 1

    # Piece counts
    value = ((900 * (piece_counts['Q'] - piece_counts['q']))
             + (500 * (piece_counts['R'] - piece_counts['r']))
             + (300 * (piece_counts['B'] - piece_counts['b']))
             + (300 * (piece_counts['N'] - piece_counts['n']))
             + (100 * (piece_counts['P'] - piece_counts['p'])))

    # Piece positional Values
    value += 0.1 * (pos_values['Q'] - pos_values['q']
                    + pos_values['R'] - pos_values['r']
                    + pos_values['B'] - pos_values['b']
                    + pos_values['N'] - pos_values['n']
                    + pos_values['B'] - pos_values['b']
                    + pos_values['P'] - pos_values['p'])
    board_hash[hash_val] = value
    return value
