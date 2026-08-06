import {
  assignWine,
  createSelectionState,
  drawOrder,
  getAvailableBottles,
  parseParticipants,
} from './game.mjs?v=wine-refactor-v1';

const wineCatalog = [
  {
    id: 'chandon-1', image: './assets/wines/chandon-brut.jpeg', lineupKey: 'chandon-brut', name: '샹동 브뤼 NV', type: '스파클링', className: 'sparkling', region: '호주 · 빅토리아 · 야라밸리', style: '드라이', score: '3.6', acidity: '산미 4.0', guide: '상쾌하고 가볍게 시작하기 좋아요.', description: '사과와 흰 꽃 향이 산뜻하게 이어지는 호주산 스파클링.',
  },
  {
    id: 'chandon-2', image: './assets/wines/chandon-brut.jpeg', lineupKey: 'chandon-brut', name: '샹동 브뤼 NV', type: '스파클링', className: 'sparkling', region: '호주 · 빅토리아 · 야라밸리', style: '드라이', score: '3.6', acidity: '산미 4.0', guide: '상쾌하고 가볍게 시작하기 좋아요.', description: '사과와 흰 꽃 향이 산뜻하게 이어지는 호주산 스파클링.',
  },
  {
    id: 'malbec', image: './assets/wines/el-enemigo-malbec.png', name: '엘 에네미고 말벡 2022', type: '레드', className: 'red', region: '아르헨티나 · 멘도사', style: '드라이', score: '4.3', acidity: '산미 4.0', guide: '진하고 과일 향이 느껴지는 레드예요.', description: '검은 과실과 부드러운 향신료가 느껴지는 힘 있는 말벡.',
  },
  {
    id: 'russian-jack', image: './assets/wines/russian-jack-pinot-noir.png', name: '러시안 잭 피노 누아 2022', type: '레드', className: 'red', region: '뉴질랜드 · 마틴버러', style: '드라이', score: '3.7', acidity: '산미 3.5', guide: '레드지만 부드럽고 가벼운 편이에요.', description: '붉은 베리와 은은한 허브 향이 가볍고 우아하게 이어집니다.',
  },
  {
    id: 'saracco', image: './assets/wines/saracco-moscato.jpg', name: '사라코 모스카토 다스티 2025', type: '스위트', className: 'sweet', region: '이탈리아 · 피에몬테', style: '스위트', score: '4.1', acidity: '산미 3.5', guide: '달콤한 와인을 좋아하면 골라보세요.', description: '복숭아와 오렌지꽃 향, 낮은 알코올의 달콤한 모스카토.',
  },
  {
    id: 'mcmanis', image: './assets/wines/mcmanis-viognier.png', name: '맥매니스 비오니에 2024', type: '화이트', className: 'white', region: '미국 · 캘리포니아', style: '과실 풍부', score: '3.8', acidity: '산미 2.5', guide: '향긋하고 부드러운 화이트예요.', description: '복숭아와 배의 풍성한 과실 향, 벨벳처럼 부드러운 질감.',
  },
  {
    id: 'tapi', image: './assets/wines/tapi-sauvignon-blanc.png', name: '타피 소비뇽 블랑 2025', type: '화이트', className: 'white', region: '뉴질랜드 · 말보로', style: '드라이', score: '4.1', acidity: '산미 4.5', guide: '상큼하고 시원한 느낌을 좋아하면 좋아요.', description: '라임과 자몽 같은 시트러스가 또렷한 상쾌한 화이트.',
  },
  {
    id: 'cloudy-bay', image: './assets/wines/cloudy-bay-sauvignon-blanc.png', name: '클라우디 베이 소비뇽 블랑 2025', type: '화이트', className: 'white', region: '뉴질랜드 · 말보로', style: '드라이', score: '4.1', acidity: '산미 4.5', guide: '향이 선명하고 상큼한 화이트예요.', description: '패션프루트와 허브 향이 선명한 뉴질랜드 대표 소비뇽 블랑.',
  },
  {
    id: 'brancaia', image: './assets/wines/brancaia-tre.jpg', name: '브란까이아 트레', type: '레드', className: 'red', region: '이탈리아 · 토스카나', style: '드라이', score: '3.8', acidity: '산미 3.5', guide: '무난하고 균형 잡힌 레드를 찾는다면 좋아요.', description: '붉은 과실과 허브, 은은한 오크가 균형을 이루는 토스카나 레드.',
  },
  {
    id: 'josh', image: './assets/wines/josh-reserve-cabernet.png', name: '조쉬 리저브 카베르네 소비뇽 2023', type: '레드', className: 'red', region: '미국 · 캘리포니아', style: '과실 풍부', score: '4.0', acidity: '산미 3.0', guide: '진하지만 부드러운 레드를 좋아하면 골라보세요.', description: '잘 익은 블랙베리와 바닐라가 부드럽게 이어지는 캘리포니아 레드.',
  },
  {
    id: 'bread-butter', image: './assets/wines/bread-butter-cabernet.png', name: '브레드 앤 버터 카베르네 소비뇽 2022', type: '레드', className: 'red', region: '미국 · 캘리포니아', style: '달큰한 인상', score: '3.9', acidity: '산미 2.5', guide: '달큰하고 편안한 레드를 찾는 분께 좋아요.', description: '잘 익은 과실과 바닐라, 오크 향이 편안하게 이어지는 레드.',
  },
];

const slides = [...document.querySelectorAll('.slide')];
const state = {
  slideIndex: 0,
  participants: [],
  order: [],
  selection: null,
};

const $ = (selector) => document.querySelector(selector);

function wineById(id) {
  return wineCatalog.find((wine) => wine.id === id);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function setSlide(index) {
  state.slideIndex = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === state.slideIndex));
  $('#prevButton').disabled = state.slideIndex === 0;
  $('#nextButton').disabled = state.slideIndex === slides.length - 1;
  $('#slideCounter').textContent = `${String(state.slideIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  $('#progressBar').style.width = `${((state.slideIndex + 1) / slides.length) * 100}%`;
  document.querySelectorAll('.slide-dot').forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === state.slideIndex));
}

function renderMeta() {
  $('#eventMeta').textContent = '10종 · 11병 · 1인 1병';
}

function renderWines() {
  const lineup = [...wineCatalog.reduce((groups, wine) => {
    const key = wine.lineupKey || wine.id;
    const group = groups.get(key) || { wine, quantity: 0 };
    group.quantity += 1;
    groups.set(key, group);
    return groups;
  }, new Map()).values()];

  $('#wineGrid').innerHTML = lineup.map(({ wine, quantity }, index) => `
    <article class="wine-card wine-card--${wine.className}">
      <div class="wine-index"><span>${String(index + 1).padStart(2, '0')}</span><span class="wine-kind">${wine.type}${quantity > 1 ? ` · ${quantity}병` : ''}</span></div>
      <div class="wine-photo"><img src="${wine.image}" alt="${wine.name} 병 사진" loading="eager" decoding="async" /></div>
      <h3>${wine.name}</h3>
      <p class="wine-guide"><span>쉽게 고르면</span>${wine.guide}</p>
      <p class="wine-description">${wine.description}</p>
      <div class="wine-facts" aria-label="와인 정보">
        <span class="wine-fact wine-fact--region"><small>지역</small><strong>${wine.region}</strong></span>
        <span class="wine-fact"><small>스타일</small><strong>${wine.style}</strong></span>
        <span class="wine-fact"><small>산미</small><strong>${wine.acidity.replace('산미 ', '')}</strong></span>
        <span class="wine-fact wine-fact--score"><small>비비노 점수</small><strong>${wine.score}</strong></span>
      </div>
    </article>
  `).join('');
}

function renderOrder() {
  const body = $('#orderTableBody');
  body.innerHTML = state.order.map((participant, index) => `
    <tr>
      <td>${String(index + 1).padStart(2, '0')}</td>
      <td>${participant}</td>
      <td>선택 대기</td>
    </tr>
  `).join('');
  $('#drawEmpty').classList.toggle('is-hidden', state.order.length > 0);
  $('#orderTableWrap').classList.toggle('is-hidden', state.order.length === 0);
  $('#goSelectionButton').classList.toggle('is-hidden', state.order.length === 0);
}

function getCurrentChooser() {
  if (!state.selection) return null;
  return state.order.find((participant) => !state.selection.assignments[participant]) || null;
}

function renderSelection() {
  const selection = state.selection;
  const assignments = selection?.assignments || {};
  const chosenCount = Object.keys(assignments).length;
  const current = getCurrentChooser();
  const available = selection ? getAvailableBottles(selection) : [];

  $('#selectionCounter').textContent = `${chosenCount} / ${state.participants.length} 선택 완료`;
  $('#availableCount').textContent = `${available.length}병`;
  $('#chooserOrder').textContent = current ? String(state.order.indexOf(current) + 1).padStart(2, '0') : '—';
  $('#currentChooser').textContent = current || '모든 선택 완료';
  $('#chooserPrompt').textContent = current ? '선택할 와인을 눌러주세요.' : '모두의 선택이 끝났습니다.';

  $('#availableBottles').innerHTML = available.map((wine) => `
    <button class="wine-choice" type="button" data-wine-id="${wine.id}" ${current ? '' : 'disabled'}>
      <small>${wine.type} · ${wine.acidity}</small>
      <strong>${wine.name}</strong>
      <span>${wine.style} · Vivino ${wine.score}</span>
    </button>
  `).join('') || '<p class="form-hint">남은 와인이 없습니다.</p>';

  $('#selectionTable').innerHTML = state.order.map((participant, index) => {
    const chosenWine = wineById(assignments[participant]);
    const isCurrent = participant === current;
    return `
      <div class="selection-row ${isCurrent ? 'is-current' : ''}">
        <span class="selection-order">${String(index + 1).padStart(2, '0')}</span>
        <strong>${participant}</strong>
        <span>${chosenWine ? chosenWine.name : (isCurrent ? '지금 선택 중' : '선택 대기')}</span>
      </div>
    `;
  }).join('');

  document.querySelectorAll('[data-wine-id]').forEach((button) => {
    button.addEventListener('click', () => chooseWine(button.dataset.wineId));
  });
}

function renderFinalBoard() {
  const assignments = state.selection?.assignments || {};
  $('#finalBoard').innerHTML = state.order.map((participant, index) => {
    const chosenWine = wineById(assignments[participant]);
    return `
      <div class="final-row">
        <span class="final-order">${String(index + 1).padStart(2, '0')}</span>
        <div><strong>${participant}</strong><span>${chosenWine?.name || '미선택'}</span></div>
      </div>
    `;
  }).join('');
  const leftover = state.selection ? getAvailableBottles(state.selection) : wineCatalog;
  $('#leftoverNote').textContent = leftover.length ? `남은 와인: ${leftover.map((wine) => wine.name).join(', ')} · 추가 추첨 또는 운영진 보관` : '남은 와인 없이 모두의 선택이 완료되었습니다.';
}

function chooseWine(wineId) {
  const current = getCurrentChooser();
  if (!current || !state.selection) return;
  try {
    state.selection = assignWine(state.selection, current, wineId);
    renderSelection();
    renderFinalBoard();
    showToast(`${current}님이 ${wineById(wineId).name}을(를) 선택했습니다.`);
  } catch (error) {
    showToast(error.message);
  }
}

function readParticipants() {
  return parseParticipants($('#participants').value);
}

function startEvent() {
  const participants = readParticipants();
  const message = $('#setupMessage');
  if (participants.length === 0) {
    message.textContent = '참석자를 한 명 이상 입력해주세요.';
    message.classList.add('is-error');
    return;
  }
  if (participants.length > wineCatalog.length) {
    message.textContent = `현재 와인은 ${wineCatalog.length}병이므로 참석자는 최대 ${wineCatalog.length}명입니다.`;
    message.classList.add('is-error');
    return;
  }

  state.participants = participants;
  state.order = [];
  state.selection = createSelectionState(participants, wineCatalog);
  renderWines();
  message.textContent = participants.length < wineCatalog.length
    ? `좋습니다. ${participants.length}명이 시작합니다. 남은 와인은 마지막에 추가 추첨할 수 있습니다.`
    : '좋습니다. 모든 와인이 한 병씩 배정됩니다.';
  message.classList.remove('is-error');
  renderMeta();
  renderSelection();
  renderFinalBoard();
  setSlide(1);
}

function drawSelectionOrder() {
  if (!state.participants.length) {
    showToast('먼저 첫 화면에서 참석자를 입력해주세요.');
    setSlide(0);
    return;
  }
  state.order = drawOrder(state.participants);
  state.selection = createSelectionState(state.order, wineCatalog);
  renderOrder();
  renderSelection();
  renderFinalBoard();
  showToast('오늘의 선택 순서가 정해졌습니다.');
}

function resetEvent() {
  state.order = [];
  state.selection = createSelectionState(state.participants, wineCatalog);
  renderOrder();
  renderSelection();
  renderFinalBoard();
  setSlide(3);
  showToast('선택 순서를 다시 뽑을 수 있습니다.');
}

function setupNavigation() {
  $('#prevButton').addEventListener('click', () => setSlide(state.slideIndex - 1));
  $('#nextButton').addEventListener('click', () => setSlide(state.slideIndex + 1));
  $('#startButton').addEventListener('click', startEvent);
  $('#drawButton').addEventListener('click', drawSelectionOrder);
  $('#goSelectionButton').addEventListener('click', () => setSlide(4));
  $('#resetButton').addEventListener('click', resetEvent);
  $('#fullscreenButton').addEventListener('click', async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });
  document.addEventListener('keydown', (event) => {
    if (event.target.matches('input, textarea, button')) return;
    if (event.key === 'ArrowRight' || event.key === ' ') setSlide(state.slideIndex + 1);
    if (event.key === 'ArrowLeft') setSlide(state.slideIndex - 1);
  });
}

function renderSlideDots() {
  $('#slideDots').innerHTML = slides.map((slide, index) => `
    <button class="slide-dot ${index === 0 ? 'is-active' : ''}" type="button" aria-label="${index + 1}번 화면으로 이동"></button>
  `).join('');
  document.querySelectorAll('.slide-dot').forEach((dot, index) => dot.addEventListener('click', () => setSlide(index)));
}

renderWines();
renderSlideDots();
renderMeta();
renderOrder();
renderSelection();
renderFinalBoard();
setupNavigation();
setSlide(0);
