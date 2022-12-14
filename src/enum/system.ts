/** 布局组件的名称 */
export enum EnumLayoutComponentName {
  basic = 'basic-layout',
  blank = 'blank-layout'
}

/** 레이아웃 모드 */
export enum EnumThemeLayoutMode {
  'vertical' = '왼쪽 메뉴 모드',
  'horizontal' = '최상위 메뉴 모드',
  'vertical-mix' = '왼쪽 메뉴 하이브리드 모드',
  'horizontal-mix' = '상단 메뉴 하이브리드 모드'
}

/** 多页签风格 */
export enum EnumThemeTabMode {
  'chrome' = '크롬 스타일',
  'button' = '버튼 스타일'
}

/** 水平模式的菜单位置 */
export enum EnumThemeHorizontalMenuPosition {
  'flex-start' = '왼쪽',
  'center' = '센터',
  'flex-end' = '오른쪽'
}

/** 过渡动画类型 */
export enum EnumThemeAnimateMode {
  'zoom-fade' = '줌페이드',
  'zoom-out' = '줌아웃',
  'fade-slide' = '슬라이드 페이드',
  'fade' = '페이드',
  'fade-bottom' = '아래로 페이드',
  'fade-scale' = '작게 페이드'
}
