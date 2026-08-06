import test from 'node:test';
import assert from 'node:assert/strict';

import {
  assignWine,
  createSelectionState,
  drawOrder,
  getAvailableBottles,
  parseParticipants,
} from './game.mjs';
import { paginateWines } from './lineup.mjs';

test('paginateWines splits the lineup into predictable pages', () => {
  const wines = Array.from({ length: 10 }, (_, index) => ({ id: `wine-${index + 1}` }));

  assert.deepEqual(
    paginateWines(wines, 5),
    [wines.slice(0, 5), wines.slice(5)],
  );
});

test('parseParticipants accepts comma-separated names and removes blank duplicates', () => {
  assert.deepEqual(
    parseParticipants('민지, 현우,, 민지,서연 '),
    ['민지', '현우', '서연'],
  );
});

test('drawOrder keeps every participant exactly once', () => {
  const participants = ['민지', '현우', '서연'];
  const order = drawOrder(participants, () => 0.4);

  assert.equal(order.length, participants.length);
  assert.deepEqual([...order].sort(), [...participants].sort());
  assert.deepEqual(participants, ['민지', '현우', '서연']);
});

test('assignWine records a participant choice and removes the bottle', () => {
  const state = createSelectionState(
    ['민지', '현우'],
    [
      { id: 'chandon-1', name: '샹동 브뤼 NV' },
      { id: 'malbec', name: '엘 에네미고 말벡 2022' },
    ],
  );

  const next = assignWine(state, '민지', 'malbec');

  assert.equal(next.assignments.민지, 'malbec');
  assert.deepEqual(getAvailableBottles(next).map((bottle) => bottle.id), ['chandon-1']);
});

test('assignWine rejects a second choice for the same participant or bottle', () => {
  const state = createSelectionState(
    ['민지', '현우'],
    [
      { id: 'chandon-1', name: '샹동 브뤼 NV' },
      { id: 'malbec', name: '엘 에네미고 말벡 2022' },
    ],
  );
  const chosen = assignWine(state, '민지', 'malbec');

  assert.throws(() => assignWine(chosen, '민지', 'chandon-1'), /이미 선택/);
  assert.throws(() => assignWine(chosen, '현우', 'malbec'), /이미 선택/);
});
