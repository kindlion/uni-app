declare namespace Page {
  interface PageInstance {
    $page: {
      id: number
      path: string
      route: string
      fullPath: string
      options: Record<string, any>
      meta: UniApp.PageRouteMeta
      openType: UniApp.OpenType
      eventChannel: unknown
      statusBarStyle?: 'dark' | 'light'
    }
  }
}
declare namespace UniApp {
  type ClassObj = Record<string, boolean>
  type StyleObj = Record<string, any>
  type PLATFORM = keyof PagesJsonPagePlatformStyle

  type OpenType =
    | 'navigateTo'
    | 'redirectTo'
    | 'reLaunch'
    | 'switchTab'
    | 'navigateBack'
    | 'preloadPage'
  interface LayoutWindowOptions {
    matchMedia?: {
      minWidth?: number
    }
    style?: Record<string, any>
    component: any
  }

  interface UniConfig {
    ready?: boolean
    router?: {
      strict: boolean
      base: string
    }
    nvue?: {
      'flex-direction': 'column' | 'row'
    }
    globalStyle: PagesJsonPageStyle & {
      rpxCalcMaxDeviceWidth?: number
      rpxCalcBaseDeviceWidth?: number
      // rpxCalcIncludeWidth?: number
    }
    topWindow?: LayoutWindowOptions
    leftWindow?: LayoutWindowOptions
    rightWindow?: LayoutWindowOptions
    networkTimeout: {
      connectSocket: number
      downloadFile: number
      request: number
      uploadFile: number
    }
    tabBar?: TabBarOptions
    subPackages?: { root: string }[]
    qqMapKey?: string
    // app-plus
    entryPagePath?: string
    entryPageQuery?: string
    realEntryPagePath?: string
    renderer?: 'auto' | 'native'
    splashscreen: {
      alwaysShowBeforeRender: boolean
      autoclose: boolean
    }
    onReady: (fn: Function) => void
    serviceReady: boolean
    language: string
  }

  interface UniRoute {
    path: string
    alias?: string
    meta: PageRouteMeta
    component?: any
    loader?: () => Promise<any>
  }

  type UniRoutes = UniRoute[]

  interface PageNavigationBarButton {
    type:
      | 'none'
      | 'forward'
      | 'back'
      | 'share'
      | 'favorite'
      | 'home'
      | 'menu'
      | 'close'
    color: string
    background?: string
    badgeText?: string
    colorPressed?: string
    float?: 'right' | 'left'
    fontWeight?: any
    fontSize: string
    fontSrc?: string
    fontFamily?: string
    select?: boolean
    text: string
    width?: string
    redDot?: boolean
  }

  interface PageNavigationBarSearchInput {
    color?: string
    autoFocus?: boolean
    align?: 'center' | 'left' | 'right'
    backgroundColor?: string
    borderRadius?: string
    placeholder?: string
    placeholderColor?: string
    disabled?: boolean
  }

  interface PageNavigationBar {
    type?: 'default' | 'transparent' | 'float'
    titleSize?: string
    titleText?: string
    titleImage?: string
    titleColor?: '#000000' | '#ffffff'
    timingFunc?: string
    duration?: string
    backgroundColor?: string
    titlePenetrate?: 'YES' | 'NO'
    shadowColorType?: 'grey' | 'blue' | 'green' | 'orange' | 'red' | 'yellow'
    backButton?: Omit<
      PageNavigationBarButton,
      'type' | 'float' | 'fontSrc' | 'fontFamily' | 'select' | 'text' | 'width'
    >
    buttons?: PageNavigationBarButton[]
    searchInput?: PageNavigationBarSearchInput
    style?: 'default' | 'custom'
    loading?: boolean
    coverage?: string
  }
  interface PageRefreshOptions {
    support?: boolean
    color?: string
    style?: 'circle' | string
    height?: number
    range?: number
    offset?: number
  }

  interface PagesJsonPagePlatformStyle {
    h5?: PagesJsonPageStyle
    app?: PagesJsonPageStyle
    'app-plus'?: PagesJsonPageStyle
    'mp-alipay'?: PagesJsonPageStyle
    'mp-baidu'?: PagesJsonPageStyle
    'mp-qq'?: PagesJsonPageStyle
    'mp-toutiao'?: PagesJsonPageStyle
    'mp-weixin'?: PagesJsonPageStyle
    'mp-kuaishou'?: PagesJsonPageStyle
    'quickapp-webview'?: PagesJsonPageStyle
    'quickapp-webview-huawei'?: PagesJsonPageStyle
    'quickapp-webview-union'?: PagesJsonPageStyle
  }

  interface PagesJsonPageStyleSubNVue {
    id?: string
    path: string
    type: 'popup' | 'navigationBar'
    style?: unknown
  }
  interface PagesJsonPageStyle extends PagesJsonPagePlatformStyle {
    isNVue?: boolean
    disableScroll?: boolean
    enablePullDownRefresh?: boolean
    navigationBar: PageNavigationBar
    pullToRefresh?: PageRefreshOptions
    onReachBottomDistance?: number
    pageOrientation?: 'auto' | 'portrait' | 'landscape'
    backgroundColor?: string
    maxWidth?: string | number
    // app-plus
    animationType?: string
    animationDuration?: number
    subNVues?: PagesJsonPageStyleSubNVue[]
  }
  interface PageRouteMeta extends PagesJsonPageStyle {
    id?: number
    route: string
    isQuit?: boolean
    isEntry?: boolean
    isTabBar?: boolean
    tabBarIndex?: number
    windowTop?: number
    topWindow?: boolean
    leftWindow?: boolean
    rightWindow?: boolean
    eventChannel?: any
  }

  interface PagesJsonPageOptions {
    path: string
    style: PagesJsonPageStyle
  }
  interface PagesJsonSubpackagesOptions {
    root: string
    pages: PagesJsonPageOptions[]
  }

  interface PagesJsonWindowOptions extends PagesJsonPageOptions {
    matchMedia: {
      minWidth: number
    }
  }

  interface PagesJson {
    pages: PagesJsonPageOptions[]
    subpackages?: PagesJsonSubpackagesOptions[]
    subPackages?: PagesJsonSubpackagesOptions[]
    globalStyle: PagesJsonPageStyle
    tabBar?: TabBarOptions
    topWindow?: PagesJsonWindowOptions
    leftWindow?: PagesJsonWindowOptions
    rightWindow?: PagesJsonWindowOptions
    easycom?: {
      autoscan?: boolean
      custom?: {
        [name: string]: string
      }
    }
    condition?: {
      current?: number
      list?: { name?: string; path: string; query?: string }[]
    }
  }

  interface TabBarItemBaseOptions {
    pagePath: string
    text: string
    iconPath?: string
    selectedIconPath?: string
    redDot?: boolean
    badge?: string
  }

  interface TabBarNormalItemOptions extends TabBarItemBaseOptions {
    type: 'normal'
  }
  interface TabBarMidButtonOptions extends TabBarItemBaseOptions {
    type: 'midButton'
    width?: string
    height?: string
    iconWidth?: string
    backgroundImage?: string
  }

  type TabBarItemOptions = TabBarNormalItemOptions | TabBarMidButtonOptions

  type StopHandle = () => void

  interface TabBarOptions {
    position?: 'bottom' | 'top'
    color: string
    selectedColor: string
    backgroundColor: string
    borderStyle?: 'black' | 'white'
    list: TabBarItemOptions[]
    blurEffect?: 'none' | 'dark' | 'extralight' | 'light'
    fontSize?: string
    iconWidth?: string
    spacing?: string
    height?: string
    midButton?: TabBarMidButtonOptions
    selectedIndex?: number
    shown: boolean
  }

  interface ComponentDescriptor {}

  type OnApiLike = (callback: (result: unknown) => void) => void
  type CallbackFunction = (...args: any[]) => void
  interface UniServiceJSBridge {
    /**
     * 监听 service 层的自定义事件。事件由 emit 触发，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    on(event: string | string[], callback: CallbackFunction): void
    /**
     * 监听 service 层的自定义事件。仅触发一次，在第一次触发之后移除监听器。
     * @param event
     * @param callback
     */
    once(event: string, callback: CallbackFunction): void
    /**
     * 移除 service 层的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    off(event?: string | string[], callback?: CallbackFunction): void
    /**
     * 触发 Service 层的事件。附加参数都会传给监听器回调。
     * @param event
     * @param args
     */
    emit(event: string, ...args: any[]): void
    /**
     * 触发 Service 层事件类型API(on开头)回调。
     * @param name
     * @param res
     */
    invokeOnCallback<T extends OnApiLike>(
      name: string,
      res?: Parameters<Parameters<T>[0]>[0]
    ): void
    /**
     * 订阅 View 的自定义事件，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     * @param once 默认 false
     */
    subscribe(event: string, callback: CallbackFunction, once?: boolean): void
    /**
     * 取消订阅 View 的自定义事件
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    unsubscribe(event: string, callback?: CallbackFunction): void
    /**
     * 向 View 层发送事件
     * @param event
     * @param args
     * @param pageId
     */
    publishHandler(event: string, args: unknown, pageId: number): void
    /**
     * 接收 View 层事件(通常由 View 层调用，并暴露至全局 UniServiceJSBridge 对象中)
     * @param event
     * @param args
     * @param pageId
     */
    subscribeHandler(event: string, args?: unknown, pageId?: number): void
    /**
     * 执行 View 层方法，并获取返回值
     * @param name
     * @param args
     * @param pageId
     * @param callback
     */
    invokeViewMethod<Args = any, Res = any>(
      name: string,
      args: Args,
      pageId: number,
      callback?: (res: Res) => void
    ): void
    /**
     * 执行 View 层方法，并持久监听返回值
     * @param name
     * @param args
     * @param pageId
     * @param callback
     */
    invokeViewMethodKeepAlive<Args = any, Res = any>(
      name: string,
      args: Args,
      callback: (res: Res) => void,
      pageId: number
    ): StopHandle
  }
  interface UniViewJSBridge {
    /**
     * 监听 View 的自定义事件。事件由 emit 触发，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    on(event: string | string[], callback: CallbackFunction): void
    /**
     * 监听 View 的自定义事件。仅触发一次，在第一次触发之后移除监听器。
     * @param event
     * @param callback
     */
    once(event: string, callback: CallbackFunction): void
    /**
     * 移除 View 的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    off(event?: string | string[], callback?: CallbackFunction): void
    /**
     * 触发 View 的事件。附加参数都会传给监听器回调。
     * @param event
     * @param args
     */
    emit(event: string, ...args: any[]): void
    /**
     * 订阅 Service 的自定义事件，回调函数会接收所有传入事件触发函数的额外参数。
     * @param event
     * @param callback
     */
    subscribe(event: string, callback: CallbackFunction, once?: boolean): void
    /**
     * 取消订阅 Service 的自定义事件
     * 如果没有提供参数，则移除所有的事件监听器；
     * 如果只提供了事件，则移除该事件所有的监听器；
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event
     * @param callback
     */
    unsubscribe(event: string, callback?: CallbackFunction): void
    /**
     * 接收 Service 层事件(通常由 Service 层调用，并暴露至全局 UniViewJSBridge 对象中)
     * @param event
     * @param args
     * @param pageId
     */
    subscribeHandler(event: string, args: unknown, pageId: number): void
    /**
     * 向 Service 层发送事件
     * @param event
     * @param args
     * @param pageId
     */
    publishHandler(event: string, args?: unknown, pageId?: number): void
    /**
     * 执行 View 层方法，并获取返回值
     * @param name
     * @param args
     * @param callback
     */
    invokeServiceMethod<Args = any, Res = any>(
      name: string,
      args: Args,
      callback?: (res: Res) => void
    ): void
  }
}
