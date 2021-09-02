import { isArray } from '@vue/shared'
import {
  BACKGROUND_COLOR,
  ON_NAVIGATION_BAR_BUTTON_TAP,
} from '@dcloudio/uni-shared'
import { isColor } from './utils'
import { initNavigationBarI18n, invokeHook } from '@dcloudio/uni-core'
export function initTitleNView(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const { navigationBar } = routeMeta
  if (navigationBar.style === 'custom') {
    return false
  }
  let autoBackButton = true
  if (routeMeta.isQuit) {
    autoBackButton = false
  }
  const titleNView: PlusWebviewWebviewTitleNViewStyles = {
    autoBackButton,
  }
  Object.keys(navigationBar).forEach((name) => {
    const value = navigationBar[name as keyof UniApp.PageNavigationBar]
    if (name === 'backgroundColor') {
      titleNView.backgroundColor = isColor(value as string)
        ? (value as string)
        : BACKGROUND_COLOR
    } else if (name === 'titleImage' && value) {
      titleNView.tags = createTitleImageTags(value as string)
    } else if (name === 'buttons' && isArray(value)) {
      titleNView.buttons = (value as UniApp.PageNavigationBar['buttons'])!.map(
        (button, index) => {
          ;(button as any).onclick = createTitleNViewBtnClick(index)
          return button
        }
      )
    } else {
      titleNView[name as keyof PlusWebviewWebviewTitleNViewStyles] =
        value as any
    }
  })

  webviewStyle.titleNView = initTitleNViewI18n(titleNView, routeMeta)
}

function initTitleNViewI18n(
  titleNView: PlusWebviewWebviewTitleNViewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const i18nResult = initNavigationBarI18n(titleNView)
  if (!i18nResult) {
    return titleNView
  }
  const [titleTextI18n, _searchInputPlaceholderI18n] = i18nResult
  if (titleTextI18n) {
    uni.onLocaleChange(() => {
      const webview = plus.webview.getWebviewById(routeMeta.id + '')
      webview &&
        webview.setStyle({
          titleNView: {
            titleText: titleNView.titleText,
          },
        })
    })
  }
  return titleNView
}

function createTitleImageTags(titleImage: string) {
  return [
    {
      tag: 'img' as 'img',
      src: titleImage,
      position: {
        left: 'auto',
        top: 'auto',
        width: 'auto',
        height: '26px',
      },
    },
  ]
}

function createTitleNViewBtnClick(index: number) {
  return function onClick(btn: UniApp.PageNavigationBarButton) {
    ;(btn as any).index = index
    invokeHook(ON_NAVIGATION_BAR_BUTTON_TAP, btn)
  }
}
