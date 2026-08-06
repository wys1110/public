export function drawOrder(participants, random = Math.random) {
  const result = [...participants];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function parseParticipants(input) {
  return [...new Set(input.split(',').map((name) => name.trim()).filter(Boolean))];
}

export function createSelectionState(participants, bottles) {
  return {
    participants: [...participants],
    bottles: bottles.map((bottle) => ({ ...bottle })),
    assignments: {},
  };
}

export function getAvailableBottles(state) {
  const chosenBottleIds = new Set(Object.values(state.assignments));
  return state.bottles.filter((bottle) => !chosenBottleIds.has(bottle.id));
}

export function assignWine(state, participant, bottleId) {
  if (!state.participants.includes(participant)) {
    throw new Error('참석자를 찾을 수 없습니다.');
  }

  if (state.assignments[participant]) {
    throw new Error('이미 선택한 참석자입니다.');
  }

  if (!state.bottles.some((bottle) => bottle.id === bottleId)) {
    throw new Error('와인을 찾을 수 없습니다.');
  }

  if (Object.values(state.assignments).includes(bottleId)) {
    throw new Error('이미 선택된 와인입니다.');
  }

  return {
    ...state,
    assignments: {
      ...state.assignments,
      [participant]: bottleId,
    },
  };
}
