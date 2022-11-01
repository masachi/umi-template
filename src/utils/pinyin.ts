import pinyin from 'pinyin';

/**
 * @param originText 搜索的字符串
 * @param searchValue search
 * 这个方法目前用于Select 中的拼音首字母搜索
 * return true / false，原文案中是否存在searchValue中的首字母匹配
 * 默认首字母 + 词语分组
 */
export function pinyinInitialSearch(originText, searchValue) {
  let match = false;

  if (originText && searchValue) {
    const pinyinInitials = pinyin(originText, {
      style: 'FIRST_LETTER',
      heteronym: false,
      compact: true,
      group: true,
    });

    for (let initials of pinyinInitials) {
      let initialCompact = initials.join('').replaceAll(/[^A-Za-z0-9]/g, '');
      if (initialCompact.includes(searchValue.toLowerCase())) {
        match = true;
        break;
      }
    }
  }

  return match;
}
