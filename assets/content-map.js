const contentMap = [
  {
    id: 'home',
    title: '首页',
    keywords: ['华体会', '体育', '首页', '推荐'],
    url: 'https://home-site-hth.com.cn'
  },
  {
    id: 'sports',
    title: '体育赛事',
    keywords: ['华体会', '足球', '篮球', '网球', '体育赛事'],
    url: 'https://home-site-hth.com.cn/sports'
  },
  {
    id: 'live',
    title: '直播',
    keywords: ['华体会', '直播', '实时', '在线'],
    url: 'https://home-site-hth.com.cn/live'
  },
  {
    id: 'esports',
    title: '电竞',
    keywords: ['华体会', '电竞', '英雄联盟', 'DOTA2', 'CSGO'],
    url: 'https://home-site-hth.com.cn/esports'
  },
  {
    id: 'promotions',
    title: '优惠活动',
    keywords: ['华体会', '优惠', '活动', '奖励', '红利'],
    url: 'https://home-site-hth.com.cn/promotions'
  },
  {
    id: 'support',
    title: '客服支持',
    keywords: ['华体会', '客服', '帮助', '支持', '帮助中心'],
    url: 'https://home-site-hth.com.cn/support'
  }
];

const keywordIndex = {};

function buildIndex() {
  for (const section of contentMap) {
    const seen = new Set();
    for (const kw of section.keywords) {
      const lower = kw.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        if (!keywordIndex[lower]) {
          keywordIndex[lower] = [];
        }
        keywordIndex[lower].push(section.id);
      }
    }
  }
}

buildIndex();

function searchByKeyword(query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];
  const matchedIds = keywordIndex[trimmed] || [];
  const results = [];
  const added = new Set();
  for (const id of matchedIds) {
    if (!added.has(id)) {
      added.add(id);
      const section = contentMap.find(s => s.id === id);
      if (section) results.push(section);
    }
  }
  return results;
}

function filterByTitle(searchText) {
  const lowerSearch = searchText.toLowerCase().trim();
  if (!lowerSearch) return contentMap;
  return contentMap.filter(section =>
    section.title.toLowerCase().includes(lowerSearch) ||
    section.id.toLowerCase().includes(lowerSearch)
  );
}

function getAllSections() {
  return contentMap.slice();
}

function getSectionById(id) {
  return contentMap.find(section => section.id === id) || null;
}

function addSection(newSection) {
  if (!newSection || !newSection.id || !newSection.title) {
    return false;
  }
  const exists = contentMap.some(s => s.id === newSection.id);
  if (exists) return false;
  contentMap.push({
    id: newSection.id,
    title: newSection.title,
    keywords: newSection.keywords || [],
    url: newSection.url || ''
  });
  for (const kw of newSection.keywords || []) {
    const lower = kw.toLowerCase();
    if (!keywordIndex[lower]) {
      keywordIndex[lower] = [];
    }
    if (!keywordIndex[lower].includes(newSection.id)) {
      keywordIndex[lower].push(newSection.id);
    }
  }
  return true;
}

export {
  contentMap,
  searchByKeyword,
  filterByTitle,
  getAllSections,
  getSectionById,
  addSection
};